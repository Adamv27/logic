export default class Wire {
  constructor(startX, startY, endX, endY) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
  }

  draw(ctx) {
    ctx.moveTo(this.startX, this.startY);
    ctx.fillStyle = '#FF0000';
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
  }
}
