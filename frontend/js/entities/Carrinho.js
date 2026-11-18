export default class Carrinho{
    #produtos;

    constructor(){
        this.#produtos = [];
    }

    adicionarProduto(id){
        this.#produtos.push(id);
        console.log(this.#produtos)
    }
}