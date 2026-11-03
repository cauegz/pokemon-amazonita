<?php

class Tipo extends ModelGeral implements JsonSerializable, ModelInterface
{
    protected string $nome;
    protected int $pokeApi;

    public static function find($id)
    {
        $sql = 'SELECT id, poke_api as "pokeApi", nome
                FROM tipo
                WHERE id = :id';

        $result = self::getPDO()->prepare($sql);

        $result->bindParam(":id", $id);

        $result->execute();

        return $result->fetchObject(self::class);
    }

    public static function all($filter = null)
    {
        $sql = 'SELECT id, poke_api as "pokeApi", nome
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

            $sql = "INSERT INTO tipo (nome, poke_api)
                    VALUES (:nome, :pokeApi)";

            $result = self::getPDO()->prepare($sql);

            $result->bindParam(":nome", $this->nome);
            $result->bindParam(":pokeApi", $this->pokeApi);

            $result->execute();

            $this->id = self::getPDO()->lastInsertId();

        } else {

            $sql = "UPDATE tipo
                    SET nome = :nome, poke_api = :pokeApi
                    WHERE id = :id";

            $result = self::getPDO()->prepare($sql);

            $result->bindParam(":nome", $this->nome);
            $result->bindParam(":pokeApi", $this->pokeApi);
            $result->bindParam(":id", $this->id);

            $result->execute();
        }
    }

    public static function findByNome($nome){
        $sql = 'SELECT id, poke_api as "pokeApi", nome
                FROM tipo
                WHERE nome = :nome';

        $result = self::getPDO()->prepare($sql);

        $result->bindParam("nome", $nome);

        $result->execute();

        return $result->fetchAll(PDO::FETCH_CLASS, self::class);
    }

    public static function findByPokeApi($pokeApi){
        $sql = 'SELECT id, poke_api as "pokeApi", nome
                FROM tipo
                WHERE poke_api = :pokeApi';

        $result = self::getPDO()->prepare($sql);

        $result->bindParam("pokeApi", $pokeApi);

        $result->execute();

        return $result->fetchAll(PDO::FETCH_CLASS, self::class);
    }

    public function jsonSerialize(): mixed
    {
        return [
            "id" => $this->id,
            "nome" => $this->nome,
            "pokeApi" => $this->pokeApi
        ];
    }
}