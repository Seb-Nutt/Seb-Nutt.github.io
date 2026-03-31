// 2d rectangular grid demo

const CELL_SIZE = 100;
let rows;
let cols;
let grid;
let white = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(width/CELL_SIZE);
  cols = Math.floor(height/CELL_SIZE);
  grid = generateGrid(cols,rows);
}

function draw() {
  background(220);


  displayGrid();
}

function generateGrid(cols,rows){
  newGrid = [];
  for (let y = 0; y < cols; y++){
    newGrid.push([]);
    for (let x = 0; x < rows; x++){
      clr = random(100);
      if (clr < 50 || white){
        newGrid[y].push(0);
      }
      else{
        newGrid[y].push(1);
      }
    }
  }
  return newGrid;
}



function displayGrid(){
  for (let y = 0; y < cols; y++){
    for (let x = 0; x < rows; x++){
      if (grid[y][x] === 0){
        fill('white');
      }
      else if(grid[y][x] === 1){
        fill('black');
      }

      square(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE);
    }
  }
}

function mousePressed(){
  let col = Math.floor(mouseY/CELL_SIZE);
  let row = Math.floor(mouseX/CELL_SIZE);

  for (let i = -1; i <= 1; i++){
    for (let j = -1; j <= 1; j++){
      toggleCell(col + i ,row + j);
    }
  }
  
}

function toggleCell(col,row){

  if (col >= 0 && col < cols && row >= 0 && row < rows){
    if (grid[col][row] === 1){
      grid[col][row] = 0;
    }
    else if (grid[col][row] === 0){
      grid[col][row] = 1;
    }
  }
}

function keyPressed() {
  if (key === 'r'){
    white = false;
    grid = generateGrid(cols,rows);
  }
  else if (key === 'e'){
    white = true;
    grid = generateGrid(cols,rows);
  }
}