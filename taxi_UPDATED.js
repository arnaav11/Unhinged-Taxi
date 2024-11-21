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

let img; //this is the car
let map1; // Background image
let maskImg; // it masks or smth idk

// Updated house array to contain position and size
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
  // END OF ROW 1 1-9 HOUSES
  { x: -405, y: -105, w: 50, h: 50 },
  { x: -300, y: -105, w: 50, h: 50 },
  { x: -210, y: -105, w: 50, h: 50 },
  { x: -120, y: -105, w: 70, h: 50 },
  { x: 55, y: -105, w: 50, h: 50 },
  { x: 155, y: -105, w: 50, h: 50 },
  { x: 250, y: -105, w: 50, h: 50 },
  { x: 345, y: -105, w: 55, h: 50 },
  // END OF ROW 2 10-18 HOUSES
  { x: -405, y: 10, w: 60, h: 50 },
  { x: -295, y: 10, w: 60, h: 50 },
  { x: -196, y: 10, w: 50, h: 50 },
  { x: -108, y: 10, w: 60, h: 50 },
  { x: 50, y: 10, w: 65, h: 50 },
  { x: 150, y: 10, w: 60, h: 50 },
  { x: 260, y: 10, w: 60, h: 50 },
  { x: 350, y: 10, w: 50, h: 50 },
  // END OF ROW 3 19-25 HOUSES
  { x: -425, y: 120, w: 60, h: 50 },
  { x: -317, y: 120, w: 60, h: 50 },
  { x: -210, y: 120, w: 60, h: 50 },
  { x: -115, y: 120, w: 60, h: 50 },
  { x: 40, y: 120, w: 60, h: 50 },
  { x: 153, y: 120, w: 50, h: 50 },
  { x: 260, y: 120, w: 60, h: 50 },
  { x: 360, y: 120, w: 60, h: 50 },
  // FINAL ROW OF HOUSES 26-33
];

let mapBorders = [
  { x: -470, y: -265, w: 940, h: 20 }, // Top border
  { x: -470, y: 310, w: 940, h: 20 }, // Bottom border
  { x: 510, y: -235, w: 30, h: 510 }, // Right border
  { x: -510, y: -235, w: 30, h: 510 }, // Left border
];

function preload() {
  map1 = loadImage("Game_map.png"); // Load the background map
  img = loadImage("loadImage_0.png"); // Load the car
}

function handleMovementInput() {
  if (keyIsDown(87)) {
    // W
    accel += dAcc;
    speedCheck(true);
  }
  if (keyIsDown(65)) {
    // A
    ang -= angSpeed;
    speedCheck(false);
  }
  if (keyIsDown(83)) {
    // S
    accel -= dAcc;
    speedCheck(true);
  }
  if (keyIsDown(68)) {
    // D
    ang += angSpeed;
    speedCheck(false);
  }
}

function handleMovement() {
  dir = [Math.cos(ang), Math.sin(ang)];

  let dx = dir[0] * speed;
  let dy = dir[1] * speed;

  if (
    !checkCollisionWithRotatedImage(playerX + dx, playerY, 50, 50, ang) &&
    !checkCollisionWithMapBorders(playerX + dx, playerY)
  ) {
    playerX += dx;
  }

  if (
    !checkCollisionWithRotatedImage(playerX, playerY + dy, 50, 50, ang) &&
    !checkCollisionWithMapBorders(playerX, playerY + dy)
  ) {
    playerY += dy;
  }
}

function checkCollisionWithMapBorders(playerX, playerY) {
  for (let i = 0; i < mapBorders.length; i++) {
    let border = mapBorders[i];

    // Check if the player's bounding box intersects with the map border
    if (
      playerX < border.x + border.w &&
      playerX + 50 > border.x &&
      playerY < border.y + border.h &&
      playerY + 50 > border.y
    ) {
      return true; // Collision detected on da border
    }
  }
  return false; // No collision with map border
}

function speedCheck(wOrS) {
  speed += accel;

  if (speed > maxSpeed) {
    speed = maxSpeed;
  } else if (speed < -maxSpeed) {
    speed = -maxSpeed;
  }

  if (accel > maxAccel) {
    accel = maxAccel;
  } else if (accel < -maxAccel) {
    accel = -maxAccel;
  }

  if (!wOrS) {
    accel = 0;
    if (speed >= friction) {
      speed -= friction;
    } else if (speed <= -friction) {
      speed += friction;
    }
  }
}

function checkCollisionWithRotatedImage(
  playerX,
  playerY,
  playerWidth,
  playerHeight,
  ang,
) {
  let playerBounds = getRotatedBoundingBox(
    playerX,
    playerY,
    playerWidth,
    playerHeight,
    ang,
  );

  for (let i = 0; i < houses.length; i++) {
    let house = houses[i];
    // Check if the player intersects with the house rectangle
    if (
      playerBounds.x < house.x + house.w &&
      playerBounds.x + playerBounds.width > house.x &&
      playerBounds.y < house.y + house.h &&
      playerBounds.y + playerBounds.height > house.y
    ) {
      // console.log("Collision was found :)", i);
      return true; // Collision detected
    }
  }

  return false; // No collision
}

function getRotatedBoundingBox(x, y, width, height, angle) {
  // Define the corners of the unrotated image centered at (x, y)
  const corners = [
    { x: -width / 10, y: -height / 10 }, // Top-left corner
    { x: width / 10, y: -height / 10 }, // Top-right corner
    { x: width / 10, y: height / 10 }, // Bottom-right corner
    { x: -width / 10, y: height / 10 }, // Bottom-left corner
  ];

  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;

  for (let i = 0; i < corners.length; i++) {
    const corner = corners[i];

    const rotatedX =
      x + corner.x * Math.cos(angle) - corner.y * Math.sin(angle);
    const rotatedY =
      y + corner.x * Math.sin(angle) + corner.y * Math.cos(angle);
    minX = Math.min(minX, rotatedX);
    maxX = Math.max(maxX, rotatedX);
    minY = Math.min(minY, rotatedY);
    maxY = Math.max(maxY, rotatedY);
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
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
  image(map1, -480, -270);
  handleMovement();
  drawPlayer();
  barrier();

  if (keyIsPressed) {
    handleMovementInput();
  } else {
    speedCheck(false);
  }
}

function barrier() {
  // Draw the barriers (houses and mapBorders)
  for (let i = 0; i < houses.length; i++) {
    let house = houses[i];
    push();
    translate(house.x, house.y, 0);
    strokeWeight(0);
    noFill();
    rect(0, 0, house.w, house.h);
    pop();
  }
  for (let i = 0; i < mapBorders.length; i++) {
    let house = mapBorders[i];

    push();
    translate(house.x, house.y, 0);
    strokeWeight(0);
    noFill();
    rect(0, 0, house.w, house.h);
    pop();
  }
}

function setup() {
  createCanvas(960, 540, WEBGL);
  maskImg = createGraphics(50, 50);

  maskImg.beginShape();
  maskImg.ellipse(25, 25, 50, 50);
  maskImg.endShape();

  img.mask(maskImg); // Apply mask to car
}

function draw() {
  push();
  if (state == 1) {
    gameDraw();
  }
  pop();
}
