export default class Aeronave {
  #prefixo;
  #velocidadeCruzeiro;
  #autonomia;

  constructor(prefixo, velocidadeCruzeiro, autonomia) {
    this.#prefixo = prefixo;
    this.#velocidadeCruzeiro = velocidadeCruzeiro;
    this.#autonomia = autonomia;
  }

  get prefixo() {
    return this.#prefixo;
  }

  get velocidadeCruzeiro() {
    return this.#velocidadeCruzeiro;
  }

  get autonomia() {
    return this.#autonomia;
  }

  toString() {
    return `Aeronave Prefixo: ${this.#prefixo}, Velocidade de Cruzeiro: ${
      this.#velocidadeCruzeiro
    }, Autonomia: ${this.#autonomia}`;
  }

}
