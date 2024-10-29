let backgroundImage;
let startButton;
let optionsButton;
let exitButton;
let backButton;

function preload() {
    backgroundImage = createImg('assets/background.png');
    startButton = createImg('assets/start_game.png');
    optionsButton = createImg('assets/options.png');
    exitButton = createImg('assets/exit.png');
    backButton = createImg('assets/back png.png');
}

function setup() {
    createCanvas(1300, 600);
    
    backgroundImage.position(0, 0);
    backgroundImage.size(1450, 750);

    startButton.position(100, 250);
    startButton.size(180, 80);
    startButton.mousePressed(startGame); 

    optionsButton.position(100, 350);
    optionsButton.size(180, 80);
    optionsButton.mousePressed(showOptions); 

    exitButton.position(100, 450);
    exitButton.size(180, 80);
    exitButton.mousePressed(exitGame); 
}

function draw() {
    background(220);
}

function startGame() {
    console.log('Start Game button clicked');
    
}

function showOptions() {
    // Hide the main menu buttons
    startButton.hide();
    exitButton.hide();
    optionsButton.position(600, 80);
    // Show the back button
    backButton.position(1200, 620);
    backButton.size(180, 80);
    backButton.mousePressed(hideOptions);
    backButton.show();

    // Add a semi-transparent overlay
    fill('rgba(0, 0, 0, 0.5)');
    rect(50, 50, 300, 300);  // Adjust size and position as needed

    // Display options text
    fill(255); // White color for text
    textSize(24);
    text("Options Menu", 150, 100); // Display the Options menu title

    textSize(18);
    text("Sound: ON", 150, 150);
    text("Display Timer: ON", 150, 200);
}

function hideOptions() {
    // Hide the options menu elements
    backButton.hide();

    // Show the main menu buttons again
    startButton.show();
    optionsButton.position(100, 350);
    exitButton.show();

    // Clear any additional text or options-specific UI elements if they were added directly
    background(backgroundImage); // This will clear the canvas and redraw the background
}


function exitGame() {
    console.log('Exit button clicked');
    
}
