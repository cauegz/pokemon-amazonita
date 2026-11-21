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
        
        let posicao = 1;
        for(const ataque of ataques){
            if(!ataque || ataque == 'undefined'){
                html += `
                    <button class = 'btn-opc' id = 'ataque-${posicao}' disabled>
                    </button>
                `;
                posicao++;
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

        let botoes = opcoesBatalha.querySelectorAll('.btn-opc');
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
    trocar(trocarPokemon, inventario, calculadoraStats, atualizarHpCallback) {
        const objTime = this.#time;
        const containerTime = document.getElementById('time');
        const reviveItem = inventario?.items?.find(
            item => item && item.categoria === "revival"
        );

        containerTime.innerHTML = ``;

        for (let i = 0; i < objTime.pokemon.length; i++) {
            const poke = objTime.pokemon[i];
            if (!poke) continue;

            const estaDesmaiado = poke.hpAtual <= 0;
            const disabled = estaDesmaiado ? "disabled" : "";
            const classeDisabled = estaDesmaiado ? "poke-time-disabled" : "";
            const frase = estaDesmaiado ? "Derrotado :(" : `Escolher ${poke.nome}`;

            const botaoReviverHtml = (estaDesmaiado && reviveItem) ? `
                <div class="revive-acao">
                    <img src="${reviveItem.urlImagem}" alt="${reviveItem.nome}" class="img-revive" />
                    <button type="button" class="btn-reviver" data-posicao="${i}">Reviver</button>
                </div>
            ` : "";

            containerTime.innerHTML += `
                <div class="poke-time-container ${classeDisabled}" id="${poke.id}">
                    <img src="${poke.urlImagem}" alt="${poke.nome}" />
                    <span class="hp-time">HP: ${poke.hpAtual}/${poke.hp}</span>
                    <button type="button" class="poke-time" data-posicao="${i}" ${disabled}>${frase}</button>
                    ${botaoReviverHtml}
                </div>
            `;
        }

        const botoesEscolher = containerTime.querySelectorAll('.poke-time');
        for (const botao of botoesEscolher) {
            botao.addEventListener('click', () => {
                const pos = Number(botao.dataset.posicao);
                this.#posicaoAtual = pos;
                trocarPokemon(objTime.pokemon[pos]);
                document.getElementById('trocaPokeAtivo').hidePopover();
            });
        }

        const botoesReviver = containerTime.querySelectorAll('.btn-reviver');
        for (const botaoRevive of botoesReviver) {
            botaoRevive.addEventListener('click', async () => {
                const pos = Number(botaoRevive.dataset.posicao);
                const pokeAlvo = objTime.pokemon[pos];
                const indiceRevive = inventario.items.findIndex(
                    item => item && item.categoria === "revival"
                );

                if (!pokeAlvo || indiceRevive === -1) return;

                const itemUsado = inventario.items[indiceRevive];
                const hpAnterior = pokeAlvo.hpAtual;
                const efeitoAnterior = pokeAlvo.efeito;
                if (calculadoraStats(pokeAlvo, itemUsado) === false) return;
                try {
                    await inventario.removerItem(itemUsado.id);
                } catch (error) {
                    pokeAlvo.hpAtual = hpAnterior;
                    pokeAlvo.efeito = efeitoAnterior;
                    console.error("Não foi possível consumir o Revive:", error);
                    return;
                }

                atualizarHpCallback();
                this.trocar(trocarPokemon, inventario, calculadoraStats, atualizarHpCallback);
            });
        }
    }
    fugir(){
    }

   mostrarMochila(inventario, jogador, oponente, calculadoraStats) {
        let mochila = document.getElementById('itens');
        mochila.innerHTML = ``;

        for (let count = 0; count < inventario.items.length; count++) {
            const item = inventario.items[count];
            if (!item || item.categoria === "revival") continue;

            mochila.innerHTML += `
                <div class="item-container" id="${item.id}">
                    <img src="${item.urlImagem}" alt="${item.nome}" />
                    <button type="button" class="item" data-pos="${count}">Usar ${item.nome}</button>
                </div>
            `;
        }

        let itemSelecionado = mochila.querySelectorAll('.item');
        for (const item of itemSelecionado) {
            item.addEventListener('click', async () => {
                const pos = Number(item.dataset.pos);
                const itemEscolhido = inventario.items[pos];
                if (!itemEscolhido) return;

                const hpAnterior = jogador.hpAtual;
                const efeitoAnterior = jogador.efeito;
                calculadoraStats(jogador, itemEscolhido);
                try {
                    await inventario.removerItem(itemEscolhido.id);
                } catch (error) {
                    jogador.hpAtual = hpAnterior;
                    jogador.efeito = efeitoAnterior;
                    console.error("Não foi possível consumir o item:", error);
                    return;
                }
                document.getElementById('abreMochila').hidePopover();
                this.atualizarHp(jogador, oponente);
                this.mostrarEfeitos(jogador, oponente);
            });
        }
    }

    turnoInimigo(ataqueExecutado, inimigo){
        this.#mensagemBatalha.innerHTML = `${inimigo.nome} usou ${ataqueExecutado.nome} em você!!!!`;
    }

    turnoJogador(ataqueExecutado, jogador, inimigo){
        this.#mensagemBatalha.innerHTML = `${jogador.nome} usou ${ataqueExecutado.nome} no ${inimigo.nome}!!!`;
    }
}