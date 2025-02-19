import Gate from "./gate.js";

export default class AndGate extends Gate {
  constructor() {
    super(200, 75, 75, 2, 1);
    this.color = "#B2FBA5";
    this.name = "AND";
  }

  propagateSignal() {
    const input0 = this.inputs[0];
    const input1 = this.inputs[1];
    
    console.log(`OUTPUT: ${input0.value && input1.value}`);
  }
}
