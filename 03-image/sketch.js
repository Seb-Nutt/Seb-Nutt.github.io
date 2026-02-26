// Image Demo

let skateboardImg;

function preload(){
  skateboardImg = loadImage('skateboard.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  image(skateboardImg, mouseX, mouseY, skateboardImg.width*0.5, skateboardImg.height*0.5);
}
