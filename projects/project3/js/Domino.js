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

    // Box dimensions
    this.boxWidth = 150;
    this.boxHeight = 250;
    this.boxDepth = 20;

    // Box adj1
    this.adj1 = 0
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
    this.display();
  }

  // display()
  //
  // Displaying the diamonds on the screen
  display() {
    push();
    // To make opacity for domino effect more responsive to amplitude
    this.opacityMultiplier = this.opacityMultiplier + 2;

    // Positions the dominos on the canvas (based on mouseX and mouseY dist)
    // divide by 20 to limit the range of movement
    translate(0 + (this.distX / 20), 0 + (this.distY / 20));

    // Box dimensions for width, height, and depth
    // Dimensions affected by pulsation (based on music amplitude)
    box(this.boxWidth + this.pulsation, this.boxHeight + this.pulsation, this.boxDepth + this.pulsation);
    pop();
  }

  // changeDimensions()
  //
  // Pressing mouse while moving accross screen (or simply clicking)
  // allows user to control width and height of box
  changeDimensions() {
    if (mouseIsPressed) {
      // Box width based on mouseX location
      this.boxWidth = this.distX;
      // Box height based on mouseY location
      this.boxHeight = this.distY;
    }
  }

  // keyPressed()
  //
  // User presses spacebar to activate mysterious music
  keyPressed() {
    // If music is already playing and spacebar is pressed again, it will simply continue
    if (keyCode === 32 && mysteriousMusic.isPlaying()) {
      mysteriousMusic.playMode('sustain');
    } else
    mysteriousMusic.loop(); // Music starts on first spacebar click and loops
    }
}
