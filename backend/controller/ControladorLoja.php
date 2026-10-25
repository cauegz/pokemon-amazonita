<?php
class ControladorLoja extends ControladorGeral{

    public function criarCategoria(){
        $categoria = new Categoria();
        $categoria->tipo = "l1";
        $categoria->save();
        $this->responseJSON(Categoria::all());
    }    

    public function criarLoja (){
        $loja1 = new Loja() ;
    }
}