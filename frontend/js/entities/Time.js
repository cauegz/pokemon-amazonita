import Api from "../APIs/Api.js";
import PokeApi from "../APIs/PokeApi.js";

class Time {
    #pokemon;

    constructor() {
        this.#pokemon = new Array(6).fill(null);
    }

    get pokemon() {
        return this.#pokemon;
    }

    adicionarPokemon(posicao, idPokemon) {
        this.#pokemon[posicao - 1] = idPokemon;
    }

    static async carregarTime(idTreinador) {
        let objTime = new Time();

        //pega o time do usuário logado atualmente
        const timeBanco = await Api.buscarTime(idTreinador);

        var index = 1;
        for(const pokemon of timeBanco){
            if(!pokemon){
                index++;
                continue;
            }

            const pokeBanco = await Api.buscarPokemon(pokemon.pokemon);

            const pokeSelecionado = await PokeApi.buscarPokemon(pokeBanco.pokeApi);
            
            objTime.adicionarPokemon(index, pokeSelecionado.id);
            index++;
        }
        return objTime;
    }
}

export default Time;