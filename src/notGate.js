import Gate from "./gate.js";

export default class NotGate extends Gate {
  constructor(x, y) {
    super(x, y, 1, 1);
    this.color = "#DB5856";
    this.name = "NOT";
  }

  propagateSignal() {
    const connector0 = this.inputs[0];

    const output = this.outputs[0];
    output.propagateSignal(!connector0.value);
  }
}
