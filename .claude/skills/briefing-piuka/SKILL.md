---
name: briefing-piuka
description: >
  Agente de Briefing Mensal da Piuka. Conduz Ana Beatriz por uma conversa estruturada pós-reunião mensal e gera tudo que o time precisa para o mês: super doc da campanha, copies por canal, e-mails, briefings visuais, sub-docs individuais por pessoa e tasks do Trello. Lives de marketplace são geradas via skill /mktplace (responsável: Marcela).
  Use quando: Cristian ou Ana quiser gerar o briefing mensal da Piuka, criar campanha específica, ou estruturar os entregáveis do mês para o time.
trigger: >
  Acione esta skill quando o usuário mencionar "briefing da Piuka", "briefing mensal Piuka", "campanha da Piuka", "gerar briefing Ana", "montar o mês da Piuka", ou qualquer variação.
---

# Skill: Briefing Mensal Piuka

## O que esta skill faz

Carrega o instalador completo do Agente de Briefing da Piuka e inicia a conversa no modo correto.

O agente:
1. Pergunta se é briefing do mês inteiro ou campanha específica
2. Conduz a Fase 1 em blocos (extração estruturada com Ana)
3. Devolve resumo para aprovação
4. Após confirmação, gera todos os outputs em cascata

## Arquivos que esta skill carrega

- Instalador principal: `clientes/ativos/leonardo_piuka/instaladores/instalador_briefing_mensal.md`

## Como executar

Leia o instalador completo antes de qualquer resposta. O instalador contém:
- Identidade e comportamento do agente
- Contexto completo da marca Piuka
- Roteiro de início e perguntas da Fase 1
- Estrutura completa dos outputs da Fase 2
- Regras da marca e situações comuns

Após ler o instalador, inicie com a mensagem de boas-vindas definida na seção "ROTA DE INÍCIO".

## Outputs que esta skill gera

Quando na Fase 2 (após aprovação da Ana), gera em sequência:

1. **Super doc da campanha** — visão estratégica completa do mês + calendário com data/canal/responsável
2. **Diretrizes de copy por canal** — tom, regras, restrições e CTA padrão para Instagram feed, stories, TikTok, WhatsApp, Meta Ads (não copies soltas — são diretrizes de uso)
3. **E-mails do mês** — 20-23 disparos com subject A/B, pré-header, copy completa **e HTML estruturado** (width 600px, paleta Piuka, placeholders marcados com [COLCHETES] para Joy preencher antes do agendamento)
4. **Lives de marketplace** — levantamento das lives previstas (Shopee, TikTok Shop, Mercado Livre). Os roteiros são gerados via skill `/mktplace` (responsável: Marcela)
5. **Briefing de artes** — separado em Artes IA (WhatsApp/CRM, e-mail, convites, stories, carrosséis, Acrílico Quadrinho, PVCs) e Artes Freela (layout home, Painel VM, Banner Vitrine, catálogos, painéis rodoviários). Cada arte de loja física gera ficha com 8 campos.
6. **Sub-docs individuais** — Amanda, Responsável de Artes (Freela/IA), Joy, Marcela, gerados tanto no master quanto como arquivos separados
7. **Tasks do Trello** — 1 card por entregável com responsável, data, o que fazer, material de referência e quando escalar
8. **JSON consolidado** — consolidação de tudo para registro e integrações futuras

## Geração automática de arquivos — OBRIGATÓRIA

**Após gerar todos os outputs no chat, a skill DEVE automaticamente, sem que Ana precise pedir:**

### 1. Criar a pasta da campanha

```
recursos/campanhas/YYYY-MM-{slug}/
recursos/campanhas/YYYY-MM-{slug}/jsons/
```

Slug = mês em português minúsculo + tema, ex: `2026-06-namorados`.

### 2. Salvar os 3 JSONs

**`jsons/tasks.json`** — JSON consolidado completo do briefing (estrutura do instalador seção 2.8).

**`jsons/tasks_trello.json`** — Array direto de tasks internas das funcionárias da Piuka, no formato exato que o `criar_cards_trello.js` lê:
```json
[
  {
    "titulo": "...",
    "resp": "Amanda | Joy | Marcela",
    "data": "DD/MM/AAAA",
    "lista": "Campanhas do Mês",
    "fazer": "instrução direta do que executar",
    "material": "onde encontrar o briefing / seção do doc",
    "escalar": "critério claro de quando acionar Ana",
    "cover_image": "nome-do-arquivo.jpg"
  }
]
```
- Incluir 1 task por entregável de Amanda, Joy e Marcela. **Não incluir tasks da freela neste arquivo.**
- O campo `cover_image` é **opcional** — preencher apenas se o adm informou a pasta de imagens no Bloco 6. Se não houver imagem para o card, omitir o campo ou deixar `null`.

