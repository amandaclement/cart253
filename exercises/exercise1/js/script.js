// Exercise 1 - Movement
// Pippin Barr
// Edited by Amanda Clement
//
// Starter code for exercise 1.
// Draws a moving square and circle that intersect
// in the middle of the canvas.

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;

// The current position and size of square2
let square2X;
let square2Y;
let square2Size = 100;

// String for font
let myText = "Draw!";
let myFont;

// preload()
//
// Nothing here

function preload() {
  // Font will load before all else to avoid delays
  myFont = loadFont("assets/fonts/VeraMono.ttf");
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;

  // Start square off screen to left (vertically centered)
  square2X = -square2Size/2;
  square2Y = height/2;

  // We'll draw rectangles from the center
  rectMode(CENTER);
  // We won't have a stroke in this
  noStroke();

  // Styling font
  textFont(myFont);
  textSize(16);
  textAlign(CENTER, CENTER);

}


// draw()
//
// Change the circle and both squares' positions so they move
// Draw the circle and both squares' on screen

function draw() {

  // Making text black
  fill(0);
  // Making text follow mouse
  // background(255);
 text(myText, mouseX, mouseY);

  // We don't fill the background so we get a drawing effect

  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent red
  fill(255,0,0,10);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  // Move square up and to the left
  squareX -= 1;
  squareY -= 1;
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);

  // Move square2 to right
  square2X += 1;
  // Make square2 transparent green
  fill(0,255,0,10);
  // Display square2
  rect(square2X,square2Y,square2Size,square2Size);
}
