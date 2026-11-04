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

        this.#emAndamento = true;
        this.#turnoEmAndamento = false;

        this.configurarEventos();
    }

    configurarEventos(){
        console.log("configurou")

        document.getElementById('atacar').addEventListener('click', async event => {
           if(!this.#emAndamento) return;
           this.#view.mostrarAtaques(this.#jogador, ataque => this.executarTurno(ataque));
        })

        document.getElementById('voltar').addEventListener('click', e => {
            this.#view.mostrarMenuPrincipal(addJs => this.configurarEventos());
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
            let dano = CalculadoraDano.ataque(atacante, defensor, ataque);

            if(defensor.hpAtual - dano < 0) {
                defensor.hpAtual = 0
            } else {
                defensor.hpAtual -= dano;
            }

            this.#view.atualizarHp(atacante, defensor)

        } catch(e){
            console.error(e)
        }
    }
}

export default Batalha;