import Produto from "../Produto.js";

export default class LojaView {
    #produtos;
    #carrinho; 

    constructor(loja_id, carrinho) {
        this.inicializar(loja_id, carrinho);
    }

    configurarEventos() {
        this.carregarMercadoria();
    }

    async inicializar(id, carrinho) {
        this.#produtos = await Produto.listaProdutosByLojaId(id);
        this.#carrinho = carrinho;
        this.configurarEventos();
    }

    carregarMercadoria() {
        let local = document.getElementById("mesa")
        console.log(this.#produtos);
        this.#produtos.forEach(produto => {
        local.innerHTML += `
            <div>
                <div class="produto" id="produto-${produto.id}">
                    <div class="produtoNome">${produto.nome}</div>
                    <div class="produtoImg">
                        <img src="${produto.urlImagem}" alt="${produto.nome} image">
                    </div>
                    <div class="produtoPreco">
                        <legend>${produto.preco}</legend>
                        <img src="../../../images/moeda.png">
                    </div>
                </div>
            </div>
        `;

        document.getElementById(`produto-${produto.id}`)
            .addEventListener('click', () => {
                this.#carrinho.adicionarProduto(produto.id);
            });
    });
        local.innerHTML +=
            `<div>
            <div id="botaoComprar">
                <button type="button">Comprar</button>
            </div>
        </div>`;
    }

}