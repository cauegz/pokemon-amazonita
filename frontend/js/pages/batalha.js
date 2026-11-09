import Time from "../entities/Time.js";
import verificarSessao from "../services/verificarSessao.js";
import Batalha from "../entities/Batalha.js";
import BatalhaView from "../entities/view/BatalhaView.js";

//deixa essa parte responsavel por inicializar os pokemons e tudo o
//que precisa pra batalha, se não vamos ficar fazendo requisção desnecessaria
async function iniciarBatalha() {
    //verificação de sessão como no builder.js
    const user = await verificarSessao();
    if(!user) return;
    
    //time e pokemons
    const timeJogador = await Time.carregarTime(user.treinador);
    const timeOponente = await Time.carregarTime(localStorage.getItem("idOponente"))

    const view = new BatalhaView(timeJogador);
    const pokemonJogador = timeJogador.pokemon[0];
    const pokemonOponente = timeOponente.pokemon[0];

    new Batalha(pokemonJogador, timeJogador, pokemonOponente, timeOponente, view);
}

iniciarBatalha();
