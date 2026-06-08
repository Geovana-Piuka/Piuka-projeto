---
name: mktplace
description: >
  Agente de Lives de Marketplace da Piuka. Gera roteiros estruturados de live para Shopee, TikTok Shop e Mercado Livre. Responsável: Marcela.
  Use quando: alguém quiser gerar roteiro de live, planejar lives de marketplace, montar calendário de lives ou criar briefing de live para Marcela.
trigger: >
  Acione esta skill quando o usuário mencionar "live Shopee", "live TikTok Shop", "live Mercado Livre", "roteiro de live", "lives do mês", "live marketplace", "mktplace", "live Marcela" ou qualquer variação sobre lives nos canais de marketplace da Piuka.
---

# Skill: Lives de Marketplace — Piuka

## O que esta skill faz

Gera roteiros completos de live para os canais de marketplace da Piuka:
- **Shopee**
- **TikTok Shop**
- **Mercado Livre**

**Responsável pelas lives:** Marcela

## Contexto

As lives de marketplace são produzidas e conduzidas pela Marcela. Esta skill gera os roteiros estruturados que ela usa como base — a energia, personalidade e improvisos são dela.

## Como executar

Perguntar antes de gerar:

```
→ Qual plataforma? (Shopee / TikTok Shop / Mercado Livre)
→ Qual a data e horário previsto?
→ Qual produto ou coleção é o foco da live?
→ Qual é a oferta da live? (desconto, cupom, frete grátis, brinde)
→ Quanto tempo de duração estimada?
→ Tem urgência específica para criar escassez? (cupom por tempo / estoque limitado / só hoje)
```

Se vier de um briefing mensal (`/briefing-piuka`), usar os dados do bloco de lives já coletados.

## Formato do roteiro gerado

Para cada live prevista no mês:

```
━━━━━━━━━━━━━━━━
LIVE [número] — [plataforma]
━━━━━━━━━━━━━━━━
DATA: [data]
PLATAFORMA: [Shopee / TikTok Shop / Mercado Livre]
PRODUTO EM FOCO: [nome + 1 linha de descrição]
DURAÇÃO ESTIMADA: [x minutos]

[00:00–00:03] ABERTURA
Opção A: [gancho de entrada — pergunta ou afirmação que para o scroll]
Opção B: [gancho alternativo]
→ Apresentação: "Hoje vou mostrar [produto] e [benefício principal]"

[00:03–00:15] PRODUTO
→ O que é: [descrição direta]
→ Como usar / como fica: [pontos que Marcela deve mencionar]
→ Diferencial: [por que esse e não outro]
→ [ESPAÇO MARCELA — adicione histórias pessoais, como você usa, o que sente usando]

[00:15–00:25] OFERTA
→ Preço normal: R$ [x]
→ Condição da live: [desconto / cupom / brinde / frete grátis]
→ Como comprar: [passo a passo da plataforma]
→ Urgência: [o que cria escassez nessa live — cupom por tempo / estoque limitado / só hoje]

[00:25–00:28] CTA FINAL
→ "Se você chegou agora, [resumo da oferta]"
→ Como comprar agora: [instrução rápida]
→ "Segue a loja para não perder os próximos [produtos/lançamentos]"

[ESPAÇO MARCELA — GERAL]
→ Adicione seus comentários pessoais, referências, histórias do dia a dia aqui.
→ O roteiro é a estrutura. A energia, o humor e a personalidade são seus.
```

## Sub-doc de Marcela (gerado junto com o roteiro)

```
━━━━━━━━━━━━━━━━
MARCELA — LIVES DO MÊS
━━━━━━━━━━━━━━━━

LIVES DO MÊS:
| DATA | PLATAFORMA | PRODUTO | DURAÇÃO |
|------|------------|---------|---------|
| [data] | [plataforma] | [produto] | [x min] |

→ Roteiros completos acima (1 bloco por live)
→ Preencha os campos [ESPAÇO MARCELA] com seus comentários pessoais antes de cada live
→ O roteiro é orientação — adapte ao que está acontecendo ao vivo
```

## Adaptações por plataforma

**Shopee:**
- Mencionar cupons de desconto disponíveis na plataforma durante a live
- Falar sobre frete grátis Shopee quando aplicável
- CTA: "Coloca no carrinho agora", "Aperta o coração pra ganhar cupom"

**TikTok Shop:**
- Tom mais dinâmico e espontâneo — público mais jovem
- Falar rápido nos primeiros 3 segundos para segurar o usuário
- CTA: "Clica no link da vitrine", "Arrasta pra comprar agora"
- Incluir sugestão de som/trilha se a Marcela quiser

**Mercado Livre:**
- Tom mais informativo — comprador quer saber exatamente o que está comprando
- Mencionar avaliações e reputação da loja quando relevante
- CTA: "Clica em Comprar agora", "Tá disponível no Mercado Livre da Piuka"

## Outputs que esta skill gera

- Roteiro(s) completo(s) de live formatado(s) por plataforma
- Sub-doc da Marcela com tabela de lives e roteiros referenciados
- Tasks do Trello (1 card por live) com responsável Marcela, data, produto e link para o roteiro

## Integração com `/briefing-piuka`

Quando chamada dentro de um briefing mensal, esta skill recebe o bloco de lives do Bloco 4 e gera os roteiros correspondentes.

Os roteiros gerados por `/mktplace` substituem a seção 2.4 — ROTEIROS DE LIVE do briefing mensal. O briefing mensal deve referenciar esta skill para a geração de roteiros, em vez de gerá-los internamente.