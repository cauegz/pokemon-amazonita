class CalculadoraStats{
    static cura = new Map([
        ["potion", 20],
        ["super-potion", 50],
        ["hyper-potion", 200],
        ["max-potion", 0],
        ["full-restore",0]
    ]);

    static usarItem(pokemon, item){
        console.log(pokemon.hpAtual);
        if(item.categoria == "healing"){
           const quantidadeCura = CalculadoraStats.cura.get(item.nome);
           pokemon.hpAtual += quantidadeCura;
           if(pokemon.hpAtual>pokemon.hp) pokemon.hpAtual= pokemon.hp;
            console.log(pokemon.hpAtual);
        }
    }
}
export default CalculadoraStats;