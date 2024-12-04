class Taxi{ 

  // 1920 - 60, 1080 - 155
  constructor(x=-1809, y=-500, ang=0, angSpeed=0.01*Math.PI, speed=0, maxSpeed=6, accel=0, maxAccel=1, dAcc=0.01, friction=0.02, sizex=windowWidth*2, sizey=windowHeight*2, cameraSizeX=windowWidth, cameraSizeY=windowHeight, cameraThreshX=windowWidth/6, cameraThreshY=windowHeight/6, timer=30, totalLives=5){
    // Set initial properties (position, speed, size, camera, etc.)
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
    this.startHouse = 0
    this.DestHouse = 1
    this.totalLives = totalLives
    this.lives = totalLives
    this.reachedStart = false
    this.reachedDest = false
    this.timer = timer
    this.timerYes = true
    this.tick = 60
    this.score = 0
    this.drawCenter = [(-sizex/2)+(cameraSizeX/2), -(sizey/2)+(cameraSizeY/2)]
    mapImage.resize(sizex, sizey)  // Resize the map image to fit the screen
    this.drawPos = [this.drawCenter[0] + this.x - this.cameraPos[0],
                      this.drawCenter[1] - this.y + this.cameraPos[1]]

    this.scrollMap(true)  // Initial scroll
    this.chooseStart()  // Choose starting point for the taxi
    this.chooseDest()  // Choose destination point for the taxi

    this.dir = [Math.cos(this.ang), Math.sin(this.ang)]  // Calculate direction based on angle
    console.log(windowHeight, windowWidth)  // Log screen size for debugging
  }

  // Initialize/reset taxi properties (called in multiple places)
  init(x=-1809, y=-500, ang=0, angSpeed=0.01*Math.PI, speed=0, maxSpeed=6, accel=0, maxAccel=1, dAcc=0.01, friction=0.02, sizex=windowWidth*2, sizey=windowHeight*2, cameraSizeX=windowWidth, cameraSizeY=windowHeight, cameraThreshX=windowWidth/6, cameraThreshY=windowHeight/6, timer=30, totalLives=5){
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
    this.startHouse = 0
    this.DestHouse = 1
    this.reachedStart = false
    this.reachedDest = false
    this.timer = timer
    this.timerYes = true
    this.tick = 60
    this.score = 0
    this.totalLives = totalLives
    this.lives = totalLives
    this.drawCenter = [(-sizex/2)+(cameraSizeX/2), -(sizey/2)+(cameraSizeY/2)]
    mapImage.resize(sizex, sizey)  // Resize the map image to fit the screen
    this.drawPos = [this.drawCenter[0] + this.x - this.cameraPos[0],
                      this.drawCenter[1] - this.y + this.cameraPos[1]]

    this.scrollMap(true)  // Initial scroll
    this.chooseStart()  // Choose starting point for the taxi
    this.chooseDest()  // Choose destination point for the taxi

    this.dir = [Math.cos(this.ang), Math.sin(this.ang)]  // Calculate direction based on angle
    console.log(windowHeight, windowWidth)  // Log screen size for debugging
  }
  
  // Get current position of the taxi (x, y)
  getPos(){
    return [this.x, this.y]
  }

  // Preload the taxi's image (car)
  preloadPlayer(){
    this.img = loadImage("assets/car.png")
  }

  // Handle player input for movement (W, A, S, D keys)
  handleMovementInput(){
    let ws = false
    if (keyIsDown(65)){  // A key (left)
      this.ang -= this.angSpeed
    }
    if (keyIsDown(68)){  // D key (right)
      this.ang += this.angSpeed
    }
    if (keyIsDown(87)){  // W key (forward)
      this.accel += this.dAcc
      ws = true
    }
    if (keyIsDown(83)){  // S key (reverse)
      this.accel -= this.dAcc
      ws = true
    }

    this.speedCheck(ws)  // Adjust speed based on input
  }

  // Handle movement logic (apply speed, acceleration, etc.)
  handleMovement(){
    this.dir = [Math.cos(this.ang), Math.sin(this.ang)]  // Update direction

    let dx, dy;

    // Handle collision with walls (when taxi hits an obstacle)
    if (this.wall && this.speed > 0){
      this.speed = Math.min(this.speed, 1)  // Slow down if hitting wall
      if (this.accel > 0){
        this.accel = Math.min(this.accel, 0.1)  // Limit acceleration
      }
      else{
        this.accel = Math.max(this.accel, -0.1)
      }
    }
    else if (this.wall && this.speed < 0){
      this.speed = Math.max(this.speed, -1)  // Slow down if going backwards into wall
      if (this.accel > 0){
        this.accel = Math.min(this.accel, 0.1)
      }
      else{
        this.accel = Math.max(this.accel, -0.1)
      }
    }

    // Calculate new position based on speed and direction
    dx = this.dir[0]*this.speed
    dy = this.dir[1]*this.speed

    this.y -= dy
    this.x += dx

    // Update draw position for rendering
    this.drawPos[0] = this.drawCenter[0] + this.x - this.cameraPos[0]
    this.drawPos[1] = this.drawCenter[1] - this.y + this.cameraPos[1]

    this.worldBorderCheck()  // Check if taxi is out of bounds
    this.doCollisions()  // Check for collisions with houses
  }

  // Check if taxi is outside the world boundaries
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

    this.wall = false  // No collision
  }

  // Check speed limits and apply friction if no input is given
  speedCheck(wOrS){
    this.speed += this.accel  // Apply acceleration

    // Ensure speed doesn't exceed max speed
    if (this.speed > this.maxSpeed){
      this.speed = this.maxSpeed
    }
    else if (this.speed < -this.maxSpeed){
      this.speed = -this.maxSpeed
    }

    // Ensure acceleration is within limits
    if (this.accel > this.maxAccel){
      this.accel = this.maxAccel
    }
    else if (this.accel < -this.maxAccel){
      this.accel = -this.maxAccel
    }

    // Apply friction if no input is given
    if (!wOrS){
      if (this.speed > 0){
        this.speed -= this.friction
        if (this.speed < 0){
          this.speed = 0
        }
      }
      else if (this.speed < 0){
        this.speed += this.friction
        if (this.speed > 0){
          this.speed = 0
        }
      }
    }
  }

  // Display the taxi on the screen
  show(){
    imageMode(CENTER)
    image(this.img, this.drawPos[0], this.drawPos[1], 150, 75)  // Draw the taxi at its position
  }
}
