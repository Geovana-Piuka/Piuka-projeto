---
name: briefing-crm
description: >
  Módulo CRM do briefing modular Piuka. Define segmentação da base, cadência de disparos de e-mail e WhatsApp para campanhas novas do mês. Ativado pelo /briefing-piuka ou diretamente.
trigger: >
  Acione quando Ana quiser estruturar o CRM e a cadência de disparos do mês da Piuka.
---

# Briefing CRM — Piuka

## Fluxo

1. Receba do portão (ou pergunte se acionado diretamente):
   - Mês de referência
   - Foco/objetivo do mês

2. Leia o contexto completo do módulo:
   `clientes/ativos/leonardo_piuka/briefings/crm/contexto.md`

3. Conduza a extração conforme as perguntas do contexto (bloco por bloco).

4. Entregue o output no formato definido no contexto.

5. Ao finalizar, pergunte:
   ```
   Briefing de CRM pronto. Quer continuar com outro módulo agora?
   ```