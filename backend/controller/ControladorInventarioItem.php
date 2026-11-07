<?php
class ControladorInventarioItem extends ControladorGeral{
    public function createInventarioItem($idTreinador, $quantidade, $idPokeApi){
        $inventarioItem = new InventarioItem();
        $inventarioItem->idTreinador = $idTreinador;
        $inventarioItem->quantidade = $quantidade;
        $inventarioItem->idPokeApi = $idPokeApi;

        if ($inventarioItem->save()) {
            $this->responseJSON($inventarioItem);
        } else {
            $this->responseError("Erro ao criar item de inventário", 500);
        }
    }
    public function getInventarioItem($id){
        $inventarioItem = InventarioItem::find($id);
        if ($inventarioItem) {
            $this->responseJSON($inventarioItem);
        } else {
            $this->responseError("Item de inventário não encontrado", 404);
        }
    }
    public function getAllInventarioItems($filter = null){
        $inventarioItems = InventarioItem::all($filter);
        $this->responseJSON($inventarioItems);
    }
    public function updateInventarioItem($id, $idTreinador, $quantidade, $idPokeApi){
        $inventarioItem = InventarioItem::find($id);
        if ($inventarioItem) {
            $inventarioItem->idTreinador = $idTreinador;
            $inventarioItem->quantidade = $quantidade;
            $inventarioItem->idPokeApi = $idPokeApi;

            if ($inventarioItem->save()) {
                $this->responseJSON($inventarioItem);
            } else {
                $this->responseError("Erro ao atualizar item de inventário", 500);
            }
        } else {
            $this->responseError("Item de inventário não encontrado", 404);
        }
    }
    public function deleteInventarioItem($id){
        if (InventarioItem::delete($id)) {
            $this->responseJSON(["message" => "Item de inventário deletado com sucesso"]);
        } else {
            $this->responseError("Erro ao deletar item de inventário", 500);
        }
    }
}