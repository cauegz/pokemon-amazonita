class Pokemon{
    #id;
    #nome;
    #urlImagem;
    #pokeApi;
    #isActive;

    constructor(id, nome, urlImagem, pokeApi, isActive) {
        this.id = id;
        this.nome = nome;
        this.urlImagem = urlImagem;
        this.pokeApi = pokeApi;
        this.isActive = false;
    }
}

export default Pokemon;