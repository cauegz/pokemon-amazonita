import Api from "../APIs/Api.js";
import PokeApi from "../APIs/PokeApi.js";
export default class Produto{
    #id;
    #idPokeApi;
    #nome;
    #preco;
    #estoque;
    #urlImagem;

    constructor(id, idPokeApi, preco, estoque, nome){
        this.#id = id;
        this.#idPokeApi = idPokeApi;
        this.#preco = preco;
        this.#estoque = estoque;
        this.#nome = nome;
        this.#urlImagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${nome}.png`;
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

    get urlImagem(){
        return this.#urlImagem;
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

    set urlImagem(urlImagem){
        this.#urlImagem = urlImagem;
    }

    static async listaProdutosByLojaId(id){
        let produtosBanco = await Api.buscarProdutos(id);

        //O .map() vai retornar uma lista de Promises e o Promise.all() vai esperar todas as Promises serem resolvidas e retornar uma lista de Produtos
        return await Promise.all(produtosBanco.map(async (produto) => {
            const item = await PokeApi.buscarItem(produto.id_item_pokeapi);
            return new Produto(
                produto.id,
                produto.id_item_pokeapi,
                produto.preco,
                produto.estoque,
                item.name
            );
        }));
    }
}