// import { Taxi } from './Taxi.js'
// import { MainMenu } from './MainMenu.js'
let canvas
let mapImage
var player
var mainMenu
var state = 0
let playSetup = false
let img
let arial

let houses = [
  { x: -1827, y: -76, w: 320, h: 340 },
  { x: -1480, y: -70, w: 420, h: 340 },
  { x: -1040, y: -135, w: 330, h: 260 },
  { x: -620, y: -140, w: 240, h: 250 },
  { x: -232, y: 0, w: 382, h: 400 },
  { x: 65, y: -210, w: 60, h: 50 },
  { x: 167, y: -215, w: 50, h: 50 },
  { x: 270, y: -210, w: 60, h: 50 },
  { x: 380, y: -210, w: 60, h: 50 },
  // END OF ROW 1 1-9 HOUSES
  { x: -405, y: -105, w: 50, h: 50 },
  { x: -300, y: -105, w: 50, h: 50 },
  { x: -210, y: -105, w: 50, h: 50 },
  { x: -120, y: -105, w: 70, h: 50 },
  { x: 55, y: -105, w: 50, h: 50 },
  { x: 155, y: -105, w: 50, h: 50 },
  { x: 250, y: -105, w: 50, h: 50 },
  { x: 345, y: -105, w: 55, h: 50 },
  // END OF ROW 2 10-18 HOUSES
  { x: -405, y: 10, w: 60, h: 50 },
  { x: -295, y: 10, w: 60, h: 50 },
  { x: -196, y: 10, w: 50, h: 50 },
  { x: -108, y: 10, w: 60, h: 50 },
  { x: 50, y: 10, w: 65, h: 50 },
  { x: 150, y: 10, w: 60, h: 50 },
  { x: 260, y: 10, w: 60, h: 50 },
  { x: 350, y: 10, w: 50, h: 50 },
  // END OF ROW 3 19-25 HOUSES
  { x: -425, y: 120, w: 60, h: 50 },
  { x: -317, y: 120, w: 60, h: 50 },
  { x: -210, y: 120, w: 60, h: 50 },
  { x: -115, y: 120, w: 60, h: 50 },
  { x: 40, y: 120, w: 60, h: 50 },
  { x: 153, y: 120, w: 50, h: 50 },
  { x: 260, y: 120, w: 60, h: 50 },
  { x: 360, y: 120, w: 60, h: 50 },
  // FINAL ROW OF HOUSES 26-33
];

let mapBorders = [
  { x: -470, y: -265, w: 940, h: 20 }, // Top border
  { x: -470, y: 310, w: 940, h: 20 }, // Bottom border
  { x: 510, y: -235, w: 30, h: 510 }, // Right border
  { x: -510, y: -235, w: 30, h: 510 }, // Left border
];


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
  arial = loadFont("/assets/ARIAL.TTF")
}

function setup(){

  // mapImage = loadImage("./assets/Game_map.png")
  // img = loadImage("./assets/car.png")

  // mapImage = loadImage("./assets/Game_map.png")
  // textFont(arial)
  angleMode(RADIANS)
  // background(220)
  rectMode(CENTER)
  player = new Taxi(-601, -300)
  mainMenu = new MainMenu()
  // mainMenu.preload()TypeError: e is undefined
  mainMenu.setupMenu()
  // createCanvas(1000, 1000)
  
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
