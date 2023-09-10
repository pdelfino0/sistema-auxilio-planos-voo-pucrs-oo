import ServicoPiloto from "../servicos/ServicoPiloto";
import Piloto from "../Piloto";

describe("ServicoPiloto", () => {
  let sPiloto;

  beforeEach(() => {
    sPiloto = new ServicoPiloto();
    sPiloto.adiciona(new Piloto("123", "João", true));
    sPiloto.adiciona(new Piloto("456", "Maria", false));
    sPiloto.adiciona(new Piloto("789", "José", true));
  });

  test("deve retornar todos os pilotos", () => {
    const todosPilotos = sPiloto.todos();

    expect(todosPilotos).toHaveLength(3);
    expect(todosPilotos.map((piloto) => piloto.matricula)).toEqual([
      "123",
      "456",
      "789",
    ]);
  });

  test("deve recuperar um piloto pela matrícula", () => {
    const piloto = sPiloto.recuperarPiloto("123");

    expect(piloto).toMatchObject({
      matricula: "123",
      nome: "João",
      habilitacaoAtiva: true,
    });
  });

  test("deve verificar se a matrícula do piloto existe e se a habilitação está ativa", () => {
    const piloto = sPiloto.recuperarPiloto("123");

    const state = piloto.habilitacaoAtiva;
    expect(state).toBe(true);
  });

  test("deve retornar false quando tentar verificar uma matrícula vencida", () => {
    const piloto = sPiloto.recuperarPiloto("456");
    const state = piloto.habilitacaoAtiva;
    expect(state).toBe(false);
  });

  it("deve retornar uma exceção ao tentar recuperar um piloto inexistente", () => {
    expect(() => sPiloto.recuperarPiloto("000")).toThrow(
      "Piloto não encontrado. Tente novamente"
    );
  });
});
