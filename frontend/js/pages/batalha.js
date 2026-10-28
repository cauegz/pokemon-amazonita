import verificarSessao from "../services/verificarSessao.js";

import Time from "../entities/Time.js";
import BatalhaView from "../entities/view/BatalhaView.js"

async function iniciarBatalha(){
    try{
        const usuario = await verificarSessao();
        const objTime = await Time.carregarTime(usuario.treinador);
        
        new BatalhaView(objTime);
    }catch(error){
        console.log(error);
    }

}
iniciarBatalha();
