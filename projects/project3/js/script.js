"use strict";

// Project 3
// by Amanda Clement

let state;
// To store the current scene
let currentScene;

// Each effect scene
//let effectOne;
//let effectTwo;

// Inner and outer spheres to build effect
let innerSphere;
let outerSphere;

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

  // Make the music loop
  pianoMusic.loop();
  // Setting volume
  pianoMusic.setVolume(0.3);

  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();
  // Patch the input to an volume analyzer
  analyzer.setInput(pianoMusic);

  // Creating the inner and outer spheres
  innerSphere = new Sphere(0.000002, 5);
  outerSphere = new Sphere(0.000001, 1);

  innerSphere.styling();

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
  innerSphere.draw();
  outerSphere.draw();
}

// mousePressed()
//
// When user clicks, they will be brought to new scene/effect
function mousePressed() {
  // In mousePressed we call the mousePressed of the current scene
  // so it knows the mouse was pressed
  innerSphere.mousePressed();
  outerSphere.mousePressed();
}
