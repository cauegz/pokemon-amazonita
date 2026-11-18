import Produto from "../Produto.js";

export default class LojaView{
    #produtos;

    constructor(loja_id){
        this.inicializar(loja_id);
    }
    
    configurarEventos(){
        this.carregarMercadoria();
    }
    
    async inicializar(id){
        this.#produtos = await Produto.listaProdutosByLojaId(id);
        this.configurarEventos();
    }

    carregarMercadoria(){
        let local = document.getElementById("mesa")
        console.log(this.#produtos);
        this.#produtos.forEach(produto => {
            local.innerHTML += 
            `<div>
                <div class="produto">
                <div class="produtoNome">${produto.nome}</div>
                    <div class="produtoImg"><img src="${produto.urlImagem}" alt="${produto.nome} image"></div>
                    <div class="produtoPreco">
                    <legend>${produto.preco}</legend><img src="../../../images/moeda.png">
                    </div>
                </div>
            </div>`;
        });
        local.innerHTML += 
        `<div>
            <div id="botaoComprar">
                <button type="button">Comprar</button>
            </div>
        </div>`;
    }

}