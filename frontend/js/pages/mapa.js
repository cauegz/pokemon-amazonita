import Api from "../APIs/Api.js"
import verificarSessao from "../services/verificarSessao.js";
import Time from "../entities/Time.js";

const user = await verificarSessao();

const nomeId = new Map([
    ['1', 'Marcio Bigolin'],
    ['2', 'Raissa Scheeren'],
    ['3', 'Jacqueline Akazaki']
]);

const botoes = document.querySelectorAll('.btn-escolher');

botoes.forEach(botao => {
    botao.addEventListener("click", async (event) => {
        const id = event.target.dataset.id;

        await batalhar(resolveNome(id));
    });
});

function resolveNome(id) {
    return nomeId.get(id);
}

async function batalhar(nome){
    const npc = await Api.buscarNpcByNome(nome);
    console.log("NPC:");
    console.log(npc);

    const oponente = await Api.buscarTreinadorByNpc(npc.id);
    console.log("Treinador:")
    console.log(oponente)

    localStorage.setItem("idOponente", oponente.id)

    window.location.href = "./batalha.html";
}