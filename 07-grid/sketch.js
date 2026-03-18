// 2d grid demo


let theGrid = [[true,false,false,false],[true,false,true,false],[false,true,false,false],[false,false,true,true]];
const SQUARE_DIMENSION = theGrid.length;
let cellSize;
let verticalSquare;
let horizantalSquare;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width > height){
    cellSize = height/SQUARE_DIMENSION;
  }
  else{
    cellSize = width/SQUARE_DIMENSION;
  }
}

function draw() {
  background(220);
  showGrid();
}

function showGrid(){
  for (let i = 0; i < SQUARE_DIMENSION; i++){
    for (let j = 0; j < SQUARE_DIMENSION; j++){
      if (theGrid[j][i]){
        fill('black');
      }
      else if (!theGrid[j][i]){
        fill('white');
      }
      square(i*cellSize,j*cellSize,cellSize);
    }
  }
}


function mousePressed(){
  verticalSquare = Math.floor(mouseY*4/cellSize);
  horizantalSquare = Math.floor(mouseX*4/cellSize);

  theGrid[verticalSquare,horizantalSquare] = !theGrid[verticalSquare,horizantalSquare];
}