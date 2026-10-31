<?php

class Tipo extends ModelGeral implements JsonSerializable, ModelInterface
{
    protected string $nome;

    public static function find($id)
    {
        $sql = 'SELECT id, nome
                FROM tipo
                WHERE id = :id';

        $result = self::getPDO()->prepare($sql);

        $result->bindParam(":id", $id);

        $result->execute();

        return $result->fetchObject(self::class);
    }

    public static function all($filter = null)
    {
        $sql = 'SELECT id, nome
                FROM tipo';

        if ($filter) {
            $sql .= " WHERE " . $filter;
        }

        $result = self::getPDO()->prepare($sql);

        $result->execute();

        return $result->fetchAll(PDO::FETCH_CLASS, self::class);
    }

    public static function delete($id)
    {
        $sql = "DELETE FROM tipo
                WHERE id = :id";

        $result = self::getPDO()->prepare($sql);

        $result->bindParam(":id", $id);

        $result->execute();
    }

    public function save()
    {
        if ($this->id == null) {

            $sql = "INSERT INTO tipo (nome)
                    VALUES (:nome)";

            $result = self::getPDO()->prepare($sql);

            $result->bindParam(":nome", $this->nome);

            $result->execute();

            $this->id = self::getPDO()->lastInsertId();

        } else {

            $sql = "UPDATE tipo
                    SET nome = :nome
                    WHERE id = :id";

            $result = self::getPDO()->prepare($sql);

            $result->bindParam(":nome", $this->nome);
            $result->bindParam(":id", $this->id);

            $result->execute();
        }
    }

    public static function findByNome($nome){
        $sql = 'SELECT id, nome
                FROM tipo
                WHERE nome = :nome';

        $result = self::getPDO()->prepare($sql);

        $result->bindParam("nome", $nome);

        $result->execute();

        return $result->fetchAll(PDO::FETCH_CLASS, self::class);
    }

    public function jsonSerialize(): mixed
    {
        return [
            "id" => $this->id,
            "nome" => $this->nome
        ];
    }
}