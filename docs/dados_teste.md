# Documentação dos Dados de Teste — Monstrobolso

## 1. Objetivo

Os dados de teste têm como objetivo validar o funcionamento do banco de dados do Monstrobolso, verificando os relacionamentos entre usuários, treinadores, Pokémon, inventários, lojas, produtos, compras e registros de atividades.

Os registros são fictícios e destinados exclusivamente ao ambiente de desenvolvimento e testes.

## 2. Dados inseridos por tabela

### 2.1. `efeito`

Foram cadastrados cinco efeitos: Queimadura, Paralisia, Envenenamento, Sono e Congelamento.

Esses registros são associados aos Pokémon por meio da coluna `id_efeito`.

### 2.2. `tipo_npc`

Foram definidos três tipos de personagens não jogáveis (NPCs): Treinador, Vendedor e Líder de ginásio.

Esses tipos permitem classificar os NPCs cadastrados no jogo.

### 2.3. `usuario`

Foram cadastrados três usuários fictícios:

| Usuário     | Nome  | Senha      |
| ----------- | ----- | ---------- |
| `jogador01` | Ana   | `senha123` |
| `jogador02` | Bruno | `senha456` |
| `jogador03` | Carla | `senha789` |


### 2.4. `npc`

Foram cadastrados três NPCs: Professor Carvalho, Mercador de Itens e Líder Rochoso. Cada registro está associado a um tipo de NPC.

### 2.5. `treinador`

Foram criados seis treinadores. Os três primeiros estão associados aos usuários Ana, Bruno e Carla. Os outros três representam NPCs.

A associação é realizada pelas colunas `id_usuario` e `id_npc`. No conjunto de testes, cada treinador representa um jogador ou um personagem não jogável.

### 2.6. `pokemon`

Foram cadastrados oito Pokémon, associados a treinadores e efeitos.

| Espécie | ID na PokéAPI | Treinador |
|---|---:|---|
| Pikachu | 25 | Ana |
| Bulbasaur | 1 | Ana |
| Charmander | 4 | Ana |
| Squirtle | 7 | Bruno |
| Caterpie | 10 | Bruno |
| Eevee | 133 | Carla |
| Geodude | 74 | NPC |
| Onix | 95 | NPC |

A coluna `id_pokeapi` identifica a espécie consultada na PokéAPI. A coluna `id` identifica o registro local do Pokémon no banco. Já `hp`, `id_efeito` e `id_treinador` armazenam, respectivamente, os pontos de vida, o efeito associado e o proprietário do Pokémon.

Os valores de HP são exemplos para teste e não necessariamente representam os atributos atuais das espécies na PokéAPI.

### 2.7. `time`

Foram inseridos oito registros na tabela `time`, associando cada Pokémon ao time de seu treinador.

Os registros contemplam os três jogadores e dois treinadores NPC. Essa tabela permite consultar os integrantes de cada time.

### 2.8. `produto`

Foram cadastrados quatro produtos: Pokébola, Poção, Superpoção e Antídoto.

Cada produto possui um identificador de item da PokéAPI, nome, preço, estoque e `loja_id`, que o relaciona diretamente a uma loja. Os preços e estoques são fictícios, e os identificadores de itens devem ser conferidos caso sejam utilizados em integração real com a PokéAPI.

### 2.9. `loja`

Foram cadastradas três lojas, identificadas pelos nomes `l1`, `l2` e `l3`. Cada produto referencia sua loja pela coluna `loja_id`.

### 2.10. `inventario`

Foram inseridos seis registros de inventário, distribuídos entre os três jogadores. Os registros representam itens e respectivas quantidades que cada treinador possui.

A tabela relaciona o identificador do item da PokéAPI ao treinador proprietário e à quantidade disponível.

### 2.11. `itens_compra`

Foram cadastradas quatro linhas de compra, envolvendo os três usuários e diferentes produtos.

Cada registro armazena a quantidade comprada, o produto correspondente e o usuário responsável pela compra.

### 2.12. `venda`

Foram criados quatro registros de venda, relacionando cada linha de compra a uma loja. Isso permite consultar qual loja está associada a cada registro de compra.

**Observação:** o modelo atual representa cada registro de `itens_compra` individualmente. Para suportar uma compra com vários produtos sob um único identificador de transação, recomenda-se separar a tabela de venda (cabeçalho) dos itens da venda.

### 2.13. `log_usuario`

Foram inseridos quatro registros de log, incluindo criação de conta, login e compras. Cada registro possui um usuário associado, uma mensagem e uma data de criação preenchida automaticamente por `CURRENT_TIMESTAMP`.

## 3. Relacionamentos testados

Os dados permitem verificar os seguintes relacionamentos:

- Usuários e treinadores: associação entre contas e personagens controlados pelos jogadores.
- NPCs e tipos de NPC: classificação dos personagens não jogáveis.
- Treinadores e Pokémon: identificação do proprietário de cada Pokémon.
- Treinadores e times: associação entre treinadores e integrantes de seus times.
- Pokémon e efeitos: associação de cada Pokémon a um efeito cadastrado.
- Lojas e produtos: associação direta por `produto.loja_id`.
- Compras, produtos e usuários: identificação dos produtos comprados e dos compradores.
- Vendas e lojas: associação dos registros de compra às lojas.
- Logs e usuários: identificação do usuário relacionado a cada evento registrado.

## 4. Considerações

Os dados foram elaborados para testes iniciais de consultas SQL, operações CRUD e integração com o backend PHP.

Antes de utilizar os registros em um ambiente mais completo, recomenda-se validar as regras de negócio, incluindo a propriedade dos Pokémon, os limites de integrantes por time, a disponibilidade de estoque e a consistência entre compras e inventário.

As senhas devem possuir hashes válidos gerados pelo PHP. Os preços, estoques, efeitos e atributos dos Pokémon utilizados nos exemplos são dados de teste e não devem ser considerados dados oficiais do jogo ou da PokéAPI.