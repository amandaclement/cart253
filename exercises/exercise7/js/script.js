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
  background(0);

  expansionCircle = new Expansion();

}

// draw()
//
function draw() {
  expansionCircle.display();

}
