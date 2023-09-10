import { validate } from "bycontract";
import PlanoDeVoo from "../PlanoDeVoo.js";

export default class ServicoPlanoDeVoo {
  #planosDeVoo;

  constructor() {
    this.#planosDeVoo = [];
  }

  //retorna todos os planos de voo
  todos() {
    return this.#planosDeVoo;
  }

  //retorna o plano de voo com o id informado
  recupera(id) {
    const planoEncontrado = this.#planosDeVoo.find(
      (planoDeVoo) => planoDeVoo.id === id
    );

    if (!planoEncontrado) {
      throw new Error(`Plano de voo com ID ${id} não encontrado.`);
    }

    return planoEncontrado;
  }

  //retorna o plano de voo com o id informado
  findOne(id) {
    for (let planoDeVoo of this.#planosDeVoo) {
      if (planoDeVoo.id === id) {
        return planoDeVoo;
      }
    }
  }

  //adiciona um plano de voo
  adiciona(planoDeVoo) {
    validate(planoDeVoo, PlanoDeVoo);
    this.#planosDeVoo.push(planoDeVoo);
  }

  //cancela o plano de voo com o id informado
  cancela(id) {
    const planoEncontrado = this.#planosDeVoo.find(
      (planoDeVoo) => planoDeVoo.id === id
    );

    if (!planoEncontrado) {
      throw new Error(`Plano de voo com ID ${id} não encontrado.`);
    }

    planoEncontrado.cancela();
  }
}
