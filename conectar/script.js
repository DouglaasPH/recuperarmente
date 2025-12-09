//aqui é feita a criação dos 'links' com os elementos do formulário pra fazer
//com que seja funcional, atribuindo as classes//tags uma funcao

document.addEventListener("DOMContentLoaded", () => {
  //selecao dos elementos (DOM)

  //aquio o codigo tenta pegar o input email
  const emailInput = document.querySelector('input[type="email"]');
  //aquio o codigo tenta pegar o input de senha
  const senhaInput = document.querySelector('input[type="password"]');

  // ALTERAÇÃO: Simplifiquei a seleção para evitar erro se o botão do "olho" não existir
  const botaoLogin = document.querySelector(".botao-enviar");

  //aqui fazemos a estrutura do botão de mostrar//esconder a senha
  //também seguindo a lógica de atribuir uma função a ele
  const botaoToggle = document.querySelector(".botao-ativar-visibilidade");

  //verificacao condicional para os campos de senha e botao de mostrar a senha
  if (botaoToggle && senhaInput) {
    //aqui é adicionada a funcao do click para o botao
    botaoToggle.addEventListener("click", () => {
      const type =
        senhaInput.getAttribute("type") === "password" ? "text" : "password";
      senhaInput.setAttribute("type", type);

      const iconeDeVisiblidade = botaoToggle.querySelector(
        ".icone-de-visibilidade"
      );
      // ALTERAÇÃO: Adicionei proteção para não quebrar se o ícone não for achado
      if (iconeDeVisiblidade) {
        iconeDeVisiblidade.src =
          type === "password"
            ? "./assets/icone-de-visibilidade-on.svg"
            : "./assets/icone-de-visibilidade-off.svg";
      }
    });
  }

  //aqui fazemos a conexao com o backend
  const url_api = "http://127.0.0.1:8000/conectar";

  //verificacao condicional para o botao de login
  if (botaoLogin) {
    botaoLogin.addEventListener("click", async (event) => {
      event.preventDefault(); //aqui é uma forma de evitar o recarregamento da página

      const email = emailInput.value.trim();
      const senha = senhaInput.value;

      //aqui se os campos não forem preenchidos ele retorna o alert
      if (!email || !senha) {
        alert("Preencha todos os campos.");
        return;
      }

      //aqui realizamos a estrutura da requisicao post json pra api
      try {
        const resposta = await fetch(url_api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            senha: senha,
          }),
        });

        //aqui é feita a conversão da resposta do servidor (json)
        // em um objeto js
        const dados = await resposta.json();

        //aqui é feita uma verificacao condicional
        //'resposta.ok' é true se o status for 200-299 ---> sucesso
        if (resposta.ok) {
          localStorage.setItem("usuario_id", JSON.stringify(dados.usuario_id));
          alert("Login realizado com sucesso!");
        } else {
          // se o status for erro (400, 401, 500) ele retorna essa mensagem
          const mensagemErro = dados.message || "Email ou Senha Incorretos!";
          alert(mensagemErro);
        }
        //aqui é usado um método catch para retornar mensagem de erro
        //caso haja erro de conexão com o backend
      } catch (error) {
        console.error("Erro na requisição", error);
        alert("Erro na conexão com o servidor. Tente novamente mais tarde.");
      }
    });
  }
});
