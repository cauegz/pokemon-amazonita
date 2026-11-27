CREATE TABLE efeito
(
  id   SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE loja
(
  id   SERIAL PRIMARY KEY,
  nome CHAR(2) NOT NULL UNIQUE CHECK (nome IN ('l1', 'l2', 'l3'))
);

CREATE TABLE tipo
(
  id       SERIAL PRIMARY KEY,
  nome     VARCHAR(100) NOT NULL UNIQUE,
  poke_api INT          NOT NULL UNIQUE
);

CREATE TABLE tipo_npc
(
  id   SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
);

CREATE TABLE usuario
(
  id       SERIAL PRIMARY KEY,
  login    VARCHAR(100) NOT NULL UNIQUE,
  senha    VARCHAR(255) NOT NULL,
  nome     VARCHAR(100),
  dinheiro INT          DEFAULT 100 CHECK (dinheiro >= 0)
);

CREATE TABLE npc
(
  id          SERIAL PRIMARY KEY,
  recompensa  INT          NOT NULL DEFAULT 100 CHECK (recompensa >= 0),
  nome        VARCHAR(100) NOT NULL,
  id_tipo_npc INT          NOT NULL REFERENCES tipo_npc (id)
);

CREATE TABLE produto
(
  id              SERIAL PRIMARY KEY,
  id_item_pokeapi INT           NOT NULL UNIQUE,
  preco           DECIMAL(10,2) NOT NULL CHECK (preco > 0),
  estoque         INT           NOT NULL CHECK (estoque >= 0),
  loja_id         INT           NOT NULL REFERENCES loja (id)
);

CREATE TABLE log_usuario
(
  id         SERIAL PRIMARY KEY,
  usuario_id INT          NOT NULL REFERENCES usuario (id),
  acao       VARCHAR(12)  NOT NULL CHECK (acao IN ('CADASTRO', 'LOGIN', 'LOGOUT')),
  mensagem   VARCHAR(200) NOT NULL,
  criado_em  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE treinador
(
  id         SERIAL PRIMARY KEY,
  id_npc     INT REFERENCES npc(id),
  id_usuario INT REFERENCES usuario(id),
  CHECK ((id_npc IS NULL) <> (id_usuario IS NULL))
);

CREATE TABLE itens_compra
(
  id         SERIAL PRIMARY KEY,
  quantidade INT NOT NULL CHECK (quantidade > 0),
  id_produto INT NOT NULL REFERENCES produto(id),
  id_usuario INT NOT NULL REFERENCES usuario(id),
  comprado_em timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventario
(
  id              SERIAL PRIMARY KEY,
  id_item_pokeapi INT NOT NULL,
  id_treinador    INT NOT NULL REFERENCES treinador (id),
  quantidade      INT NOT NULL DEFAULT 1 CHECK (quantidade > 0)
);

CREATE TABLE log_batalha
(
  id             SERIAL PRIMARY KEY,
  recompensa     INT       NOT NULL CHECK (recompensa >= 0),
  criado_em      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  id_treinador_1 INT       NOT NULL REFERENCES treinador (id),
  id_treinador_2 INT       NOT NULL REFERENCES treinador (id),
  id_vencedor    INT       REFERENCES treinador (id),
  CHECK (id_treinador_1 <> id_treinador_2),
  CHECK (id_vencedor IS NULL OR id_vencedor IN (id_treinador_1, id_treinador_2))
);

CREATE TABLE pokemon
(
  id              SERIAL PRIMARY KEY,
  id_pokeapi      INT NOT NULL,
  hp              INT NOT NULL DEFAULT 0 CHECK (hp >= 0),
  hp_atual        INT NOT NULL DEFAULT 0 CHECK (hp_atual >= 0),
  ataque          INT NOT NULL DEFAULT 0 CHECK (ataque >= 0),
  defesa          INT NOT NULL DEFAULT 0 CHECK (defesa >= 0),
  ataque_especial INT NOT NULL DEFAULT 0 CHECK (ataque_especial >= 0),
  defesa_especial INT NOT NULL DEFAULT 0 CHECK (defesa_especial >= 0),
  velocidade      INT NOT NULL DEFAULT 0 CHECK (velocidade >= 0),
  id_efeito       INT REFERENCES efeito (id),
  id_treinador    INT NOT NULL REFERENCES treinador (id),
  CHECK (hp_atual <= hp)
);

CREATE TABLE time
(
  id           SERIAL PRIMARY KEY,
  posicao      INT NOT NULL CHECK (posicao BETWEEN 1 AND 6),
  id_treinador INT NOT NULL REFERENCES treinador (id),
  id_pokemon   INT NOT NULL REFERENCES pokemon (id)
);

CREATE TABLE ataque
(
  id         SERIAL PRIMARY KEY,
  poke_api   INT NOT NULL,
  pokemon_id INT NOT NULL REFERENCES pokemon (id),
  tipo_id    INT NOT NULL REFERENCES tipo (id)
);

CREATE TABLE tipo_pokemon
(
  id         SERIAL PRIMARY KEY,
  tipo_id    INT NOT NULL REFERENCES tipo (id),
  pokemon_id INT NOT NULL REFERENCES pokemon (id) 
);
