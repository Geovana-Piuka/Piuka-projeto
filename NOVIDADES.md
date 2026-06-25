# Novidades do sistema — Piuka

---

## 22/06/2026 — Briefing modular

### O que mudou

O briefing mensal era um processo único que levava ~45 minutos porque perguntava tudo de uma vez antes de gerar qualquer coisa. A Ana precisava passar por todos os blocos (campanha, produto, tom, canais, influencers, e-mails, imagens) mesmo quando só precisava de uma parte.

Agora o sistema funciona por módulos. A Ana escolhe quais partes quer fazer hoje e o agente ativa só essas.

### Como usar

Acione `/briefing-piuka` normalmente. Em vez de já começar as perguntas, ele vai perguntar:

1. Qual mês
2. Qual o foco do mês (1-2 linhas)
3. Quais módulos quer fazer agora

```
A — Cronograma macro (campanhas, datas, ações do mês)
B — CRM (e-mails e WhatsApp — segmentação e cadência)
C — ADS (Meta Ads — verba, criativos, copy)
D — Influenciadoras (produto, kit, briefing de conteúdo)
E — Fotos (sessões mensais fixas + campanha extra)
F — Imagens (pacote visual para /imagens-piuka)
G — E-mails (pacote de 20-23 disparos para /emails-piuka)
H — Frila (demandas para Isabelle / designer)
```

Responde com as letras. Ex: `A, D` — o agente faz só cronograma e influenciadoras, em ~15 minutos.

Ao terminar cada módulo, pergunta se quer continuar com outro. Dá para fazer em sessões separadas.

### O que foi criado

**Skills novas (uma por módulo):**
- `/briefing-cronograma`
- `/briefing-crm`
- `/briefing-ads`
- `/briefing-influenciadoras-modulo`
- `/briefing-fotos`
- `/briefing-pacote-imagens`
- `/briefing-emails`
- `/briefing-frila`

**Pasta `briefings/` com um `contexto.md` por módulo:**
Cada arquivo tem as perguntas estruturadas, o formato exato do output e como lidar com situações comuns (campo pendente, Ana responde vago, prazo apertado). As pastas são separadas para que mais contexto possa ser adicionado com o tempo.

**O instalador original (`instalador_briefing_mensal.md`) não foi alterado** — continua como referência técnica completa.

### O que não mudou

- `/imagens-piuka` — funciona igual
- `/emails-piuka` — funciona igual
- `/briefing-influenciadoras` — continua gerando o PDF para enviar à influencer (não confundir com o módulo D, que é o mapeamento mensal)
- `/briefing-imagens` — continua cobrindo artes Gravia/impressos (não confundir com o módulo F, que é o pacote digital para `/imagens-piuka`)
