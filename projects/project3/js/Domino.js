"use strict";

// Project 3
// by Amanda Clement

// A class that represents a domino effect
// The user controls the viewing angle according to mouse location
// The amplitude of the background music is used to create a pulsating/glowing effect

class Domino extends Sphere {
  // constructor()
  //
  // Sets the initial values for Domino based on Sphere
  constructor() {
    super();
    // Rotation speed for dominos
    this.rotationSpeed = 0.0000006;
  }

  // effect()
  //
  // An effect composed of white strokes creating circular effect
  // User controls effect through mouse location (mouseX for size, mouseY for height)
  effect() {
    super.effect();

    // Rotation for dominos
    // rotateY based on mouseX
    rotateY(frameCount * this.rotationSpeed * this.distX);
    // rotateZ based on mouseY
    rotateZ(frameCount * this.rotationSpeed * this.distY);

  }

  // display()
  //
  // Displaying the diamonds on the screen
  display() {
    push();
    stroke(255);
    // Positions the dominos on the canvas (based on mouseX and mouseY dist)
    // divide by 20 to limit the range
    translate(0 + (this.distX / 20), 0 + (this.distY / 20));

    // Box dimensions for width, height, and depth
    box(150,250,20);
    pop();
  }

  // mousePressed()
  //
  // User clicks to activate Piano music
  mousePressed() {
}
}
