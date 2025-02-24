import Connector from "./connector.js";
import Draggable from "./draggable.js";

export default class Gate extends Draggable {
  constructor(x, y, numInputs, numOutputs) {
    super(x, y);
    this.width = 75;

    this.numInputs = numInputs;
    this.numOutputs = numOutputs;

    const maxConnectorsOnSide = Math.max(numInputs, numOutputs);
    
    this.spacingPerConnector = 10;
    const heightOfConnectors = maxConnectorsOnSide * 2 * Connector.RADIUS;

    this.height = heightOfConnectors + this.spacingPerConnector * (maxConnectorsOnSide + 1); 
    this.color = "#44AAFF";
    this.name = "GATE";
    
    this.inputs = [];
    this.outputs = [];

    let input, output;
    for (let i = 0; i < numInputs; i++) {
      input = new Connector(this.x, this.y, this); 
      this.inputs.push(input);
    }
    
    for (let i = 0; i < numOutputs; i++) {
      output = new Connector(this.x, this.y);
      this.outputs.push(output);
    }

    this.calculateConnectorSpacing();
  }

  propagateSignal() {
    
  }

  calculateConnectorSpacing() {
    let offsetY = this.spacingPerConnector + Connector.RADIUS;   
    for (const input of this.inputs) {
      input.x = this.x;
      input.y = this.y + offsetY;
      
      offsetY += this.spacingPerConnector;
      offsetY += Connector.RADIUS * 2;
    }

    for (const output of this.outputs) {
      output.x = this.x + this.width;
      output.y = this.y + (this.height / 2);
    }
  }

  dragTo(x, y) {
    super.dragTo(x, y);
    this.calculateConnectorSpacing();
  }

  handleEvent(event, x, y) {
    for (const input of this.inputs) {
      if (input.handleEvent(event, x, y)) return;
    }

    for (const output of this.outputs) {
      if (output.handleEvent(event, x, y)) return;
    }

    super.handleEvent(event, x, y);
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
