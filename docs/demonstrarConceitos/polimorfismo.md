# Polimorfismo
No sistema, o polimorfismo e visto nas implementacoes de ModelInterface, no qual todos os models do sitema implementam de forma diferente seus metodos(find(), all(), save() e delete()), cada um indicando suas tabelas no banco

```php
interface ModelInterface
{
    public static function find($id);
    public static function all($filter = null);
    public function save();
    public static function delete($id);
}
```

```php
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
}
```