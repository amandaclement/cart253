"use strict";

// Project 3
// by Amanda Clement

// A class that represents the second effect (inherits from Scene)
// This effect is created through expanding circles controlled by user input

class EffectTwo extends Scene {
  // constructor()
  //
  // Sets the initial values for the Scene (circle) properties
  constructor() {
    super();
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
  stroke(this.strokeColor);
  noFill();
  ellipse(this.x, this.y, this.radius, this.radius);
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
  // An effect composed of two layers (one white and one black)
  // User controls the effect in terms of size and creates a pattern
  // based on mouse location
  effect() {
    // effect two will be here
    // make background white for now to show that it works
    background(255);
    fill(0);
    textAlign(CENTER);
    text("EFFECT TWO WILL APPEAR HERE", width / 2, height / 2);
}
}
