<?php
class SemEstoqueException extends LojaException{
    #[Override]
    public function __construct(
        int $estoqueAtual,
        int $estoqueNecessario,
        string $message = "", 
        int $code = 400
    )
    {
        $message = "Nao tem estoque suficiente, estoque atual: $estoqueAtual, estoque necessario: $estoqueNecessario";
        return parent::__construct($message, $code);
    }
}