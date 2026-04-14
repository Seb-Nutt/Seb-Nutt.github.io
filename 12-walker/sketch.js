// Walker OOP demo

class Walker{
  constructor(color,speed,x,y,diameter){
    this.color = color;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.diameter = diameter;
  }

  display(){
    fill(this.color);
    stroke(this.color);
    circle(this.x,this.y,this.diameter);
  }

  move(){
    let choice = random(100);
    if (choice < 25){
      this.x += this.speed;
    }
    else if (choice < 50){
      this.x -= this.speed;
    }
    else if (choice < 75){
      this.y += this.speed;
    }
    else{
      this.y -= this.speed;
    }
  }
}

let walt;
let jesse;

function setup() {
  createCanvas(windowWidth, windowHeight);
  walt = new Walker('red',5,random(width),random(height),5);
  jesse = new Walker('pink',10,random(width),random(height),2.5);
}

function draw() {
  walt.move();
  walt.display();
  jesse.move();
  jesse.display();
}
