import CalculadoraDano from "./CalculadoraDano.js";
import CalculadoraStats from "./CalculadoraStats.js";
import Api from "../APIs/Api.js";

class Batalha {
    #jogador;
    #timeJogador;
    #oponente;
    #timeOponente;
    #view;
    #npcOponente;
    #mapaNpcs;
    #inventario;
    #idOponente;
    #idTreinador;

    constructor(pokeJogador, timeJogador, pokeOponente, timeOponente, view, npcOponente, inventario, idTreinador) {
        this.#jogador = pokeJogador;
        this.#timeJogador = timeJogador;
        this.#oponente = pokeOponente;
        this.#timeOponente = timeOponente;
        this.#view = view;
        this.#inventario = inventario;
        this.#view.mostrarPokemon(this.#jogador, this.#oponente);
        this.#npcOponente = npcOponente;

        this.#mapaNpcs = JSON.parse(localStorage.getItem("npcs"));
        this.#idOponente = sessionStorage.getItem("oponente");
        this.#idTreinador = idTreinador;

        this.configurarEventos();
    }

    #abrirMenuTroca(trocaForcada = false) {
        document.querySelector("#trocaPokeAtivo .close-popover").hidden = trocaForcada;
        this.#view.trocar(
            pokemon => this.trocarPokemon(pokemon, trocaForcada),
            
            //necessario pra poder usar o revive
            this.#inventario, 
            (pokemon, item) => CalculadoraStats.usarItem(pokemon, item), 

