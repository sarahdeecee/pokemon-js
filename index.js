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

// Draw background image and character sprite
image.onload = () => {
  context.drawImage(image,-209,-1130);
  context.drawImage(playerImage,
    0, 0, playerImage.width/4, playerImage.height,
    (canvas.width/2 - (playerImage.width/4)/2),
    (canvas.height/2 - playerImage.height/2),
    playerImage.width/4, playerImage.height
  );
}

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      console.log('pressed w');
      
      break;
    case 'a':
      console.log('pressed a');
      
      break;
    case 's':
      console.log('pressed s');
      
      break;
    case 'd':
      console.log('pressed d');
      
      break;
  }
})