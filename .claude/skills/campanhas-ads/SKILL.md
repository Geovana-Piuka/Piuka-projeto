---
name: campanhas-ads
description: >
  Agente de Campanhas de Ads da Piuka. Planeja os anúncios pagos do mês inteiro: Meta Ads (Facebook/Instagram) e Google Ads. Gera estrutura de campanhas, conjuntos de anúncios, copies A/B, públicos-alvo, orçamento e calendário. Responsável: Ana.
  Use quando: Ana quiser planejar os anúncios pagos do mês, criar campanha de Meta Ads ou Google Ads, estruturar copies de anúncio, montar o calendário de mídia paga ou revisar a estratégia de tráfego pago da Piuka.
trigger: >
  Acione esta skill quando o usuário mencionar "ads", "Meta Ads", "Google Ads", "anúncios pagos", "tráfego pago", "campanhas de anúncio", "mídia paga", "Facebook Ads", "Instagram Ads", "copies de ads", "campanhas-ads", "planejar anúncios" ou qualquer variação.
---

# Skill: Campanhas de Ads — Piuka

## O que esta skill faz

Planeja e estrutura todas as campanhas de anúncios pagos do mês da Piuka:
- **Meta Ads** (Facebook + Instagram): campanhas de conversão, tráfego, remarketing e awareness
- **Google Ads**: campanhas de busca e Shopping (quando ativo)

**Responsável:** Ana

## Como executar

Conduzir em blocos. Não lançar tudo de uma vez — esperar resposta antes de avançar.

---

## FASE 1 — EXTRAÇÃO

### Bloco 1 — Contexto do Mês

```
→ Qual é a campanha principal do mês? (Se vier de /briefing-piuka, puxar do super doc)
→ Qual é o orçamento total de Meta Ads este mês?
→ Google Ads está ativo este mês? Se sim, qual o orçamento?
→ Qual é o objetivo principal dos anúncios: conversão (venda), tráfego (visita ao site), remarketing ou awareness?
→ Tem data de início e fim definidos para as campanhas?
→ Tem promoção ou oferta específica que os anúncios precisam comunicar?
```

### Bloco 2 — Produto e Público

```
→ Qual produto ou coleção é o foco dos anúncios?
→ Quais públicos serão ativados? (público frio / lookalike / remarketing de visitantes / remarketing de carrinho)
→ Tem segmentação específica que funcionou bem em meses anteriores?
→ Tem públicos que devem ser excluídos?
→ Vai usar influencer no criativo? Se sim, qual? (puxar do briefing se disponível)
```

### Bloco 3 — Criativos e Formatos

```
→ Quais formatos de anúncio vão ser usados? (imagem estática, carrossel, vídeo, stories, reels)
→ Os criativos (fotos/vídeos) já estão disponíveis ou precisam ser produzidos?
→ Vai usar peças geradas por /imagens-piuka como criativo? Quais?
→ Tem restrição de visual ou copy para os anúncios deste mês?
```

### Bloco 4 — Google Ads (se ativo)

```
→ Quais palavras-chave são o foco este mês?
→ Vai usar Shopping Ads? O feed do Shopify está atualizado?
→ Tem campanhas de marca (nome "Piuka" como keyword)?
→ Qual é o orçamento diário para Search?
```

### Bloco 5 — Confirmação

Após coletar, devolver resumo para Ana confirmar antes de gerar.

---

## FASE 2 — GERAÇÃO

Após confirmação da Ana, gerar na ordem abaixo.

---

### ADS.1 — PLANO DE CAMPANHAS DO MÊS

```
━━━━━━━━━━━━━━━━
CAMPANHAS DE ADS — [MÊS/ANO]
━━━━━━━━━━━━━━━━

CAMPANHA PRINCIPAL: [nome]
PERÍODO: [data início] → [data fim]
PRODUTO/COLEÇÃO: [nome]
OBJETIVO: [conversão / tráfego / remarketing / awareness]
ORÇAMENTO TOTAL META ADS: R$ [x]
ORÇAMENTO TOTAL GOOGLE ADS: R$ [x] (ou "não ativo")

ESTRUTURA DE CAMPANHAS:

──────────────────
CAMPANHA 1: [nome — ex: "Namorados 2026 — Conversão Frio"]
──────────────────
Plataforma: Meta Ads
Objetivo: Conversão
Público: [descrição — ex: Lookalike 1% de compradores dos últimos 180 dias]
Exclusões: [ex: compradores dos últimos 30 dias]
Orçamento diário: R$ [x]
Período: [data início] → [data fim]
Formato: [imagem / carrossel / vídeo / stories]
Criativo: [peça de referência — ex: "Triptych Ariane — gerado por /imagens-piuka"]

──────────────────
CAMPANHA 2: [nome — ex: "Namorados 2026 — Remarketing Carrinho"]
──────────────────
Plataforma: Meta Ads
Objetivo: Conversão
Público: Remarketing — visitantes do site nos últimos 30 dias que não compraram
Exclusões: compradores dos últimos 30 dias
Orçamento diário: R$ [x]
Período: [data início] → [data fim]
Formato: [carrossel de produtos dinâmico / imagem estática]
Criativo: [descrição]

(repetir bloco para cada campanha do mês)
```

