const inputData =
    document.getElementById("data-consulta");

const botaoBuscar =
    document.getElementById("buscar-reservas");

const listaReservas =
    document.getElementById("lista-reservas");


botaoBuscar.addEventListener("click", function () {

    const data =
        inputData.value;

    // Verifica se uma data foi selecionada
    if (!data) {

        alert("Selecione uma data.");

        return;
    }


    const reservas =
        obterReservasPorData(data);

    reservas.sort(function (a, b) {

        // Primeiro: ordenar pelo horário
        if (a.horario !== b.horario) {
            return a.horario.localeCompare(b.horario);
        }

        // Segundo: ordenar pela quadra
        return a.quadra.localeCompare(b.quadra);

    });

    // Limpa a lista anterior
    listaReservas.innerHTML = "";


    // Nenhuma reserva encontrada
    if (reservas.length === 0) {

        listaReservas.innerHTML = `
            <p>
                Não existem reservas para esta data.
            </p>
        `;

        return;
    }

    // Percorre todas as reservas encontradas
    reservas.forEach(function (reserva) {

        const nomeCliente =
            obterNomeUsuarioPorTelefone(reserva.usuarioId);

        let nomeQuadra;
        if (reserva.quadra == "quadra-1") {
            nomeQuadra = "Quadra Maré";
        }
        else if (reserva.quadra == "quadra-2") {
            nomeQuadra = "Quadra Brisa";
        }
        else if (reserva.quadra == "quadra-3") {
            nomeQuadra = "Quadra Beira-mar"
        }

        let esporte;
        if (reserva.modalidade == "volei") {
            esporte = "Vôlei de Praia";
        }
        else if (reserva.modalidade == "futevolei") {
            esporte = "Futevôlei";
        }
        else if (reserva.modalidade == "beach-tennis") {
            esporte = "Beach-Tennis"
        }


        const elemento =
            document.createElement("div");

        elemento.classList.add("card-reserva");


        elemento.innerHTML = `
            <h3>${reserva.horario}</h3>

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

            <button
                class="btn-cancelar"
                data-id="${reserva.id}"
            >
                Cancelar reserva
            </button>
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

            // Faz a consulta novamente
            // para atualizar a lista
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