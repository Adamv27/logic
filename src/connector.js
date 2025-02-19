import Wire from "./wire.js";
import Draggable from "./draggable.js";
import engine from "./main.js";

export default class Connector extends Draggable {
  static RADIUS = 8;

  constructor(x, y) {
    super(x, y);

    this.wire = new Wire(this.x, this.y, this.x, this.y);

    this.connectorConnectedTo;
    this.circuitConnectedTo;
    this.value = false;
  }

  propagateSignal(signal) {
    this.value = signal;
    if (this.connectorConnectedTo) {
      this.connectorConnectedTo.value = signal;
    }

    if (this.circuitConnectedTo) {
      this.circuitConnectedTo.propagateSignal();
    }
  } 
 
  containsPoint(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    const distance = Math.sqrt((dx ** 2) + (dy ** 2));
    return distance <= Connector.RADIUS;
  }

  handleEvent(event, x, y) {
    if (event.type == 'mouseup' && this.isDragging) {
      this.attemptConnection(x, y);
    }

    super.handleEvent(event, x, y);
    return this.isDragging;
  }

  attemptConnection(x, y) {
    let targetedConnector, targetedObject;
    for (const object of engine.objects) {
      targetedConnector = object.getConnectorOnPoint(x, y);
      targetedObject = object;

      if (targetedConnector) {
        this.connectorConnectedTo = targetedConnector;
        this.circuitConnectedTo = targetedObject;
        this.wire = new Wire(this.x, this.y, targetedConnector.x, targetedConnector.y);
        return;
      }
    }
    
    this.wire = new Wire(this.x, this.y, this.x, this.y);
  }

  dragTo(x, y) {
    this.wire = new Wire(this.x, this.y, x, y);
  }

  draw(ctx) {
    this.wire.draw(ctx, this.value);
    const color = '#000';
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, Connector.RADIUS, 0, 2 * Math.PI);
    ctx.fill();
  }
}
