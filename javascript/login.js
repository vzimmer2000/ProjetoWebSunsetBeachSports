const formularioLogin =
    document.getElementById("form-login");


formularioLogin.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const telefone =
            document.getElementById(
                "login-telefone"
            ).value;

        const senha =
            document.getElementById(
                "login-senha"
            ).value;

        if (
            telefone === ADMINISTRADOR.login &&
            senha === ADMINISTRADOR.senha
        ) {

            const administrador = {

                tipo: "admin",

                login: ADMINISTRADOR.login

            };


            iniciarSessao(administrador);


            window.location.href =
                "administrador.html";


            return;
        }

        const usuario =
            buscarUsuario(
                telefone,
                senha
            );


        if (!usuario) {

            alert(
                "Nenhum usuário com esses dados encontrado."
            );

            return;
        }


        iniciarSessao(usuario);


        const mensagemLogin =
            document.getElementById(
                "mensagem-login"
            );


        mensagemLogin.innerHTML = `
            <p>
                Bem vindo(a): ${usuario.nome}!
            </p>
        `;


        setTimeout(function () {

            window.location.href =
                "../index.html";

        }, 2000);

    }
);