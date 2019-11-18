// Exercise 8
// by Amanda Clement

// Static circle effect
let staticCircle;

let start = false;

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
  staticCircle.display();
}
