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
        let items = new Array(20).fill(null);
    
        for(let i=0; i < inventarioData.length; i++){
           this.items[i] = await Item.carregarItem(inventarioData[i].idPokeApi,inventarioData[i].id);
        }
        console.log(items);
        return items;
    }

    async removerItem(idItem){
        await Api.removerItemInventario(idItem);
        const indice = this.#items.findIndex(item => item?.id === Number(idItem));
        if (indice !== -1) this.#items.splice(indice, 1);
    }
}
export default Inventario;