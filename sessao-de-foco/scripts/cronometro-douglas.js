// ---------------------------------------------
// ELEMENTOS DA INTERFACE
// ---------------------------------------------
const timerDisplay = document.querySelector(".timer-display");
const nextBreakDisplay = document.querySelector(".highlight-text");

const pauseBtn = document.querySelector(".pause-btn");
const pauseBtnImg = pauseBtn.querySelector("img");

const refreshBtn = document.querySelector(".refresh-btn");
const saveBtn = document.querySelector(".save-btn");

const pauseTimeInput = document.getElementById("pause-time");
const pauseTypeSelect = document.getElementById("pause-type");

const ring = document.querySelector(".progress-ring-circle");
const ringLength = ring.getTotalLength();

ring.style.strokeDasharray = ringLength;

// ---------------------------------------------
// CRONÔMETRO
// ---------------------------------------------
let totalTime = 60 * 60; // 1h = 60min
let elapsed = 0;

let running = false;
let interval = null;

let nextBreak = parseInt(pauseTimeInput.value) * 60;

// ---------------------------------------------
// FORMATAÇÃO
// ---------------------------------------------
function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

// ---------------------------------------------
// ATUALIZA TELA
// ---------------------------------------------
function updateUI() {
  const remaining = totalTime - elapsed;

  timerDisplay.textContent = formatTime(remaining);

  nextBreakDisplay.textContent = `${Math.ceil(nextBreak / 60)} minutos`;

  // progresso do círculo
  const progress = elapsed / totalTime;
  ring.style.strokeDashoffset = ringLength * (1 - progress);
}

// ---------------------------------------------
// INICIAR TIMER
// ---------------------------------------------
function startTimer() {
  if (running) return;

  running = true;
  pauseBtnImg.src = "./assets/pause-icone.svg";

  interval = setInterval(() => {
    elapsed++;
    nextBreak--;

    updateUI();

    if (nextBreak <= 0) triggerBreak();

    if (elapsed >= totalTime) {
      clearInterval(interval);
      running = false;
      alert("A sessão acabou! Bom trabalho.");
    }
  }, 1000);
}

// ---------------------------------------------
// PAUSAR / RETOMAR
// ---------------------------------------------
pauseBtn.addEventListener("click", () => {
  if (!running) {
    startTimer();
  } else {
    running = false;
    clearInterval(interval);
    pauseBtnImg.src = "./assets/play-icone.svg";
  }
});

// ---------------------------------------------
// REINICIAR
// ---------------------------------------------
refreshBtn.addEventListener("click", () => {
  clearInterval(interval);
  running = false;

  elapsed = 0;
  nextBreak = parseInt(pauseTimeInput.value) * 60;

  pauseBtnImg.src = "./assets/play-icone.svg";
  updateUI();

  alert("Cronômetro reiniciado.");
});

// ---------------------------------------------
// PAUSAS PROGRAMADAS
// ---------------------------------------------
function triggerBreak() {
  let tipo = pauseTypeSelect.value;
  let tempo = 0;

  if (tipo === "Pausa curta") tempo = 5 * 60;
  if (tipo === "Pausa longa") tempo = 10 * 60;
  if (tipo === "Respiro rápido") tempo = 2 * 60;

  alert(`Hora da pausa!\nTipo: ${tipo}\nDuração: ${tempo / 60} min`);

  nextBreak = parseInt(pauseTimeInput.value) * 60;

  setTimeout(() => {
    alert("Pausa finalizada! Continue seu foco.");
  }, tempo * 1000);
}

// ---------------------------------------------
// SALVAR CONFIGURAÇÕES
// ---------------------------------------------
saveBtn.addEventListener("click", () => {
  const value = parseInt(pauseTimeInput.value);

  if (value <= 0 || isNaN(value)) {
    alert("Insira um valor válido para o intervalo entre pausas.");
    return;
  }

  nextBreak = value * 60;

  alert("Preferências atualizadas!");
  updateUI();
});

// Inicializa tela
updateUI();
