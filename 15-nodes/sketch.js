// Connected Nodes Demo

let nodes = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  //draw the lines
  for (let node of nodes){
    node.update();
    node.connectTo(nodes);
  }

  //draw the circles
  for (let node of nodes){
    node.display();
  }
}

class MovingPoint{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.color = color(random(255),random(255),random(255));
    this.speed = 5;
    this.deltaTime = 0.05;
    this.reach = 200;
    this.maxSize = 50;
    this.minSize = 15;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
  }

  move() {
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    dx = map(dx,0,1, -this.speed, this.speed);
    dy = map(dy,0,1,-this.speed, this.speed);

    this.x += dx;
    this.y += dy;

    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }

  update(){
    this.move();
    this.wrapAroundScren();
    this.mouseSizeAdjustment();
  }

  mouseSizeAdjustment(){
    let mouseDistance = dist(mouseX, mouseY, this.x, this.y);
    if (mouseDistance < this.reach){
      let size = map(mouseDistance,0,this.reach,this.maxSize,this.minSize);
      this.radius = size;
    }
    else{
      this.radius = this.minSize;
    }
  }

  wrapAroundScren(){
    if (this.x < -this.radius){
      this.x += width;
    }
    if (this.x > width + this.radius){
      this.x -= width;
    }
    if (this.y < -this.radius){
      this.y += height;
    }
    if (this.y > height + this.radius){
      this.y -= height;
    }
  }

  connectTo(nodesArray){
    for (let otherNode of nodesArray){
      if (this !== otherNode){
        let distanceApart = dist(this.x,this.y, otherNode.x, otherNode.y);
        if (distanceApart < this.reach){
          stroke(this.color);
          line(this.x, this.y, otherNode.x, otherNode.y);
        }
      }
    }
  }
}

function mousePressed(){
  let somePoint = new MovingPoint(mouseX,mouseY);
  nodes.push(somePoint);
}