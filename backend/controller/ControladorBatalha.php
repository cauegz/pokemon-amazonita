<?php

class ControladorBatalha extends ControladorGeral {
    /**
     * Retorna um array com 4 posições, que são os ataque do pokemon, espera
     * o id do pokemon em uma variável $_GET['id']
     * 
     * @return: joga um array com os ataques na tela
     */
    public function ataque(){
        if(!isset($_GET['id'])){
            $this->responseError("id não informado", 400);
        }
        $id = $_GET['id'];

        $this->responseJSON(Ataque::findByPokemon($id));
    }

    /**
     * Retorna as informações do efeito com base no id
     */
    public function efeito(){
        if(!isset($_GET['id'])){
            $this->responseError("id não informado", 400);
        }
        $id = $_GET['id'];

        $this->responseJSON(Efeito::find($id));
    }
}