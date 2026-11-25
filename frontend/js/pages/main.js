import verificarSessao from "../services/verificarSessao.js";
import Game from "../entities/gameManager/Game.js";
import Time from "../entities/Time.js";
import Inventario from "../entities/Inventario.js";
import PokeAPI from "../APIs/PokeApi.js";
import CalculadoraStats from "../entities/CalculadoraStats.js";
window.addEventListener("load", async function () {
    const usuario = await verificarSessao();

    const canvas = document.getElementById("gameCanvas");
    const context = canvas.getContext("2d");
    canvas.width = 1020;
    canvas.height = 586;

    const game = new Game(canvas.width, canvas.height);

    const time = await Time.carregarTime(usuario.treinador);
    console.log(time);

    function animate() {
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
        console.log("abriu invent");
        const items = inventario.items.filter((item) => item !== null);

        if (items.length === 0) {
            htmlItem.innerHTML = "<p>Inventário vazio.</p>";
            return;
        }

        for (const item of items) {
            htmlItem.innerHTML += `
                <button type="button" class="item-inventario" data-item-id="${item.id}">
                    <img src="${item.urlImagem}" alt="${item.nome}">
                    <span>${item.nome}</span>
                </button>
            `;
        }
        htmlItem.querySelectorAll(".item-inventario").forEach((botao) => {
            botao.addEventListener("click", () => {
                const item = items.find(
                    (itemAtual) =>
                        itemAtual.id === Number(botao.dataset.itemId),
                );

                escolherPokemon(item);
            });
        });
    };

    const escolherPokemon = async (item) => {
        let pokemons = [];

        if (item.categoria === "revival") {
            for (const pokemon of time.pokemon) {
                if (pokemon !== null && pokemon.hpAtual <= 0) {
                    pokemons.push({ pokemon: pokemon });
                }
            }
        } else if (item.categoria === "evolution") {
            for (const pokemon of time.pokemon) {
                if (pokemon !== null) {
                    const evolucao = await PokeAPI.buscarProximaEvolucao(
                        pokemon.pokeApi,
                    );

                    if (evolucao !== null) {
                        pokemons.push({
                            pokemon: pokemon,
                            evolucao: evolucao,
                        });
                    }
                }
            }
        } else {
            for (const pokemon of time.pokemon) {
                if (pokemon !== null) {
                    pokemons.push({ pokemon: pokemon });
                }
            }
        }

        const htmlItem = document.getElementById("mochilaItems");

        if (pokemons.length === 0) {
            htmlItem.innerHTML = "<p>Nenhum Pokémon pode usar este item.</p>";
            return;
        }

        htmlItem.innerHTML = pokemons
            .map(
                ({ pokemon, evolucao }) => `
            <button type="button"
                class="pokemon-inventario"
                data-posicao="${time.pokemon.indexOf(pokemon)}">
                <img src="${pokemon.urlImagem}" alt="${pokemon.nome}">
                <span>${pokemon.nome}</span>
                ${evolucao ? `<small> -> ${evolucao.nome}</small>` : ""}
            </button>
        `,
            )
            .join("");

        htmlItem.querySelectorAll(".pokemon-inventario").forEach((pokemon) => {
            pokemon.addEventListener("click", async () => {
                const posicao = pokemon.dataset.posicao;
                const resultado = await CalculadoraStats.usarItem(
                    time.pokemon[posicao],
                    item,
                    usuario.treinador,
                );
                if (item.categoria === "evolution" && resultado) {
                    time.pokemon[posicao] = resultado;
                    localStorage.setItem(
                        "time-" + usuario.treinador,
                        JSON.stringify(time),
                    );
                }
                modal.close();
            });
        });
    };

    document.getElementById("mochila").addEventListener("click", () => {
        renderizarInventario();
        modal.showModal();
    });
    document
        .getElementById("fechaMochila")
        .addEventListener("click", () => modal.close());

    function mostraTime(time) {
        const divTime = document.getElementById("menu-time");
        let htmlFinal = "";
        let cont = 1;

        time.forEach(pokemon => {
            const porcentagemHp = (pokemon.hpAtual * 100) / pokemon.hp;
            
            let classeCor = "hp-verde";
            if (pokemon.hpAtual < (pokemon.hp / 2)) {
                classeCor = "hp-laranja";
            }

            if (pokemon.hpAtual < (pokemon.hp / 4)) {
                classeCor = "hp-vermelho";
            } 

            //deixa a primeira letra maiusucla
            pokemon.nome = pokemon.nome.charAt(0).toUpperCase() + pokemon.nome.slice(1);

            htmlFinal += `
                <div id="pokeTime-${cont}" class="card-pokemon">
                    <img src="${pokemon.urlImagem}" alt="${pokemon.nome}" />
                    <div class="info-pokemon">
                        <p>${pokemon.nome}</p>
                        <span id="barra-hp-${cont}" class="barra-hp">
                            <span id="hp-${cont}" class="hp-preenchimento ${classeCor}" style="width: ${porcentagemHp}%;"></span>
                        </span>
                    </div>
                </div>
            `;
            cont++;
        });

        divTime.innerHTML = htmlFinal;
    }

    mostraTime(time.pokemon);
});
