import Api from "../APIs/Api.js";
import verificarSessao from "../services/verificarSessao.js";
const user = await verificarSessao();

const botaoCurar = document.getElementById("curar");

botaoCurar.addEventListener("click", () => {
    Api.curarTime(user.idTreinador);
})