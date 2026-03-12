// Arrays and object notation
// Sebastian Nutt
// March 5th 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// 3d envirement that allows you to speak to a thing that will repeat what yu said back to it via text to speech

let speech = new p5.Speech();
let speechRec;
let listening;
let humanSpeech = 'hi';
let rm = RiTa.markov(5);
rm.untokenize;
let textAdded = false;
let processed = true;
let generated;
let hamlet;

function preload(){
  // attempting to load halet to give the model something to train off of
  hamlet = loadStrings('\GitHub\Seb-Nutt.github.io\array-object\hamlet.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  speechRec = new p5.SpeechRec('en-US'); //gotSpeech);

  // function gotSpeech(){
  //   humanSpeech = speechRec.ResultString;
  // }
  speechRec.onResult = processSpeech;
}

function draw() {
  background(220);

  listen();
  
  // if (!processed){
  //   processSpeech();
  // }
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
    humanSpeech = speechRec.resultString;
    rm.addText(humanSpeech);
    generated = rm.generate(10);
       
  }
  
  catch{
    console.log('error');
  }
  processed = true;
  
  console.log(generated);
}