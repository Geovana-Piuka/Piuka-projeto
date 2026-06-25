---
name: crm-piuka
description: >
  Agente de CRM da Piuka. Planeja e-mail marketing, WhatsApp marketing, segmentação de base e cadência de disparos do mês. Responsável: Joy.
  Use quando: Joy ou Ana quiserem planejar disparos do mês, montar cadência de e-mail/WhatsApp, segmentar a base ou estruturar campanhas novas de CRM.
trigger: >
  Acione esta skill quando o usuário mencionar "CRM", "e-mail marketing", "RevSend", "segmentação de base", "cadência de disparos", "automações CRM", "disparos do mês", "Joy CRM", "WhatsApp marketing" ou qualquer variação.
---

# Skill: CRM — Piuka

## O que esta skill faz

Planeja e estrutura toda a operação de CRM do mês da Piuka:
- **E-mail marketing** (RevSend): cadência de campanhas, segmentação, subjects A/B
- **WhatsApp marketing** (RevSend): disparos diretos por segmento
- **Segmentação da base**: critérios por perfil de compra (ativos, inativos, leads)
- **Cadência**: calendário de disparos com data, hora, segmento e objetivo por envio

**Responsável:** Joy

## Automações já rodando — NUNCA incluir no briefing mensal

As automações abaixo rodam de forma autônoma e **não devem ser duplicadas** no planejamento de campanhas:

- Carrinho abandonado 3.0
- Pós-venda 30 e 50
- CRM bônus giftback
- saudade15
- RFM: Risco / Potenciais Fiéis / Prestes a dormir
- CRM WhatsApp (pedidos cancelados e expirados)

O CRM do briefing cobre **apenas campanhas novas** do mês.

---

## Padrão de copy — WhatsApp marketing

Estes textos são referência de **tom, estrutura e uso de emoji** da Piuka — não são templates fixos. Quando o usuário pedir o texto completo de um disparo de WhatsApp (fora da cadência resumida do CRM.2), gerar copy nova seguindo o mesmo estilo, adaptada ao produto/oferta/data reais da campanha.

Características do padrão Piuka:
- Abre com título/chamada em maiúsculas ou emoji de destaque (✨💖🎁)
- Frase de contexto curta (1-2 linhas), tom próximo e caloroso, às vezes com nome do consumidor
- Lista de benefícios com emoji-bullet (💰 cashback, 🚚 frete grátis, 🎁 brinde, 📦 pedido mínimo)
- CTA de urgência curto antes do fechamento ("Garanta antes que esgote", "Corre, é só hoje")
- Fechamento opcional "Beijos" / "Beijos com carinho, Equipe Piuka 💖" — usado em disparos de tom mais pessoal, não em todos
- Cupom sempre em destaque, isolado ou em linha própria

Categorias de gatilho (usar a que combinar com o objetivo do disparo):

| Categoria | Quando usar | Exemplo de referência |
|---|---|---|
| Mix/look do dia | Destacar combinação de peças usada por influencer/modelo | "PIUKA MIX DO DIA" — Choker Alice + Colar Personalizado |
| Cupom/desconto por tempo limitado | Campanha de cupom com prazo curto (1 dia ou poucos dias) | "6.6 PIUKA NO AR" — cupom PIUKA0606, só hoje |
| Desconto por coleção | % off em coleção específica durante um período | "10% OFF Personalizados", "Coleção Glam 10% OFF" |
| Lançamento de coleção | Chegada de coleção nova/exclusiva | "Fe Tumas & Piuka" — lançamento exclusivo e limitado |
| Reposição de estoque | Peça que esgotou e voltou — aviso individual ao consumidor | "O colar mais desejado... voltou para o estoque" |
| Compre e ganhe | Brinde a partir de valor mínimo de compra | "COMPRE E GANHE PIUKA" — trio de brincos no Dia dos Namorados |
| Atacado/B2B | Disparo para revendedoras (Atacado Piuka), foco em pedido mínimo e tendência | "Coleção Aura" — atacado, pedido mínimo R$900 |

