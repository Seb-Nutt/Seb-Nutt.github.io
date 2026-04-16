// Grid assignment (2d arrays)
// Sebastian Nutt
// April 15 2026

// Extra for Experts:
// I used classes before they were taught in person to create the difficulty buttons



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
let tileColors;
let flagImg;
let mineImg;

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
    //draw the buttons until the player selects a difficulty
    if (gameState === SELECTING_DIFFICULTY){
      fill(this.currentColor);
      rect(this.x,this.y,this.buttonWidth,this.buttonHeight);
      fill('black');
      textSize(20);
      text(this.difficulty,width/2,this.y + height/32);
    }
  }

  mouseOn (){
    // return if the mouse if hovering over the button or not
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
function preload(){
  flagImg = loadImage("images/flag.png");
  mineImg = loadImage("images/mine.jpg");
}

function setup() {
  textAlign(CENTER);
  createCanvas(windowWidth, windowHeight);

  //define the colors used for the different numbers of surrounding mines
  tileColors = [color(78,159,229),color(125, 192, 121), color(255,47,0), color(127,0,255), color(108,20,19), color(0,50,0), color(0,0,25), color(0)];

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
  displayTitles();
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
    // if the difficulty is being selected then detect of the mouse is clikced on one of the buttons and set the difficulty accordingly
    if (easyButton.mouseOn()){
      difficulty = EASY;
      coveringGrid = createGrid();
    }
    else if (mediumButton.mouseOn()){
      difficulty = MEDIUM;
      coveringGrid = createGrid();
    }
    else if (hardButton.mouseOn()){
      difficulty = HARD;
      coveringGrid = createGrid();
    }

  }

  //if the gameplay is active
  else if (gameState === PLAYING){
    getMouseTile();

    //toggle the clicked tile
    toggleCoveringTile(xTile,yTile);

    // if it isnt a mine then display the amount of neighbouring mines
    if (bombGrid[xTile][yTile] !== MINE){
      neighbouringMines = getNeighbouringBombs(xTile, yTile);
      bombGrid[xTile][yTile] = neighbouringMines;
    }

    // if the bomb is a mine and is not flagged then toggle the loss screen
    else if (coveringGrid[xTile][yTile] !== FLAG){
      toggleLoss();
    }
  }
}

function createGrid(){


  let tempGrid = [];

  //define various grid-related variables that will allow for accurate calculations
  gameState = PLAYING;
  gridSize = DEFAULT_SIZE*difficulty;
  tileSize = 100/difficulty;
  gridLength = gridSize*tileSize;
  xOffset = width/2 - gridLength/2;
  yOffset = height/2 - gridLength/2;

  // create a grid of tiles that will cover the ones containing the mines
  for (let rows = 0; rows < gridSize; rows++){
    tempGrid.push([]);
    for (let cols = 0; cols < gridSize; cols++){
      tempGrid[rows].push(COVERING_TILE_ON);
    }
  }

  //generate an identical grid to place the bombs in
  bombGrid = generateBombs();
  return tempGrid;
}

function detectHovering(){

  //check if the mouse if hovering and change the color accordingly
  easyButton.mouseOn(easyButton.buttonColor);
  mediumButton.mouseOn(easyButton.buttonColor);
  hardButton.mouseOn(easyButton.buttonColor);
}

function displayGrids(){
  for (let x = 0; x < gridSize; x++){
    for (let y = 0; y < gridSize; y++){

      stroke('black');
      textSize(tileSize/2);
      fill('white');

      //draw the tiles
      square(x*tileSize + xOffset, y*tileSize + yOffset, tileSize);
      if (getNeighbouringBombs(x,y) !== EMPTY){
        fill(tileColors[getNeighbouringBombs(x,y) - 1]);
        text(bombGrid[x][y], x*tileSize + tileSize/2 + xOffset, y*tileSize + tileSize/2 + yOffset);
        //draw a bomb over the text if its a mine
        if (bombGrid[x][y] === MINE){
          image(mineImg, x*tileSize + xOffset, y*tileSize + yOffset, tileSize, tileSize);
        }
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
      //check to see if there is a mien in proximity and if ti is inside the grid to prevent edgecases
      if (isInsideGrid(_x + i, _y + j) && bombGrid[_x + i][_y + j] === MINE){
        neighbouringMines++;
      }
    }
  }
  return neighbouringMines;
}

function toggleCoveringTile(_x,_y){
  // if the clicked tile isnt flagged then toggle it
  if (coveringGrid[_x][_y] !== FLAG){
    coveringGrid[_x][_y] = COVERING_TILE_OFF;
  }
}

function toggleChainedZeroes(_x,_y){
  for (let i = -1; i < 2; i++){
    for (let j = -1; j < 2; j++){
      if (isInsideGrid(_x + i, _y + j)){
        //toggle all of the tiles neighbouring the one with zero neighbooring mines if the tile isnt flagged
        if (coveringGrid[_x + i][_y + j] !== FLAG){
          toggleCoveringTile(_x + i,_y + j);
          bombGrid[_x + i][_y + j] = getNeighbouringBombs(_x + i, _y + j);
        } 
      }
    }
  }
  return;
}

function keyPressed(){
  if (key === 'e'){
    getMouseTile();
    
    //toggle a flag at the location where e was pressed
    if (gameState === PLAYING){
      if (coveringGrid[xTile][yTile] === COVERING_TILE_ON){
        coveringGrid[xTile][yTile] = FLAG;
      }
      else if (coveringGrid[xTile][yTile] === FLAG){
        coveringGrid[xTile][yTile] = COVERING_TILE_ON;
      }

      //if all of the mines are flagged change the gamestate to won
      if (checkWin()){
        gameState = WIN;
      }
    }
  }
}

function getMouseTile(){
  // get the tile that the mouse is on
  xTile = Math.floor((mouseX-xOffset)/tileSize);
  yTile = Math.floor((mouseY-yOffset)/tileSize);
}

function isInsideGrid(_x,_y){
  //return if the reqquested tile is in the grid
  return _x >= 0 && _x <= gridSize - 1 && _y >= 0 && _y <= gridSize - 1;
}

function toggleLoss(){
  //change the gamestate and reveal the bombs
  revealBombs();
  gameState = LOSS;
}

function revealBombs(){
  for (let x = 0; x < gridSize; x++){
    for (let y = 0; y < gridSize; y++){
      // toggle the covering if the selected tile is a mine
      if (bombGrid[x][y] === MINE){
        coveringGrid[x][y] = COVERING_TILE_OFF;
      }
    }
  }
}

function displayTitles(){
  //draw the various titles
  textAlign(CENTER);

  //draw the minesweeper text at the top if you are past the difficulty selecting stage
  if (gameState !== SELECTING_DIFFICULTY){
    fill('black');
    stroke('red');
    textSize(20);
    text('Minesweeper',width/2,yOffset/2);
  }

  //draw the game over text if the game is lost
  if (gameState === LOSS){
    fill('red');
    stroke('black');
    textSize(100);
    text("Game Over!", width/2,height/2);
  }

  //draw the winnign text if the game is won
  if (gameState === WIN){
    fill('green');
    stroke('black');
    textSize(100);
    text('Congratulations, You Win!', width/2, height/2);
  }
}

function checkWin(){
  //check every tile to see if there are unflagged mines, if there are none then return true
  for (let x = 0; x < gridSize; x++){
    for (let y = 0; y < gridSize; y++){
      if (bombGrid[x][y] === MINE && coveringGrid[x][y] !== FLAG){
        return false;
      }
    }
  }
  return true;
}