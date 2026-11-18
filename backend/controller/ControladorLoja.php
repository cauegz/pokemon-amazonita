<?php
class ControladorLoja extends ControladorGeral{

    public function listarProdutosByLojaId(){
        $loja_id = $_GET['id'] ?? null;
        $this->responseJSON(Produto::findByLojaId($loja_id));
    }

    /**
     * Espera um array com o id dos itens que o usuario comprar:
     * {
     *  itens: [
     *      idItem,
     *      idItem,
     *      ...
     *  ]
     * }
     */
    public function comprar() {
        session_start();
        if(!isset($_SESSION['usuario_id'])){
            $this->responseError("rota nao encontrada", 404); //certo seria 401, mas para não expor a rota dei 404
        }
        $idUsuario = $_SESSION['usuario_id'];

        $itens = $this->receiveJSON()['itens'];
        
        $itensJaPassaram = [];
        foreach($itens as $item){
            if($itensJaPassaram[$item]){
                continue; //se o item ja foi percorrido, passa para o proximo
            }

            $quantidade = count(array_keys($itens, $item));

            $itemCompra = new ItensCompra();
            $itemCompra->idProduto = $item;
            $itemCompra->quantidade = $quantidade;
            $itemCompra->idUsuario = $idUsuario;

            $produto = Produto::find($item);

            if(($produto->estoque - $quantidade) < 0){
                throw new Exception("nao tem mais estoque"); //fazer exceção personalizada
            }

            $produto->estoque = $produto->estoque - $quantidade;
            $preco = $produto->preco;

            $usuario = Usuario::find($idUsuario);

            if(($usuario->dinheiro - $preco) < 0){
                throw new Exception("voce nao tem dinheiro"); //fazer exceção personalizada
            }

            $usuario->dinheiro = $usuario->dinheiro - $preco;

            $itemCompra->save();
            $produto->save();
            $usuario->save();

            $itensJaPassaram[$item] = true;
        }
    }
}