document.addEventListener("DOMContentLoaded", () => {
  const titleInput = document.querySelector(
    'input[placeholder="Ex: Sessão de Estudo de Biologia"]'
  );
  const dateInput = document.querySelector('input[type="date"]');
  const timeInput = document.querySelector('input[type="time"]');
  const usuario_id = localStorage.getItem("usuario_id");

  const previewTitle = document.querySelector(".preview-item-title");
  const previewTime = document.querySelector(".preview-item-time");

  const saveButton = document.querySelector(".btn-save");

  function updatePreview() {
    previewTitle.textContent = titleInput.value || "Título da atividade";

    if (timeInput.value) {
      const [hour, minute] = timeInput.value.split(":");
      const endHour = String(Number(hour) + 1).padStart(2, "0");
      previewTime.textContent = `${hour}:${minute} - ${endHour}:${minute}`;
    } else {
      previewTime.textContent = "00:00 - 01:00";
    }
  }

  titleInput.addEventListener("input", updatePreview);
  timeInput.addEventListener("input", updatePreview);

  saveButton.addEventListener("click", async () => {
    const data = {
      id_usuario: usuario_id,
      data: dateInput.value,
      conteudo: titleInput.value,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/adicionar-nota", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar atividade");
      }

      alert("Atividade salva com sucesso!");
      window.location.href = "/dashboard/index.html";
    } catch (error) {
      alert("Falha ao salvar atividade.");
      console.error(error);
    }
  });
});

const botaoCancelar = document
  .querySelectorAll(".btn-cancel")[0]
  .addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5500/dashboard/index.html";
  });
