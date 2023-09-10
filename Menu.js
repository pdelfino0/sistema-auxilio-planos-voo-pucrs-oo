import promptsync from "prompt-sync";
const prompt = promptsync({ sigint: true });
import OcupacaoAerovia from "./OcupacaoAerovias.js";
import * as func from "./servicos/funcoesAuxiliares.js";
import PlanoDeVoo from "./PlanoDeVoo.js";
import ServicoPiloto from "./servicos/ServicoPiloto.js";
import ServicoPlanoDeVoo from "./servicos/ServicoPlanoDeVoo.js";
import ServicoAeronaves from "./servicos/ServicoAeronaves.js";
import ServicoAerovias from "./servicos/ServicoAerovias.js";

import AeronaveCarga from "./AeronaveCarga.js";
import AeronavePassageiros from "./AeronavesPassageiros.js";

// Inicializando serviços e classes necessários
const sAerovia = new ServicoAerovias
await sAerovia.carregaAerovias("./dados/aerovias.csv")



const sAeronaves = new ServicoAeronaves();
// Adicionando aeronaves particulares, de carga e de passageiros
await sAeronaves.adicionaAeronavesParticulares(
  "./dados/dados_aeronaves_particulares.csv"
);
await sAeronaves.adicionaAeronavesCarga("./dados/dados_aeronaves_de_carga.csv");
await sAeronaves.adicionaAeronavesPassageiros(
  "./dados/dados_aeronaves_de_passageiros.csv"
);

// Inicializando serviços e classes relacionadas a planos de voo
const sPlanoDeVoo = new ServicoPlanoDeVoo();
const oAerovia = new OcupacaoAerovia();

const sPiloto = new ServicoPiloto
await sPiloto.carregaPilotos("./dados/pilotos.csv")

