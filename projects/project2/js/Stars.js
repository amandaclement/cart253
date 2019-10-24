// Shake
//
// A class that represents the shaking effect for the stars
// they will create the moving background pattern

class Shake {

  // constructor
  //
  // Sets the initial values for the stars' Shake properties
  constructor() {
    // Arguments for the Shake constructor
    this.x = random(0, width);
    this.y = random(0, height);
    this.radius = 10;
    this.speed = 200;
  }

  // move
  //
  // Stars move both vertically and horinzontally (randomly)
  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  // display
  //
  // Draw the stars
  display() {
    // Stars will have no fill and white stroke
      // Gives an interesting twinkle effect
    noFill();
    stroke(255,255,255);
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}
