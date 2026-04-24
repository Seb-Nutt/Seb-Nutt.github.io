// OOP Inheritance Demo


function setup() {
  createCanvas(windowWidth, windowHeight);
  // myCar = new Vehicle('car','Prius');
  myCar = new Car('Pruis');

  console.log(myCar.getName());
  console.log(myCar.getType());
}

function draw() {
  background(220);
}

let myCar;

class Vehicle{
  constructor(type,name){
    this.type = type;
    this.name = name;
  }

  getName(){
    return this.name;
  }

  getType(){
    return this.type;
  }
}

class Car extends Vehicle {
  constructor(name) {
    super('car',name);
  }

  getName(){
    return "This is a car called " + super.getName();
  }
}