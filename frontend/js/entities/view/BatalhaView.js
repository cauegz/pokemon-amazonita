import Api from "../../APIs/Api.js";
import PokeAPI from "../../APIs/PokeApi.js";
export default class BatalhaView{
    #divOpcoes;
    #opcoes;
    #time
    #posicaoAtual = 0;

    constructor(time){
        this.#divOpcoes = document.getElementById('opcoesBatalha');
        this.#opcoes = document.querySelectorAll('.btn-opc');
        this.#time = time;
        this.configurarEventos();
    }

    configurarEventos(){
        console.log(this.#opcoes)
        this.#opcoes.forEach(opcao => 
            opcao.addEventListener('click', ()=>{
                let escolha = opcao.id;
                switch(escolha){
                    case "atacar":
                        this.botoesAtacar();
                        break;
                    case "trocar":
                        this.trocar();
                        break;
                    case "fugir":
                        this.fugir();
                        break;
                    case "mochila":
                        this.mochila();
                        break;
                }
            })
        );
    }

    async botoesAtacar(){
        let opcoes = this.#divOpcoes;
        let pokemon = this.#time[this.#posicaoAtual];

        let html = '';

        let contador = 1;
        while(contador <= 4){
            html += `
                <button id = "" class = "btn-opc" data-ataque = "${pokemon.ataque[contador - 1]}">

                </button>
            `;
            contador++;
        }
    }

    trocar(){
        console.log("trocou")
    }

    fugir(){
        console.log("fugiu")
    }

    mochila(){
        console.log("mochilou")
    }
}