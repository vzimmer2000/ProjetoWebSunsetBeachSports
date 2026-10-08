
const CHAVE_USUARIOS = "usuarios";

function obterUsuarios() {
    return JSON.parse(localStorage.getItem(CHAVE_USUARIOS)) || [];
}
function salvarUsuarios(usuarios) {
    localStorage.setItem(
        CHAVE_USUARIOS,
        JSON.stringify(usuarios)
    );
}

function cadastrarUsuario(usuario) {

    const usuarios = obterUsuarios();

    const usuarioExistente = usuarios.some(
        u => u.telefone === usuario.telefone
    );
    if (usuarioExistente) {
        return false;
    }
    usuarios.push(usuario);

    salvarUsuarios(usuarios);

    return true;
}

function buscarUsuario(telefone, senha) {
    const usuarios = obterUsuarios();

    return usuarios.find(
        usuario =>
            usuario.telefone === telefone &&
            usuario.senha === senha
    );
}

function obterNomeUsuarioPorTelefone(telefone) {

    const usuarios = obterUsuarios();

    const usuario = usuarios.find(function (usuario) {
        return usuario.telefone === telefone;
    });

    if (!usuario) {
        return "Usuário não encontrado";
    }

    return usuario.nome;
}
