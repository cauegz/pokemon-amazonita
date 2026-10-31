import Api from "../../APIs/Api.js";
import PokeAPI from "../../APIs/PokeApi.js";
export default class BatalhaView{
    #opcoesBatalha;
    #opcoesPopUp;
    #time
    #posicaoAtual = 0;

    constructor(time){
        this.#opcoesBatalha = document.querySelectorAll('.btn-opc');
        this.#opcoesPopUp = document.getElementById('opcoesPopUp');
        this.#time = time;
        //this.configurarEventos();
    }
    mostrarPokemon(jogador,oponente){
        //mostrar jogador
        document.getElementById('PokeNome').innerHTML = jogador.nome;
        document.getElementById('pokeSelecionado').innerHTML =`<img src='${jogador.urlImagem}'/>`;
        //mostrar oponente
        document.getElementById('pokeNomeInimigo').innerHTML = oponente.nome;
        document.getElementById('pokeInimigo').innerHTML =`<img src='${oponente.urlImagem}'/>`;

        this.atualizarHp(jogador,oponente);
    }

    atualizarHp(jogador, oponente){
        document.getElementById('hp').innerHTML = `${jogador.hpAtual}/${jogador.hp}`; 
        document.getElementById('hpInimigo').innerHTML = `${oponente.hpAtual}/${oponente.hp}`; 
    }
    mostrarMenuPrincipal(){
        this.#opcoesBatalha.hidden = false;
        this.#opcoesPopUp. innerHTML = '';
    }

    mostrarAtaques(pokemon,escolheAtaque){
        this.#opcoesBatalha.hidden = true;
        const ataques = pokemon.ataques;
        let botao ='';
        forEach((ataques,posicao) =>{
            if(!ataque) return;
            botao = `<button class='btn-ataque' data-posicao=${posicao}>${ataque.nome}</button>`;
            botao.addEventListener("click", ()=>{escolheAtaque(ataque)})
            this.#opcoesPopUp.appendChild(botao);
        })
        const voltar = `<button>Voltar</button>`;
        voltar.addEventListener("click", ()=>{this.mostrarMenuPrincipal});
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

    /* configurarEventos(){
        console.log(this.#opcoes)
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

            ataques.push(await PokeAPI.buscarAtaque(ataquesBanco[i].pokeApi));

            opcoes[i].id = ataques[i].name;

            //tratar o nome aqui dps pra tirar o - e por a letra maiuscula
            opcoes[i].innerHTML = ataques[i].name;
        }
    }*/
}