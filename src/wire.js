export default class Wire {
  constructor(startX, startY, endX, endY) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;

    this.arcRadius = 5;
  }

  draw(ctx) {
    if (this.startX == this.endX && this.startY == this.endY) return;
    
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#35181A";

    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    
    // Straight line to middle
    let x = (this.startX + this.endX) / 2;
    x -= this.arcRadius;
    let y = this.startY;
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // First arc
    if (this.startY < this.endY) {
      y += this.arcRadius;
      ctx.arc(x, y, this.arcRadius, 3 * Math.PI / 2, 0);
    } else {
      y -= this.arcRadius;
      ctx.arc(x, y, this.arcRadius, Math.PI / 2, 0, 1);
    }

    // Vertical line
    x += this.arcRadius;
    ctx.lineTo(x, y);
    
    // Second arc
    x += this.arcRadius;
    
    if (this.startY < this.endY) {
      y = this.endY - this.arcRadius;
      ctx.arc(x, y, this.arcRadius, Math.PI, Math.PI / 2, 1);
    } else {
      y = this.endY + this.arcRadius;
      ctx.arc(x, y, this.arcRadius, Math.PI, 3 * Math.PI / 2);
    }
    
    // Straight line to end
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();

    
  }
}
