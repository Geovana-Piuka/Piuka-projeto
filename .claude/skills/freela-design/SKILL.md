---
name: freela-design
description: >
  Agente de Briefing para Freela de Design da Piuka. Planeja e gera o documento completo de demandas para a freelancer de design — artes de loja física, layout home, banners vitrine, painéis VM e qualquer peça produzida externamente. Responsável: coordenação por Marcela.
  Use quando: Marcela ou Ana quiserem gerar o briefing da freela, listar demandas do mês para design externo, estruturar artes de loja física ou montar o documento que a freela recebe.
trigger: >
  Acione esta skill quando o usuário mencionar "freela", "freelancer", "design freela", "arte freela", "banner vitrine", "painel VM", "layout home", "catálogo", "briefing freela", "demandas freela", "freela-design" ou qualquer variação sobre artes externas da Piuka.
---

# Skill: Freela Design — Piuka

## O que esta skill faz

Gera o briefing completo para a freelancer de design da Piuka. A freela recebe um documento autocontido e executa sem precisar consultar Ana ou o briefing geral.

**Tipos de arte cobertos:**
- Layout home (site Shopify)
- Painel de VM (visual merchandising por loja)
- Banner / Acrílico Vitrine (por loja, com medidas específicas)
- Acrílico Quadrinho 15x15cm
- Acrílico Caixa
- Placas PVC 10x15cm e 21x15cm
- Catálogos e materiais impressos
- Painéis rodoviários e banners de grande formato

**Responsável pela coordenação:** Marcela

---

## FASE 1 — EXTRAÇÃO

Conduzir em blocos. Esperar resposta antes de avançar.

### Bloco 1 — Contexto

```
→ Qual é a campanha principal do mês? (Se vier de /briefing-piuka, puxar do super doc)
→ Qual é o produto ou coleção foco?
→ Quais lojas físicas são ativadas este mês? (Campinas / Iguatemi RioPreto / Morumbi / RioPreto Shopping / Ribeirão Preto / todas)
→ Qual é o prazo geral da campanha?
```

### Bloco 2 — Demandas do mês

Para cada tipo de arte, confirmar se entra este mês e coletar os detalhes:

```
→ Layout home? (S/N) — Se sim: qual seção do site, produto foco, data de publicação
→ Painel de VM? (S/N) — Se sim: quais lojas, produto base, data de entrega
→ Banner / Acrílico Vitrine? (S/N) — Se sim: quais lojas (ver tabela de medidas abaixo)
→ Acrílico Quadrinho 15x15cm? (S/N) — Se sim: quais lojas
→ Placas PVC 10x15cm? (S/N) — Se sim: quais lojas
→ Placas PVC 21x15cm? (S/N) — Se sim: quais lojas
→ Acrílico Caixa? (S/N) — Se sim: qual medida e qual loja
→ Outro material impresso? Descrever.

Para cada arte confirmada, coletar:
   • Loja(s) de destino
   • Medida (consultar tabela de tamanhos abaixo — confirmar antes de registrar)
   • Quantidade (consultar tabela de tamanhos)
   • Prazo de entrega
   • Headline / copy da peça (se houver texto)
   • Produto em destaque
```

### Bloco 3 — Referências visuais

```
→ As fotos base para cada arte já estão disponíveis?
   Se sim: onde estão? (pasta Drive / pasta local / após sessão fotográfica)
   Se não: qual é a data prevista da sessão fotográfica?
→ Tem referência visual de campanha anterior ou moodboard?
→ Tem restrições visuais específicas para este mês? (cores, produtos que não entram, etc.)
```

### Bloco 4 — Entrega e aprovação

```
→ Qual é o canal de entrega das artes prontas? [CAMPO_ANA — pasta Drive / WeTransfer / outro]
→ Quem aprova as artes antes de imprimir? (Marcela → Ana?)
→ Qual é o prazo máximo de aprovação para não travar a impressão?
→ Qual gráfica vai imprimir? Tem especificação técnica (CMYK, sangria, resolução)? [CAMPO_ANA]
```

