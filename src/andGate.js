import Gate from "./gate.js";

export default class AndGate extends Gate {
  constructor(x, y) {
    super(x, y, 2, 1);
    this.color = "#B2FBA5";
    this.name = "AND";
  }

  propagateSignal() {
    const connector0 = this.inputs[0];
    const connector1 = this.inputs[1];

    const output = this.outputs[0];
    output.propagateSignal(connector0.value && connector1.value);
  }
}
