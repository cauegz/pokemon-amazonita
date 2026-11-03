import Api from "../../APIs/Api.js";
import PokeAPI from "../../APIs/PokeApi.js";
export default class BatalhaView{
    #opcoesBatalha;
    #time
    #posicaoAtual = 0;

    constructor(time){
        this.#opcoesBatalha = document.getElementById('opcoesBatalha');

        this.#time = time;
        //this.configurarEventos();
    }

    mostrarPokemon(jogador,oponente){
        console.log(jogador);
        //mostrar jogador
        document.getElementById('pokeNome').innerHTML = jogador.nome;
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
    }

    mostrarAtaques(pokemon,escolheAtaque){
        let opcoesBatalha = this.#opcoesBatalha;
        opcoesBatalha.innerHTML = "";

        const ataques = pokemon.ataques;
        let html = '';
        
        let posicao = 1
        for(const ataque of ataques){
            if(!ataque || ataque == 'undefined'){
                html += `
                    <button class = 'btn-opc' id = 'ataque-${posicao}' disabled>
                        
                    </button>
                `;
                continue;
            }

            html += `
                <button class = 'btn-opc' id = 'ataque-${posicao}' data-ataque = '${ataque.id}'>
                    ${ataque.name}
                </button>
            `;

            posicao++;
        }
        opcoesBatalha.innerHTML = html;

        let botoes = document.querySelectorAll('.btn-opc');
        for(const botao of botoes){
            botao.addEventListener("click", ()=>{
                let posicaoAtaque = botao.id.match(/\d+/g)[0];

                escolheAtaque(ataques[posicaoAtaque - 1]);
            });
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