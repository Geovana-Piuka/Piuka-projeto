---
name: briefing-piuka
description: >
  Portão de entrada do sistema de briefing modular da Piuka. Pergunta o mês, o foco do mês e quais módulos Ana quer fazer agora — depois ativa só os escolhidos, na sequência.
  Use quando: Cristian ou Ana quiser iniciar qualquer briefing da Piuka.
trigger: >
  Acione esta skill quando o usuário mencionar "briefing da Piuka", "briefing mensal Piuka", "campanha da Piuka", "gerar briefing Ana", "montar o mês da Piuka", ou qualquer variação.
---

# Skill: Briefing Piuka — Portão

## O que esta skill faz

Inicia o sistema de briefing modular da Piuka. Em vez de gerar tudo de uma vez, ela pergunta quais módulos Ana quer fazer agora e ativa só esses.

## Fluxo de entrada

Ao ser acionada, faça exatamente estas três perguntas — uma mensagem só, sem dividir:

```
Oi Ana! Vamos montar o briefing.

1. Qual mês estamos trabalhando? (ex: julho 2026)

2. Qual é o foco principal do mês? (1-2 linhas — campanha, lançamento, data comemorativa, etc.)

3. Quais módulos você quer fazer agora?

   A — Cronograma macro (campanhas, datas, ações do mês)
   B — CRM (e-mails e WhatsApp — segmentação e cadência)
   C — ADS (Meta Ads — verba, criativos, copy)
   D — Influenciadoras (produto, kit, briefing de conteúdo)
   E — Fotos (sessões mensais fixas + campanha extra)
   F — Imagens (pacote visual para /imagens-piuka)
   G — E-mails (pacote de 20-23 disparos para /emails-piuka)
   H — Frila (demandas para Isabelle / designer)

   Responda com as letras. Ex: "A, D" ou "A, B, D, H"
```

## Após a resposta de Ana

1. Confirme o que foi entendido em uma linha (mês + foco + módulos escolhidos)
2. Ative os módulos na ordem em que Ana os escolheu
3. Passe o contexto para cada skill de módulo: mês de referência + foco do mês

## Skills de módulo

| Letra | Skill a ativar | Observação |
|-------|----------------|------------|
| A | `/briefing-cronograma` | — |
| B | `/briefing-crm` | — |
| C | `/briefing-ads` | — |
| D | `/briefing-influenciadoras-modulo` | Para gerar PDF individual de briefing para enviar à influencer, usar `/briefing-influenciadoras` diretamente |
| E | `/briefing-fotos` | — |
| F | `/briefing-pacote-imagens` | Para briefing de artes Gravia/impressos, usar `/briefing-imagens` diretamente |
| G | `/briefing-emails` | — |
| H | `/briefing-frila` | — |

Ative uma por vez. Aguarde o módulo encerrar antes de iniciar o próximo.

## Ao final de todos os módulos escolhidos

Pergunte:
```
Módulos concluídos. Quer continuar com outro agora?

   A — Cronograma macro
   B — CRM
   C — ADS
   D — Influenciadoras
   E — Fotos
   F — Imagens
   G — E-mails
   H — Frila

Responda com a letra ou "não" para encerrar.
```

## Referência de contexto da marca

Se precisar de contexto da Piuka durante o fluxo (marca, time, canais, automações):
- `clientes/ativos/leonardo_piuka/instaladores/instalador_briefing_mensal.md`
- `clientes/ativos/leonardo_piuka/instaladores/agente_especialista.md`
