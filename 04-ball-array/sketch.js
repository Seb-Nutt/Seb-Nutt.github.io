// Ball Object Notation Array

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(220);
  for (let ball of ballArray){
    fill(ball.r,ball.g,ball.b);
    ball.x += ball.dx;
    ball.y += ball.dy;
    

    if (ball.x - ball.RADIUS >= width || ball.x + ball.RADIUS <= 0){
      ball.x = width-ball.x;
    }

    if (ball.y - ball.RADIUS >= height || ball.y + ball.RADIUS <= 0){
      ball.y = height-ball.y;
    }
    
    circle(ball.x,ball.y,ball.RADIUS*2);
  }
  


}

function spawnBall(_x,_y) {
  let theBall = {
    RADIUS: random(10,40),
    x: _x,
    y: _y,
    r: random(255),
    g: random(255),
    b: random(255),
    dx: random(-5, 5),
    dy: random(-5, 5)
  };

  ballArray.push(theBall);




}
function mousePressed(){
  spawnBall(mouseX,mouseY);
}