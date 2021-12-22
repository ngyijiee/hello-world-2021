var leftBuffer;
var rightBuffer;

let serial; // variable for the serial object
let portName = '/dev/tty.usbserial-14410'; // fill in your serial port name here
let inData; // for incoming serial data
let serialDiv; // an HTML div to show incoming serial data
// HTML Select option object:
let portSelector;
let numSensors = 1;
let sensor = 0;
let wallpaper = 0;
let waterDrop1;
let stepbg;
let wordsbg;
var step = 0;
let isStart;
let loadingPage;
let endingPage;
let gameover;
let putName1;
let putName2;

let cloud1;
let cloud2;
let cloudR;
let input1, input2, button, greeting1, greeting2;



var player1Step= 0;
var player2Step= 0;
var words = [
  'Start running!',
  'Doing great!',
  'The rain has stopped!',
  'You are almost there!',
  'You Won!',
];

// Copyright (c) 2018 p5ble
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// The serviceUuid must match the serviceUuid of the device you would like to connect

//5A46E4A2-7746-4AE3-BEC4-B69F7C02A767
//6e400001-b5a3-f393-e0a9-e50e24dcca9e
const serviceUuid = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const txCharacteristic = "6e400002-b5a3-f393-e0a9-e50e24dcca9e"; // transmit is from the phone's perspective
const rxCharacteristic = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";  // receive is from the phone's perspective
//00001530-1212-EFDE-1523-785FEABCD123

let myCharacteristic;
let myValue = 0;
let myBLE;

var drop = [];

  
function setup() {
    // Create a p5ble class
  myBLE = new p5ble();
  // Create a 'Connect and Start Notifications' button
  const connectButton = createButton('Connect and Start Notifications')
  connectButton.mousePressed(connectAndStartNotify);

  // Create a 'Stop Notifications' button
  const stopButton = createButton('Stop Notifications')
  stopButton.mousePressed(stopNotifications);
  
  for (var i = 0; i < 5; i++) {
    drop[i] = new Drop(100,800);
    drop[i+5] = new Drop(1200,1700);  //之前是500-700,太近了这个你自己调整数据让他对
  }
  // 800 x 400 (double width to make room for each "sub-canvas")
  let cnv = createCanvas(1920, 1080);
  cnv.position(300, 80);
    
  // Create both of your off-screen graphics buffers
  leftBuffer = createGraphics(952, 1080);
  rightBuffer = createGraphics(952, 1080);
  isStart = false;
  putName1 = false;
  putName2 = false;

}

function connectAndStartNotify() {
  // Connect to a device by passing the service UUID
  myBLE.connect(serviceUuid, gotCharacteristics);
}

// A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
  if (error) console.log('error: ', error);
  console.log('characteristics', characteristics);
  for(let i = 0; i < characteristics.length; i++) {
   if(rxCharacteristic == characteristics[i].uuid){
    
    myCharacteristic = characteristics[i];
    console.log("yo", myCharacteristic)
    // myBLE.read(myCharacteristic, gotValue);
    myBLE.startNotifications(myCharacteristic, handleNotifications, "string");
   } 
  }
 
  // Start notifications on the first characteristic by passing the characteristic
  // And a callback function to handle notifications
  //myBLE.startNotifications(myCharacteristic, handleNotifications);
  // You can also pass in the dataType
  // Options: 'unit8', 'uint16', 'uint32', 'int8', 'int16', 'int32', 'float32', 'float64', 'string'
  // myBLE.startNotifications(myCharacteristic, handleNotifications, 'string');
}

function gotValue(error, value) {
  if (error) console.log('error: ', error);
  console.log('value: ', value);
  myValue = value;
  // After getting a value, call p5ble.read() again to get the value again
  myBLE.read(myCharacteristic, gotValue);
}

// A function that will be called once got characteristics
function handleNotifications(data) {
  // console.log('data: ', data, typeof(data));

  // test for which player
  if (data.indexOf('|1:') > -1) {

    
    let steps = data.split('1:')[1]
    if(steps !== undefined) {
      if (steps.indexOf('|') > -1) {
        steps = steps.split("|")[0]
      }
        console.log("player 1 steps", steps);
        player1Step = parseInt(steps);
    }  
   
    // let count = (data.match(/1:/g) || []).length;

    // if (count === 1) {
      
    // }

  
    
  } else if (data.indexOf('|2:') > -1) {
    let steps = data.split('2:')[1]
    if(steps !== undefined) {
      if (steps.indexOf('|') > -1) {
        steps = steps.split("|")[0]
      }
        console.log("player 2 steps", steps);
        player2Step = parseInt(steps);
    }
    
  
    
    
    
    // let count = (data.match(/2:/g) || []).length;

    // if (count === 1) {
      
    // }
  // }
  // console.log ("player 1", data.indexOf('1:'));
  // console.log ("player 2", data.indexOf('2:'));
  // myValue = data;
}
}
// A function to stop notifications
function stopNotifications() {
  myBLE.stopNotifications(myCharacteristic);
}

