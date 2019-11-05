// Activator
//
// A parent class for the Boost and Teleport classes
// since they share many similar properties

class Activator {

  // constructor()
  //
  // Sets the initial values for the Activator properties
  // these properties will apply to Teleport and Boost
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

    // Size
    this.radius = 5;
    this.initialRadius = 5;
  }
  // move
  //
  // Sets velocity based on the noise() function and Activator speed
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
  // Checks if the Activator has gone off the canvas and
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

  // display
  //
  // Draw the Activator as ellipse on the canvas
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
    // Set radius back to default
    this.radius = this.initialRadius;
  }
}
