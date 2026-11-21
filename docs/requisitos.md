# MONSTROBOLSO
**Atividade Avaliativa do 3º Trimestre**  
*Disciplinas: Programação Orientada a Objetos I, Linguagens para a Web II e Banco de Dados II*

---

## 🎯 Objetivo
Criar um site em **PHP (Orientado a Objetos)** integrado a um **banco de dados**, onde seja possível jogar uma versão personalizada de Pokémon (ou outro jogo com a mesma mecânica).

---

## 📅 Prazos, Entrega e Avaliação

* **Valor:** 6,5 pontos na nota do trimestre.
* **Prazo final:** Último commit até **26/11 (quinta-feira) às 23:59**.
  > ⚠️ **Atenção:** Qualquer commit após o prazo no GitHub **zera** o trabalho.
* **Formulário de entrega:** [Clique aqui para enviar o link do repositório](https://forms.gle/awVxwGU55BPGBr5B8) *(entrega única para as três matérias)*.
* **Grupos:** Individual, em duplas ou trios (máximo 3 pessoas).
* **Avaliação:** Cada professor avaliará e atribuirá a nota referente à sua respectiva disciplina.

### 🎤 Bancas de Correção — Sexta-feira, 27/11 (Auditório 2)
* **DS3M:** 8h às 11h40
* **DS3T:** 13h10 às 16h50
* *Observação: Vocês estão convidados a assistir às apresentações do turno inverso, caso queiram.*

---

## 🖥️ Telas Exigidas
* **Login:** Autenticação e controle de usuário (*Perfil à la Arnaldo*).
* **Montagem de Time (*Team Builder*):** Seleção e gerenciamento da equipe.
* **Batalha:** Sistema de combate (todas as batalhas devem ser registradas em uma **tabela de log** no banco).
* **Lojinha (*Poké Mart*):** Compra de itens utilizando o dinheiro ganho nas batalhas.

---

## ⚙️ Regras e Mecânicas do Jogo

### Atributos e Tipagem
* **Variáveis mínimas do Pokémon:** 10 atributos no total, sendo **obrigatórios**:
  * Nome
  * HP (Vida)
  * Velocidade
* **Tipagem:** O Pokémon precisa "herdar" os tipos (Água, Terra, Fogo, etc.) — *não precisa ser `trait`*.
* **Evolução:** Ocorrerá por meio da compra de um item específico na loja (não é necessário implementar todas as variações originais de evolução).
* **Regras competitivas:** É permitido implementar variações de regras/formatos da **Smogon**, desde que atendam aos requisitos do trabalho.

### Economia e Itens da Loja (*Poké Mart*)
Vitórias em batalhas geram dinheiro (*Pokédollar*), que fica salvo no banco e pode ser gasto na loja. Abaixo estão os **itens mínimos exigidos** para a avaliação:

#### Restauradores de Vida (HP)
* **Potion:** Recupera 20 HP.
* **Super Potion:** Recupera 50 HP.
* **Hyper Potion:** Recupera 200 HP.
* **Max Potion:** Recupera 100% do HP.
* **Full Restore:** Recupera 100% do HP + cura todas as condições de status.

#### Cura de Condição de Status
* **Antidote:** Cura envenenamento (*Poison*).
* **Burn Heal:** Cura queimadura (*Burn*).
* **Ice Heal:** Cura congelamento (*Freeze*).
* **Awakening:** Cura sono (*Sleep*).
* **Paralyze Heal:** Cura paralisia (*Paralysis*).
* **Full Heal:** Cura todos os status.

#### Reviver
* **Revive:** Revive um Pokémon desmaiado com metade da vida (50% do HP).

---

## ⭐ Ponto Extra *(Limitado a 1 opção)*
Escolha apenas uma das opções abaixo para bonificação:
* **Centro Pokémon:** Funcionalidade para recuperar a vida dos Pokémon após as batalhas.
* **Interface Gráfica:** Capricho visual e acabamento avançado no front-end.

---

## 💻 Requisitos Técnicos

### Arquitetura e Web
* [ ] Padrão de arquitetura **MVC**
* [ ] Consumo de **APIs**
* [ ] **Requisições assíncronas** (AJAX / Fetch)
* [ ] Transporte de dados via **JSON**
* [ ] Projeto versionado no **GitHub**
* [ ] Controle de Usuário (troca de perfis)

### Programação Orientada a Objetos (PHP / JS)
* [ ] Orientação a Objetos em **PHP** *(obrigatório)*
* [ ] Orientação a Objetos em **JavaScript** *(opcional)*
* [ ] **Autoload** nas classes
* [ ] **Encapsulamento** e **Polimorfismo**
* [ ] **Sobrecarga** de métodos
* [ ] Relações entre classes: **Composição, Agregação e Associação**
* [ ] Tratamento de erros com no mínimo **3 exceções** (sendo **1 customizada**)

### Banco de Dados
* [ ] Uso do **PDO**
* [ ] Uso dos **4 agrupamentos do SQL:** `DDL`, `DML`, `DTL` e `DQL` *(não é obrigatório usar `DROP` e `TRUNCATE`)*
* [ ] Tabelas obrigatórias: **Logs de batalhas**, **Perfis/Usuários** e **Loja**
* [ ] Criação e uso de, pelo menos, **3 Views**
* [ ] Uso de **Triggers** *(opcional — pesquisar funcionamento)*