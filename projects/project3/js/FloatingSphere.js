"use strict";

// Project 3
// by Amanda Clement

// A class that represents a group of floating/rotating spheres
// The user controls the viewing angle according to mouse location
// The amplitude of the background music is used to create a pulsating/glowing effect

class FloatingSphere extends Sphere {
  // constructor()
  //
  // Sets the initial values for Sphere based on Scene
  constructor() {
    super();
    // Depth of spheres (in terms of how far away they appear)
    this.positionZ = random(-1000, 1000);

    // Size of spheres
    this.size = random(50, 100);

    // Rotation speed for spheres (so they move at different rates)
    this.rotationSpeed = random(0.0000007, 0.0000009);

    // DetailY for spheres
    this.sphereDetailY = 2;
  }

  // effect()
  //
  // An effect composed of white strokes creating circular effect
  // User controls effect through mouse location (mouseX for size, mouseY for height)
  effect() {
    super.effect();

    // Rotation for spheres
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
    // Positions the spheres on the canvas (based on mouseX dist)
		translate(0, 0, this.positionZ * this.distX / 300);

    // Size controlled by user but also sphere pulsates according to music amplitude
    sphere(this.size + this.pulsation, this.sphereDetail, this.sphereDetailY);
    pop();
  }

  // changeLocation()
  //
  // Pressing mouse while moving accross screen (or simply clicking)
  // allows user to control size of inner sphere
  changeLocation() {
    if (mouseIsPressed) {
    }
}

  // keyPressed()
  //
  // User presses spacebar to activate ringing music
  keyPressed() {
    // If music is already playing and spacebar is pressed again, it will simply continue
    if (ringingMusic.isPlaying()) {
      ringingMusic.playMode('sustain');
    } else
    ringingMusic.loop(); // Music starts on first spacebar click and loops
    }
}
