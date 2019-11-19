// Project 3
// by Amanda Clement

// A class that represents the first effect (inherits from Scene)
// This effect is created through layers of white strokes affected by noise
// responding to user input (mouse location).

class EffectOne extends Scene {
  // constructor()
  //
  // Sets the initial values for the Scene (circle) properties
  constructor() {
    super();
    // Time
    this.time = 0;
  }

  // draw()
  //
  // Initial cicle shows until user hovers over it (triggering effect)
  draw() {
    // Initial circle shows only until user hovers over it
    if (!start) {
      this.initialCircle();
      // staticWhiteLayer effect starts once user has hovered over intialCircle
    } else {
      this.effect();
    }
  }

  // mousePressed()
  //
  // Triggering the next scene/effect
  mousePressed() {
    // i.e. state = sceneTwo;
  }

// initialCircle()
//
// The initial circle (white outline) that is displayed before effect starts
initialCircle() {
  stroke(this.strokeColor);
  noFill();
  ellipse(this.x, this.y, this.radius, this.radius);
  // If mouse location is within the initial circle
  // then start the static effect and make initial circle disappear
  let d = dist(mouseX, mouseY, this.x, this.y);
  if (d < this.radius / 2) {
    // Start the effect
    start = true;
    // Hides the initial circle
    background(0);
  }
}

  // effect()
  //
  // An effect composed of two layers (one white and one black)
  // User controls the effect in terms of size and creates a pattern
  // based on mouse location
  effect() {
  // Center the shape
  translate(width / 2, height / 2);

  // CREATING EFFECT
  stroke(this.strokeColor);
  beginShape();
  // Creating circular effect
  for (let i = 0; i < this.radius; i++) {
    // TWO_PI to create full, closed shape
    // Third value gives shape (the lower the value, the more circle-like)
    let angle = map(i, 0, this.radius, 0, TWO_PI);

    // Size (radius) will be based on mouseX position
    let d = map(mouseX, width / 2, 2, 0, width);
    // Based on noise
    // d - 40 to create more circular effect
    // Second value in brackets controls how "spikey/irratic" it looks
    let radius = d - 40 * noise(i * 0.09, this.time * 0.0004);
    let x = radius * cos(angle);
    let y = radius * sin(angle);
    curveVertex(x, y);
  }
  endShape(CLOSE);

  // Controlling movement speed based on mouse location
  let d = map(mouseX, width / 2, 2, 0, width);
  this.time += 0.05 * d;
}

}
