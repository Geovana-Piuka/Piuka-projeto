# Módulo E-mails — Piuka

## O que cobre

Pacote completo de 20-23 e-mails do mês para gerar via `/emails-piuka`. Cada e-mail declarado aqui vira um HTML completo quando a skill for chamada com "gera o e-mail [N]".

Seções de origem no instalador: Sub-bloco 4E (completo), seção 2.3.

**Regra absoluta:** todo e-mail tem texto real no corpo. Nunca só imagem. Melhora entrega e evita cair em promoções no Gmail.

**Automações CRM que JÁ RODAM e NÃO entram neste pacote:**
Carrinho abandonado, pós-venda, saudade15, RFM. Este pacote cobre apenas disparos de campanha.

---

## Perguntas de extração

### Bloco 1 — Volume e estrutura geral

```
→ Quantos e-mails o mês vai ter? (padrão: 20-23)
→ Tem disparos em datas críticas fixas? (dia da mãe, lançamento, recall, última chance)
→ Tem teste A/B ativo? Qual hipótese? (urgência vs benefício, nome vs produto, etc.)
→ Qual influencer ou campanha é o fio condutor da maioria dos e-mails?
```

### Bloco 2 — Ficha por e-mail

Para cada e-mail, coletar os campos abaixo. Pode deixar [PENDENTE] para preencher depois:

```
 1. Nº do e-mail no mês
 2. Data de envio (DD/MM/AAAA)
 3. Horário de envio
 4. Assunto A (linha principal)
 5. Assunto B (se houver teste A/B)
 6. Hipótese do A/B (qual diferença está sendo testada)
 7. Pré-header (texto curto que aparece depois do assunto no inbox)
 8. Objetivo: venda / awareness / engajamento / recorrência / recuperação
 9. Tem influencer? (nome + @handle)
10. Blocos a usar (na ordem):
    header / hero / produto_2up_polaroid / produto_grid_4 /
    assinatura_influencer / cta_saida / footer_social

COPY DO HERO:
11. Título hero script (texto grande cursivo — ex: "Coleção Mães")
12. Subtítulo "Por [Nome]" (se houver influencer)
13. Tagline bold (frase depois do título)
14. Parágrafo hero + palavras em BOLD
    Ex: "A nova **coleção de Dia das Mães** traz semijoias pensadas para **marcar histórias**."

COPY DOS BLOCOS (preencher só os que forem usados):
15. Copy polaroid_2up (2 linhas + palavras bold)
16. Copy grid_4 (2 linhas + palavras bold)

COPY DO BLOCO ASSINATURA (se usar assinatura_influencer):
17. Stack de 3 linhas em serif italic
    Ex: "Para mães, / Para filhas, / Para as duas."
18. Sub-copy assinatura + palavra bold

CTAs:
19. Texto do CTA principal (ex: "COMPRAR AGORA")
20. Link do CTA principal (com UTM)
21. Texto do CTA da assinatura (se houver)
22. Link do CTA da assinatura
```

---

## Output esperado

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PACOTE DE E-MAILS — [MÊS/ANO]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

| # | Data | Hora | Assunto A | Assunto B | Pré-header | Objetivo | Influencer | Blocos | Status |
|---|------|------|-----------|-----------|-----------|----------|-----------|--------|--------|

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DETALHAMENTO POR E-MAIL:

E-MAIL 1 — [data]
• Hipótese A/B: [descrição]
• Título hero script: [texto]
• Subtítulo: Por [Influencer] (ou —)
• Tagline bold: [texto]
• Parágrafo hero + bolds: [texto com **bolds** marcados]
• Copy polaroid_2up: [linha 1 + linha 2 com bolds] (ou —)
• Copy grid_4: [linha 1 + linha 2 com bolds] (ou —)
• Stack assinatura: [linha 1 / linha 2 / linha 3] (ou —)
• Sub-copy assinatura: [texto + bold] (ou —)
• CTA principal: [texto] → [link]
• CTA assinatura: [texto] → [link] (ou —)
```

---

## Situações comuns

**Ana não tem os 20-23 e-mails na cabeça:**
"Tudo bem. Me dá os e-mails das datas críticas (lançamento, recall, última chance) — o restante posso sugerir com base na cadência padrão."

**Bold não declarado por Ana:**
Sinalizar no output: "[REVISAR] — bold aplicado em palavras-chave óbvias. Ana deve confirmar antes de /emails-piuka gerar o HTML."

**Link de CTA não disponível:**
"⚠️ Link do CTA: [PENDENTE — Joy preenche antes de agendar no RevSend]"

**Instrução pós-output (sempre incluir no final):**
```
Próximo passo: ao rodar /emails-piuka, informar o número do e-mail.
Ex: "gera o HTML do e-mail 3" — a skill lê a linha 3 desta tabela e monta o HTML completo.
```
