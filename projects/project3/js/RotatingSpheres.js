"use strict";

// Project 3
// by Amanda Clement

// A class that represents a rotating sphere
// The user controls the speed and size of the sphere according to mouse location
// The amplitude of the background music is used to create a pulsating/glowing effect

class Sphere extends Scene {
  // constructor()
  //
  // Sets the initial values for Sphere based on Scene
  constructor(rotationSpeed, size) {
    super();
    // Rotation speed for spheres
    this.rotationSpeed = rotationSpeed;
    // Divider for sphere size
    this.divider = size;
  }

  // effect()
  //
  // An effect composed of white strokes creating circular effect
  // User controls effect through mouse location (mouseX for size, mouseY for height)
  effect() {
    // Inherits styling from its parent class

    let dist = map(mouseX, width / 2, 2, 0, width);
    // get amplitude (rms level) of music
    let rms = analyzer.getLevel();
    // stroke opacity changes according to rms (more 'white' as amplitude increases)
    stroke(255, 10 + rms * 200);
    // Rotates across x, y and z axis based on rotation speed & mouseX at every frame
    rotateY(frameCount * this.rotationSpeed * dist);
    rotateX(frameCount * this.rotationSpeed * dist);
    rotateZ(frameCount * this.rotationSpeed * dist);

    // Size of sphere is mouseX location divided by this.divider
    // so that we can create spheres of different sizes (proportionally)
    let size = dist / this.divider;

    // Size controlled by user but also sphere pulsates according to music amplitude
    sphere(size + rms * 80, 20, 20);
  }

  // mousePressed()
  //
  // User clicks to activate Piano Music music
  mousePressed() {
    start = true;
    // If the music is already playing, simply make it continue if the player clicks again
    if (pianoMusic.isPlaying()) {
      pianoMusic.playMode('sustain');
    } else {
      pianoMusic.play(); // if thr music is not yet playing and the user clicks, make it start
    }
  }
}
