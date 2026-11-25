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
-- 13. Pokémon
-- =========================================

INSERT INTO pokemon 
(id_pokeapi, hp, hp_atual, ataque, defesa, ataque_especial, defesa_especial, velocidade, id_efeito, id_treinador) 
VALUES
-- Treinador ID 4 (Marcio Bigolin)
(445, 108, 108, 130, 95,  80,  85, 102, NULL, 4), -- 1. Garchomp
(376,  80,  1, 135, 150, 95,  90,  70, NULL, 4), -- 2. Metagross
(479,  50,  1,  65, 107, 105, 107,  86, NULL, 4), -- 3. Rotom-Wash
(637,  85,  1,  60,  65, 135, 105, 100, NULL, 4), -- 4. Volcarona
(730,  80,  1,  74,  74, 126, 116,  60, NULL, 4), -- 5. Primarina
(823,  98,  1,  87, 105,  53,  85,  67, NULL, 4), -- 6. Corviknight

-- Treinador ID 5 (Raissa Scheeren)
(248, 100, 100, 134, 110,  95, 100,  61, NULL, 5), -- 7. Tyranitar
(530, 110, 1, 135,  60,  50,  65,  88, NULL, 5), -- 8. Excadrill
(94,   60,  1,  65,  60, 130,  75, 110, NULL, 5), -- 9. Gengar
(130,  95,  1, 125,  79,  60, 100,  81, NULL, 5), -- 10. Gyarados
(468,  85,  1,  50,  95, 120, 115,  80, NULL, 5), -- 11. Togekiss
(212,  70,  1, 130, 100,  55,  80,  65, NULL, 5), -- 12. Scizor

-- Treinador ID 6 (Jacqueline Akazaki)
(149,  91,  91, 134,  95, 100, 100,  80, NULL, 6), -- 13. Dragonite
(681,  60,  1,  50, 140,  50, 140,  60, NULL, 6), -- 14. Aegislash
(635,  92,  1, 105,  90, 125,  90,  98, NULL, 6), -- 15. Hydreigon
(350,  95,  1,  60,  79, 100, 125,  81, NULL, 6), -- 16. Milotic
(448,  70,  1, 110,  70, 115,  70,  90, NULL, 6), -- 17. Lucario
(778,  55,  1,  90,  80,  50, 105,  96, NULL, 6); -- 18. Mimikyu

-- =========================================
-- 14. Times dos Treinadores
-- =========================================

INSERT INTO time (posicao, id_treinador, id_pokemon) VALUES
(1, 4, 1), -- (2, 4, 2), (3, 4, 3), (4, 4, 4), (5, 4, 5), (6, 4, 6),
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
(1, 16), (1, 5),   -- Garchomp: Dragão (16) / Terra (5)
(2, 9),  (2, 14),  -- Metagross: Aço (9) / Psíquico (14)
(3, 13), (3, 11),  -- Rotom-Wash: Elétrico (13) / Água (11)
(4, 7),  (4, 10),  -- Volcarona: Inseto (7) / Fogo (10)
(5, 11), (5, 18),  -- Primarina: Água (11) / Fada (18)
(6, 3),  (6, 9),   -- Corviknight: Voador (3) / Aço (9)
(7, 6),  (7, 17),  -- Tyranitar: Pedra (6) / Sombrio (17)
(8, 5),  (8, 9),   -- Excadrill: Terra (5) / Aço (9)
(9, 8),  (9, 4),   -- Gengar: Fantasma (8) / Veneno (4)
(10, 11),(10, 3),  -- Gyarados: Água (11) / Voador (3)
(11, 18),(11, 3),  -- Togekiss: Fada (18) / Voador (3)
(12, 7), (12, 9),  -- Scizor: Inseto (7) / Aço (9)
(13, 16),(13, 3),  -- Dragonite: Dragão (16) / Voador (3)
(14, 9), (14, 8),  -- Aegislash: Aço (9) / Fantasma (8)
(15, 17),(15, 16), -- Hydreigon: Sombrio (17) / Dragão (16)
(16, 11),          -- Milotic: Água (11)
(17, 2), (17, 9),  -- Lucario: Lutador (2) / Aço (9)
(18, 8), (18, 18); -- Mimikyu: Fantasma (8) / Fada (18)

