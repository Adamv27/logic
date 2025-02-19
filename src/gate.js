import Connector from "./connector.js";
import Draggable from "./draggable.js";

export default class Gate extends Draggable {
  constructor(x, y, width, numInputs, numOutputs) {
    super(x, y);
    this.width = width;

    this.numInputs = numInputs;
    this.numOutputs = numOutputs;

    const maxConnectorsOnSide = Math.max(numInputs, numOutputs);
    
    this.spacingPerConnector = 10;
    const heightOfConnectors = maxConnectorsOnSide * 2 * Connector.RADIUS;

    this.height = heightOfConnectors + this.spacingPerConnector * (maxConnectorsOnSide + 1); 
    this.color = "#0000FF";
    this.name = "GATE";
    
    this.inputs = [];
    let input;
    for (let i = 0; i < numInputs; i++) {
      input = new Connector(this.x, this.y); 
      this.inputs.push(input);
    }

    this.calculateConnectorSpacing();

    this.outputs = [];
  }

  propagateSignal() {
    
  }

  calculateConnectorSpacing() {
    let offsetY = this.spacingPerConnector + Connector.RADIUS;   
    this.inputs.forEach(input => {
      input.x = this.x;
      input.y = this.y + offsetY;
      
      offsetY += this.spacingPerConnector;
      offsetY += Connector.RADIUS * 2;
    })
  }

  dragTo(x, y) {
    super.dragTo(x, y);
    this.calculateConnectorSpacing();
  }

  handleEvent(event, x, y) {
    let allowDraggingCircuit = true;

    this.inputs.forEach(input => {
      const wireDragging = input.handleEvent(event, x, y);
      if (wireDragging) {
        allowDraggingCircuit = false;
      }
    });

    if (allowDraggingCircuit) {
      super.handleEvent(event, x, y);
    }
  }

  getConnectorOnPoint(x, y) {
    let targetedConnector;

    this.inputs.forEach(input => {
      if (input.containsPoint(x, y)) {
        targetedConnector = input;
      }
    });

    this.outputs.forEach(output => {
      if (output.containsPoint(x, y)) {
        targetedConnector = input; 
      }
    });

    return targetedConnector;
  }
  
  containsPoint(x, y) {
    return x >= this.x && x <= this.x + this.width
      && y >= this.y && y <= this.y + this.height;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    this.inputs.forEach(input => input.draw(ctx));
    this.outputs.forEach(output => output.draw(ctx));

    ctx.color = '#000';
    ctx.font = "16px serif"
    
    const textX = this.x + (this.width / 2) - 16;

    ctx.fillText(this.name, textX, this.y + this.height / 2 + 4);
  }
}
