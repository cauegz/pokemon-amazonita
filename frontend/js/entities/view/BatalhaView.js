import Api from "../../APIs/Api.js";
import PokeAPI from "../../APIs/PokeApi.js";
export default class BatalhaView{
    #opcoes;
    #time
    #posicaoAtual = 0;

    constructor(time){
        this.#opcoes = document.querySelectorAll('.btn-opc');
        this.#time = time;
        this.configurarEventos();
    }

    configurarEventos(){
        this.#opcoes.forEach(opcao => 
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
        let opcoes = this.#opcoes;
        let pokemon = await Api.buscarPokemon(this.#time.pokemon['banco'][this.#posicaoAtual]);
        let ataques = [];
        let ataquesBanco = await Api.buscarAtaques(pokemon.id);
        
        for(let i = 0; i < opcoes.length; i++){
            if(!ataquesBanco[i]){
                opcoes[i].id = "";
                opcoes[i].disabled = true;
                opcoes[i].innerHTML = "";
                continue;
            }

            ataques.push(await PokeAPI.buscarAtaque(ataquesBanco[i].id));

            opcoes[i].innerHTML = ataques[i].name;
        }
        console.log(ataques);
        
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