const usuario = obterUsuarioLogado();
const containerUsuarioLogado = document.getElementById('container-usuario-logado');

const containerDesfoque = document.getElementById('container-desfoque');

let desfoque = false;

if (usuario) {

    containerUsuarioLogado.innerHTML =

        `
        <p>Bem Vindo, ${usuario.nome}!</p>
        <button id="btn-logout">
        LOGOUT
        </button>   
         `
        ;
    containerDesfoque.classList.remove("desfoque");
}
else {

    containerUsuarioLogado.innerHTML =
        `
        <p>realize login para continuar!</p>
        <a href="pages/login.html">
        <button id="btn-login">
        LOGIN
        </button>
        </a>   
         `
    containerDesfoque.classList.add("desfoque");
    ;
}
const botaoLogout = document.getElementById("btn-logout");
botaoLogout.addEventListener("click", logout);