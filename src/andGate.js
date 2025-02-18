import Connector from "./connector.js";
import Gate from "./gate.js";

export default class AndGate extends Gate {
  constructor() {
    super(200, 75, 75, 2, 1);
    this.color = "#B2FBA5";
    this.name = "AND";

  }
}
