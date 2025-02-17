import Connector from "./connector.js";

export default class Toggle {
  constructor() {
    this.value = 0;
    this.x = 25;
    this.y = 100;
    this.radius = 20;

    this.isDragging = false;
    this.respondToClick = true;
    this.clickOffsetX = 0;
    this.clickOffsetY = 0;

    this.connector = new Connector(this.x + this.radius + 15, this.y);
  }

  output() {
    return this.value;
  }

  containsPoint(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    const distance = Math.sqrt((dx ** 2) + (dy ** 2));
    return distance <= this.radius || this.connector.containsPoint(x, y);
  }

  handleEvent(event, x, y) {
    if (this.connector.isDragging || this.connector.containsPoint(x, y)) {
      this.connector.handleEvent(event, x, y);
      return;
    } 


    if (this.isDragging && event.type == 'mousemove') {
      this.dragTo(x, y);
    }

    if (!this.containsPoint(x, y)) return;

    switch (event.type) {
      case 'click':
        if (this.respondToClick) {
          this.value = !this.value;
        }
        this.respondToClick = true;
        break;
      case 'mousedown':
        this.isDragging = true;
        this.clickOffsetX = this.x - x; 
        this.clickOffsetY = this.y - y;
        break;
      case 'mouseup':
        this.isDragging = false;
        break;
    }
  }
  
  dragTo(x, y) {
    this.respondToClick = false;
    this.x = x + this.clickOffsetX;
    this.y = y + this.clickOffsetY;

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
