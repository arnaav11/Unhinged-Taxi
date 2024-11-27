let state = 1;
let ang = 0;
let angSpeed = 0.01 * Math.PI;
let speed = 0;
let playerX = 100;
let playerY = 100;
let dir = [Math.cos(ang), Math.sin(ang)];
let maxSpeed = 2;
let accel = 0;
let maxAccel = 1;
let dAcc = 0.01;
let friction = 0.03;
let isColliding = false;
let collisionCount = 0;
let isHousePicked = false;
let newHouse = null;
let img, map1, maskImg;
var player;
timer = 60;
value = 0;
isTouching = false;
let gameObject = []


let houses = [
  { x: -445, y: -210, w: 50, h: 50 },
  { x: -350, y: -210, w: 50, h: 50 },
  { x: -245, y: -210, w: 50, h: 50 },
  { x: -151, y: -210, w: 50, h: 50 },
  { x: -50, y: -210, w: 80, h: 50 },
  { x: 65, y: -210, w: 60, h: 50 },
  { x: 167, y: -215, w: 50, h: 50 },
  { x: 270, y: -210, w: 60, h: 50 },
  { x: 380, y: -210, w: 60, h: 50 },
  { x: -405, y: -105, w: 50, h: 50 },
  { x: -300, y: -105, w: 50, h: 50 },
  { x: -210, y: -105, w: 50, h: 50 },
  { x: -120, y: -105, w: 70, h: 50 },
  { x: 55, y: -105, w: 50, h: 50 },
  { x: 155, y: -105, w: 50, h: 50 },
  { x: 250, y: -105, w: 50, h: 50 },
  { x: 345, y: -105, w: 55, h: 50 },
  { x: -405, y: 10, w: 60, h: 50 },
  { x: -295, y: 10, w: 60, h: 50 },
  { x: -196, y: 10, w: 50, h: 50 },
  { x: -108, y: 10, w: 60, h: 50 },
  { x: 50, y: 10, w: 65, h: 50 },
  { x: 150, y: 10, w: 60, h: 50 },
  { x: 260, y: 10, w: 60, h: 50 },
  { x: 350, y: 10, w: 50, h: 50 },
  { x: -425, y: 120, w: 60, h: 50 },
  { x: -317, y: 120, w: 60, h: 50 },
  { x: -210, y: 120, w: 60, h: 50 },
  { x: -115, y: 120, w: 60, h: 50 },
  { x: 40, y: 120, w: 60, h: 50 },
  { x: 153, y: 120, w: 50, h: 50 },
  { x: 260, y: 120, w: 60, h: 50 },
  { x: 360, y: 120, w: 60, h: 50 },
];


let mapBorders = [
  { x: -470, y: -265, w: 940, h: 20 },
  { x: -470, y: 310, w: 940, h: 20 },
  { x: 510, y: -235, w: 30, h: 510 },
  { x: -510, y: -235, w: 30, h: 510 },
];

let holderForObject = [
  { x: -445, y: -210},
  { x: -350, y: -210},
  { x: -245, y: -210},
  { x: -151, y: -210},
  { x: -50, y: -210},
  { x: 65, y: -210},
  { x: 167, y: -215},
  { x: 270, y: -210},
  { x: 380, y: -210},
  { x: -405, y: -105},
  { x: -300, y: -105},
  { x: -210, y: -105},
  { x: -120, y: -105},
  { x: 55, y: -105},
  { x: 155, y: -105},
  { x: 250, y: -105},
  { x: 345, y: -105},
  { x: -405, y: 10},
  { x: -295, y: 10},
  { x: -196, y: 10},
  { x: -108, y: 10},
  { x: 50, y: 10},
  { x: 150, y: 10},
  { x: 260, y: 10},
  { x: 350, y: 10},
  { x: -425, y: 120},
  { x: -317, y: 120},
  { x: -210, y: 120},
  { x: -115, y: 120},
  { x: 40, y: 120},
  { x: 153, y: 120},
  { x: 260, y: 120},
  { x: 360, y: 120},
];  
  

  
function preload() {
  map1 = loadImage("Game_map.png");
  img = loadImage("loadImage_0.png");
}

function handleMovementInput() {
  if (keyIsDown(87)) { accel += dAcc; speedCheck(true); } // W
  if (keyIsDown(65)) { ang -= angSpeed; speedCheck(false); } // A
  if (keyIsDown(83)) { accel -= dAcc; speedCheck(true); } // S
  if (keyIsDown(68)) { ang += angSpeed; speedCheck(false); } // D
}

function handleMovement() {
  dir = [Math.cos(ang), Math.sin(ang)];
  let dx = dir[0] * speed;
  let dy = dir[1] * speed;

  if (!checkCollisionCar(playerX + dx, playerY, 50, 50, ang) && !checkCollisionMapBorders(playerX + dx, playerY))
    playerX += dx;

  if (!checkCollisionCar(playerX, playerY + dy, 50, 50, ang) && !checkCollisionMapBorders(playerX, playerY + dy))
    playerY += dy;
}