function preload() {
  cloud1 = loadImage('cloud_thunder.png');
  cloud2 = loadImage('cloud_thunder.png');
  waterDrop1 = loadImage('raindrop_1.png');
  bg1 = loadImage('plyr_bg_1.png');
  bg2 = loadImage('plyr_bg_2-1.png');
  cloudR = loadImage('clouds_r.png');
  cloudC = loadImage('cloud_clean.png');
  loadingPage = loadImage ('rainbow game_start.png');
  putName1 = loadImage ('putnamepage1.png');
  endingPage = loadImage ('rainbow game_end.png');
  stepbg = loadImage ('step_bg.png')
  wordsbg = loadImage ('wordsbg.png')
  gameover = loadImage ('gameover.png')
  rainBow1 = loadImage ('rainbow_01.png');
  rainBow2 = loadImage ('rainbow_02.png');
  rainBow3 = loadImage ('rainbow_03.png');
  rainBow4 = loadImage ('rainbow_04.png');
  rainBow5 = loadImage ('rainbow_05.png');
}
// function keyPressed(){
//   if(key === ' '){
//     isStart = true;
//     removeElements();
//   }
// }
// function greet1() {
//   const name = input1.value();
//   greeting1.html(name + ', you are doing great!');
//   input1.value('');
//   putName1 = true;
//   removeElements();
// }

// Draw Raindrops
function Drop(leftBoundry,rightBoundry) {  // delete step 12.14
  // initialize the 1st drop
  this.x = random(leftBoundry,rightBoundry);
  this.y = random(0, 400);
  this.speed = random(10,30);
  this.gravity = 0.2;
  this.show = function () {
    image(waterDrop1, this.x, this.y, 32, 55);
  };
  this.update = function (step) {
    // speed up due to this.gravity
    // this.speed = this.speed + this.gravity;
    // y changes due to speed
    this.y = this.y + this.speed;
    // if the drop goes out ot the screen
    if (this.y > height) {
      // re-generate a new drop with random x, random initial velocity and fixed y - just below the clouds
      this.x = random(leftBoundry,rightBoundry);
      this.y = 100;
      if (step <= 30) {
      this.speed = random(40,60);
    } else if (step > 30 && step <= 60) {
      this.speed = random(20, 30);
    }
      else if (step > 60 && step <= 80) {
      this.speed = random(1, 8);
    }
      else {
      this.x = -200;
      this.y = -200;  
      this.gravity = 0;
      }
  };
 }
}