// Loop principal do programa
let encerrando = false;
while (!encerrando) {
  console.log("\nBem vindo ao sistema de controle de tráfego aéreo. \n");
  console.log("Digite o número da opção desejada: ");
  console.log("1 - Listar Aerovias.");
  console.log(
    "2 - Listar as altitudes livres em uma determinada aerovia em um determinado horário."
  );
  console.log(
    "3 - Submeter um plano de voo para aprovação (retorna o número do plano aprovado)."
  );
  console.log("4 - Listar um plano a partir do número.");
  console.log(
    "5 - Listar todos os planos previstos para uma determinada data (passada, presente ou futura)."
  );
  console.log(
    "6 - Listar a ocupação de uma aerovia em uma determinada data (passada, presente ou futura)."
  );
  console.log("7 - Cancelar um plano de voo.");
  console.log("8 - Encerrar o sistema.");

  // Capturando e validando a opção escolhida pelo usuário
  let opcao = 0;
  while (true) {
    try {
      opcao = prompt("Digite a opção desejada: ");
      if (opcao < 1 || opcao > 8) {
        throw new Error("Opção inválida.");
      } else {
        break;
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  // Processando a opção escolhida pelo usuário
  switch (opcao) {
    case "1":
      console.log("Opção escolhida: Listar Aerovias \n");
      console.log(sAerovia.todas().map((aerovia) => aerovia.toString()));
      break;

    case "2": {
      console.log(
        "Opção escolhida: Listar as altitudes livres em uma determinada aerovia em um determinado horário."
      );
      let idAeroviaEscolhida = prompt("Digite o id da aerovia: ");
      let dataEscolhida = prompt("Digite a data: ");
      let horarioEscolhido = prompt("Digite o horário: ");
      OcupacaoAerovia.altitudesLivres(
        idAeroviaEscolhida,
        dataEscolhida,
        horarioEscolhido
      );
      break;
    }
    case "3":
      try {
        console.log(
          "\nOpção escolhida: Submeter um plano de voo para aprovação (retorna o número do plano aprovado). \n"
        );
        let matriculaPiloto;
        while (true) {
          try {
            console.log("Pilotos cadastrados: \n");
            sPiloto.todos().map((piloto) => console.log(piloto.toString()));
            let matriculaPiloto = prompt("Digite a matrícula do piloto: ");
            matriculaPiloto = matriculaPiloto.toUpperCase();
            sPiloto.verificaMatriculaPiloto(matriculaPiloto);
            break;
          } catch (err) {
            console.log(err.message);
          }
        }
        console.log("Aeronaves cadastradas: \n");
        sAeronaves.todas().map((aeronave) => console.log(aeronave.toString()));
        let prefixoAeronave = prompt("Digite o prefixo da aeronave: ");
        let dataEscolhida = prompt("Digite a data: ");
        let horarioEscolhido = prompt("Digite o horário: ");
        console.log("Aerovias cadastradas: \n");
        sAerovia.todas().map((aerovia) => console.log(aerovia.toString()));
        let idAeroviaEscolhida = prompt("Digite o id da aerovia: ");
        let altitudeEscolhida = prompt("Digite a altitude: ");

        // verificações
        //recuperando aeronave e aerovia escolhidas
        let aeronaveEscolhida = sAeronaves.recupera(prefixoAeronave);
        let aeroviaEscolhida = sAerovia.recupera(idAeroviaEscolhida);

        //calculando tempo de viagem
        let tempoViagem =
          Number(aeroviaEscolhida.tamanho) /
          Number(aeronaveEscolhida.velocidadeCruzeiro);

        //gerando slots de horário
        let slots = func.gerarHorarios(
          horarioEscolhido,
          Math.ceil(tempoViagem)
        );

        //verificando se os slots estão ocupados
        for (let slot of slots) {
          if (
            oAerovia.isOcupado(
              idAeroviaEscolhida,
              dataEscolhida,
              altitudeEscolhida,
              slot
            )
          ) {
            throw new Error(
              `Horario das ${slot} ocupado na aerovia ${idAeroviaEscolhida} as ${horarioEscolhido} na altitude ${altitudeEscolhida}. Por favor, revise os dados do seu plano de voo.`
            );
          }
        }


        // verifica autonomia
        if (aeronaveEscolhida.autonomia < aeroviaEscolhida.tamanho * 1.1) {
          throw new Error(
            "A autonomia da aeronave não é suficiente para percorrer a aerovia."
          );
        } else {
          console.log("Verificação de autonomia da aeronave: OK. \n");
        }

        // verifica horário
        if (aeronaveEscolhida instanceof AeronaveCarga) {
          if (!aeronaveEscolhida.verificaHorario(slots)) {
            throw new Error(
              "A aeronave de carga não pode voar no horário escolhido."
            );
          } else {
            console.log(
              "Verificação de horário de voo da aeronave de carga: OK. \n"
            );
          }
        }
        // verifica altitude aeronave de passageiros
        if (aeronaveEscolhida instanceof AeronavePassageiros) {
          throw new Error(
            "Aeronaves de passageiros não podem voar abaixo de 28.000 pés. \n"
          );
        } else {
          console.log(
            "Verificação de altitude da aeronave de passageiros: OK. \n"
          );
        }

        //cria o plano de voo após as verificações
        let planoDeVoo = new PlanoDeVoo(
          matriculaPiloto,
          prefixoAeronave,
          dataEscolhida,
          horarioEscolhido,
          idAeroviaEscolhida,
          altitudeEscolhida,
          slots
        );
        
        //adiciona o plano de voo ao serviço de planos de voo
        sPlanoDeVoo.adiciona(planoDeVoo);

        //ocupa os slots na aerovia
        oAerovia.ocuparSlot(
          idAeroviaEscolhida,
          dataEscolhida,
          altitudeEscolhida,
          slots
        );

      } catch (err) {
        console.log(err.message);
      }
      break;

    case "4":
      while (true)
        try {
          console.log(
            "Opção escolhida: Listar um plano a partir do número. \n"
          );
          //recebe o id do plano de voo
          let id = prompt("Digite o id do plano de voo: ");

          //recupera o plano de voo e imprime
          console.log("\n" + sPlanoDeVoo.recupera(Number(id)).toString());
          break;
        } catch (err) {
          console.log(err.message + "\nPor favor, tente novamente. \n");
        }
      break;
    case "5":
      console.log(
        "Opção escolhida: Listar todos os planos previstos para uma determinada data (passada, presente ou futura). \n"
      );
      //recupera todos os planos de voo
      let planos = sPlanoDeVoo.todos();
      //coleta a data escolhida pelo usuário
      let dataEscolhida = prompt("Digite a data: ");
      //filtra os planos de voo pela data escolhida
      let planosData = planos.filter((plano) => plano.data === dataEscolhida);
      //imprime os planos de voo
      console.log(planosData.map((plano) => plano.toString()));
      break;

    case "6":
      while (true) {
        try {
          console.log(
            "Opção escolhida: Listar a ocupação de uma aerovia em uma determinada data (passada, presente ou futura). \n"
          );
          //coleta a data escolhida pelo usuário
          let dataEscolhidaCase6 = prompt("Digite a data: ");
          //recupera todas as ocupações da aerovia
          let todas = oAerovia.todas();
          //filtra as ocupações pela data escolhida e imprime caso haja alguma.
          todas.map((ocupacao) =>
            ocupacao.includes(dataEscolhidaCase6)
              ? console.log(ocupacao.toString() + "\n")
              : undefined
          );
        } catch (err) {
          console.log(err.message);
        }
        break;
      }
    case "7":
      while (true) {
        try {
          console.log("Opção escolhida: Cancelar um plano de voo. \n");
          //recebe o id do plano de voo
          let idPlano = prompt("Digite o id do plano de voo: ");
          //recupera o plano de voo 
          let plano = sPlanoDeVoo.recupera(Number(idPlano));
          //libera os slots ocupados pelo plano de voo
          let slotsPlano = plano.slots;
          oAerovia.liberarSlot(
            plano.idAerovia,
            plano.data,
            plano.altitude,
            slotsPlano
          );
          //cancela o plano de voo
          sPlanoDeVoo.cancela(Number(idPlano));
        } catch (err) {
          console.log(err.message);
        }
      }
      break;
    case "8":
      //encerra o sistema
      console.log("Opção escolhida: Encerrar o sistema. \n");
      encerrando = true;
      break;
  }
}
