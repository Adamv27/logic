import Wire from "./wire.js";

export default class Connector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 8;
    this.isDragging = false;

    this.wire = new Wire(this.x, this.y, this.x, this.y);
  }
 
  containsPoint(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    const distance = Math.sqrt((dx ** 2) + (dy ** 2));
    return distance <= this.radius;
  }

  handleEvent(event, x, y) {
    switch (event.type) {
      case 'mousedown':
        this.isDragging = true;
        break;
      case 'mouseup':
        this.isDragging = false;
        this.wire = new Wire(this.x, this.y, this.x, this.y);
        break;
      case 'mousemove':
        if (this.isDragging) {
          this.dragTo(x, y);
        }
        break;
    }
  }

  dragTo(x, y) {
    this.wire = new Wire(this.x, this.y, x, y);
  }


  draw(ctx) {
    this.wire.draw(ctx);
    const color = '#000';
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();

  }
}
