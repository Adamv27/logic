import Gate from "./gate.js";

export default class XorGate extends Gate {
  constructor() {
    super(200, 350, 75, 2, 1);
    this.color = "#B49FDC";
    this.name = "XOR";
  }

  propagateSignal() {
    const connector0 = this.inputs[0];
    const connector1 = this.inputs[1];

    const output = this.outputs[0];
    output.propagateSignal(connector0.value != connector1.value);
  }
}
