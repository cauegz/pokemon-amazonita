import PokeAPI from "../../APIs/PokeApi.js";

export default class BatalhaView{
    #time
    #posicaoAtual = 1;

    constructor(time){
        this.#time = time;
        this.configurarEventos();
    }

    configurarEventos(){
        const opcoes = document.querySelectorAll('.btn-opc');

        opcoes.forEach(opcao => 
            opcao.addEventListener('click', ()=>{
                let escolha = opcao.id;
                switch(escolha){
                    case "atacar":
                        this.atacar();
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

    async atacar(){
        let pokeApi = await PokeAPI.buscarPokemon(this.#time.pokemon[this.#posicaoAtual]);
        console.log(pokeApi)
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