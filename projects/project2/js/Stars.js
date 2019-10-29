// Stars
//
// A class that represents stars with a shaking effect
// they will create the moving background pattern

class Stars {

  // constructor
  //
  // Sets the initial values for the stars' Shake properties
  constructor() {
    // Arguments for the Shake constructor
    // Position
    this.x = random(0, width);
    this.y = random(0, height);
    // Size
    this.radius = 10;
    // Speed
    this.speed = 200;
    // Color for stroke
    this.strokeColor = color(255);
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
    stroke(this.strokeColor);
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}
