const checkbox = document.getElementById("checkbox-termos");

const continueButton = document.getElementById("botao-continuar");

function checarBotao() {
    if (checkbox.checked) {
        continueButton.disabled = false; // habilita o botão continuar
    } else { // caso o checkbox não esteja marcado
        continueButton.disabled = true; // desabilita o botão continuar
    }
}

checkbox.addEventListener("change", checarBotao); // adiciona listener para mudança no checkbox e chama a função
checarBotao(); // executa a função ao carregar para garantir estado inicial correto

// Esta função será chamada quando o usuário aceitar o termos
async function cadastrar() {

    // Aqui pegamos do navegador os dados que estavam guardados previamente
    // O "localStorage" funciona como um pequeno armazenamento interno do navegador
    const nome = localStorage.getItem('nome-completo')
    const email = localStorage.getItem('email')
    const senha = localStorage.getItem('senha')

    // Aqui juntamos os 3 dados dentro de um único objeto e esse objeto será enviado para o servidor
    const dados = { nome, email, senha }

    try {
        // "fetch" faz uma requisição HTTP para o endereço URL do endpoint de cadastro
        // await faz o código esperar a resposta do servidor antes de continuar
        const resposta = await fetch("http://localhost:8000/cadastrar", {
            // Informamos que a requisição é do tipo POST (enviar dados)
            method: "POST",

            // Dizemos que estamos enviando um arquivo JSON
            headers: {
                "Content-Type": "application/json"
            },

            // Convertendo o objeto "dados" para texto JSON antes de enviar
            body: JSON.stringify(dados)
        });

        // Apenas exibimos no console os dados enviados (para conferir se está correto)
        console.log(dados);

    } catch (erro) {
        // Se acontecer algum erro na requisição, mostramos no console
        console.error("Erro na requisição:", erro);
    }
}

continueButton.addEventListener("click", cadastrar); // evento de cadastrar o usuário quando clicar no botão continuar
