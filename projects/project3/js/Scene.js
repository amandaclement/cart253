"use strict";

// Project 3
// by Amanda Clement

// A class that represents the initial circle
// and is the base code (parent class) for each effect.

class Scene {
  // constructor()
  //
  // Sets the initial values for the Scene (circle) properties
  constructor() {
    // Position
    this.x = (width / 2);
    this.y = (height / 2);
    // Size
    this.radius = 200;
    // Color and weight of stroke
    this.strokeColor = color(255,10);
    this.strokeThickness = 0.8;
    // Time
    this.time = 0;
    // Degree for rotation
    this.degree = 0.9;
  }

  // draw()
  //
  // HTML text will be displayed until user clicks (triggering the start of the effect)
  draw() {
    if (start) {
      // To hide HTML button once effect starts
      document.getElementById('textButton').style.visibility = 'hidden';
      // Start the effect
      this.effect();
    }
  }

  // styling()
  //
  // Basic styling to be inherited by child classes
  styling() {
    // Styling for the effect
    strokeWeight(this.strokeThickness);
    stroke(this.strokeColor);
    noFill();
  }

}
