

function salvarReserva() {

    let reservas =
        JSON.parse(localStorage.getItem("reservas")) || [];

    // Cria uma cópia da reserva atual
    const novaReserva = {
        modalidade: reservaAtual.modalidade,
        data: reservaAtual.data,
        horario: reservaAtual.horario,
        quadra: reservaAtual.quadra,
        nome: reservaAtual.nome,
        telefone: reservaAtual.telefone,
        email: reservaAtual.email,
        valor: reservaAtual.valor
    };

    reservas.push(novaReserva);

  
    localStorage.setItem(
        "reservas",
        JSON.stringify(reservas)
    );

    console.log("Reserva salva:", novaReserva);
    console.log("Todas as reservas:", reservas);
}

const botaoConfirmar = document.getElementById("confirmar-reserva");

botaoConfirmar.addEventListener("click", () => {

    salvarReserva();

    alert("Reserva realizada com sucesso!");

});


/*declaração das matrizes que armazeam os dados dos cards*/
const quadras = [
    {
        id: "quadra-1",
        nome: "Quadra Maré"
    },

    {
        id: "quadra-2",
        nome: "Quadra Brisa"
    },

    {
        id: "quadra-3",
        nome: "Quadra Beiramar"
    }
];

/*declaração das matrizes que armazeam os dados dos cards*/

const modalidades = [

    {
        id: 1,
        nome: 'Vôlei de praia',
        periodo: 'dia',
        inicio: 8,
        fim: 17,
        duracao: 1,
        valor: 60,
        imagem: '/assets/images/beach_volleyball.webp'

    },
    {
        id: 2,
        nome: 'Futevôlei',
        periodo: 'dia',
        inicio: 8,
        fim: 17,
        duracao: 1,
        valor: 60,
        imagem: '/assets/images/futevolei.webp'
    },

    {
        id: 3,
        nome: 'Beach Tennis',
        periodo: 'dia',
        inicio: 8,
        fim: 17,
        duracao: 1,
        valor: 60,
        imagem: '/assets/images/beach_tennis.webp'
    },

    {
        id: 4,
        nome: 'Vôlei de Praia',
        periodo: 'noite',
        inicio: 17,
        fim: 23,
        duracao: 1,
        valor: 110,
        imagem: '/assets/images/beach_volleyball.webp'
    },

    {
        id: 5,
        nome: 'Futevôlei',
        periodo: 'noite',
        inicio: 17,
        fim: 23,
        duracao: 1,
        valor: 110,
        imagem: '/assets/images/futevolei.webp'
    },

    {
        id: 6,
        nome: 'Beach Tennis',
        periodo: 'noite',
        inicio: 17,
        fim: 23,
        duracao: 1,
        valor: 110,
        imagem: '/assets/images/beach_tennis.webp'
    }

]
/*armazena os dados da rexerva para posteriormente gravar no localStorage*/

let reservaAtual = {
    modalidade: null,
    data: null,
    horario: null,
    quadra: null,
    nome: '',
    telefone: '',
    email: '',
    valor: 0,
};


/*FUNÇÃO USADA PARA INSERIR OS CARDS DA ESCOLHA DINAMIXAMENTE PELO JS AO INVÉS DE CRIAR MANUALMENTE 
NO HTML */

const cardContainer = document.getElementById('card-container');

