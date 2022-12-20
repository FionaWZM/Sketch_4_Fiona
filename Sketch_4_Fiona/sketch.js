//image sources:
//background image: https://www.pinterest.com/pin/145663369209786046/
//other images: https://www.boredpanda.com/screens-stealing-soul-social-media-sur-fake-antoine-geiger/?utm_source=google&utm_medium=organic&utm_campaign=organic

let layer1Image; 
let layer2ImageList = [];
let layer3ImageList = [];

let layer2MyImageList = [];
let layer3MyImageList = [];

class MyImage {
  constructor({ img, pos, type }) {
    this.img = img;
    this.pos = pos;

    this.rate = img.width > 500 ? 0.2 : 1;
    this.rate = img.height > 500 ? 0.2 : 1;

    this.type = type;

    this.vec = p5.Vector.random2D(); // Randomly generate a vector (direction)
  }

  update() {
    if (this.type == "move") {
      this.pos.add(this.vec);

      // Determine if x reaches the right side of the canvas
      if (this.pos.x >= width - this.img.width) {
        this.vec.x *= -1;
      }
      // Determine if x reaches the left side of the canvas
      if (this.pos.x <= 0) {
        this.vec.x = abs(this.vec.x);
      }

      // Determine if x reaches the bottom edge of the canvas
      if (this.pos.y >= height - this.img.height) {
        this.vec.y *= -1;
      }

      // Determine if x reaches the uppermost edge of the canvas
      if (this.pos.y <= 0) {
        this.vec.y = abs(this.vec.y);
      }
    }
  }

  draw() {
    // 
    image(
      this.img,
      this.pos.x,
      this.pos.y,
      this.img.width * this.rate,
      this.img.height * this.rate
    );
  }
}

function preload() {
  layer1Image = loadImage("layer01_01.JPG");

  for (let i = 1; i <= 8; i++) {
    layer2ImageList.push({
      type: i < 5 ? "move" : "stop",
      img: loadImage(`layer02_${i < 10 ? `0${i}` : i}.png`),
    });
  }
  for (let i = 1; i <= 2; i++) {
    layer3ImageList.push({
      type: i < 5 ? "move" : "stop",
      img: loadImage(`layer03_${i < 10 ? `0${i}` : i}.png`),
    });
  }
}

function setup() {
  createCanvas(954, 1428);
  image(layer1Image, 0, 0);

  for (let i = 0; i < 10; i++) {
    const item = random(layer2ImageList);
    layer2MyImageList.push(
      new MyImage({
        type: item.type,
        img: item.img,
        pos: createVector(random(0, width - 500), random(0, height - 500)),
      })
    );
  }
  for (let i = 0; i < 3; i++) {
    const item = random(layer3ImageList);
    layer3MyImageList.push(
      new MyImage({
        type: "move",
        img: item.img,
        pos: createVector(random(0, width - 500), random(0, height - 500)),
      })
    );
  }
}

function draw() {
  image(layer1Image, 0, 0);
  for (let item of layer2MyImageList) {
    item.update();
    item.draw();
  }
  for (let item of layer3MyImageList) {
    item.update();
    item.draw();
  }
}
