<?php
class Inventario extends ModelGeral implements JsonSerializable, ModelInterface{
    protected ?int $idTreinador = null;
    protected ?int $quantidade = null;
    protected ?int $idPokeApi = null;

    public static function find($id)
    {
        $sql = 'SELECT id, id_treinador AS "idTreinador", quantidade, id_item_pokeapi AS "idPokeApi"
                FROM inventario
                WHERE id = :id;';

        $result = self::getPDO()->prepare($sql);
        $result->bindParam(":id", $id);

        $result->execute();

        return $result->fetchObject(self::class);
    }
    public static function all($filter = null)
    {
        $sql = 'SELECT id, id_treinador AS "idTreinador", quantidade, id_item_pokeapi AS "idPokeApi"
                FROM inventario';
        if ($filter) {
            $sql .= ' WHERE ' . $filter;
        }
        $result = self::getPDO()->query($sql);
        return $result->fetchAll(PDO::FETCH_CLASS, self::class);
    }
    public function save()
    {
        if ($this->id) {
            $sql = 'UPDATE inventario
                    SET id_treinador = :idTreinador, quantidade = :quantidade, id_item_pokeapi = :idPokeApi
                    WHERE id = :id;';
            $stmt = self::getPDO()->prepare($sql);
            $stmt->bindParam(':id', $this->id);
        } else {
            $sql = 'INSERT INTO inventario (id_treinador, quantidade, id_item_pokeapi)
                    VALUES (:idTreinador, :quantidade, :idPokeApi);';
            $stmt = self::getPDO()->prepare($sql);
        }

        $stmt->bindParam(':idTreinador', $this->idTreinador);
        $stmt->bindParam(':quantidade', $this->quantidade);
        $stmt->bindParam(':idPokeApi', $this->idPokeApi);

        if ($stmt->execute()) {
            if (!$this->id) {
                $this->id = self::getPDO()->lastInsertId();
            }
            return true;
        }
        return false;
    }
    public static function delete($id)
    {
        $sql = 'DELETE FROM inventario WHERE id = :id;';
        $stmt = self::getPDO()->prepare($sql);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
    public function jsonSerialize():mixed{
        return [
            'id' => $this->id,
            'idTreinador' => $this->idTreinador,
            'quantidade' => $this->quantidade,
            'idPokeApi' => $this->idPokeApi
        ];
    }

}