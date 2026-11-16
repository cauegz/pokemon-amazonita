-- =========================================
-- 1. Efeitos
-- =========================================

INSERT INTO efeito (nome) VALUES
('Paralisia'),
('Sono'),
('Congelamento'),
('Queimadura'),
('Envenenamento'),
('Confusão'),
('Atração'),
('Armadilha'),
('Pesadelo');

-- =========================================
-- 2. Tipos de NPC
-- =========================================

INSERT INTO tipo_npc (nome) VALUES
('Treinador'),
('Vendedor'),
('Líder de ginásio');

-- =========================================
-- 3. Tipos de Pokémon (IDs oficiais da PokéAPI)
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
-- 4. Usuários
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
-- 6. NPCs
-- =========================================

INSERT INTO npc (nome, id_tipo_npc, recompensa) VALUES
('Marcio Bigolin', 1, 1000),
('Raissa Scheeren', 2, 1000),
('Jacqueline Akazaki', 3, 1000);

-- =========================================
-- 7. Treinadores
-- IDs 1 a 3: jogadores | IDs 4 a 6: NPCs
-- =========================================

INSERT INTO treinador (id_npc, id_usuario) VALUES
(NULL, 1),
(NULL, 2),
(NULL, 3),
(1, NULL),
(2, NULL),
(3, NULL);

-- =========================================
-- 8. Produtos da loja
-- =========================================

INSERT INTO produto (id_item_pokeapi, preco, estoque, loja_id) VALUES
(4, 200.00, 100, 1),
(17, 300.00, 50, 2),
(18, 700.00, 25, 3),
(19, 100.00, 40, 1);

-- =========================================
-- 9. Inventários dos treinadores
-- =========================================

INSERT INTO inventario (id_item_pokeapi, id_treinador, quantidade) VALUES
(4, 1, 5),
(17, 1, 3),
(19, 1, 2),
(4, 2, 10),
(18, 2, 2),
(17, 3, 4);

-- =========================================
-- 10. Compras
-- =========================================

INSERT INTO itens_compra (quantidade, id_produto, id_usuario) VALUES
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
(4, 3);

-- =========================================
-- 12. Logs de usuários
-- =========================================

INSERT INTO log_usuario (usuario_id, acao, mensagem) VALUES
(1, 'cadastro', 'Conta criada'),
(1, 'compra', 'Pokébolas compradas'),
(2, 'login', 'Login realizado'),
(3, 'compra', 'Poção comprada');

-- =========================================
-- 13. Pokémon
-- =========================================

INSERT INTO pokemon 
(id_pokeapi, hp, hp_atual, ataque, defesa, ataque_especial, defesa_especial, velocidade, id_efeito, id_treinador) 
VALUES
-- Treinador ID 4 (Marcio Bigolin)
(445, 108, 108, 130, 95,  80,  85, 102, NULL, 4), -- 1. Garchomp
(376,  80,  80, 135, 150, 95,  90,  70, NULL, 4), -- 2. Metagross
(479,  50,  50,  65, 107, 105, 107,  86, NULL, 4), -- 3. Rotom-Wash
(637,  85,  85,  60,  65, 135, 105, 100, NULL, 4), -- 4. Volcarona
(730,  80,  80,  74,  74, 126, 116,  60, NULL, 4), -- 5. Primarina
(823,  98,  98,  87, 105,  53,  85,  67, NULL, 4), -- 6. Corviknight

-- Treinador ID 5 (Raissa Scheeren)
(248, 100, 100, 134, 110,  95, 100,  61, NULL, 5), -- 7. Tyranitar
(530, 110, 110, 135,  60,  50,  65,  88, NULL, 5), -- 8. Excadrill
(94,   60,  60,  65,  60, 130,  75, 110, NULL, 5), -- 9. Gengar
(130,  95,  95, 125,  79,  60, 100,  81, NULL, 5), -- 10. Gyarados
(468,  85,  85,  50,  95, 120, 115,  80, NULL, 5), -- 11. Togekiss
(212,  70,  70, 130, 100,  55,  80,  65, NULL, 5), -- 12. Scizor