**`jsons/freela.json`** — Array direto das demandas da freela, no formato exato que o `criar_cards_trello.js` lê:
```json
[
  {
    "loja": "...",
    "demanda": "...",
    "medida": "...",
    "quantidade": "...",
    "prazo": "DD/MM/AAAA",
    "arquivo_foto_base": "...",
    "status": "A fazer",
    "observacoes": "..."
  }
]
```
1 item por arte Freela do mês. Prazo sempre no formato `DD/MM/AAAA`.


### 3. Perguntar sobre imagens de cover dos cards

**Antes de gerar o `tasks_trello.json`, fazer esta pergunta obrigatória:**

```
Vai ter imagens de cover para os cards do Trello? (S/N)
Se sim: informe o caminho da pasta.
As imagens devem estar renomeadas com o nome (ou parte do nome) da task de destino.
Ex: "banner-home-namorados.jpg" → cover do card "Banner Home — Dia dos Namorados"
```

**Se a resposta for SIM:**
1. Listar os arquivos encontrados na pasta
2. Sugerir o matching de cada arquivo com o card correspondente
3. Aguardar confirmação do adm antes de preencher o campo `cover_image`
4. Em caso de dúvida sobre qual imagem vai em qual card — **perguntar antes de criar, nunca presumir**

**Se a resposta for NÃO:** gerar `tasks_trello.json` sem o campo `cover_image`.

---
### 3. Gerar os 2 arquivos .docx via skill `/docx`

**`briefing_{slug}.docx`** — Briefing master completo para Ana e o time. Contém todas as seções (super doc, copies, e-mails, roteiros, artes, sub-docs, tasks). Formatado com cabeçalho Piuka, tabelas por seção, campos ⚠️ sinalizados.

**`briefing_freela_{slug}.docx`** — Documento autocontido para a freelancer. Ela lê só este arquivo e executa sem consultar o briefing completo. Contém: resumo, tabela geral de demandas, detalhamento por arte com medidas e diretrizes, tabela de tamanhos de referência por loja.

Usar a skill `/docx` com `npm install -g docx` + script Node.js para gerar os `.docx`. Salvar os scripts `.js` na pasta da campanha para regeneração futura.

### 4. Confirmar o que foi gerado

Ao final, informar:
```
Arquivos salvos em recursos/campanhas/YYYY-MM-{slug}/:
✅ briefing_{slug}.docx
✅ briefing_freela_{slug}.docx
✅ jsons/tasks.json
✅ jsons/tasks_trello.json
✅ jsons/freela.json

Para criar os cards do time no Trello:
node criar_cards_trello.js recursos/campanhas/YYYY-MM-{slug}/jsons/tasks_trello.json

Se tiver covers:
node criar_cards_trello.js recursos/campanhas/YYYY-MM-{slug}/jsons/tasks_trello.json --imagens ./recursos/campanhas/YYYY-MM-{slug}/refs/

Para criar também os cards da freela:
node criar_cards_trello.js recursos/campanhas/YYYY-MM-{slug}/jsons/tasks_trello.json recursos/campanhas/YYYY-MM-{slug}/jsons/freela.json
```

## Criação de cards no Trello

O script `criar_cards_trello.js` na raiz do projeto cria os cards automaticamente a partir dos JSONs gerados. **Não executar automaticamente** — apenas informar o comando ao final para Ana rodar quando quiser.

**Pré-requisito:** `PIUKA_TRELLO_BOARD_ID` deve estar no `.env`. Quando o board real da Piuka for acessível, atualizar o ID e preencher `membros_piuka.json` com os IDs do time.

## Regras de geração de sub-docs

- Cada sub-doc é **autocontido**: a pessoa lê só o sub-doc dela e sabe tudo que precisa fazer
- Sub-docs são gerados no master (seção 6) **e** como arquivos individuais via `gerar_briefing_[mes][ano].js`
- O script gera: `briefing_[mes][ano].docx` (master) + `subdoc_amanda_[mes][ano].docx`, `subdoc_artes_...`, ``, `subdoc_joy_...`, `subdoc_marcela_...`
- E-mails sempre incluem HTML com estrutura base. Os placeholders `[LOGO_PIUKA]`, `[FOTO_HERO]`, `[LINK_COLECAO]`, `[LINK_DESCADASTRO]` são preenchidos por Joy antes do agendamento no RevSend
- O briefing é **mensal** (não semanal): período, calendário e estratégia cobrem o mês inteiro

## Campos que ainda dependem de Ana

O instalador contém campos marcados como `[CAMPO_ANA]`. Esses campos são preenchidos progressivamente na sessão com Ana Beatriz. Quando encontrar um campo não preenchido, sinalizar com ⚠️ no output e pedir para Ana confirmar na próxima sessão.

## Registro de entregas

Após cada ciclo, atualizar:
`clientes/ativos/leonardo_piuka/implementacao/log_entregas.md`

com o que o agente acertou, o que Ana ajustou e o que vira regra fixa no próximo ciclo.




