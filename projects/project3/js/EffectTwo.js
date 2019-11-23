"use strict";

// Project 3
// by Amanda Clement

// A class that represents the second effect (inherits from Scene)
// Description

class EffectTwo extends Scene {
  // constructor()
  //
  // Sets the initial values for EffectTwo based on Scene
  constructor() {
    super();
    // Time
    this.time = 0;
    // Degree for rotation
    this.degree = 0.9;
    // Speed
    this.speed = 0;
  }

  // draw()
  //
  // Initial cicle shows until user hovers over it (triggering effect)
  draw() {
    // Initial circle shows only until user hovers over it
    if (!start) {
      this.initialCircle();
      // effect two starts once user has hovered over intialCircle
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

  // effect()
  //
  // Description of effect two
  effect() {
    // CREATING EFFECT
    beginShape();
    stroke(this.strokeColor);
    // Creating circular effect
    for (let i = 0; i < this.radius; i++) {
      // TWO_PI to create full, closed shape
      // Third value gives shape (the lower the value, the more circle-like)
      let angle = map(i, 0, this.radius, 0, TWO_PI);

      // Size (radius) will be based on mouseX position
      let d = map(mouseX, width / 2, 2, 0, width);
      let radius = d;

      // CREATING SHAPE
      let x = radius * cos(angle);
      // Use noise to create interesting shape (for y value)
      let nx = map(x, 0, width, 0, 10);
      let y = radius * sin(angle) * noise(nx);

      curveVertex(x, y);
    }
    endShape(CLOSE);
  }
}