function drawLeftBuffer(stepLeft) {
  // console.log(stepLeft);
  
  // if(putName1){
  for (var i = 0; i < 5; i++) {
    drop[i].show();
    drop[i].update(stepLeft);
  }
  if(stepLeft<=80) {
    let dR = map(stepLeft,0,80,0,0);
    let dG = map(stepLeft,0,80,0,0);
    let dB = map(stepLeft,0,80,0,0);
    leftBuffer.background(59+dR,84+dG,99+dB);//1/0,60,96 2/110,130,155
    leftBuffer.image(cloud1, 90, 50);
    cloud1.resize (756,343);
    image(stepbg, 28, 928);
    image(wordsbg, 430, 928);
    text(words[0], 467, 1020);
    // text('You are' + (typeof player1Step-player2Step) + 'steps faster.', 467, 1020 )
    textSize(120);
    fill(255);
    text(player1Step, 80, 1045);
    
  }
  else if(stepLeft>80 && stepLeft<=120) {
    let dR = map(stepLeft,80,120,0,0);
    let dG = map(stepLeft,80,120,0,60);
    let dB = map(stepLeft,80,120,0,96);
    leftBuffer.background(59+dR,84+dG,99+dB);//1/0,60,96 2/110,130,155  
    leftBuffer.image(cloudR,90, 50);
    cloudR.resize (756,343);
    image(stepbg, 28, 928);
    image(wordsbg, 430, 928);
    text(words[1], 467, 1020);
    textSize(120);
    fill(255);
    text(player1Step, 80, 1045);
  }
  else if(stepLeft > 120 && stepLeft<=160) {
    let dR = map(stepLeft,120,160,0,11);
    let dG = map(stepLeft,120,160,0,49);
    let dB = map(stepLeft,120,160,0,60);
    leftBuffer.background(59+dR,144+dG,195+dB);//1/0,60,96 2/110,130,155  
    leftBuffer.image(cloudC,90, 50);
    cloudC.resize (756,343);
    image(stepbg, 28, 928);
    image(wordsbg, 430, 928);
    text(words[2], 467, 1020);
    textSize(120);
    fill(255);
    text(player1Step, 80, 1045);
  }
  else if(stepLeft > 160 && stepLeft<=200) {  //200de yan se bu dui; ni zui zhong yao shen me yan se?
    let dR = map(stepLeft,160,200,0,99);
    let dG = map(stepLeft,160,200,0,21);
    let dB = map(stepLeft,160,200,0,0);
    leftBuffer.background(70+dR,193+dG,255+dB);//1/0,60,96 2/110,130,155 
    if(stepLeft > 160 && stepLeft<=165) {
      leftBuffer.image(cloudC,90, 50);
      cloudC.resize (756,343);
    }
    else if(stepLeft > 165 && stepLeft<=170) {
      leftBuffer.image(rainBow1,68,214);
      rainBow1.resize (728,564);
    }
    else if(stepLeft > 170 && stepLeft<=175) {
    leftBuffer.image(rainBow2,68,192);
    rainBow2.resize (728,586);
    }
    else if(stepLeft > 175 && stepLeft<=180) {
    leftBuffer.image(rainBow3,68,192);
    rainBow3.resize (728,586);
    }
    else if(stepLeft > 180 && stepLeft<=190) {
    leftBuffer.image(rainBow4,68,192);
    rainBow4.resize (728,586);
    }
    else if(stepLeft > 190 && stepLeft<=200) {
    leftBuffer.image(rainBow5,68,214);
    rainBow5.resize (728,564);
    }  
    // leftBuffer.image(cloudC,90, 50);
    // cloudC.resize (756,343);
    image(stepbg, 28, 928);
    image(wordsbg, 430, 928);
    text(words[3], 467, 1020);
    textSize(120);
    fill(255);
    text(player1Step, 80, 1045);
  }
  else if (stepLeft > 200 && stepLeft<=800) {  // show winner
    leftBuffer.image(endingPage,0,0);
    image(wordsbg, 10000, 0)
    image(stepbg, 10000, 0)
    image(gameover, 968, 0)
    
    
    // text(words[4], 567, 962);
    // noLoop();
  }
  else {  // just in case of unexpected value
    leftBuffer.background(59,84,99); 
}
// leftBuffer.fill(0, 0, 0);
// leftBuffer.textSize(32);

  
  // leftBuffer.image(cloud1,10,0);
  // cloud1.resize (360,164);
  
  
  leftBuffer.fill(255, 255, 255);
  leftBuffer.textSize(32);


  
  // var drop=[];
  // for (var i = 0; i < 5; i++) {
  //   drop[i] = new Drop(100,300);
  // }
  
    // leftBuffer.text("This is the left buffer!", 50, 50);
  }
//   else{
//     leftBuffer.background(123,34,56);
//     input1 = createInput();
//     input1.position(10, 10);

//     button = createButton('submit');
//     button.position(input1.x + input1.width, 40);
//     button.mousePressed(greet1);

//     greeting1 = createElement('h2', 'What is your name?');
//     greeting1.position(319, 554);

//     textAlign(CENTER);
//     textSize(60);
//   }
// }

