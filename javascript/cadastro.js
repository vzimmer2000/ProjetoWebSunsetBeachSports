/*
Arquivo responsável por cpturar os dados inseridos e salvar no localStorage
*/
const formularioCadastro = document.getElementById("dados-cadastro");

formularioCadastro.addEventListener("submit", function (event) {
    event.preventDefault();

    const campoNome = document.getElementById("nome-usuario");
    const campoTelefone = document.getElementById("telefone");
    const campoSenha = document.getElementById("senha");

    const telefone = campoTelefone.value.trim();
    const senha = campoSenha.value;

    const formatoTelefone = /^\d{11}$/;

    if (!formatoTelefone.test(telefone)) {
        campoTelefone.classList.add("campo-invalido");

        alert(
            "Telefone inválido!\n\n" +
            "Digite exatamente 11 números, incluindo o DDD.\n" +
            "Não utilize espaços, parênteses ou hífen.\n\n" +
            "Exemplo: 54999999999"
        );

        campoTelefone.focus();
        return;
    }



    if (senha.length < 8) {
        campoSenha.classList.add("campo-invalido");

        alert("A senha deve possuir pelo menos 8 caracteres.");

        campoSenha.focus();
        return;
    }
    const usuario = {
        nome: campoNome.value,
        telefone: telefone,
        senha: senha
    };

    const cadastrado = cadastrarUsuario(usuario);

    if (!cadastrado) {
        alert("Já existe um usuário com esse telefone, redirecionando para login");

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);

        return;
    }

    const containerMensagemCadastro =
        document.getElementById("container-mensagem-cadastro");

    containerMensagemCadastro.innerHTML = `
        <div id="mensagem-cadastro">
            <p>
                CADASTRO REALIZADO COM SUCESSO,
                REDIRECIONANDO PARA LOGIN...
            </p>
        </div>
    `;

    formularioCadastro.reset();

    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);
});