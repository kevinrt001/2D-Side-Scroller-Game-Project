//Coursework 2.2 Game Project Submission

// Extension 1 - Add Sound

/* 

For this extension, I have added sound effects for the waterfall, collecting of collectables,
jumping of game character, plummeting of game charater, respawning of game character, when game
character gets hit by the enemy, when player has completed the level. when the player loses all
three lives and its game over. I have also added background game music.

I had difficulty in getting my game to play the background game music as it didn't start playing 
when I loaded the game on my browser. So I had put it in my key pressed function and play the music 
only when I press space bar to start the game. Another problem I had was that the background game music 
sometimes didnt start playing when I press spacebar. I later found out that it has not been fully loaded 
when I start my game even though I had add it in the preload function. So I added a three second timer at 
the start of the game giving it time for the music to get loaded before I can press space bar to start the game.
 
I learnt how to use the play(), loop(), stop(), isPlaying() and setVolume() functions. I learnt how to use isPlaying() function
by implemnting it for the Game Over and the Level complete sound effect. I used it by setting the sound effect to play only once 
and not keep repeating by setting a if condition using the isPlaying() and set it to play only when the sound effect isPlaying() 
function value is false. 

*/

// Extension 2 - Create Enemies

/*

For this extension, I have created 13 enemies spread across my game. I made each enemy move left and right 
set at random distances with the maximum distance of 320 pixels and have added a rotating saw at the end of
its hand. I made it so that when the distance between my game character and the enemy's rotating 
saw becomes less than 20 pixels, it will reduce the life of my game charter by 1. I also set the enemy 
to spawn up from below the ground only after I press the space bar to start the game and only when my game 
character is less than 600 pixels away from the enemy. I also made it move left and right and start rotating 
it's saw only when it's above the ground.

I had difficulty in setting the positions of each enemy as I didn't want them to spawn at random positions. 
I wanted to have them a fixed position in every ground platform of the game.  So I made a variable with an array
of x positions of the enemy and looped the enemy function setting the x position of the enemy in the order of the 
enemy position array. 

I learnt how to use the constructor functions more efficiently by applying not just to my enemies but to other 
objects as well such as my snow falling objects. I learnt how to add all the functionality of my objects by adding 
different update functions for different functionality of my objects in the constructor function it self.


*/

var floorPos_y;

var gameChar_x;
var gameChar_y;

var gameChar_world_x;
var gameChar_world_y;

var scrollPos;

var lives;
var life_token;

var game_score;
var game_score_counter;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var clouds;
var mountains;
var mountains_2;
var grounds;
var collectables;
var collectables_move;
var collectables_speed;
var canyons;
var trees;
var flagpole;
var flag_position;

var ManyEnemys;
var Enemy_direction;
var EnemyDist;
var saw_angle;

var snowfall;
var snowfall_timer;
var snowfall_2;

var waterfall;
var waterfall_2;

var wind;

var CollectSound;
var FallSound;
var WaterSound;
var JumpSound;
var EnemySound;
var GameMusicSound;
var WaterfallSound;
var RespawnSound;
var GameOverSound;
var LevelCompleteSound;
var SawSound;

var GameOverSound_boolean;
var GameOverSound_boolean_2;

var LevelCompleteSound_boolean;
var LevelCompleteSound_boolean_2;

var GameStarted;
var GameStart_timer;
var Game_Over;

var background_color_1, background_color_2, background_color_map;

var sun_color_1, sun_color_2, sun_color_map;

function preload() {
    soundFormats("mp3", "wav");

    //load your sounds here

    GameMusicSound = loadSound("assets/Game Music.mp3"); // Used From https://mixkit.co/
    GameMusicSound.setVolume(0.25);

    GameOverSound = loadSound("assets/Game Over.wav"); // Used From https://mixkit.co/
    GameOverSound.setVolume(0.6);

    LevelCompleteSound = loadSound("assets/Level Complete.wav"); // Used From https://mixkit.co/
    LevelCompleteSound.setVolume(0.6);

    WaterfallSound = loadSound("assets/Waterfall.wav"); // Used From https://mixkit.co/
    WaterfallSound.setVolume(0.5);

    RespawnSound = loadSound("assets/Respawn.wav"); // Used From https://mixkit.co/
    RespawnSound.setVolume(3.5);

    CollectSound = loadSound("assets/Collect.wav"); // Used From freesound.org
    CollectSound.setVolume(0.3);

    FallSound = loadSound("assets/Fall.wav"); // Used From freesound.org
    FallSound.setVolume(2);

    JumpSound = loadSound("assets/Jump.wav"); // Used From freesound.org
    JumpSound.setVolume(9);

    EnemySound = loadSound("assets/Enemy.wav"); // Used From freesound.org
    EnemySound.setVolume(1.7);
}

function setup() {
    createCanvas(1024, 576);

    background_color_2 = color(255);
    background_color_1 = color(209, 109, 112);

    floorPos_y = (height * 3) / 4;

    game_score = 0;
    game_score_counter = 0;

    GameStarted = false;
    Game_Over = false;
    GameStart_timer = 3;

    lives = 3;

    life_token = [{
            pos_x: width - 150,
            pos_y: 100,
            lost: false
        },
        {
            pos_x: width - 100,
            pos_y: 100,
            lost: false
        },
        {
            pos_x: width - 50,
            pos_y: 100,
            lost: false
        }
    ];

    CloudsArray();

    collectables = [];

    for(var i = 0; i < 50; i++) {
        if(i != 2) {
            collectables.push({
                pos_x: 100 + i * 200,
                pos_y: random(432, 372),
                size: 0,
                isFound: false,
                scoreCounted: false
            });
        }
    }

    collectables_move = 0;
    collectables_speed = 0.3;

    flagpole = {
        x_pos: 12000,
        y_pos: 432,
        isReached: false
    };

    flag_position = 0;

    ManyEnemys = [];

    Enemy_direction = -2;

    EnemyDist = [
        150,
        950,
        1950,
        3150,
        4550,
        4950,
        6570,
        7640,
        8150,
        8520,
        10450,
        10820,
        11850
    ];

    for(var i = 0; i < 13; i++) {
        if(i == 0) {
            Enemy_direction = 2;
        } else {
            Enemy_direction = -2;
        }

        ManyEnemys.push(
            new Enemys(EnemyDist[i], 532, random(70, 320), Enemy_direction)
        );
    }

    angleMode(DEGREES);

    saw_angle = 0;

    sun_color_2 = color(255, 255, 255);
    sun_color_1 = color(235, 189, 52);

    snowfall = [];

    snowfall_timer = 2;

    for(var i = 0; i < 1500; i++) {
        snowfall.push(new Snow());
    }

    snowfall_2 = [];

    for(var i = 0; i < 100; i++) {
        snowfall_2.push(new Snow_2());
    }

    waterfall = [];

    for(var i = 0; i < 50; i++) {
        waterfall.push({
            pos_x: -5 + i * 2,
            pos_y: random(0, 90),
            pos_color: random(150, 255)
        });
    }

    waterfall_2 = [];

    for(var i = 0; i < 80; i++) {
        waterfall_2.push({
            pos_x: -5 + i * 1,
            pos_y: random(0, 130),
            pos_color: random(150, 255)
        });
    }

    wind = [];

    for(var i = 0; i < 50; i++) {
        wind.push({
            pos_x: random(0, width),
            pos_y: random(0, height)
        });
    }

    mountains_2 = [];

    for(var i = 0; i < 3000; i++) {
        mountains_2.push({
            pos_x: 0 + i * 50,
            pos_y: 432 + 25,
            pos_h: random(32, 432),
            pos_h2: random(232, 432),
            pos_blue: random(255, 130),
            pos_speed: random(1, 3)
        });
    }

    GameOverSound_boolean = GameOverSound.isPlaying();
    GameOverSound_boolean_2 = false;

    LevelCompleteSound_boolean = LevelCompleteSound.isPlaying();
    LevelCompleteSound_boolean_2 = false;

    StartGame();
}

