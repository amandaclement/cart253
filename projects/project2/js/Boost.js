// Boost
//
// A class that represents items that will boost the predator when caught
// they move in a similar pattern to the prey

class Boost {

  // constructor
  //
  // Sets the initial values for Boost properties
  constructor() {
    // Position
    this.x = random(0, width);
    this.y = random(0, height);
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Blue
    this.fillColor = color(47, 100, 255);
    // Size
    this.radius = 5;
  }

  // move
  //
  // Sets velocity based on the noise() function and Boost speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the boost has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

  // handleAbsorption
  //
  // Increase predator speed when boost (blue dot) is caught
    // keep increasing speed as more and more are caught
  handleAbsorption(predator) {
    // Calculate distance from boost to predator
    let d = dist(this.x, this.y, predator.x, predator.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + predator.radius) {
      // Blue flashing effect indicating collision
      background(this.fillColor);
      // Increase predator speed once caught
        // No limit to its speed
      predator.speed = predator.speed * predator.boostSpeed;
      // Reset the boost once caught
      this.reset();
    }
  }

  // display
  //
  // Draw the boost as an ellipse on the canvas
  display() {
    push();
    noStroke();
    fill(this.fillColor);
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }

  // reset
  //
  // Set the position to a random location and reset to default size (5)
  // and radius back to default
  reset() {
    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
    // Set radius back to default (5)
    this.radius = 5;
  }
}
