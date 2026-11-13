import CalculadoraDano from "./CalculadoraDano.js";
import Api from "../APIs/Api.js";

class Batalha{
    #jogador;
    #timeJogador;
    #oponente;
    #timeOponente;
    #view;
    #emAndamento
    #turnoJogador;
    
    constructor(pokeJogador, timeJogador, pokeOponente, timeOponente, view){
        this.#jogador = pokeJogador;
        this.#timeJogador = timeJogador;
        this.#oponente = pokeOponente;
        this.#timeOponente = timeOponente;
        this.#view = view;
        this.#view.mostrarPokemon(this.#jogador, this.#oponente);

        this.#emAndamento = true;
        this.#turnoJogador = true;

        this.configurarEventos();
    }

    configurarEventos(){
        if(!this.#turnoJogador && this.#oponente.hpAtual > 0){
            this.ataqueBot();
        }

        document.getElementById('atacar').addEventListener('click', async event => {
           this.#view.mostrarAtaques(this.#jogador, ataque => 
            this.executarTurno(ataque));
        })

        document.getElementById('trocar').addEventListener('click', e => {
            this.#view.trocar(funcaoTimePokemon => 
                this.trocarPokemon(funcaoTimePokemon, false)
            );
        })

        document.getElementById('voltar').addEventListener('click', e => {
            this.#view.mostrarMenuPrincipal(addJs => this.configurarEventos());
        })

        if(this.#jogador.hpAtual == 0){
            this.#emAndamento = false;
            if(this.timeDerrotado(this.#timeJogador)){
                alert('voce perdeu');
                Api.aumentarDinheiro(localStorage.getItem("recompensa"));

                Api.atualizarTime(this.#timeJogador);
            } else {
                this.#view.trocar(funcaoTimePokemon => 
                    this.trocarPokemon(funcaoTimePokemon, true)
                );
                document.getElementById("trocaPokeAtivo").showPopover();
            }
        } 

        if(this.#oponente.hpAtual <= 0){
            this.#emAndamento = false;
            const proximoOponente = this.#timeOponente.pokemon.find(
                pokemon => pokemon !== null && pokemon.hpAtual > 0
            );

            if(proximoOponente){
                this.trocarOponente(proximoOponente, true);
            } else {
                alert('voce venceu');

                Api.atualizarTime(this.#timeJogador);
            }
        }
        console.log("jogador hp: " + this.#jogador.hpAtual + " oponente hp: " + this.#oponente.hpAtual);
    }

    trocarPokemon(novoPokemon, turnoJogador){
        this.#jogador = novoPokemon;
        console.log(this.#jogador);
        this.#view.mostrarPokemon(this.#jogador, this.#oponente);
        this.#turnoJogador = turnoJogador;

        this.configurarEventos();
    }

    trocarOponente(novoPokemon, turnoJogador){
        console.log("executou trocar oponente")
        console.log(novoPokemon)
        this.#oponente = novoPokemon;
        this.#view.mostrarPokemon(this.#jogador, this.#oponente);
        this.#turnoJogador = turnoJogador;

        this.configurarEventos();
    }

    executarTurno(ataque){
        try{
            this.atacar(this.#jogador, this.#oponente, ataque);

            this.#view.atualizarHp(this.#jogador, this.#oponente)
            
            this.#turnoJogador = false;

            if(this.#oponente.hpAtual == 0){
                this.#view.mostrarMenuPrincipal(addJs => this.configurarEventos());
                return;
            }

            this.configurarEventos();
        }catch(error){

        }
    }

    atacar(atacante, defensor, ataque){
        try{
            let dano = CalculadoraDano.ataque(atacante, defensor, ataque);
            // console.log(atacante.nome + " deu " + dano + " de dano no " + defensor.nome);

            if(defensor.hpAtual - dano < 0) {
                defensor.hpAtual = 0
            } else {
                defensor.hpAtual -= dano;
            }

        } catch(e){
            console.error(e)
        }
    }

    ataqueBot(){
        let numeroAtaque = Math.floor(Math.random() * 3) + 1;

        this.#view.turnoInimigo(this.#oponente.ataques[numeroAtaque], this.#oponente);
        setTimeout(() => {
            this.atacar(this.#oponente, this.#jogador, this.#oponente.ataques[numeroAtaque]);
            this.#view.atualizarHp(this.#jogador, this.#oponente);
            this.#turnoJogador = true;
            this.#view.mostrarMenuPrincipal(addJs => this.configurarEventos());
        }, 3000);
       
    }

    /**
     * Método que verifica se algum dos times esta derrotado
     * 
     * @param {Time} time 
     */
    timeDerrotado(time){
        const pokemons = time.pokemon.filter(pokemon => pokemon !== null);

        return pokemons.length > 0 &&
            pokemons.every(pokemon => pokemon.hpAtual <= 0);
    }
}

export default Batalha;