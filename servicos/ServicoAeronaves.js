import nReadlines from "n-readlines";
import AeronavePassageiros from "../AeronavesPassageiros.js";
import AeronaveCarga from "../AeronaveCarga.js";
import AeronaveParticular from "../AeronaveParticular.js";

export default class ServicoAeronaves {
  #aeronaves = [];

  constructor() {}

  //retorna todas as aeronaves
  todas() {
    return this.#aeronaves;
  }

  //retorna a aeronave com o prefixo informado
  recupera(prefixo) {
    if (!this.#aeronaves.find((aeronave) => aeronave.prefixo === prefixo)) {
      throw new Error("Aeronave não encontrada. Tente novamente");
    }
    return this.#aeronaves.find(
      (aeronave) => aeronave.prefixo === aeronave.prefixo
    );
  }

  //instancia as aeronaves de acordo com o tipo
  async adicionaAeronavesCarga(arquivo) {
    let linha;
    let dados = [];
    let buf = new nReadlines(arquivo);
    buf.next();
    while ((linha = buf.next())) {
      dados = linha.toString("utf8").split(",");
      this.#aeronaves.push(
        new AeronaveCarga(dados[0], dados[1], dados[2], dados[3], dados[4])
      );
    }
  }
  //instancia as aeronaves de acordo com o tipo
  async adicionaAeronavesPassageiros(arquivo) {
    let linha;
    let dados = [];
    let buf = new nReadlines(arquivo);
    buf.next();
    while ((linha = buf.next())) {
      dados = linha.toString("utf8").split(",");
      this.#aeronaves.push(
        new AeronavePassageiros(
          dados[0],
          dados[1],
          dados[2],
          dados[3],
          dados[4]
        )
      );
    }
  }

  //instancia as aeronaves de acordo com o tipo
  async adicionaAeronavesParticulares(arquivo) {
    let linha;
    let dados = [];
    let buf = new nReadlines(arquivo);
    buf.next();
    while ((linha = buf.next())) {
      dados = linha.toString("utf8").split(",");
      this.#aeronaves.push(
        new AeronaveParticular(dados[0], dados[1], dados[2], dados[3], dados[4])
      );
    }
  }

  adiciona(aeronave) {
    this.#aeronaves.push(aeronave);
  }

  toString() {
    let resultado = "";
    for (let aeronave of this.#aeronaves) {
      resultado += aeronave.toString() + "\n";
    }
    return resultado;
  }
}
