export default class PokeAPI {
    static URL = "https://pokeapi.co/api/v2";

    static async buscarPokemon(id) {
        const response = await fetch(
            `${this.URL}/pokemon/${id}`
        );

        if (!response.ok) {
            throw new Error("Erro ao buscar Pokémon.");
        }

        return await response.json();
    }

    static async buscarAtaque(numAtaque) {
        const response = await fetch(
            `${this.URL}/move/${numAtaque}`
        );
        if (!response.ok) {
            throw new Error("Erro ao buscar equipe");
        }
        return await response.json();
    }

    static async buscarTipo(id) {
        const response = await fetch(
            `${this.URL}/type/${id}`
        );
        if (!response.ok) {
            throw new Error("Erro ao buscar tipo");
        }
        return await response.json();
    }

    static async buscarGeracao(numero) {
        const response = await fetch(
            `${this.URL}/generation/${numero}`
        );

        if (!response.ok) {
            throw new Error("Erro ao buscar geração.");
        }

        return await response.json();
    }

    static async buscarGeracoesIniciais() {
        const [gen1, gen3] = await Promise.all([ //.all pra fazer duas promisses em paralelo
            this.buscarGeracao(1),
            this.buscarGeracao(3)
        ]);

        return [
            ...gen1.pokemon_species,
            ...gen3.pokemon_species
        ];
    }

    static async buscarItens() {
        const response = await fetch(
            `${this.URL}/item?limit=1000`
        );
        if (!response.ok) {
            throw new Error("Erro ao buscar itens");
        }
        return await response.json();
    }

    static async buscarItem(id) {
        const response = await fetch(
            `${this.URL}/item/${id}`
        );
        if (!response.ok) {
            throw new Error("Erro ao buscar item.");
        }
        return await response.json();
    }

    static async buscarProximaEvolucao(pokeApiId) {
        // busca os dados do Pokémon atual
        const pokemon = await this.buscarPokemon(pokeApiId);

        // pega os dados da espécie e, em seguida, a cadeia de evolução completa
        const respostaEspecie = await fetch(pokemon.species.url);
        const especie = await respostaEspecie.json();

        const respostaCadeia = await fetch(especie.evolution_chain.url);
        const cadeia = await respostaCadeia.json();

        // transforma em texto pra comparar com o extraido
        const idProcurado = String(pokeApiId);

        //percorre a cadeia de evolução até achar o Pokémon atual
        const buscar = (estagio) => {
            // extrai o ID do estágio atual a partir da URL da espécie
            const idDoEstagio = estagio.species.url.match(/\/(\d+)\/?$/)[1]; //(".../pokemon-species/25/" -> pega "25")

            // Achou o Pokémon atual na cadeia
            if (idDoEstagio === idProcurado) {
                const proximasEvolucoes = estagio.evolves_to || [];

                // Se não tiver nenhuma evolução a partir daqui, retorna null
                if (proximasEvolucoes.length === 0) {
                    return null;
                }

                // Pega a primeira próxima evolução disponível
                const proxima = proximasEvolucoes[0];
                const idDaEvolucao = proxima.species.url.match(/\/(\d+)\/?$/)[1];

                // Retorna os dados da próxima evolução
                return {
                    id: idDaEvolucao,
                    nome: proxima.species.name
                };
            }

            // se ainda não achou o Pokémon atual, procura nos próximos estágios da cadeia
            for (const proxima of estagio.evolves_to || []) {
                const resultado = buscar(proxima);
                if (resultado) {
                    return resultado;
                }
            }
            // caso não encontre nada
            return null;
        };

        // começa a busca pela base da cadeia de evolução
        return buscar(cadeia.chain);
    }
}

