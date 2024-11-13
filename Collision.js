let worldObject = [100, 100];
let playerPos = [playerX.taxi, playerY.taxi];
let d = int(dist(worldObject, player));


function setup () {
    createCanvas(400, 400);
}

function draw() {
    background(220);
}

if (d <= 20) {
    console.log('interaction');
}