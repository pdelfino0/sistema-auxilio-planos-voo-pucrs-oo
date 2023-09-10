import Aeronave from "./Aeronave.js";
import { typedef } from "bycontract";

export default class AeronaveComercial extends Aeronave {
    #nomeCia;

    constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCia) {
        super(prefixo, velocidadeCruzeiro, autonomia);
        this.#nomeCia = nomeCia;
    }

    get nomeCia() {
        return this.#nomeCia;
    }

    toString() {
        return super.toString() + `, Nome da Companhia Aérea: ${this.#nomeCia}`;
    }

}