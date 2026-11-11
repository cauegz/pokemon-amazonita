<?php
class ControladorLoja extends ControladorGeral{

    // public function criarLoja (){
    //     $loja = new Loja();
    //     $loja->nome = "l1";
    //     $loja->save();

    //     $this->responseJSON(Loja::all());
    // }
    // public function criarProduto(){
    //     $produto = new Produto();
    //     $produto->nome = "banana";
    //     $produto->preco = 5;
    //     $produto->estoque = 200;
    //     $produto->loja_id = 1;
    //     $produto->id_item_pokeapi = 1;
    //     $produto->save();

    //     $this->responseJSON(Produto::all());

    // }

    public function listarProdutosByLojaId($loja_id){
        $this->responseJSON(Produto::findByLojaId($loja_id));
    }

    public function realizaVenda($id_usuario) {

        $pdo = Conexao::getPDO();

        try {

            $pdo->beginTransaction();

            // Debita do saldo do usuário o valor total da compra.
            //    A subconsulta (t) soma preço * quantidade dos itens
            //    AINDA NÃO VENDIDOS do carrinho deste usuário.
            $stmt = $pdo->prepare(
                "UPDATE usuario u SET saldo = u.saldo - t.total
                    FROM (
                        SELECT i.id_usuario, SUM(p.preco * i.quantidade) AS total
                        FROM itens_compra i
                        JOIN produto p ON p.id = i.id_produto
                        WHERE i.id_usuario = :id_usuario
                        AND NOT EXISTS (SELECT 1 FROM venda v WHERE v.id_itens_compra = i.id)
                        GROUP BY i.id_usuario
                    ) t
                    WHERE t.id_usuario = u.id
                    AND u.saldo >= t.total"
            );
            $stmt->execute([':id_usuario' => $id_usuario]);

            // Se nenhuma linha foi atualizada, o saldo não era suficiente
            // (ou o carrinho está vazio). A exceção cai no catch e desfaz tudo.
            if ($stmt->rowCount() === 0) {
                throw new Exception("Saldo insuficiente ou carrinho vazio");
            }

            //  Baixa o estoque de cada produto comprado.
            //    A subconsulta (t) soma a quantidade pedida de cada produto.
            $stmt = $pdo->prepare(
                "UPDATE produto p
                    SET estoque = p.estoque - t.total
                    FROM (
                        SELECT i.id_produto, SUM(i.quantidade) AS total
                        FROM itens_compra i
                        WHERE i.id_usuario = :id_usuario
                        AND NOT EXISTS (SELECT 1 FROM venda v WHERE v.id_itens_compra = i.id)
                        GROUP BY i.id_produto
                    ) t
                    WHERE t.id_produto = p.id
                    AND p.estoque >= t.total"
            );
            $stmt->execute([':id_usuario' => $id_usuario]);
            $produtosAtualizados = $stmt->rowCount();

            //  Confere se TODOS os produtos do carrinho foram atualizados.
            //    Se algum não tinha estoque suficiente, ele não entrou no UPDATE
            //    e o número de linhas atualizadas fica menor que o do carrinho.
            $stmt = $pdo->prepare(
                "SELECT COUNT(DISTINCT i.id_produto)
                    FROM itens_compra i
                    WHERE i.id_usuario = :id_usuario
                    AND NOT EXISTS (SELECT 1 FROM venda v WHERE v.id_itens_compra = i.id)"
            );
            $stmt->execute([':id_usuario' => $id_usuario]);
            $produtosNoCarrinho = (int) $stmt->fetchColumn();

            if ($produtosAtualizados !== $produtosNoCarrinho) {
                throw new Exception("Estoque insuficiente para algum produto no carrinho");
            }

            //  Registra a venda: uma linha em venda para cada item do carrinho.
            //    A subconsulta seleciona apenas os itens do carrinho deste usuário
            //    Esses itens passam a ser considerados "vendidos".
            $stmt = $pdo->prepare(
                "INSERT INTO venda (id_itens_compra, id_loja)
                    SELECT i.id, p.loja_id
                    FROM itens_compra i
                    JOIN produto p ON p.id = i.id_produto
                    WHERE i.id_usuario = :id_usuario
                    AND NOT EXISTS (SELECT 1 FROM venda v WHERE v.id_itens_compra = i.id)"
            );
            $stmt->execute([':id_usuario' => $id_usuario]);

            $pdo->commit();

            $this->responseJSON(["ok" => true, "mensagem" => "Venda realizada com sucesso"]);

        } catch (Exception $e) {
            // Deu erro em qualquer passo: desfaz TUDO que foi feito na transação.
            // O inTransaction() evita um segundo erro caso a falha tenha
            // acontecido antes do beginTransaction().
            if ($pdo->inTransaction()) {
                $pdo->rollBack();
            }
            $this->responseError($e->getMessage(), 404);
        }
    }
}