

/* =========================================================
   RENDERIZA AS RESERVAS DO USUÁRIO
========================================================= */

function renderizarReservas() {

    const container =
        document.getElementById("lista-reservas");

    const mensagem =
        document.getElementById("sem-reservas");



    container.innerHTML = "";
    mensagem.innerHTML = "";


    const reservas =
        obterReservasDoUsuario();

    // Ordena por data, quadra e horário
    reservas.sort(function (a, b) {

        if (a.data !== b.data) {
            return a.data.localeCompare(b.data);
        }

        return a.horario.localeCompare(b.horario);

    });

    if (reservas.length === 0) {

        mensagem.textContent =
            "Você ainda não possui reservas.";

        return;
    }


    reservas.forEach(function (reserva) {
        // Verifica se a data e o horário já passaram
        const concluida = reservaConcluida(
            reserva.data,
            reserva.horario
        );
        const card =
            document.createElement("article");

        card.classList.add(
            "card-reserva"
        );


        card.innerHTML = `
            <h2>
                ${obterNomeModalidade(reserva.modalidade)}
            </h2>

            <p>
                <strong>Quadra:</strong>
                ${obterNomeQuadra(reserva.quadra)}
            </p>

            <p>
                <strong>Data:</strong>
                ${formatarData(reserva.data)}
            </p>

            <p>
                <strong>Horário:</strong>
                ${reserva.horario}
            </p>

            ${concluida
                ? `
                        <p class="status-reserva concluida">
                            <strong>Status:</strong> CONCLUÍDA
                        </p>
                    `
                : `
                        <div class="acoes-reserva">

                            <button
                                type="button"
                                class="btn-cancelar"
                                data-id="${reserva.id}">
                                CANCELAR RESERVA
                            </button>

                        </div>
                    `
            }
        `;


        container.appendChild(card);
    });
}

/* =========================================================
   OBTÉM O NOME DA QUADRA
========================================================= */

function obterNomeQuadra(id) {

    const quadra =
        quadras.find(function (quadra) {

            return quadra.id === id;

        });

    return quadra
        ? quadra.nome
        : id;
}


/* =========================================================
   OBTÉM O NOME DA MODALIDADE
========================================================= */

function obterNomeModalidade(id) {

    const modalidade =
        modalidades.find(function (modalidade) {

            return modalidade.id === id;

        });

    return modalidade
        ? modalidade.nome
        : id;
}


/* =========================================================
   FORMATA A DATA
   AAAA-MM-DD → DD/MM/AAAA
========================================================= */

function formatarData(data) {

    const [ano, mes, dia] =
        data.split("-");

    return `${dia}/${mes}/${ano}`;
}


/* =========================================================
   CANCELAR RESERVA
========================================================= */

function cancelarReservaPagina(id) {

    const confirmar =
        confirm(
            "Deseja realmente cancelar esta reserva?"
        );


    if (!confirmar) {
        return;
    }


    const resultado =
        cancelarReserva(id);


    alert(resultado.mensagem);


    if (resultado.sucesso) {

        renderizarReservas();

    }
}


/* =========================================================
   EVENTOS DOS CARDS
   Delegação de evento porque os cards
   são criados dinamicamente.
========================================================= */

document
    .getElementById("lista-reservas")
    .addEventListener(
        "click",
        function (evento) {

            const botao =
                evento.target.closest("button");


            if (!botao) {
                return;
            }


            if (
                botao.classList.contains(
                    "btn-cancelar"
                )
            ) {

                cancelarReservaPagina(
                    botao.dataset.id
                );

            }

        }
    );


/* =========================================================
   VERIFICA SE A RESERVA JÁ FOI REALIZADA
========================================================= */

function reservaConcluida(dataReserva, horarioReserva) {

    const agora = new Date();

    const [ano, mes, dia] = dataReserva
        .split("-")
        .map(Number);

    const [hora, minuto] = horarioReserva
        .split(":")
        .map(Number);

    const dataHoraReserva = new Date(
        ano,
        mes - 1,
        dia,
        hora,
        minuto || 0
    );

    return dataHoraReserva <= agora;
}

/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderizarReservas();

    }
);