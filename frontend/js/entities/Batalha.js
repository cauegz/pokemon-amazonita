import BatalhaView from "../entities/view/BatalhaView.js"
import CalculadoraDano from "./CalculadoraDano.js";

class Batalha{
    #jogador;
    #posicaoPokeJogador;
    #oponente;
    #posicaoPokeOponente;
    #view;
    #emAndamento
    #turnoEmAndamento;
    
    constructor(pokeJogador,pokeOponente, view){
        this.#jogador = pokeJogador;
        this.#oponente = pokeOponente;
        this.#view = view;
        this.#view.mostrarPokemon(this.#jogador, this.#oponente);
        this.#view.mostrarMenuPrincipal();

        this.#emAndamento = true;
        this.#turnoEmAndamento = false;

        this.configurarEventos();
    }

    configurarEventos(){
        document.getElementById('atacar').addEventListener('click', async event => {
           if(!this.#emAndamento) return;
           this.#view.mostrarAtaques(this.#jogador, ataque => this.executarTurno(ataque));
        })
    }

    executarTurno(ataque){
        try{
            this.atacar(this.#jogador,this.#oponente, ataque);

        }catch(error){

        }
    }

    atacar(atacante, defensor, ataque){
        try{
            console.log(CalculadoraDano.ataque(atacante, defensor, ataque))
        } catch(e){
            console.error(e)
        }
    }
}

export default Batalha;