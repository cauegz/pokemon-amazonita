import Api from "../APIs/Api.js";

class Produto{
    #id;
    #idPokeApi;
    #nome;
    #preco;
    #estoque;

    constructor(id, idPokeApi, nome, preco, estoque){
        this.#id = id;
        this.#idPokeApi = idPokeApi;
        this.#nome = nome;
        this.#preco = preco;
        this.#estoque = estoque;
    }

    get id(){
        return this.#id;
    }

    get idPokeApi(){
        return this.#idPokeApi;
    }

    get nome(){
        return this.#nome;
    }

    get preco(){
        return this.#preco;
    }

    get estoque(){
        return this.#estoque;
    }

    set estoque(estoque){
        this.#estoque = estoque;
    }

    set preco(preco){
        this.#preco = preco;
    }

    set nome(nome){
        this.#nome = nome;
    }

    set idPokeApi(idPokeApi){
        this.#idPokeApi = idPokeApi;
    }

    static async listaProdutosByLojaId(id){
        let produtos = await Api.buscarProdutos(id);

        return produtos;
    }
}