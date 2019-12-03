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
    // Position of spheres
    this.positionX = random (0, width);
    this.positionY = random (0, height);

    // Depth of spheres (in terms of how far away they appear)
    this.positionZ = random (-1000, 10);

    // Size
    this.size = random (50, 100);

    // Rotation speed for spheres
    this.rotationSpeedX = random(0.00005, 0.00008);
    this.rotationSpeedY = 0.0000007;

    // For growth (some will shrink and others will grow based on rms)
    this.multiplier = random(-500,500);

    //this.detailX = Math.round(random(3,20));
    this.detail = 6;
  }

  // effect()
  //
  // An effect composed of white strokes creating circular effect
  // User controls effect through mouse location (mouseX for size, mouseY for height)
  effect() {
    // Inherits styling from its parent class

    // get amplitude (rms level) of music
    let rms = analyzer.getLevel();
    console.log(rms);
    // stroke opacity changes according to rms (more 'white' as amplitude increases)
    stroke(255, 10 + rms * 200);

    push ();
    // Positions the spheres on the canvas
		translate (this.positionX - this.x, this.positionY - this.y, this.positionZ);

    // Size controlled by user but also sphere pulsates according to music amplitude
    sphere(this.size + rms * this.multiplier, this.detail, this.detail);
		pop ();

    let dist = map(mouseX, width / 2, 2, 0, width);

    // Sphere rotation (rotateY is automatic while rotateY also depends on mouse location)
    rotateX(frameCount * this.rotationSpeedX);
    rotateY(frameCount * this.rotationSpeedY * dist);
  }
}
