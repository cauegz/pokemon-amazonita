import Api from "../APIs/Api.js";
import PokeApi from "../APIs/PokeApi.js";
import Pokemon from "./Pokemon.js";

class Time {
    #pokemon;

    constructor() {
        this.#pokemon = new Array(6).fill(null);
    }

    get pokemon() {
        return this.#pokemon;
    }

    //metodo utilizado antes do pokemon ser salvo no banco
    adicionarPokemon(posicao, pokemon) {
        this.#pokemon[posicao - 1] = pokemon;
    }

    static async carregarTime(idTreinador) {
        console.log("carregou carregar time")
        let objTime = new Time();

        const timeBanco = await Api.buscarTime(idTreinador);

        var index = 1;
        for(const pokeBanco of timeBanco){
            if(!pokeBanco){
                index++;
                continue;
            }
            
            const pokemon = await Pokemon.carregaPokemon(pokeBanco.pokemon);

            console.log("hp do " + pokemon.nome +": " + pokemon.hpAtual)
            
            objTime.adicionarPokemon(index, pokemon);
            index++;
        }
        return objTime;
    }

    toJSON() {
        return this.#pokemon;
    }
}

export default Time;