-- Treinador ID 6 (Jacqueline Akazaki)
(149,  91,  91, 134,  95, 100, 100,  80, NULL, 6), -- 13. Dragonite
(681,  60,  60,  50, 140,  50, 140,  60, NULL, 6), -- 14. Aegislash
(635,  92,  92, 105,  90, 125,  90,  98, NULL, 6), -- 15. Hydreigon
(350,  95,  95,  60,  79, 100, 125,  81, NULL, 6), -- 16. Milotic
(448,  70,  70, 110,  70, 115,  70,  90, NULL, 6), -- 17. Lucario
(778,  55,  55,  90,  80,  50, 105,  96, NULL, 6); -- 18. Mimikyu

-- =========================================
-- 14. Times dos Treinadores
-- =========================================

INSERT INTO time (posicao, id_treinador, id_pokemon) VALUES
(1, 4, 1), (2, 4, 2), (3, 4, 3), (4, 4, 4), (5, 4, 5), (6, 4, 6),
(1, 5, 7), (2, 5, 8), (3, 5, 9), (4, 5, 10), (5, 5, 11), (6, 5, 12),
(1, 6, 13), (2, 6, 14), (3, 6, 15), (4, 6, 16), (5, 6, 17), (6, 6, 18);

-- =========================================
-- 15. Ataques Ofensivos
-- =========================================

INSERT INTO ataque (poke_api, pokemon_id, tipo_id) VALUES
-- Pokémon 1: Garchomp
(337, 1, 16),  -- Dragon Claw (Dragão)
(89,  1, 5),   -- Earthquake (Terra)
(53,  1, 10),  -- Flamethrower (Fogo)
(444, 1, 6),   -- Stone Edge (Pedra)

-- Pokémon 2: Metagross
(309, 2, 9),   -- Meteor Mash (Aço)
(428, 2, 14),  -- Zen Headbutt (Psíquico)
(418, 2, 9),   -- Bullet Punch (Aço)
(444, 2, 6),   -- Stone Edge (Pedra)

-- Pokémon 3: Rotom-Wash
(56,  3, 11),  -- Hydro Pump (Água)
(85,  3, 13),  -- Thunderbolt (Elétrico)
(521, 3, 13),  -- Volt Switch (Elétrico)
(247, 3, 8),   -- Shadow Ball (Fantasma)

-- Pokémon 4: Volcarona
(126, 4, 10),  -- Fire Blast (Fogo)
(202, 4, 12),  -- Giga Drain (Grama)
(405, 4, 7),   -- Bug Buzz (Inseto)
(257, 4, 10),  -- Heat Wave (Fogo)

-- Pokémon 5: Primarina
(664, 5, 11),  -- Sparkling Aria (Água)
(585, 5, 18),  -- Moonblast (Fada)
(58,  5, 15),  -- Ice Beam (Gelo)
(57,  5, 11),  -- Surf (Água)

-- Pokémon 6: Corviknight
(413, 6, 3),   -- Brave Bird (Voador)
(442, 6, 9),   -- Iron Head (Aço)
(776, 6, 2),   -- Body Press (Lutador)
(332, 6, 3),   -- Aerial Ace (Voador)

-- Pokémon 7: Tyranitar
(157, 7, 6),   -- Rock Slide (Pedra)
(242, 7, 17),  -- Crunch (Sombrio)
(89,  7, 5),   -- Earthquake (Terra)
(276, 7, 2),   -- Superpower (Lutador)

-- Pokémon 8: Excadrill
(89,  8, 5),   -- Earthquake (Terra)
(442, 8, 9),   -- Iron Head (Aço)
(444, 8, 6),   -- Stone Edge (Pedra)
(372, 8, 17),  -- Assurance (Sombrio)

-- Pokémon 9: Gengar
(247, 9, 8),   -- Shadow Ball (Fantasma)
(188, 9, 4),   -- Sludge Bomb (Veneno)
(85,  9, 13),  -- Thunderbolt (Elétrico)
(411, 9, 2),   -- Focus Blast (Lutador)

