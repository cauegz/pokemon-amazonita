<?php
class LogBatalha extends ModelGeral
{
    protected int $idTreinador1;
    protected int $idTreinador2;
    protected ?int $idVencedor = null;
    protected int $recompensa;

    public static function find($id)
    {
        $sql = 'SELECT 
                    id_treinador_1 as "idTreinador1",
                    id_treinador_2 as "idTreinador2",
                    id_vencedor as "idVencedor",
                    recompensa
                FROM log_batalha
                WHERE id = :id';

        $result = self::getPDO()->prepare($sql);

        $result->bindParam(":id", $id);

        $result->execute();

        return $result->fetchObject(self::class);
    }

    public static function all($filter = null)
    {
        $sql = 'SELECT 
                    id_treinador_1 as "idTreinador1",
                    id_treinador_2 as "idTreinador2",
                    id_vencedor as "idVencedor",
                    recompensa
                FROM log_batalha';

        if ($filter) {
            $sql .= " WHERE " . $filter;
        }

        $result = self::getPDO()->prepare($sql);

        $result->execute();

        return $result->fetchAll(PDO::FETCH_CLASS, self::class);
    }

    public static function delete($id)
    {
        $sql = "DELETE FROM log_batalha
                WHERE id = :id";

        $result = self::getPDO()->prepare($sql);

        $result->bindParam(":id", $id);

        $result->execute();
    }

    public function save()
    {
        if ($this->id == null) {

            $sql = "INSERT INTO log_batalha (id_treinador_1, id_treinador_2, id_vencedor, recompensa)
                    VALUES (:id_treinador_1, :id_treinador_2, :id_vencedor, :recompensa)";

            $result = self::getPDO()->prepare($sql);

            $result->bindParam(":id_treinador_1", $this->idTreinador1);
            $result->bindParam(":id_treinador_2", $this->idTreinador2);
            $result->bindParam(":id_vencedor", $this->idVencedor);
            $result->bindParam(":recompensa", $this->recompensa);

            $result->execute();

            $this->id = self::getPDO()->lastInsertId();
            
        } else {

            $sql = "UPDATE log_batalha
                    SET id_treinador_1 = :id_treinador_1,
                        id_treinador_2 = :id_treinador_2,
                        id_vencedor = :id_vencedor,
                        recompensa = :recompensa
                    WHERE id = :id";

            $result = self::getPDO()->prepare($sql);

            $result->bindParam(":id_treinador_1", $this->idTreinador1);
            $result->bindParam(":id_treinador_2", $this->idTreinador2);
            $result->bindParam(":id_vencedor", $this->idVencedor);
            $result->bindParam(":recompensa", $this->recompensa);
            $result->bindParam(":id", $this->id);

            $result->execute();
        }
    }
}