# Módulo Imagens — Piuka

## O que cobre

Pacote completo de peças visuais do mês para gerar via `/imagens-piuka`. Cada peça declarada aqui vira um JSON de design + prompt Freepik quando a skill for chamada.

Seções de origem no instalador: Sub-bloco 4D, seção 2.5C.

**Famílias disponíveis:**
- `collab_panels` — triptych/diptych com influencer (1:1 ou 16:9)
- `story_9x16` — story de evento/live, vertical
- `produto_flatlay_4x5` — produto sem influencer, 4:5
- `single_1x1_editorial` — single shot influencer, texto empilhado

**Regra padrão (se Ana disser "faz tudo padrão"):**
- 1 triptych 1:1 por influencer lançada
- 1 story 9:16 por live anunciada
- 1 flatlay 4:5 por coleção em promoção

---

## Perguntas de extração

### Bloco 1 — Cobertura geral

```
→ Quais influencers entram esse mês? (coletar @handle do Instagram de cada uma)
→ Quantas peças por influencer e em quais famílias?
→ Tem peças de produto sem influencer (ex: coleção religiosa, flatlay promocional)?
→ Tem live prevista que precisa de story de divulgação?
```

### Bloco 2 — Ficha por peça

Para cada peça declarada, coletar:

```
1. Nome curto da peça (ex: "Triptych Ariane — julho")
2. Família: collab_panels / story_9x16 / produto_flatlay_4x5 / single_1x1_editorial
3. Paineis (se collab_panels): 2 ou 3?
4. Formato: 1:1 / 4:5 / 9:16 / 16:9
5. Influencer (se houver): nome + @handle Instagram
6. Canal de destino: feed Instagram / story / WhatsApp / e-mail / anúncio / site
7. Data de entrega

COPY DA PEÇA:
8. Headline principal (texto maior — ex: "A COLLAB MAIS AGUARDADA")
9. Handwritten / tagline manuscrita (ex: "Ariane x Piuka", "Clássicas e atemporais")
10. Texto do CTA (ex: "VER AGORA", "SHOP NOW")
11. Estilo do CTA: sólido preto / outline preto / sublinhado / rosa / dourado
12. Disclaimer legal (se houver — ex: "Válido de DD/MM até DD/MM")

IMAGENS DE REFERÊNCIA (para /imagens-piuka gerar o JSON):
13. Ana já subiu as fotos da influencer no Freepik? (S/N)
14. Descrição das poses/enquadramentos disponíveis
15. Posição de cada imagem no layout (ex: "frontal → painel esquerdo")
```

---

## Output esperado

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PACOTE DE IMAGENS — [MÊS/ANO]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

| # | Peça | Família | Paineis | Influencer (@handle) | Formato | Canal | Data entrega | Status |
|---|------|---------|---------|---------------------|---------|-------|--------------|--------|
| 1 | ... | ... | ... | ... | ... | ... | ... | pendente |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DETALHAMENTO POR PEÇA:

PEÇA 1 — [nome]
• Headline: [texto]
• Handwritten: [texto]
• CTA: [texto] ([estilo])
• Disclaimer: [texto ou —]
• Referências disponíveis: [descrição das poses + posição no layout]
• Freepik: [fotos subidas / pendente]
```

---

## Situações comuns

**@handle não informado:**
Bloquear. "O @handle do Instagram da influencer é obrigatório — a skill /imagens-piuka usa para categorizar as referências."

**Fotos não subidas no Freepik:**
Sinalizar ⚠️ mas continuar com o briefing. "⚠️ Peça [N]: fotos ainda não subidas no Freepik — lembrar antes de rodar /imagens-piuka."

**Ana não sabe quantas peças:**
"Usando regra padrão: 1 triptych por influencer lançada + 1 story por live. Quer ajustar?"

**Instrução pós-output (sempre incluir no final):**
```
Próximo passo: ao rodar /imagens-piuka, Ana deve:
1. Subir TODAS as fotos da influencer no Freepik
2. Enviar as mesmas fotos no chat ao chamar /imagens-piuka
3. Enviar também o PNG da logo Piuka (fundo branco)
4. Se houver assinatura handwritten da influencer, enviar o PNG dela também
```
