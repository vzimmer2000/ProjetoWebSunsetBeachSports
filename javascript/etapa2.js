const mesElement = document.getElementById("mes");
const diasElement = document.getElementById("dias");

const btnAnterior = document.getElementById("mes-anterior");
const btnProximo = document.getElementById("mes-proximo");

let dataAtual = new Date();

const hoje = new Date();
hoje.setHours(0, 0, 0, 0);

const mesMinimo = new Date(hoje.getFullYear(),
    hoje.getMonth(),
    1);

const mesMaximo = new Date(hoje.getFullYear(),
    hoje.getMonth() + 3,
    1);


function atualizarBotoesNavegacao() {
    const mesExibido = new Date(dataAtual.getFullYear(),
        dataAtual.getMonth(),
        1);

    btnProximo.disabled = mesExibido >= mesMaximo;

    btnProximo.disabled = mesExibido >= mesMaximo;
}

function renderizarCalendario() {
    //
    diasElement.innerHTML = "";

    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();

    const nomeMes = dataAtual.toLocaleString("pt-BR", { month: "long" });
    mesElement.textContent = `${nomeMes.toUpperCase()} ${ano}`;

    //
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);

    for (let i = 0; i < primeiroDia.getDay(); i++) {
        const vazio = document.createElement("div");
        vazio.classList.add("dia", "vazio");
        diasElement.appendChild(vazio);
    }
    // Criar os dias
    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
        const data = new Date(ano, mes, dia);
        const diaSemana = data.getDay();

        const divDia = document.createElement("div");

        divDia.classList.add("dia");

        divDia.textContent = dia;

        const dataFormatada =
            `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

        divDia.dataset.data = dataFormatada;

        const diaPassado = data < new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

        if (diaSemana === 0 || diaPassado) {

            divDia.classList.add("desabilitado");

        } else {

            divDia.addEventListener("click", () => {

                document
                    .querySelectorAll(".dia.selecionado")
                    .forEach(d => {
                        d.classList.remove("selecionado");
                    });

                divDia.classList.add("selecionado");

                reservaAtual.data = dataFormatada;

                console.log(
                    "Reserva atual:",
                    reservaAtual
                );
            });
        }
        // Destaque para hoje
        if (
            dia === hoje.getDate() &&
            mes === hoje.getMonth() &&
            ano === hoje.getFullYear()
        ) {
            divDia.classList.add("hoje");
        }
        //mantem registro
        if (reservaAtual.data === dataFormatada) {
            divDia.classList.add("selecionado");
        }

        diasElement.appendChild(divDia);
    }
}
//MÊS ANTERIOR
btnAnterior.addEventListener("click", function () {
    const novoMes = new Date(dataAtual.getFullYear(),
        dataAtual.getMonth() - 1,
        1);

    if (novoMes >= mesMinimo) {
        dataAtual = novoMes;
        renderizarCalendario();
    }
}
);

//PRÓXIMO MÊS
btnProximo.addEventListener("click", function () {
    const novoMes = new Date(dataAtual.getFullYear(),
        dataAtual.getMonth() + 1,
        1);

    if (novoMes <= mesMaximo) {
        dataAtual = novoMes;
        renderizarCalendario();
    }
}
);

//voltar etapa
document
    .getElementById("btn-voltar-etapa2")
    .addEventListener("click", function () {
        mostrarEtapa(1);
    });
//prosseguir
document
    .getElementById("btn-etapa2")
    .addEventListener("click", function () {
        if (!reservaAtual.data) {
            alert("Selecione uma data.");
            return;
        }
        mostrarEtapa(3);
    });

renderizarCalendario();