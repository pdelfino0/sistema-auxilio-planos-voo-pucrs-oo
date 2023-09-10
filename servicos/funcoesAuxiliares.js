export function gerarHorarios(horarioInicial, quantidade) {
  const [horaInicial] = horarioInicial.split(":").map(Number);
  const horarios = [];

  //gera os horários de acordo com a quantidade de horas
  for (let i = 0; i < quantidade; i++) {
    const hora = (horaInicial + i) % 24;
    horarios.push(`${hora.toString().padStart(2, "0")}:00`);
  }

  return horarios;
}
