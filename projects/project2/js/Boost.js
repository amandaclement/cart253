// Boost
//
// A class that represents items that will boost the predator when caught
// Moves, handles wrapping, displays, and resets according to parent (Activator) class

// Inherents from Activator class
class Boost extends Activator {

  // constructor
  //
  // Sets the initial values for Boost properties
  constructor() {
    // Takes properties from parent class (Activator)
    super();

    // Blue
    this.fillColor = color(47, 100, 255);
  }

  // handleAbsorption
  //
  // Increase predator speed when boost (blue dot) is caught
  // keep increasing speed as more and more are caught
  // no limit to speed since high speed creates an interesting challenge
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
      // Sound effect (ambient beep) when the predator boosts
      ambientBeep.play();
      // Setting the beep volume so it matches the background game music volume
      ambientBeep.setVolume(0.15);
      // Reset the boost once caught
      this.reset();
    }
  }
}
