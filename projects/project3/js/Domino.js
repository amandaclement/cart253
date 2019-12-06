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

  }

  // effect()
  //
  // An effect composed of white strokes creating circular effect
  // User controls effect through mouse location (mouseX for size, mouseY for height)
  effect() {
    super.effect();

    //rotateX(frameCount * 0.01);
    //rotateY(frameCount * 0.01);
  }

  // display()
  //
  // Displaying the diamonds on the screen
  display() {
    push();
    // Creating box (values are dimension for width, height and depth)

    stroke(150); // just for visibility while styling (hard to see with effect on)

    box(150,75,5);

    pop();
  }

  // mousePressed()
  //
  // User clicks to activate Piano music
  mousePressed() {
}
}
