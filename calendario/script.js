document.addEventListener("DOMContentLoaded", () => {
  const usuario_id = localStorage.getItem("usuario_id");

  fetch(`http://localhost:8000/notas?id_usuario=${usuario_id}`)
    .then((res) => res.json())
    .then((data) => preencherCalendario(data.notas)) // <--- Aqui é o array certo
    .catch((err) => console.error(err));
});

// Converte data em dia da semana (1=Seg ... 7=Dom)
function getDiaDaSemana(dataStr) {
  const date = new Date(dataStr);
  const dia = date.getDay();
  return dia === 0 ? 7 : dia;
}

function preencherCalendario(notas) {
  console.log("Notas recebidas:", notas); // <-- Agora funciona

  const linhas = document.querySelectorAll(".calendar-table tbody tr");

  notas.forEach((nota) => {
    const diaSemana = getDiaDaSemana(nota.data);

    const linha = linhas[0]; // por enquanto, sempre no primeiro horário
    const celulas = linha.querySelectorAll("td");
    const celula = celulas[diaSemana];

    const evento = document.createElement("div");
    evento.classList.add("event-card", "type-study");
    evento.innerHTML = `<p class="event-title">${nota.conteudo}</p>`;

    celula.appendChild(evento);
  });
}
