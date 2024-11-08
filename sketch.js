// import { Taxi } from './Taxi.js'
// import { MainMenu } from './MainMenu.js'

var player
var mainMenu
var state = 0
let playSetup = false

function preload(){
  playerImage = loadImage("./assets/loadImage_0.png")
}

function setup(){
  player = new Taxi(img = playerImage)
  mainMenu = new MainMenu()
  // mainMenu.preload()
  mainMenu.setupMenu()
  // createCanvas(1000, 1000)
  angleMode(RADIANS)
  // background(220)
  rectMode(CENTER)
}

function draw(){

  console.log(state)
  if (state == 0){
    mainMenu.drawMenu()
  }

  if (state == 1){

    if (!playSetup){
      player.setupPlayer()
    }

    clear()
    background(220)
    player.handleMovement()
    player.drawPlayer()

    if (keyIsPressed){
        player.handleMovementInput()
    }
    else{
        player.speedCheck(false)
    }
  }


}
