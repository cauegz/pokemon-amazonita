import CalculadoraDano from "./CalculadoraDano.js";
import CalculadoraStats from "./CalculadoraStats.js";
import Api from "../APIs/Api.js";

class Batalha{
    #jogador;
    #timeJogador;
    #oponente;
    #timeOponente;
    #view;
    #emAndamento;
    #turnoJogador;
    #npcOponente;
    #mapaNpcs;
    #inventario;
    #idOponente;
    
    constructor(pokeJogador, timeJogador, pokeOponente, timeOponente, view, npcOponente, inventario){
        this.#jogador = pokeJogador;
        this.#timeJogador = timeJogador;
        this.#oponente = pokeOponente;
        this.#timeOponente = timeOponente;
        this.#view = view;
        this.#inventario = inventario;
        this.#view.mostrarPokemon(this.#jogador, this.#oponente);
        this.#npcOponente = npcOponente;

        this.#emAndamento = true;
        this.#turnoJogador = true;
        this.#mapaNpcs = JSON.parse(localStorage.getItem("npcs"));
        this.#idOponente = sessionStorage.getItem("oponente");

        this.configurarEventos();
    }

    async configurarEventos(){
        if(!this.#turnoJogador && this.#oponente.hpAtual > 0){
            this.ataqueBot();
        }
        this.#view.mostrarEfeitos(this.#jogador, this.#oponente);
        document.getElementById('atacar').addEventListener('click', async event => {
           this.#view.mostrarAtaques(this.#jogador, ataque => 
            this.executarTurno(ataque));
        })

        document.getElementById('trocar').addEventListener('click', e => {
            this.#view.trocar(funcaoTimePokemon => 
                this.trocarPokemon(funcaoTimePokemon, false)
            );
        })
        document.getElementById('mochila').addEventListener('click', e => {
            this.#view.mostrarMochila(this.#inventario, this.#jogador,this.#inventario, (pokemon, item) =>
                CalculadoraStats.usarItem(this.#jogador, item)
            );
            
            this.#view.atualizarHp(this.#jogador,this.#oponente)
        })
        document.getElementById('voltar').addEventListener('click', e => {
            this.#view.mostrarMenuPrincipal(addJs => this.configurarEventos());
        })
        document.getElementById('fugir').addEventListener('click', e =>{
             window.location.href = "game.html"
        })

        if(this.#jogador.hpAtual == 0){
            this.#emAndamento = false;
            if(this.timeDerrotado(this.#timeJogador)){
                console.log('voce perdeu')

                this.#mapaNpcs[idOponente].isBatalhando = false;

                Api.atualizarTime(this.#timeJogador);

                localStorage.setItem("npcs", JSON.stringify(this.#mapaNpcs));
                
                window.location.href = "./mapa.html"
            } else {
                this.#view.trocar(funcaoTimePokemon => 
                    this.trocarPokemon(funcaoTimePokemon, true)
                );
                document.getElementById("trocaPokeAtivo").showPopover();
            }
        } 

        if(this.#oponente.hpAtual <= 0){
            this.#emAndamento = false;
            const proximoOponente = this.#timeOponente.pokemon.find(
                pokemon => pokemon !== null && pokemon.hpAtual > 0
            );

            if(proximoOponente){
                this.trocarOponente(proximoOponente, true);
            } else {
                console.log("------começando fluxo de vitória------")
                
                let idOponente = this.#idOponente;

                console.log("------chamando a api do banco pra atualizar o time------")
                await Api.atualizarTime(this.#timeJogador);

                console.log("------aumentando dinheiro------")
                await Api.aumentarDinheiro(this.#npcOponente.recompensa);
                                
                console.log("------criando a variável npcOponente e atribuindo à ela o objeto no mapaNpcs na posição do sessionStorage------")
                console.log(this.#mapaNpcs)
                let npcOponente = this.#mapaNpcs[idOponente];

                console.log("------setando npcOponente.defeated como true------")
                npcOponente.defeated = true;
                npcOponente.isBatalhando = false;

                console.log("------botando a variavel npcOponente de volta no mapa na mesma posição")
                this.#mapaNpcs[idOponente] = npcOponente;

                console.log("------botando a variavel mapaNpcs no localStorage")
                localStorage.setItem("npcs", JSON.stringify(this.#mapaNpcs));

                window.location.href = "./mapa.html"
            }
        }
        console.log("jogador hp: " + this.#jogador.hpAtual + " oponente hp: " + this.#oponente.hpAtual);
    }

    trocarPokemon(novoPokemon, turnoJogador){
        this.#jogador = novoPokemon;
        console.log(this.#jogador);
        this.#view.mostrarPokemon(this.#jogador, this.#oponente);
        this.#turnoJogador = turnoJogador;

        this.configurarEventos();
    }

    trocarOponente(novoPokemon, turnoJogador){
        console.log("executou trocar oponente")
        console.log(novoPokemon)
        this.#oponente = novoPokemon;
        this.#view.mostrarPokemon(this.#jogador, this.#oponente);
        this.#turnoJogador = turnoJogador;

        this.configurarEventos();
    }

    executarTurno(ataque){
        try{
            this.atacar(this.#jogador, this.#oponente, ataque);

            this.#view.atualizarHp(this.#jogador, this.#oponente)
            
            this.#turnoJogador = false;

            if(this.#oponente.hpAtual == 0){
                this.#view.mostrarMenuPrincipal(addJs => this.configurarEventos());
                return;
            }

            this.configurarEventos();
        }catch(error){

        }
    }

    atacar(atacante, defensor, ataque){
        try{
            console.log(ataque);
            let dano = CalculadoraDano.ataque(atacante, defensor, ataque);
            // console.log(atacante.nome + " deu " + dano + " de dano no " + defensor.nome);

            if(defensor.hpAtual - dano < 0) {
                defensor.hpAtual = 0
            } else {
                defensor.hpAtual -= dano;
            }

        } catch(e){
            console.error(e)
        }
    }

    ataqueBot(){
        let numeroAtaque = Math.floor(Math.random() * 3) + 1;

        this.#view.turnoInimigo(this.#oponente.ataques[numeroAtaque], this.#oponente);
        setTimeout(() => {
            this.atacar(this.#oponente, this.#jogador, this.#oponente.ataques[numeroAtaque]);
            this.#view.atualizarHp(this.#jogador, this.#oponente);
            this.#turnoJogador = true;
            this.#view.mostrarMenuPrincipal(addJs => this.configurarEventos());
        }, 3000);
       
    }

    /**
     * Método que verifica se algum dos times esta derrotado
     * 
     * @param {Time} time 
     */
    timeDerrotado(time){
        const pokemons = time.pokemon.filter(pokemon => pokemon !== null);

        return pokemons.length > 0 &&
            pokemons.every(pokemon => pokemon.hpAtual <= 0);
    }
}

export default Batalha;