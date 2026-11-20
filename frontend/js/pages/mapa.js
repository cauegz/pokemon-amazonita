import Api from "../APIs/Api.js";
import verificarSessao from "../services/verificarSessao.js";

const user = await verificarSessao();

const idsNpcs = [
    1,
    2,
    3
];

console.log(!localStorage.getItem('npcs'));
if(!localStorage.getItem('npcs')){
    const npcsSalvos = {};

    for (const id of idsNpcs) {
        const npc = await Api.buscarNpcById(id);
        const oponente = await Api.buscarTreinadorByNpc(npc.id);

        npcsSalvos[id] = {
            ...oponente,
            recompensa: npc.recompensa,
            defeated: false,
            nome: oponente.nome,
            isBatalhando: false
        };
    }

    localStorage.setItem("npcs", JSON.stringify(npcsSalvos));
}

const mapa = JSON.parse(localStorage.getItem("npcs"));
console.log(mapa);

const botoes = document.querySelectorAll('.btn-escolher');

botoes.forEach(botao => {
    let id = botao.dataset.id;
    let npc = mapa[id];
    if(npc.defeated){
        botao.disabled = true;
        botao.innerHTML = "ja derrotado";
    }
    botao.addEventListener("click", (event) => {
        const idNpc = event.currentTarget.dataset.id;
        batalhar(idNpc);
    });
});

function batalhar(idNpc) {
    mapa[idNpc].isBatalhando = true;
    console.log(mapa);
    sessionStorage.setItem("oponente", mapa[idNpc].npc);

    localStorage.setItem("npcs", JSON.stringify(mapa));

    window.location.href = "./batalha.html";
}
