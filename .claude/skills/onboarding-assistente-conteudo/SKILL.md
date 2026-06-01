---
name: onboarding-assistente-conteudo
description: >
  Formulário de onboarding para criar o assistente de conteúdo de um novo cliente — coleta perfil, voz, moat, canais, referências e gera instalador_linkedin.md e instalador_visual.md prontos.
  Use esta skill sempre que o usuário mencionar "onboarding de conteúdo", "criar assistente de conteúdo", "montar o assistente do cliente", "formulário de onboarding de criador", "configurar assistente de posts", "novo cliente de conteúdo", "onboarding do [nome do cliente]".
  Ao final gera os dois instaladores prontos para salvar na pasta do cliente.
---

# Onboarding — Assistente de Conteúdo

## O que esta skill faz

Conduz o onboarding completo de um novo criador de conteúdo em **9 blocos de perguntas** e gera dois instaladores ao final:

1. `instalador_linkedin.md` — tudo que o assistente precisa saber para escrever posts no LinkedIn
2. `instalador_visual.md` — tudo que o assistente precisa saber para gerar JSON de carrosséis, thumbnails e posts

O formulário completo está salvo em:
```
/home/cristian/Área de trabalho/Styem para o claude/clientes/instaladores/formulario_onboarding_assistente.md
```

---

## Como executar

### Passo 1 — Ler o formulário

Leia o arquivo completo antes de começar:

```
/home/cristian/Área de trabalho/Styem para o claude/clientes/instaladores/formulario_onboarding_assistente.md
```

### Passo 2 — Iniciar o onboarding

Apresente ao usuário:

> "Vou conduzir o onboarding completo para criar o assistente de conteúdo do seu cliente. São 9 blocos de perguntas — faço um de cada vez. Ao final gero os dois instaladores prontos. Pode começar?"

Aguarde confirmação e siga o formulário bloco a bloco.

**Regras:**
- Nunca pule blocos
- Se a resposta for vaga, peça exemplo concreto
- Ao final de cada bloco, resuma o que entendeu e confirme antes de avançar
- Se o usuário já forneceu informações antes da skill, aproveite — não repita o que já sabe

### Passo 3 — Gerar os instaladores

Após coletar os 9 blocos, gere os dois documentos usando o template do formulário:

- Use APENAS as respostas do usuário como fonte
- Onde houver lacuna, marque `[A CONFIRMAR]`
- Preencha todos os campos, inclusive os JSONs de template

### Passo 4 — Salvar

Pergunte o nome do cliente e salve em:

```
/home/cristian/Área de trabalho/Styem para o claude/clientes/[nome_slug]/instaladores/instalador_linkedin.md
/home/cristian/Área de trabalho/Styem para o claude/clientes/[nome_slug]/instaladores/instalador_visual.md
```

Se o cliente usa Instagram, TikTok ou YouTube, pergunte se quer gerar também os instaladores específicos desses canais.

### Passo 5 — Oferecer skill de produção

Ao final pergunte:
> "Quer que eu crie também a skill de produção semanal para o [Nome]? Ela vai usar esses instaladores para gerar os posts toda semana."

---

## Referências de qualidade

Antes de gerar os instaladores, leia um instalador existente como referência de estrutura:

- LinkedIn: `/home/cristian/Área de trabalho/Styem para o claude/clientes/instaladores/instalador_linkedin.md`
- Visual: `/home/cristian/Área de trabalho/Styem para o claude/clientes/instaladores/instalador_visual.md`
- Instagram: `/home/cristian/Área de trabalho/Styem para o claude/clientes/fernando_maeda/instaladores/instalador_instagram.md`
- TikTok: `/home/cristian/Área de trabalho/Styem para o claude/clientes/tiago/instaladores/instalador_tiktok.md`
