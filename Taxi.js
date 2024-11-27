class Taxi{ 


  // 1920 - 60, 1080 - 155
  constructor(x, y, ang=0, angSpeed=0.01*Math.PI, speed=0, maxSpeed=6, accel=0, maxAccel=1, dAcc=0.01, friction=0.02, sizex=windowWidth*2, sizey=windowHeight*2, cameraSizeX=windowWidth, cameraSizeY=windowHeight, cameraThreshX=windowWidth/6, cameraThreshY=windowHeight/6){
    // this.img = loadImage("./assets/loadImage_0.png")
    this.ang = ang
    this.angSpeed = angSpeed
    this.speed = speed
    this.maxSpeed = maxSpeed
    this.accel = accel
    this.maxAccel = maxAccel
    this.dAcc = dAcc
    this.x = x
    this.y = y
    this.sizex = sizex
    this.sizey = sizey
    this.friction = friction
    this.cameraSizeX = cameraSizeX
    this.cameraSizeY = cameraSizeY
    this.cameraThreshX = cameraThreshX
    this.cameraThreshY = cameraThreshY
    this.cameraPos = [(-sizex/2)+(cameraSizeX/2), -(sizey/2)+(cameraSizeY/2)]
    this.mapPos = [0, 0]
    this.playerMoveX = true
    this.playerMoveY = true
    this.wall = false
    this.drawCenter = [(-sizex/2)+(cameraSizeX/2), -(sizey/2)+(cameraSizeY/2)]
    mapImage.resize(sizex, sizey)
    this.drawPos = [this.drawCenter[0] + this.x - this.cameraPos[0],
                      this.drawCenter[1] - this.y + this.cameraPos[1]]

    this.scrollMap(true)

    this.dir = [Math.cos(this.ang), Math.sin(this.ang)]
    console.log(windowHeight, windowWidth)
    // console.log(this.cameraPos, this.drawCenter, this.mapPos, this.drawPos[0])
  }
  
  getPos(){
    return [this.x, this.y]
  }

  preloadPlayer(){
    this.img = loadImage("assets/car.png")
  }

  handleMovementInput(){
    let ws = false
    if (keyIsDown(65)){
      this.ang -= this.angSpeed
    }
    if (keyIsDown(68)){
      this.ang += this.angSpeed
    }
    if (keyIsDown(87)){
      this.accel += this.dAcc
      ws = true
    }
    if (keyIsDown(83)){
      this.accel -= this.dAcc
      ws = true
    }

    this.speedCheck(ws)
  
  }
  
  handleMovement(){
    this.dir = [Math.cos(this.ang), Math.sin(this.ang)]
  
    let dx, dy;

    if (this.wall && this.speed > 0){
      this.speed = Math.min(this.speed, 1)
      this.accel = 0
    }
    else if (this.wall && this.speed < 0){
      this.speed = Math.max(this.speed, -1)
      this.accel = 0
    }
    dx = this.dir[0]*this.speed
    dy = this.dir[1]*this.speed
    

    this.y -= dy
    this.x += dx

  //   if (this.playerMoveX){
  //     this.drawPos[0] = this.x
  //   }
  //   if (this.playerMoveY){
  //     this.drawPos[1] = this.y
  //   }

    this.drawPos[0] = this.drawCenter[0] + this.x - this.cameraPos[0]
    this.drawPos[1] = this.drawCenter[1] - this.y + this.cameraPos[1]

    this.worldBorderCheck()
    this.doCollisions()
  }
  
  worldBorderCheck(){
    if (this.x <= -this.sizex/2){
      this.x = -this.sizex/2
      this.wall = true
      return
    }
    if (this.x >= this.sizex/2){
      this.x = this.sizex/2
      this.wall = true
      return
    }

    if (this.y <= -this.sizey){
      this.y = -this.sizey
      this.wall = true
      return
    }
    if (this.y >= 0){
      this.y = 0
      this.wall = true
      return
    }

    this.wall = false
  }

  speedCheck(wOrS){
  
    this.speed += this.accel
  
    if (this.speed > this.maxSpeed){
      this.speed = this.maxSpeed
    }
    else if (this.speed < -this.maxSpeed){
      this.speed = -this.maxSpeed
    }
  
    if (this.accel > this.maxAccel){
      this.accel = this.maxAccel
    }
    else if (this.accel < -this.maxAccel){
      this.accel = -this.maxAccel
    }
  
    if (!wOrS){
      this.accel = 0
      if (this.speed >= this.friction){
        this.speed -= this.friction
      }
      else if(this.speed <= -this.friction){
        this.speed += this.friction
      }
    }

    if (this.speed < 0.02 && this.speed > 0){
      this.speed = 0
    }
    else if (this.speed > -0.02 && this.speed < 0){
      this.speed = 0
    }

    // if (this.x > windowWidth){
    //   this.x = windowWidth
    // }
    // else if (this.x < -windowWidth){
    //   this.x = -windowWidth
    // }

    // if (this.y > windowHeight){
    //   this.y = windowHeight
    // }
    // else if (this.y < -windowHeight){
    //   this.y = -windowHeight
    // }

    // console.log(this.x, this.y, windowWidth, windowHeight)
  
  }
  
  setupPlayer() {
    
    console.log("Setup start for player")
    removeElements()
    canvas = createCanvas(this.sizex, this.sizey, WEBGL)
    // background(mapImage, 255)
    angleMode(RADIANS)
    rectMode(CENTER)
    this.scrollMap()
    console.log("Setup done for player")
    textFont(arial)
  }

  drawHUD(){
    push()
    // rotate(this.ang)
    // text("Hello", this.drawPos[0], this.drawPos[1])
    // translate(this.drawPos[0], this.drawPos[1])
    fill("black")
    textSize(32)
    // textAlign(CENTER, CENTER)
    text("" + "\nPosition: "+Math.round(this.x)+", "+Math.round(this.y), -this.sizex/2, -this.sizey/2+32)
    pop()
  }

  drawHouseHB(dist, disty){
    push()

      for (let i = 0; i < houses.length; i++){
        fill(0, 0, 0, 0)
        strokeWeight(1)
        // translate(houses[i].x + this.mapPos[0] + (houses[i].w/2), - houses[i].y - (this.sizey/2) + this.mapPos[1] + (houses[i].h/2))
        rect(houses[i].x + this.mapPos[0] + (houses[i].w/2), - houses[i].y - (this.sizey/2) + this.mapPos[1] + (houses[i].h/2), houses[i].w, houses[i].h)
      }

    pop()
  }

  doCollisions(){

      for (let i = 0; i < houses.length; i++){
        fill(0, 0, 0, 0)
        strokeWeight(1)
        // translate(houses[i].x + this.mapPos[0] + (houses[i].w/2), - houses[i].y - (this.sizey/2) + this.mapPos[1] + (houses[i].h/2))
        // let boxX = houses[i].x + this.mapPos[0] + (houses[i].w/2)
        // let boxY = - houses[i].y - (this.sizey/2) + this.mapPos[1] + (houses[i].h/2)
        // rect(, , houses[i].h)
        box = houses[i]
        // console.log(box.x, box.x + 0.01, box.y, this.x, this.y, ((this.y < box.y) && (this.y > box.y - box.h) && (this.x > box.x) && (this.x - box.x < 2)));
        
        if ((this.y <= box.y) && (this.y > box.y - box.h) && (this.x >= box.x) && (this.x < box.x + 10)){
          this.x = box.x
          this.wall = true
        }
        if ((this.y <= box.y) && (this.y > box.y - box.h) && (this.x <= box.x + box.w) && (this.x > box.x + box.w - 10)){
          this.x = box.x + box.w
          this.wall = true
        }
        if ((this.x >= box.x) && (this.x < box.x + box.w) && (this.y >= box.y - box.h) && (this.y < box.y - box.h + 10)){
          this.y = box.y - box.h
          this.wall = true
        }
        if ((this.x >= box.x) && (this.x < box.x + box.w) && (this.y <= box.y) && (this.y > box.y - 10)){
          this.y = box.y
          this.wall = true
        }
      }

  }

  drawPlayer() {

    push();
    // background(mapImage)
      translate(this.drawPos[0], this.drawPos[1])
      rotate(this.ang)
      strokeWeight(1)
      texture(img);
      rect(0, 0, 100, 100)
    pop()
  }

  scrollMap(st = false){
    if (st){
      console.log("check");
    }
    
    if (this.x > (this.cameraPos[0] + this.cameraThreshX)){
      this.cameraPos[0] = this.x - this.cameraThreshX
      let dist = this.cameraPos[0] - this.drawCenter[0]
      this.mapPos[0] = -dist
    }
    if (this.x < (this.cameraPos[0] - this.cameraThreshX)){
      this.cameraPos[0] = this.x + this.cameraThreshX
      let dist = this.cameraPos[0] - this.drawCenter[0]
      this.mapPos[0] = -dist
    }

    if (this.y < (this.cameraPos[1] - this.cameraThreshY)){
      this.cameraPos[1] = this.y + this.cameraThreshY
      let dist = this.cameraPos[1] - this.drawCenter[1]
      this.mapPos[1] = dist
    }
    if (this.y > (this.cameraPos[1] + this.cameraThreshY)){
      // console.log("")
      this.cameraPos[1] = this.y - this.cameraThreshY
      let dist = this.cameraPos[1] - this.drawCenter[1]
      this.mapPos[1] = dist
    }
  }

  drawMap() {

    // console.log(this.drawCenter[0], this.mapPos[0], this.cameraPos[0], this.x, this.x - (this.cameraPos[0] + this.cameraThreshX), this.speed)
    // console.log(this.y, this.cameraPos[1] + this.cameraThreshY)
    image(mapImage, this.mapPos[0]-(this.sizex/2), this.mapPos[1]-(this.sizey/2))
    // image(mapImage, -2000, -1600)
  }

  doTick() {
    
    
    if (keyIsPressed){
        this.handleMovementInput()
    }
    else{
        this.speedCheck(false)
    }
    this.handleMovement()

    clear()
    this.scrollMap()
    this.drawMap()
    // console.log(this.mapPos)
    this.drawPlayer()
    this.drawHUD()
    this.drawHouseHB()
  }

}
