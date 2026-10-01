
//RENDERIZA HORÁRIOS
//O reservas.js informa quais horários estão disponíveis.
function renderizarHorarios() {

    const container =
        document.getElementById("horarios-container");

    container.innerHTML = "";

    const horariosDisponiveis =
        obterHorariosDisponiveis(
            reservaAtual.data,
            reservaAtual.quadra,
            horarios
        );

    horariosDisponiveis.forEach(function (horario) {

        const botao =
            document.createElement("button");

        botao.type = "button";

        botao.classList.add("horario");

        botao.textContent = horario;

        botao.dataset.horario = horario;

        if (reservaAtual.horario === horario) {
            botao.classList.add("selecionado");
        }

        botao.addEventListener(
            "click",
            function () {

                selecionarHorario(horario);

            }
        );

        container.appendChild(botao);
    });
}

//SELECIONAR HORÁRIO
function selecionarHorario(horario) {

    reservaAtual.horario = horario;

    document
        .querySelectorAll(
            "#horarios-container .horario"
        )
        .forEach(function (botao) {

            botao.classList.remove(
                "selecionado"
            );
        });
    const botaoSelecionado =
        document.querySelector(
            `#horarios-container .horario[data-horario="${horario}"]`
        );
    if (botaoSelecionado) {

        botaoSelecionado.classList.add(
            "selecionado"
        );
    }
}
//VALIDAR ETAPA 3
function validarEtapa3() {
    if (!reservaAtual.horario) {

        alert("Selecione um horário.");

        return false;
    }

    return true;
}
//BOTÃO VOLTAR
document
    .getElementById("btn-voltar-etapa3")
    .addEventListener("click", function () {

        mostrarEtapa(2);

    });

//BOTÃO PROSSEGUIR
document
    .getElementById("btn-etapa3")
    .addEventListener("click", function () {

        if (!validarEtapa3()) {
            return;
        }
        mostrarEtapa(4);
    });