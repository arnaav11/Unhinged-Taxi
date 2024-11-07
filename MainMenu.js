let backgroundImage;
let startButton;
let optionsButton;
let exitButton;
let backButton;
let nameButton;
let nicknameInput;



function preload() {
    backgroundImage = createImg('assets/background.png');
    startButton = createImg('assets/start_game.png');
    optionsButton = createImg('assets/options.png');
    exitButton = createImg('assets/exit.png');
    backButton = createImg('assets/back png.png');
    nameButton = createImg('assets/Game_Name.png');
    optionScreen= createImg('assets/pngegg.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    backgroundImage.position(0, 0);
    backgroundImage.size(windowWidth, windowHeight);

    startButton.position(100, 300);
    startButton.size(180, 80);
    startButton.mousePressed(startGame); 

    optionsButton.position(100, 400);
    optionsButton.size(180, 80);
    optionsButton.mousePressed(showOptions); 

    exitButton.position(100, 500);
    exitButton.size(180, 80);
    exitButton.mousePressed(exitGame); 

    nameButton.position(450, 75);
    
    optionScreen.position(-120,-50);
    optionScreen.size(1600,800);
    optionScreen.hide();
}

function draw() {
    background(220);
    if(showOptions){
        OptionsMenu();
    }
    }

function startGame() {
      // Hide all main menu buttons
    nameButton.hide();
    startButton.hide();
    optionsButton.hide();
    exitButton.hide();

    // Show back button to return to main menu
    backButton.position(1200, 600);
    backButton.size(180, 80);
    backButton.mousePressed(hideNicknameInput); // Set action for back button
    backButton.show();

    // Create input field for nickname
    nicknameInput = createInput();
    nicknameInput.position(windowWidth / 2 - 100, windowHeight / 2 - 40);
    nicknameInput.size(200);

    // Change startButton to "Submit" for submitting nickname
    startButton.html('Submit');
    startButton.position(windowWidth / 2 - 45, windowHeight / 2 + 20);
    startButton.size(100, 40);
    startButton.show();
    startButton.mousePressed(submitNickname); // Set action for submitting nickname
}

function showOptions() {
    
    // Hide the main menu buttons
    nameButton.hide();
    startButton.hide();
    exitButton.hide();
    optionsButton.position(600, 80);
    optionScreen.show();
    // Show the back button
    backButton.position(1200, 600);
    backButton.size(180, 80);
    backButton.mousePressed(hideOptions);
    backButton.show();

    /*fill(255); 
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Options Menu", width / 2, 120);

    textSize(24);
    text("Sound FX: ON/OFF", width / 2, 200);
    text("Display Timer: ON/OFF", width / 2, 260);*/
}

function OptionsMenu() {
    fill(255); 
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Options Menu", width / 2, 120);

    textSize(24);
    text("Sound FX: ON/OFF", width / 2, 200);
    text("Display Timer: ON/OFF", width / 2, 260);
}

function submitNickname() {
    // Get nickname from input field
    let nickname = nicknameInput.value();
    console.log("Nickname:", nickname);

    // Hide input field and submit button after submission
    nicknameInput.hide();
    startButton.hide();

    // Additional game initialization logic can be added here
}


function hideNicknameInput() {
    // Hide nickname input field and submit button
    if (nicknameInput) {
        nicknameInput.hide();
    }
    startButton.html('Start Game'); // Reset startButton text to "Start Game"
    startButton.position(100, 300); // Set position back to main menu location
    startButton.size(180, 80);
    startButton.mousePressed(startGame); // Reset action to start game
    startButton.show();

    // Show all main menu buttons again
    nameButton.show();
    optionsButton.show();
    exitButton.show();
    backButton.hide(); // Hide back button after returning to main menu
}


function hideOptions() {
    // Hide the options menu elements
    backButton.hide();
    optionScreen.hide();
    // Show the main menu buttons again
    startButton.show();
    nameButton.show();
    optionsButton.position(100, 400);
    nameButton.position(450, 75);
    exitButton.show();

    // Clear any additional text or options-specific UI elements if they were added directly
    background(backgroundImage); // This will clear the canvas and redraw the background
}


function exitGame() {
    if(confirm("Are you sure you want to exit the game?")){
        window.close();
    }
    
}
