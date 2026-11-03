class CalculadoraDano{
    static ataque(pokeAtaque, pokeDefesa, ataque){
        let statAtaque;
        let statDefesa;

        let multiplicadores = this.resolveMultiplicadores(pokeAtaque, pokeDefesa, ataque);
        let classeAtaque = ataque.damage_class.name;

        if(classeAtaque == "physical"){
            statAtaque = pokeAtaque.ataque;    
            statDefesa = pokeAtaque.defesa;   
        } else if(classeAtaque == "special"){
            statAtaque = pokeAtaque.ataqueEspecial;    
            statDefesa = pokeAtaque.defesaEspecial; 
        } else {
            throw new Error("ainda não implementado");
        }

        let dano = (((2 * pokeAtaque.nivel / 5) * ataque.power * (statAtaque / statDefesa)) / 50) + 2

        return dano * multiplicadores;
    }

    static resolveMultiplicadores(pokeAtaque, pokeDefesa, ataque){
        let stab

        return 1;
    }
}

export default CalculadoraDano;