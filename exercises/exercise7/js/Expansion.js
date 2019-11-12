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

    // Color
    this.strokeColor = color(255, 255, 255, 200);
  }

  // display
  //
  // Displaying the ellipse for the expansion
  display() {
    // Just a white stroke with opacity
    noFill();
    stroke(this.strokeColor);
    strokeWeight(0.75);
    ellipse(this.x, this.y, this.radius);
  }

}
