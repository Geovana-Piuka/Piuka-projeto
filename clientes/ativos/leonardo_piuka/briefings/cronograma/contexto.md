# Módulo Cronograma — Piuka

## O que cobre

Visão macro do mês: campanha principal, campanhas secundárias, datas comemorativas, sazonais e restrições. Output vai para Ana (estratégia) e Amanda (calendário editorial).

Seções de origem no instalador: Bloco 1, Bloco 2 (parcial), Bloco 5.

---

## Perguntas de extração

### Bloco 1 — Campanha principal

```
→ Qual é a campanha principal deste mês? Me dá um nome e a ideia central.
→ Qual é o motivo: data comemorativa, lançamento de coleção, liquidação, sazonalidade, collab?
→ Quais são as datas de início e encerramento?
→ Tem alguma urgência ou prazo que o time precisa saber antes de começar?
```

### Bloco 2 — Produto ou coleção

```
→ Qual produto ou coleção é o foco?
→ Qual é a promessa principal: o que a cliente vai ganhar comprando agora?
→ O que diferencia essa campanha das anteriores — por que é especial agora?
→ Algum produto que NÃO entra nessa campanha?
```

### Bloco 3 — Campanhas secundárias e sazonais

```
→ Além da campanha principal, tem campanhas menores no mês? (promoções pontuais, datas comemorativas)
→ Me lista as datas e o que vai em cada uma.
→ Quais dias do mês não têm campanha ativa?
→ Tem datas regionais que preciso considerar? (Agrishow, Rodeo Music, shows em RP, feriados locais)
→ Algum produto ou coleção que definitivamente não entra em promoção esse mês?
```

### Bloco 4 — Aprendizado do mês anterior

```
→ Tem algo do mês passado que não funcionou e que você quer evitar repetir?
→ Tem algo do mês passado que funcionou e que você quer replicar?
```

---

## Output esperado

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRONOGRAMA MACRO — [MÊS/ANO]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CAMPANHA PRINCIPAL: [nome]
PERÍODO: [data início] → [data fim]
PRODUTO/COLEÇÃO: [nome + descrição de 1 linha]
PROMESSA: [o que a cliente ganha comprando agora]
DIFERENCIAL: [por que agora]

CAMPANHAS SECUNDÁRIAS:
→ [data] | [campanha] | [produto/coleção]

RESTRIÇÕES:
→ [o que não entra em promoção]
→ [o que evitar neste mês]

DIAS SAZONAIS (sem campanha ativa):
→ [data] | [direcional — evergreen ou data menor]

APRENDIZADO DO MÊS ANTERIOR:
→ Funcionou: [o que replicar]
→ Não funcionou: [o que evitar]
```

---

## Situações comuns

**Ana responde com pouco detalhe:**
Não invente. Pergunte antes de avançar.
"Quando você fala em lançamento, tem data definida ou ainda é a definir?"

**Campo em aberto:**
Sinalizar com ⚠️ no output.
"⚠️ Data de encerramento da campanha: a definir — confirmar com Ana."

**Dias sazonais sem conteúdo:**
Nunca deixar em branco. Sugerir: "Posso sugerir evergreen para esses dias — quer?"
