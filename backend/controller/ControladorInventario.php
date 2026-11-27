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
        session_start();
        
        if(!isset($_SESSION['treinador'])){
            $this->responseError("usuario nao logado", 404);
        }

        $idTreinador = $_SESSION['treinador'];
        $inventarioItems = Inventario::findByTreinador($idTreinador);

        $this->responseJSON($inventarioItems);
    }

    public function deleteInventarioItem(){
        session_start();
        
        if(!isset($_SESSION['treinador'])){
            $this->responseError("usuario nao logado", 404);
        }

        if(!isset($_GET['id'])){
            $this->responseError("item nao enviado", 400);
        }
        $id = $_GET['id'];
        
        $inventario = Inventario::find($id);

        if(!$inventario || $inventario->idTreinador != $_SESSION['treinador']){
            $this->responseError("erro ao buscar item no inventario", 400);
        }

        try{
            if($inventario->quantidade <= 1){
                Inventario::delete($id);
                $restante = 0;
            } else {
                $inventario->quantidade -= 1;
                $restante = $inventario->quantidade;
                $inventario->save();
            }
        }catch(Throwable $t){
            $this->responseError("erro ao deletar item", 500);
        }

        //botei essa validacao so porque o intelephense tava 
        //reclamando que a varivel podia nao estar definida,
        //mas nao faz sentido porque o responseError da exit
        if(isset($restante)){
            $this->responseJSON(["restante" => $restante]);
        }
    }
}