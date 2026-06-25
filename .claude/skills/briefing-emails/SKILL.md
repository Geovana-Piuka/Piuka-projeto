---
name: briefing-emails
description: >
  Módulo E-mails do briefing modular Piuka. Declara o pacote completo de 20-23 e-mails do mês para gerar via /emails-piuka: data, assunto, pré-header, objetivo, blocos e copy completa por e-mail. Ativado pelo /briefing-piuka ou diretamente.
trigger: >
  Acione quando Ana quiser estruturar o pacote de e-mails do mês da Piuka.
---

# Briefing E-mails — Piuka

## Fluxo

1. Receba do portão (ou pergunte se acionado diretamente):
   - Mês de referência
   - Foco/objetivo do mês

2. Leia o contexto completo do módulo:
   `clientes/ativos/leonardo_piuka/briefings/emails/contexto.md`

3. Conduza a extração conforme as perguntas do contexto (volume geral primeiro, depois ficha por e-mail).

4. Entregue o output no formato definido no contexto (tabela + detalhamento por e-mail).

5. Ao finalizar, pergunte:
   ```
   Pacote de e-mails estruturado. Quer continuar com outro módulo agora?
   ```