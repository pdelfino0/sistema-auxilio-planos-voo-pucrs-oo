import Aeronave from "../Aeronave";
import ServicoAeronaves from "../servicos/ServicoAeronaves.js";
import AeronaveCarga from "../AeronaveCarga.js";
import AeronavePassageiros from "../AeronavesPassageiros.js";
import AeronaveParticular from "../AeronaveParticular.js";

describe("ServicoAeronaves", () => {
  let sAeronave;

  beforeEach(() => {
    sAeronave = new ServicoAeronaves();
    sAeronave.adiciona(new Aeronave("AERO1", 800, 1200));
    sAeronave.adiciona(new Aeronave("AERO2", 1000, 1500));
    //AeronaveCarga(prefixo: any, velocidadeCruzeiro: any, autonomia: any, nomeCia: any, pesoMax: any)
    sAeronave.adiciona(new AeronaveCarga("AERO3", 1200, 2000, "Cia1", 1000));
    //prefixo: any, velocidadeCruzeiro: any, autonomia: any, nomeCia: any, maxPassageiros: any
    sAeronave.adiciona(
      new AeronavePassageiros("AERO4", 1200, 2000, "Cia2", 1000)
    );
    sAeronave.adiciona(
      new AeronaveParticular("AERO5", 1200, 2000, "Cia3", "João")
    );
  });

  test("deve retornar todas as aeronaves", () => {
    const todasAeronaves = sAeronave.todas();

    expect(todasAeronaves).toHaveLength(5);
    expect(todasAeronaves.map((aeronave) => aeronave.prefixo)).toEqual([
      "AERO1",
      "AERO2",
      "AERO3",
      "AERO4",
      "AERO5",
    ]);
  });

  test("deve recuperar uma aeronave pelo prefixo", () => {
    const aeronave = sAeronave.recupera("AERO1");

    expect(aeronave).toMatchObject({
      prefixo: "AERO1",
      velocidadeCruzeiro: 800,
      autonomia: 1200,
    });
  });

  test("deve lançar uma exceção ao tentar recuperar uma aeronave inexistente", () => {
    expect(() => sAeronave.recupera("AERO6")).toThrow(
      "Aeronave não encontrada. Tente novamente"
    );
  });
});