function checkCollisionMapBorders(playerX, playerY) {
  for (let border of mapBorders) {
    if (playerX < border.x + border.w && playerX + 50 > border.x &&
        playerY < border.y + border.h && playerY + 50 > border.y) {
      if (!isColliding) {
        collisionCount++;
        //console.log(collisionCount);
        isColliding = true; 
      }
       if (speed > 0) {
        speed = -1.8;
        accel = 0;
      }
      else {
        speed = 1.8;
        accel = 0;
      }
      return true;
    }
  }
  isColliding = false;
  return false;
}

function speedCheck(wOrS) {
  speed += accel;
  if (speed > maxSpeed) speed = maxSpeed;
  if (speed < -maxSpeed) speed = -maxSpeed;
  if (accel > maxAccel) accel = maxAccel;
  if (accel < -maxAccel) accel = -maxAccel;

  if (!wOrS) {
    accel = 0;
    if (speed >= friction) speed -= friction;
    else if (speed <= -friction) speed += friction;
  }
}

function checkCollisionCar(playerX, playerY, playerWidth, playerHeight, ang) {
  let playerBounds = getRotatedBoundingBox(playerX, playerY, playerWidth, playerHeight, ang);

  for (let house of houses) {
    if (playerBounds.x < house.x + house.w && playerBounds.x + playerBounds.width > house.x &&
        playerBounds.y < house.y + house.h && playerBounds.y + playerBounds.height > house.y) {
      if (!isColliding) {
        collisionCount++; 
        //console.log(collisionCount); 
        isColliding = true; 
      }
      if (speed > 0) {
        speed = -1.8;
        accel = 0;
      }
      else {
        speed = 1.8;
        accel = 0;
      }
      return true;
    }
  }
  isColliding = false;
  return false;
}

function getRotatedBoundingBox(x, y, width, height, angle) {
  const corners = [
    { x: -width / 10, y: -height / 10 },
    { x: width / 10, y: -height / 10 },
    { x: width / 10, y: height / 10 },
    { x: -width / 10, y: height / 10 },
  ];

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

  for (let corner of corners) {
    const rotatedX = x + corner.x * Math.cos(angle) - corner.y * Math.sin(angle);
    const rotatedY = y + corner.x * Math.sin(angle) + corner.y * Math.cos(angle);

    minX = Math.min(minX, rotatedX);
    maxX = Math.max(maxX, rotatedX);
    minY = Math.min(minY, rotatedY);
    maxY = Math.max(maxY, rotatedY);
  }

  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

function drawPlayer() {
  push();
  translate(playerX, playerY);
  rotate(ang);
  imageMode(CENTER);
  image(img, 0, 0, 50, 50);
  pop();
}

function gameDraw() {
  background(220);
  image(map1, -480, -270); // Map
  handleMovement();
  drawPlayer();
  barrier();
  playerCollider = new circleCollider(playerX,playerY);
  
  for (i=0; i < holderForObject.length; ++i) {
    gameObject[i] = new circleCollider(holderForObject[i])
  }

  for (i=0; i < gameObject.length; ++i) {
        if (playerCollider.intersects(gameObject[i])) {
            isTouching = true;
            console.log("Press E to pick up client", playerX+60, playerY-50);
            if(value == 1) {
                text(timer, 400, 50);
                if (frameCount % 60 == 0 && timer > 0) {
                    timer--;
                }
            }
        }
    }

  for (let house of houses) {
    drawHouse(house);
  }

  if (newHouse) {
    drawHouse(newHouse);
  }

  if (keyIsPressed) {
    handleMovementInput();
  } else {
    speedCheck(false);
  }
  

}

function barrier() {
  for (let house of houses) {
    push();
    translate(house.x, house.y);
    strokeWeight(0);
    noFill();
    rect(0, 0, house.w, house.h);
    pop();
  }
  for (let border of mapBorders) {
    push();
    translate(border.x, border.y);
    strokeWeight(0);
    noFill();
    rect(0, 0, border.w, border.h);
    pop();
  }
}

function setup() {
  createCanvas(960, 540, WEBGL);
  maskImg = createGraphics(50, 50);
  maskImg.beginShape();
  maskImg.ellipse(25, 25, 50, 50);
  maskImg.endShape();
  img.mask(maskImg);
  pickHouse();
}

function draw() {
  push();
  if (state == 1) gameDraw();
  pop();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickHouse() {
  let randomIndex = getRandomInt(0, houses.length - 1);
  let pickedHouse = houses[randomIndex];

  newHouse = {
    x: pickedHouse.x,
    y: pickedHouse.y,
    w: pickedHouse.w,
    h: pickedHouse.h,
    filled: true,
  };

  //console.log('Picked a new house:', newHouse);
  drawHouse(newHouse);
}

function drawHouse(house) {
  if (!house) return;

  push();
  if (house.filled) fill(255, 0, 0);
  else noFill();
  strokeWeight(0)
  rect(house.x, house.y, house.w, house.h);
  pop();
}

function pickUp() {
  if (keyCode == 32 && newHouse !== null) {
    newHouse.filled = !newHouse.filled;
    //console.log('House fill toggled:', newHouse.filled);
    drawHouse(newHouse);
  }
}

function keyPressed() {
  if (keyCode === 69 && !isHousePicked) {
    pickHouse();
  } else if (keyCode === 69 && isHousePicked) {
    pickUp();
  }
  if (isTouching) {
        if (key === 69) {
            value = 1;
          }
    }

}
