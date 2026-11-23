CREATE OR REPLACE VIEW time_view AS 
    SELECT
        t.id_treinador, 
        t.id_pokemon,
        p.hp,
        p.hp_atual,
        p.ataque,
        p.ataque_especial,
        p.defesa,
        p.defesa_especial,
        p.velocidade,
        p.id_efeito
    FROM 
        time t
    JOIN pokemon p 
    ON t.id_pokemon = p.id;

CREATE OR REPLACE VIEW loja_view AS 
    SELECT
        p.id,
        p.id_item_pokeapi,
        p.preco,
        p.estoque,
        p.loja_id,
        l.nome AS loja_nome
    FROM
        produto p
    JOIN loja l
    ON p.loja_id = l.id
    WHERE p.estoque > 0;

CREATE OR REPLACE VIEW log_batalha_view AS
    SELECT
        lb.id,
        lb.criado_em,
        lb.recompensa,
        u.nome AS "nomeUsuario",
        n.nome AS "nomeNpc",
        COALESCE(uv.nome, nv.nome, 'Sem vencedor') AS "nomeVencedor"
    FROM 
        log_batalha lb
    JOIN 
        treinador t1 ON t1.id = lb.id_treinador_1
    JOIN
        treinador t2 ON t2.id = lb.id_treinador_2
    JOIN 
        usuario u ON u.id = t1.id_usuario
    JOIN 
        npc n ON n.id = t2.id_npc
    LEFT JOIN
        treinador tv ON tv.id = lb.id_vencedor
    LEFT JOIN
        usuario uv ON uv.id = tv.id_usuario
    LEFT JOIN
        npc nv ON nv.id = tv.id_npc;