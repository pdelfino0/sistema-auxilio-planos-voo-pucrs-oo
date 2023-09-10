import nReadlines from "n-readlines";
import { validate } from "bycontract";
import Piloto from "../Piloto.js";

export default class ServicoPiloto {
  #pilotos = [];

  // constructor(arquivo) {
  //   let linha;
  //   let dados = [];
  //   let buf = new nReadlines(arquivo);
  //   while ((linha = buf.next())) {
  //     dados = linha.toString("utf8").split(",");
  //     let bool;
  //     if (Number(dados[2]) === 1) {
  //       bool = true;
  //     } else {
  //       bool = false;
  //     }
  //     this.#pilotos.push(new Piloto(dados[0], dados[1], bool));
  //   }
  // }

  constructor(){

  }

  async carregaPilotos(arquivo) {
    let linha;
    let dados = [];
    let buf = new nReadlines(arquivo);
    while ((linha = buf.next())) {
      dados = linha.toString("utf8").split(",");
      let bool;
      if (Number(dados[2]) === 1) {
        bool = true;
      } else {
        bool = false;
      }
      this.#pilotos.push(new Piloto(dados[0], dados[1], bool));
    }
  }

  adiciona(piloto) {
    validate(piloto, Piloto);
    this.#pilotos.push(piloto);
  }
  //retorna todos os pilotos
  todos() {
    return this.#pilotos;
  }

  //retorna o piloto com a matrícula informada
  recuperarPiloto(matriculaPiloto) {
    validate(matriculaPiloto, "String");
    if (!this.#pilotos.find((piloto) => piloto.matricula === matriculaPiloto)) {
      throw new Error("Piloto não encontrado. Tente novamente\n");
    }
    return this.#pilotos.find((piloto) => piloto.matricula === matriculaPiloto);
  }

  //verifica se a matrícula do piloto existe e se a habilitação está ativa
  verificaMatriculaPiloto(matriculaPiloto) {
    validate(matriculaPiloto, "String");
    for (let piloto of this.#pilotos) {
      if (piloto.matricula == matriculaPiloto) {
        if (piloto.habilitacaoAtiva) {
          console.log("Verificação da matrícula do piloto: OK. \n");
          return true; // A matrícula corresponde e a habilitação está ativa
        } else
          throw new Error(
            "\nPiloto não habilitado ou habilitação vencida. Escolha outro\n"
          );
      }
    }
    throw new Error("Piloto não encontrado. Tente novamente\n");
  }
}
