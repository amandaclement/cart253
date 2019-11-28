"use strict";

// Project 3
// by Amanda Clement

// A class that represents a group of floating/rotating spheres
// The user controls the viewing angle according to mouse location
// The amplitude of the background music is used to create a pulsating/glowing effect

class FloatingSphere extends Scene {
  // constructor()
  //
  // Sets the initial values for Sphere based on Scene
  constructor() {
    super();
    this.rotationX = 0;
    this.rotationY = 0;

    this.positionX = random(width);
    this.positionY = random(height);
    this.positionZ = random(-1000, 1000);

    this.size = random(25,5);
  }

  // effect()
  //
  // An effect composed of white strokes creating circular effect
  // User controls effect through mouse location (mouseX for size, mouseY for height)
  effect() {
    // Inherits styling from its parent class

  	this.rotationX += (mouseX - this.rotationX) * 0.04;
  	this.rotationY += (mouseY - this.rotationY) * 0.04;
  	rotateX(this.rotationX * 0.01);
  	rotateY(this.rotationY * 0.01);

    push();
    translate (this.positionX - this.x, this.positionY - this.y, this.positionZ);
    sphere (this.size * 6.0);
    pop();

  }
}
