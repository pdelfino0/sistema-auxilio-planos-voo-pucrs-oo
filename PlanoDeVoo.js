export default class PlanoDeVoo {
  static idGenerator = 1;

  #id;
  #matriculaPiloto;
  #prefixoAeronave;
  #data;
  #horario;
  #idAerovia;
  #altitude;
  #slots = [];
  #cancelado;

  constructor(
    matriculaPiloto,
    prefixoAeronave,
    data,
    horario,
    idAerovia,
    altitude,
    slots
  ) {
    this.#id = PlanoDeVoo.idGenerator++;
    this.#matriculaPiloto = matriculaPiloto;
    this.#prefixoAeronave = prefixoAeronave;
    this.#data = data;
    this.#horario = horario;
    this.#idAerovia = idAerovia;
    this.#altitude = altitude;
    this.#cancelado = false;
    this.#slots.push(slots);
  }

  get id() {
    return this.#id;
  }

  get matriculaPiloto() {
    return this.#matriculaPiloto;
  }

  get prefixoAeronave() {
    return this.#prefixoAeronave;
  }

  get data() {
    return this.#data;
  }

  get horario() {
    return this.#horario;
  }

  get idAerovia() {
    return this.#idAerovia;
  }

  get altitude() {
    return this.#altitude;
  }

  get slots() {
    return this.#slots;
  }

  get cancelado() {
    return this.#cancelado;
  }

  //cancela o plano de voo
  cancela() {
    this.#cancelado = true;
  }

  toString() {
    return `Plano de Voo Id: ${this.#id} - Matrícula do Piloto: ${
      this.#matriculaPiloto
    }, Prefixo da Aeronave: ${this.#prefixoAeronave}, Data: ${
      this.#data
    }, Horário: ${this.#horario}, ID da Aerovia: ${
      this.#idAerovia
    }, Altitude: ${this.#altitude}, Slots: ${this.#slots}, Cancelado: ${
      this.#cancelado
    }`;
  }
}
