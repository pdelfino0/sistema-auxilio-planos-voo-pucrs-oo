import AeronaveComercial from "./AeronaveComercial.js";

export default class AeronavePassageiros extends AeronaveComercial {
  #maxPassageiros;

  constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCia, maxPassageiros) {
    super(prefixo, velocidadeCruzeiro, autonomia, nomeCia);
    this.#maxPassageiros = maxPassageiros;
  }

  get maxPassageiros() {
    return this.#maxPassageiros;
  }

  toString() {
    return (
      super.toString() + `, Máximo de Passageiros: ${this.#maxPassageiros}`
    );
  }
}
