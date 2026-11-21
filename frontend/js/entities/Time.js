import Api from "../APIs/Api.js";
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
        const timeSalvo = localStorage.getItem("time-" + idTreinador);
        if(timeSalvo != null){
            try {
                console.log("localStorage, idTreinador: " + idTreinador)
                const listaPokemon = JSON.parse(timeSalvo);

                let objTime = new Time();

                listaPokemon.forEach((dadosPoke, i) => {
                    if (dadosPoke !== null) {
                        const pokemonReconstruido = Pokemon.reconstruir(dadosPoke); 
                        objTime.adicionarPokemon(i + 1, pokemonReconstruido);
                    }
                });

                return objTime;
            } catch (erro) {
                localStorage.removeItem("time-" + idTreinador);
            }
        }


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

        localStorage.setItem("time-"+idTreinador, JSON.stringify(objTime));
        return objTime;
    }

    toJSON() {
        return this.#pokemon;
    }
}

export default Time;