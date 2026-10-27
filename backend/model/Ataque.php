<?php

class Ataque extends ModelGeral implements JsonSerializable, ModelInterface
{
    protected int $pokeApi;
    protected int $pokemonId;

    public static function find($id)
    {
        $sql = 'SELECT id, poke_api as "pokeApi", pokemon_id as "pokemonId"
                FROM ataque
                WHERE id = :id';

        $result = self::getPDO()->prepare($sql);

        $result->bindParam(":id", $id);

        $result->execute();

        return $result->fetchObject(self::class);
    }

    public static function all($filter = null)
    {
        $sql = 'SELECT id, poke_api as "pokeApi", pokemon_id as "pokemonId"
                FROM ataque';

        if ($filter) {
            $sql .= " WHERE " . $filter;
        }

        $result = self::getPDO()->prepare($sql);

        $result->execute();

        return $result->fetchAll(PDO::FETCH_CLASS, self::class);
    }

    public static function delete($id)
    {
        $sql = "DELETE FROM ataque
                WHERE id = :id";

        $result = self::getPDO()->prepare($sql);

        $result->bindParam(":id", $id);

        $result->execute();
    }

    public function save()
    {
        if ($this->id == null) {

            $sql = "INSERT INTO ataque (poke_api, pokemon_id)
                    VALUES (:pokeApi, :pokemonId)";

            $result = self::getPDO()->prepare($sql);

            $result->bindParam(":pokeApi", $this->pokeApi);
            $result->bindParam(":pokemonId", $this->pokemonId);

            $result->execute();

            $this->id = self::getPDO()->lastInsertId();

        } else {

            $sql = "UPDATE ataque
                    SET pokeApi = :pokeApi,
                        pokemon_id = :pokemonId
                    WHERE id = :id";

            $result = self::getPDO()->prepare($sql);

            $result->bindParam(":pokeApi", $this->pokeApi);
            $result->bindParam(":pokemonId", $this->pokemonId);
            $result->bindParam(":id", $this->id);

            $result->execute();
        }
    }

    public function jsonSerialize(): mixed
    {
        return [
            "id" => $this->id,
            "pokeApi" => $this->pokeApi,
            "pokemonId" => $this->pokemonId
        ];
    }
}