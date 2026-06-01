---
name: evoluir-skills
description: >
  Skill de auto-melhoria contínua das skills do projeto. Ao ativar, pergunta quais skills precisam ser melhoradas, analisa todas ou as citadas, apresenta o que cada uma faz e suas especificações, coleta as melhorias do usuário e aplica as atualizações em massa. Use quando quiser melhorar, revisar, ou atualizar skills existentes do projeto Piuka.
trigger: >
  Acione esta skill quando o usuário mencionar "evoluir skills", "melhorar skills", "atualizar skills", "revisar skills", "o que cada skill faz", "melhorar todas as skills", "evolução das skills", "atualizar em massa".
---

# Skill: Evolução Contínua das Skills

## O que esta skill faz

Conduz uma sessão estruturada de revisão e melhoria das skills do projeto. Opera em 3 fases:

1. **Diagnóstico** — identifica quais skills serão revisadas
2. **Análise** — lê cada skill e apresenta um resumo do que faz e suas especificações
3. **Atualização em massa** — coleta as melhorias do usuário e aplica em todas as skills citadas

---

## Fase 1 — Diagnóstico

Ao iniciar, perguntar:

> "Quais skills você quer revisar ou melhorar? Pode me dizer os nomes ou digitar **todas** para eu analisar tudo que está no projeto."

Se o usuário disser **"todas"** ou equivalente: listar e analisar todas as skills encontradas em `.claude/skills/`.

Se o usuário citar nomes específicos: analisar apenas as citadas.

---

## Fase 2 — Análise das skills

Para cada skill a revisar:

1. Ler o arquivo `SKILL.md` correspondente em `.claude/skills/[nome]/SKILL.md`
2. Extrair e apresentar em formato de card:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SKILL: [nome]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
O que faz: [resumo em 1-2 linhas]
Gatilho: [quando é acionada]
Outputs gerados: [lista do que produz]
Dados fixos embutidos: [sim/não — o quê]
Integrações: [Trello, Freepik, etc. se houver]
Pontos de atenção: [campos incompletos, regras ambíguas, etc.]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Apresentar todos os cards de uma vez e perguntar:

> "Aqui está o resumo de cada skill. Quais você quer melhorar e o que deve mudar em cada uma?"

---

## Fase 3 — Coleta de melhorias

O usuário pode responder de forma livre. Exemplos válidos:
- "Na skill X adiciona o campo Y"
- "Na skill de briefing-imagens atualiza a tabela de lojas"
- "Em todas adiciona uma seção de exemplos de uso"
- "Na carrossel e na banners muda o tom das instruções"

Para cada melhoria citada, confirmar o entendimento antes de aplicar:

> "Vou aplicar as seguintes mudanças:
> - [skill] → [o que muda]
> - [skill] → [o que muda]
> Confirma?"

---

## Fase 4 — Atualização em massa

Após confirmação do usuário:

1. Editar cada `SKILL.md` com as melhorias correspondentes
2. Preservar a estrutura, frontmatter e dados existentes — apenas incorporar as mudanças
3. Ao finalizar cada arquivo, confirmar: "✅ [nome da skill] atualizada"
4. Ao concluir todas, apresentar resumo:

```
ATUALIZAÇÃO CONCLUÍDA
─────────────────────
✅ [skill 1] — [o que mudou]
✅ [skill 2] — [o que mudou]
⚠️ [skill 3] — [se houver campo que ficou pendente, sinalizar]
```

---

## Regras

- Nunca apagar conteúdo existente sem confirmar com o usuário
- Se a melhoria solicitada for ambígua, perguntar antes de aplicar
- Campos ⚠️ (incompletos ou pendentes) são sinalizados mas não bloqueiam a execução
- O frontmatter (`name`, `description`, `trigger`) só é alterado se o usuário pedir explicitamente
- Não alterar skills fora do escopo confirmado na Fase 1