function renderizarModalidades() {
    cardContainer.innerHTML = "";

    modalidades.forEach((modalidade) => {

        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
         <img
                class="card-img"
                src="${modalidade.imagem}"
                alt="${modalidade.nome}"
            >

            <div class="card-text">

                <h2>${modalidade.nome}</h2>

                <p>
                    Período:
                    ${modalidade.inicio}h - ${modalidade.fim}h
                </p>

                <p>
                    Duração:
                    ${modalidade.duracao}h
                </p>

                <p>
                    Valor:
                    R$ ${modalidade.valor},00
                </p>

            </div>

            <label class="label-opcao">

                <input
                    type="radio"
                    name="escolha-modalidade"
                    value="${modalidade.id}"
                >

                <span>SELECIONAR</span>

            </label>
        `;
        cardContainer.appendChild(card);
    })

}
renderizarModalidades();

/*GUARDA O VALOR DA MODALIDADE SELECIONADA PARA PODER PROSSEGUIR COM A RESERVA*/

function obterModalidadeSelecionada() {
    const radioSelecionado = document.querySelector(
        'input[name="escolha-modalidade"]:checked'
    );

    if (!radioSelecionado) {
        return null;
    }

    const id = Number(radioSelecionado.value);

    const modalidade = modalidades.find(
        (modalidade) => modalidade.id === id
    );

    return modalidade;
}

function salvarModalidade() {

    const modalidade = obterModalidadeSelecionada();

    if (!modalidade) {
        alert("Selecione uma modalidade.");
        return false;
    }

    reservaAtual.modalidade = modalidade.id;
    reservaAtual.valor = modalidade.valor;

    return true;
}

/*ESPERA A SELEÇÃO DE UMA MODALIDADE PARA PODER PROSSEGUIR PARA A SELEÇÃO DA DATA*/

function irParaData() {

    if (!salvarModalidade()) {
        return;
    }

    mostrarEtapa(2);
}

/**CRIAÇÃO DO CALENDÁRIO PELO JAVASCRIPT */

const mesElement = document.getElementById("mes");
const diasElement = document.getElementById("dias");



let dataAtual = new Date(2026, 8, 1);

const dataMinima = new Date(2026, 8, 1);
const dataMaxima = new Date(2026, 11, 1);

/*FUNÇAÕ DE NAVEGAÇÃO DAS ETAPAS DE AGENDAMENTO*/
function mostrarEtapa(num) {
    // esconder todas
    document
        .querySelectorAll("main section")
        .forEach((sec) => sec.classList.remove("ativo"));
    // mostrar a escolhida
    document.getElementById("etapa" + num).classList.add("ativo");

    // atualizar progresso
    document.querySelectorAll(".step").forEach((s, i) => {
        s.classList.toggle("ativo", i + 1 === num);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderCalendario();
});

/*
FUNÇÃO DO CALENDÁRIO
*/


function renderCalendario() {

    diasElement.innerHTML = "";

    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();

    const nomesMeses = [
        "JANEIRO",
        "FEVEREIRO",
        "MARÇO",
        "ABRIL",
        "MAIO",
        "JUNHO",
        "JULHO",
        "AGOSTO",
        "SETEMBRO",
        "OUTUBRO",
        "NOVEMBRO",
        "DEZEMBRO"
    ];

    mesElement.textContent = `${nomesMeses[mes]} ${ano}`;

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();

    // Espaços antes do primeiro dia
    for (let i = 0; i < primeiroDia; i++) {

        const vazio = document.createElement("div");

        vazio.classList.add("vazio");

        diasElement.appendChild(vazio);
    }

    // Criação dos dias
    for (let dia = 1; dia <= ultimoDia; dia++) {

        const diaElement = document.createElement("div");

        diaElement.textContent = dia;

        const dataDoDia = new Date(ano, mes, dia);

        const dataFormatada =
            `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

        diaElement.dataset.data = dataFormatada;

        diaElement.classList.add("dia-calendario");

        // Verifica se a data já passou
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        if (dataDoDia < hoje) {

            diaElement.classList.add("indisponivel");

        } else {

            diaElement.addEventListener("click", () => {

                selecionarData(dataFormatada);
            });
        }

        // Verifica se é a data atualmente selecionada
        if (reservaAtual.data === dataFormatada) {

            diaElement.classList.add("selecionado");
        }

        diasElement.appendChild(diaElement);
    }
}

function selecionarData(data) {

    reservaAtual.data = data;

    renderCalendario();
}



document.querySelector(".nav button:first-child").onclick = () => {

    const novoMes = new Date(
        dataAtual.getFullYear(),
        dataAtual.getMonth() - 1,
        1
    );

    if (novoMes >= dataMinima) {

        dataAtual = novoMes;

        renderCalendario();
    }
};

document.querySelector(".nav button:last-child").onclick = () => {

    const novoMes = new Date(
        dataAtual.getFullYear(),
        dataAtual.getMonth() + 1,
        1
    );

    if (novoMes <= dataMaxima) {

        dataAtual = novoMes;

        renderCalendario();
    }
};
/*---------------------------------------------------------------------------------------------- */

/*---------------------------------------------------------------------------------------------*/
function gerarHorarios(inicio, fim) {

    const horarios = [];

    for (let hora = inicio; hora < fim; hora++) {

        const horarioFormatado =
            `${String(hora).padStart(2, "0")}:00`;

        horarios.push(horarioFormatado);
    }

    return horarios;
}
function mostrarHorarios() {

    const horariosContainer =
        document.getElementById("horarios-container");

    horariosContainer.innerHTML = "";

    const modalidade = modalidades.find(
        (modalidade) =>
            modalidade.id === reservaAtual.modalidade
    );

    if (!modalidade) {
        return;
    }

    const horarios = gerarHorarios(
        modalidade.inicio,
        modalidade.fim
    );

    const titulo = document.createElement("h3");

    titulo.textContent =
        `Horários disponíveis - ${modalidade.nome}`;

    horariosContainer.appendChild(titulo);

    const divHorarios =
        document.createElement("div");

    divHorarios.classList.add("horarios");

    horarios.forEach((horario) => {

        const label =
            document.createElement("label");

        const input =
            document.createElement("input");

        input.type = "radio";
        input.name = "horario";
        input.value = horario;

        label.appendChild(input);

        label.appendChild(
            document.createTextNode(horario)
        );

        divHorarios.appendChild(label);
    });

    horariosContainer.appendChild(divHorarios);
}

function irParaHorarios() {

    if (!reservaAtual.modalidade) {
        alert("Selecione uma modalidade.");
        mostrarEtapa(1);
        return;
    }

    if (!reservaAtual.data) {
        alert("Selecione uma data.");
        return;
    }

    console.log("Modalidade:", reservaAtual.modalidade);
    console.log("Data:", reservaAtual.data);

    mostrarHorarios();

    mostrarEtapa(3);
}

function salvarHorario() {

    const horarioSelecionado =
        document.querySelector(
            'input[name="horario"]:checked'
        );

    const quadraSelecionada =
        document.querySelector(
            'input[name="quadra"]:checked'
        );

    if (!horarioSelecionado) {

        alert("Selecione um horário.");

        return;
    }

    if (!quadraSelecionada) {

        alert("Selecione uma quadra.");

        return;
    }

    reservaAtual.horario =
        horarioSelecionado.value;

    reservaAtual.quadra =
        quadraSelecionada.value;

    console.log("Reserva atual:", reservaAtual);

    mostrarEtapa(4);
}

const formulario = document.getElementById("dados-para-agendamento");

formulario.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const nome =
        document.getElementById("nome").value.trim();

    const telefone =
        document.getElementById("telefone").value.trim();

    const email =
        document.getElementById("email").value.trim();

    if (!nome || !telefone || !email) {
        alert("Preencha todos os campos.");
        return;
    }

    reservaAtual.nome = nome;
    reservaAtual.telefone = telefone;
    reservaAtual.email = email;

    gerarResumoReserva();

    mostrarEtapa(5);
});

