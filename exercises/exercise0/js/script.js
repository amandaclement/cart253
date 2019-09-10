/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload

function preload() {

}


// setup()
//
// Description of setup

function setup() {
  createCanvas(500,500);
  background("lightblue");
  noStroke();

  // hair
  fill("#4d2600");
  ellipse(250,310,310,400);
  fill("lightblue");
  ellipse(250,475,400,90);

  // sweater
  fill("#2a7189");
  ellipse(250,510,365,240);
    // buttons
  fill("#18414e");
  ellipse(250,445,8,8);
  ellipse(250,462,8,8);
    // collar
  noFill();
  stroke("#18414e");
  strokeWeight(5);
  ellipse(250, 406, 105, 33);

  // neck
  noStroke();
  fill("#ffd199");
  rectMode(CENTER);
  rect(250,290,100,230);
  fill("#ffd199");
  ellipse(250,405,100,30);

  // head
  fill("#FFDCB1");
  ellipse(250,250,250,250);

  // left ear
  fill("#FFDBAC");
  ellipse(130,265,40,50);
  ellipse(132,272,40,50);

  // right ear
  ellipse(370,265,40,50);
  ellipse(368,272,40,50);

  // ear details
  noFill();
  stroke("#CA9072");
  strokeWeight(2.5);
  arc(120, 270, 15, 25, PI+HALF_PI, TWO_PI);
  arc(380, 270, 15, 25, PI, PI+HALF_PI);

  // earrings
  noFill();
  stroke("#DAA520");
  strokeWeight(4);
  arc(127, 301, 10, 20, TWO_PI, PI+HALF_PI);
  arc(373, 301, 10, 20, PI+HALF_PI, PI);

  // hat
    // top part
 noStroke();
 fill("#2a7189");
 arc(250, 188, 255, 230, -PI, 0);
   // top part line details
stroke("#246175");
strokeWeight(2);
arc(250, 188, 175, 230, -PI, 0);
    // detail (circle) at top
 noStroke();
 ellipse(250,75,20,15);
    // bottom part (darker)
 fill("#1e5162");
 rectMode(CENTER);
 rect(250, 188, 260, 70, 25);
 noFill();
    // bottom part line details
 stroke("#18414e");
 strokeWeight(2);
 rect(250, 188, 240, 50, 15);
 rect(250, 188, 225, 35, 10);
    // curve in hat
 noStroke();
 fill("#FFDCB1");
 ellipse(250, 220, 242, 60);

  // eyelashes
  strokeWeight(3);
  stroke("#000");
  noFill();
    // left
  arc(323, 210, 20, 20, 0, HALF_PI);
  arc(328, 215, 20, 20, 0, HALF_PI);
  arc(333, 220, 20, 20, 0, HALF_PI);
    // right
  arc(167, 220, 20, 20, HALF_PI, PI);
  arc(172, 215, 20, 20, HALF_PI, PI);
  arc(177, 210, 20, 20, HALF_PI, PI);

  // left eye
  noStroke();
    // white
  fill("#fff");
  ellipse(200,240,75,75);
  ellipse(300,240,75,75);
    // light green
  fill("#6B8E23");
  ellipse(205,245,40,40);
  ellipse(295,245,40,40);
    // dark green
  fill("#3d5214");
  ellipse(205,245,25,25);
  ellipse(295,245,25,25);
    // white detail
  fill("#fff");
  ellipse(212,238,9,9);
  ellipse(302,238,9,9);

  // eyebrows
  noFill();
  stroke(0);
  strokeWeight(8);
  stroke("#4d2600");
    // right
  line(295,190,340,202);
    // left
  line(205,190,160,202);

  // mouth
  strokeWeight(4);
  stroke("#C2726B");
  arc (250, 315, 55, 40, 0, -PI);

  // nose
  noFill();
  strokeWeight(3);
  stroke("#CA9072");
  arc(253, 273, 20, 15, HALF_PI, PI+QUARTER_PI);

  // blush
  noStroke();
  fill(230, 0, 0, 25);
  ellipse(180, 294, 40, 20);
  ellipse(320, 294, 40, 20);
}


// draw()
//
// Description of draw()

function draw() {

}
