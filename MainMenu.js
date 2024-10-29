let backgroundImage;
let startButton;
let optionsButton;
let exitButton;
let backButton;
let soundToggle;
let displayTimerToggle;

function preload() {
    backgroundImage = loadImage('assets/background.png');
    startButton = loadImage('assets/start_game.png');
    optionsButton = loadImage('assets/options.png');
    exitButton = loadImage('assets/exit.png');
    backButton = loadImage('assets/back_png.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    backgroundImage.resize(windowWidth, windowHeight);

    // Position your buttons and assign functions
    startButton.position(50, 200);
    startButton.mousePressed(startGame);

    optionsButton.position(50, 250);
    optionsButton.mousePressed(showOptions);

    exitButton.position(50, 300);
    exitButton.mousePressed(exitGame);

    backButton.position(50, 350);  // Adjust position as needed
    backButton.mousePressed(goBack);
}

function draw() {
    background(backgroundImage);
}

function startGame() {
    console.log('Start Game button clicked');
}

function showOptions() {
    clear();  // Clear the canvas
    background(backgroundImage);
    
    // Display Options text and buttons
    text("Sound fx:", 100, 100);
    soundToggle = createButton('Toggle Sound');
    soundToggle.position(100, 120);
    soundToggle.mousePressed(toggleSound);

    text("Display Timer:", 100, 150);
    displayTimerToggle = createButton('Toggle Timer');
    displayTimerToggle.position(100, 170);
    displayTimerToggle.mousePressed(toggleTimer);

    // Display back button
    backButton.show();
}

function exitGame() {
    console.log('Exit button clicked');
}

function toggleSound() {
    console.log('Toggle sound');
}

function toggleTimer() {
    console.log('Toggle timer');
}

function goBack() {
    // Code to return to main menu
    console.log('Back to main menu');
}
