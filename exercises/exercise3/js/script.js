"use strict";

/******************************************************************************
Where's Sausage Dog?
Edited by Amanda Clement

An algorithmic version of a Where's Wally/Waldo searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
let targetX;
let targetY;
let targetImage;

// Variable for initial animal setup
let animalSetup = true;

// The ten decoy images
let decoyImage1;
let decoyImage2;
let decoyImage3;
let decoyImage4;
let decoyImage5;
let decoyImage6;
let decoyImage7;
let decoyImage8;
let decoyImage9;
let decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
let numDecoys = 100;

// To control size of animals (starts at 130)
let animalSize = 130;

// Keep track of whether they've won
let gameOver = false;

// For text string
let myFont;

// Used to keep track of level player is at
// Counter will start at 2 since they will have already passed level 1 when string appears
let numLevel = 2;

// For calculating speed (of dog when found)
let speedX = 3;
let speedY = 3;
// For directions (for movement of dog when found)...
// Left/Right
let dirX = 1;
// Top/Bottom
let dirY = 1;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");

  // Loads Oswald font before program starts
  myFont = loadFont("assets/fonts/oswald.ttf");

}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#85C1E9");
  imageMode(CENTER);

  // Placing all the animals on the screen as soon as game starts
  initialAnimalSetup();

  // To display text string LOST DOG
  lostDogText();
}

// draw()
//
// Displays the game over screen if the player has won,
// otherwise nothing (all the gameplay stuff is in mousePressed())
function draw() {
  if (gameOver) {
    // To hide all animals except dog when found
    background("#85C1E9");
    // Prepare our typography
    textFont(myFont);
    textSize(128);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(random(255));

    // Tell them what level they are at
    text("Level " + numLevel, width / 2, height / 2);

    // Text telling player to click Enter key to go to next level
    let pressKey = "PRESS ENTER KEY TO CONTINUE";
    textSize(24);
    fill(0);
    // Placing string underneath Level # text
    text(pressKey, width / 2, height / 2 + 120);

    // Making dog bounce
    bouncingDog();

    // Draw a circle around the sausage dog to show where it is (even though
    // they already know because they found it!)
    noFill();
    stroke(random(255));
    strokeWeight(10);
    ellipse(targetX, targetY, targetImage.width, targetImage.height);
    // Displaying dog in circle
    image(targetImage, targetX, targetY);
  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // The mouse was clicked!
  // Check if the cursor is in the x range of the target
  // (We're subtracting the image's width/2 because we're using imageMode(CENTER) -
  // the key is we want to determine the left and right edges of the image.)
  if (mouseX > targetX - targetImage.width / 2 && mouseX < targetX + targetImage.width / 2) {
    // Check if the cursor is also in the y range of the target
    // i.e. check if it's within the top and bottom of the image
    if (mouseY > targetY - targetImage.height / 2 && mouseY < targetY + targetImage.height / 2) {
      gameOver = true;

    }
  }
}

// Setting up the animals
function initialAnimalSetup() {
  if (animalSetup) {
    // Use a for loop to draw as many decoys as we need
    for (let i = 0; i < numDecoys; i++) {
      // Choose a random location on the canvas for this decoy
      let x = random(0, width);
      let y = random(0, height);
      // Generate a random number we can use for probability
      let r = random();
      // Use the random number to display one of the ten decoy
      // images, each with a 10% chance of being shown
      // We'll talk more about this nice quality of random soon enough.
      // But basically each "if" and "else if" has a 10% chance of being true
      if (r < 0.1) {
        image(decoyImage1, x, y, animalSize, animalSize);
      } else if (r < 0.2) {
        image(decoyImage2, x, y, animalSize, animalSize);
      } else if (r < 0.3) {
        image(decoyImage3, x, y, animalSize, animalSize);
      } else if (r < 0.4) {
        image(decoyImage4, x, y, animalSize, animalSize);
      } else if (r < 0.5) {
        image(decoyImage5, x, y, animalSize, animalSize);
      } else if (r < 0.6) {
        image(decoyImage6, x, y, animalSize, animalSize);
      } else if (r < 0.7) {
        image(decoyImage7, x, y, animalSize, animalSize);
      } else if (r < 0.8) {
        image(decoyImage8, x, y, animalSize, animalSize);
      } else if (r < 0.9) {
        image(decoyImage9, x, y, animalSize, animalSize);
      } else if (r < 1.0) {
        image(decoyImage10, x, y, animalSize, animalSize);
      }
    }

    // Once we've displayed all decoys, we choose a random location for the target
    targetX = random(0, width);
    targetY = random(0, height);

    // And draw it (because it's the last thing drawn, it will always be on top)
    image(targetImage, targetX, targetY, animalSize, animalSize);
  }
  // To see how many decoys there are
  console.log("There are " + numDecoys);
  // To see the size of the animals
  console.log("The current animal size is " + animalSize);

  // Decreasing animal size every round
  animalSize = animalSize - (2 * numLevel);
  // Increasing number of decoys every round
  numDecoys = numDecoys + (5 * numLevel)
}

// Making dog bounce around screen edges when found
function bouncingDog() {
  // Updating position of dog and surrounding circle
  targetX = targetX + speedX * dirX;
  targetY = targetY + speedY * dirY;

  // Testing to see if dog in circle exceeds boundaries when moving across window
  // If it does, reverse direction by multiplying by -1
  // Must divide targetImage width and height by 2 so it hits edge of window
  if (targetX > width - targetImage.width / 2 || targetX < targetImage.width / 2) {
    dirX = (dirX) * (-1);
  }
  if (targetY > height - targetImage.height / 2 || targetY < targetImage.height / 2) {
    dirY = (dirY) * (-1);
  }
}

// When player presses Enter key on gameOver, make this occur
function keyPressed() {
  if (keyCode === ENTER && gameOver) {
    // Hiding gameOver text when level starts
    background("#85C1E9");
    gameOver = false;
    // Displaying new randomized placement of animals
    initialAnimalSetup();

    // Tracking the level the player is at and displaying text when dog found
    console.log("You are at Level " + numLevel);
    // Increase level number each round
    numLevel = numLevel + 1;
  }
  // So that the lost dog poster appears in front of everything
  lostDogText();
}

// Function for lost dog poster
function lostDogText() {
  // Styling for rectangle (white with black stroke)
  stroke("#000");
  strokeWeight(6);
  fill("#FFF");
  // Position rectangle in top right corner of window
  rect(width - 150, 20, 130, 155);
  // Displaying the dog image on the rectangle
  image(targetImage, width - 85, 80);
  // To display text string LOST DOG
  let lostDog = "LOST DOG";
  noStroke();
  fill("#000");
  // Displaying text in Oswald font
  textFont(myFont);
  textSize(27);
  textAlign(CENTER, CENTER);
  // Positioning text within rectangle
  text(lostDog, width - 85, 145);
}
