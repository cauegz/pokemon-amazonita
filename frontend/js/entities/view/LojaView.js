import Produto from "../Produto.js";

export default class LojaView{
    #produtos;

    constructor(loja_id){
        this.inicializar(loja_id);
    }
    
    configurarEventos(){
        this.carregarAcervo();
    }
    
    async inicializar(id){
        this.#produtos = await Produto.listaProdutosByLojaId(id);
        this.configurarEventos();
    }

    carregarAcervo(){
        let local = document.getElementById("principal")
        console.log(this.#produtos);
        this.#produtos.forEach(produto => {
            local.innerHTML += `<img src="${produto.urlImagem}" alt="${produto.nome}"><p>${produto.nome}</p><br> `;
        });
    }

}