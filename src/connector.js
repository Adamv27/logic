import Wire from "./wire.js";
import Draggable from "./draggable.js";

export default class Connector extends Draggable {
  constructor(x, y) {
    super(x, y);
    this.radius = 8;

    this.wire = new Wire(this.x, this.y, this.x, this.y);
  }
 
  containsPoint(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    const distance = Math.sqrt((dx ** 2) + (dy ** 2));
    return distance <= this.radius;
  }

  handleEvent(event, x, y) {
    if (!this.containsPoint(x, y) && event.type == 'mousedown') return;

    super.handleEvent(event, x, y);

    if (event.type == 'mouseup') {
      this.wire = new Wire(this.x, this.y, this.x, this.y);
    }
  }

  dragTo(x, y) {
    this.wire = new Wire(this.x, this.y, x, y);
  }

  draw(ctx) {
    this.wire.draw(ctx);
    const color = '#000';
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}
