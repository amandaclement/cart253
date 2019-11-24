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
    // Time
    this.time = 0;
    // Degree for rotation
    this.degree = 0.9;
    this.tx = 0;
    this.ty = 0;
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
      let y = radius * sin(angle);

      // dY for mapping mouseY
      let dY = map(mouseY, height / 2, 2, 0, height);

      // /7 to limit range (to create more of a dome effect)
      curveVertex(x, y + dY / 7);

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
