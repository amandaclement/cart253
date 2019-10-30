// Predator-Prey Simulation
// by Amanda Clement
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// So that game starts on main menu
let gameStart = false;

// Font for title
let titleFont;
// Font for instructions
let instructionsFont;

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

// preload()
//
// Loads before all else to avoid delays
function preload() {
  // Staatliches font for title font
  titleFont = loadFont('assets/fonts/staatliches.ttf');
  // Oswald font for instructions font
  instructionsFont = loadFont('assets/fonts/oswald.ttf');
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Main menu shows first (before game starts)
  mainMenu();
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
  if (gameStart) {
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
      teleporters[i].handleAbsorption(predator, prey[i]);
    }

    // Handle input for the predator
    predator.handleInput();
    // Move the predator
    predator.move();
    // Display the predator
    predator.display();
  } else {
    checkGameStart();
  }
}

// mainMenu()
//
// The Main Menu appears before the game starts
// this function contains the styling
function mainMenu() {
  background(0);
  textFont(titleFont);

  // Title
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(80);
  text("MAIN MENU", width / 2, height / 2 - 180);

  // Instructions
  // so the player knows how to play before the game starts
  textFont(instructionsFont);
  textSize(18);
  text("Goal: Chase the prey using the arrow keys to stay alive", width / 2, height / 2 - 100);
  text("by absorbing their life. Boosters will increase your speed", width / 2, height / 2 - 75);
  text("and teleporters will change your location.", width / 2, height / 2 - 50);

  // Rounded rectangle for button
  rectMode(CENTER, CENTER);
  noStroke();
  fill(255);
  rect(width / 2, height / 2 + 160, 180, 40, 5);

  textFont(titleFont);
  fill(255);
  // Start text for button
  textSize(24);
  noStroke();
  fill(0);
  text("START THE GAME", width / 2, height / 2 + 158);

  characterLegend();
}

// characterLegend()
//
// A legend so the player knows what each character looks like
// before starting the game (displayed under the instructions)
function characterLegend() {
  // x location for characters in legend
  let characterX = (width / 2 - 70);
  // Each character will be the same size
  let characterSize = 12;

  // Predator (yellow circle outline)
  strokeWeight(2);
  stroke(255, 255, 0);
  // characterSize - 2 to account for stroke
  ellipse(characterX, height / 2, characterSize - 2, characterSize - 2);

  // Prey (white circle)
  noStroke();
  fill(255);
  ellipse(characterX, height / 2 + 30, characterSize, characterSize);

  // Boosters (blue circle)
  fill(47, 100, 255);
  ellipse(characterX, height / 2 + 60, characterSize, characterSize);

  // Teleporters (purple circle)
  fill(238, 130, 238);
  ellipse(characterX, height / 2 + 90, characterSize, characterSize);

  // x location for names of characters
  let textX = (width / 2 - 40);
  textFont(instructionsFont);
  fill(255);
  textSize(18);
  textAlign(LEFT);
  // Names of each game character
  // to be displayed next to their respective character in the instructions
  text("You (Predator)", textX, height / 2 - 5);
  text("Prey", textX, height / 2 + 25);
  text("Boosters", textX, height / 2 + 55);
  text("Teleporters", textX, height / 2 + 85);
}

// checkGameStart()
//
// Check if the Start button has been clicked
function checkGameStart() {
  // Calculating the distance between the mouse and the button
  let startButtonClick = (dist(mouseX, mouseY, width / 2 - 40, height / 2 + 160) < 50 ||
    dist(mouseX, mouseY, width / 2 + 40, height / 2 + 160) < 50 ||
    dist(mouseX, mouseY, width / 2, height / 2 + 160) < 25);
  // If the mouse and start button overlap, and the mouse is clicked
  // Start the game
  if (startButtonClick && !gameStart) {
    if (mouseIsPressed) {
      gameStart = true;
    }
  }
}
