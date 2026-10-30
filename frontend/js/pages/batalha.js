import Time from "../entities/Time.js";
import Api from "../APIs/Api.js";
import PokeApi from "../APIs/PokeApi.js";
import verificarSessao from "../services/verificarSessao.js";
import Pokemon from "../entities/Pokemon.js";

//deixa essa parte responsavel por inicializar os pokemons e tudo o
//que precisa pra batalha, se não vamos ficar fazendo requisção desnecessaria
async function iniciarBatalha() {
    //verificação de sessão como no builder.js
    const user = await verificarSessao();
    if(!user) return;
    
    //time e pokemons
    const time = await Time.carregarTime(user.treinador);
    const jogador = await preparaPoke(time.pokemon.banco[0]);
    //const oponente = await preparaPoke(1);//substituir pelo id real posteriormente
}

iniciarBatalha();

async function preparaPoke(idPokeBanco) {
    const pokeBanco = await Api.buscarPokemon(idPokeBanco);
    const pokemonPokeApi = await PokeApi.buscarPokemon(pokeBanco.pokeApi);
    console.log("pokebanco")
    console.log(pokeBanco);
    const ataquesBanco = await Api.buscarAtaques(pokeBanco.id);
    const efeito = await Api.buscarEfeito(pokeBanco.efeito);

    let pokemon = new Pokemon(
        pokeBanco.id,
        //depois pegar o nome do banco aqui
        pokemonPokeApi.name,
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonPokeApi.id}.png`,
        pokemonPokeApi.id,
        50,
        pokeBanco.hp,
        pokeBanco.hpAtual,
        pokeBanco.ataque,
        pokeBanco.defesa,
        pokeBanco.ataqueEspecial,
        pokeBanco.defesaEspecial,
        pokeBanco.velocidade,
        efeito
    );

    let posicao = 0;
    for(const ataqueBanco of ataquesBanco){
        if(!ataqueBanco) continue;
        const ataque = await PokeApi.buscarAtaque(ataqueBanco.pokeApi);
        console.count("ataque")
        console.log(ataque)
        pokemon.adicionarAtaque(ataque, posicao);
        posicao++;
    }

    console.log("pokemon na batalha");
    console.log(pokemon);

    return pokemon;
}