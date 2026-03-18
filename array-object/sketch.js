// Arrays and object notation
// Sebastian Nutt
// March 18th 2026
//
// Extra for Experts:
// - I used multiple additional libraries and whent through the process of bug-testing and using them in tandem to create my product which incorpertates both. 


//create the object for replying via text to speech
let speech = new p5.Speech();

//create the response model
let ritaModel = RiTa.markov(2,{trace: false}, {disableInputChecks: true});

let speechRec;
let listening;
// display the prompt to speak initially before chagning to display the users input
let humanSpeech = 'Hold V to speak';
let generated = '';
let hamlet;
let textBoxOutput = {
  x: 0,
  y: 0,
  boxWidth: 0,
  BOXHEIGHT: 50
};
let textBoxInput = structuredClone(textBoxOutput);

function preload(){
  // load hamlet to give the model something to train off of
  hamlet = loadStrings('hamlet.txt');
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // create the speech recognition object
  speechRec = new p5.SpeechRec('en-US');

  //align text to the center
  textAlign('center');

  //add hamlet into the AI's processing
  ritaModel.addText(hamlet);

  // set the proper heights for the textboxes
  textBoxOutput.y = height/2-25;
  textBoxInput.y =  height/6-25;

  //create a callback to run the speech recognition when the speech recognition gets a result
  speechRec.onResult = processSpeech;
}

function draw() {
  background('navy');

  //constantly listen and display text
  listen();
  drawTextBoxes();
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
  }
}

function processSpeech(){
  // get the result of the speech synthesis
  humanSpeech = speechRec.resultString;

  // add the users input into the model
  ritaModel.addText(humanSpeech);

  // create the output in the form a list which predicts the next word based on the latest added word
  generated = [humanSpeech];
  while (generated[generated.length-1] !== '.' || generated.length === 1){
    generated.push(random(ritaModel.completions(generated[generated.length-1])));
  }

  // remove the initial human input to properly format the response
  generated.shift();

  //rejoin the output into a string
  generated = generated.join(' ');

  // call the text to speech to speak the output
  speak();
}

function drawTextBoxes(){
  fill(100);
  try{
    textBoxOutput.boxWidth = generated.length*6;
    textBoxOutput.x = width/2 - generated.length*3;
    textBoxInput.boxWidth = humanSpeech.length*6;
    textBoxInput.x = width/2 - humanSpeech.length*3;
  }
  finally{
    fill('black');
    stroke('white');
    rect(textBoxOutput.x,textBoxOutput.y,textBoxOutput.boxWidth,textBoxOutput.BOXHEIGHT);

    fill('white');
    stroke('black');
    rect(textBoxInput.x,textBoxInput.y,textBoxInput.boxWidth,textBoxInput.BOXHEIGHT);
  }
}

function displayText(){
  //display both the users input and the Models output
  fill('black');
  text(humanSpeech,width/2,height/6);

  fill('white');
  text(generated, width/2,height/2);
}

