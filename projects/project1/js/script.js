"use strict";

/******************************************************

Game - Chaser
Amanda Clement

A "simple" game of cat and mouse. The player is a circle and can move with keys,
if they overlap the (randomly moving) prey they "eat it" by sucking out its life
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, noise, screen wrap.

******************************************************/

// Track whether the game is over
let gameOver = false;

// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 25;
let playerWidth = 80;
let playerHeight = 50;
let playerVX = 0;
let playerVY = 0;
let playerMaxSpeed = 6;
// Player health
let playerHealth;
let playerMaxHealth = 255;

// Prey position, size, velocity
let preyX;
let preyY;
let preyRadius = 15;
let preyVX;
let preyVY;
let preyMaxSpeed = 6;
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

// Predator position, size, velocity
let predatorX;
let predatorY;
let predatorRadius = 15;
let predatorVX;
let predatorVY;
let predatorMaxSpeed = 13;
// Predator time variables
// Seperate noise values (at different times) so they don't mirror each other
let predatorTX = 0;
let predatorTY = 100;

// For the image of the bee (player) and daisy (prey)
let playerBeeImage;
let preyDaisyImage;

// For text font (Patrick Hand Regular)
let patrickHandFont;

// For buzzing bee sound effect
let buzzingSound;

// Point sound for whenever a prey is eaten
let pointSound;

// Position (y) of instructions
let instructionsY = 0;
// String for instructions
let instructionsText = "Use the arrow keys to pollinate the daisy";
// String for warning text
let warningText = "WARNING: Avoid the black dot!";

// Position (y) of tip
let boostTipY = 0;
// String for tip about boosting speed
let boostTip = "TIP: Hold Shift for a speed boost!";


// preload()
//
// Will load before all else to avoid delays
function preload() {
  // Loading the bee image to be used for player
  playerBeeImage = loadImage("assets/images/beeImage.png");
  // Loading the daisy image to be used for prey
  preyDaisyImage = loadImage("assets/images/daisyImage.png");
  // Loading the font (Patrick Hand)
  patrickHandFont = loadFont("assets/fonts/patrickhand-regular.ttf");
  // Loading buzzing bee sound
  buzzingSound = loadSound("assets/sounds/buzz.wav");
  // Loading sound for point (prey eaten)
  pointSound = loadSound("assets/sounds/point.wav");
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500, 500);

  setupGame();
}

// setupGame()
//
// Sets up prey, player, and predator
function setupGame() {
  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();
  setupPredator();

  // Reset number of prey eaten
  preyEaten = 0;
  // Reset size of predator
  predatorRadius = 15;
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

  preyTX = random(0, 1000);
  preyTY = random(0, 1000);
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

// setupPredator()
//
// Initialises predator's position, velocity, and health
function setupPredator() {
  predatorX = width / 2;
  predatorY = height / 5;
  predatorVX = -predatorMaxSpeed;
  predatorVY = predatorMaxSpeed;

  predatorTX = random(0, 1000);
  predatorTY = random(0, 1000);

}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  // Drawing background pattern (beehive)
  drawHexagonBackground();

  if (!gameOver) {

    handleInput();

    movePlayer();
    movePrey();
    movePredator();

    updateHealth();
    checkEating();
    checkPredatorCollision();

    drawPrey();
    drawPlayer();
    drawPredator();

    moveInstructions();

    showTip();

  } else {
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
    // Hold down SHIFT to increase the speed by 1.5
    // BUT player's health will also decrease faster
    if (keyIsDown(SHIFT)) {
      playerVX = -playerMaxSpeed * 1.5;
      playerHealth = playerHealth - 1;
    }
  } else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
    // Hold down SHIFT to increase the speed by 1.5
    // BUT player's health will also decrease faster
    if (keyIsDown(SHIFT)) {
      playerVX = playerMaxSpeed * 1.5;
      playerHealth = playerHealth - 1;
    }
  } else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
    // Hold down SHIFT to increase the speed by 1.5
    // BUT player's health will also decrease faster
    if (keyIsDown(SHIFT)) {
      playerVY = -playerMaxSpeed * 1.5;
      playerHealth = playerHealth - 1;
    }
  } else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
    // Hold down SHIFT to increase the speed by 1.5
    // BUT player's health will also decrease faster
    if (keyIsDown(SHIFT)) {
      playerVY = playerMaxSpeed * 1.5;
      playerHealth = playerHealth - 1;
    }
  } else {
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
  } else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  } else if (playerY > height) {
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
  playerHealth = playerHealth - 1.2;
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

    // Increase size of predator when prey is eaten
    predatorGrowth();

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);
      // Make point sound when prey is eaten (fully)
      pointSound.play();
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
    }
  }
}

