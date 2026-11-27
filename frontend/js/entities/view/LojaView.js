import Produto from "../Produto.js";
import animacaoCarregar from "../../services/loading.js";

export default class LojaView {
    #produtos;
    #carrinho;
    #dinheiroUsuario;
    #valorCarrinho;

    constructor(loja_id, dinheiro) {
        this.#dinheiroUsuario = dinheiro;
        this.inicializar(loja_id);
    }

    async inicializar(id) {
        this.#produtos = await Produto.listaProdutosByLojaId(id);
        this.carregarMercadoria();
        this.#carrinho = [];
        this.#valorCarrinho = 0;

        document.getElementById('dinheiro').innerHTML =  this.#dinheiroUsuario;
        this.#produtos.forEach(produto => {
            document.getElementById(`produto-${produto.id}`).addEventListener("click", () => {
                this.#carrinho.push(produto.id);
                this.#valorCarrinho += produto.preco;
                this.atualizarValorCarrinho();
                                                                                    // Pega a quant. de produtos que estão no carrinho com base no id
                document.querySelector(`#produto-${produto.id} .quant`).innerHTML = this.#carrinho.filter(x => x === produto.id).length
                console.log(this.#valorCarrinho);
                console.log(this.#carrinho);
            });
        });

        
        document.querySelector("#botaoLimpar button").addEventListener("click", () => {
            this.limparCarrinho()
        })

        document.querySelector("#botaoComprar button").addEventListener("click", async () => {
            if (this.#carrinho.length == 0) {
                alert("Selecione pelo menos um item antes de comprar.");
                return;
            }
            if(this.#valorCarrinho > this.#dinheiroUsuario){
                document.getElementById('valorCarrinho').classList.add('animacaoPagamentoNegado');
                setTimeout(()=>{
                    document.getElementById('valorCarrinho').classList.remove('animacaoPagamentoNegado');
                }, 3000)
            }
            else {
                try {
                    await Produto.comprar(this.#carrinho);
                    this.#dinheiroUsuario -= this.#valorCarrinho;
                    this.limparCarrinho();
                    document.getElementById('dinheiro').innerHTML = this.#dinheiroUsuario;
                } catch (erro) {
                    console.error("Erro na compra:", erro);
                    alert(erro.message);
                }
            }
        })

        animacaoCarregar("jogo", "flex");

    }

    carregarMercadoria() {
        const local = document.getElementById("mesa");

        local.innerHTML = this.#produtos.map(produto => `
            <div>
                <div class="produto" id="produto-${produto.id}">
                <div class="produtoNome">${produto.nomeFormatado} </div>
                <span class='quant'></span>
                <div class="produtoImg">
                        <img src="${produto.urlImagem}" alt="${produto.nome} image">
                    </div>
                    <div class="produtoPreco">
                        <legend>${produto.preco}</legend>
                        <img src="../../../images/moeda.png" class="moedaIcon" alt="Moedas">
                    </div>
                </div>
            </div>
        `).join("") + `
            <div id="botoesAcao">
                <div id="botaoLimpar">
                    <button type="button">Limpar Carrinho</button>
                </div>
                <div id="botaoComprar">
                    <button type="button">Comprar</button>
                </div>
            </div>
        `;
    }

    limparCarrinho(){
        this.#carrinho = [];
        this.#valorCarrinho = 0;
        this.#produtos.forEach(produto =>{
            document.querySelector(`#produto-${produto.id} .quant`).innerHTML = '';
        })
        this.atualizarValorCarrinho();
    }

    atualizarValorCarrinho() {
        let local = document.querySelector("#valorCarrinho span");
        local.innerHTML = this.#valorCarrinho;

        if (this.#valorCarrinho > this.#dinheiroUsuario){
            local.style.color = 'red';
        }
        else {
            local.style.color = 'white';
        }
    }
}
