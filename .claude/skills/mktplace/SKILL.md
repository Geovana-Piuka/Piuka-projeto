---
name: mktplace
description: >
  Agente de Lives de Marketplace e Instagram da Piuka. Gera roteiros de live para Instagram, Shopee, TikTok Shop e Mercado Livre. Responsável: Marcela.
  Use quando: alguém quiser gerar roteiro de live, planejar lives, montar calendário de lives ou criar briefing de live para Marcela.
trigger: >
  Acione esta skill quando o usuário mencionar "live Instagram", "live insta", "live Shopee", "live TikTok Shop", "live Mercado Livre", "roteiro de live", "lives do mês", "live marketplace", "mktplace", "live Marcela" ou qualquer variação sobre lives da Piuka.
---

# Skill: Lives — Piuka

## O que esta skill faz

Gera roteiros de live para os canais da Piuka:
- **Instagram**
- **Shopee**
- **TikTok Shop**
- **Mercado Livre**

**Responsável pelas lives:** Marcela

## Contexto

A live é **conduzida ao vivo** — não é lida palavra por palavra. Por isso o roteiro não deve prescrever tempo a tempo o que falar. Ele deve dar só o essencial para quem vai ao vivo:

- Tema/temática da live
- Cupons/ofertas disponíveis durante a live
- Produtos que serão apresentados
- Pontos fixos obrigatórios daquela plataforma (ex: Shopee sempre fala de moedinhas/cashback)

A energia, o humor e os comentários pessoais são de quem conduz a live — o roteiro é só a estrutura de apoio.

## Passo 1 — Sempre perguntar a plataforma primeiro

Esta é sempre a primeira pergunta, antes de qualquer outra coisa, pois o conteúdo do roteiro muda de acordo com a plataforma:

```
Qual plataforma vai ser a live?
→ Instagram
→ Shopee
→ TikTok Shop
→ Mercado Livre
```

Se vier de um briefing mensal (`/briefing-piuka`), usar a plataforma e os dados do bloco de lives já coletados, sem repetir a pergunta.

Depois de saber a plataforma, seguir o fluxo específico abaixo.

---

## Fluxo — Instagram (implementado)

### Bloco 1 — Sobre a live
```
1. Data da live
2. É collab com alguma influenciadora/parceira ou é só Piuka?
   (se for collab, qual o nome dela?)
```

### Bloco 2 — Tema da live
```
Qual é o tema/temática dessa live?
(ex: lançamento de coleção, collab com influenciadora, campanha sazonal)
```

### Bloco 3 — Cupom/oferta
```
Tem cupom ou oferta específica rolando nessa live?
- Código do cupom
- Condição (% off, brinde, frete grátis)
- Validade (até que horário, quantas primeiras unidades, etc.)
```
Se não houver cupom/oferta, seguir sem esse bloco.

### Bloco 4 — Produtos a apresentar
```
Agora me lista os produtos que vão ser apresentados, agrupados por categoria/linha.
Para cada categoria me dá:
- Nome da categoria
- Gancho de venda (o que faz essa categoria especial — 1 a 2 frases)
- Lista de produtos (SKU + nome)

Quando terminar todas as categorias, escreva **pronto**.
```

**Regra crítica:** nunca inventar gancho de venda, história ou elogio que o usuário não forneceu. Se o usuário não der um gancho para a categoria, deixar em branco ou usar apenas o que foi dito — nunca completar com texto criado.

### Prévia antes de gerar

Antes de gerar o documento, mostrar o resumo completo no chat para conferência:

```
Confere antes de eu gerar o roteiro:

TEMA: [tema]
DATA: [data]
COM: [Piuka / collab com NOME]

CUPOM: [código] — [condição] — válido até [validade]

PRODUTOS:
[Categoria 1]
→ [gancho]
- [SKU] - [nome produto]
- [SKU] - [nome produto]

[Categoria 2]
→ [gancho]
- [SKU] - [nome produto]
...
```

Só gerar o `.docx` depois de confirmação explícita do usuário.

### Estrutura do documento gerado (baseada no exemplo)

Ver modelo de referência em `Exemplo/Roteiro live Nat Mosca e Piuka 07.05 .docx` para tom e estrutura. O documento segue:

```
Roteiro Live Piuka [+ NOME DA PARCEIRA, se houver] - [DATA]

Introdução:
- Boas-vindas e introdução da live
- Contexto do tema da live
- [se houver cupom/brinde] Anúncio do cupom/brinde do dia, com validade

[Categoria 1]
[gancho de venda da categoria]
- [SKU] - [nome do produto]
- [SKU] - [nome do produto]
...

[Categoria 2]
[gancho de venda da categoria]
- [SKU] - [nome do produto]
...

Encerramento:
- Resumo rápido do que foi apresentado
- Lembrete do cupom/brinde e validade
- Agradecimento e convite para a coleção/produtos
```

Gerar o `.docx` usando a skill `docx` (biblioteca `docx` via Node), seguindo esse formato — sem tabela de cronograma, sem timestamps.

---

## Fluxo — Shopee (a fazer)

Estrutura ainda não implementada. Quando implementar, manter:
- Mesmo formato leve (tema, cupom, produtos) do Instagram
- Tópico fixo obrigatório: **moedinhas/cashback da Shopee** — sempre incluir esse ponto no roteiro, já que a Shopee costuma liberar moedas durante as lives
- CTAs típicos: "Coloca no carrinho agora", "Aperta o coração pra ganhar cupom"

## Fluxo — TikTok Shop (a fazer)

Estrutura ainda não implementada. Quando implementar, manter:
- Mesmo formato leve (tema, cupom, produtos)
- Tom mais dinâmico, público mais jovem
- CTAs típicos: "Clica no link da vitrine", "Arrasta pra comprar agora"

## Fluxo — Mercado Livre (a fazer)

Estrutura ainda não implementada. Quando implementar, manter:
- Mesmo formato leve (tema, cupom, produtos)
- Tom mais informativo — mencionar avaliações/reputação da loja quando relevante
- CTAs típicos: "Clica em Comprar agora", "Tá disponível no Mercado Livre da Piuka"

---

## Onde salvar

Salvar o `.docx` gerado em:
```
.claude/skills/mktplace/roteiros-gerados/roteiro_[plataforma]_[DD-MM-AAAA].docx
```
Exemplo: `.claude/skills/mktplace/roteiros-gerados/roteiro_instagram_07-05-2026.docx`

## Integração com `/briefing-piuka`

Quando chamada dentro de um briefing mensal, esta skill recebe o bloco de lives do briefing (incluindo a plataforma) e gera o roteiro correspondente.

Os roteiros gerados por `/mktplace` substituem a seção de roteiros de live do briefing mensal. O briefing mensal deve referenciar esta skill para a geração de roteiros, em vez de gerá-los internamente.