import { gerarHorarios } from "../servicos/funcoesAuxiliares.js";

describe("gerarHorarios", () => {
  it("deve gerar os horários corretamente com horário inicial 08:00 e quantidade 3", () => {
    const horarios = gerarHorarios("08:00", 3);
    expect(horarios).toEqual(["08:00", "09:00", "10:00"]);
  });

  it("deve gerar os horários corretamente com horário inicial 22:00 e quantidade 5", () => {
    const horarios = gerarHorarios("22:00", 5);
    expect(horarios).toEqual(["22:00", "23:00", "00:00", "01:00", "02:00"]);
  });
});
