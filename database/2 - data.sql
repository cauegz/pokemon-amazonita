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

INSERT INTO tipo_npc (nome) VALUES
('Treinador'),
('Vendedor'),
('Líder de ginásio');

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

INSERT INTO usuario (login, senha, nome, dinheiro) VALUES
('jogador01', '$2y$10$8YAD3tehYe2jZc1cdmlR7.okDJ11Zo0KZWwhITJy/XkftL62GonSi', 'Ana', 10000),
('jogador02', '$2y$10$hCUnAIwf9B2KkIOZ9QsP9OjaXB1mU/u1vPRGFUr2slLip82f0tBj.', 'Bruno', 100),
('jogador03', '$2y$10$bD0y42R3Lwd8vHC7bhRXMuQWsoU49YccvLJRHVae7DYRwa7UNyO82', 'Carla', 100);

INSERT INTO loja (nome) VALUES
('l1'),
('l2'),
('l3');

INSERT INTO npc (nome, id_tipo_npc, recompensa) VALUES
('Marcio Bigolin', 1, 1000),
('Raissa Scheeren', 1, 1000),
('Jacqueline Akazaki', 1, 1000);

INSERT INTO treinador (id_npc, id_usuario) VALUES
(NULL, 1),
(NULL, 2),
(NULL, 3),
(1, NULL),
(2, NULL),
(3, NULL);

INSERT INTO produto
(id_item_pokeapi, preco, estoque, loja_id) VALUES
(17, 300.00, 50, 1),
(18, 700.00, 25, 1),
(19, 100.00, 40, 1),
(20, 100.00, 40, 1),
(21, 100.00, 40, 1),
(22, 100.00, 40, 1),
(23, 2500.00, 20, 1),
(24, 1500.00, 25, 1),
(25, 1000.00, 30, 1),
(26, 500.00, 50, 1),
(27, 300.00, 50, 1),
(28, 1500.00, 30, 1),
(85, 5000.00, 6, 1);

INSERT INTO pokemon 
(id_pokeapi, hp, hp_atual, ataque, defesa, ataque_especial, defesa_especial, velocidade, id_efeito, id_treinador) 
VALUES
(596, 70, 70, 77, 60, 97, 60, 108, NULL, 4),
(479, 50, 50, 50, 77, 95, 77,  91, NULL, 4),
(233, 85, 85, 80, 90, 105, 95, 60, NULL, 4),
(469, 86, 86, 76, 86, 116, 56, 95, NULL, 4),
(279, 60, 60, 50, 100, 95, 70, 65, NULL, 4),
(114, 65, 65, 55, 115, 100, 40, 60, NULL, 4),

(352, 60, 60, 90, 70, 60, 120, 40, NULL, 5),
(132, 75, 75, 68, 68, 68, 68,  68, NULL, 5),
(90,  50, 50, 65, 100, 45, 45, 40, NULL, 5),
(286, 60, 60, 110, 80, 60, 60, 70, NULL, 5),
(195, 95, 95, 85, 85, 65, 65,  35, NULL, 5),
(164, 100, 100, 50, 50, 86, 96, 70, NULL, 5),

(375, 60, 60, 75, 100, 55, 80, 50, NULL, 6),
(437, 67, 67, 89, 116, 79, 116, 33, NULL, 6),
(388, 75, 75, 89, 85, 55, 65,  36, NULL, 6),
(342, 63, 63, 105, 85, 90, 55, 55, NULL, 6),
(28,  75, 75, 95, 105, 45, 55, 65, NULL, 6),
(171, 110, 110, 58, 58, 76, 76, 67, NULL, 6);

INSERT INTO time (posicao, id_treinador, id_pokemon) VALUES
(1, 4, 1), (2, 4, 2), (3, 4, 3), (4, 4, 4), (5, 4, 5), (6, 4, 6),
(1, 5, 7), (2, 5, 8), (3, 5, 9), (4, 5, 10), (5, 5, 11), (6, 5, 12),
(1, 6, 13), (2, 6, 14), (3, 6, 15), (4, 6, 16), (5, 6, 17), (6, 6, 18);

INSERT INTO ataque (poke_api, pokemon_id, tipo_id) VALUES
(405, 1, 7),
(435, 1, 13),
(202, 1, 12),
(527, 1, 13),

(85,  2, 13),
(247, 2, 8),
(521, 2, 13),
(351, 2, 13),

(161, 3, 1),
(58,  3, 15),
(85,  3, 13),
(94,  3, 14),

(405, 4, 7),
(403, 4, 3),
(202, 4, 12),
(246, 4, 6),

(503, 5, 11),
(403, 5, 3),
(352, 5, 11),
(58,  5, 15),

(202, 6, 12),
(438, 6, 12),
(246, 6, 6),
(282, 6, 17),

(163, 7, 1),
(425, 7, 8),
(7,   7, 10),
(280, 7, 2),

(33,  8, 1),
(129, 8, 1),
(34,  8, 1),
(247, 8, 8),

(333, 9, 15),
(534, 9, 11),
(420, 9, 15),
(61,  9, 11),

(402, 10, 12),
(183, 10, 2),
(280, 10, 2),
(317, 10, 6),

(89,  11, 5),
(503, 11, 11),
(426, 11, 5),
(8,   11, 15),

(403, 12, 3),
(94,  12, 14),
(247, 12, 8),
(585, 12, 18),

(309, 13, 9),
(428, 13, 14),
(418, 13, 9),
(523, 13, 5),

(430, 14, 9),
(94,  14, 14),
(247, 14, 8),
(326, 14, 14),

(75,  15, 12),
(44,  15, 17),
(402, 15, 12),
(523, 15, 5),

(152, 16, 11),
(242, 16, 17),
(453, 16, 11),
(282, 16, 17),

(91,  17, 5),
(163, 17, 1),
(157, 17, 6),
(404, 17, 7),

(435, 18, 13),
(57,  18, 11),
(58,  18, 15),
(324, 18, 7);

INSERT INTO tipo_pokemon (pokemon_id, tipo_id) VALUES
(1, 7),  (1, 13),
(2, 13), (2, 8),
(3, 1),
(4, 7),  (4, 3),
(5, 11), (5, 3),
(6, 12),
(7, 1),
(8, 1),
(9, 11),
(10, 12),(10, 2),
(11, 11),(11, 5),
(12, 1), (12, 3),
(13, 9), (13, 14),
(14, 9), (14, 14),
(15, 12),
(16, 11),(16, 17),
(17, 5),
(18, 11),(18, 13);
