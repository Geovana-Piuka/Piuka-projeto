# Demandas-02 — Plano de melhorias e criações pendentes

---

## PARTE 1 — Skills a criar

Lista completa de skills do sistema:

| # | Skill | Status |
|---|-------|--------|
| 1 | CRM — revisão / otimização / e-mail marketing | ⬜ CRIAR |
| 2 | Briefings influenciadoras | ✅ Já existe (`/briefing-influenciadoras`) |
| 3 | Campanhas de ads | ✅ Já existe (`/campanhas-ads`) |
| 4 | Marketplaces (lives) | ✅ Já existe (`/mktplace`) |
| 5 | Freela design | ⬜ CRIAR |

---

### Skill 1 — CRM (`/crm-piuka`)

**O que vai cobrir:** planejamento mensal de e-mail marketing, WhatsApp marketing, segmentação de base, cadência de disparos e otimização de automações existentes.

**A personalizar antes de usar:**
- Quais automações já estão rodando (nomes e gatilhos)
- Ferramenta de CRM usada (RevSend)
- Volume mensal de disparos de e-mail e WhatsApp
- Critérios de segmentação da base (RFM, tags, comportamento)
- O que é campanha nova x o que é automação que não entra no briefing

**Estrutura prevista (a confirmar):**
- Fase 1: extração — base, segmentos, volume, cadência do mês
- Fase 2: geração — tabela de disparos, segmentação por perfil, cadência A/B/C, outputs para Joy

**Output esperado (a confirmar com o adm antes de finalizar a skill)**

---

### Skill 5 — Freela Design (`/freela-design`)

**O que vai cobrir:** briefing completo para a freelancer de design — artes de loja física, layout home, banners vitrine, painéis de VM, catálogos e qualquer peça que não é produzida internamente com IA.

**A personalizar antes de usar:**
- Tabela de tamanhos por loja (já existe no instalador — importar)
- Canal de entrega das artes (pasta, Drive, Trello?)
- Critério de aprovação (quem aprova, em qual etapa)
- Prazo padrão de produção da freela
- Quem é a freela atual e como ela prefere receber o briefing

**Estrutura prevista (a confirmar):**
- Fase 1: extração — demandas do mês, produto foco, referências, prazos por loja
- Fase 2: geração — doc autocontido para a freela (tabela geral + detalhamento por arte + fichas de loja física)
- Salva `jsons/freela.json` e gera `briefing_freela_{slug}.docx`

**Output esperado (a confirmar com o adm antes de finalizar a skill)**

---

## PARTE 2 — Pasta de imagens nas tasks do Trello

### O que foi decidido

Ao criar cards do Trello via briefing, algumas tasks precisam de imagens anexadas (ex: banner home → foto da modelo que a freela deve usar; quadrinhos de loja → foto do produto base).

A IA **não presume** qual imagem vai em qual card. O fluxo é:

1. O adm renomeia as imagens da pasta com nomes que indicam o destino (ex: `banner-home-modelo.jpg`, `quadrinho-namorados-produto.jpg`)
2. Antes de criar os cards, a skill pergunta: **"Qual é a pasta que contém as imagens que serão anexadas nas tasks?"**
3. A skill lê os nomes dos arquivos da pasta informada e cruza com os cards a criar
4. Em caso de dúvida sobre qual imagem vai em qual card — **pergunta antes de criar**, nunca presume

### Pergunta padrão a inserir no fluxo de criação de cards

> "Vai ter imagens para anexar nos cards? Se sim, me informe o caminho da pasta. As imagens devem estar renomeadas com o nome da task de destino."

### Onde inserir essa pergunta no briefing

- Na skill `/briefing-piuka`: antes da geração do `tasks_trello.json`, no passo de confirmação final (Bloco 6 da Fase 1)
- Na skill `/freela-design` (quando criada): mesmo ponto, antes de gerar o doc da freela

### Regra de matching imagem → card

| Nome do arquivo | Card de destino |
|-----------------|-----------------|
| `banner-home-namorados.jpg` | Card "Banner Home — Dia dos Namorados" |
| `quadrinho-loja-produto.jpg` | Card "Quadrinhos lojas físicas" |
| `flyer-ecommerce-modelo.jpg` | Card "Flyer Ecommerce" |

Se o nome do arquivo não bater claramente com nenhum card: **perguntar para o adm antes de criar**.

---

## PARTE 3 — Melhorias nos cards do Trello

### O que foi visto nos cards existentes (pasta `imagens-card-trello`)

