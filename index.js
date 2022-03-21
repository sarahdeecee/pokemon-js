const canvas = document.querySelector('canvas');
// Create active area
const context = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

// Load map image
const image = new Image();
image.src = './assets/map.png'

// Load character sprite
const playerImage = new Image();
playerImage.src = './assets/playerDown.png';

class Sprite {
  constructor({position, velocity, image}) {
    this.position = position;
    this.image = image;
  }
  draw() {
    context.drawImage(this.image,this.position.x,this.position.y);
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

const background = new Sprite({
  position: {
    x: -209,
    y: -1130
  },
  image: image
})

const animate = () => {
  const velocity = 4;
  window.requestAnimationFrame(animate);
  background.draw();
  context.drawImage(playerImage,
    0, 0, playerImage.width/4, playerImage.height,
    (canvas.width/2 - (playerImage.width/4)/2),
    (canvas.height/2 - playerImage.height/2),
    playerImage.width/4, playerImage.height
  );

  if (keys.w.pressed && lastKey === 'w') {
    background.position.y += velocity;
  }
  if (keys.s.pressed && lastKey === 's') {
    background.position.y -= velocity;
  }
  if (keys.a.pressed && lastKey === 'a') {
    background.position.x += velocity;
  }
  if (keys.d.pressed && lastKey === 'd') {
    background.position.x -= velocity;
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