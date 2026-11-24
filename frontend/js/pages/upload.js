import Api from "../APIs/Api.js";
import verificarSessao from "../services/verificarSessao.js";

// Referencias aos elementos da tela usados pelos controles de perfil.
const inputFoto = document.getElementById("arquivo");
const botaoEscolher = document.getElementById("upload-player-photo");
const botaoSalvar = document.getElementById("enviar");
const botaoDeletar = document.getElementById("deletar");
const preview = document.getElementById("foto-preview");
const placeholder = document.getElementById("avatar-placeholder");
const nomeUsuario = document.getElementById("info");

// URL temporaria da previa, liberada quando deixa de ser usada.
let urlPreview = null;

// Abre o seletor de arquivos ao clicar no avatar.
botaoEscolher.addEventListener("click", () => {
    inputFoto.click();
});

// Valida a imagem escolhida e atualiza a previa antes do envio.
inputFoto.addEventListener("change", () => {
    const arquivo = inputFoto.files[0];

    if (!arquivo.type.startsWith("image/")) {
        alert("Selecione um arquivo de imagem.");
        inputFoto.value = "";
        botaoSalvar.disabled = true;
        return;
    }

    urlPreview = URL.createObjectURL(arquivo);
    preview.src = urlPreview;
    preview.hidden = false;
    placeholder.hidden = true;
    botaoSalvar.disabled = false;
});

// Envia a foto ao servidor e mostra a resposta recebida.
botaoSalvar.addEventListener("click", async () => {
    const arquivo = inputFoto.files[0];

    const dados = new FormData();
    dados.append("arquivo", arquivo);

    botaoSalvar.disabled = true;

    try {
        const resposta = await Api.enviarFoto(dados);

        if (!resposta.ok) {
            throw new Error(resultado.mensagem);
        }

        console.log(responsta.mensagem);
    } catch (erro) {
        console.error(erro.message);
    } finally {
        botaoSalvar.disabled = false;
    }
});

// Solicita a exclusao da foto e limpa a previa quando a operacao tem sucesso.
botaoDeletar.addEventListener("click", async () => {
    botaoDeletar.disabled = true;

    try {
        const resposta = await Api.removerFoto();

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                resultado.mensagem
            );
        }

        preview.hidden = true;
        placeholder.hidden = false;
        inputFoto.value = "";
        botaoSalvar.disabled = true;

    } catch (erro) {
        alert(erro.message);
    } finally {
        botaoDeletar.disabled = false;
    }
});

async function carregarUsuario() {
    const usuario = await verificarSessao();
    nomeUsuario.innerHTML = usuario.nome;

    const urlFotoServidor = "http://localhost/api/fotoPerfil"; 

    preview.onload = () => {
        preview.hidden = false;
        placeholder.hidden = true;
    };

    preview.src = urlFotoServidor;
}

carregarUsuario();