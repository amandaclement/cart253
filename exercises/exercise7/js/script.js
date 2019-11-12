// Project 3
// by Amanda Clement

// Circle that grows/expands
let expansionCircle;

// Music to accompany expansion circle
// will play when mouse is hovering it
let ambientSound;

// preload()
//
function preload() {
  // Ambient music
  ambientSound = loadSound('assets/sounds/ambientSound.wav');
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
