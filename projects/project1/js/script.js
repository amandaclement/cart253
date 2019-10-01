"use strict";

/******************************************************

Game - Chaser
Amanda Clement

A "simple" game of cat and mouse. The player is a circle and can move with keys,
if they overlap the (randomly moving) prey they "eat it" by sucking out its life
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/

// Track whether the game is over
let gameOver = false;

// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 25;
let playerVX = 0;
let playerVY = 0;
let playerMaxSpeed = 2;
// Player health
let playerHealth;
let playerMaxHealth = 255;

// Prey position, size, velocity
let preyX;
let preyY;
let preyRadius = 25;
let preyVX;
let preyVY;
let preyMaxSpeed = 4;
// Prey time variables
  // Seperate noise values (at different times) so they don't mirror each other
let preyTX = 0;
let preyTY = 100;
// Prey health
let preyHealth;
let preyMaxHealth = 100;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 10;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;

// For the image of the field (background), bee (player), and daisy (prey)
let backgroundFieldImage;
let playerBeeImage;
let preyDaisyImage;


// preload()
//
// Will load before all else to avoid delays
function preload() {
  // Loading the field image to be used as the background
  backgroundFieldImage = loadImage("assets/images/fieldImage.jpg");
  // Loading the bee image to be used for player
  playerBeeImage = loadImage("assets/images/beeImage.png")
  // Loading the daisy image to be used for prey
  preyDaisyImage = loadImage("assets/images/daisyImage.png")
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500, 500);

  noStroke();

  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;

  // what does this do?
  preyTX = random(0,1000);
  preyTY = random(0,1000);
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  // background image of field
  background(backgroundFieldImage);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
    // Hold down SHIFT to double the speed
      // BUT player's health will also decrease faster
    if (keyIsDown(SHIFT)){
      playerVX = -playerMaxSpeed * 2;
      playerHealth = playerHealth - 1;
    }
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
    // Hold down SHIFT to double the speed
      // BUT player's health will also decrease faster
    if (keyIsDown(SHIFT)){
      playerVX = playerMaxSpeed * 2;
      playerHealth = playerHealth - 1;
    }
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
    // Hold down SHIFT to double the speed
      // BUT player's health will also decrease faster
    if (keyIsDown(SHIFT)){
      playerVY = -playerMaxSpeed * 2;
      playerHealth = playerHealth - 1;
    }
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
    // Hold down SHIFT to double the speed
      // BUT player's health will also decrease faster
    if (keyIsDown(SHIFT)){
      playerVY = playerMaxSpeed * 2;
      playerHealth = playerHealth - 1;
    }
  }
  else {
    playerVY = 0;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  }
  else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  }
  else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - 0.5;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
    }
  }
}

// movePrey()
//
// Moves the prey using Perlin noise
  // Creating a sequence of random numbers that are related to one another
    // Random numbers following some kind of organic pattern
function movePrey() {
  // Use map() to convert from the 0-1 range of the noise() function
    // to the appropriate range of velocities for the prey
      // Gives us a noise value of preyTX
  preyVX = map(noise(preyTX),0,1,-preyMaxSpeed,preyMaxSpeed);
    // Gives us a noise value of preyTY
  preyVY = map(noise(preyTY),0,1,-preyMaxSpeed,preyMaxSpeed);

  // Update prey position based on velocity
  preyX = preyX + preyVX;
  preyY = preyY + preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  }
  else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  }
  else if (preyY > height) {
    preyY = preyY - height;
  }

  // Using times that are closer together so the noise values are more similar
    // 0.01 gives smooth movement (not too shaky)
  preyTX = preyTX + 0.01;
  preyTY = preyTY + 0.01;
}

// drawPrey()
//
// Draw the prey as an image with alpha based on health
function drawPrey() {
  // For daisy image opacity (use 255 so colours do not change)
  tint(255,preyHealth);
  image(preyDaisyImage,preyX,preyY,70,70);
}

// drawPlayer()
//
// Draw the player as an image with alpha value based on health
function drawPlayer() {
  // For bee image opacity (use 255 so colours do not change)
  tint(255,playerHealth);
  image(playerBeeImage,playerX,playerY,80,50);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "You ate " + preyEaten + " prey\n";
  gameOverText = gameOverText + "before you died."
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}
