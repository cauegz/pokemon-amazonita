import { Background } from "./Background.js";
import { InputHandler } from "./InputHandler.js";
import { Player } from "./Player.js";

// Gerencia o estado geral do jogo, controles e renderização
export default class Game{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.input = new InputHandler();
        this.background = new Background(this);
    }
    // Atualiza a lógica e movimentação com base nas teclas pressionadas
    update(){
        this.player.update(this.input.keys);
    }
    // Desenha os elementos na tela
    draw(context){
        this.background.draw(context);
        this.player.draw(context);
    }
}