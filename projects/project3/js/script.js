"use strict";

// Project 3
// by Amanda Clement

// We create a JavaScript object with a property for each potential state of our
// program, making sure each one has a different value in it
let State = {
  STARTSCREEN: 0,
  ROTATINGSPHERES: 1,
  FLOATINGSPHERES: 2
};

// Then we can set our state to one of these properties in order to track state
let state = State.STARTSCREEN; // This variable tells us what state the program is in

// Inner and outer spheres to build effect
let innerSphere;
let outerSphere;

// Store floating spheres in an array
let floatingSpheres = [];
// Number of floating spheres to be created
let numFloatingSpheres = 50;

// Music
let pianoMusic; // for the first effect
let ringingMusic; // for the second effect

// Analyzer for measuring amplitude of music
let analyzer;

// preload()
//
function preload() {
  // Piano music (background music for first effect)
  pianoMusic = loadSound('assets/sounds/pianoMusic.mp3');
  // Ringing music (background music for second effect)
  ringingMusic = loadSound('assets/sounds/ringingMusic.mp3');
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

  // Creating the inner and outer spheres
  innerSphere = new Sphere(0.000002, 5);
  outerSphere = new Sphere(0.000001, 1);

  // Styling for the spheres
  innerSphere.styling();
  outerSphere.styling();

  // Run a for loop numFloatingSpheres times to generate each floating sphere
  // and put it in the array
  for (let i = 0; i < numFloatingSpheres; i++) {
    floatingSpheres.push(new FloatingSphere());
  }
}

// draw()
//
function draw() {
  background(0);

  switch (state) {
    case State.STARTSCREEN:
    break;

    case State.ROTATINGSPHERES:
    innerSphere.effect();
    outerSphere.effect();
    innerSphere.mousePressed();
    break;

    case State.FLOATINGSPHERES:
    for (let i = 0; i < floatingSpheres.length; i++) {
      pianoMusic.stop();
      floatingSpheres[i].effect();
      floatingSpheres[i].mousePressed();
    }
    break;
}
}

// mousePressed()
//
// When user clicks, they will be brought to new scene/effect
function mousePressed() {
  // If mouse pressed on start screen, remove HTML text
  if (state === State.STARTSCREEN) {
    document.getElementById('textButton').style.visibility = 'hidden';
      state = State.ROTATINGSPHERES;
    } else if (state === State.ROTATINGSPHERES) {
      state = State.FLOATINGSPHERES;
    } else {
      state = State.STARTSCREEN;
    }
}
