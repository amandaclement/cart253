// Exercise 8
// by Amanda Clement

// Static circle effect
let staticCircle;

// preload()
//
function preload() {

}

// setup()
//
function setup() {
  createCanvas(windowWidth, 700);
  background(0);
  // Creating static circle
  staticCircle = new Static();
}

// draw()
//
function draw() {
  // Center the shape and display it
  translate(width/2, height/2);
  staticCircle.display();
}
