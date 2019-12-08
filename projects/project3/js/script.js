"use strict";

// Project 3
// by Amanda Clement

// We create a JavaScript object with a property for each potential state of our
// program, making sure each one has a different value in it
let State = {
  STARTSCREEN: 0,
  ROTATINGSPHERES: 1,
  FLOATINGSPHERES: 2,
  DOMINOS: 3
};

// Then we can set our state to one of these properties in order to track state
let state = State.STARTSCREEN; // This variable tells us what state the program is in

// Inner and outer rotating spheres to build first effect
let rotatingInnerSphere;
let rotatingOuterSphere;

// Store floating spheres in an array for second effect
let floatingSpheres = [];
// Number of floating spheres to be created
let numFloatingSpheres = 50;

// Store dominos in an array for third effect
let dominos = [];
// Number of dominos to be created
let numDominos = 9;

// Music
let pianoMusic; // for the first effect
let ringingMusic; // for the second effect
let mysteriousMusic; // for the third effect

// Analyzer for measuring amplitude of music
let analyzer;

// preload()
//
function preload() {
  // Piano music (background music for first effect)
  pianoMusic = loadSound('assets/sounds/pianoMusic.mp3');
  // Ringing music (background music for second effect)
  ringingMusic = loadSound('assets/sounds/ringingMusic.mp3');
  // Mysterious music (background music for third effect)
  mysteriousMusic = loadSound('assets/sounds/mysteriousMusic.mp3');
}

// setup()
//
function setup() {
  // Use WEBGL since effects use 3D
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);

  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();
  // Patch the input to an volume analyzer
  analyzer.setInput(pianoMusic);
  analyzer.setInput(ringingMusic);
  analyzer.setInput(mysteriousMusic);

  // Creating the inner and outer rotating spheres (first effect)
  rotatingInnerSphere = new RotatingSphere(0.000002, 5);
  rotatingOuterSphere = new RotatingSphere(0.000001, 1);

  // Styling for the rotating spheres
  rotatingInnerSphere.styling();
  rotatingOuterSphere.styling();

  // Run a for loop numFloatingSpheres times to generate each floating sphere
  // and put it in the array
  for (let i = 0; i < numFloatingSpheres; i++) {
    floatingSpheres.push(new FloatingSphere());
    floatingSpheres[i].styling();
  }

  for (let i = 0; i < numDominos; i++) {
    dominos.push(new Domino());
    dominos[i].styling();
  }
}

// draw()
//
function draw() {
  background(0);

  switch (state) {
    case State.STARTSCREEN:
    // Just a black screen with the HTML text on it
    // prompting user to press spacebar to begin
    break;

    case State.ROTATINGSPHERES:
    rotatingOuterSphere.effect();
    rotatingInnerSphere.effect();
    //rotatingOuterSphere.mouseDragged();
    //rotatingOuterSphere.mouseIsPressed();
    rotatingOuterSphere.musicSpeed();
    //rotatingOuterSphere.changeSize();
    rotatingInnerSphere.keyPressed();
    break;

    case State.FLOATINGSPHERES:
    for (let i = 0; i < floatingSpheres.length; i++) {
      pianoMusic.stop();
      floatingSpheres[i].effect();
      floatingSpheres[i].changeLocation();
      floatingSpheres[i].keyPressed();
    }
    break;

    case State.DOMINOS:
    for (let i = 0; i < dominos.length; i++) {
      ringingMusic.stop();
      dominos[i].effect();
      //dominos[i].mouseIsPressed();
      dominos[i].changeDimensions();
      dominos[i].keyPressed();
    }
    break;
}
}

// keyPressed()
//
// When user clicks spacebar, they will be brought to new scene/effect
function keyPressed() {
  // If spacebar pressed on start screen, remove HTML text
  if (keyCode === 32 && state === State.STARTSCREEN) {
    document.getElementById('textButton').style.visibility = 'hidden';
      state = State.ROTATINGSPHERES;
    } else if (keyCode === 32 && state === State.ROTATINGSPHERES) {
      state = State.FLOATINGSPHERES;
    } else if (keyCode === 32 && state === State.FLOATINGSPHERES) {
      state = State.DOMINOS;
    }
    else {
      state = State.STARTSCREEN;
    }
}
