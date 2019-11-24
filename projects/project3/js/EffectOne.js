"use strict";

// Project 3
// by Amanda Clement

// A class that represents the first effect (inherits from Scene)
// This effect is created through layers of white strokes affected by noise
// responding to user input (mouse location).

class EffectOne extends Scene {
  // constructor()
  //
  // Sets the initial values for EffectOne based on Scene
  constructor() {
    super();
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

  // effect()
  //
  // An effect composed of two layers
  // User controls the effect in terms of size and creates a pattern
  // based on mouse location
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
    // Based on noise
    // d - 40 to create more circular effect
    // Second value in brackets controls how "spikey/irratic" it looks
    let radius = d - 40 * noise(i * 0.09, this.time * 0.0004);
    let x = radius * cos(angle);
    let y = radius * sin(angle);
    curveVertex(x, y);

    // Rotate based on X value
    // gives it surface appearance
    rotateX(this.degree);
  }
  endShape(CLOSE);

  // Controlling movement speed based on mouse location
  let d = map(mouseX, width / 2, 2, 0, width);
  this.time += 0.05 * d;
}

// mousePressed()
//
// If user clicks mouse, bring them to next scene
// in this case that's the second effect scene
mousePressed() {
  // Black background to replace content of effect one
  background(0);
  currentScene = effectTwo;
  // So it starts with the initial circle
  start = false;
}
}
