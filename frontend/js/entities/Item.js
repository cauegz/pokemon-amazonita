import pokeApi from "../APIs/PokeApi.js";
class Item{
    #id;
    #idPokeApi;
    #nome;
    #descricao;
    #efeito;
    #urlImagem;

    constructor(id, idPokeApi, nome, descricao, efeito,urlImagem){
        this.#id = id;
        this.#idPokeApi = idPokeApi;
        this.#nome = nome;
        this.#descricao = descricao;
        this.#efeito = efeito;
        this.#urlImagem = urlImagem;
    }
    get id() {
        return this.#id;
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

    async carregarItem(id){
        const itemData = await pokeApi.buscarItem(id);
        this.#id = itemData.id;
        this.#nome = itemData.name;
        this.#descricao = itemData.flavor_text_entries[0].text;
        this.#efeito = itemData.effect_entries[0].effect;
        this.#urlImagem = itemData.sprites.default;
    }
}
export default Item;