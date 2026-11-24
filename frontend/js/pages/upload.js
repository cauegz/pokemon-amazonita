// Referencias aos elementos da tela usados pelos controles de perfil.
const inputFoto = document.getElementById("arquivo");
const botaoEscolher = document.getElementById("upload-player-photo");
const botaoSalvar = document.getElementById("enviar");
const botaoDeletar = document.getElementById("deletar");
const preview = document.getElementById("foto-preview");
const placeholder = document.getElementById("avatar-placeholder");

// URL temporaria da previa, liberada quando deixa de ser usada.
let urlPreview = null;

// Abre o seletor de arquivos ao clicar no avatar.
botaoEscolher.addEventListener("click", () => {
    inputFoto.click();
});

// Valida a imagem escolhida e atualiza a previa antes do envio.
inputFoto.addEventListener("change", () => {
    const arquivo = inputFoto.files[0];

    if (!arquivo) {
        botaoSalvar.disabled = true;
        return;
    }

    if (!arquivo.type.startsWith("image/")) {
        alert("Selecione um arquivo de imagem.");
        inputFoto.value = "";
        botaoSalvar.disabled = true;
        return;
    }

    if (urlPreview) {
        URL.revokeObjectURL(urlPreview);
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

    if (!arquivo) {
        alert("Escolha uma foto antes de salvar.");
        return;
    }

    const dados = new FormData();
    dados.append("arquivo", arquivo);

    botaoSalvar.disabled = true;

    try {
        const resposta = await fetch("/api/upload", {
            method: "POST",
            credentials: "include",
            body: dados
        });

        const texto = await resposta.text();
        let resultado;

        try {
            resultado = JSON.parse(texto);
        } catch {
            throw new Error(
                `O servidor retornou resposta inválida (HTTP ${resposta.status}).`
            );
        }

        if (!resposta.ok || resultado.ok === false) {
            throw new Error(resultado.mensagem || "Não foi possível salvar a foto.");
        }

        alert(resultado.mensagem || "Foto salva com sucesso.");
    } catch (erro) {
        alert(erro.message);
    } finally {
        botaoSalvar.disabled = false;
    }
});

// Solicita a exclusao da foto e limpa a previa quando a operacao tem sucesso.
botaoDeletar.addEventListener("click", async () => {
    botaoDeletar.disabled = true;

    try {
        const resposta = await fetch("/api/removerFoto", {
            method: "POST"
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                resultado.mensagem || "Não foi possível remover sua foto de perfil."
            );
        }

        alert(resultado.mensagem || "Sua foto de perfil foi removida com sucesso.");

        preview.removeAttribute("src");
        preview.hidden = true;
        placeholder.hidden = false;
        inputFoto.value = "";
        botaoSalvar.disabled = true;

        if (urlPreview) {
            URL.revokeObjectURL(urlPreview);
            urlPreview = null;
        }
    } catch (erro) {
        alert(erro.message);
    } finally {
        botaoDeletar.disabled = false;
    }
});

const nomeUsuario = document.getElementById("info");

// Busca os dados da sessao para mostrar o nome do treinador.
async function carregarUsuario() {
    const resposta = await fetch("/api/me", {
        credentials: "include"
    });

    if (!resposta.ok) {
        nomeUsuario.textContent = "Usuário";
        return;
    }

    const dados = await resposta.json();
    nomeUsuario.textContent =
        dados.username ||
        dados.usuario?.username ||
        dados.nome ||
        dados.usuario?.nome ||
        "Usuário";
}

carregarUsuario();