---

### ADS.2 — COPIES POR ANÚNCIO

Para cada campanha, gerar as copies nos formatos abaixo.

**Regras de copy para Meta Ads:**
- Headline: máx. 40 caracteres — direto, sem enrolação
- Texto principal: máx. 125 caracteres na dobra — o que aparece antes do "ver mais"
- CTA: escolher entre Comprar agora / Saiba mais / Ver oferta / Compre já
- Sempre gerar Variação A e Variação B com hipótese de teste declarada

```
━━━━━━━━━━━━━━━━
COPIES — [nome da campanha]
━━━━━━━━━━━━━━━━

VARIAÇÃO A — [hipótese: ex: urgência / data / escassez]
• Headline: [máx. 40 caracteres]
• Texto principal: [máx. 125 caracteres]
• Descrição (opcional): [texto que aparece abaixo do headline em alguns posicionamentos]
• CTA: [Comprar agora / Saiba mais / Ver oferta / Compre já]

VARIAÇÃO B — [hipótese: ex: benefício / emoção / produto]
• Headline: [máx. 40 caracteres]
• Texto principal: [máx. 125 caracteres]
• Descrição (opcional): [texto]
• CTA: [CTA escolhido]

HIPÓTESE DO TESTE: [o que está sendo testado entre A e B — ex: urgência vs benefício]
MÉTRICA DE DECISÃO: [ex: CTR nos primeiros 3 dias / custo por compra em 7 dias]
```

**Regras de copy para Google Ads (Search):**
- Título 1: máx. 30 caracteres
- Título 2: máx. 30 caracteres
- Título 3: máx. 30 caracteres (opcional)
- Descrição 1: máx. 90 caracteres
- Descrição 2: máx. 90 caracteres (opcional)

```
━━━━━━━━━━━━━━━━
COPIES — Google Ads Search — [grupo de anúncios]
━━━━━━━━━━━━━━━━

Título 1: [máx. 30 caracteres]
Título 2: [máx. 30 caracteres]
Título 3: [máx. 30 caracteres]
Descrição 1: [máx. 90 caracteres]
Descrição 2: [máx. 90 caracteres]
URL de destino: [URL com UTM]
```

---

### ADS.3 — CALENDÁRIO DE MÍDIA PAGA

```
━━━━━━━━━━━━━━━━
CALENDÁRIO DE ADS — [MÊS/ANO]
━━━━━━━━━━━━━━━━

| DATA | CAMPANHA | PLATAFORMA | AÇÃO | ORÇAMENTO DO DIA | OBSERVAÇÃO |
|------|----------|------------|------|-----------------|------------|
| [data] | [nome] | Meta Ads | Ligar campanha | R$ [x] | Lançamento |
| [data] | [nome] | Meta Ads | Aumentar verba | R$ [x] | Pico da campanha |
| [data] | [nome] | Meta Ads | Pausar anúncio A | — | Variação B venceu |
| [data] | [nome] | Meta Ads | Desligar campanha | — | Fim do período |
| [data] | [nome] | Google Ads | Ligar campanha | R$ [x]/dia | |

MARCOS CRÍTICOS:
→ [data] — verificar performance das variações A/B (pausar perdedora)
→ [data] — revisar frequência (se > 3, renovar criativo)
→ [data] — último dia da campanha — verificar se desliga automático está configurado
```

---

### ADS.4 — PÚBLICOS SUGERIDOS

```
━━━━━━━━━━━━━━━━
PÚBLICOS — META ADS
━━━━━━━━━━━━━━━━

PÚBLICO FRIO (aquisição):
→ [descrição — ex: Lookalike 1% de compradores dos últimos 180 dias, BR, mulheres 18-45]
→ [descrição — ex: Interesses: joias, moda feminina, acessórios — excluindo engajamento recente]

PÚBLICO MORNO (engajamento):
→ [descrição — ex: Engajamento com perfil Instagram nos últimos 30 dias]
→ [descrição — ex: Visitantes do site nos últimos 60 dias — excluindo compradores]

REMARKETING (conversão):
→ [descrição — ex: Visitantes do carrinho nos últimos 14 dias — excluindo compradores]
→ [descrição — ex: Compradores dos últimos 180 dias — para upsell / nova coleção]

EXCLUSÕES GLOBAIS:
→ [ex: Compradores dos últimos 7 dias — não ver anúncio de produto que já compraram]
```

