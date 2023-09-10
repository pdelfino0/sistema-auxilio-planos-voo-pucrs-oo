import ServicoPlanoDeVoo from "../servicos/ServicoPlanoDeVoo.js"; // Substitua pelo caminho correto para o seu arquivo ServicoPlanoDeVoo.js
import PlanoDeVoo from "../PlanoDeVoo.js"; // Substitua pelo caminho correto para o seu arquivo PlanoDeVoo.js

describe("ServicoPlanoDeVoo", () => {
  let servicoPlanoDeVoo;

  beforeEach(() => {
    servicoPlanoDeVoo = new ServicoPlanoDeVoo();
  });

  it("deve adicionar um plano de voo", () => {
    const planoDeVoo = new PlanoDeVoo("1", "Origem", "Destino", "Horário");
    servicoPlanoDeVoo.adiciona(planoDeVoo);

    const todosPlanos = servicoPlanoDeVoo.todos();
    expect(todosPlanos).toHaveLength(1);
    expect(todosPlanos[0]).toEqual(planoDeVoo);
    console.log(todosPlanos[0]);
  });

  it("deve recuperar um plano de voo pelo ID", () => {
    const planoDeVoo = new PlanoDeVoo("1", "Origem", "Destino", "Horário");
    servicoPlanoDeVoo.adiciona(planoDeVoo);

    const todosPlanos = servicoPlanoDeVoo.todos();
    const id = todosPlanos[0].id;
    const resultado = servicoPlanoDeVoo.recupera(id);
    expect(resultado).toEqual(planoDeVoo);
  });

  it("deve lançar um erro ao tentar recuperar um plano de voo inexistente", () => {
    expect(() => {
      servicoPlanoDeVoo.recupera("2");
    }).toThrow("Plano de voo com ID 2 não encontrado.");
  });

  it("deve cancelar um plano de voo pelo ID", () => {
    const planoDeVoo = new PlanoDeVoo("1", "Origem", "Destino", "Horário");
    servicoPlanoDeVoo.adiciona(planoDeVoo);

    const todosPlanos = servicoPlanoDeVoo.todos();
    const id = todosPlanos[0].id;
    const resultado = servicoPlanoDeVoo.recupera(id);
    expect(resultado).toEqual(planoDeVoo);

    servicoPlanoDeVoo.cancela(id);
    expect(resultado.cancelado).toBe(true);
  });

  it("deve lançar um erro ao tentar cancelar um plano de voo inexistente", () => {
    expect(() => {
      servicoPlanoDeVoo.cancela("2");
    }).toThrow("Plano de voo com ID 2 não encontrado.");
  });
});
