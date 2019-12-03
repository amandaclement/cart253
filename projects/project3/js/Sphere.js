"use strict";

// Project 3
// by Amanda Clement

// A class that represents a basic sphere
// and is the base code (parent class) for each effect.

class Sphere {
  // constructor()
  //
  // Sets the initial values for the Scene (circle) properties
  constructor() {
    // Position
    this.x = (width / 2);
    this.y = (height / 2);

    // Color and weight of stroke
    //this.strokeColor = color(255);
    this.strokeThickness = 0.8;

    // Details for sphere
    this.sphereDetail = 20;

    // For the stroke opacity (glow effect) - based on rms
    this.opacityMultiplier = 200;

    // For measuring amplitude
    this.rms;

    // For mapping mouse distances
    this.distX;
    this.distY;

    this.pulsation;
  }

  // effect()
  //
  // Generic measurements for sphere effects
  effect() {
    // To get amplitude (rms level) of music
    this.rms = analyzer.getLevel();

    // For measuring distances (mapping mouseX & mouseY)
    this.distX = map(mouseX, width / 2, 2, 0, width);
    this.distY = map(mouseY, height / 2, 2, 0, height);

    this.pulsation = this.rms * 200;
  }

  // styling()
  //
  // Basic styling to be inherited by child classes
  styling() {
    // Styling for spheres
    strokeWeight(this.strokeThickness);
    noFill();
  }

}
