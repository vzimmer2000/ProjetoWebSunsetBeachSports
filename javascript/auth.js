/* 
Arquivo responsável por gerenciar o usuário logado
funcoes de iniciar sessão, verificar quem está logado e efetuar logout
*/
function iniciarSessao(usuario) {

    localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuario)
    );
}

function obterUsuarioLogado() {

    return JSON.parse(
        localStorage.getItem("usuarioLogado")
    );
}

function usuarioEstaLogado() {

    return localStorage.getItem("usuarioLogado") !== null;
}

function logout() {

    localStorage.removeItem("usuarioLogado");

    if (window.location.pathname.includes("/pages/")) {

        window.location.href = "login.html";

    } else {

        window.location.href = "pages/login.html";
    }
}