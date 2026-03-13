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
let humanSpeech = 'Hold V to speak';
let rm = RiTa.markov(2, {trace: false}, {disableInputChecks: true});
// rm.untokenize;
let textAdded = false;
let processed = true;
let generated;
let hamlet;
let trainingWords = ['is','the','or'];

function preload(){
  // attempting to load hamlet to give the model something to train off of
  hamlet = loadStrings('/hamlet.txt');
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  speechRec = new p5.SpeechRec('en-US'); //gotSpeech);

  while (trainingWords.length < 1000){
    trainingWords.push(RiTa.randomWord());
  }

  // rm.addText(hamlet);
  rm.addText(trainingWords);

  speechRec.onResult = processSpeech;
}

function draw() {
  background(220);

  listen();
  displayText();
}

function speak(){
  // use text to speech to speak the generated text
  speech.speak(generated);
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
  humanSpeech = speechRec.resultString;
  rm.addText(humanSpeech);
  generated = rm.generate();

  processed = true;
  
  console.log(generated);

  speak();
}

function displayText(){
  text(humanSpeech,width/2,height/2);

  text(generated, width/2,height/2 + 50);
}