### Bloco 5 — Confirmação

```
Antes de gerar, deixa eu confirmar:

Campanha: [nome]
Lojas ativadas: [lista]
Total de artes: [número]
Prazo mais urgente: [data]
Fotos base: [disponíveis / pendentes até data X]

Está correto? Confirme para eu gerar.
```

---

## FASE 2 — GERAÇÃO

Após confirmação, gerar na ordem abaixo.

---

### FREELA.1 — TABELA GERAL DE DEMANDAS

```
━━━━━━━━━━━━━━━━
DEMANDAS DA FREELA — [MÊS/ANO]
━━━━━━━━━━━━━━━━

| # | Loja | Demanda | Medida | Qtd | Prazo | Foto base | Status |
|---|------|---------|--------|-----|-------|-----------|--------|
| 1 | [loja] | [tipo de arte] | [medida] | [qtd] | [data] | [disponível / pendente] | A fazer |
(repetir 1 linha por arte)

RESUMO:
→ Total de artes: [número]
→ Prazo mais urgente: [data] — [arte]
→ Produto/campanha foco: [nome]
```

---

### FREELA.2 — DETALHAMENTO POR ARTE

Para cada arte da tabela acima, gerar um bloco:

```
━━━━━━━━━━━━━━━━
ARTE [#]: [nome da peça]
━━━━━━━━━━━━━━━━
Loja:              [ex: Campinas / todas]
Tipo:              [ex: Painel VM / Banner Vitrine / Layout Home]
Medida:            [ex: Painel VM Campinas — ver tabela de tamanhos no final]
Quantidade:        [ex: 33 unid]
Prazo:             [data]
Foto/produto base: [link ou "aguardando sessão fotográfica — data prevista: DD/MM"]
Status:            A fazer

COPY DA PEÇA:
→ Headline: [texto exato ou "sem headline"]
→ Copy de apoio: [texto ou "sem copy de apoio"]
→ CTA: [texto ou "sem CTA"]
→ Produto em destaque: [nome + confirmar se foto disponível: SIM / NÃO]

HIERARQUIA VISUAL:
→ 1º elemento de atenção: [headline / produto / oferta]
→ 2º elemento: [subhead / preço]
→ 3º elemento: [CTA / logo]

REFERÊNCIA:
→ [CAMPO_ANA — link de referência visual ou campanha anterior]
→ Paleta: [CAMPO_ANA — cores da marca para esta peça]
→ Tom visual: [CAMPO_ANA — clean / vibrante / elegante]

O QUE NÃO PODE:
→ [CAMPO_ANA — restrições visuais específicas]
→ Provisório: texto genérico demais, produto sem destaque claro, CTA sem contraste

PARA DÚVIDAS DE MEDIDA: consultar tabela de tamanhos no final deste documento
PARA ENVIAR ARTE PRONTA: [CAMPO_ANA — canal de entrega e aprovação]
```

---

### FREELA.3 — DOC AUTOCONTIDO PARA A FREELA

Este documento é o que a freela recebe. Ela lê só ele e executa sem precisar consultar Ana ou Marcela.

```
━━━━━━━━━━━━━━━━
DEMANDAS — [MÊS/ANO]
Campanha: [nome]
Gerado em: [data]
━━━━━━━━━━━━━━━━

OLÁ! Aqui estão todas as demandas do mês. Leia com atenção antes de começar.

RESUMO DO MÊS:
→ Total de artes: [número]
→ Prazo mais urgente: [data] — [arte]
→ Produto/campanha foco: [nome]

[inserir FREELA.1 — tabela geral]

━━━━━━━━━━━━━━━━
DETALHAMENTO POR DEMANDA
━━━━━━━━━━━━━━━━

[inserir todos os blocos do FREELA.2]

━━━━━━━━━━━━━━━━
REFERÊNCIA DE TAMANHOS POR LOJA
━━━━━━━━━━━━━━━━

[inserir tabela de tamanhos completa — ver seção TABELA DE TAMANHOS abaixo]

DÚVIDAS? Falar com Marcela antes de começar — não depois de produzir.
ENTREGA: [CAMPO_ANA — canal e prazo de revisão]
```

