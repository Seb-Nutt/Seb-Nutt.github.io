// Sierpinkski Triangle Recursion Demo

let initialTriangle = [
  {x: 0, y: 948},
  {x: 956, y: 0},
  {x: 1912, y: 948}
];

let depth = 0;
let theColors = ['red','blue','green','yellow','cyan','pink','grey','black','purple','navy'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  sierpinkski(initialTriangle, depth);
}

function draw() {
}


function sierpinkski(points, depth){
  fill(theColors[depth]);
  triangle(points[0].x,points[0].y,
    points[1].x,points[1].y,
    points[2].x,points[2].y
  );

  if (depth > 0){
    sierpinkski([points[0], midpoint(points[0],points[1]), midpoint(points[0],points[2])], depth - 1);
    sierpinkski([points[1], midpoint(points[1],points[0]), midpoint(points[1],points[2])], depth - 1);
    sierpinkski([points[2], midpoint(points[2],points[1]), midpoint(points[2],points[0])], depth - 1);
  }

}

function midpoint(p1,p2){
  let midX = (p1.x+p2.x)/2;
  let midY = (p1.y+p2.y)/2;
  return {x: midX, y: midY};
}

function mousePressed(){
  if (depth < 9){
    depth++;
    sierpinkski(initialTriangle, depth);
  }
}