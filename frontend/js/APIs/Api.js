export default class Api {
    static url = "/api";

    // Método geral para fazer requisições
    static async requisicao(endpoint, opcoes = {}) {
        const resposta = await fetch(`${this.url}${endpoint}`, {
            ...opcoes, //spread syntax, copia as propriedades do objeto opcoes para o objeto de configuração do fetch
            headers: {
                ...(opcoes.body ? { "Content-Type": "application/json" } : {}), //Se opcoes.body existir, adiciona o cabeçalho se não existir adiciona um objeto vazio.
                ...opcoes.headers
            },
            // Mantém os cookies da sessão nas requisições.
            credentials: "include"
        });

        if (!resposta.ok) {
            throw new Error(`${resposta.stacktrace}`);
        }

        return await resposta.json();
    }

    static async atualizarTime(time, idTreinador) {
        localStorage.setItem("time-" + idTreinador, JSON.stringify(time));
        const pokemons = time.pokemon ?? time;

        return await this.requisicao("/builder/atualiza", {
            method: "POST",
            body: JSON.stringify({
                pokemon: pokemons.map(pokemon => (
                    pokemon ? { hpAtual: pokemon.hpAtual, idPokeApi: pokemon.pokeApi } : null
                ))
            })
        });
    }

    static async enviarTime(time) {
        console.log(time)
        const ids = time.pokemon.map(pokemon => pokemon ? pokemon.pokeApi : null);
        return await this.requisicao("/builder", {
            method: "POST",
            body: JSON.stringify({
                pokemon: ids
            })
        });
    }

    /**
     * Salva o log de uma batalha, logBatalha deve ser:
     * {
     *    idTreinador1: (int),
     *    idTreinador2: (int),
     *    idVencedor: (int),
     *    recompensa: (int)
     * }
     * @param {Object} logBatalha 
     * @returns void
     */
    static async salvarLog(logBatalha) {
        return await this.requisicao("/batalha/log", {
            method: "POST",
            body: JSON.stringify({
                idTreinador1: logBatalha.idTreinador1,
                idTreinador2: logBatalha.idTreinador2,
                idVencedor: logBatalha.idVencedor,
                recompensa: logBatalha.recompensa
            })
        });
    }

    static async buscarPokemon(id) {
        return await this.requisicao(`/pokemon?id=${id}`);
    }

    static async buscarTime(id) {
        return await this.requisicao(`/treinador/time?id=${id}`);
    }

    static async buscarAtaques(id) {
        return await this.requisicao(`/ataques?id=${id}`);
    }

    static async buscarEfeito(id) {
        return await this.requisicao(`/efeito?id=${id}`);
    }

    static async buscarTipoPokeApi(id) {
        return await this.requisicao(`/tipo?id=${id}`);
    }

    static async buscarProdutos(loja_id) {
        return await this.requisicao(`/loja/listarProdutos?id=${loja_id}`)
    }

    static async buscarInventario(id) {
        return await this.requisicao(`/inventario?id=${id}`);
    }

    static async removerItemInventario(id) {
        return await this.requisicao(`/inventario/remover?id=${id}`, {
            method: "DELETE"
        });
    }

    static async buscarItem(id) {
        return await this.requisicao(`/item?id=${id}`);
    }

    static async buscarTreinadorByNpc(idNpc) {
        return await this.requisicao(`/treinador?idNpc=${idNpc}`);
    }

    static async buscarNpcById(nome) {
        return await this.requisicao(`/npc?id=${nome}`);
    }

    static async buscarProdutos(loja_id) {
        return await this.requisicao(`/loja/listarProdutos?id=${loja_id}`)
    }

    static async comprarProdutos(produtos) {
        let itens = { itens: produtos }

        return await this.requisicao("/loja/comprar", {
                method: "POST",
                body: JSON.stringify(itens)
        })
    }

    static async aumentarDinheiro(recompensa) {
        return await this.requisicao(`/usuario/recompensa?dinheiro=${recompensa}`)
    }

    /**
     * Envia a foto a partir de um FormData para o PHP
     * @param {FormData} dados 
     */
    static async enviarFoto(dados) {
        return fetch(`${this.url}/upload`, {
            method: "POST",
            body: dados,
            credentials: "include"
        });
    }

    static async removerFoto() {
        return await this.requisicao("/removerFoto")
    }
}
