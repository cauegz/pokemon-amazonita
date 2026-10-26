import verificarSessao from "../services/verificarSessao.js";
import Time from "../entities/Time.js";
import batalhaView from "../../../public/frontend/js/BatalhaView.js"


async function iniciarBatalha(){
    try{
        const usuario = await verificarSessao();
        if(!usuario) return
        const objTime = await Time.carregarTime(usuario.treinador);
        new batalhaView(objTime);
    }catch(error){
        console.log(error);
    }

}
iniciarBatalha();
