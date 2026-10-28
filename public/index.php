<?php

require_once __DIR__ . '/../autoload.php';

error_reporting(0);
ini_set('display_errors', 0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");

$url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$router = new Roteador();

$router->add("/api/cadastro", "Auth@cadastro");
$router->add("/api/login",    "Auth@login");
$router->add("/api/me",       "Auth@me");
$router->add("/api/logout",   "Auth@logout");
$router->add("/api/teste",    "Npc@createNpc");
$router->add("/api/builder",    "Time@criarTime");
$router->add("/api/treinador/time",    "Time@time");
$router->add("/api/pokemon",    "Pokemon@pokemonById");
$router->add("/api/produto/criar",  "Loja@criarProduto");

$router->add("/api/ataques",  "Batalha@ataque");


try {
    $router->executar($url);
} catch (\Throwable $th) {
    header('Content-Type: application/json; charset=utf-8');
    http_response_code(500);
    echo json_encode(["ok" => false, "mensagem" => "erro desconhecido", "stacktrace" => $th->getMessage()]);
    die();
}