Regras ao gerar copy nova:
→ Manter linguagem da campanha do mês (puxar nome da coleção/produto do contexto já coletado no Bloco 1)
→ Cashback e frete grátis só entram se forem regra ativa do mês — confirmar com Joy/Ana antes de incluir como padrão
→ Disparo de atacado nunca usa tom "Beijos" pessoal — manter tom mais direto/comercial
→ Reposição de estoque é o único tipo enviado individualmente (não é disparo em massa) — sinalizar isso na cadência

---

## FASE 1 — EXTRAÇÃO

Conduzir em blocos. Esperar resposta antes de avançar para o próximo.

### Bloco 1 — Contexto do mês

```
→ Qual é a campanha principal do mês? (Se vier de /briefing-piuka, puxar do super doc)
→ Qual é o período da campanha?
→ Quantos e-mails estão previstos este mês? (padrão: 20-23)
→ Quantos disparos de WhatsApp estão previstos?
→ Tem data crítica de lançamento que a cadência precisa respeitar?
```

### Bloco 2 — Segmentação da base

```
→ Quais segmentos vão ser ativados este mês?
   Padrão Piuka:
   • Segmento A — Clientes ativos (compraram nos últimos 90 dias)
   • Segmento B — Clientes inativos (sem compra há 90+ dias)
   • Segmento C — Leads sem compra (nunca compraram)
→ [CAMPO_ANA — há segmentos customizados além desses três?]
→ [CAMPO_ANA — critérios RFM ou tags específicas da base no RevSend?]
→ Algum segmento não deve receber disparos este mês?
```

### Bloco 3 — Cadência de disparos

```
→ Qual é a data do primeiro disparo?
→ Quantos disparos por semana é o padrão para este mês?
→ Tem disparo de "último dia" / urgência previsto? Em qual data?
→ Qual segmento recebe cada disparo? (todos / só ativos / só inativos)
→ [CAMPO_ANA — qual é o intervalo mínimo entre disparos para não saturar a base?]
```

### Bloco 4 — Automações do mês

```
→ As automações fixas (listadas acima) estão rodando normalmente?
→ Tem alguma automação nova a ser criada este mês?
→ Tem alguma automação existente a ser pausada ou alterada?
→ Tem fluxo de reativação previsto para algum segmento específico?
```

### Bloco 5 — Confirmação

Após coletar as respostas, devolver resumo para Joy confirmar antes de gerar:

```
Antes de gerar, deixa eu confirmar:

Campanha: [nome]
Período: [datas]
Volume: [nº e-mails] e-mails + [nº WhatsApp] disparos WhatsApp
Segmentos: [lista]
Primeiro disparo: [data]
Automações novas: [sim/não + detalhe]
Automações alteradas: [sim/não + detalhe]

Está correto? Confirme para eu gerar.
```

---

## FASE 2 — GERAÇÃO

Após confirmação de Joy, gerar na ordem abaixo.

---

### CRM.1 — SEGMENTAÇÃO DO MÊS

```
━━━━━━━━━━━━━━━━
SEGMENTAÇÃO — [MÊS/ANO]
━━━━━━━━━━━━━━━━

| Segmento | Critério | Canal | Copy direction | Data do 1º disparo |
|----------|----------|-------|----------------|-------------------|
| Ativos | Compraram nos últimos 90 dias | E-mail + WhatsApp | Mais direta — já conhece a marca | [data] |
| Inativos | Sem compra há 90+ dias | E-mail | Com elemento de reativação — oferta um pouco mais agressiva | [data] |
| Leads | Nunca compraram | E-mail | Apresenta a marca + oferta de entrada | [data] |
| [CAMPO_ANA — segmentos customizados] | | | | |

EXCLUSÕES:
→ [ex: não enviar para quem comprou nos últimos 7 dias o e-mail de "última chance"]
→ [CAMPO_ANA — critérios de exclusão específicos da base]
```

---

### CRM.2 — CADÊNCIA DE DISPAROS

