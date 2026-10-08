/* 
Arquivo responsável por gerenciar o usuário logado
funcoes de iniciar sessão, verificar quem está logado e efetuar logout
*/
const ADMINISTRADOR = {
    login: "54991855959",
    senha: "SunsetBeachSports2026@"
};


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

    return localStorage.getItem(
        "usuarioLogado"
    ) !== null;
}

function usuarioEhAdministrador() {

    const usuario =
        obterUsuarioLogado();

    return (
        usuario !== null &&
        usuario.tipo === "admin"
    );
}

function logout() {

    localStorage.removeItem(
        "usuarioLogado"
    );

    if (
        window.location.pathname.includes(
            "/pages/"
        )
    ) {

        window.location.href =
            "login.html";

    } else {

        window.location.href =
            "pages/login.html";
    }
}