Foram analisados 4 cards reais do Trello da Piuka:

| Card | O que tem | O que falta hoje no gerador |
|------|-----------|----------------------------|
| "Quadrinhos lojas físicas dia dos namorados" | Cover com arte da campanha, 1 comentário, 5 anexos | Cover gerado automaticamente, múltiplos anexos de referência |
| "Flyer Ecommerce" | Cover com foto da modelo, 1 anexo | Cover com imagem da modelo/produto que a freela deve usar |
| "Novo layout home — subir 03/06" | Cover com foto do produto, 3 comentários, 12 anexos, checklist 6/6 | Checklist de subtarefas dentro do card, múltiplos anexos |
| "Banner Coleção Aura — 09/06" | Cover com foto da modelo, 1 anexo | Cover + cards abaixo sem foto ainda |

### Melhorias a implementar no `criar_cards_trello.js` e nos JSONs

#### 1. Cover do card
- Cada card deve ter um cover (imagem de capa)
- A cover é a imagem principal da campanha ou do produto que aparece na arte
- Vem da pasta de imagens informada pelo adm no fluxo
- **O que mudar:** o JSON `tasks_trello.json` deve ter um campo `"cover_image"` por task

```json
{
  "titulo": "Banner Home — Dia dos Namorados",
  "resp": "Marcela",
  "data": "09/06/2026",
  "lista": "Campanhas do Mês",
  "fazer": "...",
  "material": "...",
  "escalar": "...",
  "cover_image": "banner-home-namorados.jpg",
  "anexos": ["foto-modelo-1.jpg", "foto-produto-colar.jpg"]
}
```

#### 2. Múltiplos anexos por card
- Cards de freela costumam ter vários anexos (12 no card "Novo layout home")
- O campo `"anexos"` deve aceitar array com múltiplos arquivos
- Matching pelo nome do arquivo (mesmo critério da Parte 2)

#### 3. Checklist de subtarefas dentro do card
- Cards complexos (ex: "Novo layout home") têm checklist com etapas (6/6 no exemplo visto)
- O JSON deve suportar um campo `"checklist"` com array de subtarefas

```json
{
  "titulo": "Novo layout home — subir 03/06",
  "checklist": [
    "Receber arte da freela",
    "Revisar medidas",
    "Aprovar com Ana",
    "Subir no Shopify",
    "Confirmar publicação",
    "Arquivar arte aprovada"
  ]
}
```

#### 4. Comentário inicial no card
- Cards reais têm comentários com instruções adicionais
- O JSON deve ter um campo `"comentario_inicial"` com orientação que será postado como comentário no momento de criação do card

```json
{
  "comentario_inicial": "Usar as fotos da sessão do dia 28/05. Referência de cor: rosé gold. Não usar fundo branco."
}
```

#### 5. Data de vencimento com hora
- Incluir campo `"hora"` além de `"data"` para cards com prazo de entrega em horário específico

---

### O que fazer com essas melhorias

**Não alterar nada agora.** As melhorias acima devem ser implementadas em sequência:

1. Primeiro confirmar com o adm a estrutura final dos campos do JSON
2. Atualizar o `criar_cards_trello.js` para ler os novos campos (`cover_image`, `anexos`, `checklist`, `comentario_inicial`)
3. Atualizar a skill `/briefing-piuka` para gerar o `tasks_trello.json` com os novos campos
4. Atualizar a skill `/freela-design` (quando criada) com o mesmo padrão
5. Testar com um card real antes de rodar o mês inteiro

---

## RESUMO — O que precisa ser feito (em ordem)

| # | O que fazer | Prioridade | Status |
|---|-------------|------------|--------|
| 1 | Criar skill `/crm-piuka` (estrutura a confirmar com adm) | Alta | ⬜ Pendente |
| 2 | Criar skill `/freela-design` (estrutura a confirmar com adm) | Alta | ⬜ Pendente |
| 3 | Adicionar pergunta de pasta de imagens no fluxo do `/briefing-piuka` | Alta | ⬜ Pendente |
| 4 | Atualizar JSON `tasks_trello.json` com campos: `cover_image`, `anexos`, `checklist`, `comentario_inicial` | Média | ⬜ Pendente |
| 5 | Atualizar `criar_cards_trello.js` para ler e aplicar os novos campos | Média | ⬜ Pendente |
| 6 | Atualizar skill `/briefing-piuka` para gerar JSON com novos campos | Média | ⬜ Pendente |
