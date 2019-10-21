// Predator-Prey Simulation
// Edited by Amanda Clement
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Predator 1 (Tiger)
let bear;
// Predator 2 (Lion)
let lion;

// The three prey
let antelope;
let zebra;
let bee;

// For text font (Concert One Font)
let concertOneFont;
// For predator, prey, and background images
let grizzlyBearImg;
let lionImg;
let mouseImg;
let forestImg;

// preload()
//
// This will load first to avoid unnecessary delays
function preload() {
  concertOneFont = loadFont("../assets/fonts/ConcertOne-Regular.ttf");
  // Grizzly bear face (predator)
  grizzlyBearImg = loadImage("../assets/images/bear.png");
  // Lion face (predator)
  lionImg = loadImage("../assets/images/lion.png");
  // Mouse (prey))
  mouseImg = loadImage("../assets/images/mouse.png");
  // Forest background
  forestImg = loadImage("../assets/images/forest.jpg");
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Tiger starts at top right of canvas
  // and is controlled by arrow keys & ALT/OPTION KEY for sprinting
  bear = new Predator(width - 100, 100, 5, grizzlyBearImg, 60, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 18);

  // Lion starts at top left of canvas
  // and is controlled by W, A, S, D keys
  // W is up, S is down, A is left, D is right & F KEY for sprinting
  lion = new Predator(100, 100, 5, lionImg, 60, 87, 83, 65, 68, 70);

  antelope = new Prey(100, 100, 10, mouseImg, 50);
  zebra = new Prey(100, 100, 8, mouseImg, 60);
  bee = new Prey(100, 100, 20, mouseImg, 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Background image is forest
  background(forestImg);

  // Handle input for the tiger and the lion
  bear.handleInput();
  lion.handleInput();

  // Move all the "animals"
  bear.move();
  lion.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the tiger eating any of the prey
  bear.handleEating(antelope);
  bear.handleEating(zebra);
  bear.handleEating(bee);

  // Handle the lion eating any of the prey
  lion.handleEating(antelope);
  lion.handleEating(zebra);
  lion.handleEating(bee);

  // Display all the "animals"
  bear.display();
  lion.display();
  antelope.display();
  zebra.display();
  bee.display();
}
