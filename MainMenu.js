let img;

function preload() {
    img = createImg('pixel_city_4k_3.png');
}

function setup() {
    createCanvas(400, 400);
}

function draw() {
  background(220);
  img.position(100, 100)
  img.size(150, 150)
  image(img, 5, 5);
  noLoop();
}