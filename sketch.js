let x = 100;
let y = 100;
let speed = 3;


function setup() {
  createCanvas(1000, 1000);
  background(220);
}

function draw() {
  background(220);
  circle(x, y, 50);

  if (keyIsPressed == true){
    if (keyIsDown(87)){
      y -= 10;
    }
    if (keyIsDown(65)){
      x -= 10;
    }
    if (keyIsDown(83)){
      y += 10;
    }
    if (keyIsDown(68)){
      x += 10;
    }
  }
}
