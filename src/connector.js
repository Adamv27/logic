import Wire from "./wire.js";
import Draggable from "./draggable.js";

export default class Connector extends Draggable {
  static RADIUS = 8;

  constructor(x, y) {
    super(x, y);

    this.wire = new Wire(this.x, this.y, this.x, this.y);
  }
 
  containsPoint(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    const distance = Math.sqrt((dx ** 2) + (dy ** 2));
    return distance <= Connector.RADIUS;
  }

  handleEvent(event, x, y) {
    if (event.type == 'mouseup' && this.isDragging) {
      this.wire = new Wire(this.x, this.y, this.x, this.y);
    }

    super.handleEvent(event, x, y);
    return this.isDragging;
  }

  dragTo(x, y) {
    this.wire = new Wire(this.x, this.y, x, y);
  }

  draw(ctx) {
    this.wire.draw(ctx);
    const color = '#000';
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, Connector.RADIUS, 0, 2 * Math.PI);
    ctx.fill();
  }
}
