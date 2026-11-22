import verificarSessao from "../services/verificarSessao.js";
import Game from "../entities/gameManager/Game.js";
import Time from "../entities/Time.js";
import Inventario from "../entities/Inventario.js";
window.addEventListener('load', async function(){
    const usuario = await verificarSessao();

    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');
    canvas.width = 1020;
    canvas.height = 586;

    const game = new Game(canvas.width, canvas.height); 
    
    const time = await Time.carregarTime(usuario.treinador);
    console.log(time)

    function animate(){
        context.clearRect(0, 0, canvas.width, canvas.height); // limpa o canvas para que ao mudar objetos de posição não deixar rastro
        game.update();
        game.draw(context);
        requestAnimationFrame(animate);
    }
    animate();

    const modal = document.getElementById("abreMochila");
    const htmlItem = document.getElementById("mochilaItems");
    const inventario = new Inventario();

    await inventario.carregarInventario(usuario.treinador);

    const renderizarInventario = () => {
        htmlItem.innerHTML = "";

        const itens = inventario.items.filter(item => item !== null);

        if (itens.length === 0) {
            htmlItem.innerHTML = "<p>Inventário vazio.</p>";
            return;
        }

        for (const item of itens) {
            htmlItem.innerHTML += `
                <button type="button" class="item-inventario" data-item-id="${item.id}">
                    <img src="${item.urlImagem}" alt="${item.nome}">
                    <span>${item.nome}</span>
                </button>
            `;
        }
    };

    document.getElementById("mochila").addEventListener("click", () => {
        renderizarInventario();
        modal.showModal();
    });
})