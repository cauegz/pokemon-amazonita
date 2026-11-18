<?php
class ControladorLoja extends ControladorGeral{

    public function listarProdutosByLojaId(){
        $loja_id = $_GET['id'] ?? null;
        $this->responseJSON(Produto::findByLojaId($loja_id));
    
    }
}