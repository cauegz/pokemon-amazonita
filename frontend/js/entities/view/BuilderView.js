import PokeApi from "../../APIs/PokeApi.js";
import Pokemon from "../Pokemon.js";

export default class BuilderView {
    #time;
    #posicao;

    constructor(time) {
        this.#time = time;
        this.#posicao = null;

        this.selecionarPoke = document.getElementById("selecionar-poke"); //modal
        this.pokemons = document.getElementById("pokemons"); //lista

        this.configurarEventos();
    }

    configurarEventos() {
        const botoes = document.querySelectorAll(".btn-selecionar-poke"); //pega o espaço do time

        botoes.forEach(botao => {
            botao.addEventListener("click", () => {
                this.#posicao = botao.dataset.poke;
                this.selecionarPoke.showModal(); //abre o dialog
                this.carregarPokemons();
            });
        });

        document.getElementById("fecha-modal")
            .addEventListener("click", () => {
                this.selecionarPoke.close();
            });

        
        this.selecionarPoke.addEventListener("click", async event => {
            // Busca o elemento com a classe CSS btn-opcao no alvo ou em seus ancestrais.
            const botao = event.target.closest(".btn-opcao");
            if (!botao) return;

            try {
                const pokemonApi = await PokeApi.buscarPokemon(botao.value); //busca na api com o valor do botao (id do pokemon)

                let pokemon = new Pokemon(
                    null,
                    pokemonApi.name,
                    pokemonApi.sprites.front_default,
                    pokemonApi.id,
                    50,
                )
                console.log("pokemon temporario")
                console.log(pokemon)

                this.#time.adicionarPokemon(this.#posicao, pokemon);

                this.mostrarPokemon(pokemon);
                this.selecionarPoke.close();
            } catch (erro) {
                console.error("Erro ao selecionar Pokémon:", erro);
            }
        });
        this.carregaTimeBanco();
    }

    async carregarPokemons() {
        try {
            this.pokemons.innerHTML = "Carregando Pokémon...";
            const especies = await PokeApi.buscarGeracoesIniciais();

            let html = "";

            especies.forEach(especie => {
                // Extraí o ID da URL de cada espécie.
                const id = especie.url.match(/\/(\d+)\/$/)?.[1];

                if (!id) return;

                const imgUrl =
                    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

                html += `
                    <div id="poke-${id}" class="pokemon">
                        <img src="${imgUrl}" loading="lazy">
                        <p>${especie.name}</p>

                        <button class="btn-opcao" value="${id}">
                            Escolher
                        </button>
                    </div>
                `;
            });
            this.pokemons.innerHTML = html;
        } catch (erro) {
            console.error("Erro ao carregar Pokémon:", erro);
            this.pokemons.innerHTML = "Erro ao carregar Pokémon.";
        }
    }

    //ta vindo promise
    mostrarPokemon(pokemon) {
        const div = document.getElementById(
            `pokemon-${this.#posicao}`
        );

        //deixar a primeira letra maiuscula
        const nome = pokemon.nome.charAt(0).toUpperCase() + pokemon.nome.slice(1); 

        div.innerHTML = `
            <p>${nome}</p>
            <img src="${pokemon.urlImagem}">
        `;
    }

    async carregaTimeBanco() {
        this.#posicao = 1;
        for(const pokemon of this.#time.pokemon){
            if(!pokemon) {
                this.#posicao++;
                continue;
            }
            this.mostrarPokemon(pokemon);
            this.#posicao++;
        }
    }
}
