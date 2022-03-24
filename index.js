const canvas = document.querySelector('canvas');
// Create active area
const context = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
const playerImageWidth = 192;
const playerImageHeight = 68;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i+= tilesWidth) {
  collisionsMap.push(collisions.slice(i, i + tilesWidth));
  console.log(collisionsMap);
}

const boundaries = [];
const offset = {
  x: -209,
  y: -1140
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
const backgroundImage = new Image();
backgroundImage.src = './assets/map.png'

// Load map foreground image
const foregroundImage = new Image();
foregroundImage.src = './assets/map-foreground.png'

// Load character sprite
const playerImage = new Image();
playerImage.src = './assets/playerDown.png';

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
  image: backgroundImage
})
const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: foregroundImage
})

// Move background and collisions together
const movables = [background, ...boundaries, foreground];

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

  })
  player.draw();
  foreground.draw();
  
  let moving = true;
  player.moving = false;
  if (keys.w.pressed && lastKey === 'w') {
    player.moving = true;
    for (let i = 0; i < boundaries.length; i++) {
      // Check for collision between sprite and north boundary
      const boundary = boundaries[i];
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {...boundary, position: {
          x: boundary.position.x,
          y: boundary.position.y + velocity
        }}
        })) {
        console.log('colliding');
        moving = false;
        break;
      }
    }

    if (moving) {
      movables.forEach(layer => layer.position.y += velocity);
    }
  }
  if (keys.s.pressed && lastKey === 's') {
    player.moving = true;
    for (let i = 0; i < boundaries.length; i++) {
      // Check for collision between sprite and south boundary
      const boundary = boundaries[i];
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {...boundary, position: {
          x: boundary.position.x,
          y: boundary.position.y - velocity
        }}
        })) {
        console.log('colliding');
        moving = false;
        break;
      }
    }

    if (moving) {
    movables.forEach(layer => layer.position.y -= velocity);
    }
  }
  if (keys.a.pressed && lastKey === 'a') {
    player.moving = true;
    for (let i = 0; i < boundaries.length; i++) {
      // Check for collision between sprite and east boundary
      const boundary = boundaries[i];
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {...boundary, position: {
          x: boundary.position.x + velocity,
          y: boundary.position.y
        }}
        })) {
        console.log('colliding');
        moving = false;
        break;
      }
    }

    if (moving) {
    movables.forEach(layer => layer.position.x += velocity);
    }
  }
  if (keys.d.pressed && lastKey === 'd') {
    player.moving = true;
    for (let i = 0; i < boundaries.length; i++) {
      // Check for collision between sprite and west boundary
      const boundary = boundaries[i];
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {...boundary, position: {
          x: boundary.position.x - velocity,
          y: boundary.position.y
        }}
        })) {
        console.log('colliding');
        moving = false;
        break;
      }
    }

    if (moving) {
    movables.forEach(layer => layer.position.x -= velocity);
    }
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