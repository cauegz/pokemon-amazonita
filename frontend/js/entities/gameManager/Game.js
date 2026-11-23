import { Background } from "./Background.js";
import { InputHandler } from "./InputHandler.js";
import { Player } from "./Player.js";

export default class Game{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.input = new InputHandler();
        this.background = new Background(this);
    }
    update(){
        this.player.update(this.input.keys);
    }
    draw(context){
        this.background.draw(context);
        this.player.draw(context);
    }
}