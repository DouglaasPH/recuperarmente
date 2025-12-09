const sairDaContaButton = document.querySelector(".logout-button");

sairDaContaButton.addEventListener("click", (e) => {
  e.preventDefault();

  localStorage.removeItem("dados_usuario");
  window.location.href = "/conectar/index.html";
});