function draw() {
    DrawBackground(); // Draw Background

    DrawWind_1(); // Draw Wind 1

    DrawSun(); // Draw Sun

    DrawWind_2(); // Draw Wind 2

    DrawMountains_2(); // Draw Mountains 2

    DrawSnow_2(); // Draw Snow 2

    push(); ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    translate(scrollPos, 0); ////////////////////////// Side scrolling 1 //////////////////////////////////////////////////////

    DrawMountains(); // Draw mountains

    DrawTrees(); // Draw Trees

    DrawStart_Point_Flag(); // Draw Start Point

    DrawClouds(); // Draw Clouds

    Draw_Collectables(); // Draw Collectable Items

    RenderFlagpole(); // Draw Flagpole

    CheckFlagpole(); // Check If Player Reached Flagpole

    Draw_Canyons(); // Draw canyons

    DrawGround(); // Draw Ground

    DrawEnemys(); // Draw Enemys

    CheckPlayerDie(); // Check Player Die

    DrawWalls(); // Draw Walls

    pop(); ///////////////////////////////////////////////////// Side scrolling 1 /////////////////////////////////////////////////////

    DrawGameCharacter(); // Draw game character

    push(); ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    translate(scrollPos, 0); ////////////////////////// Side scrolling 2 //////////////////////////////////////////////////////

    DrawGround_Translucent(); // Draw Translucent Ground

    Draw_Translucent_Canyons(); // Draw Translucent canyons

    DrawSnow(); // Draw Snow

    pop(); ///////////////////////////////////////////////////// Side scrolling 2 /////////////////////////////////////////////////////

    GameScore(); // Draw Game Score

    LifeTokens(); // Draw Life Tokens

    GameStart(); // Draw Game Start Display

    GameOver(); // Draw Game Over Display

    LevelComplete(); // Draw Level Complete Display

    // Logic to make the game character move or the background scroll.

    if(isLeft == true && gameChar_y >= 250) {
        // Move Left
        if(gameChar_x > width * 0.2 && gameChar_world_x >= 38) {
            gameChar_x -= 9;
        } else if(gameChar_world_x >= 38) {
            scrollPos += 9;
        }
    }

    if(isRight == true && gameChar_y >= 250) {
        // Move Right
        if(gameChar_x < width * 0.8 && gameChar_world_x <= 12000) {
            gameChar_x += 9;
        } else if(gameChar_world_x <= 12000) {
            scrollPos -= 9;
        }
    }

    // Logic to make the game character rise and fall.

    if(gameChar_y < floorPos_y && gameChar_y >= floorPos_y - 100) {
        isFalling = true;

        if(isLeft == true || isRight == true) {
            gameChar_y += 2;
        } else {
            gameChar_y += 10;
        }
    } else if(gameChar_y < floorPos_y && gameChar_y >= floorPos_y - 550) {
        isFalling = true;
        gameChar_y += 60;
    }

    if(isPlummeting == true && gameChar_y >= 250) {
        gameChar_y += 6;
    } else if(gameChar_y >= floorPos_y) {
        gameChar_y = floorPos_y;

        isFalling = false;
    }

    // Update real position of gameChar for collision detection.

    gameChar_world_x = gameChar_x - scrollPos;
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed() {
    if(GameStarted == false && keyCode == 32 && GameStart_timer == 0) {
        GameStarted = true;

        GameMusicSound.loop();
        WaterfallSound.loop();
    }

    if(keyCode == 37 && flagpole.isReached == false && GameStarted == true) {
        isLeft = true;
    }

    if(keyCode == 39 && flagpole.isReached == false && GameStarted == true) {
        isRight = true;
    }

    if(keyCode == 32 && gameChar_y == floorPos_y && GameStarted == true) {
        gameChar_y -= 100;

        JumpSound.play();
    }

    if(keyCode == 32 && lives < 1) {
        lives = 3;
        game_score = 0;

        for(var i = 0; i < mountains_2.length; i++) {
            mountains_2[i].pos_blue = random(255, 130);
            mountains_2[i].pos_x = 0 + i * 100;
            mountains_2[i].pos_y = 432 + 25;
            mountains_2[i].pos_h = random(32, 432);
            mountains_2[i].pos_h2 = random(232, 432);
            mountains_2[i].pos_speed = random(1, 3);
        }

        for(var i = 0; i < 50; i++) {
            if(i != 2) {
                collectables[i].pos_x = 100 + i * 200;
                collectables[i].pos_y = random(432, 372);
                collectables[i].size = 0;
                collectables[i].isFound = false;
                collectables[i].scoreCounted = false;
            }
        }
    }

    if(keyCode == 32 && flagpole.isReached == true) {
        StartGame();
        flagpole.isReached = false;
        flag_position = 0;
        lives = 3;
        game_score = 0;

        for(var i = 0; i < mountains_2.length; i++) {
            mountains_2[i].pos_blue = random(255, 130);
            mountains_2[i].pos_x = 0 + i * 100;
            mountains_2[i].pos_y = 432 + 25;
            mountains_2[i].pos_h = random(32, 432);
            mountains_2[i].pos_h2 = random(232, 432);
            mountains_2[i].pos_speed = random(1, 3);
        }

        for(var i = 0; i < 50; i++) {
            if(i != 2) {
                collectables[i].pos_x = 100 + i * 200;
                collectables[i].pos_y = random(432, 372);
                collectables[i].size = 0;
                collectables[i].isFound = false;
                collectables[i].scoreCounted = false;
            }
        }
    }
}

function keyReleased() {
    if(key == "A" || keyCode == 37) {
        isLeft = false;
    }

    if(key == "D" || keyCode == 39) {
        isRight = false;
    }
}

// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function DrawGameCharacter() {
    if(isLeft && isFalling) {
        stroke(235, 52, 52);
        strokeWeight(13);
        line(
            gameChar_x,
            gameChar_y - 52 + 20,
            gameChar_x,
            gameChar_y - 52 + 20 + 20
        ); // Left Leg

        // stroke(151, 48, 48);
        stroke(235, 52, 52);
        strokeWeight(30);
        line(
            gameChar_x - 10,
            gameChar_y - 52 + 5,
            gameChar_x,
            gameChar_y - 52 + 20
        ); // Game Character Body

        stroke(235, 52, 52);
        strokeWeight(11);
        line(
            gameChar_x + 4,
            gameChar_y - 52 - 9,
            gameChar_x + 20,
            gameChar_y - 52 + 12
        );
        stroke(224, 224, 224);
        strokeWeight(8);
        line(
            gameChar_x + 4,
            gameChar_y - 52 - 9,
            gameChar_x + 20,
            gameChar_y - 52 + 12
        ); // Game charater Bag

        stroke(192, 192, 192);
        strokeWeight(1);
        fill(249, 249, 249);
        ellipse(gameChar_x - 16, gameChar_y - 52 + 3, 30 - 7, 30 - 15); // Game Character Face

        stroke(224, 224, 224);
        strokeWeight(10);
        line(
            gameChar_x + 30,
            gameChar_y - 52 + 62,
            gameChar_x - 30,
            gameChar_y - 52 + 39
        ); // SkateBoard Right

        stroke(51);
        strokeWeight(2);
        line(
            gameChar_x + 30,
            gameChar_y - 52 + 25,
            gameChar_x + 54,
            gameChar_y - 52 - 5
        );
        noStroke();
        fill(255, 255, 255);
        ellipse(gameChar_x + 54, gameChar_y - 52 - 5, 30 - 26, 30 - 26); // Right Stick

        stroke(235, 52, 52);
        strokeWeight(7);
        line(
            gameChar_x + 11,
            gameChar_y - 52 + 13,
            gameChar_x + 30,
            gameChar_y - 52 + 10 + 15
        ); // Right Hand
    } else if(isRight && isFalling) {
        stroke(235, 52, 52);
        strokeWeight(13);
        line(
            gameChar_x,
            gameChar_y - 52 + 20,
            gameChar_x,
            gameChar_y - 52 + 20 + 20
        ); // Left Leg

        stroke(235, 52, 52);
        strokeWeight(30);
        line(
            gameChar_x + 10,
            gameChar_y - 52 + 5,
            gameChar_x,
            gameChar_y - 52 + 20
        ); // Game Character Body

        stroke(235, 52, 52);
        strokeWeight(11);
        line(
            gameChar_x - 4,
            gameChar_y - 52 - 9,
            gameChar_x - 20,
            gameChar_y - 52 + 12
        );
        stroke(224, 224, 224);
        strokeWeight(8);
        line(
            gameChar_x - 4,
            gameChar_y - 52 - 9,
            gameChar_x - 20,
            gameChar_y - 52 + 12
        ); // Game charater Bag

        stroke(192, 192, 192);
        strokeWeight(1);
        fill(249, 249, 249);
        ellipse(gameChar_x + 16, gameChar_y - 52 + 3, 30 - 7, 30 - 15); // Game Character Face

        stroke(224, 224, 224);
        strokeWeight(10);
        line(
            gameChar_x + 30,
            gameChar_y - 52 + 39,
            gameChar_x - 30,
            gameChar_y - 52 + 62
        ); // SkateBoard Right

        stroke(51);
        strokeWeight(2);
        line(
            gameChar_x - 30,
            gameChar_y - 52 + 25,
            gameChar_x - 54,
            gameChar_y - 52 - 5
        );
        noStroke();
        fill(255, 255, 255);
        ellipse(gameChar_x - 54, gameChar_y - 52 - 5, 30 - 26, 30 - 26); // Right Stick

        // stroke(151, 48, 48);
        stroke(235, 52, 52);
        strokeWeight(7);
        line(
            gameChar_x - 11,
            gameChar_y - 52 + 13,
            gameChar_x - 30,
            gameChar_y - 52 + 10 + 15
        ); // Right Hand
    } else if(isLeft) {
        stroke(235, 52, 52);
        strokeWeight(13);
        line(
            gameChar_x,
            gameChar_y - 52 + 20,
            gameChar_x,
            gameChar_y - 52 + 20 + 20
        ); // Left Leg

        strokeWeight(30);
        line(gameChar_x - 5, gameChar_y - 52 + 5, gameChar_x, gameChar_y - 52 + 20); // Game Character Body

        strokeWeight(11);
        line(
            gameChar_x + 12,
            gameChar_y - 52 - 6,
            gameChar_x + 21,
            gameChar_y - 52 + 18
        );

        stroke(224, 224, 224);
        strokeWeight(8);
        line(
            gameChar_x + 12,
            gameChar_y - 52 - 6,
            gameChar_x + 21,
            gameChar_y - 52 + 18
        ); // Game charater Bag

        stroke(192, 192, 192);
        strokeWeight(1);
        fill(249, 249, 249);
        ellipse(gameChar_x - 12, gameChar_y - 52 + 2, 30 - 7, 30 - 15); // Game Character Face

        stroke(224, 224, 224);
        strokeWeight(10);
        line(
            gameChar_x + 32,
            gameChar_y - 52 + 47,
            gameChar_x - 32,
            gameChar_y - 52 + 47
        ); // SkateBoard Right

        stroke(51);
        strokeWeight(2);
        line(
            gameChar_x - 30,
            gameChar_y - 52 + 25,
            gameChar_x - 20,
            gameChar_y - 52 + 48
        );
        noStroke();
        fill(255, 255, 255);
        ellipse(gameChar_x - 19, gameChar_y - 52 + 51, 30 - 26, 30 - 26); // Right Stick

        stroke(235, 52, 52);
        strokeWeight(7);
        line(
            gameChar_x - 11,
            gameChar_y - 52 + 13,
            gameChar_x - 30,
            gameChar_y - 52 + 10 + 15
        ); // Right Hand
    } else if(isRight) {
        stroke(235, 52, 52);
        strokeWeight(13);
        line(
            gameChar_x,
            gameChar_y - 52 + 20,
            gameChar_x,
            gameChar_y - 52 + 20 + 20
        ); // Left Leg

        strokeWeight(30);
        line(gameChar_x + 5, gameChar_y - 52 + 5, gameChar_x, gameChar_y - 52 + 20); // Game Character Body

        strokeWeight(11);
        line(
            gameChar_x - 12,
            gameChar_y - 52 - 6,
            gameChar_x - 21,
            gameChar_y - 52 + 18
        );
        stroke(224, 224, 224);
        strokeWeight(8);
        line(
            gameChar_x - 12,
            gameChar_y - 52 - 6,
            gameChar_x - 21,
            gameChar_y - 52 + 18
        ); // Game charater Bag

        stroke(192, 192, 192);
        strokeWeight(1);
        fill(249, 249, 249);
        ellipse(gameChar_x + 12, gameChar_y - 52 + 2, 30 - 7, 30 - 15); // Game Character Face

        stroke(224, 224, 224);
        strokeWeight(10);
        line(
            gameChar_x + 32,
            gameChar_y - 52 + 47,
            gameChar_x - 32,
            gameChar_y - 52 + 47
        ); // SkateBoard Right

        stroke(51);
        strokeWeight(2);
        line(
            gameChar_x + 30,
            gameChar_y - 52 + 25,
            gameChar_x + 20,
            gameChar_y - 52 + 48
        );
        noStroke();
        fill(255, 255, 255);
        ellipse(gameChar_x + 19, gameChar_y - 52 + 51, 30 - 26, 30 - 26); // Right Stick

        stroke(235, 52, 52);
        strokeWeight(7);
        line(
            gameChar_x + 11,
            gameChar_y - 52 + 13,
            gameChar_x + 30,
            gameChar_y - 52 + 10 + 15
        ); // Right Hand
        noStroke();
    } else if(isFalling || isPlummeting) {
        stroke(151, 48, 48);
        strokeWeight(10);
        line(
            gameChar_x - 15,
            gameChar_y - 52,
            gameChar_x - 15,
            gameChar_y - 52 + 20 + 7
        );
        stroke(224, 224, 224);
        strokeWeight(7.5);
        line(
            gameChar_x - 15,
            gameChar_y - 52,
            gameChar_x - 15,
            gameChar_y - 52 + 20 + 7
        ); // Left Bag

        stroke(151, 48, 48);
        strokeWeight(10);
        line(
            gameChar_x + 15,
            gameChar_y - 52,
            gameChar_x + 15,
            gameChar_y - 52 + 20 + 7
        );
        stroke(224, 224, 224);
        strokeWeight(7.5);
        line(
            gameChar_x + 15,
            gameChar_y - 52,
            gameChar_x + 15,
            gameChar_y - 52 + 20 + 7
        ); // Right Bag

        stroke(235, 52, 52);
        strokeWeight(10);
        line(
            gameChar_x - 10,
            gameChar_y - 52 + 20,
            gameChar_x - 20,
            gameChar_y - 52 + 20 + 20
        ); // Left Leg
        line(
            gameChar_x + 10,
            gameChar_y - 52 + 20,
            gameChar_x + 20,
            gameChar_y - 52 + 20 + 20
        ); // Right Leg

        stroke(235, 52, 52);
        strokeWeight(7);
        line(
            gameChar_x - 17,
            gameChar_y - 52 + 10,
            gameChar_x - 31,
            gameChar_y - 52 + 10 - 15
        ); // Left Hand
        line(
            gameChar_x + 17,
            gameChar_y - 52 + 10,
            gameChar_x + 30,
            gameChar_y - 52 + 10 - 15
        ); // Right Hand

        stroke(51);
        strokeWeight(2);
        line(
            gameChar_x - 30,
            gameChar_y - 52 + 10 - 15,
            gameChar_x - 45,
            gameChar_y - 52 + 25
        );
        noStroke();
        fill(255, 255, 255);
        ellipse(gameChar_x - 45, gameChar_y - 52 + 25, 30 - 26, 30 - 26); // Left Stick

        stroke(51);
        strokeWeight(2);
        line(
            gameChar_x + 30,
            gameChar_y - 52 + 10 - 15,
            gameChar_x + 45,
            gameChar_y - 52 + 25
        );
        noStroke();
        fill(255, 255, 255);
        ellipse(gameChar_x + 45, gameChar_y - 52 + 25, 30 - 26, 30 - 26); // Right Stick

        stroke(235, 52, 52);
        strokeWeight(30);
        line(gameChar_x, gameChar_y - 52, gameChar_x, gameChar_y - 52 + 20); // Game Character Body

        stroke(192, 192, 192);
        strokeWeight(1);
        fill(249, 249, 249);
        ellipse(gameChar_x, gameChar_y - 52, 30 - 7, 30 - 15); // Game Character Face

        fill(224, 224, 224);
        ellipse(gameChar_x - 22, gameChar_y - 52 + 47, 30 - 13, 30 - 20); // SkateBoard Left
        ellipse(gameChar_x + 22, gameChar_y - 52 + 47, 30 - 13, 30 - 20); // SkateBoard Right
    } else {
        stroke(151, 48, 48);
        strokeWeight(10);
        line(
            gameChar_x - 15,
            gameChar_y - 52,
            gameChar_x - 15,
            gameChar_y - 52 + 20 + 7
        );
        stroke(224, 224, 224);
        strokeWeight(7.5);
        line(
            gameChar_x - 15,
            gameChar_y - 52,
            gameChar_x - 15,
            gameChar_y - 52 + 20 + 7
        ); // Left Bag

        stroke(151, 48, 48);
        strokeWeight(10);
        line(
            gameChar_x + 15,
            gameChar_y - 52,
            gameChar_x + 15,
            gameChar_y - 52 + 20 + 7
        );
        stroke(224, 224, 224);
        strokeWeight(7.5);
        line(
            gameChar_x + 15,
            gameChar_y - 52,
            gameChar_x + 15,
            gameChar_y - 52 + 20 + 7
        ); // Right Bag

        stroke(235, 52, 52);
        strokeWeight(10);
        line(
            gameChar_x - 10,
            gameChar_y - 52 + 20,
            gameChar_x - 10,
            gameChar_y - 52 + 20 + 20
        ); // Left Leg
        line(
            gameChar_x + 10,
            gameChar_y - 52 + 20,
            gameChar_x + 10,
            gameChar_y - 52 + 20 + 20
        ); // Right Leg

        stroke(235, 52, 52);
        strokeWeight(7);
        line(
            gameChar_x - 17,
            gameChar_y - 52 + 10,
            gameChar_x - 31,
            gameChar_y - 52 + 10 + 15
        ); // Left Hand
        line(
            gameChar_x + 17,
            gameChar_y - 52 + 10,
            gameChar_x + 30,
            gameChar_y - 52 + 10 + 15
        ); // Right Hand

        stroke(51);
        strokeWeight(2);
        line(
            gameChar_x - 30,
            gameChar_y - 52 + 25,
            gameChar_x - 30,
            gameChar_y - 52 + 51
        );
        noStroke();
        fill(255, 255, 255);
        ellipse(gameChar_x - 30, gameChar_y - 52 + 51, 30 - 26, 30 - 26); // Left Stick

        stroke(51);
        line(
            gameChar_x + 30,
            gameChar_y - 52 + 25,
            gameChar_x + 30,
            gameChar_y - 52 + 51
        );
        noStroke();
        ellipse(gameChar_x + 30, gameChar_y - 52 + 51, 30 - 26, 30 - 26); // Right Stick

        stroke(235, 52, 52);
        strokeWeight(30);
        line(gameChar_x, gameChar_y - 52, gameChar_x, gameChar_y - 52 + 20); // Game Character Body

        stroke(192, 192, 192);
        strokeWeight(1);
        fill(249, 249, 249);
        ellipse(gameChar_x, gameChar_y - 52, 30 - 7, 30 - 15); // Game Character Face

        fill(224, 224, 224);
        ellipse(gameChar_x - 10, gameChar_y - 52 + 47, 30 - 13, 30 - 20); // SkateBoard Left
        ellipse(gameChar_x + 10, gameChar_y - 52 + 47, 30 - 13, 30 - 20); // SkateBoard Right
    }
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw background objects.

function DrawBackground() {
    for(var h = 0; h < height; h++) {
        background_color_map = map(h, 0, height, 0, 1.5);

        var gradient = lerpColor(
            background_color_1,
            background_color_2,
            background_color_map
        );

        stroke(gradient);
        line(0, h, width, h);
        noStroke();
    }
}

// Function to draw cloud objects.

function DrawClouds() {
    for(var i = 0; i < clouds.length; i++) {
        //			if(gameChar_world_x -  clouds[i].pos_x + 73.5 >= -3000 && gameChar_world_x -  clouds[i].pos_x + 73.5 <= 3000) // Draw Only When Player Is Near
        //				{
        push();
        translate(0, 0);
        scale(clouds[i].size); // Cloud Size Scaler

        stroke(130, 130, 130);
        fill(130, 130, 130);
        strokeWeight(10);
        line(
            clouds[i].pos_x + 3,
            clouds[i].pos_y - 75 + 3,
            clouds[i].pos_x + 135 + 3,
            clouds[i].pos_y - 75 + 3
        );
        strokeWeight(10);
        ellipse(clouds[i].pos_x + 55 + 3, clouds[i].pos_y - 85 + 3, 20, 14);
        ellipse(clouds[i].pos_x + 85 + 3, clouds[i].pos_y - 90 + 3, 30, 24);
        ellipse(clouds[i].pos_x + 125 + 3, clouds[i].pos_y - 100 + 3, 55, 50); // Cloud Shadow

        stroke(255, 255, 255);
        fill(255, 255, 255);
        strokeWeight(10);
        line(
            clouds[i].pos_x,
            clouds[i].pos_y - 75,
            clouds[i].pos_x + 135,
            clouds[i].pos_y - 75
        );
        strokeWeight(10);
        ellipse(clouds[i].pos_x + 55, clouds[i].pos_y - 85, 20, 14);
        ellipse(clouds[i].pos_x + 85, clouds[i].pos_y - 90, 30, 24);
        ellipse(clouds[i].pos_x + 125, clouds[i].pos_y - 100, 55, 50); // Cloud
        noStroke();

        clouds[i].pos_x += 1.5;

        if(clouds[i].pos_x >= width * 10) {
            clouds[i].pos_x = random(-100, -3500);
        }

        pop();

        //				}
    }
}

// Function of cloud objects array.

function CloudsArray() {
    clouds = [];

    for(i = 0; i < 20 * 4; i++) {
        clouds.push({
            pos_x: 50 + i * 170,
            pos_y: random(150, 350),
            size: random(0.8, 1.3)
        });
    }
}

// Function to draw mountains objects.

function DrawMountains() {
    for(var i = 0; i < mountains.length; i++) {
        if(
            gameChar_world_x - mountains[i].pos_x + 220 >= -3000 &&
            gameChar_world_x - mountains[i].pos_x + 220 <= 3000
        ) {
            push();
            translate(mountains[i].translateX, mountains[i].translateY); // Mountain Size Scaler
            scale(mountains[i].size);

            noStroke();
            fill(130, 130, 130); // White Mountain Shadow
            quad(
                mountains[i].pos_x + 15 + 5,
                mountains[i].pos_y,
                mountains[i].pos_x + 93 + 5,
                mountains[i].pos_y - 194,
                mountains[i].pos_x + 146 + 5,
                mountains[i].pos_y - 233,
                mountains[i].pos_x + 146 + 5,
                mountains[i].pos_y
            );
            quad(
                mountains[i].pos_x + 146 + 5,
                mountains[i].pos_y - 233,
                mountains[i].pos_x + 201 + 0,
                mountains[i].pos_y - 335,
                mountains[i].pos_x + 211 + 25,
                mountains[i].pos_y,
                mountains[i].pos_x + 146 + 5,
                mountains[i].pos_y
            );
            quad(
                mountains[i].pos_x + 220 + 0,
                mountains[i].pos_y - 367,
                mountains[i].pos_x + 236 + 5,
                mountains[i].pos_y - 343,
                mountains[i].pos_x + 251 + 5,
                mountains[i].pos_y,
                mountains[i].pos_x + 201 + 5,
                mountains[i].pos_y
            );
            quad(
                mountains[i].pos_x + 235 + 5,
                mountains[i].pos_y - 344,
                mountains[i].pos_x + 285 + 5,
                mountains[i].pos_y - 295,
                mountains[i].pos_x + 285 + 5,
                mountains[i].pos_y,
                mountains[i].pos_x + 251 + 5,
                mountains[i].pos_y
            );
            quad(
                mountains[i].pos_x + 284 + 5,
                mountains[i].pos_y - 256,
                mountains[i].pos_x + 335 + 5,
                mountains[i].pos_y - 188,
                mountains[i].pos_x + 335 + 5,
                mountains[i].pos_y,
                mountains[i].pos_x + 284 + 5,
                mountains[i].pos_y
            );
            quad(
                mountains[i].pos_x + 335 + 5,
                mountains[i].pos_y - 166,
                mountains[i].pos_x + 391 + 5,
                mountains[i].pos_y - 128,
                mountains[i].pos_x + 391 + 5,
                mountains[i].pos_y,
                mountains[i].pos_x + 335 + 5,
                mountains[i].pos_y
            );
            quad(
                mountains[i].pos_x + 391 + 5,
                mountains[i].pos_y - 115,
                mountains[i].pos_x + 451 + 5,
                mountains[i].pos_y - 40,
                mountains[i].pos_x + 455 + 5,
                mountains[i].pos_y,
                mountains[i].pos_x + 391 + 5,
                mountains[i].pos_y
            );

            fill(246, 246, 230); // White Mountain
            quad(
                mountains[i].pos_x + 15,
                mountains[i].pos_y,
                mountains[i].pos_x + 93,
                mountains[i].pos_y - 194,
                mountains[i].pos_x + 146,
                mountains[i].pos_y - 233,
                mountains[i].pos_x + 146,
                mountains[i].pos_y
            );
            quad(
                mountains[i].pos_x + 146,
                mountains[i].pos_y - 233,
                mountains[i].pos_x + 201,
                mountains[i].pos_y - 335,
                mountains[i].pos_x + 211,
                mountains[i].pos_y,
                mountains[i].pos_x + 146,
                mountains[i].pos_y
            );
            quad(
                mountains[i].pos_x + 220,
                mountains[i].pos_y - 367,
                mountains[i].pos_x + 236,
                mountains[i].pos_y - 343,
                mountains[i].pos_x + 251,
                mountains[i].pos_y,
                mountains[i].pos_x + 201,
                mountains[i].pos_y
            );
            quad(
                mountains[i].pos_x + 235,
                mountains[i].pos_y - 344,
                mountains[i].pos_x + 285,
                mountains[i].pos_y - 295,
                mountains[i].pos_x + 285,
                mountains[i].pos_y,
                mountains[i].pos_x + 251,
                mountains[i].pos_y
            );
            quad(
                mountains[i].pos_x + 284,
                mountains[i].pos_y - 256,
                mountains[i].pos_x + 335,
                mountains[i].pos_y - 188,
                mountains[i].pos_x + 335,
                mountains[i].pos_y,
                mountains[i].pos_x + 284,
                mountains[i].pos_y
            );
            quad(
                mountains[i].pos_x + 335,
                mountains[i].pos_y - 166,
                mountains[i].pos_x + 391,
                mountains[i].pos_y - 128,
                mountains[i].pos_x + 391,
                mountains[i].pos_y,
                mountains[i].pos_x + 335,
                mountains[i].pos_y
            );
            quad(
                mountains[i].pos_x + 391,
                mountains[i].pos_y - 115,
                mountains[i].pos_x + 451,
                mountains[i].pos_y - 40,
                mountains[i].pos_x + 455,
                mountains[i].pos_y,
                mountains[i].pos_x + 391,
                mountains[i].pos_y
            );

            fill(10, 10, 10); // Grey Mountains Shadow
            quad(
                mountains[i].pos_x + 5,
                mountains[i].pos_y,
                mountains[i].pos_x + 119 + 0,
                mountains[i].pos_y - 144,
                mountains[i].pos_x + 258 + 15,
                mountains[i].pos_y - 76,
                mountains[i].pos_x + 372 + 5,
                mountains[i].pos_y
            );
            quad(
                mountains[i].pos_x + 117 + 5,
                mountains[i].pos_y,
                mountains[i].pos_x + 247 + 5,
                mountains[i].pos_y - 124,
                mountains[i].pos_x + 298 + 0,
                mountains[i].pos_y - 194,
                mountains[i].pos_x + 430 + 15,
                mountains[i].pos_y
            );
            quad(
                mountains[i].pos_x + 240 + 5,
                mountains[i].pos_y,
                mountains[i].pos_x + 387 + 0,
                mountains[i].pos_y - 110,
                mountains[i].pos_x + 444 + 5,
                mountains[i].pos_y - 76,
                mountains[i].pos_x + 468 + 2,
                mountains[i].pos_y
            );

            fill(130, 130, 130); // Grey Mountains
            quad(
                mountains[i].pos_x,
                mountains[i].pos_y,
                mountains[i].pos_x + 119,
                mountains[i].pos_y - 144,
                mountains[i].pos_x + 258,
                mountains[i].pos_y - 76,
                mountains[i].pos_x + 372,
                mountains[i].pos_y
            );
            fill(100, 100, 100);
            quad(
                mountains[i].pos_x + 117,
                mountains[i].pos_y,
                mountains[i].pos_x + 247,
                mountains[i].pos_y - 124,
                mountains[i].pos_x + 298,
                mountains[i].pos_y - 194,
                mountains[i].pos_x + 430,
                mountains[i].pos_y
            );
            fill(80, 80, 80);
            quad(
                mountains[i].pos_x + 240,
                mountains[i].pos_y,
                mountains[i].pos_x + 387,
                mountains[i].pos_y - 110,
                mountains[i].pos_x + 444,
                mountains[i].pos_y - 76,
                mountains[i].pos_x + 468,
                mountains[i].pos_y
            );

            stroke(246, 246, 230);
            strokeWeight(7);
            line(
                mountains[i].pos_x + 85,
                mountains[i].pos_y - 87,
                mountains[i].pos_x + 185,
                mountains[i].pos_y - 87
            ); // Water Fall Platform
            noStroke();

            stroke(246, 246, 230);
            strokeWeight(7);
            line(
                mountains[i].pos_x + 89,
                mountains[i].pos_y - 87,
                mountains[i].pos_x + 89,
                mountains[i].pos_y - 50
            ); // Water Fall Left Platform Down Line 1
            noStroke();

            stroke(246, 246, 230);
            strokeWeight(7);
            line(
                mountains[i].pos_x + 181,
                mountains[i].pos_y - 87,
                mountains[i].pos_x + 181,
                mountains[i].pos_y - 50
            ); // Water Fall Left Platform Down Line 1
            noStroke();

            stroke(246, 246, 230);
            strokeWeight(7);
            line(
                mountains[i].pos_x + 90.5,
                mountains[i].pos_y - 87,
                mountains[i].pos_x + 90.5,
                mountains[i].pos_y - 35
            ); // Water Fall Left Platform Down Line 2
            noStroke();

            stroke(246, 246, 230);
            strokeWeight(7);
            line(
                mountains[i].pos_x + 179.5,
                mountains[i].pos_y - 87,
                mountains[i].pos_x + 179.5,
                mountains[i].pos_y - 35
            ); // Water Fall Right Platform Down Line 2
            noStroke();

            fill(85, 98, 112);
            rect(mountains[i].pos_x + 90, mountains[i].pos_y - 90, 91, 7); // Water Fall Shadow

            fill(85, 98, 112);
            rect(mountains[i].pos_x + 90, mountains[i].pos_y - 90, 91, 100); // Water Fall

            for(var j = 0; j < waterfall.length; j++) {
                fill(waterfall[j].pos_color);
                ellipse(
                    mountains[i].pos_x + 90 + waterfall[j].pos_x,
                    mountains[i].pos_y - 90 + waterfall[j].pos_y,
                    random(2, 5)
                ); // Water Fall Droplets

                waterfall[j].pos_y += 0.21;

                if(waterfall[j].pos_y > 91) {
                    waterfall[j].pos_y = -2;
                }
            }

            stroke(246, 246, 230);
            strokeWeight(7);
            line(
                mountains[i].pos_x + 85 + 170,
                mountains[i].pos_y - 87 - 40,
                mountains[i].pos_x + 165 + 170,
                mountains[i].pos_y - 87 - 40
            ); // Water Fall Platform
            noStroke();

            stroke(246, 246, 230);
            strokeWeight(7);
            line(
                mountains[i].pos_x + 89 + 170,
                mountains[i].pos_y - 87 - 40,
                mountains[i].pos_x + 89 + 170,
                mountains[i].pos_y - 50 - 40
            ); // Water Fall Left Platform Down Line 1
            noStroke();

            stroke(246, 246, 230);
            strokeWeight(7);
            line(
                mountains[i].pos_x + 161 + 170,
                mountains[i].pos_y - 87 - 40,
                mountains[i].pos_x + 161 + 170,
                mountains[i].pos_y - 50 - 40
            ); // Water Fall Right Platform Down Line 1
            noStroke();

            stroke(246, 246, 230);
            strokeWeight(7);
            line(
                mountains[i].pos_x + 90.5 + 170,
                mountains[i].pos_y - 87 - 40,
                mountains[i].pos_x + 90.5 + 170,
                mountains[i].pos_y - 15 - 40
            ); // Water Fall Left Platform Down Line 2
            noStroke();

            stroke(246, 246, 230);
            strokeWeight(7);
            line(
                mountains[i].pos_x + 159.5 + 170,
                mountains[i].pos_y - 87 - 40,
                mountains[i].pos_x + 159.5 + 170,
                mountains[i].pos_y - 15 - 40
            ); // Water Fall Right Platform Down Line 2
            noStroke();

            fill(85, 98, 112);
            rect(mountains[i].pos_x + 90 + 170, mountains[i].pos_y - 90 - 40, 71, 7); // Water Fall Shadow

            fill(85, 98, 112);
            rect(
                mountains[i].pos_x + 90 + 170,
                mountains[i].pos_y - 90 - 40,
                71,
                200
            ); // Water Fall

            for(var j = 0; j < waterfall_2.length; j++) {
                fill(waterfall_2[j].pos_color);
                ellipse(
                    mountains[i].pos_x + 90 + 170 + waterfall_2[j].pos_x,
                    mountains[i].pos_y - 90 - 40 + waterfall_2[j].pos_y,
                    random(2, 5)
                ); // Water Fall Droplets

                waterfall_2[j].pos_y += 0.21;

                if(waterfall_2[j].pos_y > 91 + 40) {
                    waterfall_2[j].pos_y = -2;
                }
            }

            pop();
        }
    }
}

// Function to draw trees objects.

function DrawTrees() {
    for(var i = 0; i < trees.length; i++) {
        if(
            gameChar_world_x - trees[i].pos_x + 78.5 >= -1000 &&
            gameChar_world_x - trees[i].pos_x + 78.5 <= 1000
        ) {
            fill(117, 78, 0);
            rect(trees[i].pos_x, trees[i].pos_y, 20, 145); // Trunk of Tree

            fill(78, 58, 0);
            rect(trees[i].pos_x + 12, trees[i].pos_y, 7, 145); // Shadow Trunk of Tree

            fill(130, 130, 130);
            triangle(
                trees[i].pos_x + 10,
                trees[i].pos_y - 20,
                trees[i].pos_x - 25,
                trees[i].pos_y + 103,
                trees[i].pos_x + 42,
                trees[i].pos_y + 98
            ); // Shadow Tree Triangle 1

            fill(246, 246, 230);
            triangle(
                trees[i].pos_x + 10,
                trees[i].pos_y - 20,
                trees[i].pos_x - 25,
                trees[i].pos_y + 98,
                trees[i].pos_x + 42,
                trees[i].pos_y + 98
            ); // Tree Triangle 1

            fill(130, 130, 130);
            triangle(
                trees[i].pos_x + 10,
                trees[i].pos_y - 20,
                trees[i].pos_x + 35,
                trees[i].pos_y + 98,
                trees[i].pos_x + 42,
                trees[i].pos_y + 98
            ); // Shadow Tree Triangle 1

            fill(130, 130, 130);
            triangle(
                trees[i].pos_x + 10,
                trees[i].pos_y - 40,
                trees[i].pos_x - 25,
                trees[i].pos_y + 68,
                trees[i].pos_x + 41,
                trees[i].pos_y + 63
            ); // Shadow Tree Triangle 2

            fill(246, 246, 230);
            triangle(
                trees[i].pos_x + 10,
                trees[i].pos_y - 45,
                trees[i].pos_x - 25,
                trees[i].pos_y + 63,
                trees[i].pos_x + 41,
                trees[i].pos_y + 63
            ); // Tree Triangle 2

            fill(130, 130, 130);
            triangle(
                trees[i].pos_x + 10,
                trees[i].pos_y - 45,
                trees[i].pos_x + 35,
                trees[i].pos_y + 63,
                trees[i].pos_x + 41,
                trees[i].pos_y + 63
            ); // Shadow Tree Triangle 2

            stroke(255, 0, 0);
            strokeWeight(2);
            line(
                trees[i].pos_x + 17,
                trees[i].pos_y - 14,
                trees[i].pos_x - 5,
                trees[i].pos_y + 2
            );
            line(
                trees[i].pos_x + 21,
                trees[i].pos_y + 6,
                trees[i].pos_x - 11,
                trees[i].pos_y + 26
            );
            line(
                trees[i].pos_x + 25,
                trees[i].pos_y + 26,
                trees[i].pos_x - 17,
                trees[i].pos_y + 50
            );
            line(
                trees[i].pos_x + 32,
                trees[i].pos_y + 43,
                trees[i].pos_x - 15,
                trees[i].pos_y + 70
            );
            line(
                trees[i].pos_x + 32,
                trees[i].pos_y + 66,
                trees[i].pos_x - 23,
                trees[i].pos_y + 98
            );
            noStroke(); // Lines

            fill(255, 0, 0); // Red
            ellipse(trees[i].pos_x - 10, trees[i].pos_y + 70, 10); // Christmas Balls

            fill(255, 221, 46); // Yellow
            ellipse(trees[i].pos_x + 20, trees[i].pos_y + 50, 10); // Christmas Balls

            fill(255, 96, 47); // Orange
            ellipse(trees[i].pos_x, trees[i].pos_y + 30, 10); // Christmas Balls

            fill(255, 78, 191); // Pink
            ellipse(trees[i].pos_x + 10, trees[i].pos_y + 5, 10); // Christmas Balls

            fill(255, 78, 191); // Pink 2
            ellipse(trees[i].pos_x + 18, trees[i].pos_y + 80, 10); // Christmas Balls

            fill(255, 221, 46); // Yellow 2
            ellipse(trees[i].pos_x - 20, trees[i].pos_y + 90, 10); // Christmas Balls

            fill(255, 0, 0); // Red 2
            ellipse(trees[i].pos_x, trees[i].pos_y + 96, 10); // Christmas Balls

            fill(255, 96, 47); // Orange 2
            ellipse(trees[i].pos_x + 25, trees[i].pos_y + 96, 10); // Christmas Balls

            fill(255, 221, 46); // Yellow 3
            ellipse(trees[i].pos_x - 18, trees[i].pos_y + 45, 10); // Christmas Balls

            fill(255, 221, 46); // Yellow 4
            ellipse(trees[i].pos_x + 25, trees[i].pos_y + 25, 10); // Christmas Balls
        }
    }
}

// Function to draw ground translucent objects.

function DrawGround_Translucent() {
    for(var i = 0; i < grounds.length; i++) {
        noStroke();
        fill(255, 255, 255); // White snow
        rect(grounds[i].pos_x, grounds[i].pos_y, grounds[i].pos_w, 25);
        fill(85, 98, 112, 200); // Blue Water
        rect(grounds[i].pos_x, grounds[i].pos_y + 25, grounds[i].pos_w, 1000);
    }
}

// Function to draw ground objects.

function DrawGround() {
    for(var i = 0; i < grounds.length; i++) {
        noStroke();
        fill(255, 255, 255); // White snow
        rect(grounds[i].pos_x, grounds[i].pos_y, grounds[i].pos_w, 25);
        fill(85, 98, 112, 255); // Blue Water
        rect(grounds[i].pos_x, grounds[i].pos_y + 25, grounds[i].pos_w, 1000);
    }
}

// Function to draw wall objects.

function DrawWalls() {
    fill(255);
    rect(-800, 0, 800, 800);
}

// Function to draw sun objects.

function DrawSun() {
    for(var size = 500; size > 0; size--) {
        sun_color_map = map(size, 0, 500, 0, 0.5);

        var gradient = lerpColor(sun_color_1, sun_color_2, sun_color_map);

        fill(gradient);
        ellipse(width / 2, height / 2, size);
    }
}

// Function to draw wind 1 objects.

function DrawWind_1() {
    for(var j = 0; j < wind.length; j++) {
        var pos_x2 = random(0, 200);

        stroke(255);
        strokeWeight(random(3, 5));
        line(wind[j].pos_x, wind[j].pos_y, wind[j].pos_x + pos_x2, wind[j].pos_y);
        noStroke();

        wind[j].pos_x -= 10;

        if(wind[j].pos_x <= -pos_x2) {
            wind[j].pos_x = width;
            wind[j].pos_x2 = width + random(10, 200);
        }
    }
}

// Function to draw wind 2 objects.

function DrawWind_2() {
    for(var j = 0; j < wind.length; j++) {
        var pos_x2 = random(0, 200);

        stroke(255);
        strokeWeight(random(1, 2));
        line(
            wind[j].pos_x,
            wind[j].pos_y + 200,
            wind[j].pos_x + pos_x2,
            wind[j].pos_y + 200
        );
        noStroke();

        wind[j].pos_x -= 10;

        if(wind[j].pos_x <= -pos_x2) {
            wind[j].pos_x = width;
            wind[j].pos_x2 = width + random(10, 200);
        }
    }
}

// Function to draw mountain 2 objects.

function DrawMountains_2() {
    for(var i = 0; i < mountains_2.length; i++) {
        if(
            gameChar_x - mountains_2[i].pos_x + 175 <= 1300 &&
            gameChar_x - mountains_2[i].pos_x + 175 >= -800
        ) {
            fill(130, 130, mountains_2[i].pos_blue);
            quad(
                mountains_2[i].pos_x,
                mountains_2[i].pos_y,
                mountains_2[i].pos_x + 50,
                mountains_2[i].pos_h,
                mountains_2[i].pos_x + 100,
                mountains_2[i].pos_h2,
                mountains_2[i].pos_x + 150,
                mountains_2[i].pos_y
            );

            fill(100);
            triangle(
                mountains_2[i].pos_x + 100,
                mountains_2[i].pos_h2,
                mountains_2[i].pos_x + 180,
                mountains_2[i].pos_y,
                mountains_2[i].pos_x + 150,
                mountains_2[i].pos_y
            );
        }

        if(gameChar_x > width * 0.8 && isRight == true) {
            mountains_2[i].pos_x -= mountains_2[i].pos_speed;
        }

        if(gameChar_x < width * 0.2 && gameChar_world_x >= 38 && isLeft == true) {
            mountains_2[i].pos_x += mountains_2[i].pos_speed;
        }
    }
}

// Function to draw start point objects.

function DrawStart_Point_Flag() {
    fill(255);
    rect(409 + 20, floorPos_y - 100, 6, 100); // Pole

    stroke(255);
    strokeWeight(3);

    fill(255, 0, 0);
    rect(410 + 20, floorPos_y - 130, 80, 30); // Flag

    noStroke();
    fill(255);
    textSize(20);
    text("START", 450 + 20, floorPos_y - 107); // Start Text
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function DrawCanyon(t_canyon) {
    fill(85, 98, 112);
    rect(t_canyon.pos_x, t_canyon.pos_y + 8, 300, 2000); // Water Canyon
    noFill();
}

function Draw_Canyons() {
    for(
        var i = 0; i < canyons.length; i++ // Draw canyons
    ) {
        DrawCanyon(canyons[i]);
    }
}

// Function to draw canyon translucent objects.

function DrawCanyon_Translucent(t_canyon) {
    fill(85, 98, 112, 200);
    rect(t_canyon.pos_x, t_canyon.pos_y + 8, 300, 2000); // Water Canyon
    noFill();
}

function Draw_Translucent_Canyons() {
    for(var i = 0; i < canyons.length; i++) {
        DrawCanyon_Translucent(canyons[i]);
        CheckCanyon(canyons[i]);
    }
}

// Function to check character is over a canyon.

function CheckCanyon(t_canyon) {
    if(
        gameChar_world_x >= t_canyon.pos_x &&
        gameChar_world_x <= t_canyon.pos_x + 290 &&
        gameChar_y == floorPos_y
    ) {
        isPlummeting = true;
    }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function DrawCollectable(t_collectable) {
    if(
        gameChar_world_x - t_collectable.pos_x >= -1000 &&
        gameChar_world_x - t_collectable.pos_x <= 1000
    ) {
        // Draw Only When Player Is Near
        fill(255);
        triangle(
            t_collectable.pos_x - 19,
            t_collectable.pos_y + collectables_move - 48,
            t_collectable.pos_x + 10 - 19,
            t_collectable.pos_y + collectables_move - 10 - 48,
            t_collectable.pos_x + 26 - 17,
            t_collectable.pos_y + collectables_move + 20 - 48
        ); // White Left Ribbon
        triangle(
            t_collectable.pos_x + 19,
            t_collectable.pos_y + collectables_move - 48,
            t_collectable.pos_x - 10 + 19,
            t_collectable.pos_y + collectables_move - 10 - 48,
            t_collectable.pos_x - 26 + 17,
            t_collectable.pos_y + collectables_move + 20 - 48
        ); // White Right Ribbon

        stroke(189, 20, 6);
        strokeWeight(4);
        line(
            t_collectable.pos_x - 19 + 9,
            t_collectable.pos_y + collectables_move - 49,
            t_collectable.pos_x + 26 - 17,
            t_collectable.pos_y + collectables_move + 20 - 45
        ); // Red Left Ribbon
        line(
            t_collectable.pos_x + 19 - 9,
            t_collectable.pos_y + collectables_move - 49,
            t_collectable.pos_x - 26 + 17,
            t_collectable.pos_y + collectables_move + 20 - 45
        ); // Red Right Ribbon
        noStroke();

        fill(235, 189, 52);
        rect(
            t_collectable.pos_x - 15,
            t_collectable.pos_y + collectables_move - 40,
            30,
            30
        ); // Yeloow Box

        fill(255);
        rect(
            t_collectable.pos_x - 15,
            t_collectable.pos_y + collectables_move - 24,
            30,
            4
        ); // Box White Lines
        rect(
            t_collectable.pos_x - 2,
            t_collectable.pos_y + collectables_move - 40,
            4,
            30
        ); // Box White Lines
        rect(
            t_collectable.pos_x - 18,
            t_collectable.pos_y + collectables_move - 42,
            36,
            8
        ); // White Box Cover

        fill(51, 51, 51, 130);
        rect(
            t_collectable.pos_x - 15,
            t_collectable.pos_y + collectables_move - 34,
            30,
            5
        ); // Box Cover Shadow

        fill(235, 189, 52);
        rect(
            t_collectable.pos_x - 7.5,
            t_collectable.pos_y + collectables_move - 42,
            15,
            8
        ); // Box Cover Yellow Line
        fill(255);
        rect(
            t_collectable.pos_x - 2.5,
            t_collectable.pos_y + collectables_move - 42,
            5,
            8
        ); // Box Cover Yellow Line
    }
}

function Draw_Collectables() {
    for(var i = 0; i < collectables.length; i++) {
        if(collectables[i].isFound == false) {
            DrawCollectable(collectables[i]);
            CheckCollectable(collectables[i]);
        }
    }

    collectables_move += collectables_speed;

    if(collectables_move >= 5) {
        collectables_speed -= 0.3;
    } else if(collectables_move <= -5) {
        collectables_speed += 0.3;
    }
}

// Function to check character has collected an item.

function CheckCollectable(t_collectable) {
    if(
        dist(
            t_collectable.pos_x,
            t_collectable.pos_y,
            gameChar_world_x,
            gameChar_y
        ) <= 30
    ) {
        t_collectable.isFound = true;
        game_score += 2;
        CollectSound.play();
    }
}

// ----------------------------------
// Flagpole items render and check functions
// ----------------------------------

// Function to draw Flagpole objects.

function RenderFlagpole() {
    if(flagpole.isReached == false) {
        //    fill(235, 189, 52);
        fill(240, 58, 58, 255);
        rect(flagpole.x_pos + 15, flagpole.y_pos - 220, 10, 200); // Pole

        fill(235, 189, 12);
        ellipse(flagpole.x_pos + 20, flagpole.y_pos - 217, 15); // Top

        fill(84, 82, 74);
        quad(
            flagpole.x_pos,
            flagpole.y_pos,
            flagpole.x_pos + 5,
            flagpole.y_pos - 20,
            flagpole.x_pos + 35,
            flagpole.y_pos - 20,
            flagpole.x_pos + 40,
            flagpole.y_pos
        ); // Base

        fill(235, 189, 52);
        rect(flagpole.x_pos + 35, flagpole.y_pos - 100, 100, 60); // Flag

        stroke(240, 58, 58, 255);
        strokeWeight(27);
        line(
            flagpole.x_pos + 85,
            flagpole.y_pos - 31 - 50,
            flagpole.x_pos + 85,
            flagpole.y_pos - 31 - 30
        ); // Body
        noStroke();

        fill(255);
        ellipse(flagpole.x_pos + 85, flagpole.y_pos - 31 - 50, 17, 11); // Head
    }

    if(flagpole.isReached == true) {
        //    fill(235, 189, 52);
        fill(240, 58, 58, 255);
        rect(flagpole.x_pos + 15, flagpole.y_pos - 220, 10, 200); // Pole

        fill(235, 189, 12);
        ellipse(flagpole.x_pos + 20, flagpole.y_pos - 217, 15); // Top

        fill(84, 82, 74);
        quad(
            flagpole.x_pos,
            flagpole.y_pos,
            flagpole.x_pos + 5,
            flagpole.y_pos - 20,
            flagpole.x_pos + 35,
            flagpole.y_pos - 20,
            flagpole.x_pos + 40,
            flagpole.y_pos
        ); // Base

        fill(235, 189, 52);
        rect(flagpole.x_pos + 35, flagpole.y_pos - 100 + flag_position, 100, 60); // Flag

        stroke(240, 58, 58, 255);
        strokeWeight(27);
        line(
            flagpole.x_pos + 85,
            flagpole.y_pos - 31 + flag_position - 50,
            flagpole.x_pos + 85,
            flagpole.y_pos - 31 + flag_position - 30
        ); // Body
        noStroke();

        fill(255);
        ellipse(
            flagpole.x_pos + 85,
            flagpole.y_pos - 31 + flag_position - 50,
            17,
            11
        ); // Head

        flag_position -= 2; // Flag Movement

        if(flag_position <= -110) {
            flag_position = -110;
        }
    }
}

// Function to check character has collected an item.

function CheckFlagpole() {
    if(flagpole.isReached == false) {
        if(gameChar_world_x >= 12000) {
            flagpole.isReached = true;
        }
    }
}

// ----------------------------------
// Check Player Die function
// ----------------------------------

function CheckPlayerDie() {
    if(gameChar_y > floorPos_y && gameChar_y < floorPos_y + 10) {
        FallSound.play();
    }

    if(gameChar_y >= height + 500) {
        lives -= 1;
        scrollPos = 0;
        gameChar_x = 512;
        gameChar_world_x = 512;
        gameChar_y = floorPos_y - 550;
		
        if(lives > 0) {
			RespawnSound.play();
		}
        
        isPlummeting = false;
    }

    if(lives < 1) {
        StartGame();
    }
}

// ----------------------------------
// Game Over Render function
// ----------------------------------

function GameOver() {
    if(lives > 1) {
        GameOverSound_boolean_2 = false;
        ScoreCounterSound_boolean_2 = false;
        GameMusicSound.setVolume(0.25);
        WaterfallSound.setVolume(0.5);
    }

    if(lives < 1) {
        fill(50, 50, 50, 200);
        rect(0, 0, width, height); // Background

        fill(240, 58, 58);
        textSize(70);
        textAlign(CENTER);
        text("GAME OVER", width / 2, 270); // Game Over Text

        fill(255);
        textSize(40);
        text("Press SPACE to Continue", width / 2, 345); // Press SPACE to Continue Text

        textSize(60);
        text("SCORE: " + game_score_counter, width / 2 + 5, 465); // SCORE Text

        game_score_counter += 1;

        GameMusicSound.setVolume(0.2);
        WaterfallSound.setVolume(0.0);

        if(GameOverSound_boolean == false && GameOverSound_boolean_2 == false) {
            GameOverSound.play();
            GameOverSound_boolean_2 = true;
        }

        if(game_score_counter >= game_score) {
            game_score_counter = game_score;
        }
    }
}

// ----------------------------------
// Levek Complete Render function
// ----------------------------------

function LevelComplete() {
    if(flagpole.isReached == false) {
        LevelCompleteSound_boolean_2 = false;

        if(lives > 1) {
            GameMusicSound.setVolume(0.25);
            WaterfallSound.setVolume(0.5);
        }
    }

    if(flagpole.isReached == true) {
        fill(50, 50, 50, 200);
        rect(0, 0, width, height); // Background

        fill(240, 58, 58);
        textSize(70);
        textAlign(CENTER);
        text("LEVEL COMPLETE", width / 2, 270); // Level Complete Text

        fill(255);
        textSize(40);
        text("Press SPACE to Continue", width / 2, 345); // Press SPACE to Continue Text

        textSize(60);
        text("SCORE: " + game_score_counter, width / 2 + 5, 465); // SCORE Text

        game_score_counter += 1;

        GameMusicSound.setVolume(0.2);
        WaterfallSound.setVolume(0.0);

        if(
            LevelCompleteSound_boolean == false &&
            LevelCompleteSound_boolean_2 == false
        ) {
            LevelCompleteSound.play();
            LevelCompleteSound_boolean_2 = true;
        }

        if(game_score_counter >= game_score) {
            game_score_counter = game_score;
        }
    }
}

// ----------------------------------
// Game Start Render function
// ----------------------------------

function GameStart() {
    if(GameStarted == false) {
        fill(50, 50, 50, 200);
        rect(0, 0, width, height); // Background

        fill(240, 58, 58);
        textSize(70);
        textAlign(CENTER);
        text("START GAME", width / 2, 270); // Game Over Text

        if(frameCount % 60 == 0 && GameStart_timer > 0) {
            GameStart_timer -= 1;
        }

        if(GameStart_timer > 0) {
            fill(255);
            textSize(60);
            text("Loading... " + GameStart_timer, width / 2, 345); // Game Start Timer
        }

        if(GameStart_timer == 0) {
            GameStart_timer = 0;
            fill(255);
            textSize(40);
            text("Press SPACE to START", width / 2, 345); // Press SPACE to Continue Text
        }

        //			StartGame();
    }
}

// ----------------------------------
// Start Game function
// ----------------------------------

function StartGame() {
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;

    // Boolean variables to control the movement of the game character.

    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;

    // Variable to control the background scrolling.

    scrollPos = 0;
    scrollPos_Y = 0;

    // Variable to store the real position of the gameChar in the game world. Needed for collision detection.

    gameChar_world_x = gameChar_x - scrollPos;

    // Initialise arrays of scenery objects.

    mountains = [{
            pos_x: 305,
            pos_y: 432,
            size: 1,
            translateX: 0,
            translateY: 0
        },
        {
            pos_x: 345 + 830,
            pos_y: 432,
            size: 1.5,
            translateX: -800,
            translateY: -150
        },
        {
            pos_x: 345 + 500 * 2,
            pos_y: 432,
            size: 1,
            translateX: 50,
            translateY: 0
        },
        {
            pos_x: 345 + 500 * 3,
            pos_y: 462,
            size: 2,
            translateX: -1900,
            translateY: -400
        },
        {
            pos_x: 345 + 500 * 4 + 400,
            pos_y: 582,
            size: 1,
            translateX: 0,
            translateY: 0
        },
        {
            pos_x: 345 + 500 * 5 + 80,
            pos_y: 562,
            size: 1,
            translateX: 0,
            translateY: 0
        },
        {
            pos_x: 345 + 500 * 5 + 300,
            pos_y: 462,
            size: 1.5,
            translateX: -1550,
            translateY: -150
        },
        {
            pos_x: 345 + 500 * 7 + 300,
            pos_y: 432,
            size: 1,
            translateX: 0,
            translateY: 0
        },
        {
            pos_x: 345 + 500 * 7 + 400,
            pos_y: 432,
            size: 1,
            translateX: 0,
            translateY: 0
        },
        {
            pos_x: 345 + 500 * 7 + 900,
            pos_y: 432,
            size: 1,
            translateX: 0,
            translateY: 0
        },
        {
            pos_x: 345 + 500 * 7 + 1000,
            pos_y: 432,
            size: 1,
            translateX: 0,
            translateY: 0
        },
        {
            pos_x: 345 + 500 * 9 + 1000,
            pos_y: 432,
            size: 2,
            translateX: -6000,
            translateY: -400
        },
        {
            pos_x: 345 + 500 * 11 + 1300,
            pos_y: 432,
            size: 1,
            translateX: 0,
            translateY: 0
        },
        {
            pos_x: 345 + 500 * 11 + 1500,
            pos_y: 490,
            size: 1,
            translateX: 0,
            translateY: 0
        },
        {
            pos_x: 345 + 500 * 11 + 1700,
            pos_y: 432,
            size: 1,
            translateX: 0,
            translateY: 0
        },
        {
            pos_x: 345 + 500 * 11 + 1900,
            pos_y: 490,
            size: 1,
            translateX: 0,
            translateY: 0
        },
        {
            pos_x: 345 + 500 * 11 + 2000,
            pos_y: 552,
            size: 1,
            translateX: 0,
            translateY: 0
        },
        {
            pos_x: 345 + 500 * 13 + 2100,
            pos_y: 532,
            size: 1,
            translateX: 0,
            translateY: 0
        },
        {
            pos_x: 345 + 500 * 13 + 2400,
            pos_y: 432,
            size: 1.5,
            translateX: -4600,
            translateY: -150
        },
        {
            pos_x: 345 + 500 * 15 + 2400,
            pos_y: 432,
            size: 1,
            translateX: 0,
            translateY: 0
        },
        {
            pos_x: 345 + 500 * 15 + 2570,
            pos_y: 432,
            size: 1,
            translateX: 0,
            translateY: 0
        },
        {
            pos_x: 345 + 500 * 15 + 3010,
            pos_y: 462,
            size: 1,
            translateX: 0,
            translateY: 0
        },
        {
            pos_x: 345 + 500 * 17 + 2910,
            pos_y: 432,
            size: 2,
            translateX: -12000,
            translateY: -400
        }
    ];

    canyons = [{
            pos_x: 840,
            pos_y: 432
        },
        {
            pos_x: 840 + 1500,
            pos_y: 432
        },
        {
            pos_x: 840 + 1500 * 2,
            pos_y: 432
        },
        {
            pos_x: 840 + 1500 * 3,
            pos_y: 432
        },
        {
            pos_x: 840 + 1500 * 4,
            pos_y: 432
        },
        {
            pos_x: 840 + 1500 * 5,
            pos_y: 432
        },
        {
            pos_x: 840 + 1500 * 6,
            pos_y: 432
        },
        {
            pos_x: 840 + 1500 * 7,
            pos_y: 432
        }
    ];

    grounds = [{
            pos_x: 0,
            pos_y: 432,
            pos_w: 840
        },
        {
            pos_x: 840 + 300,
            pos_y: 432,
            pos_w: 1200
        },
        {
            pos_x: 840 + 300 * 2 + 1200,
            pos_y: 432,
            pos_w: 1200
        },
        {
            pos_x: 840 + 300 * 7 + 1200,
            pos_y: 432,
            pos_w: 1200
        },
        {
            pos_x: 840 + 300 * 12 + 1200,
            pos_y: 432,
            pos_w: 1200
        },
        {
            pos_x: 840 + 300 * 17 + 1200,
            pos_y: 432,
            pos_w: 1200
        },
        {
            pos_x: 840 + 300 * 22 + 1200,
            pos_y: 432,
            pos_w: 1200
        },
        {
            pos_x: 840 + 300 * 27 + 1200,
            pos_y: 432,
            pos_w: 1200
        },
        {
            pos_x: 840 + 300 * 32 + 1200,
            pos_y: 432,
            pos_w: 1200
        },
        {
            pos_x: 840 + 300 * 27 + 1200,
            pos_y: 432,
            pos_w: 1200
        }
    ];

    trees = [{
            pos_x: 130,
            pos_y: 302
        },
        {
            pos_x: 230,
            pos_y: 322
        },
        {
            pos_x: 330,
            pos_y: 322
        },
        {
            pos_x: 750,
            pos_y: 312
        },
        {
            pos_x: 1250,
            pos_y: 302
        },
        {
            pos_x: 1730,
            pos_y: 309
        },
        {
            pos_x: 1800,
            pos_y: 302
        },
        {
            pos_x: 1870,
            pos_y: 356
        },
        {
            pos_x: 1960,
            pos_y: 302
        },
        {
            pos_x: 2260,
            pos_y: 312
        },
        {
            pos_x: 2750,
            pos_y: 356
        },
        {
            pos_x: 2790,
            pos_y: 312
        },
        {
            pos_x: 3490,
            pos_y: 302
        },
        {
            pos_x: 3540,
            pos_y: 322
        },
        {
            pos_x: 3640,
            pos_y: 309
        },
        {
            pos_x: 3740,
            pos_y: 302
        },
        {
            pos_x: 4200,
            pos_y: 302
        },
        {
            pos_x: 4500,
            pos_y: 302
        },
        {
            pos_x: 4560,
            pos_y: 316
        },
        {
            pos_x: 4880,
            pos_y: 302
        },
        {
            pos_x: 5180,
            pos_y: 302
        },
        {
            pos_x: 5240,
            pos_y: 322
        },
        {
            pos_x: 5680,
            pos_y: 302
        },
        {
            pos_x: 5980,
            pos_y: 302
        },
        {
            pos_x: 6400,
            pos_y: 312
        },
        {
            pos_x: 7180,
            pos_y: 302
        },
        {
            pos_x: 7250,
            pos_y: 315
        },
        {
            pos_x: 7760,
            pos_y: 302
        },
        {
            pos_x: 7810,
            pos_y: 322
        },
        {
            pos_x: 8250,
            pos_y: 302
        },
        {
            pos_x: 8700,
            pos_y: 302
        },
        {
            pos_x: 8760,
            pos_y: 302
        },
        {
            pos_x: 8840,
            pos_y: 316
        },
        {
            pos_x: 8950,
            pos_y: 302
        },
        {
            pos_x: 9550,
            pos_y: 302
        },
        {
            pos_x: 10250,
            pos_y: 302
        },
        {
            pos_x: 10320,
            pos_y: 312
        },
        {
            pos_x: 10820,
            pos_y: 312
        },
        {
            pos_x: 10890,
            pos_y: 302
        },
        {
            pos_x: 11090,
            pos_y: 302
        },
        {
            pos_x: 11290,
            pos_y: 316
        },
        {
            pos_x: 11690,
            pos_y: 302
        },
        {
            pos_x: 11760,
            pos_y: 316
        }
    ];
}

// ----------------------------------
// Game Score Render function
// ----------------------------------

function GameScore() {
    var score_x = 50;
    var score_y = 87;

    fill(255);
    noStroke();
    triangle(
        score_x - 19 + 1.5,
        score_y - 50,
        score_x + 16 - 19 + 1.5,
        score_y - 8 - 60,
        score_x + 26 - 9 + 1.5,
        score_y + 20 - 50
    ); // White Left Ribbon
    triangle(
        score_x + 19 + 19,
        score_y - 50,
        score_x - 16 + 19 + 19,
        score_y - 8 - 60,
        score_x - 26 + 9 + 19,
        score_y + 20 - 50
    ); // White Right Ribbon

    stroke(189, 20, 6);
    strokeWeight(7);
    line(score_x - 20 + 15, score_y - 20 - 32, score_x + 14.5, score_y + 2 - 35); // Red Left Ribbon
    line(
        score_x + 20 - 16 + 20,
        score_y - 20 - 32,
        score_x - 15 + 20,
        score_y + 2 - 35
    ); // Red Left Ribbon
    noStroke();

    fill(235, 189, 52, 200);
    stroke(255);
    strokeWeight(3);
    rect(score_x + 30, score_y - 38, 120, 45); // Score Display Box
    noStroke();

    noStroke();
    fill(235, 189, 52);
    rect(score_x - 15, score_y - 40, 50, 50); // Yellow Box

    fill(255);
    rect(score_x - 15, score_y - 16, 50, 8);
    rect(score_x + 6, score_y - 40, 8, 50);
    rect(score_x - 20, score_y - 42, 60, 14); // White Box Lines

    fill(51, 51, 51, 130);
    rect(score_x - 15, score_y - 28, 50, 8); // Box Cover Shadow

    fill(81);
    textSize(45);
    text(game_score, score_x + 95, score_y + 2); // Score Display
}

// ----------------------------------
// Life Tokens Render function
// ----------------------------------

function LifeTokens() {
    // Draw Game Lives.

    for(var i = 0; i < life_token.length; i++) {
        if(life_token[i].lost == false) {
            stroke(240, 58, 58, 255);
            strokeWeight(35);
            line(
                life_token[i].pos_x,
                life_token[i].pos_y - 50,
                life_token[i].pos_x,
                life_token[i].pos_y - 30
            ); // Body
            noStroke();

            fill(255);
            ellipse(life_token[i].pos_x, life_token[i].pos_y - 50, 24, 15); // Head
        }

        if(lives == 3) {
            life_token[0].lost = false;
            life_token[1].lost = false;
            life_token[2].lost = false;
        }

        if(lives == 2) {
            life_token[0].lost = true;
            life_token[1].lost = false;
            life_token[2].lost = false;
        }

        if(lives == 1) {
            life_token[0].lost = true;
            life_token[1].lost = true;
            life_token[2].lost = false;
        }

        if(lives == 0) {
            life_token[0].lost = true;
            life_token[1].lost = true;
            life_token[2].lost = true;
        }
    }
}

// ----------------------------------
// Enemys Render function
// ----------------------------------

function Enemys(x, y, range, inc) {
    this.x = x;
    this.y = y;
    this.range = range;
    this.inc = inc;
    this.currentX = x;
    this.y_speed = 0;

    this.drawEnemys = function() {
        this.updateEnemy_y_movement();

        if(this.inc == 2) {
            // Right Side
            stroke(70);
            strokeWeight(35);
            line(this.currentX, this.y - 50, this.currentX, this.y - 30);
            noStroke(); // Body

            stroke(230);
            strokeWeight(17);
            line(this.currentX - 17, this.y - 50, this.currentX, this.y - 30);
            stroke(70);
            strokeWeight(9);
            line(this.currentX - 17, this.y - 50, this.currentX, this.y - 30);
            noStroke(); // Bag

            fill(255);
            ellipse(this.currentX + 10, this.y - 50, 25, 15); // Head

            stroke(151, 48, 48);
            strokeWeight(9);
            line(this.currentX + 7, this.y - 33, this.currentX + 28, this.y - 33);
            noStroke();
            fill(235, 189, 52);
            ellipse(this.currentX, this.y - 30, 22);
            fill(151, 48, 48);
            ellipse(this.currentX, this.y - 30, 16); // Bag 2

            fill(235, 189, 52);
            rect(this.currentX - 8, this.y - 38, 6, 5);
            rect(this.currentX + 13, this.y - 32, 13, 4); // Hand

            push();
            translate(this.currentX + 32, this.y - 33); // Saw Rotation

            rotate(saw_angle);

            fill(70, 70, 70, 190);
            stroke(70, 70, 70, 190);
            strokeWeight(3);
            triangle(-5, -5, -15, -15, 5, -5);
            triangle(-5, 5, 15, 15, 5, 5);
            triangle(-5, -5, -15, 15, -5, 5);
            triangle(5, -5, 15, -15, 5, 5);
            noStroke();

            pop(); // Saw Rotation

            fill(235, 189, 52);
            ellipse(this.currentX + 32, this.y - 33, 13);
            fill(151, 48, 48);
            ellipse(this.currentX + 32, this.y - 33, 8); //Saw Holder
        }

        if(this.inc == -2) {
            // Left Side
            stroke(70);
            strokeWeight(35);
            line(this.currentX, this.y - 50, this.currentX, this.y - 30);
            noStroke(); // Body

            stroke(230);
            strokeWeight(17);
            line(this.currentX + 17, this.y - 50, this.currentX, this.y - 30);
            stroke(70);
            strokeWeight(9);
            line(this.currentX + 17, this.y - 50, this.currentX, this.y - 30);
            noStroke(); // Bag

            fill(255);
            ellipse(this.currentX - 10, this.y - 50, 25, 15); // Head

            stroke(151, 48, 48);
            strokeWeight(9);
            line(this.currentX - 7, this.y - 33, this.currentX - 28, this.y - 33);
            noStroke();
            fill(235, 189, 52);
            ellipse(this.currentX, this.y - 30, 22);
            fill(151, 48, 48);
            ellipse(this.currentX, this.y - 30, 16); // Bag 2

            fill(235, 189, 52);
            rect(this.currentX + 1, this.y - 38, 7, 5);
            rect(this.currentX - 26, this.y - 32, 13, 4); // Hand

            push();
            translate(this.currentX - 32, this.y - 33); // Saw Rotation

            rotate(saw_angle);

            fill(70, 70, 70, 190);
            stroke(70, 70, 70, 190);
            strokeWeight(3);
            triangle(-5, -5, 15, -15, 5, -5);
            triangle(-5, 5, -15, 15, 5, 5);
            triangle(-5, -5, -15, -15, -5, 5);
            triangle(5, -5, 15, 15, 5, 5);
            noStroke();

            pop(); // Saw Rotation

            fill(235, 189, 52);
            ellipse(this.currentX - 32, this.y - 33, 13);
            fill(151, 48, 48);
            ellipse(this.currentX - 32, this.y - 33, 8); //Saw Holder
        }
    };

    this.updateEnemy_x_movement = function() {
        this.currentX += this.inc;

        if(this.currentX > this.x + this.range) {
            this.inc = -2;
        } else if(this.currentX < this.x) {
            this.inc = 2;
        }
    };

    this.updateEnemy_y_movement = function() {
        if(GameStarted == false || flagpole.isReached == true) {
            this.currentX = x;
            this.y = y;
        } else if(GameStarted == true || flagpole.isReached == false) {
            if(
                dist(gameChar_world_x, gameChar_y, this.currentX, this.y - 100) < 600
            ) {
                this.y_speed = 1.8;
            }

            if(this.y_speed == 1.8) {
                this.y -= this.y_speed;

                if(this.y <= 432) {
                    saw_angle -= 20;

                    this.updateEnemy_x_movement(); // Enemy Move After it comes up

                    this.y = 432;
                }
            }

            if(lives == 0) {
                this.currentX = x;
                this.y = y;
            }
        }
    };

    this.checkContactEnemys = function(gc_x, gc_y) {
        if(this.inc == -2) {
            var d = dist(gc_x, gc_y, this.currentX - 32, this.y);
        } else {
            var d = dist(gc_x, gc_y, this.currentX + 32, this.y);
        }

        if(d < 20) {
            this.inc = 2;
            return true;
        } else {
            return false;
        }
    };
}

function DrawEnemys() {
    for(var i = 0; i < ManyEnemys.length; i++) {
        ManyEnemys[i].drawEnemys();

        var isContact = ManyEnemys[i].checkContactEnemys(
            gameChar_world_x,
            gameChar_y
        );

        if(isContact == true) {
            lives -= 1;
            isContact = false;
            scrollPos = 0;
            gameChar_x = 512;
            gameChar_world_x = 512;
            gameChar_y = floorPos_y - 550;
			
            if(lives > 0) {
				RespawnSound.play();
			}
			
            EnemySound.play();
        }
    }
}

// ----------------------------------
// Snow Fall Render function
// ----------------------------------

function Snow() {
    this.range = width * 13;
    this.y = random(height, -500);
    this.x = random(-100, this.range);
    this.inc = random(-1, 1);
    this.currentX = this.x;
    this.size = random(5, 10);

    this.snow_draw = function() {
        if(
            gameChar_world_x - this.currentX <= 800 &&
            gameChar_world_x - this.currentX >= -800
        ) {
            // Draw Only When Player Is Near
            if(this.y != floorPos_y + random(9.3, 10.3)) {
                fill(255);
                ellipse(this.currentX, this.y, this.size);
            } else {
                fill(255);
                ellipse(this.currentX, this.y, random(5, 10));
            }
        }

        this.snow_update();
    };

    this.snow_update = function() {
        this.y += 5;

        if(this.y >= floorPos_y + random(9.3, 10.3)) {
            if(frameCount % 60 == 0 && snowfall_timer > 0) {
                snowfall_timer -= 1;
            }

            if(snowfall_timer > 0) {
                this.y = floorPos_y + random(9.3, 10.3);
            }

            if(snowfall_timer <= 0) {
                this.y = random(0, -500);
                this.currentX = random(0, this.range);
                snowfall_timer = 2;
            }
        }

        this.currentX += this.inc;

        if(this.currentX >= this.x + random(10, 20)) {
            this.inc = -random(0.5, 1);
        }

        if(this.currentX <= this.x - random(10, 20)) {
            this.inc = random(0.5, 1);
        }
    };
}

function DrawSnow() {
    for(var i = 0; i < snowfall.length; i++) {
        snowfall[i].snow_draw();
    }
}

function Snow_2() {
    this.range = width;
    this.y = random(height, -500);
    this.x = random(-100, this.range);
    this.inc = random(-1, 1);
    this.currentX = this.x;
    this.size = random(3, 7);
    this.color = random(80, 170);

    this.snow_draw = function() {
        fill(this.color);
        ellipse(this.currentX, this.y, this.size);

        this.snow_update();
    };

    this.snow_update = function() {
        this.y += 5;

        if(this.y >= floorPos_y + random(9.3, 10.3)) {
            this.y = random(0, -500);
            this.currentX = random(0, this.range);
        }

        this.currentX += this.inc;

        if(this.currentX >= this.x + random(10, 20)) {
            this.inc = -random(0.5, 1);
        }

        if(this.currentX <= this.x - random(10, 20)) {
            this.inc = random(0.5, 1);
        }
    };
}

function DrawSnow_2() {
    for(var i = 0; i < snowfall_2.length; i++) {
        snowfall_2[i].snow_draw();
    }
}