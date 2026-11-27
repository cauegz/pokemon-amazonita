import Api from "../APIs/Api.js";
import Pokemon from "./Pokemon.js";
class CalculadoraStats{
    static cura = new Map([
        ["potion", 20],
        ["super-potion", 50],
        ["hyper-potion", 200],
        ["max-potion", 0],
        ["full-restore",0]
    ]);

    static statusCures = new Map([
        ["antidote", "poison"],
        ["burn-heal", "burn"],
        ["ice-heal", "freeze"],
        ["awakening", "sleep"],
        ["paralyze-heal", "paralysis"],
        ["full-heal", "all-stats"]
    ]);


    static async usarItem(pokemon, item, idTreinador = null){
        if(item.categoria == "healing"){
           const quantidadeCura = CalculadoraStats.cura.get(item.nome);
           if(item.nome == "max-potion"){
                pokemon.hpAtual = pokemon.hp;
           }
           if(item.nome == "full-restore"){
                pokemon.hpAtual = pokemon.hp;
                pokemon.efeito = null;      
           }
          
           pokemon.hpAtual += quantidadeCura ;
           if(pokemon.hpAtual>pokemon.hp) pokemon.hpAtual= pokemon.hp;
        }
        if(item.categoria == "status-cures"){
            const efeitoCura = CalculadoraStats.statusCures.get(item.nome);
            if(item.nome == "full-heal"){
                pokemon.efeito = null;   
            }else{
                if(pokemon.efeito == efeitoCura) pokemon.efeito = null;
            }
        }
        if(item.categoria == "revival"){
            if (pokemon.hpAtual > 0) return false;
            pokemon.hpAtual = Math.ceil(pokemon.hp / 2);
            pokemon.efeito = null;
            return true;
        }
        if(item.categoria == "evolution"){
            pokemon.pokeApi += 1;

            pokemon = await Pokemon.carregaPokemon(pokemon.id, pokemon.pokeApi);
            await Api.evoluirPokemon(pokemon.id,
                {
                    treinador: idTreinador,
                    idPokeApi: pokemon.pokeApi,
                    ataque: pokemon.ataque,
                    ataqueEspecial: pokemon.ataqueEspecial,
                    defesa: pokemon.defesa,
                    defesaEspecial: pokemon.defesaEspecial,
                    velocidade: pokemon.velocidade,
                    hpAtual: pokemon.hpAtual,
                    hp: pokemon.hp
                }
            );
            return pokemon;

        }
    }
}
export default CalculadoraStats;