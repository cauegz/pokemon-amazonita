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
    static async carregarInventario(idTreinador) {
        const inventarioData = await Api.buscarInventario(idTreinador);
        console.log(inventarioData);
        const items = inventarioData.map(itemData => {
            return new Item(itemData.id, itemData.idPokeApi, itemData.nome, itemData.descricao, itemData.efeito, itemData.urlImagem);
        });
        return items;
    }
}
export default Inventario;