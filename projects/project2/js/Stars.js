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
    this.speed = 2;
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
    noStroke();
    fill(255, 255, 255, 4);
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}
