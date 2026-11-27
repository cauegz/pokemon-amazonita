<?php
class ItensCompra extends ModelGeral implements \JsonSerializable, ModelInterface
{
    protected int $quantidade;
    protected int $idProduto;
    protected int $idUsuario;

    public static function find($id)
    {
        $sql = "SELECT * FROM itens_compra WHERE id = :id";
        $result = self::getPDO()->prepare($sql);
        $result->bindParam(":id", $id);
        $result->execute();

        return $result->fetchObject(self::class);
    }

    public static function all($filter = null)
    {
        $sql = "SELECT * FROM itens_compra";

        if ($filter) {
            $sql .= " WHERE " . $filter;
        }

        $result = self::getPDO()->prepare($sql);
        $result->execute();

        return $result->fetchAll(\PDO::FETCH_CLASS, self::class);
    }

    public static function delete($id)
    {
        $sql = "DELETE FROM itens_compra WHERE id = :id";
        $result = self::getPDO()->prepare($sql);
        $result->bindParam(":id", $id);
        $result->execute();
    }

    public function save()
    {
        if ($this->id == null) { 
            $sql = "INSERT INTO itens_compra (quantidade, id_produto, id_usuario) VALUES (:quantidade, :idProduto, :idUsuario)";
            
            $result = self::getPDO()->prepare($sql);
            $result->bindParam(":quantidade", $this->quantidade);
            $result->bindParam(":idProduto", $this->idProduto);
            $result->bindParam(":idUsuario", $this->idUsuario);
            $result->execute();

            $this->id = self::getPDO()->lastInsertId();

        } else {
            $sql = "UPDATE itens_compra SET quantidade = :quantidade, id_produto = :idProduto, id_usuario = :idUsuario WHERE id = :id"; 

            $result = self::getPDO()->prepare($sql);
            $result->bindParam(":id", $this->id); 
            $result->bindParam(":quantidade", $this->quantidade);
            $result->bindParam(":idProduto", $this->idProduto);
            $result->bindParam(":idUsuario", $this->idUsuario);
            $result->execute();
        }
    }

    public function jsonSerialize(): array
    {
        return [
            'id'   => $this->id,
            'quantidade' => $this->quantidade,
            'id_produto' => $this->idProduto,
            'id_usuario' => $this->idUsuario
        ];
    }
}