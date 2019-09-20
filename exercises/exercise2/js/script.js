/******************************************************

Game - The Artful Dodger
Pippin Barr
Edited by Amanda Clement

A simple dodging game with keyboard controls

******************************************************/

// The position and size of our avatar circle
let avatarX;
let avatarY;
let avatarSize = 50;
// For changing avatar color
let avatarColor;

// The speed and velocity of our avatar circle
let avatarSpeed = 10;
let avatarVX = 0;
let avatarVY = 0;

// The position and size of the enemy circle
let enemyX;
let enemyY;
let enemySize;
// For changing enemy color
let enemyColor;

// The speed and velocity of our enemy circle
let enemySpeed = 5;
let enemyVX = 5;

// How many dodges the player has made
let dodges = 0;

// Declaring font variable
let myFont;
// For changing text color
let fontColor;

// Background variables
let dayImage;
let nightImage;

// preload()
function preload() {
  // This will load before all else to avoid delays
  // Preload chosen font
  myFont = loadFont("assets/fonts/Bebas-Regular.otf");
  // Preload for dayImage (bright)
  dayImage = loadImage("assets/images/dayImage.jpg");
  // Preload for nightImage (dark)
  nightImage = loadImage("assets/images/nightImage.jpg");
}

// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {

// If less than or equal to 4 dodges, this will occur
if (dodges <= 4) {
  // Display dayImage for background
  background(dayImage);
  // Making text black on dayImage
  fontColor = color(0);
  // Making avatar black
  avatarColor = color(0);
  // Making enemy red
  enemyColor = color(255,0,0);
}
// If 5 dodges or over, this will occur
else {
  // Display nightImage for background
  background(nightImage);
  // Making text white on nightImage
  fontColor = color(255);
  // Making avatar white
  avatarColor = color(255);
  // Making enemy yellow
  enemyColor = color(255,255,0);
}

// If player successfully dodges 3 times, display this text
if (dodges === 3) {
  noStroke();
  // Make text blue with transparency
  fill(0,0,255,70);
  textSize(24);
  // Text will say 'Keep it up!' under # of dodges text
  text('Keep it up!',25,80);
}
// If player successfully dodges 6 times, display this text
else if (dodges === 6) {
  noStroke();
  // Make text appear grey over bg
  fill(255,255,255,80);
  textSize(24);
  // Text will say 'Awesome!' under # of dodges
  text('Awesome!',25,80);
}

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Increase enemy speed based on number of dodges (1.1 times)
  enemyVX = enemySpeed + 1.1 * dodges;
  // Increase enemy size based on number of dodges (resets to 50 if you lose)
  enemySize = 50 + (dodges * 5)

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
    // When you lose, reset player to default size (50)
    avatarSize = 50;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
    // When you lose, reset player to default size (50)
    avatarSize = 50;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
  }

  // Display the number of successful dodges in the console
  console.log(dodges);

  // Using preloaded font
  noStroke();
  textFont ("Bebas-Regular");
  // Changing text size (21px)
  textSize(24);
  // Text color is variable since it changes depending on number of dodges
  fill(fontColor);
  // Displaying the text (at top left)
  text ('You have dodged '+dodges+' time(s)',25, 50);

  // Make text smaller for instructions
  textSize(17);
  // Display to bottom left of screen
  text ('Press the Enter key to toggle player size.',25,475);

  // Avatar color and stroke are variables since they change depending on number of dodges
  fill(avatarColor);
  strokeWeight(5);
  stroke(255,255,255,90);
  // Draw the player as a rounded square
  rect(avatarX,avatarY,avatarSize,avatarSize,10);

  // Enemy color is variable since it changes depending on number of dodges
  fill(enemyColor);
  // Draw the enemy as a rounded square
  rect(enemyX,enemyY,enemySize,enemySize,10);
}

// Press Enter key to toggle player sizes
function keyPressed(){
  console.log(keyCode, key);
  if (keyCode === ENTER) {
    // If player is default size (50), change to 35 when Enter is clicked
       if (avatarSize === 50) {
         avatarSize = 35;
       }
    // If player is 35, change back to default size (50) when Enter is clicked
       else if (avatarSize === 35) {
         avatarSize = 50;
       }
    }
}
