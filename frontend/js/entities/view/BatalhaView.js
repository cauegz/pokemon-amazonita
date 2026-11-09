export default class BatalhaView{
    #menuPrincipal;
    #opcoesBatalha;
    #time
    #posicaoAtual = 0;
    #mensagemBatalha = document.getElementById('mensagemBatalha');

    constructor(time){
        this.#opcoesBatalha = document.getElementById('opcoesBatalha');
        this.#menuPrincipal = this.#opcoesBatalha.innerHTML;
        this.#mensagemBatalha.innerHTML = "Em batalha! selecione o que você vai fazer";
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
        this.#mensagemBatalha.innerHTML = "Em batalha! selecione o que você vai fazer";
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
        let time=document.getElementById('time');
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

    mostrarMochila(inventario, calculadoraStats){
        let mochila = document.getElementById('itens');
        mochila.innerHTML = ``;
        for(const item of inventario.items){
            if(item === null) continue;
            mochila.innerHTML += `
                <div class="item-container" id=${item.id}>
                    <img src=${item.urlImagem} />
                    <button class="item" data-id="${item.id}">Usar ${item.nome}</button>
                </div>`
        }
        let itemSelecionado = document.querySelectorAll('.item');
        for(const item of itemSelecionado){
            item.addEventListener('click', ()=>{
                console.log("usou item", item.dataset.id);
                
                calculadoraStats(this.#time.pokemon[this.#posicaoAtual], item.dataset.id);
                document.getElementById('abreMochila').hidePopover();
            });
        }
        console.log("mochilou", inventario);
    }

    turnoInimigo(){
        this.#mensagemBatalha.innerHTML = "Esperando inimigo jogar...";
    }
}