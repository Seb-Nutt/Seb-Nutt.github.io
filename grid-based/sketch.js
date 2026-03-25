// Grid assignement (2d arrays)
// Your Name
// Date
//Possibly minesweeper
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
// let difficultyButton = {
//   x: 0,
//   y: 0,
//   buttonLength: 0,
//   buttonHeight: 0,
//   rgb: [0,0,0]
// };



let difficultySelected = false;
let easyButton;
let mediumButton;
let hardButton;


function setup() {
  textAlign('center');
  createCanvas(windowWidth, windowHeight);
  class difficultyButton {
    constructor(difficulty, buttonColor, y){
      this.difficulty = difficulty;
      this.buttonColor = buttonColor;
      this.buttonWidth = width/3;
      this.buttonHeight = height/16;
      this.x = width/3;
      this.y = y;
    }

    drawButton (){
      if (!difficultySelected){
        fill(this.buttonColor);
        rect(this.x,this.y,this.buttonWidth,this.buttonHeight);
        fill('black');
        textSize(20);
        text(this.difficulty,width/2,this.y + height/32);
      }
    }

    mouseOn (buttonColor){
      if (mouseX > this.x && mouseX < this.x + this.buttonWidth && mouseY > this.y && mouseY < this.y + this.buttonHeight){
        this.buttonColor = 20;
        return true;
      }
      else{
        return false;
      }
    }
  };

  easyButton = new difficultyButton("Easy", 255, height/4 - height/16);
  mediumButton = new difficultyButton("Medium", 155, height/2 - height/16);
  hardButton = new difficultyButton("Hard", 55, 3*height/4 - height/16);

}

function draw() {
  background(220);
  displayDifficultyButtons();
  detectHovering();

}

function createGrid(){

}

function displayDifficultyButtons(){
  easyButton.drawButton();
  mediumButton.drawButton();
  hardButton.drawButton();
}

function mousePressed(){
  if (easyButton.mouseOn()){
    difficulty = 1;
    console.log(difficulty);
  }
}

function detectHovering(){
  easyButton.mouseOn(easyButton.buttonColor);
  mediumButton.mouseOn(easyButton.buttonColor);
  hardButton.mouseOn(easyButton.buttonColor);
}