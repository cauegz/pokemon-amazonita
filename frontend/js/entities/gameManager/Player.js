export class Player {
    constructor(game){
        this.game = game;
        // tamanho do recorte no Spritesheet
        this.spriteWidth = 256;
        this.spriteHeight = 320;

        // tamanho do jogador no jogo
        this.width = 60;
        this.height = 75;

        this.x = 0;
        this.y = this.game.height - this.height;
        this.image = document.getElementById('player');
        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeed = 5;
    }

    //metodo pra mover com base no que o jogar clicar e para percorrer o quadrado com as sprites
    update(input){
        // detecta qual tecla foi pressionada no array input
        // Define a velocidade horizontal conforme a tecla pressionada.
        if(input.includes('ArrowRight')) this.speedX = this.maxSpeed;
        else if(input.includes('ArrowLeft')) this.speedX = -this.maxSpeed;
        else this.speedX = 0;
        this.x += this.speedX;
        // Define a velocidade vertical conforme a tecla pressionada.
        if(input.includes('ArrowDown')) this.speedY = this.maxSpeed;
        else if(input.includes('ArrowUp')) this.speedY = -this.maxSpeed;
        else this.speedY = 0;
        this.y += this.speedY;

        const maxX = this.game.width - this.width;
        const maxY = this.game.height - this.height;

        // Se sair pela esquerda, tenta ir para o cenário vizinho à esquerda.
        if (this.x < 0) {
            // Com vizinho, reaparece pela direita; sem vizinho, fica na borda.
            if (this.game.background.changeBackground(-1, 0)) {
                this.x = maxX;
            } else {
                this.x = 0;
            }
        // Se sair pela direita, tenta ir para o cenário vizinho à direita.
        } else if (this.x > maxX) {
            // Com vizinho, reaparece pela esquerda; sem vizinho, fica na borda.
            if (this.game.background.changeBackground(1, 0)) {
                this.x = 0;
            } else {
                this.x = maxX;
            }
        }

        // Se sair por cima, tenta ir para o cenário acima.
        if (this.y < 0) {
            // Com vizinho, reaparece embaixo; sem vizinho, fica no topo.
            if (this.game.background.changeBackground(0, -1)) {
                this.y = maxY;
            } else {
                this.y = 0;
            }
        // Se sair por baixo, tenta ir para o cenário abaixo.
        } else if (this.y > maxY) {
            // Com vizinho, reaparece em cima; sem vizinho, fica na borda.
            if (this.game.background.changeBackground(0, 1)) {
                this.y = 0;
            } else {
                this.y = maxY;
            }
        }
    }

    //pega os valores e desenha o quadrado atualmente ativo e as coordenadas
    draw(context){
        context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, 60, 75) 
    }   
}