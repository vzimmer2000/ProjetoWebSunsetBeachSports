/*
funções usadas na página de ADM
aqui o administrador escolhe uma dta e visualiza todas 
as reservas daquele dia especifico
e ele tem a opção de cancelar a reserva
*/

const inputData =
    document.getElementById("data-consulta");

const botaoBuscar =
    document.getElementById("buscar-reservas");

const listaReservas =
    document.getElementById("lista-reservas");

botaoBuscar.addEventListener("click", function () {

    const data =
        inputData.value;

    if (!data) {

        alert("Selecione uma data.");

        return;
    }
    const dataConsulta = data;

    const reservas =
        obterReservasPorData(data);

    reservas.sort(function (a, b) {

        if (a.horario !== b.horario) {
            return a.horario.localeCompare(b.horario);
        }

        return a.quadra.localeCompare(b.quadra);

    });

    listaReservas.innerHTML = "";

    if (reservas.length === 0) {

        listaReservas.innerHTML = `
            <p>
                Não existem reservas para esta data.
            </p>
        `;

        return;
    }


    reservas.forEach(function (reserva) {

        const nomeCliente =
            obterNomeUsuarioPorTelefone(reserva.usuarioId);


        // Verifica se a data e o horário já passaram
        const concluida = reservaConcluida(
            reserva.data,
            reserva.horario
        );

        let nomeQuadra;

        if (reserva.quadra == "quadra-1") {
            nomeQuadra = "Quadra Maré";
        }
        else if (reserva.quadra == "quadra-2") {
            nomeQuadra = "Quadra Brisa";
        }
        else if (reserva.quadra == "quadra-3") {
            nomeQuadra = "Quadra Beira-mar";
        }


        let esporte;

        if (reserva.modalidade == "volei") {
            esporte = "Vôlei de Praia";
        }
        else if (reserva.modalidade == "futevolei") {
            esporte = "Futevôlei";
        }
        else if (reserva.modalidade == "beach-tennis") {
            esporte = "Beach-Tennis";
        }


        const elemento =
            document.createElement("div");

        elemento.classList.add("card-reserva");


        elemento.innerHTML = `
        <div class="cabecalho-reserva">

            <h3>${reserva.horario}</h3>

            ${concluida
                ? `
                        <span class="status-reserva concluida">
                            CONCLUÍDA
                        </span>
                    `
                : ""
            }

        </div>

        <div class="dados-reserva">

            <p>
                <strong>Cliente:</strong>
                ${nomeCliente}
            </p>

            <p>
                <strong>Telefone:</strong>
                ${formatarTelefone(reserva.usuarioId)}
            </p>

            <p>
                <strong>Quadra:</strong>
                ${nomeQuadra}
            </p>

            <p>
                <strong>Modalidade:</strong>
                ${esporte}
            </p>

        </div>

        ${concluida
                ? ""
                : `
                    <button
                        class="btn-cancelar"
                        data-id="${reserva.id}">
                        Cancelar reserva
                    </button>
                `
            }
    `;

        listaReservas.appendChild(elemento);
    });

});
listaReservas.addEventListener(
    "click",
    function (evento) {
        if (
            !evento.target.classList.contains(
                "btn-cancelar"
            )
        ) {
            return;
        }
        const id =
            evento.target.dataset.id;

        const resultado =
            cancelarReserva(id);

        alert(resultado.mensagem);

        if (resultado.sucesso) {

            botaoBuscar.click();
        }
    }
);

const btnLogout =
    document.getElementById("btn-logout");

if (btnLogout) {

    btnLogout.addEventListener(
        "click",
        logout
    );
}

function formatarTelefone(telefone) {
    telefone = String(telefone);

    return telefone.slice(0, 2) + " " +
        telefone.slice(2, 7) + "-" +
        telefone.slice(7);
}


/* =========================================================
   VERIFICA SE A RESERVA JÁ FOI CONCLUÍDA
   Considera a data e o horário.
========================================================= */

function reservaConcluida(dataReserva, horarioReserva) {

    const agora = new Date();

    const [ano, mes, dia] =
        dataReserva.split("-").map(Number);

    const [hora, minuto] =
        horarioReserva.split(":").map(Number);

    const dataHoraReserva = new Date(
        ano,
        mes - 1,
        dia,
        hora,
        minuto || 0
    );

    return dataHoraReserva <= agora;
}