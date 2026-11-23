<?php

class Loja extends ModelGeral implements JsonSerializable, ModelInterface
{
    protected string $nome;

    public static function comprar($idUsuario, $itens)
    {
        $pdo = self::getPDO();
        $quantidades = [];

        foreach ($itens as $idProduto) {
            $idProduto = (int)$idProduto;

            $quantidades[$idProduto] += 1;
        }

        try {
            $pdo->beginTransaction();

            $usuario = Usuario::find($idUsuario);
            $treinador = Treinador::findByUsuario($idUsuario);

            $total = 0;
            $produtos = [];

            foreach ($quantidades as $idProduto => $quantidade) {
                $produto = Produto::find($idProduto);

                if ($produto->estoque < $quantidade) {
                    throw new SemEstoqueException($produto->estoque, $quantidade);
                }

                $total += $produto->preco * $quantidade;
                $produtos[$idProduto] = [$produto, $quantidade];
            }

            if ($usuario->dinheiro < $total) {
                throw new SemDinheiroException($usuario->dinheiro, $total);
            }

            foreach ($produtos as $idProduto => [$produto, $quantidade]) {
                $produto->estoque -= $quantidade;
                $produto->save();

                $itemCompra = new ItensCompra();
                $itemCompra->idProduto = $idProduto;
                $itemCompra->quantidade = $quantidade;
                $itemCompra->idUsuario = $idUsuario;
                $itemCompra->save();

                $inventario = Inventario::findByTreinadorEItem(
                    $treinador->id,
                    $produto->id_item_pokeapi
                );

                if ($inventario) {
                    $inventario->quantidade += $quantidade;
                } else {
                    $inventario = new Inventario();
                    $inventario->idTreinador = $treinador->id;
                    $inventario->idPokeApi = $produto->id_item_pokeapi;
                    $inventario->quantidade = $quantidade;
                }

                $inventario->save();
            }

            $usuario->dinheiro -= $total;
            $usuario->save();

            $pdo->commit();

            return [
                'ok' => true,
                'mensagem' => 'Compra realizada com sucesso',
            ];
        } catch (Throwable $e) {
            $pdo->rollBack();

            throw $e;
        }
    }

    public function setNome($nome)
    {
        if (!in_array($nome, ['l1', 'l2', 'l3'], true)) {
            throw new Exception('O nome da loja deve ser l1, l2 ou l3');
        }
        $this->nome = $nome;
    }

    public static function find($id)
    {
        $sql = "SELECT id, nome FROM loja WHERE id = :id";
        $result = self::getPDO()->prepare($sql);
        $result->bindParam(":id", $id);
        $result->execute();

        return $result->fetchObject(self::class);
    }

    public static function all($filter = null)
    {
        $sql = "SELECT * FROM loja";

        if ($filter) {
            $sql .= " WHERE " . $filter;
        }

        $result = self::getPDO()->prepare($sql);
        $result->execute();

        
        return $result->fetchAll(PDO::FETCH_CLASS, self::class);
    }

    public static function delete($id)
    {
        $sql = "DELETE FROM loja WHERE id = :id";
        $result = self::getPDO()->prepare($sql);
        $result->bindParam(":id", $id);
        $result->execute();
    }

    public function save()
    {
        if ($this->id == null) {
            $sql = "INSERT INTO loja (nome) VALUES (:nome)";
            $result = self::getPDO()->prepare($sql);
            $result->bindParam(":nome", $this->nome);
            $result->execute();

            $this->id = self::getPDO()->lastInsertId();
        } else {
            $sql = "UPDATE loja SET nome = :nome WHERE id = :id";
            $result = self::getPDO()->prepare($sql);
            $result->bindParam(":nome", $this->nome);
            $result->bindParam(":id", $this->id);
            $result->execute();
        }
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
        ];
    }
}
