"use strict";

// Project 3
// by Amanda Clement

// A class that represents a rotating sphere
// The user controls the speed and size of the sphere according to mouse location
// The amplitude of the background music is used to create a pulsating/glowing effect

class RotatingSphere extends Sphere {
  // constructor()
  //
  // Sets the initial values for Sphere based on Scene
  constructor(rotationSpeed, sizeDivider) {
    super();
    // Rotation speed for spheres
    this.rotationSpeed = rotationSpeed;

    // Divider for sphere size
    this.sizeDivider = sizeDivider;
  }

  // effect()
  //
  // An effect composed of white strokes creating circular effect
  // User controls effect through mouse location (mouseX for size, mouseY for height)
  effect() {
    super.effect();
    
    // Rotates across x, y and z axis based on rotation speed & mouseX at every frame
    rotateY(frameCount * this.rotationSpeed * this.distX);
    rotateX(frameCount * this.rotationSpeed * this.distX);
    rotateZ(frameCount * this.rotationSpeed * this.distX);

    // stroke opacity changes according to rms (more 'white' as amplitude increases)
    push();
    stroke(255, 3 + this.rms * this.opacityMultiplier);

    // Size of sphere is mouseX location divided by this.divider
    // so that we can create spheres of different sizes (proportionally)
    let size = this.distX / this.sizeDivider;

    // Size controlled by user but also sphere pulsates according to music amplitude
    sphere(size + this.pulsation, this.sphereDetail, this.sphereDetail);
    pop();

  }

  // mousePressed()
  //
  // User clicks to activate Piano music
  mousePressed() {
    // If music is already playing and mouse is clicked again, it will simply continue
    if (pianoMusic.isPlaying()) {
      pianoMusic.playMode('sustain');
    } else
    pianoMusic.loop(); // Music starts on first user click and loops
    }
}
