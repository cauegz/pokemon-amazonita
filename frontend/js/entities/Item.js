import pokeApi from "../APIs/PokeApi.js";
import Api from "../APIs/Api.js";
class Item{
    #id;
    #idPokeApi;
    #nome;
    #descricao;
    #efeito;
    #urlImagem;
    #categoria;

    constructor(id, idPokeApi, nome, descricao, efeito,urlImagem,categoria){
        this.#id = id;
        this.#idPokeApi = idPokeApi;
        this.#nome = nome;
        this.#descricao = descricao;
        this.#efeito = efeito;
        this.#urlImagem = urlImagem;
        this.#categoria = categoria;
    }
    get id() {
        return this.#id;
    }
    get categoria(){
        return this.#categoria;   
    }
    get idPokeApi() {
        return this.#idPokeApi;
    }
    get nome() {
        return this.#nome;
    }
    get descricao() {
        return this.#descricao;
    }
    get efeito() {
        return this.#efeito;
    }
    get urlImagem() {
        return this.#urlImagem;
    }
    set urlImagem(urlImagem) {
        this.#urlImagem = urlImagem;
    }
    set efeito(efeito) {
        this.#efeito = efeito;
    }
    set categoria(categoria) {
        this.#categoria = categoria;
    }
    set idPokeApi(idPokeApi) {
        this.#idPokeApi = idPokeApi;
    }
    set descricao(descricao) {
        this.#descricao = descricao;
    }set nome(nome) {
        this.#nome = nome;
    }
    set id(id) {
        this.#id = id;
    }

    static async carregarItem(idPokeApi,idBanco ){
        const itemData = await pokeApi.buscarItem(idPokeApi);
        const itemBanco = await Api.buscarItem(idBanco);
        const item = new Item(
            itemData.id,
            itemBanco.id,
            itemData.name,
            itemData.flavor_text_entries[0].text,
            itemData.effect_entries[0].effect,
            itemData.sprites.default,
            itemData.category.name
        )
        return item;
    }
}
export default Item;