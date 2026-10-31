import Api from "../APIs/Api.js";
import PokeApi from "../APIs/PokeApi.js";

class Pokemon{
    #id;
    #nome;
    #urlImagem;
    #pokeApi;
    #nivel;
    #hp;
    #hpAtual;
    #ataque;
    #defesa;
    #ataqueEspecial;
    #defesaEspecial;
    #velocidade;
    #ataques;
    #efeito;

    constructor(id, nome, urlImagem, pokeApi, nivel = 40, hp, hpAtual, ataque, defesa, ataqueEspecial, defesaEspecial, velocidade, efeito) {
        this.#id = id;
        this.#nome = nome;
        this.#urlImagem = urlImagem;
        this.#pokeApi = pokeApi;
        this.#nivel = nivel;
        this.#hp = hp;
        this.#hpAtual = hpAtual;
        this.#ataque = ataque;
        this.#defesa = defesa;
        this.#ataqueEspecial = ataqueEspecial;
        this.#defesaEspecial = defesaEspecial;
        this.#velocidade = velocidade;
        this.#ataques = new Array(4).fill(null);
        this.#efeito = efeito;
    }

    get id() {
        return this.#id;
    }

    get nome() {
        return this.#nome;
    }

    set nome(nome) {
        this.#nome = nome;
    }

    get urlImagem() {
        return this.#urlImagem;
    }

    set urlImagem(urlImagem) {
        this.#urlImagem = urlImagem;
    }

    get pokeApi() {
        return this.#pokeApi;
    }

    set pokeApi(pokeApi) {
        this.#pokeApi = pokeApi;
    }

    get nivel() {
        return this.#nivel;
    }

    set nivel(nivel) {
        this.#nivel = nivel;
    }

    get hp() {
        return this.#hp;
    }

    set hp(hp) {
        this.#hp = hp;
    }

    get hpAtual() {
        return this.#hpAtual;
    }

    set hpAtual(hpAtual) {
        this.#hpAtual = hpAtual;
    }

    get ataque() {
        return this.#ataque;
    }

    set ataque(ataque) {
        this.#ataque = ataque;
    }

    get defesa() {
        return this.#defesa;
    }

    set defesa(defesa) {
        this.#defesa = defesa;
    }

    get ataqueEspecial() {
        return this.#ataqueEspecial;
    }

    set ataqueEspecial(ataqueEspecial) {
        this.#ataqueEspecial = ataqueEspecial;
    }

    get defesaEspecial() {
        return this.#defesaEspecial;
    }

    set defesaEspecial(defesaEspecial) {
        this.#defesaEspecial = defesaEspecial;
    }

    get velocidade() {
        return this.#velocidade;
    }

    set velocidade(velocidade) {
        this.#velocidade = velocidade;
    }

    get efeito(){
        return this.#efeito;
    }

    set efeito(efeito){
        this.#efeito = efeito;
    }

    adicionarAtaque(ataque, posicao) {
        this.#ataques[posicao] = ataque;
    }


    static async carregaPokemon(idPokeBanco) {
        const pokeBanco = await Api.buscarPokemon(idPokeBanco);
        const pokemonPokeApi = await PokeApi.buscarPokemon(pokeBanco.pokeApi);
        const ataquesBanco = await Api.buscarAtaques(pokeBanco.id);

        const efeito = null;
        if(pokeBanco.efeito){
            efeito = await Api.buscarEfeito(pokeBanco.efeito);
        }

        let pokemon = new Pokemon(
            pokeBanco.id,
            //depois pegar o nome do banco aqui
            pokemonPokeApi.name,
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonPokeApi.id}.png`,
            pokemonPokeApi.id,
            50,
            pokeBanco.hp,
            pokeBanco.hpAtual,
            pokeBanco.ataque,
            pokeBanco.defesa,
            pokeBanco.ataqueEspecial,
            pokeBanco.defesaEspecial,
            pokeBanco.velocidade,
            efeito
        );

        let posicao = 0;
        for(const ataqueBanco of ataquesBanco){
            if(!ataqueBanco) continue;
            const ataque = await PokeApi.buscarAtaque(ataqueBanco.pokeApi);
            pokemon.adicionarAtaque(ataque, posicao);
            posicao++;
        }

        return pokemon;
    }
}

export default Pokemon;