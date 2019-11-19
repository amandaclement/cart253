// Project 3
// by Amanda Clement

// A class that represents the initial circle
// and is the base code (parent class) for each effect.

class Scene {
  // constructor()
  //
  // Sets the initial values for the Scene (circle) properties
  constructor() {
    // Position
    this.x = (width / 2);
    this.y = (height / 2);
    // Size
    this.radius = 200;
    // Color for stroke
    this.strokeColor = color(255,10);
  }

  // draw()
  //
  // Display the initial circle (until user has hovered over it)
  draw() {
  }

}
