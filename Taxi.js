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
  img


  constructor(x=100, y=100, ang=0, angSpeed=0.01*Math.PI, speed=0, maxSpeed=3, accel=0, maxAccel=1, dAcc=0.01){
    this.img = loadImage("./assets/loadImage_0.png")
    this.ang = ang
    this.angSpeed = angSpeed
    this.speed = speed
    this.maxSpeed = maxSpeed
    this.accel = accel
    this.maxAccel = maxAccel
    this.dAcc = dAcc
    this.x = x
    this.y = y

    this.dir = [Math.cos(this.ang), Math.sin(this.ang)]
  }
  
  getPos(){
    return [this.x, this.y]
  }

  handleMovementInput(){
    if (keyIsDown(87)){
      this.accel += this.dAcc
      this.speedCheck(true)
    }
    if (keyIsDown(65)){
      this.ang -= this.angSpeed
      this.speedCheck(false)
    }
    if (keyIsDown(83)){
      this.accel -= this.dAcc
      this.speedCheck(true)
    }
    if (keyIsDown(68)){
      this.ang += this.angSpeed
      this.speedCheck(false)
    }
  
  }
  
  handleMovement(){
    this.dir = [Math.cos(this.ang), Math.sin(this.ang)]
  
    let dx = this.dir[0]*this.speed
    let dy = this.dir[1]*this.speed
    this.x += dx
    this.y += dy
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
  
  }
  
  setupPlayer() {
    removeElements()
    canvas = createCanvas(1000, 1000, WEBGL)
    angleMode(RADIANS)
    background(220)
    rectMode(CENTER)
  }

  drawPlayer() {

    // push();
    translate(this.x, this.y)
    rotate(this.ang)
    strokeWeight(0)
    rect(0, 0, 50, 50)
    texture(this.img);
    // pop()
  }
}
