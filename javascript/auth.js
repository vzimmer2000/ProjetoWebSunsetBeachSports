
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

//implementado if para corrigir c caminho reativo logout aparece em index, info e agendamentos 
function logout() {

    localStorage.removeItem("usuarioLogado");

    if (window.location.pathname.includes("/pages/")) {

        window.location.href = "login.html";

    } else {

        window.location.href = "pages/login.html";
    }
}