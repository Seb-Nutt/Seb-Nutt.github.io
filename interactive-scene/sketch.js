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
    // ball.x = width/4;
    // ball.y = 7*height/8;
  }
}

//Define variables
let cloudsX = [];
let cloudsY = [];
let cloudsWidth = [];
let cloudsHeight = [];
let ball = {
  xVelocity: 0,
  x: 0,
  yVelocity: 0,
  y: 0,
  radius: 25,
  changeX: 0,
  changeY: 0,
  lastXPosition: 0,
  lastYPosition: 0,
  verticalDirection: 1,
  yShift: 0
};

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
  circle(ball.x, ball.y, 2*ball.radius);
  line(ball.x, ball.y + ball.radius, ball.x, ball.y - ball.radius);
  line(ball.x - ball.radius, ball.y, ball.x + ball.radius, ball.y);
  line(ball.x - 7*ball.radius/8, ball.y + ball.radius/2, ball.x + 7*ball.radius/8, ball.y + ball.radius/2);
  line(ball.x - 7*ball.radius/8, ball.y - ball.radius/2, ball.x + 7*ball.radius/8, ball.y - ball.radius/2);
}

function mouseOnBall(){
  return dist(mouseX,mouseY,ball.x,ball.y) < 3*ball.radius;
}

function moveBall(){
  if (mouseOnBall() && mouseIsPressed){
    ball.x = mouseX;
    ball.y = mouseY;
  }
  // if (ball.y < height-height/8 && !mouseIsPressed){
  //   ball.y += ball.yVelocity;
  // }
  // else{
  //   ball.yVelocity = 0;
  // }
  
  if (ballIn()){
    
    ball.xVelocity = calculateVelocity()[0];
    ball.yVelocity = calculateVelocity()[1];
    if (!mouseIsPressed || !mouseOnBall()){
      ball.x += ball.xVelocity/10;
      ball.y += ball.yVelocity/10 * ball.verticalDirection;
    }

    // bounce ball
    // if (ball.y > 7*height/8){
    //   ball.y = 7*height/8;
    //   ball.yVelocity*= -1;
    // }
    ball.xVelocity--;
    ball.y += ball.yShift/10;
  }
  
  if (ball.y < height-height/8 && (!mouseIsPressed || !mouseOnBall())){
    ball.yShift += 1;
  }
  else{
    ball.yShift = 0;
    ball.yVelocity = 0;
  }
}

function calculateVelocity(){
// make a y velocity one
  if (millis() > lastSwitch+100 && ballIn()){
    ball.changeX = ball.x - ball.lastXPosition;
    ball.lastXPosition = ball.x;
    ball.changeY = ball.y - ball.lastYPosition;
    ball.lastYPosition = ball.y;
    lastSwitch = millis();
  }



  return [ball.changeX,ball.changeY];
}

function ballIn(){
  // return is the ball is in the screen
  return ball.x > 0 && ball.x < width;
}

function detectScore(){
  // if (ball.x)
}

function displayScore(){
  fill('White');
  text(`Score: ${score}`, width/4, height/8);
}