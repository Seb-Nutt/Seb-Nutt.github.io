// Grid assignment (2d arrays)
// Your Name
// Date
//Possibly minesweeper
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



const SELECTING_DIFFICULTY = 0;
const PLAYING = 1;
const WIN = 2;
const LOSS = 3;
let gameState = SELECTING_DIFFICULTY;
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
const EMPTY = 0;
const MINE = -1;
const FLAG = -2;
let gridSize;
let gridLength;
let xOffset;
let yOffset;
let bombGrid = [];
let xTile;
let yTile;
const COVERING_TILE_ON = 1;
const COVERING_TILE_OFF = 0;
const MINE_CHANCE = 10;
let chainedTiles;
let tileColors = [[78,159,229],[125, 192, 121], [255,47,0], [127,0,255], [108,20,19]];
let flagImg;

function preload(){
  flagImg = loadImage("images/flag.png");
}

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
      if (gameState === SELECTING_DIFFICULTY){
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
  if (gameState === SELECTING_DIFFICULTY){
    // is the difficulty has not been selected then display the buttons
    easyButton.drawButton();
    mediumButton.drawButton();
    hardButton.drawButton();
  }
}

function mousePressed(){
  if (gameState === SELECTING_DIFFICULTY){
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

  else if (gameState === PLAYING){
    getMouseTile();

    //toggle the clicked tile
    coveringGrid[xTile][yTile] = toggleCoveringTile(xTile,yTile);

    // if it isnt a mine then display the amount of neighbouring mines
    if (bombGrid[xTile][yTile] !== MINE){
      neighbouringMines = getNeighbouringBombs(xTile, yTile);
      bombGrid[xTile][yTile] = neighbouringMines;

      //if it has 0 nearby then toggle all neighbouring tiles
      if (neighbouringMines === 0){
        chainedTiles = 0;
        toggleChainedZeroes(xTile, yTile);
      }
    }

    else{
      toggleLoss();
    }
  }
}

function createGrid(){
  let tempGrid = [];
  gameState = PLAYING;
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
      if (getNeighbouringBombs(x,y) !== EMPTY){
        fill(tileColors[getNeighbouringBombs(x,y) - 1][0],tileColors[getNeighbouringBombs(x,y) - 1][1],tileColors[getNeighbouringBombs(x,y) - 1][2]);
        text(bombGrid[x][y], x*tileSize + tileSize/2 + xOffset, y*tileSize + tileSize/2 + yOffset);
      }

      //create the flooding system
      if (bombGrid[x][y] === 0 && coveringGrid[x][y] === COVERING_TILE_OFF){
        toggleChainedZeroes(x,y);
      }

      //covering grid

      if (coveringGrid[x][y] === COVERING_TILE_ON){
        fill(200);
        square(x*tileSize + xOffset, y*tileSize + yOffset, tileSize);
      }
      else if(coveringGrid[x][y] === FLAG){
        fill(255,0,0);
        square(x*tileSize + xOffset, y*tileSize + yOffset, tileSize);
        image(flagImg, x*tileSize + xOffset, y*tileSize + yOffset, tileSize, tileSize);
      }
    }
  }
};

function generateBombs(){
  let tempGrid = [];
  for (let rows = 0; rows < gridSize; rows++){
    tempGrid.push([]);
    for (let cols = 0; cols < gridSize; cols++){
      // add mines at a set chance
      if (random(100) < MINE_CHANCE){
        tempGrid[rows].push(MINE);
      }
      else{
        tempGrid[rows].push(EMPTY);
      }
    }
  }
  return tempGrid;
}

function getNeighbouringBombs(_x,_y){
  let neighbouringMines = 0;
  for (let i = -1; i <= 1; i++){
    for (let j = -1; j <= 1; j++){
      if (isInsideGrid(_x + i, _y + j) && bombGrid[_x + i][_y + j] === MINE){
        neighbouringMines++;
      }
      // maybe check if its empty here to create the flooding system
    }
  }
  return neighbouringMines;
}

function toggleCoveringTile(_x,_y){
  coveringGrid[_x][_y] = COVERING_TILE_OFF;
}

function toggleChainedZeroes(_x,_y){
  for (let i = -1; i < 2; i++){
    for (let j = -1; j < 2; j++){
      if (isInsideGrid(_x + i, _y + j)){
        toggleCoveringTile(_x + i,_y + j);
        bombGrid[_x + i][_y + j] = getNeighbouringBombs(_x + i, _y + j); 
      }
    }
  }
  return;
}

function keyPressed(){
  if (key === 'e'){
    getMouseTile();

    if (coveringGrid[xTile][yTile] === COVERING_TILE_ON){
      coveringGrid[xTile][yTile] = FLAG;
    }
  }
}

function getMouseTile(){
  // get the tile that the mouse is on
  xTile = Math.floor((mouseX-xOffset)/tileSize);
  yTile = Math.floor((mouseY-yOffset)/tileSize);
}

function isInsideGrid(_x,_y){
  return _x >= 0 && _x <= gridSize - 1 && _y >= 0 && _y <= gridSize - 1;
}

function toggleLoss(){
  revealAll();
  gameState = LOSS;
}

function revealAll(){
  for (let x = 0; x < gridSize; x++){
    for (let y = 0; y < gridSize; y++){
      bombGrid[x][y] = getNeighbouringBombs(x,y);
      coveringGrid[x][y] = COVERING_TILE_OFF;
    }
  }
}