class MainMenuUpdated{
	
	constructor(){
		this.startGameImg = loadImage("assets/start_game.png")
		this.optionsImg = loadImage("assets/options.png")
		this.exitImg = loadImage("assets/exit.png")
		this.nameInput = createInput("")
	}

	setupMenu(){
		this.nameInput.attribute("placeholder", "Enter Name")
		this.nameInput.size(200)
		this.nameInput.position(50, (windowHeight/2)-150)
	}

	drawMenu(){
		
	}
}