// import { Taxi } from './Taxi.js'
// import { MainMenu } from './MainMenu.js'
let canvas
let mapImage
var player
var mainMenu
var state = 0
let playSetup = false
let img


tick = 60

function handleImage(image){
  img = image
  console.log("success loading the picture")
}

function handleError(event){
  console.log(event)
}

function preload(){
  mapImage = loadImage("/assets/Game_map.jpg")
  img = loadImage("/assets/car.png", handleImage, handleError)
}

function setup(){

  // mapImage = loadImage("./assets/Game_map.png")
  // img = loadImage("./assets/car.png")

  // mapImage = loadImage("./assets/Game_map.png")
  player = new Taxi()
  mainMenu = new MainMenu()
  // mainMenu.preload()TypeError: e is undefined
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
    }

    player.doTick()    
  }

  if (tick == 0){
    tick = 60
  }


}
