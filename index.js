const canvas = document.querySelector('canvas');
// Create active area
const context = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
const tilesWidth = 70;
const tileWidth = 12;
const tileHeight = 12;
const zoom = 4;
const playerImageWidth = 192;
const playerImageHeight = 68;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i+= tilesWidth) {
  collisionsMap.push(collisions.slice(i, i + tilesWidth));
  console.log(collisionsMap);
}

class Boundary {
  static width = tileWidth * zoom;
  static height = tileHeight * zoom;
  constructor({position}) {
    this.position = position;
    this.width = tileWidth * zoom;
    this.height = tileHeight * zoom;
  }
  
  draw() {
    context.fillStyle = 'red';
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const boundaries = [];
const offset = {
  x: -209,
  y: -1130
}
collisionsMap.forEach((row, rowIndex) => {
  row.forEach((symbol, symbolIndex) => {
    if (symbol === 1025) {
      boundaries.push(new Boundary({position: {
        x: symbolIndex * Boundary.width + offset.x,
        y: rowIndex * Boundary.height + offset.y
      }}))
    }
  })
})

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

// Load map image
const image = new Image();
image.src = './assets/map.png'

// Load character sprite
const playerImage = new Image();
playerImage.src = './assets/playerDown.png';

class Sprite {
  constructor({position, velocity, image, frames = {max: 1}}) {
    this.position = position;
    this.image = image;
    this.frames = frames;
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    }
  }
  draw() {
    // context.drawImage(this.image,this.position.x,this.position.y);
    context.drawImage(
      this.image,
      0, 0, this.image.width/this.frames.max, this.image.height,
      this.position.x,
      this.position.y,
      this.image.width/this.frames.max,
      this.image.height
    );
  }
}

const keys = {
  w: {
    pressed: false
  },
  s: {
    pressed: false
  },
  a: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

const player = new Sprite({
  position: {
    x: canvas.width/2 - (playerImageWidth/4)/2,
    y: canvas.height/2 - playerImageHeight/2,
  },
  image: playerImage,
  frames: {
    max: 4
  },
})
const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})


// Move background and collisions together
const movables = [background, ...boundaries];

//Check for collision
const rectangularCollision = ({rectangle1, rectangle2}) => {
  return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x
    && rectangle1.position.x <= rectangle2.position.x + rectangle2.width
    && rectangle1.position.y <= rectangle2.position.y + rectangle2.height
    && rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
};

const animate = () => {
  const velocity = 4;
  window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach(boundary => {
    boundary.draw();

    // Check for collision between sprite and boundaries
    if (rectangularCollision({
      rectangle1: player,
      rectangle2: boundary
      })) {
      console.log('colliding');
    }
  })
  player.draw();


  if (keys.w.pressed && lastKey === 'w') {
    movables.forEach(layer => layer.position.y += velocity);
  }
  if (keys.s.pressed && lastKey === 's') {
    movables.forEach(layer => layer.position.y -= velocity);
  }
  if (keys.a.pressed && lastKey === 'a') {
    movables.forEach(layer => layer.position.x += velocity);
  }
  if (keys.d.pressed && lastKey === 'd') {
    movables.forEach(layer => layer.position.x -= velocity);
  }
}
animate();

let lastKey = '';
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = true;
      lastKey = 'w';
      break;
    case 's':
      keys.s.pressed = true;
      lastKey = 's';
      break;
    case 'a':
      keys.a.pressed = true;
      lastKey = 'a';
      break;
    case 'd':
      keys.d.pressed = true;
      lastKey = 'd';
      break;
  }
  console.log(keys);
})
window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false;
      break;
    case 's':
      keys.s.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
  }
  console.log(keys);
})