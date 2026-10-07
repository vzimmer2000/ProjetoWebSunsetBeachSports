//LIMPA A RESERVA ATUAL Executada somente depois que uma reserva foi confirmada com sucesso.
function limparReservaAtual() {
    reservaAtual.modalidade = null;
    reservaAtual.quadra = null;
    reservaAtual.data = null;
    reservaAtual.horario = null;

    atualizarSelecaoModalidade();
    atualizarSelecaoQuadra();
}


function renderizarResumo() {
    const resumo =
        document.getElementById("resumo-reserva");

    resumo.innerHTML = `
        <p>
            <strong>Modalidade:</strong>
            ${reservaAtual.modalidade}
        </p>

        <p>
            <strong>Quadra:</strong>
            ${obterNomeQuadra(reservaAtual.quadra)}
        </p>

        <p>
            <strong>Data:</strong>
           ${formatarData(reservaAtual.data)}
        </p>

        <p>
            <strong>Horário:</strong>
            ${reservaAtual.horario}
        </p>
    `;
}

/* 
   CRIA A RESERVA DEFINITIVA
   Junta os dados do usuário logado
   com as escolhas do agendamento.
 */

function criarReservaDefinitiva() {
    const usuarioLogado =
        JSON.parse(
            localStorage.getItem("usuarioLogado")
        );
    // Verifica se existe usuário autenticado
    if (!usuarioLogado) {

        alert(
            "Usuário não encontrado. Faça login novamente."
        );

        return null;
    }

    const reserva = {

        id: Date.now().toString(),

        usuarioId: usuarioLogado.telefone,

        modalidade: reservaAtual.modalidade,

        quadra: reservaAtual.quadra,

        data: reservaAtual.data,

        horario: reservaAtual.horario
    };


    return reserva;
}

/* 
   BOTÃO VOLTAR
*/

document
    .getElementById("btn-voltar-etapa4")
    .addEventListener("click", function () {

        mostrarEtapa(3);

    });

/*
   BOTÃO CONFIRMAR RESERVA
*/
document
    .getElementById("btn-confirmar-reserva")
    .addEventListener("click", function () {

        const reserva =
            criarReservaDefinitiva();

        if (!reserva) {
            return;
        }

        const resultado =
            adicionarReserva(reserva);

        if (!resultado.sucesso) {

            alert(resultado.mensagem);

            return;
        }

        alert(resultado.mensagem);

        console.log(
            "Reserva criada:",
            reserva
        );

        limparReservaAtual();

        // Volta para a primeira etapa
        mostrarEtapa(1);
    });

/*FROMATAÇÃO DE DATA E NOME DE QUADRA*/

function formatarData(data) {

    const [ano, mes, dia] =
        data.split("-");

    return `${dia}/${mes}/${ano}`;
}

function obterNomeQuadra(id) {

    const quadra =
        quadras.find(function (quadra) {

            return quadra.id === id;

        });

    return quadra
        ? quadra.nome
        : id;
}