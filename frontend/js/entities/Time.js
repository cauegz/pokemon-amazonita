import Api from "../APIs/Api.js";
import PokeApi from "../APIs/PokeApi.js";

class Time {
    #pokemon = {};

    constructor() {
        this.#pokemon['api'] = new Array(6).fill(null);
        this.#pokemon['banco'] = new Array(6).fill(null);
    }

    get pokemon() {
        return this.#pokemon;
    }

    //metodo utilizado antes do pokemon ser salvo no banco
    adicionarPokemon(posicao, idPokeApi) {
        this.#pokemon[posicao - 1]['api'] = idPokeApi;
        this.#pokemon[posicao - 1]['banco'] = false;
    }

    //metodo utilizado depois do pokemon ser salvo no banco
    adicionarPokemon(posicao, idPokeApi, idBanco) {
        this.#pokemon['api'][posicao - 1] = idPokeApi;
        this.#pokemon['banco'][posicao - 1] = idBanco;
    }

    static async carregarTime(idTreinador) {
        let objTime = new Time();

        const timeBanco = await Api.buscarTime(idTreinador);
        console.log(timeBanco)

        var index = 1;
        for(const pokemon of timeBanco){
            if(!pokemon){
                index++;
                continue;
            }

            const pokeBanco = await Api.buscarPokemon(pokemon.pokemon);

            const pokeSelecionado = await PokeApi.buscarPokemon(pokeBanco.pokeApi);
            
            objTime.adicionarPokemon(index, pokeSelecionado.id, pokemon.pokemon);
            index++;
        }
        return objTime;
    }
}

export default Time;