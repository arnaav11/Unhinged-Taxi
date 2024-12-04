let nameField
let xx

class MainMenu{
    backgroundImage;
    startButton;
    optionsButton;
    exitButton;

    constructor(){
        this.backgroundImage = createImg('./assets/background.png');
        this.startButton = createImg('./assets/start_game.png');
        this.optionsButton = createImg('./assets/options.png');
        this.exitButton = createImg('./assets/exit.png');
        nameField = createInput("")
        state = 0
    }

    reloadImages() {
        this.backgroundImage = createImg('./assets/background.png');
        this.startButton = createImg('./assets/start_game.png');
        this.optionsButton = createImg('./assets/options.png');
        this.exitButton = createImg('./assets/exit.png');
        nameField = createInput("")
        state = 0
    }

    setupMenu() {
        canvas = createCanvas(windowWidth, windowHeight);
        

        this.backgroundImage.position(0, 0);
        this.backgroundImage.size(windowWidth, windowHeight);

        nameField.attribute('placeholder', 'Enter Name')
        nameField.position(50, (windowHeight/2)-150)
        nameField.size(200)

        this.startButton.position(50, (windowHeight/2)-100);
        this.startButton.size(120, 50);
        this.startButton.mousePressed(this.startGame); 

        this.optionsButton.position(50, (windowHeight/2));
        this.optionsButton.size(75, 50);
        this.optionsButton.mousePressed(this.showOptions); 

        this.exitButton.position(50, (windowHeight/2)+100);
        this.exitButton.size(75, 50);
        this.exitButton.mousePressed(this.exitGame); 
    }

    // function draw() {
    //     background(220);
    // }

    // getState(){
    //     return state
    // }

    startGame() {
        console.log('Start Game button clicked');
        if (nameField.value().length < 3){
            xx = true
        }
        else{
            nameValue = nameField.value()
            state = 1
        }
        console.log("State is now: ", state)
        
    }

    showOptions() {
        console.log('Options button clicked');
        state = 2
    
    }

    exitGame() {
        console.log('Exit button clicked');
        state = -1
        
    }

    drawMenu() {
        if (xx){
            push()
                fill("red")
                text("Name should be longer than 2 characters", 50, (windowHeight/2)-200)
            pop()
        }
    }
}
