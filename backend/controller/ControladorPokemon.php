<?php
class ControladorPokemon extends ControladorGeral{
    public function pokemonById(){
        $id = $_GET['id'] ?? null;
            
        if (!filter_var($id, FILTER_VALIDATE_INT) || $id < 1) {
            $this->responseError("ID inválido", 400);
            return;
        }
        return $this->responseJSON(Pokemon::find($id));
    }

    /**
     * Espera:
     * {
     *      idTreinador,
     *      idPokeApi,
     *      (todos os status)
     * }
     * e o id do banco no get
     */
    public function evoluir(){
        $id = $_GET['id'];

        $dados = $this->receiveJSON();
        $pokemon = Pokemon::find($id);

        if (!$pokemon) {
            $this->responseError("pokemon nao encontrado no banco", 400);
            return;
        }

        $pokemon->ataque = $dados['ataque'];
        $pokemon->ataqueEspecial = $dados['ataqueEspecial'];
        $pokemon->defesa = $dados['defesa'];
        $pokemon->defesaEspecial = $dados['defesaEspecial'];
        $pokemon->velocidade = $dados['velocidade'];
        $pokemon->hp = $dados['hp'];
        $pokemon->hpAtual = $dados['hp'];
        $pokemon->pokeApi = $dados['idPokeApi'];
        
        try{
            $pokemon->save();
            $this->responseJSON(["ok" => true, "mensagem" => "pokemon evoluido"]);
        }catch(Throwable $t){
            $this->responseError("erro ao evoluir -> " .  $t, 500);
        }
    }
}