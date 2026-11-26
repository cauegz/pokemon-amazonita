import Time from "../entities/Time.js";
import verificarSessao from "../services/verificarSessao.js";
import Batalha from "../entities/Batalha.js";
import BatalhaView from "../entities/view/BatalhaView.js";
import Inventario from "../entities/Inventario.js";

//deixa essa parte responsavel por inicializar os pokemons e tudo o
//que precisa pra batalha, se não vamos ficar fazendo requisção desnecessaria
async function iniciarBatalha() {
    try{
        //verificação de sessão como no builder.js
        const user = await verificarSessao();
        if(!user) return;

        const inventario = new Inventario();
        
        const npcs = JSON.parse(localStorage.getItem("npcs"));

        const oponente = npcs[sessionStorage.getItem("oponente")];
        console.log(oponente)

        //time e pokemons
        await inventario.carregarInventario(user.treinador);
        console.log("Inventário carregado:", inventario);
        
        const timeJogador = await Time.carregarTime(user.treinador);
        const timeOponente = await Time.carregarTime(oponente.id);

        const view = new BatalhaView(timeJogador);

        let posicaoPokeVivo;
        for(let i = 0; i < 6; i++){
            if(timeJogador.pokemon[i] && timeJogador.pokemon[i].hpAtual > 0){
                posicaoPokeVivo = i;
                break;
            }
        }

        if (posicaoPokeVivo === undefined) {
            alert('voce deve ter ao menos um pokemon vivo!');
            window.location.href = './game.html';
            return;
        }

        const pokemonJogador = timeJogador.pokemon[posicaoPokeVivo];
        const pokemonOponente = timeOponente.pokemon[0];

        new Batalha(pokemonJogador, timeJogador, pokemonOponente, timeOponente, view, oponente, inventario, user.treinador);
    }catch(error){
        console.error("Erro ao iniciar a batalha:", error);
    }
}

iniciarBatalha();
