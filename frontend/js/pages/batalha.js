import Time from "../entities/Time.js";
import verificarSessao from "../services/verificarSessao.js";
import Batalha from "../entities/Batalha.js";
import BatalhaView from "../entities/view/BatalhaView.js";
import Api from "../APIs/Api.js";

//deixa essa parte responsavel por inicializar os pokemons e tudo o
//que precisa pra batalha, se não vamos ficar fazendo requisção desnecessaria
async function iniciarBatalha() {
    //verificação de sessão como no builder.js
    const user = await verificarSessao();
    if(!user) return;
    
    //time e pokemons
    const time = await Time.carregarTime(user.treinador);
    const inventario = await Api.buscarInventario(user.treinador);
    const view = new BatalhaView(time);
    const pokemonJogador = time.pokemon[0];
    const pokemonOponente = time.pokemon[1];

    new Batalha(pokemonJogador, pokemonOponente, view, inventario);
}

iniciarBatalha();
