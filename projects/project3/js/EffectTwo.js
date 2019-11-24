"use strict";

// Project 3
// by Amanda Clement

// A class that represents the second effect (inherits from Scene)
// This effect is created through layers of white strokes that works
// on x-axis and y-axis to create dome effect.
// It responding to user input (mouseX and mouseY location).

class EffectTwo extends Scene {
  // constructor()
  //
  // Sets the initial values for EffectTwo based on Scene
  constructor() {
    super();
  }

  // effect()
  //
  // An effect composed of white strokes creating circular effect
  // User controls effect through mouse location (mouseX for size, mouseY for height)
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

      // CREATING SHAPE
      let radius = d;
      let x = radius * cos(angle);
      // dY for mapping mouseY
      let dY = map(mouseY, height / 2, 2, 0, height);
      // /7 to limit range (to create more of a dome effect)
      let y = radius * sin(angle) + dY / 7;

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
}
