//botão para sair da página(logout) no header padão e no index. html
const btnLogout =
    document.getElementById("btn-logout");

if (btnLogout) {

    btnLogout.addEventListener(
        "click",
        logout
    );
}


function mostrarEtapa(numero) {
    //ESCONDE TODAS AS ETAPAS
    document
        .querySelectorAll("main section")
        .forEach(function (etapa) {

            etapa.classList.remove("ativo");
        });

    //MOSTRA A ETAPA ESCOLHIDA

    const etapaAtual =
        document.getElementById(`etapa${numero}`);

    if (etapaAtual) {

        etapaAtual.classList.add("ativo");
    }

    //atualiza progresso

    document
        .querySelectorAll(".passo")
        .forEach(function (passo) {
            passo.classList.remove("ativo");
        });

    const passoAtual =
        document.querySelector(
            `.passo[data-etapa="${numero}"]`
        );

    if (passoAtual) {
        passoAtual.classList.add("ativo");
    }

    //SE ENTROU NA ETAPA 3, GERA OS HORÁRIOS
    if (numero === 3) {
        renderizarHorarios();
    }
    //se entrou na etapa 4 gera o resumo 
    if (numero === 4) {
        renderizarResumo();
    }
}
