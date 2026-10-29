import BatalhaView from "../entities/view/BatalhaView.js"

class Batalha{
    #jogador;
    #oponente;
    #view;
    #emAndamento
    #turnoEmAndamento
    constructor(pokeJogador,pokeOponente){
        this.#jogador = pokeJogador;
        this.#oponente =pokeOponente
        this.#view = new BatalhaView;
        this.#emAndamento = true;
        this.#turnoEmAndamento =false;

        this.configurarEventos();
    }

    configurarEventos(){
        document.getElementById('ataques').addEventListener('click', async event => {
            const botao = event.target.closest('.btn-ataque');
            if(!botao) return;
            const idMove = botao.dataset.move;
            await this.executarTurno(idMove);
        })

           
    }
    async executarTurno(idMove){
        try{
            this.atacar(this.#jogador,this.#oponente,idMove);
             
        }catch(error){}
    }
    atacar(atacante,defensor,idMove){

    }
}