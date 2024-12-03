// import { Taxi } from './Taxi.js'
// import { MainMenu } from './MainMenu.js'
let canvas
let mapImage
let backgroundImg
var player
var mainMenu
var state = 0
let arial
let playSetup = false
let menuSetup = false
let img
var nameValue
var leaderboard = []
let musicOn = true
let leaderFirst = true
let musicPlay

let houses = [
  { x: -1827, y: -76, w: 320, h: 340 },
  { x: -1480, y: -70, w: 420, h: 340 },
  { x: -1040, y: -135, w: 330, h: 260 },
  { x: -620, y: -140, w: 240, h: 250 },
  { x: -232, y: 0, w: 382, h: 400 },
  { x: 224, y: -122, w: 300, h: 290 },
  { x: 643, y: -107, w: 240, h: 280 },
  { x: 1030, y: -144, w: 330, h: 260 },
  { x: 1495, y: -70, w: 320, h: 330 },
  // END OF ROW 1 1-9 HOUSES
  { x: -1648, y: -523, w: 240, h: 250 },
  { x: -1312, y: -527, w: 440, h: 246 },
  { x: -872, y: -527, w: 290, h: 246 },
  { x: -492, y: -527, w: 340, h: 246 },
  { x: 143, y: -527, w: 330, h: 246 },
  { x: 498, y: -527, w: 440, h: 246 },
  { x: 930, y: -527, w: 310, h: 246 },
  { x: 1335, y: -527, w: 300, h: 246 },
  // END OF ROW 2 10-18 HOUSES
  { x: -1648, y: -880, w: 320, h: 286 },
  { x: -1205, y: -880, w: 310, h: 286 },
  { x: -809, y: -890, w: 240, h: 276 },
  { x: -479, y: -900, w: 330, h: 260 },
  { x: 168, y: -880, w: 330, h: 286 },
  { x: 569, y: -880, w: 310, h: 286 },
  { x: 989, y: -904, w: 340, h: 270 },
  { x: 1377, y: -880, w: 240, h: 260 },
  // END OF ROW 3 19-25 HOUSES
  { x: -1746, y: -1282, w: 330, h: 260 },
  { x: -1317, y: -1276, w: 350, h: 250 },
  { x: -884, y: -1284, w: 314, h: 250 },
  { x: -487, y: -1284, w: 320, h: 250 },
  { x: 134, y: -1284, w: 314, h: 250 },
  { x: 584, y: -1284, w: 240, h: 250 },
  { x: 995, y: -1284, w: 290, h: 250 },
  { x: 1381, y: -1275, w: 330, h: 260 },
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

function sortLeaderboard(){
  console.log("sorting")
  // let maxScoreRN = leaderboard[0].score
  let maxScoreRNPlace = 0


  for (i = 0; i < leaderboard.length; i++){
    maxScoreRNPlace = i

    for (j = i; j < leaderboard.length; j++){
      if (leaderboard[j].score > leaderboard[maxScoreRNPlace].score){
        maxScoreRNPlace = j
      }
    }

    let temp = leaderboard[i]
    leaderboard[i] = {name: leaderboard[maxScoreRNPlace].name, score: leaderboard[maxScoreRNPlace].score}
    leaderboard[maxScoreRNPlace] = {name: temp.name, score: temp.score}
  }

}

function handleError(event){
  console.log(event)
}

function preload(){
  backgroundImg = loadImage("assets/background.png")
  musicPlay = loadSound("assets/background_music.mp3")
  mapImage = loadImage("/assets/Game_map.jpg")
  img = loadImage("/assets/car.png", handleImage, handleError)
  arial = loadFont("/assets/ARIAL.TTF")

  player = new Taxi()
  mainMenu = new MainMenuUpdated()
}

function mouseClicked(){

  console.log("checking clicks")
  if (state == 0 ){
    mainMenu.checkButtons()
  }

  if (state == 3){
    state = 0
  }
}

function setup(){

  backgroundImg.resize(windowWidth, windowHeight)

  musicPlay.loop()
  musicPlay.setVolume(1)

  // mapImage = loadImage("./assets/Game_map.png")
  // img = loadImage("./assets/car.png")

  // mapImage = loadImage("./assets/Game_map.png")
  // textFont(arial)
  // angleMode(RADIANS)
  // // background(220)
  rectMode(CORNER)
  // mainMenu.preload()TypeError: e is undefined
  // createCanvas(1000, 1000)
  
}

function showLeaderBoard(){

  mainMenu.nameInput.hide()

  push()

    // translate()
    // fill("black")
    translate(-windowWidth, -windowHeight)
    image(backgroundImg, 0, 0)
    fill("white")
    textSize(50)
    for (i = 0; i < Math.min(10, leaderboard.length); i++){
      let show = ""
      show += leaderboard[i].name
      show += "  " + leaderboard[i].score
      text(show, (windowWidth/2) - 75, 200 + (50*i))
    }

  pop()
}

function draw(){

  // window.close()

  if (!musicOn){
    musicPlay.setVolume(0)
  }
  else{
    musicPlay.setVolume(1)
  }

  tick -= 1

  if (state == 0){

    if (!menuSetup){
      rectMode(CORNER)
      mainMenu.nameInput.show()
      mainMenu.reloadImages()
      mainMenu.setupMenu()
      menuSetup = true
      playSetup = false
      leaderFirst = true
    }
    mainMenu.drawMenu()
  }

  if (state == 1){

    if (!playSetup){
      player.init()
      player.setupPlayer()
      playSetup = true
      menuSetup = false
      leaderFirst = true
    }

    player.doTick()    
  }

  if (state == 3){
    clear()
    showLeaderBoard()
  }

  if (tick == 0){
    tick = 60
  }


}

function exitGame(){
  window.close()
}