```
━━━━━━━━━━━━━━━━
CADÊNCIA — [MÊS/ANO]
━━━━━━━━━━━━━━━━

| # | Data | Hora | Canal | Segmento | Assunto sugerido | Objetivo |
|---|------|------|-------|----------|-----------------|----------|
| 1 | [data] | [hora] | E-mail | Todos | [assunto A] / [assunto B] | Lançamento |
| 2 | [data] | [hora] | WhatsApp | Ativos | [texto direto] | Lembrete |
| 3 | [data] | [hora] | E-mail | Quem não abriu o #1 | [assunto alternativo] | Recall |
| 4 | [data] | [hora] | E-mail | Abriu mas não comprou | [urgência] | Último dia |
(repetir para todos os disparos do mês)

REGRAS DA CADÊNCIA:
→ Disparo de lançamento: todos os segmentos
→ Lembrete D+2: apenas quem não abriu o lançamento
→ Último dia: quem abriu mas não comprou
→ NÃO duplicar automações fixas (carrinho abandonado, pós-venda, etc.)
→ [CAMPO_ANA — intervalo mínimo entre disparos]
```

---

### CRM.3 — SUB-DOC JOY

```
━━━━━━━━━━━━━━━━
JOY — CRM DO MÊS
━━━━━━━━━━━━━━━━

CAMPANHA: [nome] | PRODUTO: [nome]

SEGMENTAÇÃO:
[copiar tabela do CRM.1]

CADÊNCIA:
[copiar tabela do CRM.2]

AUTOMAÇÕES — STATUS DO MÊS:
→ Rodando normalmente (não mexer): [lista]
→ Novas a configurar: [lista + detalhes]
→ Pausadas ou alteradas: [lista + motivo]

PLACEHOLDERS A PREENCHER ANTES DO AGENDAMENTO NO REVSEND:
→ [LOGO_PIUKA] — inserir logo no template
→ [FOTO_HERO] — inserir foto da campanha
→ [LINK_COLECAO] — inserir URL com UTM
→ [LINK_DESCADASTRO] — confirmar link ativo

NÃO DUPLICAR:
→ Carrinho abandonado 3.0 | Pós-venda 30 e 50 | CRM bônus giftback
→ saudade15 | RFM (Risco / Potenciais Fiéis / Prestes a dormir)
→ CRM WhatsApp (pedidos cancelados e expirados)
```

---

### CRM.4 — RESUMO PARA O BRIEFING MENSAL

Este bloco é gerado automaticamente e inserido no briefing mensal (`/briefing-piuka`) na seção 2.6 (Sub-doc Joy).

```
━━━━━━━━━━━━━━━━
CRM DO MÊS — RESUMO (gerado por /crm-piuka)
━━━━━━━━━━━━━━━━

Volume: [nº] e-mails + [nº] disparos WhatsApp
Segmentos ativos: [lista]
Primeiro disparo: [data]
Último disparo: [data]
Automações novas: [sim/não]

CADÊNCIA RESUMIDA:
| # | Data | Canal | Segmento | Objetivo |
|---|------|-------|----------|----------|
[tabela resumida]

→ Detalhamento completo: Sub-doc Joy (seção 2.6)
→ Gerado por /crm-piuka em [data]
```

---

## Geração automática de arquivos

Após gerar todos os outputs no chat, salvar automaticamente:

```
recursos/campanhas/YYYY-MM-{slug}/jsons/crm.json
```

```json
{
  "mes": "",
  "gerado_em": "",
  "campanha": "",
  "volume_emails": 0,
  "volume_whatsapp": 0,
  "segmentos": [
    {
      "nome": "",
      "criterio": "",
      "canal": "",
      "copy_direction": "",
      "data_primeiro_disparo": ""
    }
  ],
  "cadencia": [
    {
      "n": 1,
      "data": "",
      "hora": "",
      "canal": "email | whatsapp",
      "segmento": "",
      "assunto_a": "",
      "assunto_b": null,
      "objetivo": "lancamento | recall | lembrete | urgencia | reativacao",
      "status": "pendente"
    }
  ],
  "automacoes": {
    "rodando": [],
    "novas": [],
    "pausadas": []
  }
}
```

---

## Integração com `/briefing-piuka`

Quando chamada dentro de um briefing mensal:
- Recebe campanha principal, produto e período do Bloco 4 do instalador
- Gera o plano completo de CRM
- Devolve o bloco **CRM.4 — RESUMO** para ser inserido na seção 2.6 do briefing mensal (sub-doc Joy)

O briefing mensal **não planeja cadência de disparos** — apenas referencia o resumo gerado por esta skill.