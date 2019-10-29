// Predator-Prey Simulation
// by Amanda Clement
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let predator;

// An empty array to store the prey in (to be created in setup())
let prey = [];
// Number of prey
let numPrey = 5;

// An empty array to store the stars in (to be created in setup())
let stars = [];
// Number of stars for background
let numStars = 300;

// An empty array to store the boosters in (to be created in setup())
let boosters = [];
// Number of boosters
let numBoosters = 4;

// An empty array to store the teleporters in (to be created in setup())
let teleporters = [];
// Number of teleporters
let numTeleporters = 4;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  predator = new Predator(100, 100, 5, color(255, 255, 0), 40);

  // Run a for loop numPrey times to generate each prey and put it in the array
  for (let i = 0; i < numPrey; i++) {
    prey.push(new Prey());
  }

  // Run a for loop numStars times to generate each star and put it in the array
  for (let i = 0; i < numStars; i++) {
    stars.push(new Stars());
  }

  // Run a for loop numBoosts times to generate each booster and put it in the array
  for (let i = 0; i < numBoosters; i++) {
    boosters.push(new Boost());
  }

  // Run a for loop numTeleporters times to generate each teleporter
    // and put it in the array
  for (let i = 0; i < numTeleporters; i++) {
    teleporters.push(new Teleport());
  }
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Black with opacity (for translucent effect)
  background(0, 20);

  // Go through every prey element in the array
  // using prey.length
  // since it's automatically updated whenever the array changes length
  for (let i = 0; i < prey.length; i++) {
    // Move and display each prey
    prey[i].move();
    prey[i].display();
    // Handle the predator absorbing any of the prey
    predator.handleEating(prey[i]);
  }

  // Go through every star element in the array in order by index
  // using stars.length
  // since it's automatically updated whenever the array changes length
  for (let i = 0; i < stars.length; i++) {
    // Move and display each star
    stars[i].move();
    stars[i].display();
  }

  // Go through every boost element in the array
  // using boosters.length
  // since it's automatically updated whenever the array changes length
  for (let i = 0; i < boosters.length; i++) {
    // Move and display each booster
    boosters[i].move();
    boosters[i].display();
    // When the predator catches a blue dot
    boosters[i].handleAbsorption(predator);
  }

  // Go through every teleport element in the array
  // using teleporters.length
  // since it's automatically updated whenever the array changes length
  for (let i = 0; i < teleporters.length; i++) {
    // Move and display each grower
    teleporters[i].move();
    teleporters[i].display();
    // When the predator catches a blue dot
    teleporters[i].handleAbsorption(predator,prey[i]);
  }

  // Handle input for the predator
  predator.handleInput();
  // Move the predator
  predator.move();
  // Display the predator
  predator.display();
}
