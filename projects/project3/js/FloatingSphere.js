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
    this.positionX = (width / 2);
    this.positionY = (0, height / 2);

    // Depth of spheres (in terms of how far away they appear)
    this.positionZ = random(-1000, 1000);

    // Size of spheres
    this.size = random(50, 100);

    // Rotation speed for spheres (so they move at different rates)
    this.rotationSpeed = random(0.0000007, 0.0000009);

    // Details for spheres
    this.detailX = 20;
    this.detailY = 6;

    // Controlling the stroke opacity (glow effect)
    this.opacity = random(5, 80);
  }

  // effect()
  //
  // An effect composed of white strokes creating circular effect
  // User controls effect through mouse location (mouseX for size, mouseY for height)
  effect() {
    // Inherits styling from its parent class
    // get amplitude (rms level) of music
    let rms = analyzer.getLevel();

    push ();
    // stroke opacity changes according to rms (more 'white' as amplitude increases)
    stroke(255, 3 + rms * this.opacity);

    // dist maps mouseX (for rotation on y-axis)
    let dist = map(mouseX, width / 2, 2, 0, width);
    // distY maps mouseY (for rotation on z-axis)
    let distY = map(mouseY, height / 2, 2, 0, height);

    // Positions the spheres on the canvas
		translate (this.positionX - this.x, this.positionY - this.y, this.positionZ * dist/100);

    // Size controlled by user but also sphere pulsates according to music amplitude
    sphere(this.size + rms * 30, this.detail, 6);
		pop ();

    // Rotation for spheres
    // rotateY based on mouseX
    rotateY(frameCount * this.rotationSpeed * dist);
    // rotateZ based on mouseY
    rotateZ(frameCount * this.rotationSpeed * distY);

  }

  // mousePressed()
  //
  // User clicks to activate Piano music
  mousePressed() {
    // If music is already playing and mouse is clicked again, it will simply continue
    if (ringingMusic.isPlaying()) {
      ringingMusic.playMode('sustain');
    } else
    ringingMusic.loop(); // Music starts on first user click and loops
    }
}
