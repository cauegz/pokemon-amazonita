class CalculadoraStats{
    static cura = new Map([
        ["potion", 20],
        ["hiperpotion", 50],
    ]);

    static usarItem(pokemon, item){
        console.log(pokemon.hpAtual);
        if(item.categoria == "healing"){
           const quantidadeCura = CalculadoraStats.cura.get(item.nome);
           pokemon.hpAtual += quantidadeCura;
            console.log(pokemon.hpAtual);
        }
    }
}
export default CalculadoraStats;