// checkPredatorCollision()
//
// Check if the player overlaps the predator (game over if they do)
function checkPredatorCollision() {
  // Get distance of player to predator
  let d = dist(playerX, playerY, predatorX, predatorY);
  // Check if it's an overlap
  // minus 8 to account for odd shape of image
  // or else gameOver will be triggered before the player and predator touch
  if (d < playerWidth / 2 - 8 + predatorRadius || d < playerHeight / 2 - 8 + predatorRadius) {
    gameOver = true;
    // Making buzzing sound when player collides with predator
    buzzingSound.play();
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
  preyVX = map(noise(preyTX), 0, 1, -preyMaxSpeed, preyMaxSpeed);
  // Gives us a noise value of preyTY
  preyVY = map(noise(preyTY), 0, 1, -preyMaxSpeed, preyMaxSpeed);

  // Update prey position based on velocity
  preyX = preyX + preyVX;
  preyY = preyY + preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  } else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  } else if (preyY > height) {
    preyY = preyY - height;
  }

  // Using times that are closer together so the noise values are more similar
  // 0.01 gives smooth movement (not too shaky)
  preyTX = preyTX + 0.01;
  preyTY = preyTY + 0.01;
}

// movePredator()
//
// Moves the predator using Perlin noise
// Creating a sequence of random numbers that are related to one another
// Random numbers following some kind of organic pattern
function movePredator() {
  // Use map() to convert from the 0-1 range of the noise() function
  // to the appropriate range of velocities for the predator
  // Gives us a noise value of predatorTX
  predatorVX = map(noise(predatorTX), 0, 1, -predatorMaxSpeed, predatorMaxSpeed);
  // Gives us a noise value of predatorTY
  predatorVY = map(noise(predatorTY), 0, 1, -predatorMaxSpeed, predatorMaxSpeed);

  // Update predator position based on velocity
  predatorX = predatorX + predatorVX;
  predatorY = predatorY + predatorVY;

  // Screen wrapping
  if (predatorX < 0) {
    predatorX = predatorX + width;
  } else if (predatorX > width) {
    predatorX = predatorX - width;
  }

  if (predatorY < 0) {
    predatorY = predatorY + height;
  } else if (predatorY > height) {
    predatorY = predatorY - height;
  }

  // Using times that are closer together so the noise values are more similar
  // 0.01 gives smooth movement (not too shaky)
  predatorTX = predatorTX + 0.01;
  predatorTY = predatorTY + 0.01;
}

// drawPrey()
//
// Draw the prey as an image with alpha based on health
function drawPrey() {
  // For daisy image opacity (use 255 so colours do not change)
  tint(255, preyHealth);
  image(preyDaisyImage, preyX, preyY, 70, 70);
}

// drawPlayer()
//
// Draw the player as an image with alpha value based on health
function drawPlayer() {
  // For bee image opacity (use 255 so colours do not change)
  tint(255, playerHealth);
  imageMode(CENTER);
  image(playerBeeImage, playerX, playerY, playerWidth, playerHeight);
}

// drawPredator()
//
// Draw the predator as a black circle
function drawPredator() {
  fill(0);
  noStroke();
  ellipse(predatorX, predatorY, predatorRadius, predatorRadius);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textFont(patrickHandFont);
  noStroke();
  textSize(38);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "You pollinated " + preyEaten + " daisies\n";
  gameOverText = gameOverText + "before you went extinct."
  // Display it in the centre of the screen
  // -50 to display text higher up on screen
  text(gameOverText, width / 2, height / 2 - 50);

  // For Play Again text
  fill(255);
  textSize(28);
  let pressKey = "PRESS ENTER TO PLAY AGAIN";
  text(pressKey, width / 2, height / 2 + 120);
}

