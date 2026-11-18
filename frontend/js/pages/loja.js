import LojaView from "../entities/view/LojaView.js";
import Carrinho from "../entities/Carrinho.js"

async function iniciarLoja() {
    var carrinho = new Carrinho();
    new LojaView(1, carrinho);
}
iniciarLoja();