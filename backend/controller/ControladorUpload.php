<?php
// Centraliza o envio, a exclusao e a entrega da foto de perfil.
class ControladorUpload extends ControladorGeral
{
    public function uploadArquivo()
    {
        session_start();

        $idUsuario = $_SESSION['usuario_id'];

        if (!$idUsuario) {
            $this->responseError("rota nao encontrada", 404); //certo seria 401, mas para não expor a rota dei 404
        }

        $arquivo = $_FILES['arquivo'];

        if ($arquivo['size'] > 1024 * 1024 * 2) {
            $this->responseError("a imagem deve ter no mínimo 5 MB", 400);
        }

        $extensao = strtolower(pathinfo($arquivo['name'], PATHINFO_EXTENSION));   
        
        $extensoesPermitidas = [
            "jpg",
            "jpeg",
            "png",
            "webp"
        ];

        if (!in_array($extensao, $extensoesPermitidas)) {
            $this->responseError("Extensao: " . $extensao, 400);
        }

        $diretorio = __DIR__ . "/../../z_data/perfil/";

        // Remove a foto anterior para manter apenas a imagem atual do usuario.
        foreach (scandir($diretorio) as $nome) {
            if ($nome == '.' || $nome == '..') {
                continue;
            }

            $posicaoPonto = strpos($nome, ".");
            $nomeSemExtensao = substr($nome, 0, $posicaoPonto);
            
            if ($nomeSemExtensao == $idUsuario) {
                unlink($diretorio . $nome);
            }
        }

        // Cria um nome unico e move o arquivo validado para a pasta de fotos.
        $nome = $idUsuario . "." . $extensao;

        if (!move_uploaded_file($arquivo['tmp_name'], $diretorio . $nome)) {
            $this->responseError("não foi possível guardar a foto no servidor", 500);
        }

        $this->responseJSON(["ok" => true, "mensagem" => "foto salva com sucesso"]);
    }

    public function deletarArquivo()
    {
        session_start();

        $idUsuario = $_SESSION['usuario_id'];

        if(!isset($_SESSION['usuario_id'])){
            $this->responseError("rota nao encontrada", 404); //certo seria 401, mas para não expor a rota dei 404
        }

        // Procura e remove as fotos associadas ao usuario da sessao.
        $diretorio = __DIR__ . "/../../z_data/perfil/";
        $removida = false;

        foreach (scandir($diretorio) as $nome) {
            if ($nome == '.' || $nome == '..') {
                continue;
            }

            $posicaoPonto = strpos($nome, ".");
            $nomeSemExtensao = substr($nome, 0, $posicaoPonto);
            
            if ($nomeSemExtensao == $idUsuario) {
                if (unlink($diretorio . $nome)) {
                    $removida = true;
                }
            }
        }

        if (!$removida) {
            $this->responseError("voce nao tem uma foto de perfil para excluir", 404);
        }

        $this->responseJSON([
            "ok" => true,
            "mensagem" => "Sua foto de perfil foi removida com sucesso."
        ]);
    }

    public function fotoPerfil()
    {
        session_start();

        $idUsuario = $_SESSION['usuario_id'];

        if (!$idUsuario) {
            $this->responseError("rota nao encontrada", 404); //certo seria 401, mas para não expor a rota dei 404
        }

        $diretorio = __DIR__ . "/../../z_data/perfil/";

        foreach (scandir($diretorio) as $nome) {
             if ($nome == '.' || $nome == '..') {
                continue;
            }

            $posicaoPonto = strpos($nome, ".");
            $nomeSemExtensao = substr($nome, 0, $posicaoPonto);
            
            if ($nomeSemExtensao != $idUsuario) {
                continue;
            }            

            $caminho = $diretorio . $nome;

            header("Content-Type: " . mime_content_type($caminho));
            header("Cache-Control: no-store");
            readfile($caminho);
            return;
        }

        $this->responseError("foto nao encontrada", 404);
    }
}