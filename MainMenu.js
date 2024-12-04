let nameField;  // Declare variable for the name input field
let xx;  // Declare variable to track name validation status

class MainMenu {
  // Declare the images for the background and buttons
  backgroundImage;
  startButton;
  optionsButton;
  exitButton;

  constructor() {
    // Initialize the images for the background and buttons
    this.backgroundImage = createImg('./assets/background.png');
    this.startButton = createImg('./assets/start_game.png');
    this.optionsButton = createImg('./assets/options.png');
    this.exitButton = createImg('./assets/exit.png');
    
    // Initialize the name input field
    nameField = createInput("");
    
    // Set the initial state of the game (state 0 is the main menu)
    state = 0;
  }

  // Method to reload images and reset input field
  reloadImages() {
    // Reinitialize images for background and buttons
    this.backgroundImage = createImg('./assets/background.png');
    this.startButton = createImg('./assets/start_game.png');
    this.optionsButton = createImg('./assets/options.png');
    this.exitButton = createImg('./assets/exit.png');
    
    // Reset the name input field
    nameField = createInput("");
    
    // Reset the state of the game
    state = 0;
  }

  // Method to setup the menu (position and size of elements)
  setupMenu() {
    // Create a canvas that fills the entire window
    canvas = createCanvas(windowWidth, windowHeight);
    
    // Set the background image and resize it to fit the window
    this.backgroundImage.position(0, 0);
    this.backgroundImage.size(windowWidth, windowHeight);

    // Set up the name input field with placeholder, position, and size
    nameField.attribute('placeholder', 'Enter Name');
    nameField.position(50, (windowHeight / 2) - 150);  // Positioned above the buttons
    nameField.size(200);  // Set input field width

    // Set up the start button (position, size, and mouse pressed event)
    this.startButton.position(50, (windowHeight / 2) - 100);
    this.startButton.size(120, 50);
    this.startButton.mousePressed(this.startGame);  // When clicked, call the startGame method

    // Set up the options button (position, size, and mouse pressed event)
    this.optionsButton.position(50, (windowHeight / 2));
    this.optionsButton.size(75, 50);
    this.optionsButton.mousePressed(this.showOptions);  // When clicked, call the showOptions method

    // Set up the exit button (position, size, and mouse pressed event)
    this.exitButton.position(50, (windowHeight / 2) + 100);
    this.exitButton.size(75, 50);
    this.exitButton.mousePressed(this.exitGame);  // When clicked, call the exitGame method
  }

  // Start the game when the "Start Game" button is clicked
  startGame() {
    console.log('Start Game button clicked');
    
    // Check if the name input is too short (less than 3 characters)
    if (nameField.value().length < 3) {
      xx = true;  // Set the flag to indicate invalid name
    } else {
      // Set the game state to 1 (start the game) and store the name
      nameValue = nameField.value();
      state = 1;
    }

    // Log the current state of the game
    console.log("State is now: ", state);
  }

  // Show the options menu when the "Options" button is clicked
  showOptions() {
    console.log('Options button clicked');
    state = 2;  // Set the game state to 2 (options menu)
  }

  // Exit the game when the "Exit" button is clicked
  exitGame() {
    console.log('Exit button clicked');
    state = -1;  // Set the game state to -1 (exit the game)
  }

  // Method to draw the main menu (with validation message if name is invalid)
  drawMenu() {
    // If the name is invalid (too short), show an error message
    if (xx) {
      push();  // Begin new drawing state
        fill("red");  // Set text color to red for error message
        text("Name should be longer than 2 characters", 50, (windowHeight / 2) - 200);  // Display error message
      pop();  // End drawing state
    }
  }
}
