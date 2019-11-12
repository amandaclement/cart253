// Project 3
// by Amanda Clement

let expansionCircle;

// preload()
//
function preload() {

}

// setup()
//
function setup() {
  createCanvas(windowWidth, 700);
  
  expansionCircle = new Expansion();

}

// draw()
//
function draw() {
  background(0);
  expansionCircle.growth();

}