function drawRightBuffer(stepRight) {
  // console.log(myValue);
  // var drop=[];
  // for (var i = 0; i < 5; i++) {
  //   drop[i] = new Drop(500,700);
  // }
  for (var i = 0; i < 5; i++) {
    drop[i+5].show();
    drop[i+5].update(stepRight);
  }
  if(stepRight<=80) {
    let dR = map(stepRight,0,80,0,0);
    let dG = map(stepRight,0,80,0,0);
    let dB = map(stepRight,0,80,0,0);
    rightBuffer.background(59+dR,84+dG,99+dB);//1/0,60,96 2/110,130,155
    rightBuffer.image(cloud1,90, 50);
    cloud1.resize (756,343);
    rightBuffer.image(stepbg, 28, 928);
    rightBuffer.image(wordsbg, 430, 928);
    rightBuffer.text(words[0], 467, 1020);
    rightBuffer.textSize(120);
    rightBuffer.fill(255);
    rightBuffer.text(player2Step, 80, 1045);
  }
  else if(stepRight>80 && stepRight<=120) {
    let dR = map(stepRight,80,120,0,0);
    let dG = map(stepRight,80,120,0,60);
    let dB = map(stepRight,80,120,0,96);
    rightBuffer.background(59+dR,84+dG,99+dB);//1/0,60,96 2/110,130,155  
    rightBuffer.image(cloudR,90, 50);
    cloudR.resize (756,343);
    rightBuffer.image(stepbg, 28, 928);
    rightBuffer.image(wordsbg, 430, 928);
    rightBuffer.text(words[1], 467, 1020);
    rightBuffer.textSize(120);
    rightBuffer.fill(255);
    rightBuffer.text(player2Step, 80, 1045);
  }
  else if(stepRight > 120 && stepRight<=160) {
    let dR = map(stepRight,120,160,0,11);
    let dG = map(stepRight,120,160,0,49);
    let dB = map(stepRight,120,160,0,60);
    rightBuffer.background(59+dR,144+dG,195+dB);//1/0,60,96 2/110,130,155
    rightBuffer.image(cloudC,90, 50);
    cloudC.resize (756,343);  
    rightBuffer.image(stepbg, 28, 928);
    rightBuffer.image(wordsbg, 430, 928);
    rightBuffer.text(words[2], 467, 1020);
    rightBuffer.textSize(120);
    rightBuffer.fill(255);
    rightBuffer.text(player2Step, 80, 1045);
  }
  else if(stepRight > 160 && stepRight<=200) {
      let dR = map(stepRight,160,200,0,99);
      let dG = map(stepRight,160,200,0,21);
      let dB = map(stepRight,160,200,0,0);
      rightBuffer.background(70+dR,193+dG,255+dB);//1/0,60,96 2/110,130,155  
    // rightBuffer.image(cloudC,90, 50);
    // cloudC.resize (756,343);
    if(stepRight > 160 && stepRight<=165) {
      rightBuffer.image(cloudC,90, 50);
      cloudC.resize (756,343);
    }
    else if(stepRight > 165 && stepRight<=170) {
      rightBuffer.image(rainBow1,68,214);
      rainBow1.resize (728,564);
    }
    else if(stepRight > 170 && stepRight<=175) {
    rightBuffer.image(rainBow2,68,192);
    rainBow2.resize (728,586);
    }
    else if(stepRight > 175 && stepRight<=180) {
    rightBuffer.image(rainBow3,68,192);
    rainBow3.resize (728,586);
    }
    else if(stepRight > 180 && stepRight<=190) {
    rightBuffer.image(rainBow4,68,192);
    rainBow4.resize (728,586);
    }
    else if(stepRight > 190 && stepRight<=200) {
    rightBuffer.image(rainBow5,68,214);
    rainBow5.resize (728,564);
    }  
    rightBuffer.image(stepbg, 28, 928);
    rightBuffer.image(wordsbg, 430, 928);
    rightBuffer.text(words[3], 467, 1020);
    rightBuffer.textSize(120);
    rightBuffer.fill(255);
    rightBuffer.text(player2Step, 80, 1045);
  }

  else if (stepRight => 200 && stepRight<=800) {  // show winner
    rightBuffer.image(endingPage,0,0);
    image(wordsbg, 10000, 0)
    image(stepbg, 10000, 0)
    image(gameover, 0, 0)
    // text(words[4], 567, 962);
    // noLoop();
  }
  else {  // just in case of unexpected value
    rightBuffer.background(59,84,99); 
    
}
    rightBuffer.fill(255, 255, 255);
    rightBuffer.textSize(32);
    

    
}

function draw() {
    // Paint the off-screen buffers onto the main canvas
  // if(isStart){
  background(255,255,255);  
  // console.log(myValue);

  // // determine which player
  // var dataArray = myValue.split(":");


  // if (dataArray[0] == "player1") {
  //   player1Step = dataArray[1];
  // }

  // if (dataArray[0] == "player2") {
  //   player2Step = dataArray[1];
  // }

  image(leftBuffer, 0, 0);
    image(rightBuffer, 968, 0);  
  
  // Draw on your buffers however you like
    drawLeftBuffer(player1Step);//player1Step
    drawRightBuffer(player2Step);//player2Step
  // }
  // else{
  //   background(loadingPage);
  // textSize(180);
  // fill(255);
  // text(step1Player, 1820, 811);
  textSize(32);
  fill(255, 255, 255);

  // for (var i = 0; i < 5; i++) {
  //   drop[i].show();
  //   drop[i].update();
  // }

}