function gerarResumoReserva() {

    const resumo = document.getElementById("resumo-reserva");

    const modalidade = modalidades.find(
        (modalidade) =>
            modalidade.id === reservaAtual.modalidade
    );

    const quadra = quadras.find(
        (quadra) =>
            quadra.id === reservaAtual.quadra
    );

    if (!modalidade || !quadra) {
        resumo.innerHTML = `
            <p>Não foi possível gerar o resumo da reserva.</p>
        `;

        return;
    }

    const [ano, mes, dia] = reservaAtual.data.split("-");

    const dataFormatada =
        `${dia}/${mes}/${ano}`;

    resumo.innerHTML = `
        <div class="item-resumo">
            <strong>MODALIDADE</strong>
            <span>${modalidade.nome}</span>
        </div>

        <div class="item-resumo">
            <strong>DATA</strong>
            <span>${dataFormatada}</span>
        </div>

        <div class="item-resumo">
            <strong>HORÁRIO</strong>
            <span>${reservaAtual.horario}</span>
        </div>

        <div class="item-resumo">
            <strong>QUADRA</strong>
            <span>${quadra.nome}</span>
        </div>

        <div class="item-resumo">
            <strong>NOME</strong>
            <span>${reservaAtual.nome}</span>
        </div>

        <div class="item-resumo">
            <strong>TELEFONE</strong>
            <span>${reservaAtual.telefone}</span>
        </div>

        <div class="item-resumo">
            <strong>E-MAIL</strong>
            <span>${reservaAtual.email}</span>
        </div>

        <div class="item-resumo valor-resumo">
            <strong>VALOR</strong>
            <span>R$ ${reservaAtual.valor.toFixed(2).replace(".", ",")}</span>
        </div>
    `;
}