-- Pokémon 10: Gyarados
(127, 10, 11), -- Waterfall (Água)
(242, 10, 17), -- Crunch (Sombrio)
(423, 10, 15), -- Ice Fang (Gelo)
(200, 10, 16), -- Outrage (Dragão)

-- Pokémon 11: Togekiss
(403, 11, 3),  -- Air Slash (Voador)
(605, 11, 18), -- Dazzling Gleam (Fada)
(53,  11, 10), -- Flamethrower (Fogo)
(94,  11, 14), -- Psychic (Psíquico)

-- Pokémon 12: Scizor
(418, 12, 9),  -- Bullet Punch (Aço)
(404, 12, 7),  -- X-Scissor (Inseto)
(276, 12, 2),  -- Superpower (Lutador)
(282, 12, 17), -- Knock Off (Sombrio)

-- Pokémon 13: Dragonite
(200, 13, 16), -- Outrage (Dragão)
(542, 13, 3),  -- Hurricane (Voador)
(89,  13, 5),   -- Earthquake (Terra)
(7,   13, 10), -- Fire Punch (Fogo)

-- Pokémon 14: Aegislash
(442, 14, 9),  -- Iron Head (Aço)
(425, 14, 8),  -- Shadow Sneak (Fantasma)
(533, 14, 2),  -- Sacred Sword (Lutador)
(247, 14, 8),  -- Shadow Ball (Fantasma)

-- Pokémon 15: Hydreigon
(399, 15, 17), -- Dark Pulse (Sombrio)
(434, 15, 16), -- Draco Meteor (Dragão)
(53,  15, 10), -- Flamethrower (Fogo)
(430, 15, 9),  -- Flash Cannon (Aço)

-- Pokémon 16: Milotic
(56,  16, 11), -- Hydro Pump (Água)
(58,  16, 15), -- Ice Beam (Gelo)
(503, 16, 11), -- Scald (Água)
(406, 16, 16), -- Dragon Pulse (Dragão)

-- Pokémon 17: Lucario
(370, 17, 2),  -- Close Combat (Lutador)
(430, 17, 9),  -- Flash Cannon (Aço)
(245, 17, 1),  -- Extreme Speed (Normal)
(247, 17, 8),  -- Shadow Ball (Fantasma)

-- Pokémon 18: Mimikyu
(583, 18, 18), -- Play Rough (Fada)
(421, 18, 8),  -- Shadow Claw (Fantasma)
(425, 18, 8),  -- Shadow Sneak (Fantasma)
(409, 18, 2);  -- Drain Punch (Lutador)

-- =========================================
-- 16. Tipagem dos Pokémon dos Treinadores
-- =========================================

INSERT INTO tipo_pokemon (pokemon_id, tipo_id) VALUES
(1, 16), (1, 5),   -- Garchomp: Dragão / Terra
(2, 9),  (2, 14),  -- Metagross: Aço / Psíquico
(3, 13), (3, 11),  -- Rotom-Wash: Elétrico / Água
(4, 7),  (4, 10),  -- Volcarona: Inseto / Fogo
(5, 11), (5, 18),  -- Primarina: Água / Fada
(6, 3),  (6, 9),   -- Corviknight: Voador / Aço
(7, 6),  (7, 17),  -- Tyranitar: Pedra / Sombrio
(8, 5),  (8, 9),   -- Excadrill: Terra / Aço
(9, 8),  (9, 4),   -- Gengar: Fantasma / Veneno
(10, 11),(10, 3),  -- Gyarados: Água / Voador
(11, 18),(11, 3),  -- Togekiss: Fada / Voador
(12, 7), (12, 9),  -- Scizor: Inseto / Aço
(13, 16),(13, 3),  -- Dragonite: Dragão / Voador
(14, 9), (14, 8),  -- Aegislash: Aço / Fantasma
(15, 17),(15, 16), -- Hydreigon: Sombrio / Dragão
(16, 11),          -- Milotic: Água
(17, 2), (17, 9),  -- Lucario: Lutador / Aço
(18, 8), (18, 18); -- Mimikyu: Fantasma / Fada