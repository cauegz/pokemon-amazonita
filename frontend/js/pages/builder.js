
import verificarSessao from "../services/verificarSessao.js";
import Time from "../entities/Time.js";
import Api from "../APIs/Api.js";
import BuilderView from "../entities/view/BuilderView.js";

async function iniciarBuilder() {
    try {
        //sessao
        const usuario = await verificarSessao();
        if (!usuario) return;

        // Carrega o time 
        const objTime = await Time.carregarTime(usuario.treinador);
        console.log("time: ")
        console.log(objTime)

        new BuilderView(objTime);

        document.getElementById("enviar")
            .addEventListener("click", async () => {
                const botao = document.getElementById("enviar");
                botao.disabled = true;

                try {
                    await Api.enviarTime(objTime);
                    // Os atributos e a vida são calculados pelo backend ao salvar.
                    // O objeto usado pelo builder ainda não contém esses dados.
                    localStorage.removeItem("time-" + usuario.treinador);
                    window.location.href = "game.html";
                } catch (erro) {
                    console.error("erro ao enviar o time:", erro);
                    botao.disabled = false;
                    alert("Não foi possível salvar o time. Tente novamente.");
                }
            });

    } catch (erro) {
        console.error("erro ao iniciar o builder:", erro);
    }
}

iniciarBuilder();
