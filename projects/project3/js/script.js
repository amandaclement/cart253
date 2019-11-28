"use strict";

// Project 3
// by Amanda Clement

let state;
// To store the current scene
let currentScene;

// Inner and outer spheres to build effect
let innerSphere;
let outerSphere;

// Store floating spheres in an array
let floatingSpheres = [];
let numFloatingSpheres = 50;

let start = false;

// Piano music for background sound
let pianoMusic;

// Analyzer for measuring amplitude of music
let analyzer;

// preload()
//
function preload() {
  // Piano music (background music)
  pianoMusic = loadSound('assets/sounds/pianoMusic.mp3');
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

  // Creating the inner and outer spheres
  //innerSphere = new Sphere(0.000002, 5);
  //outerSphere = new Sphere(0.000001, 1);

  // Styling for the spheres
  //innerSphere.styling();
  //outerSphere.styling();

  // Run a for loop numFloatingSpheres times to generate each floating sphere
  // and put it in the array
  for (let i = 0; i < numFloatingSpheres; i++) {
    floatingSpheres.push(new FloatingSphere());
    floatingSpheres[i].styling();
  }

  // In draw we just tell the current scene to draw
  // and whichever scene it is will display as per its class
  //effectOne = new EffectOne();
  //rotatingSpheres = new Sphere();
  //state = effectOne;
  //currentScene = rotatingSpheres; // Because we start with the first effect
}

// draw()
//
function draw() {
  background(0);

  // Draw the inner and outer spheres
  //innerSphere.draw();
  //outerSphere.draw();

  for (let i = 0; i < floatingSpheres.length; i++) {
    // Draw each floating sphere
    floatingSpheres[i].effect();
  }
}

// mousePressed()
//
// When user clicks, they will be brought to new scene/effect
function mousePressed() {
  // In mousePressed we call the mousePressed of the current scene
  // so it knows the mouse was pressed
  //innerSphere.mousePressed();
  //outerSphere.mousePressed();
}
