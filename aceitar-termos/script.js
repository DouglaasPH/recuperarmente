const checkbox = document.getElementById("checkbox-termos");
 // seleciona o input checkbox pelo id
const continueButton = document.getElementById("botao-continuar"); // seleciona o botão continuar pelo id

function checarBotao() { // função que alterna estado do botão de continuar
    if (checkbox.checked) { // verifica se o checkbox está marcado
        continueButton.disabled = false; // habilita o botão continuar
    } else { // caso o checkbox não esteja marcado
        continueButton.disabled = true; // desabilita o botão continuar
    }
} // fim da função toggleButtonState

checkbox.addEventListener("change", checarBotao); // adiciona listener para mudança no checkbox e chama a função

continueButton.addEventListener("click", cadastrar);
// Initial state
checarBotao(); // executa a função ao carregar para garantir estado inicial correto

// Esta função será chamada quando quisermos cadastrar um usuário
async function cadastrar() {

    // Aqui pegamos do navegador os dados que estavam guardados previamente
    // O "localStorage" funciona como um pequeno armazenamento interno do navegador
    const nome = localStorage.getItem('nome-completo')
    const email = localStorage.getItem('email')
    const senha = localStorage.getItem('senha')

    // Aqui juntamos os 3 dados dentro de um único objeto
    // Esse objeto será enviado para o servidor
    const dados = { nome, email, senha }

    try {
        // Aqui fazemos uma requisição POST para o backend (FastAPI)
        // Isso serve para enviar os dados do usuário para serem cadastrados no banco
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

        // Apenas exibimos no console os dados enviados (para conferência)
        console.log(dados);

    } catch (erro) {
        // Se acontecer algum erro na requisição, mostramos no console
        console.error("Erro na requisição:", erro);
    }
}

