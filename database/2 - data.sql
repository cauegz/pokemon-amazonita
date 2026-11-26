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

INSERT INTO usuario (login, senha, nome, dinheiro) VALUES
('jogador01', '$2y$10$8YAD3tehYe2jZc1cdmlR7.okDJ11Zo0KZWwhITJy/XkftL62GonSi', 'Ana', 10000),
('jogador02', '$2y$10$hCUnAIwf9B2KkIOZ9QsP9OjaXB1mU/u1vPRGFUr2slLip82f0tBj.', 'Bruno', 100),
('jogador03', '$2y$10$bD0y42R3Lwd8vHC7bhRXMuQWsoU49YccvLJRHVae7DYRwa7UNyO82', 'Carla', 100);

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
('Raissa Scheeren', 1, 1000),
('Jacqueline Akazaki', 1, 1000);

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

INSERT INTO produto
(id_item_pokeapi, preco, estoque, loja_id) VALUES
(17, 300.00, 50, 1), -- Potion: recupera 20 HP
(18, 700.00, 25, 1), -- Antidote: cura envenenamento
(19, 100.00, 40, 1), -- Burn Heal: cura queimadura
(20, 100.00, 40, 1), -- Ice Heal: cura congelamento
(21, 100.00, 40, 1), -- Awakening: cura sono
(22, 100.00, 40, 1), -- Paralyze Heal: cura paralisia
(23, 2500.00, 20, 1), -- Full Restore: recupera todo o HP e cura condições de status
(24, 1500.00, 25, 1), -- Max Potion: recupera 100% do HP
(25, 1000.00, 30, 1), -- Hyper Potion: recupera 200 HP
(26, 500.00, 50, 1), -- Super Potion: recupera 50 HP
(27, 300.00, 50, 1), -- Full Heal: cura todas as condições de status
(28, 1500.00, 30, 1), -- Revive: revive um Pokémon desmaiado com metade do HP
(85, 5000.00, 6, 1); -- Pedra da evolução

-- =========================================
-- 13. Pokémon (Dificuldade Mediana | Tema: Manaus/AM + Disciplinas)
-- =========================================

INSERT INTO pokemon 
(id_pokeapi, hp, hp_atual, ataque, defesa, ataque_especial, defesa_especial, velocidade, id_efeito, id_treinador) 
VALUES
-- Treinador ID 4: Marcio Bigolin (Linguagens para a Internet II + Amazônia)
(596, 70, 70, 77, 60, 97, 60, 108, NULL, 4), -- 1. Galvantula (Web/Teia + Aranha Amazônica)
(479, 50, 50, 50, 77, 95, 77,  91, NULL, 4), -- 2. Rotom Base (Rede/Sistemas Web)
(233, 85, 85, 80, 90, 105, 95, 60, NULL, 4), -- 3. Porygon2 (Programação Web/Dados)
(469, 86, 86, 76, 86, 116, 56, 95, NULL, 4), -- 4. Yanmega (Libélula gigante da Amazônia)
(279, 60, 60, 50, 100, 95, 70, 65, NULL, 4), -- 5. Pelipper (Chuvas constantes de Manaus)
(114, 65, 65, 55, 115, 100, 40, 60, NULL, 4), -- 6. Tangela (Cipós da floresta / Cabos de rede)

-- Treinador ID 5: Raissa Scheeren (Programação Orientada a Objetos I + Amazônia)
(352, 60, 60, 90, 70, 60, 120, 40, NULL, 5), -- 7. Kecleon (Polimorfismo / Camaleão)
(132, 75, 75, 68, 68, 68, 68,  68, NULL, 5), -- 8. Ditto (Herança e Clonagem de Objetos - stats ajustados)
(90,  50, 50, 65, 100, 45, 45, 40, NULL, 5), -- 9. Shellder (Encapsulamento / Concha)
(286, 60, 60, 110, 80, 60, 60, 70, NULL, 5), -- 10. Breloom (Flora tropical / Fungos da mata)
(195, 95, 95, 85, 85, 65, 65,  35, NULL, 5), -- 11. Quagsire (Rios e igarapés amazônicos)
(164, 100, 100, 50, 50, 86, 96, 70, NULL, 5), -- 12. Noctowl (Coruja da floresta)

