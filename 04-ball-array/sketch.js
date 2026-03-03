// Ball Object Notation Array

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

function spawnBall() {
  let theBall = {
    RADIUS: random(10,40),
    x: random(width),
    y: random(height),
    r: random(255),
    g: random(255),
    b: random(255),
    dx: random(-5, 5),
    dy: random(-5, 5)
  };

  ballArray.push(theBall);

  for (let ball of ballArray){
    fill(ball.r,ball.g,ball.b);
    ball.x += ball.dx;
    ball.y += ball.dy;

    circle(ball.x,ball.y,ball.RADIUS*2);
  }

}

function mousePressed(){
  spawnBall();
}