import Api  from "../APIs/Api.js";
import Item from "./Item.js";
class Inventario {
    #items;
    constructor() {
        this.#items = new Array().fill(null);
    }
    get items() {
        return this.#items;
    }

    async carregarInventario(idTreinador) {
        const inventarioData = await Api.buscarInventario(idTreinador);
    
        for(let i=0; i < inventarioData.length; i++){
           this.items[i] = await Item.carregarItem(
                inventarioData[i].idPokeApi, 
                inventarioData[i].id
            );
        }
        return this.#items;
    }

    async removerItem(idItem){
        const resultado = await Api.removerItemInventario(idItem);
        if (!resultado.restante) {
            const indice = this.#items.findIndex(item => item?.id === Number(idItem));
            if (indice !== -1) this.#items.splice(indice, 1);
        }
    }
}
export default Inventario;