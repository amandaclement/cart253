// Predator-Prey Simulation
// by Amanda Clement
//
// Creates a predator and five prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.
// The predator can absorb elements to boost its speed or change (teleport) locations.

// So that game starts on main menu
let gameStart = false;

// Game over screen to display when the player loses
// so when the predator's health/radius is 0
let gameOver = false;

// Font for title
let titleFont;
// Font for instructions
let instructionsFont;

// For background game music
let gameMusic;
// Sound effects
let ambientBeep;
let absorptionSound;

// Our predator
let predator;

// An empty array to store the prey in (to be created in setup())
let prey = [];
// Number of prey
let numPrey = 5;
// Number of prey that have been consumed by the predator
let numPreyConsumed = 0;

// An empty array to store the stars in (to be created in setup())
let stars = [];
// Number of stars for background
let numStars = 300;

// An empty array to store the activators in (Boosts and Teleports)
// to be created in setup()
let activators = [];
// Number of activators
let numActivators = 4;

// Angle and radius of oscillating circle
// that will be displayed on Game Over screen
let circleOscillationAngle = 0;
let circleOscillationRadius = 90;

// preload()
//
// Loads before all else to avoid delays
function preload() {
  // Staatliches font for title font
  titleFont = loadFont('assets/fonts/staatliches.ttf');
  // Oswald font for instructions font
  instructionsFont = loadFont('assets/fonts/oswald.ttf');
  // Ambient music for background game music
  gameMusic = loadSound('assets/sounds/ambientMusic.mp3');
  // Ambient beep for when the player boosts or teleports
  ambientBeep = loadSound('assets/sounds/ambientBeep.wav');
  // Weird absorption sound for when predator catches prey
  absorptionSound = loadSound('assets/sounds/absorptionSound.wav');
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Main menu shows first (before game starts)
  mainMenu();
  predator = new Predator(100, 100, 5, 5, color(255, 255, 0), 40);

  // Run a for loop numPrey times to generate each prey and put it in the array
  for (let i = 0; i < numPrey; i++) {
    prey.push(new Prey());
  }

  // Run a for loop numStars times to generate each star and put it in the array
  for (let i = 0; i < numStars; i++) {
    stars.push(new Stars());
  }

  // Run a for loop numActivators times to generate each teleport and boost
  // and put it in the activators' array
  for (let i = 0; i < numActivators; i++) {
    activators.push(new Teleport());
    activators.push(new Boost());
  }
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  if (gameStart && !gameOver || gameOver && gameStart) {
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

    // Go through every activator element in the array in order by index
    // using activators.length
    // since it's automatically updated whenever the array changes length
    for (let i = 0; i < activators.length; i++) {
      // Move and display each activator
      activators[i].move();
      activators[i].display();
      // When the predator catches an activator
      activators[i].handleAbsorption(predator);
    }

    // Handle input for the predator
    predator.handleInput();
    // Move the predator
    predator.move();
    // Display the predator
    predator.display();
  } else if (gameOver) {
    gameOverScreen();
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
  textFont(instructionsFont);

  // Title
  textFont(titleFont);
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

  // Display the character legend on the Main Menu
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
  // then start the game
  if (startButtonClick && !gameStart || startButtonClick && gameOver) {
    if (mouseIsPressed) {
      // Play background game music when that Start button is clicked
      gameMusic.loop();
      gameStart = true;
      gameOver = false;
      // Resets numPreyConsumed count
      numPreyConsumed = 0;
    }
  }
}

// gameOverScreen()
//
// This will be displayed when the player loses
function gameOverScreen() {
  if (gameOver) {
    background(0);
    textFont(titleFont);
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(80);
    text("GAME OVER", width / 2, height / 2 - 180);
    textSize(24);

    // Displaying number of prey consumed
    textFont(instructionsFont);
    text("You caught " + numPreyConsumed + " prey", width / 2, height / 2 - 100);

    // Rounded rectangle for button
    rectMode(CENTER, CENTER);
    rect(width / 2, height / 2 + 160, 180, 40, 5);

    textFont(titleFont);
    fill(0);
    text("PLAY AGAIN", width / 2, height / 2 + 158);

    // Displaying the osciallting circle on the Game Over screen
    circleOscillation();

    // Stop the background game music when the game ends
    // Also stop the sound effects
    gameMusic.stop();
    ambientBeep.stop();
    absorptionSound.stop();

    // Checking if the player pressed the button to play again
    checkGameStart();
  }
}
// circleOscillation()
//
// Effect of circle (representing predator) growing and shrinking
// to be displayed on Game Over screen
function circleOscillation() {
  // Controlling the circle's growth
  // it's based on the angle (0) and the radius (90)
  let growth = sin(circleOscillationAngle) * (circleOscillationRadius / 2);

  // Ellipse will resemble predator
  // so it will be a yellow stroke with no fill
  noFill();
  strokeWeight(7);
  stroke(255, 255, 0);
  ellipse(width / 2, height / 2 + 23, circleOscillationRadius + growth);

  // Increasing the angle, causing the sine function to oscillate
  circleOscillationAngle += 0.05;
}
