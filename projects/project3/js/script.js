"use strict";

// Project 3
// by Amanda Clement

let state;
// To store the current scene
let currentScene;

// Each effect scene
let effectOne;
let effectTwo;

let start = false;

// preload()
//
function preload() {

}

// setup()
//
function setup() {
  // Use WEBGL since effects use 3D
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);

  // In draw we just tell the current scene to draw
  // and whichever scene it is will display as per its class
  effectOne = new EffectOne();
  effectTwo = new EffectTwo();
  //state = effectOne;
  currentScene = effectOne; // Because we start with the first effect
}

// draw()
//
function draw() {
  currentScene.draw();
}

// mousePressed()
//
// When user clicks, they will be brought to new scene/effect
function mousePressed() {
  // In mousePressed we call the mousePressed of the current scene
  // so it knows the mouse was pressed
  currentScene.mousePressed();
}
