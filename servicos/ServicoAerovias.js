import nReadlines from "n-readlines";
import Aerovia from "../Aerovia.js";
import { validate } from "bycontract";

export default class ServicoAerovias {
  #aerovias = [];

  // constructor(arquivo) {
  //   let linha;
  //   let dados = [];
  //   let buf = new nReadlines(arquivo);
  //   while ((linha = buf.next())) {
  //     dados = linha.toString("utf8").split(",");
  //     this.#aerovias.push(new Aerovia(dados[0], dados[1], dados[2], dados[3]));
  //   }
  // }

  constructor() {}

  async carregaAerovias(arquivo) {
    let linha;
    let dados = [];
    let buf = new nReadlines(arquivo);
    while ((linha = buf.next())) {
      dados = linha.toString("utf8").split(",");
      this.#aerovias.push(new Aerovia(dados[0], dados[1], dados[2], dados[3]));
    }
  }
  adiciona(aerovia) {
    this.#aerovias.push(aerovia);
  }

  //retorna todas as aerovias
  todas() {
    return this.#aerovias;
  }

  recupera(id) {
    return this.#aerovias.find((aerovia) => aerovia.id === id);
  }
}
