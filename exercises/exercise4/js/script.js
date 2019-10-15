"use strict";

// Pong
// Edited by Amanda Clement
//
// A "simple" implementation of Pong where the paddles fade depending on score
// The game ends once a paddle has completely faded
//
// Up and down keys control the right hand paddle, W and S keys control
// the left hand paddle

// Whether the game has started
let playing = false;

// Track whether the game is over
let gameOver = false;

// Game colors (using hexadecimal)
let fgColor = 255;

// BALL

// A ball object with the properties of
// position, size, velocity, and speed
let ball = {
  x: 0,
  y: 0,
  size: 20,
  vx: 0,
  vy: 0,
  speed: 5
}

// PADDLES

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, speed, and alpha (color)
let leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 87,
  downKey: 83,
  alpha: 255
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, speed, and alpha (color)
let rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 38,
  downKey: 40,
  alpha: 255
}

// For keeping score
let leftPlayerPoints = 1;
let rightPlayerPoints = 1;

// A variable to hold sound made when ball hits paddle
let paddleHitSFX;
// A variable to hold sound made when ball is missed (ball rolling off effect)
let ballRollSFX;

// preload()
//
// Loads sound for when ball hits paddle
// Loads sound for when ball is missed
function preload() {
  paddleHitSFX = new Audio("assets/sounds/hit.mp3");
  ballRollSFX = new Audio("assets/sounds/ballRoll.wav");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640, 480);
  rectMode(CENTER);
  noStroke();

  setupPaddles();
  resetBall();
}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 0 + leftPaddle.w;
  leftPaddle.y = height / 2;

  // Initialise the right paddle position
  rightPaddle.x = width - rightPaddle.w;
  rightPaddle.y = height / 2;
}

// draw()
//
// Calls the appropriate functions to run the game
function draw() {
  // Fill the background
  tableBackground();

  if (playing && !gameOver) {
    // Checking if the game is over
    checkGameOver();
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle);
    handleInput(rightPaddle);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);

    // Check if the ball went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)
    if (ballIsOutOfBounds()) {
      // Counting points
      // If the ball position exceeds right side of canvas
      // then give the left player a point
      if (ball.x > width) {
        // Update left player's points
        console.log("Left player's points: " + leftPlayerPoints);
        leftPlayerPoints = leftPlayerPoints + 1;
      }
      // If the ball position exceeds left side of canvas
      // then give the right player a point
      if (ball.x < 0) {
        console.log("Right player's points: " + rightPlayerPoints);
        rightPlayerPoints = rightPlayerPoints + 1;
      }
      // If it went off either side, reset it
      resetBall();
    }

  }
  // We display the paddles and ball until game over
  fill(fgColor);
  displayBall();
  // Changing left paddle's opacity whenever opponent makes a point
  leftPaddleOpacity();
  displayPaddle(leftPaddle);
  // Changing right paddle's opacity whenever opponent makes a point
  rightPaddleOpacity();
  displayPaddle(rightPaddle);

  if (gameOver) {
    gameOverText();
  } else if (!playing) {
    // Otherwise we display the message to start the game
    displayStartMessage();
  }
}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively.
function handleInput(paddle) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  } else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePositions()
//
// Sets the positions of the paddles and ball based on their velocities
function updatePaddle(paddle) {
  // Update the paddle position based on its velocity
  paddle.y += paddle.vy;
}

// updateBall()
//
// Sets the position of the ball based on its velocity
function updateBall() {
  // Update the ball's position based on velocity
  ball.x += ball.vx;
  ball.y += ball.vy;
}

// ballIsOutOfBounds()
//
// Checks if the ball has gone off the left or right
// Returns true if so, false otherwise
function ballIsOutOfBounds() {
  // Check for ball going off the sides
  if (ball.x < 0 || ball.x > width) {
    // Play miss sound effect by rewinding and then playing
    ballRollSFX.currentTime = 0;
    ballRollSFX.play();
    return true;
  } else {
    return false;
  }
}

// checkBallWallCollision()
//
// Check if the ball has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkBallWallCollision() {
  // Check for collisions with top or bottom...
  if (ball.y < 0 || ball.y > height) {
    // It hit so reverse velocity
    ball.vy = -ball.vy;
  }
}

