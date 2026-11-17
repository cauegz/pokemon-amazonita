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


    static usarItem(pokemon, item){
        if(item.categoria == "healing"){
           const quantidadeCura = CalculadoraStats.cura.get(item.nome);
           pokemon.hpAtual += quantidadeCura ;
           if(pokemon.hpAtual>pokemon.hp) pokemon.hpAtual= pokemon.hp;
        }
        if(item.categoria == "status-cures"){
            const efeitoCura = CalculadoraStats.statusCures.get(item.nome);
            if(pokemon.efeito == efeitoCura) pokemon.efeito = null;
        }
    }
}
export default CalculadoraStats;