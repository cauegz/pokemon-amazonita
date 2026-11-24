<?php
class SemDinheiroException extends LojaException{
    #[Override]
    public function __construct(
        int $dinheiro,
        int $dinheiroNecessario,
        string $message = "", 
        int $code = 400,
    )
        {
        $message = "Voce nao tem dinheiro suficiente para essa compra, dinheiro atual: $dinheiro, dinheiro necessario: $dinheiroNecessario";
        return parent::__construct($message, $code);
    }
}