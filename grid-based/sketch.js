// Grid assignement (2d arrays)
// Your Name
// Date
//Possibly minesweeper
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let difficultySelected = false;
let easyButton;
let mediumButton;
let hardButton;
let grid;
let difficulty = 0;
let tileSize = 100;
const EASY = 1;
const MEDIUM = 2;
const HARD = 3;
const DEFAULT_SIZE = 8;
const SAFE = 0;
const MINE = -1;
let gridSize;

function setup() {
  textAlign(CENTER);
  createCanvas(windowWidth, windowHeight);

  //create the class used for the difficulty buttons
  class difficultyButton {
    constructor(difficulty, buttonColor, y){
      this.difficulty = difficulty;
      this.hoveredColor = buttonColor-20;
      this.defaultColor = buttonColor;
      this.currentColor = buttonColor;
      this.buttonWidth = width/3;
      this.buttonHeight = height/16;
      this.x = width/3;
      this.y = y;
    }

    drawButton (){
      if (!difficultySelected){
        fill(this.currentColor);
        rect(this.x,this.y,this.buttonWidth,this.buttonHeight);
        fill('black');
        textSize(20);
        text(this.difficulty,width/2,this.y + height/32);
      }
    }

    mouseOn (){
      if (mouseX > this.x && mouseX < this.x + this.buttonWidth && mouseY > this.y && mouseY < this.y + this.buttonHeight){
        this.currentColor = this.hoveredColor;
        return true;
      }
      else{
        this.currentColor = this.defaultColor;
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
  displayGrid();
}



function displayDifficultyButtons(){
  if (!difficultySelected){
    easyButton.drawButton();
    mediumButton.drawButton();
    hardButton.drawButton();
  }
}

function mousePressed(){
  if (!difficultySelected){
    if (easyButton.mouseOn()){
      difficulty = EASY;
      difficultySelected = true;
      grid = createGrid();
    }
    else if (mediumButton.mouseOn()){
      difficulty = MEDIUM;
      difficultySelected = true;
      grid = createGrid();
    }
    else if (hardButton.mouseOn()){
      difficulty = HARD;
      difficultySelected = true;
      grid = createGrid();
    }
    gridSize = DEFAULT_SIZE*difficulty;
  }
}

function createGrid(){
  let tempGrid = [];
  tileSize = 100/difficulty;
  for (let rows = 0; rows < gridSize; rows++){
    tempGrid.push([]);
    for (let cols = 0; cols < gridSize; cols++){
      tempGrid[rows].push(SAFE);
    }
  }
  console.log(tempGrid);
  return tempGrid;
}

function detectHovering(){
  easyButton.mouseOn(easyButton.buttonColor);
  mediumButton.mouseOn(easyButton.buttonColor);
  hardButton.mouseOn(easyButton.buttonColor);
}

function displayGrid(){
  fill('White');
  for (let x = 0; x < gridSize; x++){
    for (let y = 0; y < gridSize; y++){
      // text(grid[x][y], x*tileSize + tileSize/2, y*tileSize + tileSize/2);
      square(x*tileSize, y*tileSize, tileSize);
    }
  }
};