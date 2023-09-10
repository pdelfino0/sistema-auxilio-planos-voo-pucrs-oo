import ServicoAerovias from "../servicos/ServicoAerovias.js";
import Aerovia from "../Aerovia";

describe("ServicoAerovias", () => {
  let sAerovia; // Mova a declaração para fora do beforeEach

  beforeEach(() => {
    sAerovia = new ServicoAerovias(); // Corrija a criação do serviço
    sAerovia.adiciona(new Aerovia(1, "A", "B", 100));
    sAerovia.adiciona(new Aerovia(2, "B", "C", 200));
    sAerovia.adiciona(new Aerovia(3, "C", "F", 300));
    sAerovia.adiciona(new Aerovia(4, "D", "L", 400));
  });

  it("deve retornar todas as aerovias", () => {
    const todasAerovias = sAerovia.todas();

    expect(todasAerovias).toHaveLength(4);
    expect(todasAerovias.map((aerovia) => aerovia.id)).toEqual([1, 2, 3, 4]);
  });

  it("deve recuperar uma aerovia pelo ID", () => {
    const aerovia = sAerovia.recupera(1);

    expect(aerovia).toMatchObject({
      id: 1, // Corrija o tipo para número
      origem: "A",
      destino: "B",
      tamanho: 100, // Corrija o tipo para número
    });
  });

  it("deve retornar undefined quando tentar recuperar uma aerovia inexistente", () => {
    const aerovia = sAerovia.recupera(5); // Use um ID que não exista

    expect(aerovia).toBeUndefined();
  });
});
