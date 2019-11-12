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

    // Checking for a mouse & ellipse overlap
    let d = dist(mouseX, mouseY, this.x, this.y);

    // For loop to control growth/expansion
    for (let i = 1; i < 8; i = i + 0.075) {
      ellipse(this.x, this.y, this.radius + growth / i);

      // If the mouse is hovering within then continue to grow
      if (d <= this.radius / 2 + growth / i) {
        for (let d = 200; d < width; d = d + 30) {
          this.speed += 0.000015;
        }
      }
      // If mouse is not hovering over it, stop growing
      else if (d > this.radius / 2 + growth / i) {
        this.speed += 0;
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
