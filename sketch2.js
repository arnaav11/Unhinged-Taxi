var gameObject = [];
var player;
timer = 60;
value = 0;
isTouching = false;

function setup() {
    createCanvas(600, 600);

}

function draw() {
    background(220);

    ellipse(50, 50, 80, 80)
    ellipse(mouseX,mouseY,150);

    playerCollider = new circleCollider(mouseX,mouseY);
    gameObject [0] = new circleCollider(50,50);

    for (i=0; i < gameObject.length; ++i) {
        if (playerCollider.intersects(gameObject[i])) {
            isTouching = true;
            text("Press E to pick up client", mouseX+60, mouseY-50);
            if(value == 1) {
                text(timer, 400, 50);
                if (frameCount % 60 == 0 && timer > 0) {
                    timer--;
                }
            }
        }
    }



    // var d = dist(playerCollider.x, playerCollider.y, npcCollider.x, npcCollider.y);

    // if (d < playerCollider.r + npcCollider.r) {
    //     text("Press E to pick up client", mouseX+60, mouseY-50);
    //         if(keyIsDown(69) == true) {
    //             fill('red');
    //         }
    // }


}

function keyPressed() {
    if (isTouching) {
        if (key === 'e') {
            value = 1;
          } 
    }
  }