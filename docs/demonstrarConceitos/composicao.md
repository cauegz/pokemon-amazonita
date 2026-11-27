# Composição

## 1. Game composta por Player, InputHandler e Background

A classe Game cria todos os seus componentes em seu próprio construtor. Os objetos não são recebidos de fora e só existem no contexto de um Game.

```js
export default class Game{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.input = new InputHandler();
        this.background = new Background(this);
    }
}
```

## 2. Pokemon composta por ataques e tipos

O construtor de Pokemon inicializa as coleções internas de ataques e tipos. A própria classe adiciona os objetos às posições correspondentes.

```js
constructor(...) {
    this.#ataques = new Array(4).fill(null);
    this.#tipos = new Array(2).fill(null);
}

adicionarAtaque(ataque, posicao) {
    this.#ataques[posicao] = ataque;
}

adicionarTipo(tipo, posicao) {
    this.#tipos[posicao] = tipo;
}
```

Os objetos Ataque e Tipo são criados enquanto o Pokemo` está sendo carregado ou reconstruído. Dessa forma, eles fazem parte da estrutura e do estado completo daquele Pokémon.
