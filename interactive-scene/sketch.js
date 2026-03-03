// Interactive Scene
// Sebastian Nutt
// Date
//
// Extra for Experts:
// I created a velocity and gravity system to apply to the ball and I used bezier curves to create a layered rim

function setup() {
  createCanvas(windowWidth, windowHeight);

  //create two clouds at random positions
  for (let i = 0; i < 2; i++){
    cloudsX.push(random(0,width));
    cloudsY.push(random(0,height*2/3));
    cloudsWidth.push(random(200,400));
    cloudsHeight.push(random(25,100));
  }
  //set a default fot the height of the post
  postHeight = height/3;
}

//Define variables
let cloudsX = [];
let cloudsY = [];
let cloudsWidth = [];
let cloudsHeight = [];
let ball = {
  xVelocity: 0,
  x: 50,
  yVelocity: 0,
  y: 50,
  RADIUS: 25,
  changeX: 0,
  changeY: 0,
  lastXPosition: 0,
  lastYPosition: 0,
  verticalDirection: 1,
  yShift: 0,
  held: false
};
let rim = {
  X1: 0,
  y: 0,
  LENGTH: 100,
  RIM_HEIGHT: 50,
  Y2: 0,
  RADIUS: 5*ball.RADIUS/2
};
let lastSwitch = 0;
let score = 0;
let scored = false;


function draw() {
  background('navy');
  
  drawNonInteractives();
  drawHoop();
  drawBall();
  drawForegroundRim();
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
  strokeWeight(15);
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

  // define the backboard constants

  let backboard = {
    LEFT_X: 13*width/16,
    RIGHT_X: 15*width/16,
    TOP_LEFT_Y: postHeight - height/32,
    BOTTOM_LEFT_Y: postHeight + height/32,
    TOP_RIGHT_Y: postHeight + height/5,
    BOTTOM_RIGHT_Y: postHeight + height/8
  };
  
  quad(backboard.LEFT_X, backboard.TOP_LEFT_Y, backboard.RIGHT_X, backboard.BOTTOM_LEFT_Y, backboard.RIGHT_X, backboard.TOP_RIGHT_Y, backboard.LEFT_X, backboard.BOTTOM_RIGHT_Y);

  // define the backboardsquare constants
  let backboardSquare = {
    LEFT_X: 27*width/32,
    RIGHT_X: 29*width/32,
    TOP_LEFT_Y: postHeight + height/16,
    BOTTOM_LEFT_Y: postHeight + 37*height/256,
    TOP_RIGHT_Y: postHeight + height/10,
    BOTTOM_RIGHT_Y: postHeight + 2*height/11
  };
  
  //draw the square on the backboard
  quad(backboardSquare.LEFT_X, backboardSquare.BOTTOM_LEFT_Y, backboardSquare.LEFT_X, backboardSquare.TOP_LEFT_Y, backboardSquare.RIGHT_X, backboardSquare.TOP_RIGHT_Y, backboardSquare.RIGHT_X, backboardSquare.BOTTOM_RIGHT_Y);
  
  // draw the backround rim to go behind the ball
  rim.X1 = 27*width/32;
  rim.y = postHeight+2*height/11;
  rim.RIM_HEIGHT = height/16;
  stroke('red');
  strokeWeight(10);
  noFill();
  bezier(rim.X1 - rim.RADIUS, rim.y, rim.X1 - rim.RADIUS/2, rim.y - rim.RIM_HEIGHT/2, rim.X1 + rim.RADIUS/2, rim.y - rim.RIM_HEIGHT/2, rim.X1 + rim.RADIUS, rim.y);
}

