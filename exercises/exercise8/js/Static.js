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
    this.time = 0;
    // Color
    this.strokeColor = color(255, 255, 255, 10);
    // Static circle size (to close circle)
    this.size = 400;
    // Size for the inital circle
    this.initialCircleSize = 200;
  }

  // initialCircle()
  //
  // White circle stroke to be displayed
  // once user hovers within this area, this circle disappears and effect starts
  initialCircle() {
    stroke(this.strokeColor);
    noFill();
    ellipse(this.x, this.y, this.initialCircleSize, this.initialCircleSize);
    // If mouse location is within the initial circle
    // then start the static effect and make initial circle disappear
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.initialCircleSize / 2) {
      // Start the effect
      start = true;
      // Hides the initial circle
      background(0);
    }
  }

  // staticLayers()
  //
  // This represents the white and black layers for the static effect
  // Based off circle shape, and grows and shrinks according to mouse location
  staticLayers() {
    // Center the shape
    translate(width / 2, height / 2);

    // WHITE CIRCLE
    stroke(this.strokeColor);
    beginShape();
    // Creating circular effect
    for (let i = 0; i < this.size; i++) {
      // TWO_PI to create full, closed shape
      // Third value gives shape (the lower the value, the more circle-like)
      let angle = map(i, 0, this.size, 0, TWO_PI);

      // Size (radius) will be based on mouseX position
      let d = map(mouseX, width / 2, 2, 0, width);
      // Based on noise
      // Second value in brackets controls how "spikey/irratic" it looks
      let radius = d * noise(i * 0.9, this.time * 0.006);
      let x = radius * cos(angle);
      let y = radius * sin(angle);
      curveVertex(x, y);
    }
    endShape(CLOSE);

    // BLACK CIRCLE
    // Having this avoids the white circle getting too intense
    stroke(0, 20);
    beginShape();
    for (let i = 0; i < this.size; i++) {
      let angle = map(i, 0, this.size, 0, TWO_PI);

      // Controlled vertically (based on mouseY position)
      let d = map(mouseY, height / 2, 2, 0, height);
      // Different noise property from white circle so they don't overlap perfectly
      let radius = d * noise(i * 0.9, this.time * 0.004);
      let x = radius * cos(angle);
      let y = radius * sin(angle);
      curveVertex(x, y);
    }
    endShape(CLOSE);

    // Controlling movement speed based on mouse location
    let d = map(mouseX, width / 2, 2, 0, width);
    this.time += 0.3 * d;
  }

  // display()
  //
  // Displaying the shapes
  display() {
    // Initial circle shows only until user hovers over it
    if (!start) {
      this.initialCircle();
      // staticWhiteLayer effect starts once user has hovered over intialCircle
    } else {
      this.staticLayers();
    }
  }
}
