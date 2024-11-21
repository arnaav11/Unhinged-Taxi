let state = 1
let ang = 0
let angSpeed = 0.01*Math.PI
let speed = 0
let playerX = 100
let playerY = 100
let dir = [Math.cos(ang), Math.sin(ang)]
let maxSpeed = 3
let accel = 0
let maxAccel = 0.5
let dAcc = 0.001
let friction = 0.03
let map

let obstructions = []
let npcCars = []

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
  translate(playerX, playerY)
  rotate(ang)
  strokeWeight(0)
  texture(img)
  rect(0, 0, 50, 50)
}

function preload(){
  img = loadImage("./assets/loadImage_0.png")
  map = loadImage("./assets/Game_map.png")
}

function setup() {
  createCanvas(1000, 1000, WEBGL)
  angleMode(RADIANS)
  rectMode(CENTER)
}

function draw() {
  clear()
  background(220)

  if (state == 1){
    gameDraw()
  }

}
