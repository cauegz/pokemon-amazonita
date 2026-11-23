<?php
abstract class LojaException extends Exception{
    public function __construct(string $message, int $code = 400)
    {
        return parent::__construct($message, $code);
    }
}