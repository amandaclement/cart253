// Predator-Prey Simulation
// by Amanda Clement
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let tiger;

// The three prey
let antelope;
let zebra;
let bee;

// An empty array to store the stars in (to be created in setup())
let stars = [];
// Number of stars for background
let numStars = 500;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, color(255, 255, 0), 40);
  antelope = new Prey(100, 100, 10, color(255, 255, 255), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 255), 10);

  // Run a for loop numStars times to generate each star and put it in the array
  for (let i = 0; i < numStars; i++) {
    stars.push(new Shake());
  }
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Black with opacity (for translucent effect)
  background(0,20);

  // Go through every star element in the array in order by index
  // using stars.length
  // since it's automatically updated whenever the array changes length
  for (let i = 0; i < stars.length; i++) {
    // Move and display each star
    stars[i].move();
    stars[i].display();
  }

  // Handle input for the tiger
  tiger.handleInput();

  // Move all the "animals"
  tiger.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  antelope.display();
  zebra.display();
  bee.display();
}
