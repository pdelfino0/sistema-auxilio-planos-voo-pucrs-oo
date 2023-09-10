import AeronaveComercial from "./AeronaveComercial.js";

export default class AeronaveParticular extends AeronaveComercial {
  #respManutencao;

  constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCia, respManutencao) {
    super(prefixo, velocidadeCruzeiro, autonomia, nomeCia);
    this.#respManutencao = respManutencao;
  }

  get respManutencao() {
    return this.#respManutencao;
  }

  toString() {
    return super.toString() + `, Responsável pela Manutenção: ${this.#respManutencao}`;
  }
}
