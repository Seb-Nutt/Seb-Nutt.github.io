// Arrays and object notation
// Sebastian Nutt
// March 5th 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//create the object for replying via text to speech
let speech = new p5.Speech();

//create the response model
let rm = RiTa.markov(2,{trace: false}, {disableInputChecks: true});

let speechRec;
let listening;
// display the prompt to speak initially before chagning to display the users input
let humanSpeech = 'Hold V to speak';
let generated;
let hamlet;
let textBox = {
  x: 0,
  y: 0,
  boxWidth: 0,
  BOXHEIGHT: 50
};

function preload(){
  // load hamlet to give the model something to train off of
  hamlet = loadStrings('/hamlet.txt');
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // create the speech recognition object
  speechRec = new p5.SpeechRec('en-US');

  //align text to the center
  textAlign('center');

  //add hamlet into the AI's processing
  rm.addText(hamlet);

  textBox.y = height/2-25;

  //create a callback to run the speech recognition when the speech recognition gets a result
  speechRec.onResult = processSpeech;
}

function draw() {
  background(220);

  //constantly listen and dsplay text
  listen();
  displayText();
  drawTextBox();
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
  }
}

function processSpeech(){
  // get the result of the speech synthesis
  humanSpeech = speechRec.resultString;

  // add the users input into the model
  rm.addText(humanSpeech);

  // create the output in the form a list which predicts the next word based on the latest added word
  generated = [humanSpeech];
  while (generated[generated.length-1] !== '.' || generated.length === 1){
    generated.push(random(rm.completions(generated[generated.length-1])));
  }

  // remove the initial human input to properly format the response
  generated.shift();

  //rejoin the output into a string
  generated = generated.join(' ');

  // call the text to speech to speak the output
  speak();
}

function displayText(){
  //display both the users input and the Models output
  text(humanSpeech,width/2,height/6);
  text(generated, width/2,height/2 + 50);
}

function drawTextBox(){
  fill(100);
  try{
    textBox.boxWidth = generated.length*10;
    textBox.x = width/2 - generated.length;
  }
  catch{
    square(textBox.x,height/2-50,textBox.boxWidth,textBox.BOXHEIGHT);
  }
}