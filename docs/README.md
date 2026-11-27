# Pokémon Amazonita Version

Aplicação web de Pokemon, ambientada em **Manaus (AM)**, desenvolvida como trabalho avaliativo do 3º ano do Ensino Médio Integrado ao Técnico em Desenvolvimento de Sistemas para as disciplinas de **Programação Orientada a Objetos I**, **Linguagens para a Web II** e **Banco de Dados II**.

---

## Sumário

- [Sobre o Jogo](#sobre-o-jogo)
- [Funcionalidades](#funcionalidades)
- [Tecnologias e Arquitetura](#tecnologias-e-arquitetura)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Executar com Docker](#como-executar-com-docker)
- [Dados de Teste](#dados-de-teste)
- [Endpoints da API](#endpoints-da-api)
- [Conceitos de POO e Documentação](#conceitos-de-poo-e-documentação)

---

## Sobre o Jogo

O jogo se passa em **Manaus**, adaptando elementos clássicos de Pokémon à cultura e geografia amazônica:

- **Poké Mart:** Mercado Municipal Adolpho Lisboa.
- **Ginásios / Pontos de Batalha:** Teatro de Manaus, Casas Ribeirinhas e Rio Negro.
- **NPCs:** Treinadores inspirados nos docentes do curso (*Marcio Bigolin*, *Raissa Scheeren* e *Jacqueline Akazaki*), com times temáticos.

---

## Funcionalidades

- **Autenticação e Perfil:** Cadastro, login, controle de sessão e upload/remoção de foto de perfil (`z_data/perfil/`).
- **Mapa Interativo (`game.html`):** Navegação pelo mapa para acessar batalhas, loja e Centro Pokémon.
- **Team Builder (`builder.html`):** Montagem e gerenciamento de time de até 6 Pokémon, com consulta à **PokéAPI**.
- **Sistema de Batalha (`batalha.html`):** Combate por turnos com cálculo de dano, tipos, efeitos de status, uso de itens do inventário, recompensas em dinheiro e registro automático em log no banco de dados.
- **Loja / Poké Mart (`loja.html`):** Compra de itens de cura de HP (*Potion*, *Super Potion*, *Hyper Potion*, *Max Potion*, *Full Restore*), cura de status (*Antidote*, *Burn Heal*, *Ice Heal*, *Awakening*, *Paralyze Heal*, *Full Heal*), *Revive* e item de evolução.
- **Centro Pokémon (`centro.html`):** Recuperação completa do HP e status dos Pokémon do time após as batalhas.

---

## Tecnologias e Arquitetura

- **Backend:** PHP 8.3 (Apache) com arquitetura **MVC** própria:
  - Roteamento centralizado em `public/index.php` e `backend/core/Roteador.php`.
  - Carregamento automático de classes via `spl_autoload_register` (`backend/config/autoload.php`).
  - Persistência via **PDO** com PostgreSQL (`backend/config/Conexao.php`).
  - Tratamento de erros com exceções customizadas (`LojaException`, `SemDinheiroException`, `SemEstoqueException`, `SenhaInvalidaException`).
- **Frontend:** HTML5, CSS3 e JavaScript (ES6+) orientado a objetos, consumindo a API local e a **PokéAPI** via `fetch` e JSON.
- **Banco de Dados:** PostgreSQL 17, com scripts de inicialização em `database/` (`1 - schema.sql`, `2 - data.sql`, `3 - views.sql`), incluindo as views `time_view`, `loja_view` e `log_batalha_view`.
- **Infraestrutura:** Docker e Docker Compose (`docker/docker-compose.yml`), com Nginx servindo os arquivos estáticos do frontend e atuando como proxy reverso para `/api/`.
- **Testes de API:** Coleção de requisições para o **Bruno** em `bruno/monstrobolso/`.

---

## Estrutura do Projeto

```text
monstrobolso/
├── backend/
│   ├── config/          # Conexão PDO e autoloader
│   ├── controller/      # Controladores MVC (Auth, Batalha, Inventario, Loja, Pokemon, Time, Upload, etc.)
│   ├── core/            # Roteador de endpoints
│   ├── excecoes/        # Exceções customizadas de negócio
│   └── model/           # Entidades, ModelGeral e ModelInterface
├── bruno/               # Coleção de testes de API (Bruno)
├── database/            # Scripts SQL (DDL, dados iniciais e Views)
├── docker/              # Dockerfile, nginx.conf e docker-compose.yml
├── docs/                # Requisitos, modelo ER, dados de teste e exemplos de POO
├── frontend/
│   ├── css/             # Folhas de estilo das páginas e componentes
│   ├── images/          # Sprites, cenários e ícones
│   ├── js/              # APIs, entidades OO, views e scripts das páginas
│   └── pages/           # Páginas HTML da aplicação
├── public/              # Ponto de entrada da API PHP (index.php)
└── z_data/              # Armazenamento de fotos de perfil enviadas
```

---

## Como Executar com Docker

### Pré-requisitos

- [Docker](https://www.docker.com/) e Docker Compose instalados.

### Subindo os containers

Na raiz do projeto, execute:

```bash
docker compose -f docker/docker-compose.yml up -d
```

Os serviços ficarão disponíveis nas seguintes portas (conforme `docker/docker-compose.yml`):

| Serviço | Container | URL / Porta |
| --- | --- | --- |
| Frontend (Nginx) | `frontend` | `http://localhost:81` |
| Backend API (PHP 8.3 + Apache) | `php_apache` | `http://localhost:8080` |
| Banco de Dados (PostgreSQL 17) | `postgres` | `localhost:5433` |

> **Observação:** O Nginx encaminha automaticamente requisições `/api/*` na porta `81` para o serviço PHP, portanto basta acessar `http://localhost:81` no navegador.

### Comandos úteis

```bash
# Parar os containers
docker compose -f docker/docker-compose.yml down

# Parar os containers e apagar o volume do banco (reseta os dados iniciais)
docker compose -f docker/docker-compose.yml down -v

# Acessar o terminal do PostgreSQL
docker exec -it postgres psql -U postgres -d monstrobolso

# Visualizar logs do banco de dados
docker logs postgres
```

---

## Dados de Teste

O script `database/2 - data.sql` cria usuários iniciais para testes:

| Login | Nome | Senha |
| --- | --- | --- |
| `jogador01` | Ana | `senha123` |
| `jogador02` | Bruno | `senha456` |
| `jogador03` | Carla | `senha789` |

Mais detalhes sobre os registros iniciais estão em [docs/dados_teste.md](docs/dados_teste.md).

---

## Endpoints da API

Rotas registradas em `public/index.php`:

- **Autenticação:** `/api/cadastro`, `/api/login`, `/api/me`, `/api/logout`
- **Time e Pokémon:** `/api/builder`, `/api/builder/atualiza`, `/api/treinador/time`, `/api/pokemon`, `/api/pokemon/evoluir`, `/api/time/curar`, `/api/efeito`, `/api/tipo`, `/api/ataques`
- **Batalha:** `/api/treinador`, `/api/npc`, `/api/usuario/recompensa`, `/api/batalha/log`
- **Loja e Inventário:** `/api/loja/comprar`, `/api/loja/listarProdutos`, `/api/produto/criar`, `/api/inventario`, `/api/inventario/remover`, `/api/item`
- **Foto de Perfil:** `/api/upload`, `/api/removerFoto`, `/api/fotoPerfil`

---

## Conceitos de POO e Documentação

A pasta `docs/` contém os requisitos da avaliação, o diagrama do banco e a explicação de como os conceitos de Programação Orientada a Objetos foram aplicados no código:

- [Requisitos do Trabalho](docs/requisitos.md)
- [Documentação dos Dados de Teste](docs/dados_teste.md)
- [Modelo do Banco de Dados](docs/modeloBanco.erd)
- **Conceitos de POO aplicados:**
  - [Encapsulamento](docs/demonstrarConceitos/encapsulamento.md)
  - [Polimorfismo](docs/demonstrarConceitos/polimorfismo.md)
  - [Composição](docs/demonstrarConceitos/composicao.md)
  - [Agregação](docs/demonstrarConceitos/agregacao.md)
  - [Associação](docs/demonstrarConceitos/associacao.md)
