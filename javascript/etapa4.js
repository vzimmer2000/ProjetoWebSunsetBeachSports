//LIMPA A RESERVA ATUAL Executada somente depois que uma reserva foi confirmada com sucesso.
function limparReservaAtual() {
    reservaAtual.modalidade = null;
    reservaAtual.quadra = null;
    reservaAtual.data = null;
    reservaAtual.horario = null;
    // Remove visualmente as seleções da Etapa 1 

    atualizarSelecaoModalidade();
    atualizarSelecaoQuadra();
}

//renderizar resumo da reserva 
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
            ${reservaAtual.quadra}
        </p>

        <p>
            <strong>Data:</strong>
            ${reservaAtual.data}
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
        // Identificador único da reserva
        id: Date.now().toString(),

        // Identificador do usuário
        usuarioId: usuarioLogado.telefone,

        // Dados escolhidos durante o agendamento
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

        // Cria a reserva definitiva
        const reserva =
            criarReservaDefinitiva();

        // Se não encontrou usuário, interrompe
        if (!reserva) {
            return;
        }

        // Envia para reservas.js
        const resultado =
            adicionarReserva(reserva);

        // Se houve algum problema
        if (!resultado.sucesso) {

            alert(resultado.mensagem);

            return;
        }

        // Reserva criada com sucesso
        alert(resultado.mensagem);

        // Mostra no console apenas para conferência
        console.log(
            "Reserva criada:",
            reserva
        );

        limparReservaAtual();

        // Volta para a primeira etapa
        mostrarEtapa(1);
    });

