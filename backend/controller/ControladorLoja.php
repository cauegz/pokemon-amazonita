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

        $dados = $this->receiveJSON();
        $itens = $dados['itens'];

        try {
            $resultado = Loja::comprar($idUsuario, $itens);
            $this->responseJSON($resultado);
        } catch (SemDinheiroException $e){
            $this->responseError('Voce nao tem dinheiro para realizar a compra', 400);
        } catch (SemEstoqueException $e){
            $this->responseError('Nao tem estoque para realizar a compra', 400);
        } catch (Throwable $e) {
            $this->responseError('Erro ao realizar a compra', 500);
        }
    }
}