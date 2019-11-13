// Project 3
// by Amanda Clement
// An expanding circle that reacts depending on how the cursor interacts with it
// The ellipse reacts when hovered over, and the speed changes based on cursor location
// also the further from the center you go, the louder the audio

// Circle that grows/expands
let expansionCircle;

// Music to accompany expansion circle
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

  // Sound will loop
  ambientSound.loop();
}

// draw()
//
function draw() {
  background(0);

  expansionCircle.growth();

  // Controlling sound volume based on mouse location
  // in relation to center of canvas
  let d = map(mouseX, width / 2, 0, 0, width) / 200;
  ambientSound.setVolume(d);
}
