export default class BatalhaView{
    #menuPrincipal;
    #opcoesBatalha;
    #time
    #posicaoAtual = 0;

    constructor(time){
        this.#opcoesBatalha = document.getElementById('opcoesBatalha');
        this.#menuPrincipal = document.getElementById('opcoesBatalha');

        this.#time = time;
        //this.configurarEventos();
    }

    mostrarPokemon(jogador,oponente){
        //mostrar jogador
        document.getElementById('pokeNome').innerHTML = jogador.nome;
        document.getElementById('pokeSelecionado').innerHTML = `<img src='${jogador.urlImagem}'/>`;

        //mostrar oponente
        document.getElementById('pokeNomeInimigo').innerHTML = oponente.nome;
        document.getElementById('pokeInimigo').innerHTML = `<img src='${oponente.urlImagem}'/>`;

        this.atualizarHp(jogador, oponente);
    }

    atualizarHp(jogador, oponente){
        document.getElementById('hp').innerHTML = `${jogador.hpAtual}/${jogador.hp}`; 
        document.getElementById('hpInimigo').innerHTML = `${oponente.hpAtual}/${oponente.hp}`; 
    }

    mostrarMenuPrincipal(){
        console.log(this.#menuPrincipal)
        this.#opcoesBatalha.innerHTML = this.#menuPrincipal.innerHTML;
    }

    mostrarAtaques(pokemon, escolheAtaque){
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
                    ${ataque.nome}
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