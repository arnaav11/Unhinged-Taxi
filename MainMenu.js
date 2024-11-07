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
    
    optionScreen.position(300,80);
    optionScreen.size(800,650);
    optionScreen.hide();
}

function draw() {
    background(220);
    if(showOptions){
        OptionsMenu();
    }
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
    optionScreen.show();
    // Show the back button
    backButton.position(1200, 650);
    backButton.size(180, 80);
    backButton.mousePressed(hideOptions);
    backButton.show();

    /*fill(255); // 白色文字
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

function hideOptions() {
    optionsVisible = false;
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
    if(confirm("Are you sure to exit the game?")){
        window.close();
    }
    
}
