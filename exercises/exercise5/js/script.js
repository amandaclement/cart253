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

  mouseOne = new Prey(100, 100, 6, mouseImg, 50);
  mouseTwo = new Prey(100, 100, 4, mouseImg, 60);
  mouseThree = new Prey(100, 100, 10, mouseImg, 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Background image is forest
  background(forestImg);

  instructions();

  // Handle input for the tiger and the lion
  bear.handleInput();
  lion.handleInput();

  // Move all the "animals"
  bear.move();
  lion.move();
  mouseOne.move();
  mouseTwo.move();
  mouseThree.move();

  // Handle the bear eating any of the prey
  bear.handleEating(mouseOne);
  bear.handleEating(mouseTwo);
  bear.handleEating(mouseThree);

  // Handle the lion eating any of the prey
  lion.handleEating(mouseOne);
  lion.handleEating(mouseTwo);
  lion.handleEating(mouseThree);

  // Display all the "animals"
  bear.display();
  lion.display();
  mouseOne.display();
  mouseTwo.display();
  mouseThree.display();
}

// instructions()
//
// Text explaining how predators move and sprint in the game
function instructions() {
  fill(255);
  textSize(14);
  textAlign(CENTER);
  text("The lion uses WASD keys to move, and F key to sprint", width / 2, windowHeight - 45);
  text("The bear uses arrow keys to move, and OPTION key to sprint", width / 2, windowHeight - 20);
}