---

### FREELA.4 — RESUMO PARA O BRIEFING MENSAL

Bloco para inserir na seção 2.5B do briefing mensal (`/briefing-piuka`).

```
━━━━━━━━━━━━━━━━
ARTES FREELA — RESUMO (gerado por /freela-design)
━━━━━━━━━━━━━━━━

Total de artes: [número]
Prazo mais urgente: [data]

| # | Loja | Demanda | Medida | Prazo | Status |
|---|------|---------|--------|-------|--------|
[tabela resumida]

→ Briefing completo gerado por /freela-design
→ Doc autocontido enviado para a freela: briefing_freela_{slug}.docx
→ JSON salvo em: recursos/campanhas/YYYY-MM-{slug}/jsons/freela.json
```

---

## Geração automática de arquivos

Após gerar todos os outputs no chat, salvar automaticamente:

```
recursos/campanhas/YYYY-MM-{slug}/jsons/freela.json
recursos/campanhas/YYYY-MM-{slug}/briefing_freela_{slug}.docx  ← via skill /docx
```

**`jsons/freela.json`** — mesmo formato usado em `/briefing-piuka`:

```json
[
  {
    "loja": "",
    "demanda": "",
    "medida": "",
    "quantidade": "",
    "prazo": "DD/MM/AAAA",
    "arquivo_foto_base": "",
    "status": "A fazer",
    "observacoes": ""
  }
]
```

---

## TABELA DE TAMANHOS — LOJAS FÍSICAS (referência fixa)

### Painel de VM

| Loja | Qtd |
|---|---|
| Campinas | 33 |
| Iguatemi RioPreto | 18 |
| Morumbi | 11 |
| RioPreto Shopping | 21 |
| Ribeirão Preto | 14 |

### Placas PVC 10x15cm

| Loja | Qtd |
|---|---|
| Campinas | 21 |
| Iguatemi RioPreto | 14 |
| Morumbi | 8 |
| RioPreto Shopping | 14 |
| Ribeirão Preto | 8 |

### Placas PVC 21x15cm

| Loja | Qtd |
|---|---|
| Campinas | 12 |
| Iguatemi RioPreto | 4 |
| Morumbi | 3 |
| RioPreto Shopping | 7 |
| Ribeirão Preto | 6 |

### Acrílico Caixa

| Medida | Loja | Qtd |
|---|---|---|
| 60x60cm | Ribeirão Preto | 1 |
| 30x30cm | Morumbi | 2 |
| 1mx40cm | Morumbi | 1 |
| 30x35cm | Campinas | 3 |

### Banner / Acrílico Vitrine

| Loja | Medida |
|---|---|
| Iguatemi Rio Preto | 70L x 1,00A |
| Iguatemi Campinas | 94L x 75A — Arco |
| Morumbi Shopping | 57L x 1,12A — Arco |
| Morumbi Shopping (Acrílico Vitrine lado esq.) | 62x60 |
| Rio Preto Shopping | 59L x 1,17A — Arco |
| Ribeirão Shopping | 78L x 96A — Arco |

### Acrílico Quadrinho (15x15cm, espessura 3mm) — ARTE IA

| Loja | Qtd |
|---|---|
| Campinas | 4 unid |
| Iguatemi RioPreto | 3 unid |
| Morumbi | 4 unid |
| RioPreto Shopping | 3 unid |
| Ribeirão Preto | 4 unid |

---

## Integração com `/briefing-piuka`

Quando chamada dentro de um briefing mensal:
- Recebe campanha, produto, lojas ativadas e demandas do mês da seção 2.5B do instalador
- Gera o briefing completo da freela
- Devolve o bloco **FREELA.4 — RESUMO** para inserir na seção 2.5B do briefing mensal

O briefing mensal **não detalha as artes da freela** — apenas referencia o resumo gerado por esta skill.