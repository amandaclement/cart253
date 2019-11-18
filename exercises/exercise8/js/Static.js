// Static
//

class Static {

  // constructor
  //
  // Sets the initial values for the Static properties
  constructor() {
    // Position
    this.x = width / 2;
    this.y = height / 2;
    // Time
    this.t = 0;
    // Color
    this.strokeColor = color(255, 255, 255, 10);
  }

  display() {
    stroke(this.strokeColor);
    noFill();

    beginShape();
    // Creating circular effect
    for (let i = 0; i < 400; i++) {
      // TWO_PI to create full, closed shape
      // Third value gives shape (the lower the value, the more circle-like)
      let angle = map(i, 0, 400, 0, TWO_PI);

      // Size (radius) will be based on mouse position
      let d = map(mouseX, width / 2, 2, 0, width);
      // Based on noise
      // Second value in brackets controls how "spikey/irratic" it looks
      let radius = d * noise(i * 0.9, this.t * 0.006);
      let x = radius * cos(angle);
      let y = radius * sin(angle);
      curveVertex(x, y);
    }
    endShape(CLOSE);

    // Controlling movement speed based on mouse location
    let d = map(mouseX, width / 2, 2, 0, width);
    this.t += 0.3 * d;
  }

}
