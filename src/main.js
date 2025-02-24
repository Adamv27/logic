import Gate from "./gate.js";
import AndGate from "./andGate.js";
import NotGate from "./notGate.js";
import OrGate from "./orGate.js";
import Output from "./output.js";
import Toggle from "./toggle.js";
import { eventPosToCanvas } from "./util.js";
import XorGate from "./xorGate.js";

class Engine {
  constructor() {
    this.canvas = document.getElementById("logic-canvas")
    this.canvas.width = Math.min(window.innerWidth - 40, 1600);
    this.canvas.height = window.innerHeight - 100;
    this.ctx = this.canvas.getContext("2d");

    this.objects = [];

    let toggle = new Toggle(25, 75);
    this.objects.push(toggle);
    toggle = new Toggle(25, 150);
    this.objects.push(toggle);

    const and = new AndGate(200, 75);
    this.objects.push(and);

    const or = new OrGate(200, 175);
    this.objects.push(or);

    const not = new NotGate(200, 275); 
    this.objects.push(not);

    const xor = new XorGate(200, 350);
    this.objects.push(xor);
    
    const output = new Output(400, 200);
    this.objects.push(output);
    
    this.draw();
  }

  createCircuit() {
    const name = document.getElementById("circuit-name").value;
    
    const inputs = this.objects.filter((object) => {
      return object instanceof Toggle;
    });

    const outputs = this.objects.filter((object) => {
      return object instanceof Output;
    });
 
    const numInputs = inputs.length;
    const numOutputs = outputs.length; 
    const gate = new Gate(200, 200, numInputs, numOutputs);

    inputs.sort((a, b) => a.y - b.y);

    console.log(inputs);
    outputs.sort((a, b) => a.y - b.y);

    for (let i = 0; i < numInputs; i++) {
      gate.inputs[i].connections.push(inputs[i].connector);
    }
    
    for (let i = 0; i < numOutputs; i++) {
      outputs[i].connector.connections.push(gate.outputs[i]);
    }

    
    gate.name = name;
    this.objects = [];
    this.objects.push(gate);

    this.draw();
  }

  handleEvent(event) {
    const [x, y] = eventPosToCanvas(this.canvas, event);

    this.objects.forEach(object => object.handleEvent(event, x, y))

    engine.draw();
  }
      
  draw() {
    this.ctx.fillStyle = "#505050";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.objects.forEach(object => object.draw(this.ctx));
  }
}


const engine = new Engine();
engine.canvas.addEventListener("mousedown", e=>engine.handleEvent(e));
engine.canvas.addEventListener("mouseup", e=>engine.handleEvent(e));
engine.canvas.addEventListener("mousemove", e=>engine.handleEvent(e));
engine.canvas.addEventListener("click", e=>engine.handleEvent(e));

document.getElementById("create-input").addEventListener("click", () => {
  const toggle = new Toggle(25, 10);
  engine.objects.push(toggle);
  engine.draw();
})

document.getElementById("create-and").addEventListener("click", () => {
  const andGate = new AndGate(engine.canvas.width / 2, 50);
  engine.objects.push(andGate);
  engine.draw();
})

document.getElementById("create-or").addEventListener("click", () => {
  const orGate = new OrGate(engine.canvas.width / 2, 50);
  engine.objects.push(orGate);
  engine.draw();
})

document.getElementById("create-xor").addEventListener("click", () => {
  const xorGate = new XorGate(engine.canvas.width / 2, 50);
  engine.objects.push(xorGate);
  engine.draw();
})

document.getElementById("create-not").addEventListener("click", () => {
  const notGate = new NotGate(engine.canvas.width / 2, 50);
  engine.objects.push(notGate);
  engine.draw();
})

document.getElementById("create-output").addEventListener("click", () => {
  const output = new Output(engine.canvas.width * 0.75, 50);
  engine.objects.push(output);
  engine.draw();
})

document.getElementById("create-circuit").addEventListener("click", () => {
  engine.createCircuit();
})


export default engine;
