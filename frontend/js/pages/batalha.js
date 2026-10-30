import BatalhaView from "../entities/view/BatalhaView.js"
import Time from "../entities/Time.js";
import Api from "../APIs/Api.js";
import PokeApi from "../APIs/PokeApi.js";
import verificarSessao from "../services/verificarSessao.js";

//deixa essa parte responsavel por inicializar os pokemons e tudo o
//que precisa pra batalha, se não vamos ficar fazendo requisção desnecessaria
async function iniciarBatalha() {
    //verificação de sessão como no builder.js
    const user = await verificarSessao();
    if(!user) return;
    
    //time e pokemons
    const time = await Time.carregarTime(user.treinador);
    const jogador = await preparaPoke(time.pokemon.banco[0]);
    const oponente = await preparaPoke(1);//substituir pelo id real posteriormente
    //view
    const view = new BatalhaView(time);
    console.log(jogador);
}

iniciarBatalha();
async function preparaPoke(idPokeBanco) {
    const pokeBanco = await Api.buscarPokemon(idPokeBanco);
    const pokemonPokeApi = await PokeApi.buscarPokemon(pokeBanco.pokeApi);
    console.log(pokeBanco);
    const ataquesBanco = await Api.buscarAtaques(pokeBanco.id);
    const ataques = [];
    for(const ataqueBanco of ataquesBanco){
        if(!ataqueBanco) continue;
        const ataque = await PokeApi.buscarAtaque(ataqueBanco.pokeApi);
        ataques.push(ataque);
    }
    return {
        id_pokeApi: pokemonPokeApi.id, 
        id_pokeBanco: pokeBanco.id,
        nome: pokemonPokeApi.name,
        dados: pokemonPokeApi,
        ataques: ataques,
        //atributos pra batalha
        hpMaximo: pokemonPokeApi.stats.find(
            stat => stat.stat.name === "hp"
        ).base_stat,

        hpAtual: pokeBanco.hp
    }
}