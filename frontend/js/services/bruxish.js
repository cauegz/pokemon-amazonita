import verificarSessao from "../services/verificarSessao.js";

const usuario = await verificarSessao();

const popovers = document.querySelectorAll(".interface-bruxish");

const spanNome = document.getElementById("nome-usuario");
if(spanNome){
    spanNome.innerHTML = usuario.nome
}

popovers.forEach(popover => {
    console.log(sessionStorage.getItem("bruxish-" + popover.id))
    if(!sessionStorage.getItem("bruxish-" + popover.id)){
        // descomente isso para o bruxish nao ficar voltando
        // sessionStorage.setItem("bruxish-" + popover.id, true); 
        popover.showPopover();
    }
});