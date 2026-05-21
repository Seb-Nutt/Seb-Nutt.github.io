// Recursion Circles Demo


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawCircle(width/2,width/2);
}

function drawCircle(x,radius){
  let fillColor = map(radius, width/2, 50, 255, 20);
  fill(fillColor);  
  circle(x,height/2,radius*2);

  if (radius > mouseX+1){
    drawCircle(x+radius/2,radius/2);
    drawCircle(x-radius/2,radius/2);
  }
}