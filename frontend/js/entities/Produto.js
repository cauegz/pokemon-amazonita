import Api from "../APIs/Api.js";
import PokeApi from "../APIs/PokeApi.js";
import Item from "./Item.js";
export default class Produto extends Item{
    #preco;
    #estoque;

    constructor(id, idPokeApi, nome, descricao, efeito,urlImagem,categoria, preco, estoque){
        super(id, idPokeApi, nome, descricao, efeito,urlImagem,categoria);
        this.#preco = preco;
        this.#estoque = estoque;
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

    static async listaProdutosByLojaId(id){
        let produtosBanco = await Api.buscarProdutos(id);

        //O .map() vai retornar uma lista de Promises e o Promise.all() vai esperar todas as Promises serem resolvidas e retornar uma lista de Produtos
        return await Promise.all(produtosBanco.map(async (produto) => {
            const item = await PokeApi.buscarItem(produto.id_item_pokeapi);
            return new Produto(
                produto.id,
                produto.id_item_pokeapi,
                item.name,
                item.flavor_text_entries[0].text,
                item.effect_entries[0].effect,
                item.sprites.default,
                item.category.name,
                produto.preco,
                produto.estoque,
                item.name
            );
        }));
    }
}