import AeronaveComercial from "./AeronaveComercial.js";

export default class AeronaveCarga extends AeronaveComercial {
  #pesoMax;

  constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCia, pesoMax) {
    super(prefixo, velocidadeCruzeiro, autonomia, nomeCia);
    this.#pesoMax = pesoMax;
  }

  get pesoMax() {
    return this.#pesoMax;
  }

  //verifica se o horário está dentro do permitido
  verificaHorario(horario) {
    let horariosPermitidos = [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
    ];
    for (let x of horario) {
      if (!x in horariosPermitidos) {
        return false;
      }
      return true;
    }
  }

  toString() {
    return super.toString() + `, Peso Máximo: ${this.#pesoMax}`;
  }
}