// Drawing a hexagon
//
// Based on code from https://p5js.org/examples/form-regular-polygon.html
// Will be repeated to create pattern on background (beehive pattern)
// x for horizontal location, y for vertical location, radius for size, numberOfPoints for number of corners
function hexagon(x, y, radius, numberOfPoints) {
  // TWO_PI to create full circle
  // numberOfPoints for number of corners/sides shape has
  let angle = TWO_PI / numberOfPoints;
  // starting shape
  beginShape();
  // keep drawing until full "circle" is complete
  for (let i = 0; i < TWO_PI; i = i + angle) {
    // for the horizontal location of the point
    // cos is for horizontal
    let sx = x + cos(i) * radius;
    // for the vertical location of the point
    // sin is for vertical
    let sy = y + sin(i) * radius;
    // defining where the actual point is
    // considering both x and y locations
    vertex(sx, sy);
  }
  // closing shape
  endShape(CLOSE);
} // closing function

// drawHexagonBackground()
//
// Created beehive (hexagon) pattern for background
function drawHexagonBackground() {
  // Stroke is orange
  stroke("#ffc240");
  strokeWeight(4);
  // Fill is yellow
  fill("#f8d568");

  // Creating odd-numbered columns of hexagons
  // Start at 15 (first hexagon offset on canvas)
  // Keep drawing until 505 (until bottom of canvas reached)
  // Increments of 70
  for (let i = 15; i <= 505; i += 70) {
    // Size is 40, 6 points (corner) for hexagonal shape
    // Column 1
    hexagon(20, i, 40, 6);
    // Column 3
    hexagon(140, i, 40, 6);
    // Column 5
    hexagon(260, i, 40, 6);
    // Column 7
    hexagon(380, i, 40, 6);
    // Column 9
    hexagon(500, i, 40, 6);
  }

  // Creating even-numbered columns of hexagons
  // Start at -20 (first hexagon offset on canvas)
  // Keep drawing until 470 (until bottom of canvas reached)
  // Increments of 70
  for (let i = -20; i <= 470; i += 70) {
    // Column 2
    hexagon(80, i, 40, 6);
    // Column 4
    hexagon(200, i, 40, 6);
    // Column 6
    hexagon(320, i, 40, 6);
    // Column 8
    hexagon(440, i, 40, 6);
  }
}

// function predatorGrowth()
//
// Increasing size of predator everytime prey is caught
function predatorGrowth() {
  predatorRadius = predatorRadius + (preyEaten * 0.5);
}

// keyPressed()
//
// If ENTER is clicked when gameOver screen shows, restart game
function keyPressed() {
  if (keyCode === ENTER && gameOver) {
    // Hiding gameOver text when level starts
    gameOver = false;
    // Setting up prey, player, and predator
    setupGame();
  }
}

// showInstructions()
//
// Displaying game instructions (text)
function showInstructions() {
  // Black rectangle for readibility
  fill(0);
  rect(0, 0, 500, 72);
  textFont(patrickHandFont);
  fill("#ffc240");
  textSize(22);
  textAlign(CENTER);
  // Instructions text (top center)
  text(instructionsText, 250, 28);
  fill(255);
  // Warning text (top center)
  text(warningText, 250, 55);
}

// moveInstructions()
//
// To move instructions off screen once first daisy is caught
function moveInstructions() {
  // Show instructions when no prey has been eaten
  if (preyEaten === 0) {
    showInstructions();
  }
  // Instructions translate up off screen once first prey has been caught
  else if (preyEaten === 1) {
    instructionsY = instructionsY - 4;
    translate(0, instructionsY);
    showInstructions();
  }
}

// showTip()
//
// Tell player they can hold Shift to boost speed
function showTip() {
  // Show message once 3 daisies have been caught
  if (preyEaten === 3) {
    fill(0);
    text(boostTip, 250, 28);
  }
  // Make message translate up off screen once fourth daisy is caught
  else if (preyEaten === 4) {
    boostTipY = boostTipY - 4;
    translate(0, boostTipY);
    text(boostTip, 250, 28);
  }
}
