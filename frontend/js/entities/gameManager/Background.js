export class Background {
    constructor(game) {
        this.game = game;
        this.images = [
            "../images/background/ginasio1-casa-ribeirinha/ginasio_ribeirinho.png",
            "../images/background/teatro.png",
            "../images/background/mercado-publico.png",
            "../images/background/rio-negro.png",
        ];
       
        this.layout = [
            [-1, 0, -1], //-1 é onde não tem mapa
            [1, 2, 3],
        ];
        this.row = 1;
        this.column = 1;
        this.current = this.layout[this.row][this.column];
        this.image = new Image();
        
        this.updateUI();
    }

    draw(context) {
        context.drawImage(this.image, 0, 0, this.game.width, this.game.height);
    }

    changeBackground(dx, dy) {
        const row = this.row + dy;
        const column = this.column + dx;
        if (
            row < 0 ||
            row >= this.layout.length ||
            column < 0 ||
            column >= this.layout[row].length
        ) {
            return false;
        }
        const nextImage = this.layout[row][column];
        if (nextImage < 0 || nextImage >= this.images.length) {
            return false;
        }

        this.row = row;
        this.column = column;
        this.current = nextImage;
        this.updateUI();
        return true;
    }

    updateUI() {
        let caminhoImagemAtual = this.images[this.current];
        let idImagemAtual = this.current;
        console.log(idImagemAtual)

        this.image.src = caminhoImagemAtual;

        console.log(document.querySelectorAll('interface-mapa'))
        document.querySelectorAll('.interface-mapa').forEach((element) => {
            let id = Number(element.dataset.mapaId);

            if(id == idImagemAtual){
                element.hidden = false;
            } else {
                element.hidden = true;
            }
        })
    }
}