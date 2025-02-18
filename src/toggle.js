import Connector from "./connector.js";
import Draggable from "./draggable.js";

export default class Toggle extends Draggable {
  constructor() {
    super(25, 100);
    this.value = 0;
    this.radius = 20;
 
    this.connector = new Connector(this.x + this.radius + 15, this.y);
  }

  output() {
    return this.value;
  }

  containsPoint(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    const distance = Math.sqrt((dx ** 2) + (dy ** 2));
    return distance <= this.radius;
  }

  handleEvent(event, x, y) {
    this.connector.handleEvent(event, x, y);
    
    if (!this.containsPoint(x, y)) return;

    super.handleEvent(event, x, y);

    if (event.type == 'click') {
      if (this.respondToClick) {
        this.value = !this.value;
      }
      this.respondToClick = true;
    }
  }
  
  dragTo(x, y) {
    super.dragTo(x, y);
    this.connector.x = this.x + this.radius + 15; 
    this.connector.y = this.y;
  }


  draw(ctx) {
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.connector.x, this.y);
    ctx.stroke();

    this.connector.draw(ctx);

    const color = this.value == 0 ? "#35181A" : "#ff6961";
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill(); 
  }
}
