# Agregação

## 1. Time e Pokemon
    Dentro da classe time, se tem uma relação de agrgação entre os objetos Time e Pokemon, pois o Time ja recebe uma instância pronta de Pokemons, sendo assim, os pokemons existem sem o Time.

```js
class Time {
    #pokemon;

    constructor() {
        this.#pokemon = new Array(6).fill(null);
    }

    get pokemon() {
        return this.#pokemon;
    }

    /**
     * Recebe uma instancia de pokemon e salva no objeto Time
     * @param {int} posicao 
     * @param {Pokemon} pokemon 
     */
    adicionarPokemon(posicao, pokemon) {
        this.#pokemon[posicao - 1] = pokemon;
    }
...
```