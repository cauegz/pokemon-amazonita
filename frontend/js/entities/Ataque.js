class Ataque {
    #id;
    #pokeApi;
    #nome;
    #pp;
    #prioridade;
    #classe;
    #poder;
    #tipo;
    #efeito

    constructor(id, pokeApi, nome, pp, prioridade, classe, poder, tipo, efeito){
        this.#id = id;
        this.#pokeApi = pokeApi;
        this.#nome = nome;
        this.#pp = pp;
        this.#prioridade = prioridade;
        this.#classe = classe;
        this.#poder = poder;
        this.#tipo = tipo;
        this.#efeito = efeito;
    }

    get id(){
        return this.#id;
    }

    get pokeApi(){
        return this.#pokeApi;
    }

    get nome(){
        return this.#nome;
    }

    get pp(){
        return this.#pp;
    }

    get prioridade(){
        return this.#prioridade;
    }

    get classe(){
        return this.#classe;
    }

    get poder(){
        return this.#poder;
    }

    get tipo(){
        return this.#tipo;
    }
    
    get efeito(){
        return this.#efeito;
    }
}

export default Ataque;