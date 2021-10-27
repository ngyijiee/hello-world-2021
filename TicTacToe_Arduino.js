let serial;                                 // variable for the serial object
let portName = '/dev/tty.usbserial-14110'; // fill in your serial port name here
let inData;                             // for incoming serial data
let serialDiv;                        // an HTML div to show incoming serial data
// HTML Select option object:
let portSelector;
let numSensors = 2;
let xPos = 0;
let yPos = 0;
let xRand = 400*Math.random();
let yRand = 400*Math.random();

let sensor_old_0;
let sensor_old_1;

let b;
let p1;
let p2;
let turn;
let score_div;

function setup() {
  p1 = new Player("X");
  p2 = new Player("O");
  createCanvas(400, 400);
  score_div = createDiv('').size(100, 25);
  b = new Board(3, p1, p2); //this object tracks changes made to the board
  serial = new p5.SerialPort();        // make a new instance of the serialport library
  serial.on("list", printList);       // set a callback function for the serialport list event
  serial.on("connected", serverConnected); // callback for connecting to the server
  serial.on("open", portOpen);         // callback for the port opening
  serial.on("data", serialEvent);     // callback for when new data arrives
  serial.on("error", serialError);   // callback for errors
  serial.on("close", portClose);     // callback for the port closing

  serial.list();                     // list the serial ports
  
  serial.open(portName);
}

function draw() {
  background(220);
  b.display();
}

function mousePressed(){
	if (!b.winState){
    if (b.turn === "X"){
      p1.select(b);
    } else {
      p2.select(b);
    }
    b.toggleTurn();
  } else {
  	b.newGame();
  }
}

//This class defines board attributes and methods
class Board {
	
  constructor(size, p1, p2){
    //data needed for the board
    this.s = size;
    this.cells = [];
    this.cSize = (width-1)/this.s;
		//data dealing with players
    this.p1 = p1;
    this.p2 = p2;
    this.turn = this.p1.t;
    //data needed to deal with winning
    this.winState = false;
    this.resultText = "";
    this.newGame();
  }
  
  display(){
    let cSize = this.cSize;
    if (this.winState){
      textSize(24);
      textAlign(CENTER);
    	text(this.resultText, width/2, height/2);
      text("Click anywhere for a new game", width/2, height/2+30);
      
    } else {
      this.cells.forEach(function(element){
        rect(element.r*cSize, element.c*cSize, cSize, cSize);
        textSize(64);
        textAlign(CENTER);
        text(element.t, element.r*cSize+cSize/2, element.c*cSize+cSize/1.5);
      });
    }
    
  }
  
  //this will allow users to make changes to the board
  update(i, t){
    let turn = this.turn;
    let element = this.cells[i]
    element.t = t;
    if(turn==="X"){
        element.v = 1;
    } else {
        element.v = -1;
    }
    let result = this.checkResult()
    if (result){
      this.winState = true;
      this.resultText = "The winner is..." + result;
    }
  }
  
  toggleTurn(){
  	if (this.turn == p1.t){
    	this.turn = p2.t;
      score_div.html("Turn:" + p2.t);
    } else {
    	this.turn = p1.t;
      score_div.html("Turn:" + p1.t);
    }
  }
  
  //this will evaluate if someone has won the game
  checkResult(){
		let winner;
    let p1 = this.p1;
    let p2 = this.p2;
    let rowSums = new Array(this.s);
    let colSums = new Array(this.s);
    let diagSums = new Array(this.s);
    let numOpen = 9;
    let s = this.s
    for (let i=0; i<this.s; i++){
      rowSums[i]= 0;
      colSums[i] = 0;
      diagSums[i] = 0;
    }
    this.cells.forEach(function(element) {
      rowSums[element.r] += element.v;
      colSums[element.c] += element.v;
      numOpen -= abs(element.v);
      if(abs(element.r-element.c) === 0){
      	diagSums[0] += element.v;
      }
      if(abs(element.r-element.c) === 2 || (element.r == 1  && element.c == 1)){
      	diagSums[1] += element.v;
      }
    });
    rowSums.forEach(function(element) {
    	if(element === s){
      	winner = p1.t;
        p1.win();
      }
      if (element === -1*s){
      	winner = p2.t;
        p2.win();
      }
    });
    colSums.forEach(function(element) {
    	if(element === s){
      	winner = p1.t;
        p1.win();
      }
      if (element === -1*s){
      	winner = p2.t;
        p2.win();
      }
    });
    diagSums.forEach(function(element) {
    	if(element === s){
      	winner = p1.t;
        p1.win();
      }
      if (element === -1*s){
      	winner = p2.t;
        p2.win();
      }
    });
    if (numOpen === 0 ){
      winner = "No one, it's a tie";
    }
    return winner;
  }
  
  newGame(){
    this.winState = false;
    this.turn = this.p1.t;
  	score_div.html("Turn:" + this.p1.t);
    this.cells = [];
    for (let i=0; i<this.s; i++){
      for (let j=0; j<this.s; j++){
        this.cells.push({
          "r": i,
          "c": j,
          "t": "",
          "v": 0
      	});
    	}
    }
  }
}


//this class defines a Player's attributes and methods 
class Player {
	
  constructor(p){
    this.t = p;
    this.score = 0;
    //this.displayScore = createDiv(this.t + " Score: " + this.score);
  }
  
  select(b){
		// console.log(b.turn);
    if(b.turn === this.t){
      var cell_index = 0
      while(true) {
        cell_index = Math.floor(Math.random() * (b.cells.length))      
        console.log(cell_index)
        if (b.cells[cell_index].v === 0) {
          break;
        }
      }
      b.update(cell_index, this.t);
    }
  }
  
  win(){
  	this.score ++;
    //this.displayScore.html(this.t + " Score:" + this.score); 
  }
}

// serialEvent method is run automatically whenever data is received
function serialEvent() {
  // read the serial buffer up to the linefeed:
  let myString = serial.readLine(); // store the data in a variable
  trim(myString);                   // get rid of whitespace
  
  if (!myString) return;            // if there's nothing in there, exit the function

  // split the string at the separator (commas), convert the segments into integers,
  // then organize into an aray:
  let sensors = split(myString, ",");
  
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
    if (sensors[0] - sensor_old_0 > "200") {
      b.turn = "X";
      p1.select(b);
    }
    sensor_old_0 = sensors[0];
    
    
    if (sensors[1] - sensor_old_1 > "200") {
      b.turn = "O";
      p2.select(b);
    }
    sensor_old_1 = sensors[1];
    
    //ballColor = sensors[2];          // map if necessary
  }
  // **************************************************************************
  
  // send a byte to ask for more data ("call and response"):
  serial.write("A");
}

function printList(portList) {
  print("List of Serial Ports:");
  // theList is an array of their names
  for (let i = 0; i < portList.length; i++) {
    // Display in the console
    print("[" + i + "] " + portList[i]);
  }
}

function serverConnected() {
  console.log("Connected to server.");
}

function portOpen() {
  console.log("Serial port opened.");
  serial.clear(); // clears the buffer of any outstanding data
  serial.write("A"); // / respond back to Arduino that we are ready for new data
}

function serialError(err) {
  console.log("Serial port error: " + err);
}

function portClose() {
  console.log("Serial port closed.");
}

