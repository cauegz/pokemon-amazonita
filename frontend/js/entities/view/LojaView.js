import Produto from "../Produto.js";

export default class LojaView {
    #produtos;
    #carrinho;

    constructor(loja_id) {

        this.inicializar(loja_id);
    }

    async inicializar(id) {
        this.#produtos = await Produto.listaProdutosByLojaId(id);
        this.carregarMercadoria();
        this.#carrinho = []
    }

    carregarMercadoria() {
        const local = document.getElementById("mesa");

        local.innerHTML = this.#produtos.map(produto => `
            <div>
                <div class="produto" id="produto-${produto.id}">
                    <div class="produtoNome">${produto.nome}</div>
                    <div class="produtoImg">
                        <img src="${produto.urlImagem}" alt="${produto.nome} image">
                    </div>
                    <div class="produtoPreco">
                        <legend>${produto.preco}</legend>
                        <img src="../../../images/moeda.png" alt="Moedas">
                    </div>
                </div>
            </div>
        `).join("") + `
            <div>

                <div id="botaoLimpar">
                    <button type="button">Limpar Carrinho</button>
                </div>
                <div id="botaoComprar">
                    <button type="button">Comprar</button>
                </div>
            </div>
        `;
        this.#produtos.forEach(produto => {
            document.getElementById(`produto-${produto.id}`).addEventListener("click", () => {
                this.#carrinho.push(produto.id);
                console.log(this.#carrinho)
            });
        });

        document.querySelector("#botaoLimpar button").addEventListener("click", () => {
            this.#carrinho = [];
        })
    }
}
