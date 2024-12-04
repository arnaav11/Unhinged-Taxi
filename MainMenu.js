let nameField
let xx

class MainMenu {
    // Declare member variables for the class
    backgroundImage;
    startButton;
    optionsButton;
    exitButton;

    // Constructor: Initializes images and input field, sets the game state to 0 (menu state)
    constructor() {
        this.backgroundImage = createImg('./assets/background.png'); // Background image for the menu
        this.startButton = createImg('./assets/start_game.png'); // Start game button
        this.optionsButton = createImg('./assets/options.png'); // Options button
        this.exitButton = createImg('./assets/exit.png'); // Exit button
        nameField = createInput("") // Input field for player's name
        state = 0 // Set initial state to 0 (main menu)
    }

    // Reload images and reset the game state
    reloadImages() {
        this.backgroundImage = createImg('./assets/background.png'); // Reload background image
        this.startButton = createImg('./assets/start_game.png'); // Reload start button image
        this.optionsButton = createImg('./assets/options.png'); // Reload options button image
        this.exitButton = createImg('./assets/exit.png'); // Reload exit button image
        nameField = createInput("") // Reset input field for the name
        state = 0 // Reset the game state to 0 (main menu)
    }

    // Set up the menu UI elements (images and input field positioning)
    setupMenu() {
        canvas = createCanvas(windowWidth, windowHeight); // Create a canvas that fits the window size

        // Set background image size and position
        this.backgroundImage.position(0, 0);
        this.backgroundImage.size(windowWidth, windowHeight);

        // Set up name input field
        nameField.attribute('placeholder', 'Enter Name'); // Placeholder text in input field
        nameField.position(50, (windowHeight / 2) - 150); // Position of name input field
        nameField.size(200); // Set the size of the input field

        // Set up start button with its position and size, and attach mousePressed event to start game
        this.startButton.position(50, (windowHeight / 2) - 100);
        this.startButton.size(120, 50);
        this.startButton.mousePressed(this.startGame);

        // Set up options button with position, size, and event to show options screen
        this.optionsButton.position(50, (windowHeight / 2));
        this.optionsButton.size(75, 50);
        this.optionsButton.mousePressed(this.showOptions);

        // Set up exit button with position, size, and event to exit the game
        this.exitButton.position(50, (windowHeight / 2) + 100);
        this.exitButton.size(75, 50);
        this.exitButton.mousePressed(this.exitGame);
    }

    // This method would normally be used to draw on the canvas in the main loop (currently commented out)
    // function draw() {
    //     background(220);
    // }

    // State getter (if needed for further functionality)
    // getState(){
    //     return state
    // }

    // This method is called when the start button is pressed
    startGame() {
        console.log('Start Game button clicked');
        
        // Check if the name is less than 3 characters long
        if (nameField.value().length < 3) {
            xx = true // Show error if name is too short
        } else {
            nameValue = nameField.value() // Set the player's name
            state = 1 // Change the state to 1 (game start)
        }
        console.log("State is now: ", state)
    }

    // This method is called when the options button is pressed
    showOptions() {
        console.log('Options button clicked');
        state = 2 // Change the state to 2 (options menu)
    }

    // This method is called when the exit button is pressed
    exitGame() {
        console.log('Exit button clicked');
        state = -1 // Change the state to -1 (exit the game)
    }

    // This method is used to display error message if the name is too short
    drawMenu() {
        // If the name field is too short (less than 3 characters), show an error message
        if (xx) {
            push()
                fill("red") // Red text color for error
                text("Name should be longer than 2 characters", 50, (windowHeight / 2) - 200) // Display error message
            pop()
        }
    }
}
