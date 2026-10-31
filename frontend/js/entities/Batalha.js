import BatalhaView from "../entities/view/BatalhaView.js"

class Batalha{
    #jogador;
    #oponente;
    #view;
    #emAndamento
    #turnoEmAndamento
    constructor(pokeJogador,pokeOponente){
        this.#jogador = pokeJogador;
        this.#oponente =pokeOponente;

        this.#view = new BatalhaView;
        this.#view.mostrarPokemon(this.#jogador,this.#oponente);
        this.#view.mostrarMenuPrincipal();

        this.#emAndamento = true;
        this.#turnoEmAndamento =false;

        this.configurarEventos();
    }

    configurarEventos(){
        document.getElementById('atacar').addEventListener('click', async event => {
           if(!this.#emAndamento)return;
           this.#view.mostrarAtaques(this.#jogador, ataque =>this.executarTurno(ataque));
        })
    }

    executarTurno(idMove){
        try{
            this.atacar(this.#jogador,this.#oponente,idMove);
             
        }catch(error){}
    }

    atacar(atacante,defensor,idMove){
        
    }
}