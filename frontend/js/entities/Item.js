import pokeApi from "../APIs/PokeApi.js";
import Api from "../APIs/Api.js";
class Item{
    _id;
    _idPokeApi;
    _nome;
    _descricao;
    _efeito;
    _urlImagem;
    _categoria;

    constructor(id, idPokeApi, nome, descricao, efeito,urlImagem,categoria){
        this._id = id;
        this._idPokeApi = idPokeApi;
        this._nome = nome;
        this._descricao = descricao;
        this._efeito = efeito;
        this._urlImagem = urlImagem;
        this._categoria = categoria;
    }
    get id() {
        return this._id;
    }
    get categoria(){
        return this._categoria;
    }
    get idPokeApi() {
        return this._idPokeApi;
    }
    get nome() {
        return this._nome;
    }
    get descricao() {
        return this._descricao;
    }
    get efeito() {
        return this._efeito;
    }
    get urlImagem() {
        return this._urlImagem;
    }
    set urlImagem(urlImagem) {
        this._urlImagem = urlImagem;
    }
    set efeito(efeito) {
        this._efeito = efeito;
    }
    set categoria(categoria) {
        this._categoria = categoria;
    }
    set idPokeApi(idPokeApi) {
        this._idPokeApi = idPokeApi;
    }
    set descricao(descricao) {
        this._descricao = descricao;
    }set nome(nome) {
        this._nome = nome;
    }
    set id(id) {
        this._id = id;
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