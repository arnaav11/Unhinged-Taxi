let backgroundImage;
let startButton;
let optionsButton;
let exitButton;

function preload() {
    backgroundImage = createImg('assets/background.png');
    startButton = createImg('assets/start_game.png');
    optionsButton = createImg('assets/options.png');
    exitButton = createImg('assets/exit.png');
}

function setup() {
    createCanvas(400, 400);
    
    backgroundImage.position(0, 0);
    backgroundImage.size(400, 400);

    startButton.position(50, 200);
    startButton.size(120, 50);
    startButton.mousePressed(startGame); 

    optionsButton.position(50, 250);
    optionsButton.size(75, 50);
    optionsButton.mousePressed(showOptions); 

    exitButton.position(50, 300);
    exitButton.size(75, 50);
    exitButton.mousePressed(exitGame); 
}

function draw() {
    background(220);
}

function startGame() {
    console.log('Start Game button clicked');
    
}

function showOptions() {
    console.log('Options button clicked');
   
}

function exitGame() {
    console.log('Exit button clicked');
    
}
