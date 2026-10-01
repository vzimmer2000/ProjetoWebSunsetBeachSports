
/* 
   RENDERIZA MODALIDADES
*/
function renderizarModalidades() {

    const container =
        document.getElementById("modalidades-container");

    container.innerHTML = "";

    modalidades.forEach(function (modalidade) {

        const card =
            document.createElement("button");

        card.type = "button";

        card.classList.add("card-escolha");

        card.dataset.id = modalidade.id;

        card.textContent = modalidade.nome;

        card.addEventListener("click", function () {

            selecionarModalidade(modalidade.id);

        });

        container.appendChild(card);
    });
}

/* 
   SELECIONA MODALIDADE
 */

function selecionarModalidade(id) {

    reservaAtual.modalidade = id;

    atualizarSelecaoModalidade();
}

/*
   VERIFICA E APLICA A SELEÇÃO DA MODALIDADE
 */

function atualizarSelecaoModalidade() {

    document
        .querySelectorAll("#modalidades-container .card-escolha")
        .forEach(function (card) {

            const selecionado =
                String(card.dataset.id) ===
                String(reservaAtual.modalidade);

            card.classList.toggle(
                "selecionado",
                selecionado
            );
        });
}

/* 
   RENDERIZA QUADRAS
*/

function renderizarQuadras() {

    const container =
        document.getElementById("quadras-container");

    container.innerHTML = "";

    quadras.forEach(function (quadra) {

        const card =
            document.createElement("button");

        card.type = "button";

        card.classList.add("card-escolha");

        card.dataset.id = quadra.id;

        card.textContent = quadra.nome;

        card.addEventListener("click", function () {

            selecionarQuadra(quadra.id);

        });

        container.appendChild(card);
    });
}

/* 
   SELECIONA QUADRA
*/

function selecionarQuadra(id) {

    reservaAtual.quadra = id;

    atualizarSelecaoQuadra();
}

/* 
   VERIFICA E APLICA A SELEÇÃO DA QUADRA
 */

function atualizarSelecaoQuadra() {

    document
        .querySelectorAll("#quadras-container .card-escolha")
        .forEach(function (card) {

            const selecionado =
                String(card.dataset.id) ===
                String(reservaAtual.quadra);

            card.classList.toggle(
                "selecionado",
                selecionado
            );
        });
}

/* 
   VALIDA ETAPA 1
*/

function validarEtapa1() {

    if (!reservaAtual.modalidade) {

        alert("Selecione uma modalidade.");

        return false;
    }

    if (!reservaAtual.quadra) {

        alert("Selecione uma quadra.");

        return false;
    }

    return true;
}

/* 
   BOTÃO PROSSEGUIR
*/

document.addEventListener("DOMContentLoaded", function () {

    renderizarModalidades();

    renderizarQuadras();

    document
        .getElementById("btn-etapa1")
        .addEventListener("click", function () {

            if (!validarEtapa1()) {
                return;
            }

            mostrarEtapa(2);
        });

});