// Predator
//
// A class that represents a simple predator
// controlled by the arrow keys. It can move around
// the screen and consume Prey objects to maintain its health.

class Predator {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, predatorImg, radius, upKey, downKey, leftKey, rightKey, sprintKey) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Sprinting will be 1.8 times regular speed
    this.sprint = 1.8;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    // Display properties
    this.predatorImg = predatorImg;
    this.radius = this.health; // Radius is defined in terms of health
    // Input properties (for arguments)
    this.upKey = upKey;
    this.downKey = downKey;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.sprintKey = sprintKey;

    // To keep track of how many prey were eaten
    this.preyEaten = 0;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
      if (keyIsDown(this.sprintKey)) {
        this.vx = (-this.speed) * this.sprint;
      }
    } else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
      if (keyIsDown(this.sprintKey)) {
        this.vx = this.speed * this.sprint;
      }
    } else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
      if (keyIsDown(this.sprintKey)) {
        this.vy = (-this.speed) * this.sprint;
      }
    } else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
      if (keyIsDown(this.sprintKey)) {
        this.vy = this.speed * this.sprint;
      }
    } else {
      this.vy = 0;
    }
  }

  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Predator can only move until they die
    if (this.radius > 0) {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update health
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);
    // Handle wrapping
    this.handleWrapping();
  }
}

  // handleWrapping
  //
  // Checks if the predator has gone off the canvas and
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

  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.
  handleEating(prey) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + prey.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease prey health by the same amount
      prey.health -= this.healthGainPerEat;
      // Check if the prey died and reset it if so
      if (prey.health < 0) {
        // Increase number of preyEaten by predator
        this.preyEaten = this.preyEaten + 1;
        // Keeping track of number of prey eaten in console
        console.log(this.preyEaten);
        prey.reset();
      }
    }
  }

  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    this.radius = this.health;
    imageMode(CENTER);
    // Predators will be animal face images instead of ellipses
    if (this.radius > 0) {
      image(this.predatorImg,this.x,this.y,this.radius * 2,this.radius * 2);
    }
    // When predator dies, only display their number of prey eaten
      // this hides the animal face image
    else if (this.radius <= 0) {
  text(this.preyEaten);
}
    // Displaying how many prey each predator has eaten
    this.preyEatenText();
    pop();
  }

// preyEatenText
//
// Text displaying number of prey eaten on respective predator
preyEatenText() {
  textFont(concertOneFont);
  textAlign(CENTER,CENTER);
  textSize(20);
  fill(255);
  // Positioning (centering) text on predator
  text(this.preyEaten,this.x,this.y - 3);
}
}
