class CalculadoraDano{
    static ataque(pokeAtaque, pokeDefesa, ataque){
        let statAtaque;
        let statDefesa;

        let multiplicadores = this.resolveMultiplicadores(pokeAtaque, pokeDefesa, ataque);
        let classeAtaque = ataque.classe;

        if(classeAtaque == "physical"){
            statAtaque = pokeAtaque.ataque;    
            statDefesa = pokeAtaque.defesa;   
        } else if(classeAtaque == "special"){
            statAtaque = pokeAtaque.ataqueEspecial;    
            statDefesa = pokeAtaque.defesaEspecial; 
        } else {
            throw new Error("ainda não implementado");
        }

        let dano = (((2 * pokeAtaque.nivel / 5) * ataque.poder * (statAtaque / statDefesa)) / 50) + 2

        return Math.trunc(dano * multiplicadores);
    }

    static resolveMultiplicadores(pokeAtaque, pokeDefesa, ataque){
        let multiplicadorTipo = this.resolveMultTipo(pokeDefesa.tipos, ataque.tipo);
        let stab = this.resolveStab(pokeAtaque.tipos, ataque.tipo);

        return multiplicadorTipo * stab;
    }

    static resolveStab(tiposPoke, ataqueTipo){
        for(const tipo of tiposPoke){
            if(tipo === null){
                console.log("é nulo")
                continue;
            }
            if(tipo.nome == ataqueTipo.nome){
                return 1.5;
            }
        }
        return 1;
    }

    static resolveMultTipo(tiposPoke, tipoAtaque){
        let relacoes = tipoAtaque.relacoesDano;

        let multiplicador = 1;
        for (const tipo of tiposPoke) {
            if(tipo === null){
                console.log("é nulo")
                continue;
            }
            for (const semDano of relacoes.no_damage_to) {
                if(this.extrairIdUrl(semDano.url) == tipo.pokeApi){
                    multiplicador *= 0;
                }
            }
            
            for (const meioDano of relacoes.half_damage_to) {
                if(this.extrairIdUrl(meioDano.url) == tipo.pokeApi){
                    multiplicador *= 0.5;
                }
            }

            for (const dobroDano of relacoes.double_damage_to) {
                if(this.extrairIdUrl(dobroDano.url) == tipo.pokeApi){
                    multiplicador *= 2;
                }
            }
        }

        return multiplicador;
    }

    static extrairIdUrl(url){
        return url.slice(-5).replace(/[^0-9]/g, '');
    }
}

export default CalculadoraDano;