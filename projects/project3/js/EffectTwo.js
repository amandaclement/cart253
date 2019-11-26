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
    this.angle = 0;
  }

  // effect()
  //
  // An effect composed of white strokes creating circular effect
  // User controls effect through mouse location (mouseX for size, mouseY for height)
  effect() {
    // get amplitude (rms level) of music
    let rms = analyzer.getLevel();
    // stroke opacity changes according to rms (more 'white' as amplitude increases)
    stroke(255, 10 + rms * 200);
    // blow into mic to increase stroke weight or make it glow
    // Get the average (root mean square) amplitude
    let d = map(mouseX, width / 2, 2, 0, width);
    // Rotates across x, y and z axis by 0.00003 times mouseX at every frame
    rotateY(frameCount * 0.000002 * d);
    rotateX(frameCount * 0.000002 * d);
    rotateZ(frameCount * 0.000002 * d);

    // Size of sphere controlled by mouseY location
    let size = map(mouseX, width / 2, 2, 0, width)/5;

    // Size controlled by user but also sphere pulsates according to music amplitude
    sphere(size + rms * 80, 20, 20);
  }

  mousePressed() {
    // If music is playing and user clicks, pause it
    if (pianoMusic.isPlaying()) {
     pianoMusic.pause();
     // play if not
   } else {
     pianoMusic.play();
   }
  }
}
