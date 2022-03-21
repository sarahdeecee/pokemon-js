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
  window.requestAnimationFrame(animate);
  background.draw();
  context.drawImage(playerImage,
    0, 0, playerImage.width/4, playerImage.height,
    (canvas.width/2 - (playerImage.width/4)/2),
    (canvas.height/2 - playerImage.height/2),
    playerImage.width/4, playerImage.height
  );

  if (keys.w.pressed) {
    background.position.y += 4;
  } else if (keys.s.pressed) {
    background.position.y -= 4;
  } else if (keys.a.pressed) {
    background.position.x += 4;
  } else if (keys.d.pressed) {
    background.position.x -= 4;
  }
}
animate();

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = true;
      break;
    case 's':
      keys.s.pressed = true;
      break;
    case 'a':
      keys.a.pressed = true;
      break;
    case 'd':
      keys.d.pressed = true;
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