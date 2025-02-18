export default class Draggable {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.isDragging = false;
    this.respondToClick = true;
    this.clickOffsetX = 0;
    this.clickOffsetY = 0;
  }

  containsPoint(x, y) {
    return false;
  }

  handleEvent(event, x, y) {
    switch (event.type) {
      case 'mousedown':
        if (!this.containsPoint(x, y)) return;
        this.isDragging = true;
        this.clickOffsetX = this.x - x; 
        this.clickOffsetY = this.y - y;
        break;
      case 'mouseup':
        this.isDragging = false;
        break;
      case 'mousemove':
        if (this.isDragging) {
          this.dragTo(x, y);
        }
        break;
    }
  }  

  dragTo(x, y) {
    this.respondToClick = false;
    this.x = x + this.clickOffsetX;
    this.y = y + this.clickOffsetY;
  }
}
