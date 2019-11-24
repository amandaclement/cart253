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
  }

  // effect()
  //
  // An effect created through white strokes affected by noise
  // User controls the effect in terms of size based on mouse position (x-axis)
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
