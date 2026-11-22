export class Player {
    constructor(game){
        this.game = game;
        // tamanho do recorte no Spritesheet
        this.spriteWidth = 64;
        this.spriteHeight = 64;

        // tamanho do jogador no jogo
        this.width = 80;
        this.height = 80;

        this.x = 0;
        this.y = this.game.height - this.height;
        this.image = document.getElementById('player');
        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeed = 5;

        //spritesheet config
        this.frameX = 0;       // Coluna atual 
        this.frameY = 0;       // Linha atual 
        this.maxFrame = 3;     // Índice do último frame da linha
        this.frameTimer = 0;   // Contador para controlar a velocidade
        this.frameInterval = 8; // Troca de sprite por frame
    }

    //metodo pra mover com base no que o jogar clicar e para percorrer o quadrado com as sprites
    update(input){
        // detecta qual tecla foi pressionada no array input
        // Define a velocidade horizontal conforme a tecla pressionada.
        if(input.includes('ArrowRight')){
            this.speedX = this.maxSpeed;
            this.frameY = 2;
        } 
        else if(input.includes('ArrowLeft')){ 
            this.speedX = -this.maxSpeed;
            this.frameY = 1
        }
        else this.speedX = 0;
        this.x += this.speedX;
        
        // Define a velocidade vertical conforme a tecla pressionada.
        if(input.includes('ArrowDown')){ 
            this.speedY = this.maxSpeed;
            this.frameY = 0;
        }
        else if(input.includes('ArrowUp')) {
            this.speedY = -this.maxSpeed;
            this.frameY=3;
        }
        else this.speedY = 0;
        this.y += this.speedY;

        const maxX = this.game.width - this.width;
        const maxY = this.game.height - this.height;
        
        //animacao(percorre o sprite sheet de acordo com a direcao que o jogador for)
        const isMoving = this.speedX !== 0 || this.speedY !== 0;
        if (isMoving) {
            if (this.frameTimer >= this.frameInterval) {
                if (this.frameX < this.maxFrame) {
                    this.frameX++;
                } else {
                    this.frameX = 0; // Volta para o primeiro sprite da linha
                }
                this.frameTimer = 0;
            } else {
                this.frameTimer++;
            }
        } else {
            this.frameX = 0; // Se parar de andar, volta para a pose parada 
        }


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
        context.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight, 
            this.x, 
            this.y, 
            60, 
            75) 
    }   
}