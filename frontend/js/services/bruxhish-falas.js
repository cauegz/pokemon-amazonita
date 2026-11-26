var frases = [
    "Bem-vindo à Amazônia! Muita árvore, muito bicho e Pokémon... Você pode seguir as direções acima para encontrar os ginásios. Tenta não virar lenda urbana logo no primeiro dia. Hhahaha!",
    "Esta é a treinadora Akazaki! Seu ginásio é no lago. Olha onde pisa, porque a água não avisa antes de puxar.",
    "Bigolin tá nos ribeirinhos. Se você tropeça no próprio pé, o rio já agradece o lanche. Boa sorte, treinador!",
    "Raissa fica no museu. Leva cabeça junto, que só soco não decifra história velha."

]

function verificaSessaoPrimeiraVezTela() {
    if (!localStorage.getItem("primeiraVezTela")) {
        localStorage.setItem("primeiraVezTela", "true");
        
    }

}