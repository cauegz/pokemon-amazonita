import Time from "../entities/Time.js";
import verificarSessao from "../services/verificarSessao.js";

//deixa essa parte responsavel por inicializar os pokemons e tudo o
//que precisa pra batalha, se não vamos ficar fazendo requisção desnecessaria
async function iniciarBatalha() {
    //verificação de sessão como no builder.js
    const user = await verificarSessao();
    if(!user) return;
    
    //time e pokemons
    const time = await Time.carregarTime(user.treinador);
    console.log(time)

    const jogador = await preparaPoke(time.pokemon.banco[0]);

    //const oponente = await preparaPoke(1);//substituir pelo id real posteriormente
}

iniciarBatalha();
