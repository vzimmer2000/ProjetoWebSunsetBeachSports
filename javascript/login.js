const formularioLogin = document.getElementById("form-login");

formularioLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    const telefone = document.getElementById("login-telefone").value;
    const senha = document.getElementById("login-senha").value;

    const usuario = buscarUsuario(telefone, senha);
    if (!usuario) {
        alert("nenhum usuario com esses dados encontrado");
        return;
    }

    iniciarSessao(usuario);

    const mensagemLogin = document.getElementById("mensagem-login");
    mensagemLogin.innerHTML =
        `   
            <p>Bem vindo(a): ${usuario.nome}!</p>
        `;
    setTimeout(() => {
        window.location.href = "../index.html";
    }, 2000);
});