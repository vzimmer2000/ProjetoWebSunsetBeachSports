/*
Arquivo responsável por cpturar os dados inseridos e salvar no localStorage
*/

const formularioCadastro = document.getElementById("dados-cadastro");

formularioCadastro.addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = {
        nome: document.getElementById("nome-usuario").value,
        telefone: document.getElementById("telefone").value,
        senha: document.getElementById("senha").value
    };
    const cadastrado = cadastrarUsuario(usuario);

    if (!cadastrado) {
        alert("já existe um usuário com esse telefone, redirecionando para login");

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
        return;
    }
    const containerMensagemCadastro = document.getElementById("container-mensagem-cadastro");
    containerMensagemCadastro.innerHTML =
        `   
        <div id="mensagem-cadastro">
            <p>CADASTRO REALIZADO COM SUCESSO, REDIRECIONANDO PARA LOGIN...</p>
        </div>
        `;
    formularioCadastro.reset();
    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);
});
