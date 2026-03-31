// Grid assignment (2d arrays)
// Your Name
// Date
//Possibly minesweeper
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let difficultySelected = false;
let easyButton;
let mediumButton;
let hardButton;
let coveringGrid;
let difficulty = 0;
let tileSize = 100;
const EASY = 1;
const MEDIUM = 2;
const HARD = 3;
const DEFAULT_SIZE = 8;
const SAFE = 0;
const MINE = -1;
let gridSize;
let gridLength;
let xOffset;
let yOffset;
let bombGrid = [];
let xTile;
let yTile;
const COVERING_TILE_ON = 1;
const COVERING_TILE_OFF = 0;

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

  //create the three difficulty buttons
  easyButton = new difficultyButton("Easy", 255, height/4 - height/16);
  mediumButton = new difficultyButton("Medium", 155, height/2 - height/16);
  hardButton = new difficultyButton("Hard", 55, 3*height/4 - height/16);
}

function draw() {
  background(220);
  displayDifficultyButtons();
  detectHovering();
  displayGrids();
}



function displayDifficultyButtons(){
  if (!difficultySelected){
    // is the difficulty has not been selected then display the buttons
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
      coveringGrid = createGrid();
    }
    else if (mediumButton.mouseOn()){
      difficulty = MEDIUM;
      difficultySelected = true;
      coveringGrid = createGrid();
    }
    else if (hardButton.mouseOn()){
      difficulty = HARD;
      coveringGrid = createGrid();
    }
  }

  else{
    xTile = Math.floor((mouseX-xOffset)/tileSize);
    yTile = Math.floor((mouseY-yOffset)/tileSize);
    coveringGrid[xTile][yTile] = toggleCoveringTile(xTile,yTile);
    bombGrid[xTile][yTile] = getNeighbouringBombs(xTile, yTile);
  }
}

function createGrid(){
  let tempGrid = [];
  difficultySelected = true;
  gridSize = DEFAULT_SIZE*difficulty;
  tileSize = 100/difficulty;
  gridLength = gridSize*tileSize;
  xOffset = width/2 - gridLength/2;
  yOffset = height/2 - gridLength/2;
  for (let rows = 0; rows < gridSize; rows++){
    tempGrid.push([]);
    for (let cols = 0; cols < gridSize; cols++){
      tempGrid[rows].push(COVERING_TILE_ON);
    }
  }
  bombGrid = generateBombs();
  return tempGrid;
}

function detectHovering(){
  easyButton.mouseOn(easyButton.buttonColor);
  mediumButton.mouseOn(easyButton.buttonColor);
  hardButton.mouseOn(easyButton.buttonColor);
}

function displayGrids(){
  for (let x = 0; x < gridSize; x++){
    for (let y = 0; y < gridSize; y++){
      //hidden grid

      //color white if its safe and red if its a mine
      if (bombGrid[x][y] !== MINE){
        fill(255);
      }
      else{
        fill('red');
      }

      //draw the tiles
      square(x*tileSize + xOffset, y*tileSize + yOffset, tileSize);
      if (bombGrid[x][y] !== SAFE){
        fill(0);
        text(bombGrid[x][y], x*tileSize + tileSize/2 + xOffset, y*tileSize + tileSize/2 + yOffset);
      }

      //covering grid

      if (coveringGrid[x][y] === COVERING_TILE_ON){
        fill(200);
        square(x*tileSize + xOffset, y*tileSize + yOffset, tileSize);
      }
    }
  }
};

function generateBombs(){
  let tempGrid = [];
  for (let rows = 0; rows < gridSize; rows++){
    tempGrid.push([]);
    for (let cols = 0; cols < gridSize; cols++){
      // add mines at a 20% chance
      if (random(100) < 20){
        tempGrid[rows].push(MINE);
      }
      else{
        tempGrid[rows].push(SAFE);
      }
    }
  }
  return tempGrid;
}

function getNeighbouringBombs(_x,_y){
  let neighbouringMines = 0;
  for (let i = -1; i <= 1; i++){
    for (let j = -1; j <= 1; j++){
      if (_x + i >= 0 && _x + i <= gridSize-1 && bombGrid[_x + i][_y + j] === MINE){
        neighbouringMines++;
      }
    }
  }
  console.log(neighbouringMines);
  return neighbouringMines;
}

function toggleCoveringTile(_x,_y){
  coveringGrid[_x][_y] = COVERING_TILE_OFF;
}