class Taxi{ 

  ang
  angSpeed
  speed
  maxSpeed
  accel
  maxAccel
  dAcc
  x
  y


  // 1920 - 60, 1080 - 155
  constructor(x=-900, y=-600, ang=0, angSpeed=0.01*Math.PI, speed=0, maxSpeed=6, accel=0, maxAccel=1, dAcc=0.01, friction=0.02, sizex = 3840, sizey = 2160, cameraSizeX=windowWidth, cameraSizeY=windowHeight, cameraThreshX=windowWidth/4, cameraThreshY=windowHeight/4){
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
    this.sizex = windowWidth*2
    this.sizey = windowHeight*2
    this.friction = friction
    this.cameraSizeX = cameraSizeX
    this.cameraSizeY = cameraSizeY
    this.cameraThreshX = cameraThreshX
    this.cameraThreshY = cameraThreshY
    this.cameraPos = [-(sizex/2)+(cameraSizeX/2), -(sizey/2)+cameraSizeY/2]
    this.mapPos = [0, 0]
    this.playerMoveX = true
    this.playerMoveY = true
    this.drawPos = [x, y]
    this.drawCenter = [-(sizex/2)+(cameraSizeX/2), -(sizey/2)+cameraSizeY/2]
    mapImage.resize(windowWidth*2, windowHeight*2)

    this.dir = [Math.cos(this.ang), Math.sin(this.ang)]
    console.log(windowHeight, windowWidth)
  }
  
  getPos(){
    return [this.x, this.y]
  }

  getX() {
    return [this.x]
  }

  getY() {
    return [this.y]
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
  
    let dx = this.dir[0]*this.speed
    let dy = this.dir[1]*this.speed

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

    console.log(this.x, this.y, windowWidth, windowHeight)
  
  }
  
  setupPlayer() {
    console.log("Setup start for player")
    removeElements()
    canvas = createCanvas(this.sizex, this.sizey, WEBGL)
    // background(mapImage, 255)
    angleMode(RADIANS)
    rectMode(CENTER)
    console.log("Setup done for player")
  }

  drawPlayer() {

    // push();
    // background(mapImage)
    translate(this.drawPos[0], this.drawPos[1])
    rotate(this.ang)
    strokeWeight(0)
    rect(0, 0, 100, 100)
    texture(img);
    // pop()
  }

  drawMap() {

    // console.log(this.drawCenter[0], this.mapPos[0], this.cameraPos[0], this.x, this.x - (this.cameraPos[0] + this.cameraThreshX), this.speed)
    // console.log(this.y, this.cameraPos[1] + this.cameraThreshY)
    
    if (this.x - (this.cameraPos[0] + this.cameraThreshX) > 0.01){
      this.cameraPos[0] = this.x - this.cameraThreshX
      this.mapPos[0] = -(this.cameraPos[0] - this.drawPos[0]) - this.cameraThreshX
    }
    if (this.x < (this.cameraPos[0] - this.cameraThreshX)){
      this.cameraPos[0] = this.x + this.cameraThreshX
      this.mapPos[0] = -(this.cameraPos[0] - this.drawPos[0]) + this.cameraThreshX
    }

    if (this.y < (this.cameraPos[1] - this.cameraThreshY)){
      this.cameraPos[1] = this.y + this.cameraThreshY
      this.mapPos[1] = (this.cameraPos[1] - this.drawPos[1]) + this.cameraThreshY
    }
    if (this.y > (this.cameraPos[1] + this.cameraThreshY)){
      this.cameraPos[1] = this.y - this.cameraThreshY
      this.mapPos[1] = (this.cameraPos[1] - this.drawPos[1]) - this.cameraThreshY
    }
    

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
    this.drawMap()
    this.drawPlayer()
  }

}
