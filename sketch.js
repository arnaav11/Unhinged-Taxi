let state = 1
let ang = 0;
let speed = 0;
let playerX = 100;
let playerY = 100;
let dir = [Math.cos(ang), Math.sin(ang)];
let maxSpeed = 3
let accel = 0
let maxAccel = 1
let dAcc = 0.05
let friction = 0.03

let obstructions = []
let npcCars = []

function handleMovementInput(){
  if (keyIsDown(87)){
    accel += 0.01;
    speedCheck(true)
  }
  if (keyIsDown(65)){
    ang -= 0.01*Math.PI;
    speedCheck(false)
  }
  if (keyIsDown(83)){
    accel -= 0.01;
    speedCheck(true)
  }
  if (keyIsDown(68)){
    ang += 0.01*Math.PI;
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
  background(220);
  handleMovement()
  drawPlayer()
  
  if (keyIsPressed == true){
    handleMovementInput()
  }
  else{
    speedCheck(false)
  }
}

function drawPlayer(){
  translate(playerX, playerY);
  rotate(ang);
  rect(0, 0, 50, 50);
}

function setup() {
  createCanvas(1000, 1000);
  angleMode(RADIANS)
  background(220);
  rectMode(CENTER);
}

function draw() {
  clear()

  if (state == 1){
    gameDraw()
  }

}
