// Interactive Scene
// Sebastian Nutt
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 2; i++){
    cloudsX.push(random(0,width));
    cloudsY.push(random(0,height*2/3));
    cloudsWidth.push(random(200,400));
    cloudsHeight.push(random(25,100));
    postHeight = height/3;
    ballX = width/4;
    ballY = 7*height/8;
    ballRadius = 25;
  }
}

//Define variables
let cloudsX = [];
let cloudsY = [];
let cloudsWidth = [];
let cloudsHeight = [];
let ballXVelocity = 0;
let ballX;
let ballYVelocity = 0;
let ballY;
let ballRadius;
let positions = [];
let change = 0;
let lastPosition = 0;
let lastSwitch = 0;
let score = 0;

function draw() {
  background('navy');
  
  drawNonInteractives();
  drawHoop();
  drawBall();
  moveBall();
  detectScore();
  displayScore();
  
}

function drawNonInteractives(){
  // Draw the court
  noStroke();
  fill(194,178,128);
  rect(0,height-height/4, width, height/4);
  
  // Draw the clouds
  fill('white');
  for (let i = 0; i < 2; i++){
    ellipse(cloudsX[i],cloudsY[i],cloudsWidth[i],cloudsHeight[i]);
  }
  
  //draw the midcourt markings
  stroke('black');
  stroke(15);
  fill(194,178,128);
  circle(width/2,height-height/8,width/8);
  strokeCap(SQUARE);
  strokeWeight(15);
  line(width/2,height-height/4,width/2,height);
}

function drawHoop(){
  // Ajust the height of the post with the up and down arrows
  if (keyIsDown(38)){
    postHeight--;
  }
  if (keyIsDown(40)){
    postHeight++;
  }
  
  //draw the post
  strokeCap(ROUND);
  line(width-width/8,height-height/8,width-width/8,postHeight);
  
  //draw the backboard
  strokeWeight(1);
  fill('white');
  quad(13*width/16, postHeight + height/8, 15*width/16, postHeight + height/5, 15*width/16, postHeight + height/32, 13*width/16, postHeight - height/32);
  
  //draw the square on the backboard
  quad(27*width/32, postHeight + 37*height/256, 27*width/32, postHeight + height/16, 29*width/32, postHeight + height/10, 29*width/32, postHeight + 2*height/11);
  
  // draw rim
  // layering is based on the order drawn
  stroke('red');
  strokeWeight(10);
  noFill();
  ellipse(27*width/32,postHeight+2*height/11, 100, 50);
}

function drawBall(){
  stroke('black');
  strokeWeight(1);
  fill('orange');
  circle(ballX, ballY, 2*ballRadius);
  line(ballX, ballY + ballRadius, ballX, ballY - ballRadius);
  line(ballX - ballRadius, ballY, ballX + ballRadius, ballY);
  line(ballX - 7*ballRadius/8, ballY + ballRadius/2, ballX + 7*ballRadius/8, ballY + ballRadius/2);
  line(ballX - 7*ballRadius/8, ballY - ballRadius/2, ballX + 7*ballRadius/8, ballY - ballRadius/2);
}

function moveBall(){
  if (dist(mouseX,mouseY,ballX,ballY) < 3*ballRadius && mouseIsPressed){
    ballX = mouseX;
    ballY = mouseY;
  }
  if (ballY < height-height/8 && !mouseIsPressed){
    ballYVelocity += ballY/1000;
    ballY += ballYVelocity;
  }
  else{
    ballYVelocity = 0;
  }
  
  if (ballIn()){
    
    ballXVelocity = calculateVelocity();
    if (!mouseIsPressed){
      ballX += ballXVelocity/10;
    }
  }
  ballXVelocity--;
}

function calculateVelocity(){
// make a y velocity one
  if (millis() > lastSwitch+100 && ballIn()){
    change = ballX-lastPosition;
    lastPosition = ballX;
    lastSwitch = millis();
  }
  console.log(change);
  return change;
}

function ballIn(){
  // return is the ball is in the screen
  return ballX > 0 && ballX < width;
}

function detectScore(){
  // if (ballX)
}

function displayScore(){
  fill('White');
  text(`Score: ${score}`, width/4, height/8);
}