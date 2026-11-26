import Api from "../APIs/Api.js";
import verificarSessao from "../services/verificarSessao.js";
const user = await verificarSessao();

const botaoCurar = document.getElementById("curar");

botaoCurar.addEventListener("click", async () => {
    
    const resposta = await Api.curarTime();
    console.log(resposta)
    if(!resposta.ok){
        console.error(resposta.mensagem);
    }

    //atualiza a vida no localStorage tambem
    let time = JSON.parse(localStorage.getItem("time-" + user.treinador));
    for(const pokeTime of time){
        if(pokeTime == null){
            continue;
        }
        pokeTime.hpAtual = pokeTime.hp;
        console.log(pokeTime)
    }

    localStorage.setItem("time-" + user.treinador, JSON.stringify(time));

    alert("pokemons curados com sucesso")
})