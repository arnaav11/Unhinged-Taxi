function circleCollider(x, y) {
    this.x =x;
    this.y = y;
    this.r = 48
    this.col = color(255);

    this.changeColor = function() {
        this.col = color(red);
    }

    this.intersects = function(other) {
        var d = dist(this.x, this.y, other.x, other.y);
        if (d < this.r + other.r) {
            return true;
        }
        else {
            return false;
        }
    }
    

    this.display = function() {
        stroke(255);
        fill(this.changeColor);
        ellipse(this.x, this.y, this.r * 2, this.r * 2 );

    }
}



// let collision;

// function setup() {
//     createCanvas(600, 600);
// }

// function draw() {
//     background(220);

//     collision = collideRectCircle(100, 100, 200, 100, mouseX, mouseY, 150);

//     console.log(collision);

//     //simulates building
//     rect(100,100,200,100);

//     //simulates car
//     ellipse(mouseX,mouseY,150);

//     if (collision) {
//         text("Press E to pick up client", mouseX+60, mouseY-50);
//             if(keyIsDown(69) == true) {
//                 fill('red');
//             }
//     }
// }
