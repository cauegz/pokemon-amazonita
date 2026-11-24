<?php
class SenhaInvalidaException extends Exception{
    
    public function __construct(
            string $message = "A senha precisa ter no minímo 8 caracteres, com letra maiúscula e minúscula.", 
            int $code = 400 
        )
    {
        parent::__construct($message, $code);
    }
}