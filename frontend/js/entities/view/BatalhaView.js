export default class BatalhaView{
    #menuPrincipal;
    #opcoesBatalha;
    #time
    #posicaoAtual = 0;

    constructor(time){
        this.#opcoesBatalha = document.getElementById('opcoesBatalha');
        this.#menuPrincipal = this.#opcoesBatalha.innerHTML;
        
        this.#time = time;
    }

    mostrarPokemon(jogador, oponente){
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

    mostrarMenuPrincipal(addJs){
        this.#opcoesBatalha.innerHTML = this.#menuPrincipal;

        addJs()
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
   

    trocar(trocarPokemon){
        console.log(this.#time);
        let time= document.getElementById('time');
        for(const poke of this.#time.pokemon){
            if(poke === null) continue;
            time.innerHTML += `
                <div class="poke-time-container" id=${poke.id}>
                    <img src=${poke.urlImagem} />
                    <button class="poke-time" data-posicao="${this.#time.pokemon.indexOf(poke)}">Escolher ${poke.nome}</button>
                </div>
            `;
        }
        let pokeSelecionado = document.querySelectorAll('.poke-time');
        for(const poke of pokeSelecionado){
            poke.addEventListener('click', ()=>{
                this.#posicaoAtual = poke.dataset.posicao;
                console.log(this.#posicaoAtual);
                trocarPokemon(this.#time.pokemon[this.#posicaoAtual]);
                document.getElementById('trocaPokeAtivo').hidePopover();
            });
        }
        console.log("trocou");
    }

    fugir(){
        console.log("fugiu")
    }

    mochila(){
        console.log("mochilou")
    }

    turnoInimigo(){
        this.#opcoesBatalha.innerHTML = "Esperando inimigo jogar...";
    }
}