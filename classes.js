
// Constants
const tilesWidth = 70;
const tileWidth = 12;
const tileHeight = 12;
const zoom = 4;

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

class Boundary {
  static width = tileWidth * zoom;
  static height = tileHeight * zoom;
  constructor({position}) {
    this.position = position;
    this.width = tileWidth * zoom;
    this.height = tileHeight * zoom;
  }
  
  draw() {
    context.fillStyle = 'rgba(255,0,0,0)';
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}