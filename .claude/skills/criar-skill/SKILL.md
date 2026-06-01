---
name: criar-skill
description: Cria uma nova skill para Claude Code interativamente. Use quando o usuário quiser criar skill, comando personalizado, extensão do Claude, automatizar procedimento recorrente ou transformar instruções repetidas em skill.
when_to_use: Ative quando o usuário disser "criar skill", "nova skill", "quero uma skill", "transformar em skill", "criar comando /", "novo skill", "adicionar skill".
argument-hint: [nome-da-skill]
disable-model-invocation: false
allowed-tools: Write Bash Read
---

# Criar Nova Skill

Você é um especialista em criar skills para Claude Code. Seu objetivo é guiar o usuário e gerar uma skill completa e funcional.

## Processo

### 1. Coletar informações

Faça as perguntas abaixo de forma conversacional (não todas de uma vez — adapte ao que o usuário já informou via `$ARGUMENTS`).

**Perguntas essenciais:**
- **Nome:** Como a skill deve se chamar? (ex: `deploy`, `resumir-pr`, `criar-card`) — use kebab-case
- **Propósito:** O que a skill faz em uma frase?
- **Gatilho:** O usuário invoca com `/nome` ou Claude aciona automaticamente?
- **Instruções:** Quais passos Claude deve seguir quando a skill rodar?

**Perguntas opcionais (faça se relevante):**
- Precisa de argumentos? (ex: `/fix-issue 123`)
- Deve rodar em subagente isolado (context: fork)?
- Precisa de ferramentas específicas sem aprovação? (allowed-tools)
- Há arquivos de suporte? (templates, exemplos, scripts)

### 2. Decidir o escopo

Pergunte onde salvar:

| Opção | Caminho | Quando usar |
|---|---|---|
| **Projeto** (padrão) | `.claude/skills/<nome>/SKILL.md` | Só neste projeto |
| **Pessoal** | `~/.claude/skills/<nome>/SKILL.md` | Todos os projetos |

### 3. Gerar a skill

Com as informações coletadas, gere o `SKILL.md` seguindo este template:

```yaml
---
name: <nome-da-skill>
description: <o que faz e quando usar — seja específico, coloque caso principal primeiro>
when_to_use: <frases que o usuário diria para acionar — opcional>
argument-hint: <dica de argumento — ex: [número-issue]>  # só se tiver argumentos
disable-model-invocation: <true se ação com efeitos colaterais, false se conhecimento/tarefa comum>
allowed-tools: <ferramentas liberadas — ex: Bash(git *) Read Write>  # só se necessário
context: fork  # só se deve rodar em subagente isolado
---

# <Título da Skill>

<Instruções claras e diretas para Claude seguir quando a skill rodar.>
```

### 4. Criar os arquivos

Use a ferramenta Write para criar:
1. O diretório e `SKILL.md`
2. Arquivos de suporte se necessário (templates, exemplos)

### 5. Confirmar e testar

Após criar, informe:
- Caminho onde foi salva
- Como invocar: `/nome-da-skill` ou quando Claude aciona automaticamente
- Como passar argumentos (se aplicável)
- Sugestão de teste rápido

## Regras de qualidade

- `description` deve começar com o caso de uso principal — é o que Claude lê para decidir quando usar
- Mantenha `SKILL.md` abaixo de 500 linhas; mova conteúdo detalhado para arquivos de suporte
- Use `disable-model-invocation: true` para skills com efeitos colaterais (deploy, envio de mensagens, commits)
- Use `$ARGUMENTS` para receber parâmetros, `$0`/`$1` para acessar individualmente
- Use `` !`comando` `` para injetar contexto dinâmico (ex: `` !`git diff HEAD` ``)
- Prefira instruções concisas — cada linha é custo de token toda vez que a skill roda

## Exemplo de skill bem feita

```yaml
---
name: revisar-pr
description: Revisa um pull request buscando bugs, problemas de segurança e melhorias. Use quando o usuário pedir revisão de PR, code review ou quiser checar mudanças antes de merge.
argument-hint: [número-pr]
disable-model-invocation: false
allowed-tools: Bash(gh *)
---

## Diff do PR
!`gh pr diff $ARGUMENTS`

## Instruções
Revise o diff acima e liste:
1. Bugs ou erros de lógica
2. Problemas de segurança
3. Melhorias de performance
4. Sugestões de clareza

Seja direto e específico, cite número de linha quando relevante.
```

---

Se o usuário já informou o nome via `$ARGUMENTS`, comece perguntando o propósito diretamente. Caso contrário, comece perguntando o nome.

$ARGUMENTS