---

### ADS.5 — RESUMO PARA O BRIEFING MENSAL

Este bloco é gerado automaticamente e inserido no briefing mensal (`/briefing-piuka`) como referência.

```
━━━━━━━━━━━━━━━━
ADS DO MÊS — RESUMO (gerado por /campanhas-ads)
━━━━━━━━━━━━━━━━

Total de campanhas: [número]
Orçamento Meta Ads: R$ [total]
Orçamento Google Ads: R$ [total] (ou "não ativo")
Período principal: [data início] → [data fim]

CAMPANHAS:
| # | Nome | Plataforma | Objetivo | Orçamento | Período | Criativo |
|---|------|------------|----------|-----------|---------|---------|
| 1 | [nome] | Meta Ads | Conversão | R$ [x]/dia | [início] → [fim] | [peça] |
| 2 | [nome] | Meta Ads | Remarketing | R$ [x]/dia | [início] → [fim] | [peça] |

COPIES GERADAS: [número de variações A/B]
→ Ver detalhamento completo no arquivo de ads do mês

MARCOS DE ATENÇÃO:
→ [data] — checar A/B e pausar variação perdedora
→ [data] — renovar criativo se frequência > 3
→ [data] — desligar campanhas

Para criar os cards no Trello:
node criar_cards_trello.js recursos/campanhas/YYYY-MM-{slug}/jsons/tasks_trello.json
```

---

## Geração automática de arquivos

Após gerar todos os outputs no chat, salvar automaticamente:

### Pasta e arquivos

```
recursos/campanhas/YYYY-MM-{slug}/
recursos/campanhas/YYYY-MM-{slug}/jsons/ads.json
```

**`jsons/ads.json`** — consolidação de todas as campanhas, copies e calendário:

```json
{
  "mes": "",
  "gerado_em": "",
  "orcamento_total_meta": 0,
  "orcamento_total_google": 0,
  "campanhas": [
    {
      "id": 1,
      "nome": "",
      "plataforma": "Meta Ads | Google Ads",
      "objetivo": "conversao | trafego | remarketing | awareness",
      "publico": "",
      "exclusoes": "",
      "orcamento_diario": 0,
      "periodo_inicio": "",
      "periodo_fim": "",
      "formato": "",
      "criativo": "",
      "status": "pendente"
    }
  ],
  "copies": [
    {
      "campanha_id": 1,
      "variacao": "A | B",
      "hipotese": "",
      "headline": "",
      "texto_principal": "",
      "descricao": "",
      "cta": "",
      "url_destino": ""
    }
  ],
  "calendario": [
    {
      "data": "",
      "campanha": "",
      "plataforma": "",
      "acao": "",
      "orcamento_dia": 0,
      "observacao": ""
    }
  ],
  "publicos": {
    "frio": [],
    "morno": [],
    "remarketing": [],
    "exclusoes_globais": []
  },
  "marcos": []
}
```

### Confirmar ao final

```
Arquivos salvos em recursos/campanhas/YYYY-MM-{slug}/:
✅ jsons/ads.json

Resumo de ads adicionado ao briefing mensal (seção ADS DO MÊS).
```

---

## Integração com `/briefing-piuka`

Quando chamada dentro de um briefing mensal:
- Recebe campanha principal, produto, período e canais do Bloco 4
- Gera o plano completo de ads
- Devolve o bloco **ADS.5 — RESUMO** para ser inserido na seção 2.2 do briefing mensal no lugar do bloco "Meta Ads" original

O briefing mensal **não detalha copies de ads** — apenas referencia o resumo gerado por esta skill.

---

## Regras da marca para ads

✅ FAZER
- Copies diretas com número concreto (desconto %, preço, data)
- Testar sempre A/B com hipótese declarada — nunca subir variação única
- Urgência com fundamento real (data da campanha, estoque limitado)
- Nomear o produto com exatidão — não "nossa coleção" mas "Coleção Letras"
- Pausar variação perdedora com dados — não por feeling

❌ NÃO FAZER
- Copy genérica sem personalidade da marca
- CTA vago: "Saiba mais" sem contexto de oferta
- Urgência fabricada sem data ou estoque real
- Subir campanha sem público de exclusão configurado (compradores recentes)
- Aumentar orçamento de campanha com frequência > 4 sem renovar criativo