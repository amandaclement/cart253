// Expansion
//
// A class that represents an expanding effect on an ellipse
// it will be triggered by hovering over the circle
// the audio volume will change depending on where you hover within the circle

class Expansion {

  // constructor
  //
  // Sets the initial values for the Expansion properties
  constructor() {
    // Position
    this.x = width / 2;
    this.y = height / 2;
    // Size
    this.radius = 200;
    // Speed
    this.speed = 0;
    // Color
    this.strokeColor = color(255, 255, 255, 200);
  }

  // growth
  //
  // Ellipse grows and expands
  growth() {
    this.styling();

    // To control the ellipse's growth rate
    let growth = (this.speed) * (this.radius / 5);
    // To control the ellipse's shrink rate
    let shrink = (-this.speed) * (this.radius);

    // For loop to control growth/expansion
    for (let i = 1; i < 9; i = i + 0.05) {
      ellipse(this.x, this.y, this.radius + growth / i);
      // For shrinking
      ellipse(this.x, this.y, this.radius + shrink / i);

      // If cursor overlaps the ellipse
      let d = dist(mouseX, mouseY, this.x, this.y);
      if (d < this.radius / 2 + growth / i) {
        for (let a = 0; a < width; a = a + 100) {
          // Increase speed
          this.speed += 0.0001;
        }
      }
    }
  }

  // styling
  //
  // Styling for the ellipse
  styling() {
    noFill();
    stroke(this.strokeColor);
    strokeWeight(0.75);
  }
}
