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
    this.strokeColor = color(255,20);
    this.strokeThickness = 0.8;
    // Time
    this.time = 0;
    // Degree for rotation
    this.degree = 0.9;
  }

  // draw()
  //
  // Initial cicle shows until user hovers over it (triggering effect)
  draw() {
    // Initial circle shows only until user hovers over it
    if (!start) {
      this.initialCircle();
      // effect one starts once user has hovered over intialCircle
    } else {
      this.effect();
    }
  }

  // initialCircle()
  //
  // The initial circle (white outline) that is displayed before effect starts
  initialCircle() {
    strokeWeight(this.strokeThickness);
    stroke(this.strokeColor);
    noFill();
    ellipse(0, 0, this.radius, this.radius);
    // If mouse location is within the initial circle
    // then start the static effect and make initial circle disappear
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.radius / 2) {
      // Start the effect
      start = true;
      // Hides the initial circle
      background(0);
    }
  }

  mousePressed() {
    // This will be called by the main program when it detects a mouse press
  }

}
