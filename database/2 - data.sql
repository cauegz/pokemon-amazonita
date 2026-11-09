
-- =========================================
-- 1. Efeitos
-- =========================================
INSERT INTO efeito (nome) VALUES
('Queimadura'),
('Paralisia'),
('Envenenamento'),
('Sono'),
('Congelamento');


-- =========================================
-- 2. Tipos de NPC
-- =========================================

INSERT INTO tipo_npc (nome) VALUES
('Treinador'),
('Vendedor'),
('Líder de ginásio');


-- =========================================
-- 3. Tipos de Pokémon
-- IDs oficiais da PokéAPI
-- =========================================

INSERT INTO tipo (poke_api, nome) VALUES
(1, 'Normal'),
(2, 'Lutador'),
(3, 'Voador'),
(4, 'Veneno'),
(5, 'Terra'),
(6, 'Pedra'),
(7, 'Inseto'),
(8, 'Fantasma'),
(9, 'Aço'),
(10, 'Fogo'),
(11, 'Água'),
(12, 'Grama'),
(13, 'Elétrico'),
(14, 'Psíquico'),
(15, 'Gelo'),
(16, 'Dragão'),
(17, 'Sombrio'),
(18, 'Fada');


-- =========================================
-- 3. Usuários
-- Senhas fictícias para testes.
-- Em produção, use password_hash() no PHP.
-- =========================================

INSERT INTO usuario (login, senha, nome) VALUES
('jogador01', '$2y$10$8YAD3tehYe2jZc1cdmlR7.okDJ11Zo0KZWwhITJy/XkftL62GonSi', 'Ana'),
('jogador02', '$2y$10$hCUnAIwf9B2KkIOZ9QsP9OjaXB1mU/u1vPRGFUr2slLip82f0tBj.', 'Bruno'),
('jogador03', '$2y$10$bD0y42R3Lwd8vHC7bhRXMuQWsoU49YccvLJRHVae7DYRwa7UNyO82', 'Carla');


-- =========================================
-- 5. Lojas
-- =========================================

INSERT INTO loja (nome) VALUES
('l1'),
('l2'),
('l3');


-- =========================================
-- 4. NPCs
-- =========================================

INSERT INTO npc (nome, id_tipo_npc) VALUES
('Professor Carvalho', 1),
('Mercador de Itens', 2),
('Líder Rochoso', 3);


-- =========================================
-- 5. Treinadores
-- IDs 1 a 3 pertencem aos jogadores.
-- IDs 4 a 6 são treinadores NPC.
-- =========================================

INSERT INTO treinador (id_npc, id_usuario) VALUES
(NULL, 1),
(NULL, 2),
(NULL, 3),
(1, NULL),
(2, NULL),
(3, NULL);

-- =========================================
-- 6. Pokémon
-- id_pokeapi representa o ID da espécie na PokéAPI.
-- =========================================
-- INSERT INTO pokemon (id_pokeapi, hp, id_efeito, id_treinador) VALUES
-- (25, 35, 2, 1),   -- Pikachu, Ana
-- (1, 45, 4, 1),    -- Bulbasaur, Ana
-- (4, 39, 1, 1),    -- Charmander, Ana
-- (7, 44, 5, 2),    -- Squirtle, Bruno
-- (10, 45, 3, 2),   -- Caterpie, Bruno
-- (133, 55, 4, 3),  -- Eevee, Carla
-- (74, 40, 1, 4),   -- Geodude, NPC
-- (95, 35, 2, 6);   -- Onix, NPC

-- =========================================
-- 7. Times
-- =========================================

-- =========================================
-- 8. Lojas e produtos
-- IDs fictícios de itens da PokéAPI para testes.
-- =========================================
INSERT INTO loja (nome) VALUES
('l1'),
('l2'),
('l3');

INSERT INTO produto
(id_item_pokeapi, nome, preco, estoque, loja_id) VALUES
(17, 'Pokébola', 200.00, 100, 1),
(26, 'Poção', 300.00, 50, 2),
(19, 'Superpoção', 700.00, 25, 2),
(23, 'Antídoto', 100.00, 40, 3);

-- =========================================
-- 10. Lojas
-- =========================================
-- =========================================
-- 9. Inventários dos treinadores
-- =========================================

INSERT INTO inventario
(id_item_pokeapi, id_treinador, quantidade) VALUES
(4, 1, 5),
(17, 1, 3),
(19, 1, 2),
(4, 2, 10),
(18, 2, 2),
(17, 3, 4);


-- =========================================
-- 10. Compras
-- Cada registro representa uma linha de compra.
-- =========================================

INSERT INTO itens_compra
(quantidade, id_produto, id_usuario) VALUES
(5, 1, 1),
(2, 2, 1),
(3, 1, 2),
(1, 3, 3);


-- =========================================
-- 11. Vendas
-- =========================================

INSERT INTO venda (id_itens_compra, id_loja) VALUES
(1, 1),
(2, 2),
(3, 1),
(4, 2);


-- =========================================
-- 12. Logs de usuários
-- =========================================
INSERT INTO log_usuario (usuario_id, acao, mensagem) VALUES
(1, 'cadastro', 'Conta criada'),
(1, 'compra', 'Pokébolas compradas'),
(2, 'login', 'Login realizado'),
(3, 'compra', 'Poção comprada');
