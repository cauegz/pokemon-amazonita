import BatalhaView from "../entities/view/BatalhaView.js"
import Time from "../entities/Time.js";
import verificarSessao from "../services/verificarSessao.js";

let user = await verificarSessao();

let view = new BatalhaView(await Time.carregarTime(user.treinador));