            () => this.#view.atualizarHp(this.#jogador, this.#oponente) //callback pra atualizar hp
        );
    }

    esperar(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async configurarEventos() {
        this.#view.mostrarEfeitos(this.#jogador, this.#oponente);

        const botaoAtacar = document.getElementById('atacar');
        if (botaoAtacar) {
            botaoAtacar.onclick = () => {
                this.#view.mostrarAtaques(this.#jogador, async ataque =>
                    await this.executarTurno(ataque)
                );
            };
        }
        const botaoTrocar = document.getElementById('trocar');
        if (botaoTrocar) {
            botaoTrocar.onclick = async () => {
              this.#abrirMenuTroca();
            };
        }

        const botaoMochila = document.getElementById('mochila');
        if (botaoMochila) {
            botaoMochila.onclick = () => {
                this.#view.mostrarMochila(
                    this.#inventario,
                    this.#jogador,
                    this.#oponente,
                    (pokemon, item) => CalculadoraStats.usarItem(pokemon, item)
                );
            };
        }

        const botaoVoltar = document.getElementById('voltar');
        if (botaoVoltar) {
            botaoVoltar.onclick = () => {
                this.#view.mostrarMenuPrincipal(() => this.configurarEventos());
            };
        }

        const botaoFugir = document.getElementById('fugir');
        if (botaoFugir) {
            botaoFugir.onclick = async () => {
                await Api.atualizarTime(this.#timeJogador, this.#idTreinador);
                localStorage.setItem("time-" + this.#idTreinador, JSON.stringify(this.#timeJogador));
                window.location.href = "game.html";
            };
        }

        await this.verificarFimDeTurno();
    }

    async verificarFimDeTurno() {
        //se o pokemon do jogador ta com 0 de hp
        if (this.#jogador.hpAtual <= 0) {
            //verifica se o time do jogador foi derrotado
            if (this.timeDerrotado(this.#timeJogador)) {
                //se foi derrotado executa isso

                //pega do localStorage e seta o isBatalhando como false
                this.#mapaNpcs[this.#idOponente].isBatalhando = false;

                //atualiza o time do jogador no banco e no localStorage
                await Api.atualizarTime(this.#timeJogador, this.#idTreinador);
                localStorage.setItem("time-" + this.#idTreinador, JSON.stringify(this.#timeJogador));
                localStorage.setItem("npcs", JSON.stringify(this.#mapaNpcs));

                //salva o log da batalha no banco
                await Api.salvarLog(
                    {
                        idTreinador1: this.#idTreinador,
                        idTreinador2: this.#npcOponente.id,
                        idVencedor: this.#npcOponente.id,
                        recompensa: 0
                    }
                );

                window.location.href = "/pages/game.html";
                return;
            } else {
               this.#view.trocar(
                    pokemon => this.trocarPokemon(pokemon, true),
                    this.#inventario,
                    (pokemon, item) => CalculadoraStats.usarItem(pokemon, item),
                    () => this.#view.atualizarHp(this.#jogador, this.#oponente)
                );
                document.querySelector("#trocaPokeAtivo .close-popover").hidden = true;
                document.getElementById("trocaPokeAtivo").showPopover();
            }
        }

        //se o oponente esta com 0 de hp
        if (this.#oponente.hpAtual <= 0) {
            
            //verifica se o time do oponente esta derrotado
            if (!this.timeDerrotado(this.#timeOponente)) {
                //se nao estiver derrotado, pega o proximo pokemon ainda vivo
                const proximoOponente = this.#timeOponente.pokemon.find(
                    pokemon => pokemon !== null && pokemon.hpAtual > 0
                );
                this.trocarOponente(proximoOponente);
            } else {
                //se nao tiver mais nenhum pokemon vivo, o jogador venceu
                await Api.atualizarTime(this.#timeJogador, this.#idTreinador);
                await Api.aumentarDinheiro(this.#npcOponente.recompensa);
                await Api.salvarLog(
                    {
                        idTreinador1: this.#idTreinador,
                        idTreinador2: this.#npcOponente.id,
                        idVencedor: this.#idTreinador,
                        recompensa: this.#npcOponente.recompensa
                    }
                );

                //salva o time pos batalha no localStorage para evitar multiplas buscas na PokeAPI
                localStorage.setItem("time-" + this.#idTreinador, JSON.stringify(this.#timeJogador));

                //salva no localStorage que voce derrotou o inimigo
                const npcOponente = this.#mapaNpcs[this.#idOponente];
                npcOponente.defeated = true;
                npcOponente.isBatalhando = false;
                this.#mapaNpcs[this.#idOponente] = npcOponente;

                localStorage.setItem("npcs", JSON.stringify(this.#mapaNpcs));

                window.location.href = "/pages/game.html";
                return;
            }
        }
    }

    async trocarPokemon(novoPokemon, trocaForcada = false) {
        if (novoPokemon === this.#jogador) {
            this.#view.mostrarMenuPrincipal(() => this.configurarEventos());
            return;
        }

        this.#jogador = novoPokemon;
        this.#view.mostrarPokemon(this.#jogador, this.#oponente);

        if (trocaForcada) {
            this.#view.mostrarMenuPrincipal(() => this.configurarEventos());
            return;
        }

        await this.executarTurno(false);
    }

    trocarOponente(novoPokemon) {
        this.#oponente = novoPokemon;
        this.#view.mostrarPokemon(this.#jogador, this.#oponente);
        this.#view.mostrarMenuPrincipal(() => this.configurarEventos());
    }

    async executarTurno(ataque) {
        try {
            if (!ataque) {
                const ataquesValidos = this.#oponente.ataques.filter(a => a !== null);
                const ataqueBot = ataquesValidos[Math.floor(Math.random() * ataquesValidos.length)];
                await this.ataqueBot(ataqueBot);
                this.#view.mostrarMenuPrincipal(() => this.configurarEventos());
                return;
            }

            await this.resolveOrdemAtaque(this.#jogador, this.#oponente, ataque);
            this.#view.atualizarHp(this.#jogador, this.#oponente);
            this.#view.mostrarMenuPrincipal(() => this.configurarEventos());
        } catch (error) {
            console.error("Erro ao executar turno:", error);
        }
    }

    async atacar(atacante, defensor, ataque) {
        try {
            if(atacante === this.#jogador){
                this.#view.turnoJogador(ataque, atacante, defensor);
            }
            const dano = CalculadoraDano.ataque(atacante, defensor, ataque);
            defensor.hpAtual = Math.max(0, defensor.hpAtual - dano);

            this.#view.atualizarHp(this.#jogador, this.#oponente);
            await this.esperar(3000);
        } catch (e) {
            console.error(e);
        }
    }

    async resolveOrdemAtaque(jogador, oponente, ataqueJogador) {
        const ataquesValidos = oponente.ataques.filter(a => a !== null);
        const ataqueBot = ataquesValidos[Math.floor(Math.random() * ataquesValidos.length)];

        let jogadorPrimeiro;

        if(ataqueJogador.prioridade !== ataqueBot.prioridade){
            jogadorPrimeiro = ataqueJogador.prioridade > ataqueBot.prioridade;
        } else {
            jogadorPrimeiro = jogador.velocidade >= oponente.velocidade;
        }

        if (jogadorPrimeiro) {
            await this.atacar(jogador, oponente, ataqueJogador);
            if (oponente.hpAtual > 0) {
                await this.ataqueBot(ataqueBot);
            }
        } else {
            await this.ataqueBot(ataqueBot);
            if (jogador.hpAtual > 0) {
                await this.atacar(jogador, oponente, ataqueJogador);
            }
        }
    }

    async ataqueBot(ataque) {
        this.#view.turnoInimigo(ataque, this.#oponente);
        await this.atacar(this.#oponente, this.#jogador, ataque);
    }

    timeDerrotado(time) {
        const pokemons = time.pokemon.filter(pokemon => pokemon !== null);
        return pokemons.length > 0 && pokemons.every(pokemon => pokemon.hpAtual <= 0);
    }
}

export default Batalha;