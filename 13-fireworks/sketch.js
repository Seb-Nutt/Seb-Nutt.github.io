// Fireworks OOP demo

class Particle {
  constructor(x,y,color) {
    this.x = x;
    this.y = y;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.dx = random(-5,5);
    this.dy = random(-5,5);
    this.radius = random(5);
    this.opacity = 255;
  }

  display() {
    noStroke();
    fill(this.r,this.g,this.g,this.opacity);
    circle(this.x,this.y, this.radius*2);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.opacity--;
  }

  isDead() {
    return this.opacity <= 0;
  }
}

let theFireworks = [];
const PARTICLES_PER_CLICK = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (let firework of theFireworks){
    if (firework.isDead()){
      // remove it
      let index = theFireworks.indexOf(firework);
      theFireworks.splice(index,1);
    }
    else{
      firework.update();
      firework.display();
    }
  }

  // mousePressed();
}

function mousePressed(){
  for (i = 0; i < PARTICLES_PER_CLICK; i++){
    let someFirework = new Particle(mouseX,mouseY);
    theFireworks.push(someFirework);
  }
}
