import LojaView from "../entities/view/LojaView.js";
import verificarSessao from "../services/verificarSessao.js";

async function iniciarLoja() {
    const user = await verificarSessao();
    if(!user) return;


    new LojaView(1, user.dinheiro);
}
iniciarLoja();