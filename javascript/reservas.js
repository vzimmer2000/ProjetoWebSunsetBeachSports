/* =========================================================
   OBTER RESERVAS
   Lê as reservas armazenadas no localStorage.
========================================================= */

function obterReservas() {

    const dados =
        localStorage.getItem("reservas");

    if (!dados) {
        return [];
    }

    return JSON.parse(dados);
}


/* =========================================================
   SALVAR RESERVAS
   Salva o array de reservas no localStorage.
========================================================= */

function salvarReservas(reservas) {

    localStorage.setItem(
        "reservas",
        JSON.stringify(reservas)
    );
}


/* =========================================================
   VERIFICA SE UM HORÁRIO ESTÁ OCUPADO

   Conflito acontece quando:
   mesma data
   + mesmo horário
   + mesma quadra
========================================================= */

function horarioOcupado(data, horario, quadra) {

    const reservas = obterReservas();

    return reservas.some(function (reserva) {

        return (
            reserva.data === data &&
            reserva.horario === horario &&
            reserva.quadra === quadra
        );

    });
}

/* =========================================================
   VERIFICA SE O HORÁRIO JÁ PASSOU

   Só bloqueia horários quando a data escolhida
   é o dia de hoje.
========================================================= */

function horarioJaPassou(data, horario) {

    const agora = new Date();

    const hoje =
        `${agora.getFullYear()}-${String(
            agora.getMonth() + 1
        ).padStart(2, "0")}-${String(
            agora.getDate()
        ).padStart(2, "0")}`;

    // Se não for hoje, o horário ainda pode ser usado
    if (data !== hoje) {
        return false;
    }

    const [hora, minuto] =
        horario.split(":").map(Number);

    const dataHoraHorario =
        new Date(
            agora.getFullYear(),
            agora.getMonth(),
            agora.getDate(),
            hora,
            minuto
        );

    return dataHoraHorario <= agora;
}

/* =========================================================
   OBTÉM OS HORÁRIOS DISPONÍVEIS

   Recebe:
   - data escolhida
   - quadra escolhida
   - horários de funcionamento

   Retorna somente os horários livres.
========================================================= */

function obterHorariosDisponiveis(
    data,
    quadra,
    horarios
) {

    return horarios.filter(function (horario) {

        // Horário já reservado
        if (
            horarioOcupado(
                data,
                horario,
                quadra
            )
        ) {
            return false;
        }


        // Horário já passou hoje
        if (
            horarioJaPassou(
                data,
                horario
            )
        ) {
            return false;
        }


        return true;
    });
}


/* =========================================================
   ADICIONAR RESERVA

   Antes de salvar, verifica novamente se o horário
   continua disponível.
========================================================= */

function adicionarReserva(reserva) {

    const horarioEstaOcupado =
        horarioOcupado(
            reserva.data,
            reserva.horario,
            reserva.quadra
        );

    if (horarioEstaOcupado) {

        return {
            sucesso: false,
            mensagem:
                "Este horário acabou de ser reservado."
        };
    }


    const reservas = obterReservas();

    reservas.push(reserva);

    salvarReservas(reservas);


    return {
        sucesso: true,
        mensagem:
            "Reserva realizada com sucesso!"
    };
}

/* =========================================================
   CANCELAR RESERVA

   Remove uma reserva pelo seu ID.
========================================================= */

function cancelarReserva(id) {

    const reservas = obterReservas();

    const novasReservas = reservas.filter(function (reserva) {

        return reserva.id !== id;

    });

    // Verifica se alguma reserva realmente foi removida
    if (novasReservas.length === reservas.length) {

        return {
            sucesso: false,
            mensagem: "Reserva não encontrada."
        };
    }

    salvarReservas(novasReservas);

    return {
        sucesso: true,
        mensagem: "Reserva cancelada com sucesso."
    };
}
/* =========================================================
   EDITAR RESERVA

   Atualiza os dados de uma reserva existente.

   O novo horário, data e quadra precisam
   estar disponíveis.
========================================================= */

function editarReserva(id, novosDados) {

    const reservas = obterReservas();

    const indice =
        reservas.findIndex(function (reserva) {

            return reserva.id === id;

        });


    // Reserva não encontrada
    if (indice === -1) {

        return {
            sucesso: false,
            mensagem: "Reserva não encontrada."
        };
    }


    const reservaAtual =
        reservas[indice];


    // Verifica se o novo horário está ocupado
    // por OUTRA reserva.
    const conflito =
        reservas.some(function (reserva) {

            return (
                reserva.id !== id &&
                reserva.data === novosDados.data &&
                reserva.horario === novosDados.horario &&
                reserva.quadra === novosDados.quadra
            );

        });


    if (conflito) {

        return {
            sucesso: false,
            mensagem:
                "O novo horário escolhido já está reservado."
        };
    }


    // Atualiza os dados
    reservaAtual.quadra =
        novosDados.quadra;

    reservaAtual.data =
        novosDados.data;

    reservaAtual.horario =
        novosDados.horario;


    salvarReservas(reservas);


    return {
        sucesso: true,
        mensagem:
            "Reserva alterada com sucesso."
    };
}
/* =========================================================
   OBTER RESERVAS DO USUÁRIO LOGADO
========================================================= */

function obterReservasDoUsuario() {

    const usuarioLogado =
        JSON.parse(
            localStorage.getItem("usuarioLogado")
        );

    if (!usuarioLogado) {
        return [];
    }

    const reservas =
        obterReservas();

    return reservas.filter(function (reserva) {

        return reserva.usuarioId === usuarioLogado.telefone;

    });
}