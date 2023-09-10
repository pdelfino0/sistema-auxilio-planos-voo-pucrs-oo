import { validate } from "bycontract";

export default class Piloto {
  #matricula;
  #nome;
  #habilitacaoAtiva;

  constructor(matricula, nome, habilitacaoAtiva) {
    this.#matricula = matricula;
    this.#nome = nome;
    this.#habilitacaoAtiva = habilitacaoAtiva;
  }

  get matricula() {
    return this.#matricula;
  }

  get nome() {
    return this.#nome;
  }

  get habilitacaoAtiva() {
    return this.#habilitacaoAtiva;
  }

  toString() {
    return `Piloto Matrícula: ${this.#matricula}, Nome: ${
      this.#nome
    }, Habilitação Ativa: ${this.#habilitacaoAtiva}`;
  }
}
