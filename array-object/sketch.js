// Arrays and object notation
// Sebastian Nutt
// March 5th 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// 3d envirement that allows you to speak to a thing that will repeat what yu said back to it via text to speech

let playerSpeech;
let speech = new p5.Speech();
let speechRec;
let listening;


function setup() {
  createCanvas(windowWidth, windowHeight);
  speechRec = new p5.SpeechRec('en-US', gotSpeech);
  speechRec.start();

  function gotSpeech(){
    console.log(speechRec);
  }

}

function draw() {
  background(220);
  listen();
  speak();
  console.log(speechRec.resultString);
}

function speak(){

}

function listen(){
  //listen if the alt key is held down
  if (!keyIsDown(18)){
    speechRec.stop();
    listening = false;
  }
  else if (!listening){
    speechRec.start();
    listening = true;
  }
}