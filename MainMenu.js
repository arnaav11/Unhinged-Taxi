let backgroundImage;
let startButton;
let optionsButton;
let exitButton;

function preload() {
    backgroundImage = createImg('assets/background.png')
    startButton = createImg('assets/start_game.png')
    optionsButton = createImg('assets/options.png')
    exitButton = createImg('assets/exit.png')
}

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(220);
    backgroundImage.position(0, 0)
    backgroundImage.size(400, 400)

    startButton.position(50, 200)
    startButton.size(120, 50)

    optionsButton.position(50, 250)
    optionsButton.size(75, 50)

    exitButton.position(50, 300)
    exitButton.size(75, 50)

    
}