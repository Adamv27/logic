import Draggable from "./draggable.js";
import Connector from "./connector.js";

export default class Output extends Draggable {
  constructor(x, y) {
    super(x, y);

    this.radius = 20;
    this.connector = new Connector(this.x - this.radius - 15, this.y, this);
    this.value = false;
  }      

  propagateSignal() {
    this.value = this.connector.value;
  }

  getConnectorOnPoint(x, y) {
    if (this.connector.containsPoint(x, y)) {
      return this.connector;
    }
  }

  containsPoint(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    const distance = Math.sqrt((dx ** 2) + (dy ** 2));
    return distance <= this.radius;
  }

  dragTo(x, y) {
    super.dragTo(x, y);
    this.connector.x = this.x - this.radius - 15; 
    this.connector.y = this.y;
  }

  draw(ctx) {
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.connector.x, this.y);
    ctx.stroke();

    this.connector.draw(ctx);

    const color = this.value ? "#ff6961" : "#35181A";
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill(); 
  }
}
