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
    // Color and weight of stroke
    this.strokeColor = color(255,10);
    this.strokeThickness = 0.8;
  }

  // styling()
  //
  // Basic styling to be inherited by child classes
  styling() {
    // Styling for spheres
    strokeWeight(this.strokeThickness);
    stroke(this.strokeColor);
    noFill();
  }

}
