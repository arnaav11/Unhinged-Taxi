// import { Taxi } from './Taxi.js'
// import { MainMenu } from './MainMenu.js'
let canvas

var player
var mainMenu
var state = 0
let playSetup = false

tick = 60

function preload(){
  
}

function setup(){
  player = new Taxi()
  mainMenu = new MainMenu()
  // mainMenu.preload()
  mainMenu.setupMenu()
  // createCanvas(1000, 1000)
  angleMode(RADIANS)
  // background(220)
  rectMode(CENTER)
}

function draw(){

  tick -= 1

  if (state == 0){
    mainMenu.drawMenu()
  }

  if (state == 1){

    if (!playSetup){
      player.setupPlayer()
      playSetup = true
      angleMode(RADIANS)
    // background(220)
    rectMode(CENTER)
    }

    player.handleMovement()

    if (keyIsPressed){
        player.handleMovementInput()
    }
    else{
        player.speedCheck(false)
    }

    clear()

    player.drawPlayer()
    
  }

  if (tick == 0){
    tick = 60
  }


}
