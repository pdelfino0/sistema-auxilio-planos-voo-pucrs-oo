export default class Aerovia {
  #id;
  #origem;
  #destino;
  #tamanho;

  constructor(id, origem, destino, tamanho) {
    this.#id = id;
    this.#origem = origem;
    this.#destino = destino;
    this.#tamanho = tamanho;
  }

  get id() {
    return this.#id;
  }

  get origem() {
    return this.#origem;
  }

  get destino() {
    return this.#destino;
  }

  get tamanho() {
    return this.#tamanho;
  }

  toString() {
    return `Aerovia Id: ${this.id}, Origem: ${this.origem} - Destino: ${this.destino} - Tamanho: ${this.tamanho.trim()}Km.`;
  }
}