function drawBall(){
  // create the ball shape
  stroke('black');
  strokeWeight(1);
  fill('orange');
  circle(ball.x, ball.y, 2*ball.RADIUS);

  //create the ball markings
  line(ball.x, ball.y + ball.RADIUS, ball.x, ball.y - ball.RADIUS);
  line(ball.x - ball.RADIUS, ball.y, ball.x + ball.RADIUS, ball.y);
  line(ball.x - 7*ball.RADIUS/8, ball.y + ball.RADIUS/2, ball.x + 7*ball.RADIUS/8, ball.y + ball.RADIUS/2);
  line(ball.x - 7*ball.RADIUS/8, ball.y - ball.RADIUS/2, ball.x + 7*ball.RADIUS/8, ball.y - ball.RADIUS/2);
}

function drawForegroundRim(){
  // draw the secound layer of the rim to go in front of the ball
  stroke('red');
  strokeWeight(10);
  noFill();
  bezier(rim.X1 - rim.RADIUS, rim.y, rim.X1 - rim.RADIUS/2, rim.y + rim.RIM_HEIGHT/2, rim.X1 + rim.RADIUS/2, rim.y + rim.RIM_HEIGHT/2, rim.X1 + rim.RADIUS, rim.y);
}

function mouseOnBall(){
  // return if the cursor is within the range to pick up the ball
  return dist(mouseX,mouseY,ball.x,ball.y) < 3*ball.RADIUS + 25;
}

function moveBall(){

  // Let the player drag the ball
  if (mouseOnBall() && mouseIsPressed){
    ball.held = true;
    ball.x = mouseX;
    ball.y = mouseY;

    // Reset the verticle direction to upward
    ball.verticalDirection = 1;

    // Reset the scored state
    scored = false;
  }
  
  if (mouseIsPressed && ball.held){
    // stop the ball from slipping out of the cursor if
    ball.x = mouseX;
    ball.y = mouseY;
  }

  if ((ball.held && !mouseOnBall && mouseIsPressed) || !mouseIsPressed){
    // make sure that if you click off the ball it doesnt teleport to the mouse
    ball.held = false;
  }


  if (ballIn()){
    
    //get he units per second for the x and y values
    ball.xVelocity = calculateVelocity()[0];
    ball.yVelocity = calculateVelocity()[1];

    //update the speed of the ball falling in accordance to the gravity 
    if (ball.y < height-height/8 && (!mouseIsPressed || !mouseOnBall())){
      ball.yShift += 1;
    }

    // Move the ball if its isnt being held
    if (!ball.held){
      ball.x += ball.xVelocity/10;
      ball.y += ball.yVelocity/10 * ball.verticalDirection;
    }

    // bounce ball
    if (ball.y > 7*height/8){
      ball.y = 7*height/8;
      ball.verticalDirection*= -1;
      ball.yShift = 0;
      // reset the scored state
      scored = false;
    }

    // update the speeds to create a drag and gravity system
    ball.xVelocity -= 0.1;
    ball.y += ball.yShift/10;
  }
}

function calculateVelocity(){

  // update the units per second
  if (millis() > lastSwitch+100 && ballIn()){
    ball.changeX = ball.x - ball.lastXPosition;
    ball.lastXPosition = ball.x;
    ball.changeY = ball.y - ball.lastYPosition;
    ball.lastYPosition = ball.y;
    lastSwitch = millis();
  }

  //return the change in X and the change in Y
  return [ball.changeX,ball.changeY];
}

function ballIn(){
  // return is the ball is in the screen
  return ball.x > 0 && ball.x < width;
}

function detectScore(){
  // check if its in the bounds of the rim
  if ((ball.x > rim.X1 - rim.RADIUS && ball.x < rim.X1 + rim.RADIUS) && (ball.y < rim.y + rim.RIM_HEIGHT/2 && ball.y > rim.y - rim.RIM_HEIGHT/2) && scored === false){
    score++;
    // update the score state to prevent rapid scoring
    scored = true;
  }
}

function displayScore(){
  //Show the score in the top left
  fill('White');
  textFont('Impact', 50)
  text(`Score: ${score}`, width/8, height/8);
}