class MainMenuUpdated{
	
	constructor(){
		this.startGameImg = loadImage("assets/start_game.png")
		this.optionsImg = loadImage("assets/options.png")
		this.exitImg = loadImage("assets/exit.png")
		this.backgroundImg = loadImage("assets/background.png")
		this.optionsScreenImg = loadImage("assets/pngegg.png")
		this.titleImg = loadImage("assets/Game_Name.png")

		this.nameInput = createInput("")

		this.optionsOpen = false

		this.fixStuff = false
	}

	reloadImages(fix = false){
		removeElements()
		rectMode(CORNER)

		this.nameInput = createInput("")

		this.optionsOpen = false
	}

	setupMenu(){
		createCanvas(windowWidth, windowHeight)

		this.nameInput.attribute("placeholder", "Enter Name")
		this.nameInput.size(200)
		this.nameInput.position(50, (windowHeight/2)-150)

		console.log(windowWidth, windowHeight)
		this.backgroundImg.resize(windowWidth, windowHeight)
		this.startGameImg.resize(120, 50)
		this.optionsImg.resize(75, 50)
		this.exitImg.resize(75, 50)
		this.optionsScreenImg.resize(windowWidth - 270, windowHeight * 0.8)

		// this.startGameImg.mousePressed(this.checkButtons)
	}

	checkButtons(){
		console.log('checking buttons')

		let baseHeight = windowHeight/2
		if ((mouseY > baseHeight-100) && (mouseY < baseHeight-50) && (mouseX > 50) && (mouseX < 170)){
			console.log('Start button pressed')
			this.startGame()
		}

		if ((mouseY > baseHeight) && (mouseY < baseHeight+50) && (mouseX > 50) && (mouseX < 125)){
			console.log('Options button pressed')
			this.optionsOpen = !this.optionsOpen
		}

		if ((mouseY > baseHeight+100) && (mouseY < baseHeight+150) && (mouseX > 50) && (mouseX < 125)){
			console.log('Options button pressed')
			exitGame()
		}

		if (this.optionsOpen){
			this.checkOptions()
		}

	}

	checkOptions(){

		if ((mouseX > (windowWidth/2) + 215) && (mouseX < (windowWidth/2) + 275) && (mouseY > (windowHeight/2) - 44) && (mouseY < (windowHeight/2) + 6)){
			musicOn = true
		}

		if ((mouseX > (windowWidth/2) + 305) && (mouseX < (windowWidth/2) + 360) && (mouseY > (windowHeight/2) - 44) && (mouseY < (windowHeight/2) + 6)){
			musicOn = false
		}

	}

	startGame(){
		if (this.nameInput.value().length > 2){
			state = 1
			nameValue = this.nameInput.value()
		}


	}

	drawOptionsScreen(){
		push()

			// if (this.fixStuff){
			// 	translate(-(windowWidth/2), -windowHeight/2)
			// }

			fill("black")
			rect(300, windowHeight/10, windowWidth - 350, windowHeight * 0.8)
			
			textSize(44)
			
			fill("white")
			text("Music: On / Off", (windowWidth/2) + 75, (windowHeight/2))
			if (!musicOn){
				fill(0, 0, 0, 127)
				rect((windowWidth/2) + 215, (windowHeight/2)-44, 60, 50)
			}
			else{
				fill(0, 0, 0, 127)
				rect((windowWidth/2) + 305, (windowHeight/2)-44, 65, 50)
			}

			// text("Hello", (windowWidth/2) + 125, (windowHeight * 0.5) + 64)

		pop()
	}

	drawMenu(){
		clear()

		push()
			imageMode(CORNER)
			if (this.fixStuff){
				translate(-(windowWidth/2), -windowHeight/2)
			}
			image(this.backgroundImg, 0, 0)
			image(this.startGameImg, 50, (windowHeight/2) - 100)
			image(this.optionsImg, 50, (windowHeight/2))
			image(this.exitImg, 50, (windowHeight/2) + 100)
			image(this.titleImg, (windowWidth/2)-300, 100)

			// this.debug()

			if (this.optionsOpen){
				this.drawOptionsScreen()
			}

			fill("white")
			textSize(40)
			text("Name should be 3 characters or more. \nControls: W: forward, A: Left, S: Back, D: Right \nStop at the purple stops to pick up and drop off pasengers. \nThis game is too hard, maybe give up before breaking anything", 100, 0.8*windowHeight)

		pop()
	}

	debug(){
		push()

			fill("white")
			textSize(32)
			text("Position: " + mouseX + ", " + mouseY,50, 50)

		pop()
	}
}