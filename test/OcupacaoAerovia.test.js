import OcupacaoAerovia from "../OcupacaoAerovias.js";

describe("OcupacaoAerovia", () => {
  let ocupacaoAerovia;

  beforeEach(() => {
    ocupacaoAerovia = new OcupacaoAerovia();
  });

  it("deve ocupar e liberar um slot corretamente", () => {
    const aeroviaId = "A001";
    const data = "2023-09-15";
    const altitude = "30.000";
    const slot = "S001";

    // Verifique se o slot está inicialmente livre
    expect(ocupacaoAerovia.isOcupado(aeroviaId, data, altitude, slot)).toBe(
      false
    );

    // Ocupe o slot
    ocupacaoAerovia.ocuparSlot(aeroviaId, data, altitude, slot);

    // Verifique se o slot está ocupado
    expect(ocupacaoAerovia.isOcupado(aeroviaId, data, altitude, slot)).toBe(
      true
    );

    // Libere o slot
    ocupacaoAerovia.liberarSlot(aeroviaId, data, altitude, slot);

    // Verifique se o slot foi liberado
    expect(ocupacaoAerovia.isOcupado(aeroviaId, data, altitude, slot)).toBe(
      false
    );
  });

  it("deve retornar altitudes ocupadas corretamente", () => {
    const aeroviaId = "A002";
    const data = "2023-09-15";
    const altitude1 = "31.000";
    const altitude2 = "32.000";
    const slot = "S002";

    // Ocupe dois slots em altitudes diferentes
    ocupacaoAerovia.ocuparSlot(aeroviaId, data, altitude1, slot);
    ocupacaoAerovia.ocuparSlot(aeroviaId, data, altitude2, slot);

    // Verifique se as altitudes ocupadas são retornadas corretamente
    const altitudesOcupadas = ocupacaoAerovia.altitudesOcupadas(
      aeroviaId,
      data
    );
    expect(altitudesOcupadas).toHaveLength(2);
    expect(altitudesOcupadas).toContainEqual({
      aerovia: aeroviaId,
      data: data,
      altitude: altitude1,
    });
    expect(altitudesOcupadas).toContainEqual({
      aerovia: aeroviaId,
      data: data,
      altitude: altitude2,
    });
  });

  // Outros testes podem ser adicionados para outros métodos da classe
});