-- Treinador ID 6: Jacqueline Akazaki (Banco de Dados II + Amazônia)
(375, 60, 60, 75, 100, 55, 80, 50, NULL, 6), -- 13. Metang (Indexação e Processamento de Dados)
(437, 67, 67, 89, 116, 79, 116, 33, NULL, 6), -- 14. Bronzong (Triggers e Alertas do SGBD)
(388, 75, 75, 89, 85, 55, 65,  36, NULL, 6), -- 15. Grotle (Árvore B+ / Vegetação amazônica)
(342, 63, 63, 105, 85, 90, 55, 55, NULL, 6), -- 16. Crawdaunt (Crustáceo dos rios de Manaus)
(28,  75, 75, 95, 105, 45, 55, 65, NULL, 6), -- 17. Sandslash (Mineração e Busca/Queries)
(171, 110, 110, 58, 58, 76, 76, 67, NULL, 6); -- 18. Lanturn (Profundezas do Rio Negro / Data Mining)

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
-- Pokémon 1: Galvantula
(405, 1, 7),   -- Bug Buzz (Inseto)
(435, 1, 13),  -- Discharge (Elétrico)
(202, 1, 12),  -- Giga Drain (Grama)
(527, 1, 13),  -- Electroweb (Elétrico)

-- Pokémon 2: Rotom
(85,  2, 13),  -- Thunderbolt (Elétrico)
(247, 2, 8),   -- Shadow Ball (Fantasma)
(521, 2, 13),  -- Volt Switch (Elétrico)
(351, 2, 13),  -- Shock Wave (Elétrico)

-- Pokémon 3: Porygon2
(161, 3, 1),   -- Tri Attack (Normal)
(58,  3, 15),  -- Ice Beam (Gelo)
(85,  3, 13),  -- Thunderbolt (Elétrico)
(94,  3, 14),  -- Psychic (Psíquico)

-- Pokémon 4: Yanmega
(405, 4, 7),   -- Bug Buzz (Inseto)
(403, 4, 3),   -- Air Slash (Voador)
(202, 4, 12),  -- Giga Drain (Grama)
(246, 4, 6),   -- Ancient Power (Pedra)

-- Pokémon 5: Pelipper
(503, 5, 11),  -- Scald (Água)
(403, 5, 3),   -- Air Slash (Voador)
(352, 5, 11),  -- Water Pulse (Água)
(58,  5, 15),  -- Ice Beam (Gelo)

-- Pokémon 6: Tangela
(202, 6, 12),  -- Giga Drain (Grama)
(438, 6, 12),  -- Power Whip (Grama)
(246, 6, 6),   -- Ancient Power (Pedra)
(282, 6, 17),  -- Knock Off (Sombrio)

-- Pokémon 7: Kecleon
(163, 7, 1),   -- Slash (Normal)
(425, 7, 8),   -- Shadow Sneak (Fantasma)
(7,   7, 10),  -- Fire Punch (Fogo)
(280, 7, 2),   -- Brick Break (Lutador)

-- Pokémon 8: Ditto
(33,  8, 1),   -- Tackle (Normal)
(129, 8, 1),   -- Swift (Normal)
(34,  8, 1),   -- Body Slam (Normal)
(247, 8, 8),   -- Shadow Ball (Fantasma)

-- Pokémon 9: Shellder
(333, 9, 15),  -- Icicle Spear (Gelo)
(534, 9, 11),  -- Razor Shell (Água)
(420, 9, 15),  -- Ice Shard (Gelo)
(61,  9, 11),  -- Bubble Beam (Água)

