let inputSenha = document.querySelector(".input-senha");
let buttonDeVisibilidade = document.querySelector(".icone-de-visibilidade");
let buttonEnviar = document.querySelector(".submit-btn");

buttonDeVisibilidade.addEventListener("click", () => {
  if (inputSenha.type === "password") {
    inputSenha.type = "text";
    buttonDeVisibilidade.src = "./assets/icone-de-visibilidade-off.svg";
  } else {
    inputSenha.type = "password";
    buttonDeVisibilidade.src = "./assets/icone-de-visibilidade-on.svg";
  }
});

buttonEnviar.addEventListener("click", (e) => {
  e.preventDefault();
  let nomeCompleto = document.querySelector(".input-nome-completo").value;
  let email = document.querySelector(".input-email").value;
  let senha = inputSenha.value;

  if (nomeCompleto.length === 0 || email.length === 0 || senha.length === 0) {
    alert("Digite todos os inputs corretamente.");
  } else if (senha.length < 6) {
    alert("Sua senha precisa ser maior que 6 caracteres.");
  } else {
    localStorage.setItem("nome-completo", nomeCompleto);
    localStorage.setItem("email", email);
    localStorage.setItem("senha", senha);
    console.log(nomeCompleto, email, senha);

    window.location.href = "/aceitar-termos/index.html";
  }
});
