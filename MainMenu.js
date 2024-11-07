let backgroundImage;
let startButton;
let optionsButton;
let exitButton;
let backButton;
let nameButton;

function preload() {
    backgroundImage = createImg('assets/background.png');
    startButton = createImg('assets/start_game.png');
    optionsButton = createImg('assets/options.png');
    exitButton = createImg('assets/exit.png');
    backButton = createImg('assets/back png.png');
    nameButton = createImg('assets/Game_Name.png');
}

function setup() {
    createCanvas(windowWidth, windowWidth);
    
    backgroundImage.position(0, 0);
    backgroundImage.size(windowWidth, windowWidth);

    startButton.position(100, 300);
    startButton.size(180, 80);
    startButton.mousePressed(startGame); 

    optionsButton.position(100, 400);
    optionsButton.size(180, 80);
    optionsButton.mousePressed(showOptions); 

    exitButton.position(100, 500);
    exitButton.size(180, 80);
    exitButton.mousePressed(exitGame); 

    nameButton.position(520, 75);
    nameButton.size(400, 180);
}

function draw() {
    background(220);
}

function startGame() {
    console.log('Start Game button clicked');
    
}

function showOptions() {
    // Hide the main menu buttons
    nameButton.hide();
    startButton.hide();
    exitButton.hide();
    optionsButton.position(600, 80);
    // Show the back button
    backButton.position(1200, 650);
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
    nameButton.show();
    optionsButton.position(100, 400);
    nameButton.position(520, 75);
    exitButton.show();

    // Clear any additional text or options-specific UI elements if they were added directly
    background(backgroundImage); // This will clear the canvas and redraw the background
}


function exitGame() {
    console.log('Exit button clicked');
    
}
