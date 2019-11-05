// Teleport
//
// A class that represents items that will teleport the predator when caught
// they move in a similar pattern to the prey

// Inherents from Activator class
class Teleport extends Activator {

  // constructor
  //
  // Sets the initial values for Teleport properties
  constructor() {
    // Takes properties from parent class (Activator)
    super();

    // Purple
    this.fillColor = color(238, 130, 238);
  }

  // Moves according to parent (Activator) class
  move() {
    super.move();
  }

  // Handles wrapping according to parent (Activator) class
  handleWrapping() {
    super.handleWrapping();
  }

  // handleAbsorption
  //
  // Increase predator speed when teleport (purple dot) is caught
  // keep increasing speed as more and more are caught
  handleAbsorption(predator) {
    // Calculate distance from teleport to predator
    let d = dist(this.x, this.y, predator.x, predator.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + predator.radius) {
      // Purple flashing effect indicating collision
      background(this.fillColor);
      // Randomizing the location of the predator
      // as if teleporting
      predator.x = random(0, width);
      predator.x = random(0, height);
      // Sound effect (ambient beep) when the predator teleports
      ambientBeep.play();
      // Setting the beep volume so it matches the background game music volume
      ambientBeep.setVolume(0.15);
      // Reset the teleport once caught
      this.reset();
    }
  }

  // Displays according to parent (Activator) class
  display() {
    super.display();
  }

  // Reset according to parent (Activator) class
  reset() {
    super.reset();
  }
}
