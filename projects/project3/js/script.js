// Project 3
// by Amanda Clement

// To store the current scene
let currentScene;

// The initial circle (placeholder until user hovers)
let initialScene;

let start = false;

// preload()
//
function preload() {

}

// setup()
//
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // In draw we just tell the current scene to draw
  // and whichever scene it is will display as per its class
  effectOne = new EffectOne();
  currentScene = effectOne; // Because we start with the initial circle
}

// draw()
//
function draw() {
  currentScene.draw();

}
