<?php
class ControladorInventario extends ControladorGeral{
    public function getInventarioItem(){
        if(!isset($_GET['id'])){
            $this->responseError("item nao enviado", 400);
        }

        $inventarioItem = Inventario::find($_GET['id']);
        if ($inventarioItem) {
            $this->responseJSON($inventarioItem);
        }
        $this->responseError("Item de inventario nao encontrado", 404);
    }

    public function getAllInventarioItems(){
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        if(!isset($_SESSION['treinador'])){
            $this->responseError("usuario nao logado", 404);
        }

        $idTreinador = $_SESSION['treinador'];
        $inventarioItems = Inventario::findByTreinador($idTreinador);

        $this->responseJSON($inventarioItems);
    }

    public function deleteInventarioItem(){
        if(!isset($_GET['id'])){
            $this->responseError("item nao enviado", 400);
        }
        $id = $_GET['id'];
        
        $inventario = Inventario::find($id);

        if($inventario->quantidade <= 1){
            Inventario::delete($id);
            $restante = 0;
        } else {
            $inventario->quantidade -= 1;
            $restante = $inventario->quantidade;
            $inventario->save();
        }

        $this->responseJSON(["restante" => $restante]);
    }
}