# Associação
É possível ver associação na classe Batalha do JavaScript, pois ela recebe Pokemon, Time, Inventario e BatalhaView, mas não instancia nenhum deles, e os utiliza para orquestrar a batalha

```js
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
        this.#jogador = pokeJogador; //recebe pronto
        this.#timeJogador = timeJogador; //recebe pronto
        this.#oponente = pokeOponente;
        this.#timeOponente = timeOponente;
        this.#view = view; //recebe pronto
        this.#inventario = inventario; //recebe pronto
        this.#view.mostrarPokemon(this.#jogador, this.#oponente);
        this.#npcOponente = npcOponente;

        this.#mapaNpcs = JSON.parse(localStorage.getItem("npcs"));
        this.#idOponente = sessionStorage.getItem("oponente");
        this.#idTreinador = idTreinador;

        this.configurarEventos();
    }
}
```