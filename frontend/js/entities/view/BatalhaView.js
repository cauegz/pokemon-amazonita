export default class BatalhaView{
    #menuPrincipal;
    #opcoesBatalha;
    #time;
    #posicaoAtual = 0;
    #mensagemBatalha = document.getElementById('mensagemBatalha');
    #stsJogador;
    #stsInimigo;
    #hpPlayer;
    #hpInimigo;

    constructor(time){
        this.#opcoesBatalha = document.getElementById('opcoesBatalha');
        this.#menuPrincipal = this.#opcoesBatalha.innerHTML;
        this.#mensagemBatalha.innerHTML = "Em batalha! selecione o que você vai fazer:";
        this.#time = time;
        this.#stsJogador = document.getElementById('efeitoJogador');
        this.#stsInimigo = document.getElementById('efeitoInimigo');
        this.#hpPlayer = document.getElementById('hp-bar-player');
        this.#hpInimigo = document.getElementById('hp-bar-oponente');
    }

    mostrarPokemon(jogador, oponente){
        //mostrar jogador
        document.getElementById('pokeNome').innerHTML =  jogador.nome.charAt(0).toUpperCase() + jogador.nome.slice(1);
        document.getElementById('pokeSelecionado').innerHTML = `<img src='${jogador.imgBack}'/>`;

        //mostrar oponente
        document.getElementById('pokeNomeInimigo').innerHTML = oponente.nome.charAt(0).toUpperCase() + oponente.nome.slice(1);
        document.getElementById('pokeInimigo').innerHTML = `<img src='${oponente.urlImagem}'/>`;

        this.atualizarHp(jogador, oponente);
    }

    atualizarHp(jogador, oponente){
        document.getElementById('hp').innerHTML = `${jogador.hpAtual}/${jogador.hp}`; 
        document.getElementById('hpInimigo').innerHTML = `${oponente.hpAtual}/${oponente.hp}`; 
        
        this.#hpPlayer.style.width=(jogador.hpAtual*100)/jogador.hp + "%";
        this.#hpInimigo.style.width=(oponente.hpAtual*100)/oponente.hp + "%";

        this.#hpPlayer.style.backgroundColor=`green`;
        this.#hpInimigo.style.backgroundColor=`green`;
        if(jogador.hpAtual<(jogador.hp/2)){
            this.#hpPlayer.style.backgroundColor=`orange`;
        }
        if(jogador.hpAtual<(jogador.hp/4)){
            this.#hpPlayer.style.backgroundColor=`red`;
        }

        if(oponente.hpAtual<(oponente.hp/2)){
            this.#hpInimigo.style.backgroundColor=`orange`;
        }
        if(oponente.hpAtual<(oponente.hp/4)){
            this.#hpInimigo.style.backgroundColor=`red`;
        }
        
    }

    mostrarMenuPrincipal(addJs){
        this.#opcoesBatalha.innerHTML = this.#menuPrincipal;
        this.#mensagemBatalha.innerHTML = "Em batalha! selecione o que você vai fazer: ";
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
   
    mostrarEfeitos(jogador,oponente){
        this.#stsJogador.innerHTML= ``;
        this.#stsInimigo.innerHTML= ``;
        if(jogador.efeito) this.#stsJogador.innerHTML = jogador.efeito;
        if(oponente.efeito) this.#stsInimigo.innerHTML = oponente.efeito;
        
    }
    trocar(trocarPokemon){
        let objTime = this.#time;
        
        let time = document.getElementById('time');

        time.innerHTML = ``;
        for(const poke of objTime.pokemon){
            if(poke === null) continue;
            let disabled = "";
            let classeDisabled = "";
            
            if(poke.hpAtual == 0){
                disabled = "disabled";
                classeDisabled = "poke-time-disabled";
            }
            //depois fazer a formatação do pokemon desmaiado com a classe poke-time-disabled
            
            time.innerHTML += `
                <div class="poke-time-container" id=${poke.id}>
                    <img src=${poke.urlImagem} />
                    <button class="poke-time ${classeDisabled}" data-posicao="${objTime.pokemon.indexOf(poke)}" ${disabled}>Escolher ${poke.nome}</button>
                </div>
            `;
        }
        let pokeSelecionado = document.querySelectorAll('.poke-time');
        for(const poke of pokeSelecionado){
            poke.addEventListener('click', () => {
                this.#posicaoAtual = poke.dataset.posicao;
                trocarPokemon(objTime.pokemon[this.#posicaoAtual]);
                document.getElementById('trocaPokeAtivo').hidePopover();
            });
        }
        console.log("trocou");
    }

    fugir(){
        console.log("fugiu")
    }

    mostrarMochila(inventario, jogador, oponente, calculadoraStats){
        let mochila = document.getElementById('itens');
        mochila.innerHTML = ``;
        let count=0;
        for(const item of inventario.items){
            if(item === null) continue;
            mochila.innerHTML += `
                <div class="item-container" id=${item.id}>
                    <img src=${item.urlImagem} />
                    <button class="item" data-pos="${count}">Usar ${item.nome}</button>
                </div>`
            count++;
        }
        let itemSelecionado = document.querySelectorAll('.item');
        for(const item of itemSelecionado){
            item.addEventListener('click', ()=>{
                console.log(item.dataset.pos);
                console.log(inventario.items[item.dataset.pos]);
                calculadoraStats(this.#time.pokemon[this.#posicaoAtual], inventario.items[item.dataset.pos]);
                document.getElementById('abreMochila').hidePopover();
                this.atualizarHp(jogador, oponente);
                this.mostrarEfeitos(jogador,oponente);
            });
        }
        console.log("mochilou", inventario);
    }

    turnoInimigo(ataqueExecutado, inimigo){
        this.#mensagemBatalha.innerHTML = `${inimigo.nome} usou ${ataqueExecutado.nome} em você!!!!`;
    }
}