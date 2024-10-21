let backgroundImg;
let startButton;
let optionsButton;
let exitButton;

function preload() {
    backgroundImg = createImg('pixel_city_4k_3.png');
    startButton = createImg('start_game.png');
    optionsButton = createImg('options.png');
    exitButton = createImg('exit.png');
}

function setup() {
    createCanvas(400, 400);
}

function draw() {
  background(220);
  backgroundImg.position(0, 0)
  backgroundImg.size(400, 400)
  
  startButton.position(50, 200)
  startButton.size(100, 50)
  
  optionsButton.position(50, 250)
  optionsButton.size(100, 50)
  
  exitButton.position(50, 300)
  exitButton.size(100, 50)
  image(img, 5, 5);
  noLoop();
}