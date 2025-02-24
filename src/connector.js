import Wire from "./wire.js";
import Draggable from "./draggable.js";
import engine from "./main.js";

export default class Connector extends Draggable {
  static RADIUS = 8;

  constructor(x, y, attachedCircuit) {
    super(x, y);
    this.attachedCircuit = attachedCircuit;
    
    this.wires = [];
    this.tempWire;
  
    this.connections = [];
    this.value = false;
  }

  propagateSignal(signal) {
    this.value = signal;
    for (let connection of this.connections) {
      connection.propagateSignal(signal);
    }

    if (this.attachedCircuit) {
      this.attachedCircuit.propagateSignal();
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
    let targetedConnector;
    for (const object of engine.objects) {
      targetedConnector = object.getConnectorOnPoint(x, y);

      if (targetedConnector) {
        this.connections.push(targetedConnector);
        const wire = new Wire(this.x, this.y, targetedConnector.x, targetedConnector.y);
        this.wires.push(wire);
        this.tempWire = null;
        return;
      }
    }

    this.tempWire = null;
  }

  dragTo(x, y) {
    this.tempWire = new Wire(this.x, this.y, x, y);
  }

  draw(ctx) {
    for (let wire of this.wires) {
      wire.draw(ctx, this.value);
    }

    if (this.tempWire) this.tempWire.draw(ctx, this.value);

    const color = '#000';
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, Connector.RADIUS, 0, 2 * Math.PI);
    ctx.fill();
  }
}
