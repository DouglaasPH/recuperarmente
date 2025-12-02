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

// Initial state
checarBotao(); // executa a função ao carregar para garantir estado inicial correto
