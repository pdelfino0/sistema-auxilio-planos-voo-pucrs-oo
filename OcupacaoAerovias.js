export default class OcupacaoAerovia {
  #ocupacao = new Map();

  //retorna todas as altitudes ocupadas
  altitudesOcupadas(aeroviaId, dataParametro) {
    let altitudesOcupadas = [];
    this.#ocupacao.forEach((value, key) => {
      const [aerovia, data, altitude, slot] = key.split(" ");
      if (aerovia === aeroviaId && data === dataParametro) {
        let busy = {
          aerovia: aerovia,
          data: data,
          altitude: altitude,
        };
        altitudesOcupadas.push(busy);
      }
    });
    return altitudesOcupadas;
  }

  //retorna todos as ocupações
  todas() {
    return [...this.#ocupacao.keys()];
  }

  //retorna todas as altitudes livres
  altitudesLivres(aeroviaIdParametro, dataParametro, slotParametro) {
    let altitudes = [
      "25.000",
      "26.000",
      "27.000",
      "28.000",
      "29.000",
      "30.000",
      "31.000",
      "32.000",
      "33.000",
      "34.000",
      "35.000",
    ];
    this.#ocupacao.forEach((value, key) => {
      const [aerovia, data, altitude, slot] = key.split(" ");
      if (
        aerovia === aeroviaIdParametro &&
        data === dataParametro &&
        slot === slotParametro
      ) {
        altitudes.splice(altitudes.indexOf(altitude), 1)[0];
      }
    });
    for (const altitude of altitudes) {
      console.log(altitude + "\n");
    }
  }

  //ocupa o slot
  ocuparSlot(aeroviaId, data, altitude, slot) {
    const chave = `${aeroviaId} ${data} ${altitude} ${slot}`;
    this.#ocupacao.set(chave, true);
  }
  //libera o slot
  liberarSlot(aeroviaId, data, altitude, slot) {
    const chave = `${aeroviaId} ${data} ${altitude} ${slot}`;
    this.#ocupacao.delete(chave);
  }
  //verifica se o slot está ocupado
  isOcupado(aeroviaId, data, altitude, slot) {
    const chave = `${aeroviaId} ${data} ${altitude} ${slot}`;
    return this.#ocupacao.has(chave);
  }

  toString() {
    return [...this.#ocupacao.keys()].join(" \n");
  }
}
