import Toggle from "./toggle.js";
import { eventPosToCanvas } from "./util.js";

class Engine {
  constructor() {
    this.canvas = document.getElementById("logic-canvas")
    this.canvas.width = 1600;
    this.canvas.height = 900;
    this.ctx = this.canvas.getContext("2d");

    this.objects = [];

    const toggle = new Toggle();
    this.objects.push(toggle);
    this.draw();
  }

  handleEvent(event) {
    const [x, y] = eventPosToCanvas(this.canvas, event);

    this.objects.forEach(object => object.handleEvent(event, x, y))

    engine.draw();
  }
      
  draw() {
    this.ctx.fillStyle = "#363636";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.objects.forEach(object => object.draw(this.ctx));
  }
}


const engine = new Engine();
engine.canvas.addEventListener("mousedown", e=>engine.handleEvent(e));
engine.canvas.addEventListener("mouseup", e=>engine.handleEvent(e));
engine.canvas.addEventListener("mousemove", e=>engine.handleEvent(e));
engine.canvas.addEventListener("click", e=>engine.handleEvent(e));

document.getElementById("create-input").addEventListener("click", e=> {
  const toggle = new Toggle();
  engine.objects.push(toggle);
  engine.draw();
})
