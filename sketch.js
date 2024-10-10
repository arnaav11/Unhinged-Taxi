let ang = 0;
let speed = 0;
let x = 100;
let y = 100;
let dir = [Math.cos(ang), Math.sin(ang)];

function handleMovementInput(){
  if (keyIsDown(87)){
    speed += 0.1;
  }
  if (keyIsDown(65)){
    ang -= 0.01*Math.PI;
    if (speed >= 0.01){
      speed -= 0.01;
    }
    else if(speed <= -0.01){
      speed += 0.01
    }
  }
  if (keyIsDown(83)){
    speed -= 0.1;
  }
  if (keyIsDown(68)){
    ang += 0.01*Math.PI;
    if (speed >= 0.01){
      speed -= 0.01;
    }
    else if(speed <= -0.01){
      speed += 0.01
    }
  }
}

function handleMovement(){
  dir = [Math.cos(ang), Math.sin(ang)]

  let dx = dir[0]*speed
  let dy = dir[1]*speed
  x += dx
  y += dy
}

function setup() {
  createCanvas(1000, 1000);
  angleMode(RADIANS)
  background(220);
  rectMode(CENTER);
}

function draw() {
  background(220);
  handleMovement()

  // Drawing the character with rotation applied
  translate(x, y);
  rotate(ang);
  rect(0, 0, 50, 50);
  

  if (keyIsPressed == true){
    if (speed < 2 && speed > -2){
      handleMovementInput()
    }
  }
  else{
    if (speed >= 0.01){
      speed -= 0.01;
    }
    else if(speed <= -0.01){
      speed += 0.01
    }
  }


}
