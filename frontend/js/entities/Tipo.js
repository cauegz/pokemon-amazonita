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

    toJSON() {
        return {
            id: this.#id,
            pokeApi: this.#pokeApi,
            nome: this.#nome,
            relacoesDano: this.#relacoesDano
        }
    }
}

export default Tipo;