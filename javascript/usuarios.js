
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

