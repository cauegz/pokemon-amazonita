<?php
// Centraliza o envio, a exclusao e a entrega da foto de perfil.
class ControladorUpload extends ControladorGeral
{
    public function uploadArquivo()
    {
        // Define o formato JSON das respostas para o frontend.
        header("Content-Type: application/json; charset=utf-8");

        // Inicia a sessao para identificar quem esta enviando a imagem.
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        // Le o identificador usando os nomes de sessao aceitos pelo projeto.
        $idUsuario = $_SESSION['usuario_id']
            ?? $_SESSION['usuarioId']
            ?? $_SESSION['id']
            ?? null;

        if (!$idUsuario) {
            http_response_code(401);
            echo json_encode([
                "ok" => false,
                "mensagem" => "Sua sessão expirou. Entre novamente."
            ]);
            return;
        }

        // Diferencia falhas de tamanho de outros erros de recebimento.
        $erroUpload = $_FILES['arquivo']['error'] ?? UPLOAD_ERR_NO_FILE;

        if ($erroUpload !== UPLOAD_ERR_OK) {
            if ($erroUpload === UPLOAD_ERR_INI_SIZE ||
                $erroUpload === UPLOAD_ERR_FORM_SIZE) {
                http_response_code(413);
                echo json_encode([
                    "ok" => false,
                    "mensagem" => "A imagem deve ter no máximo 1024 MB."
                ]);
                return;
            }

            http_response_code(400);
            echo json_encode([
                "ok" => false,
                "mensagem" => "Nenhuma imagem válida foi enviada."
            ]);
            return;
        }

        $arquivo = $_FILES['arquivo'];

        // Recusa arquivos acima de 1024 MB antes do processamento.
        if ($arquivo['size'] > 1024 * 1024 * 1024) {
            http_response_code(413);
            echo json_encode([
                "ok" => false,
            "mensagem" => "A imagem deve ter no máximo 1024 MB."
            ]);
            return;
        }

        if (!is_uploaded_file($arquivo['tmp_name'])) {
            http_response_code(400);
            echo json_encode([
                "ok" => false,
                "mensagem" => "Arquivo temporário inválido."
            ]);
            return;
        }

        // Verifica o tipo real e aceita apenas os formatos de imagem permitidos.
        $tipo = mime_content_type($arquivo['tmp_name']);
        $extensoes = [
            "image/jpeg" => "jpg",
            "image/png"  => "png",
            "image/gif"  => "gif",
            "image/webp" => "webp"
        ];

        if (!isset($extensoes[$tipo])) {
            http_response_code(415);
            echo json_encode([
                "ok" => false,
                "mensagem" => "Envie uma imagem JPG, PNG, GIF ou WebP."
            ]);
            return;
        }

        // Prepara a pasta de destino e confirma a permissao de escrita.
        $diretorio = __DIR__ . "/../images/foto-perfil/";

        if (!is_dir($diretorio) && !mkdir($diretorio, 0755, true)) {
            http_response_code(500);
            echo json_encode([
                "ok" => false,
                "mensagem" => "Não foi possível criar a pasta de fotos."
            ]);
            return;
        }

        if (!is_writable($diretorio)) {
            http_response_code(500);
            echo json_encode([
                "ok" => false,
                "mensagem" => "A pasta de fotos não tem permissão de escrita."
            ]);
            return;
        }

        // Remove a foto anterior para manter apenas a imagem atual do usuario.
        foreach (scandir($diretorio) as $nomeAntigo) {
            if (str_starts_with($nomeAntigo, $idUsuario . "_")) {
                @unlink($diretorio . $nomeAntigo);
            }
        }

        // Cria um nome unico e move o arquivo validado para a pasta de fotos.
        $nome = $idUsuario . "_" . uniqid() . "." . $extensoes[$tipo];

        if (!move_uploaded_file($arquivo['tmp_name'], $diretorio . $nome)) {
            http_response_code(500);
            echo json_encode([
                "ok" => false,
                "mensagem" => "Não foi possível gravar a foto no servidor."
            ]);
            return;
        }

        echo json_encode([
            "ok" => true,
            "mensagem" => "Foto salva com sucesso."
        ]);
    }

    public function deletarArquivo()
    {
        // Retorna mensagens JSON com o resultado da exclusao.
        header("Content-Type: application/json; charset=utf-8");

        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        $idUsuario = $_SESSION['usuario_id']
            ?? $_SESSION['usuarioId']
            ?? $_SESSION['id']
            ?? null;

        if (!$idUsuario) {
            http_response_code(401);
            echo json_encode([
                "ok" => false,
                "mensagem" => "Sua sessão expirou."
            ]);
            return;
        }

        // Procura e remove as fotos associadas ao usuario da sessao.
        $diretorio = __DIR__ . "/../images/foto-perfil/";
        $removida = false;

        if (is_dir($diretorio)) {
            foreach (scandir($diretorio) as $nome) {
                if (str_starts_with($nome, $idUsuario . "_")) {
                    if (@unlink($diretorio . $nome)) {
                        $removida = true;
                    }
                }
            }
        }

        if (!$removida) {
            http_response_code(404);
            echo json_encode([
                "ok" => false,
                "mensagem" => "Você não tem uma foto de perfil para excluir."
            ]);
            return;
        }

        echo json_encode([
            "ok" => true,
            "mensagem" => "Sua foto de perfil foi removida com sucesso."
        ]);
    }

    public function fotoPerfil()
    {
        // Identifica o usuario para localizar e entregar sua foto atual.
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        $idUsuario = $_SESSION['usuario_id']
            ?? $_SESSION['usuarioId']
            ?? $_SESSION['id']
            ?? null;

        if (!$idUsuario) {
            http_response_code(404);
            exit;
        }

        $diretorio = __DIR__ . "/../images/foto-perfil/";

        if (!is_dir($diretorio)) {
            http_response_code(404);
            exit;
        }

        foreach (scandir($diretorio) as $nome) {
            if (!str_starts_with($nome, $idUsuario . "_")) {
                continue;
            }

            $caminho = $diretorio . $nome;

            if (!is_file($caminho)) {
                continue;
            }

            header("Content-Type: " . mime_content_type($caminho));
            header("Cache-Control: no-store");
            readfile($caminho);
            return;
        }

        http_response_code(404);
    }
}