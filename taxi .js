let state = 1
let ang = 0
let angSpeed = 0.01*Math.PI
let speed = 0
let playerX = 100
let playerY = 100
let dir = [Math.cos(ang), Math.sin(ang)]
let maxSpeed = 1.5
let accel = 0
let maxAccel = 1
let dAcc = 0.01
let friction = 0.03

let obstructions = []
let npcCars = []

let img;
function preload() {
  map1 = loadImage('Game_map.png');
  img = loadImage('loadImage_0.png'); 
  
  
}

function handleMovementInput(){
  if (keyIsDown(87)){
    accel += dAcc
    speedCheck(true)
  }
  if (keyIsDown(65)){
    ang -= angSpeed
    speedCheck(false)
  }
  if (keyIsDown(83)){
    accel -= dAcc
    speedCheck(true)
  }
  if (keyIsDown(68)){
    ang += angSpeed
    speedCheck(false)
  }
}

function handleMovement(){
  dir = [Math.cos(ang), Math.sin(ang)]

  let dx = dir[0]*speed
  let dy = dir[1]*speed
  playerX += dx
  playerY += dy
}

function speedCheck(wOrS){

  speed += accel

  if (speed > maxSpeed){
    speed = maxSpeed
  }
  else if (speed < -maxSpeed){
    speed = -maxSpeed
  }

  if (accel > maxAccel){
    accel = maxAccel
  }
  else if (accel < -maxAccel){
    accel = -maxAccel
  }

  if (!wOrS){
    accel = 0
    if (speed >= friction){
      speed -= friction
    }
    else if(speed <= -friction){
      speed += friction
    }
  }

}

function gameDraw(){
  background(220)
  image(map1, -480, -270)
  handleMovement()
  drawPlayer()

  
  if (keyIsPressed == true){
    handleMovementInput()
  }
  else{
    speedCheck(false)
  }
}

function setup() {
  createCanvas(960, 540);
  
}

function draw() {
    push();
  if (state == 1){
    gameDraw()
  }
}

  // for da car
function setup() {
  createCanvas(960, 540, WEBGL)
  background(220)
  texture(img);
}

// also for da car
function drawPlayer() {
    push(); 
    translate(playerX, playerY);
    rotate(ang);
    texture(img); 
    strokeWeight(0)
    rect(-25, -25, 50, 50);
    pop(); 

}

  
  