// checkBallPaddleCollision(paddle)
//
// Checks for collisions between the ball and the specified paddle
function checkBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // We will calculate the top, bottom, left, and right of the
  // paddle and the ball to make our conditionals easier to read...
  let ballTop = ball.y - ball.size / 2;
  let ballBottom = ball.y + ball.size / 2;
  let ballLeft = ball.x - ball.size / 2;
  let ballRight = ball.x + ball.size / 2;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h / 2;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2;

  // First check the ball is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction
      ball.vx = -ball.vx;
      // Play our paddleHit sound effect by rewinding and then playing
      paddleHitSFX.currentTime = 0;
      paddleHitSFX.play();

    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle(paddle) {
  // Draw the paddles
  rect(paddle.x, paddle.y, paddle.w, paddle.h);
}

// displayBall()
//
// Draws the ball on screen as a square
function displayBall() {
  // Draw the ball
  ellipse(ball.x, ball.y, ball.size, ball.size);
}

// resetBall()
//
// Sets the starting position and velocity of the ball
function resetBall() {
  // Making direction ball launches in dependant on who lost point
  // Shoots towards right as default (so for first round)
  // Then shoots towards side that just lost point
  if (ball.x < 0) {
    ball.vx = -ball.speed;
  } else {
    ball.vx = ball.speed;
  }

  // Randomizing the ball's y velocity
  // Make it a random value between 3 and 7
  ball.vy = random(3, 7);

  // Initialise the ball's position and y velocity
  ball.x = width / 2;
  ball.y = height / 2;
}

// displayStartMessage()
//
// Shows a message about how to start the game
function displayStartMessage() {
  // Yellow text (more legible)
  fill("#FADA5E");
  push();
  textAlign(CENTER, CENTER);
  textSize(42);
  text("CLICK TO START", width / 2, height / 2);
  pop();
}

// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  playing = true;
}

// leftPaddleOpacity()
//
// Gradually fade the left paddle opacity depending on the score
// minus 1 so that it starts at 255
function leftPaddleOpacity() {
  leftPaddle.alpha = 255 - ((rightPlayerPoints - 1) * 20);
  fill(255, 255, 255, leftPaddle.alpha);
}

// leftPaddleOpacity()
//
// Gradually fade the right paddle opacity depending on the score
// minus 1 so that it starts at 255
function rightPaddleOpacity() {
  rightPaddle.alpha = 255 - ((leftPlayerPoints - 1) * 20);
  fill(255, 255, 255, rightPaddle.alpha);
}

// checkGameOver()
//
// Once one of the paddles disappears (opacity 0), the game ends
function checkGameOver() {
  if ((leftPaddle.alpha <= 0) || (rightPaddle.alpha <= 0)) {
    gameOver = true;
  }
}

// gameOverText()
//
// Text for the game over screen
function gameOverText() {
  // So that white lines in background are hidden on game over screen
  background("#1261A0");
  // Yellow text (more legible)
  fill("#FADA5E");
  textSize(38);
  textAlign(CENTER, CENTER);
  // Display Game Over
  text("GAME OVER", width / 2, height / 2 - 40);
  textSize(22);
  // Show the final score when the game ends
  text("The left player has " + (leftPlayerPoints - 1) + " point(s)", width / 2, height / 2);
  text("The right player has " + (rightPlayerPoints - 1) + " point(s)", width / 2, (height / 2) + 30);
}

// tableBackground()
//
// Making background look like a ping pong table
function tableBackground() {
  // Blue
  background("#1261A0");
  // Shadow (dark blue) for center line (net)
  stroke("#0d4573");
  strokeWeight(5);
  line(width / 2 + 5, 0, width / 2 + 5, height);

  stroke(255);
  // Center line for net
  line(width / 2, 0, width / 2, height);

  strokeWeight(2);
  // Top horizontal line
  line(width, 40, 0, 40);
  // Bottom horizontal line
  line(width, height - 40, 0, height - 40);
  // Center horizontal line
  line(160, height / 2, 480, height / 2);
  // Left vertical line
  line(160, 40, 160, height - 40);
  // Right vertical line
  line(480, 40, 480, height - 40);

  noStroke();
}
