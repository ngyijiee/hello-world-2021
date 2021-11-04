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
let waterDrop2;
let waterDrop3;
let waterDrop4;
let waterDrop5;
let waterDrop6;
let waterDrop7;
let waterDrop8;
let bg1;
let bg2;
let bg3;
let bg4;
let bg5;
let bg6;
let bg7;
let bg8;
let bg9;
let bg10;
let bg11;
let bg12;
var bpm = 0;

var words = [
  'Start running!',
  'Doing great!',
  'The rain has stopped!',
  'You are almost there!',
  'Keep going!',
  'You made it!',
];

function preload() {
  waterDrop1 = loadImage('raindrop_1.png');
  waterDrop2 = loadImage('raindrop_2.png');
  waterDrop3 = loadImage('raindrop_3.png');
  waterDrop4 = loadImage('raindrop_4.png');
  waterDrop5 = loadImage('raindrop_5.png');
  waterDrop6 = loadImage('raindrop_6.png');
  waterDrop7 = loadImage('raindrop_7.png');
  waterDrop8 = loadImage('raindrop_8.png');
  bg1 = loadImage('rainbow game_01.png');
  bg2 = loadImage('rainbow game_02.png');
  bg3 = loadImage('rainbow game_03.png');
  bg4 = loadImage('rainbow game_04.png');
  bg5 = loadImage('rainbow game_05.png');
  bg6 = loadImage('rainbow game_06.png');
  bg7 = loadImage('rainbow game_07.png');
  bg8 = loadImage('rainbow game_08.png');
  bg9 = loadImage('rainbow game_09.png');
  bg10 = loadImage('rainbow game_10.png');
  bg11 = loadImage('rainbow game_11.png');
  bg12 = loadImage('rainbow game_12.png');
}

var drop = [];
function setup() {
  createCanvas(1920, 1080);
  for (var i = 0; i < 400; i++) {
    drop[i] = new Drop();
  }
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing
  serial.list(); // list the serial ports
  serial.open(portName);
}

// Draw background
function draw() {
  if (bpm <= 82) {
    background(bg1);
    text(words[0], 1502, 400);
  } else if (bpm > 82 && bpm <= 100) {
    background(bg2);
    text(words[1], 1512, 400);
  } else if (bpm > 100 && bpm <= 150) {
    background(bg3);
    text(words[2], 1429, 400);
  } else if (bpm > 150 && bpm <= 157) {
    background(bg4);
    text(words[3], 1429, 400);
  } else if (bpm > 157 && bpm <= 159) {
    background(bg5);
    text(words[4], 1509, 400);
  } else if (bpm > 159 && bpm <= 165) {
    background(bg6);
    text(words[4], 1509, 400);
  } else if (bpm > 165 && bpm <= 172) {
    background(bg7);
    text(words[4], 1509, 400);
  } else if (bpm > 172 && bpm <= 179) {
    background(bg8);
    text(words[4], 1509, 400);
  } else if (bpm > 179 && bpm <= 186) {
    background(bg9);
    text(words[4], 1509, 400);
  } else if (bpm > 186 && bpm <= 193) {
    background(bg10);
    text(words[4], 1509, 400);
  } else if (bpm > 193 && bpm <= 200) {
    background(bg11);
    text(words[4], 1509, 400);
  } else {
    background(bg12);
    text(words[5], 1509, 400);
  }
  
  textSize(180);
  fill(255);
  text(bpm, 1420, 811);
  textSize(42);
  fill(255, 255, 255);
  for (var i = 0; i < 5; i++) {
    drop[i].show();
    drop[i].update();
  }
}
// Draw Raindrops
function Drop() {
  // initialize the 1st drop
  this.x = random(205, 1165);
  this.y = random(440, 960);
  this.speed = random(1, 8);
  this.gravity = 0.2;
  this.show = function () {
    image(waterDrop1, this.x, this.y, 32, 55);
  };
  this.update = function () {
    // speed up due to this.gravity
    this.speed = this.speed + this.gravity;
    // y changes due to speed
    this.y = this.y + this.speed;
    // if the drop goes out ot the screen
    if (this.y > height) {
      // re-generate a new drop with random x, random initial velocity and fixed y - just below the clouds
      this.x = random(205, 1165);
      this.y = 440;
      if (bpm <= 72) {
      this.speed = random(30, 60);
    } else if (bpm > 72 && bpm <= 100) {
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
// This connects Arduino and pulse sensor
function serialEvent() {
  // read the serial buffer up to the linefeed:
  let myString = serial.readLine(); // store the data in a variable
  trim(myString); // get rid of whitespace
  if (!myString) return; // if there's nothing in there, exit the function
  // split the string at the separator (commas), convert the segments into integers,
  // then organize into an aray:
  let sensors = split(myString, ',');
  // print out the values you got in the console, for debugging:
  console.log(sensors);
  // **************************************************************************
  // set ball position to move across full width and height of your canvas size
  // change map values to reflect what sensors actually ouput!
  // e.g. 0 - 1023 for a potentiometer
  // e.g. 250 - 700 for a photocell
  // e.g. 350 - 650 for an accelerometer
  // e.g. 0 or 1, or 0 or 255, for a button
  if (sensors.length >= numSensors) {
    bpm = sensors[0];
  }
}
function printList(portList) {
  print('List of Serial Ports:');
  // theList is an array of their names
  for (let i = 0; i < portList.length; i++) {
    // Display in the console
    print('[' + i + ']' + portList[i]);
  }
}
function serverConnected() {
  console.log('Connected to server.');
}
function portOpen() {
  console.log('Serial port opened.');
  serial.clear(); // clears the buffer of any outstanding data
  serial.write('A'); // / respond back to Arduino that we are ready for new data
}
function serialError(err) {
  console.log('Serial port error:' + err);
}
function portClose() {
  console.log('Serial port closed.');
}