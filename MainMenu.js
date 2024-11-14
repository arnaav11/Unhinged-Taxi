let backgroundImage;
let startButton;
let optionsButton;
let exitButton;
let backButton;
let nameButton;
let optionScreen;
let onButton;
let offButton;
let gameIframe;

// Preload assets
function preload() {
    backgroundImage = createImg('assets/background.png');
    startButton = createImg('assets/start_game.png');
    optionsButton = createImg('assets/options.png');
    exitButton = createImg('assets/exit.png');
    backButton = createImg('assets/back png.png');
    nameButton = createImg('assets/Game_Name.png');
    optionScreen = createImg('assets/pngegg.png');
    onButton = createImg('assets/on.png');
    offButton = createImg('assets/OFF.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    // Set up background
    backgroundImage.position(0, 0);
    backgroundImage.size(windowWidth, windowHeight);
    const centerX = windowWidth / 3;
   // const center = windowWidth / 20 - 150;

    // Position title and main menu buttons
    nameButton.position(centerX, 75);
    startButton.position(100, 300).size(180, 80).mousePressed(startGame);
    optionsButton.position(100, 400).size(180, 80).mousePressed(showOptions);
    exitButton.position(100, 500).size(180, 80).mousePressed(exitGame);
    onButton.position(600, 200).size(100, 70).mousePressed().hide();
    offButton.position(700, 200).size(100, 70).mousePressed().hide();

    // Hide option screen and back button initially
    optionScreen.position(CENTER, CENTER).size(180, 80).hide();
    backButton.size(180, 80).hide();
}

function draw() {
    background(220);
}

// Function to handle back button display with custom action
function showBackButton(returnFunction) {
    backButton.position(windowWidth / 2 - 90, windowHeight - 80);
    backButton.mousePressed(returnFunction);
    backButton.show();
}

// Function to start the game and display Unity game iframe
function startGame() {
    // Hide main menu buttons
    nameButton.hide();
    startButton.hide();
    optionsButton.hide();
    exitButton.hide();

    // Show back button to return to main menu
    showBackButton(returnToMenu);

    // Create and display the iframe for Unity game
    gameIframe = createElement('iframe');
    gameIframe.position(0, 0);
    gameIframe.size(windowWidth, windowHeight - 80); // Adjust height to leave space for back button
    gameIframe.attribute('src', 'unity_game_Levi/index.html');
    gameIframe.attribute('frameborder', '0');
}

function showOptions() {
    // Hide main menu buttons
    nameButton.hide();
    startButton.hide();
    exitButton.hide();
    
    // Show option screen and back button
    optionScreen.show();
    onButton.show();
    offButton.show();
    showBackButton(hideOptions);
}

// Options menu styling
function OptionsMenu() {
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Options Menu", width / 2, 120);

    textSize(24);
    text("Sound FX: ON/OFF", width / 2, 200);
    text("Display Timer: ON/OFF", width / 2, 260);
}

// Hide the options menu and return to the main menu
function hideOptions() {
    optionScreen.hide();
    backButton.hide();
    onButton.hide();
    offButton.hide();
    // Show main menu buttons again
    startButton.show();
    nameButton.show();
    optionsButton.position(100, 400);
    exitButton.show();
}

// Return to the main menu from the game screen
function returnToMenu() {
    if (gameIframe) {
        gameIframe.remove(); // Remove the game iframe
    }
    backButton.hide();

    // Show main menu buttons again
    startButton.show();
    nameButton.show();
    optionsButton.show();
    exitButton.show();
}

// Exit the game with confirmation
function exitGame() {
    if (confirm("Are you sure you want to exit the game?")) {
        window.close();
    }
}