-- Pokémon 10: Breloom
(402, 10, 12), -- Seed Bomb (Grama)
(183, 10, 2),  -- Mach Punch (Lutador)
(280, 10, 2),  -- Brick Break (Lutador)
(317, 10, 6),  -- Rock Tomb (Pedra)

-- Pokémon 11: Quagsire
(89,  11, 5),  -- Earthquake (Terra)
(503, 11, 11), -- Scald (Água)
(426, 11, 5),  -- Mud Bomb (Terra)
(8,   11, 15), -- Ice Punch (Gelo)

-- Pokémon 12: Noctowl
(403, 12, 3),  -- Air Slash (Voador)
(94,  12, 14), -- Psychic (Psíquico)
(247, 12, 8),  -- Shadow Ball (Fantasma)
(585, 12, 18), -- Moonblast (Fada)

-- Pokémon 13: Metang
(309, 13, 9),  -- Meteor Mash (Aço)
(428, 13, 14), -- Zen Headbutt (Psíquico)
(418, 13, 9),  -- Bullet Punch (Aço)
(523, 13, 5),  -- Bulldoze (Terra)

-- Pokémon 14: Bronzong
(430, 14, 9),  -- Flash Cannon (Aço)
(94,  14, 14), -- Psychic (Psíquico)
(247, 14, 8),  -- Shadow Ball (Fantasma)
(326, 14, 14), -- Extrasensory (Psíquico)

-- Pokémon 15: Grotle
(75,  15, 12), -- Razor Leaf (Grama)
(44,  15, 17), -- Bite (Sombrio)
(402, 15, 12), -- Seed Bomb (Grama)
(523, 15, 5),  -- Bulldoze (Terra)

-- Pokémon 16: Crawdaunt
(152, 16, 11), -- Crabhammer (Água)
(242, 16, 17), -- Crunch (Sombrio)
(453, 16, 11), -- Aqua Jet (Água)
(282, 16, 17), -- Knock Off (Sombrio)

-- Pokémon 17: Sandslash
(91,  17, 5),  -- Dig (Terra)
(163, 17, 1),  -- Slash (Normal)
(157, 17, 6),  -- Rock Slide (Pedra)
(404, 17, 7),  -- X-Scissor (Inseto)

-- Pokémon 18: Lanturn
(435, 18, 13), -- Discharge (Elétrico)
(57,  18, 11), -- Surf (Água)
(58,  18, 15), -- Ice Beam (Gelo)
(324, 18, 7);  -- Signal Beam (Inseto)

-- =========================================
-- 16. Tipagem dos Pokémon dos Treinadores
-- =========================================

INSERT INTO tipo_pokemon (pokemon_id, tipo_id) VALUES
(1, 7),  (1, 13),  -- Galvantula: Inseto (7) / Elétrico (13)
(2, 13), (2, 8),   -- Rotom: Elétrico (13) / Fantasma (8)
(3, 1),            -- Porygon2: Normal (1)
(4, 7),  (4, 3),   -- Yanmega: Inseto (7) / Voador (3)
(5, 11), (5, 3),   -- Pelipper: Água (11) / Voador (3)
(6, 12),           -- Tangela: Grama (12)
(7, 1),            -- Kecleon: Normal (1)
(8, 1),            -- Ditto: Normal (1)
(9, 11),           -- Shellder: Água (11)
(10, 12),(10, 2),  -- Breloom: Grama (12) / Lutador (2)
(11, 11),(11, 5),  -- Quagsire: Água (11) / Terra (5)
(12, 1), (12, 3),  -- Noctowl: Normal (1) / Voador (3)
(13, 9), (13, 14), -- Metang: Aço (9) / Psíquico (14)
(14, 9), (14, 14), -- Bronzong: Aço (9) / Psíquico (14)
(15, 12),          -- Grotle: Grama (12)
(16, 11),(16, 17), -- Crawdaunt: Água (11) / Sombrio (17)
(17, 5),           -- Sandslash: Terra (5)
(18, 11),(18, 13); -- Lanturn: Água (11) / Elétrico (13)
