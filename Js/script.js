// aqui é feita a conexão com os ID's do HTML
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

//aqui é inserida as condicionais pra 'ativar' o menu hamburguer
if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        //a função toggle faz com que, se a classe existir ela é removida
        //e, se não existir, ela cria pra que possa abrir o mobileNav
    });
}