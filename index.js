const canvas = document.querySelector('canvas');
// Create active area
const context = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

// Import map image
const image = new Image();
image.src = './assets/map.png'
image.onload = () => {
  context.drawImage(image,-200,-1100)
}

const playerImage = new Image();
playerImage.src = 'assets/playerDown.png';