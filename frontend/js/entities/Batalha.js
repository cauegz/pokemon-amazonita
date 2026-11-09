import CalculadoraDano from "./CalculadoraDano.js";

class Batalha{
    #jogador;
    #oponente;
    #view;
    #emAndamento
    #turnoJogador;
    
    constructor(pokeJogador,pokeOponente, view){
        this.#jogador = pokeJogador;
        this.#oponente = pokeOponente;
        this.#view = view;
        this.#view.mostrarPokemon(this.#jogador, this.#oponente);

        this.#emAndamento = true;
        this.#turnoJogador = true;

        this.configurarEventos();
    }

    configurarEventos(){
        if(!this.#turnoJogador){
            this.ataqueBot();
        }

        document.getElementById('atacar').addEventListener('click', async event => {
           this.#view.mostrarAtaques(this.#jogador, ataque => 
            this.executarTurno(ataque));
        })
        document.getElementById('trocar').addEventListener('click', e => {
            this.#view.trocar(novoPokemon => 
                this.trocarPokemon(novoPokemon)
            );
        })
        document.getElementById('voltar').addEventListener('click', e => {
            this.#view.mostrarMenuPrincipal(addJs => this.configurarEventos());
        })

        if(this.#jogador.hpAtual <= 0){
            this.#emAndamento = false;
            alert("Você perdeu a batalha");
        } else if(this.#oponente.hpAtual <= 0){
            this.#emAndamento = false;
            alert("Você venceu a batalha");
        }
        console.log("jogador hp: " + this.#jogador.hpAtual + " oponente hp: " + this.#oponente.hpAtual);
    }

    trocarPokemon(novoPokemon){
        this.#jogador = novoPokemon;
        console.log(this.#jogador);
        this.#view.mostrarPokemon(this.#jogador, this.#oponente);
        this.#turnoJogador = false;
        this.ataqueBot();
    }

    executarTurno(ataque){
        try{
            this.atacar(this.#jogador, this.#oponente, ataque);

            this.#view.atualizarHp(this.#jogador, this.#oponente)
            
            this.#turnoJogador = false;

            this.configurarEventos();
        }catch(error){

        }
    }

    atacar(atacante, defensor, ataque){
        try{
            let dano = CalculadoraDano.ataque(atacante, defensor, ataque);
            console.log(atacante.nome + " deu " + dano + " de dano no " + defensor.nome);

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

        this.#view.turnoInimigo();
        setTimeout(() => {
            this.atacar(this.#oponente, this.#jogador, this.#oponente.ataques[numeroAtaque]);
            this.#view.atualizarHp(this.#jogador, this.#oponente)
            this.#turnoJogador = true;
            this.#view.mostrarMenuPrincipal(addJs => this.configurarEventos());
        }, 2000);
       
    }
}

export default Batalha;