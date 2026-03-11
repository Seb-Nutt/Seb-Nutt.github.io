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
let humanSpeech = 'hi';
let rm = RiTa.markov({disableInputChecks: true});
let textAdded = false;
let processed = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  speechRec = new p5.SpeechRec('en-US'); //gotSpeech);

  // function gotSpeech(){
  //   humanSpeech = speechRec.ResultString;
  // }

}

function draw() {
  background(220);
  if (processed){
    listen();
    humanSpeech = speechRec.resultString;
  }
  

  if (!processed){
    processSpeech();
  }
  speak();
}

function speak(){
  text(humanSpeech,width/2,height/2);
}

function listen(){
  //listen if the 'v' key is held down
  if (!keyIsDown(86)){
    speechRec.stop();
    listening = false;
  }
  else if (!listening && keyIsDown(86)){
    speechRec.start();
    listening = true;
    processed = false;
  }

}

function processSpeech(){
  try{
    // updating late rightnow - fix tommorrow
    if (!processed){
      rm.addText(humanSpeech);
      // console.log(rm.generate(2));
      processed = true;
    }
  }
  catch{
    console.log('error');
  }

}