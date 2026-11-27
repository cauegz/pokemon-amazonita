# Encapsulamento
Se observa o encapsulamento em qualquer classe do sistema, pois todas usam getters e setters para acessar suas propriedades, porem no PHP, esses metodos sao magicos (__set e __get), centralizando os getters e setters que faziam a mesma coisa e diminuindo a quantidade de codigo inutil nas classes.

sets com validacao no usuario
```php
class Usuario extends ModelGeral implements JsonSerializable, ModelInterface
{
    public function setSenha($senha){
        if (strlen($senha) < 8 || !preg_match('/[A-Z]/', $senha) || !preg_match('/[a-z]/', $senha)) {
            throw new SenhaInvalidaException();
        }
        $this->senha = password_hash($senha, PASSWORD_DEFAULT);
    }

    public function setLogin(string $login){
        if(!trim($login) || strlen($login) < 2){
            throw new InvalidArgumentException('login inválido');
        }
        $this->login = $login;
    }

    public function setNome(string $nome){
        if(!trim($nome) || strlen($nome) < 2){
            throw new InvalidArgumentException('nome inválido');
        }
        $this->nome = $nome;
    }
}
```