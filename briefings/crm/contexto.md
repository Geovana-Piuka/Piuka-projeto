# Módulo CRM — Piuka

## O que cobre

Segmentação da base, cadência de disparos de e-mail e WhatsApp para campanhas novas do mês. Output vai para Joy (operação CRM).

Seções de origem no instalador: Sub-bloco 4E (parcial — cadência e segmentação), seção Joy (2.6).

**Não duplicar automações que já rodam sozinhas:**
- Carrinho abandonado 3.0
- Pós-venda 30 e 50
- CRM bônus giftback
- saudade15
- RFM (Risco / Potenciais Fiéis / Prestes a dormir)
- CRM WhatsApp (pedidos cancelados e expirados)

Este módulo cobre apenas **campanhas novas**.

---

## Perguntas de extração

### Bloco 1 — Volume e datas críticas

```
→ Quantos e-mails o mês vai ter? (padrão: 20-23)
→ Tem disparos em datas críticas fixas? (ex: dia da campanha principal, lançamento, última chance)
→ Tem teste A/B ativo? (assuntos diferentes testando o mesmo e-mail)
→ Qual canal vai receber mais energia esse mês — e-mail ou WhatsApp?
```

### Bloco 2 — Segmentação

```
→ Quer segmentar a base este mês? (clientes ativos / inativos / leads sem compra)
→ Tem algum perfil de cliente que deve receber oferta diferenciada?
→ Tem restrição de segmento? (ex: "não disparar para quem comprou na última semana")
```

### Bloco 3 — Cadência

```
→ Qual a data do disparo de lançamento?
→ Vai ter lembrete? Em qual data?
→ Vai ter e-mail de última chance? Em qual data?
→ O WhatsApp segue a mesma cadência ou tem calendário próprio?
```

---

## Output esperado

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRM — [MÊS/ANO]
RESPONSÁVEL: Joy
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VOLUME: [N] e-mails no mês

SEGMENTAÇÃO:

Segmento A — Clientes ativos (compraram nos últimos 90 dias)
→ Canal: [e-mail / WhatsApp]
→ Copy: mais direta, menos explicativa — já conhece a marca
→ Disparar em: [data]

Segmento B — Clientes inativos (sem compra há 90+ dias)
→ Canal: [e-mail / WhatsApp]
→ Copy: elemento de reativação — oferta um pouco mais agressiva
→ Disparar em: [data]

Segmento C — Leads sem compra
→ Canal: e-mail
→ Copy: apresenta a marca + oferta de entrada
→ Disparar em: [data]

CADÊNCIA:
→ Disparo 1: [data] — lançamento (todos os segmentos)
→ Disparo 2: [data] — lembrete (quem não abriu o Disparo 1)
→ Disparo 3: [data] — última chance (quem abriu mas não comprou)

NÃO DUPLICAR: carrinho abandonado, pós-venda, CRM bônus e saudade15 já rodam sozinhos.
```

---

## Situações comuns

**Ana não sabe quantos e-mails vai ter:**
"Padrão histórico é 20-23. Quer manter ou ajustar para este mês?"

**Sem segmentação definida:**
Assumir padrão (A/B/C) e sinalizar: "⚠️ Segmentação: usando padrão A/B/C — confirmar com Joy se tem algo diferente."

**WhatsApp sem cadência própria:**
"Entendi. Vou replicar a mesma cadência do e-mail para WhatsApp com mensagens adaptadas (mais curtas)."
