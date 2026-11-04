class Tipo {
    #id;
    #pokeApi;
    #nome;
    #relacoesDano = new Array(6).fill(null);

    constructor(id, pokeApi, nome, relacoesApi) {
        this.#id = id;
        this.#pokeApi = pokeApi;
        this.#nome = nome;

        this.#relacoesDano = relacoesApi;
    }

    get id() {
        return this.#id;
    }

    get pokeApi() {
        return this.#pokeApi;
    }

    get nome() {
        return this.#nome;
    }

    get relacoesDano() {
        return this.#relacoesDano;
    }
}

export default Tipo;