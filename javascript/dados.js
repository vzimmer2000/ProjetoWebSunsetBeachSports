/*
Arquivo responsável por guardr informações gerais que são utilizadas em outros arquivos
*/

const reservaAtual = {
    modalidade: null,
    quadra: null,
    data: null,
    horario: null
};

const modalidades = [
    {
        id: "volei",
        nome: "Vôlei de Praia"
    },
    {
        id: "futevolei",
        nome: "Futevôlei"
    },
    {
        id: "beach-tennis",
        nome: "Beach Tennis"
    }

];

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

    },

];

const horarios = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00"
];