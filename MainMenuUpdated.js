class MainMenuUpdated {
	
	// Constructor: Initializes variables and assets for the main menu
	constructor(){
		// Load images for various menu elements
		this.startGameImg = loadImage("assets/start_game.png")
		this.optionsImg = loadImage("assets/options.png")
		this.exitImg = loadImage("assets/exit.png")
		this.backgroundImg = loadImage("assets/background.png")
		this.optionsScreenImg = loadImage("assets/pngegg.png")
		this.titleImg = loadImage("assets/Game_Name.png")

		// Input field for the player's name
		this.nameInput = createInput("")

		// Boolean to track if the options screen is open
		this.optionsOpen = false

		// Used for debugging or fixing layout issues
		this.fixStuff = false
	}

	// Function to reload the images and reset menu state (optionally fixing issues)
	reloadImages(fix = false){
		removeElements()  // Removes any existing DOM elements (e.g., inputs)
		rectMode(CORNER)  // Sets rectangle drawing mode to CORNER (default mode)

		// Recreate the name input field
		this.nameInput = createInput("")

		// Close the options screen
		this.optionsOpen = false
	}

	// Setup function for the main menu
	setupMenu(){
		// Create canvas that fills the window size
		createCanvas(windowWidth, windowHeight)

		// Configure the name input field (placeholder and size)
		this.nameInput.attribute("placeholder", "Enter Name")
		this.nameInput.size(200)
		this.nameInput.position(50, (windowHeight/2)-150)  // Position the input field in the middle

		// Resize images to fit window size or desired dimensions
		this.backgroundImg.resize(windowWidth, windowHeight)
		this.startGameImg.resize(120, 50)
		this.optionsImg.resize(75, 50)
		this.exitImg.resize(75, 50)
		this.optionsScreenImg.resize(windowWidth - 270, windowHeight * 0.8)

		// Uncomment to add interactivity to the "Start Game" button
		// this.startGameImg.mousePressed(this.checkButtons)
	}

	// Checks which button is pressed based on the mouse position
	checkButtons(){
		console.log('checking buttons')

		let baseHeight = windowHeight / 2

		// Check if the "Start Game" button is clicked
		if ((mouseY > baseHeight - 100) && (mouseY < baseHeight - 50) && (mouseX > 50) && (mouseX < 170)){
			console.log('Start button pressed')
			this.startGame()
		}

		// Check if the "Options" button is clicked
		if ((mouseY > baseHeight) && (mouseY < baseHeight + 50) && (mouseX > 50) && (mouseX < 125)){
			console.log('Options button pressed')
			this.optionsOpen = !this.optionsOpen  // Toggle options screen
		}

		// Check if the "Exit" button is clicked
		if ((mouseY > baseHeight + 100) && (mouseY < baseHeight + 150) && (mouseX > 50) && (mouseX < 125)){
			console.log('Exit button pressed')
			exitGame()  // Call the exitGame function (you'd need to define this)
		}

		// If options screen is open, check for option changes
		if (this.optionsOpen){
			this.checkOptions()
		}
	}

	// Checks the options (like turning music on or off)
	checkOptions(){
		// Check if "Music On" option is clicked
		if ((mouseX > (windowWidth / 2) + 215) && (mouseX < (windowWidth / 2) + 275) && (mouseY > (windowHeight / 2) - 44) && (mouseY < (windowHeight / 2) + 6)){
			musicOn = true
		}

		// Check if "Music Off" option is clicked
		if ((mouseX > (windowWidth / 2) + 305) && (mouseX < (windowWidth / 2) + 360) && (mouseY > (windowHeight / 2) - 44) && (mouseY < (windowHeight / 2) + 6)){
			musicOn = false
		}
	}

	// Starts the game if the player entered a name that's at least 3 characters
	startGame(){
		if (this.nameInput.value().length > 2){
			state = 1  // Change the state to 1 (likely indicating game start)
			nameValue = this.nameInput.value()  // Store the player's name
		}
	}

	// Draw the options screen (like music settings)
	drawOptionsScreen(){
		push()

		// Draw a semi-transparent background for the options area
		fill("black")
		rect(300, windowHeight / 10, windowWidth - 350, windowHeight * 0.8)

		// Draw text to label the "Music" option
		textSize(44)
		fill("white")
		text("Music: ", (windowWidth / 2) + 75, (windowHeight / 2))

		// Display "On" or "Off" depending on music state
		if (!musicOn){
			fill(255, 255, 255, 127)  // Semi-transparent "Off"
		}
		text("On", (windowWidth / 2) + 225, (windowHeight / 2))
		fill(255, 255, 255)
		text("/", (windowWidth / 2) + 300, (windowHeight / 2))
		if (musicOn){
			fill(255, 255, 255, 127)  // Semi-transparent "On"
		}
		text("Off", (windowWidth / 2) + 325, (windowHeight / 2))

		pop()
	}

	// Draw the main menu screen (background, buttons, etc.)
	drawMenu(){
		clear()

		push()
			// Set the image mode to CORNER (default)
			imageMode(CORNER)

			// Optionally fix the position of the menu (for debugging)
			if (this.fixStuff){
				translate(-(windowWidth / 2), -windowHeight / 2)
			}

			// Draw the background and menu buttons
			image(this.backgroundImg, 0, 0)
			image(this.startGameImg, 50, (windowHeight / 2) - 100)
			image(this.optionsImg, 50, (windowHeight / 2))
			image(this.exitImg, 50, (windowHeight / 2) + 100)
			image(this.titleImg, (windowWidth / 2) - 300, 100)

			// If options menu is open, draw the options screen
			if (this.optionsOpen){
				this.drawOptionsScreen()
			}

			// Display instructions or debug information
			fill("white")
			textSize(40)
			text("Name should be 3 characters or more. \nControls: W: forward, A: Left, S: Back, D: Right \nStop at the purple stops to pick up and drop off passengers. \nThis game is too hard, maybe give up before breaking anything", 100, 0.8 * windowHeight)

		pop()
	}

	// Debug function to display mouse position on the screen
	debug(){
		push()

			fill("white")
			textSize(32)
			text("Position: " + mouseX + ", " + mouseY, 50, 50)

		pop()
	}
}
