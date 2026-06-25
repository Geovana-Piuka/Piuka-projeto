---
name: briefing-cronograma
description: >
  Módulo Cronograma do briefing modular Piuka. Extrai campanha principal, campanhas secundárias, sazonais e restrições do mês. Ativado pelo /briefing-piuka ou diretamente.
trigger: >
  Acione quando Ana quiser estruturar o cronograma macro do mês da Piuka.
---

# Briefing Cronograma — Piuka

## Fluxo

1. Receba do portão (ou pergunte se acionado diretamente):
   - Mês de referência
   - Foco/objetivo do mês

2. Leia o contexto completo do módulo:
   `clientes/ativos/leonardo_piuka/briefings/cronograma/contexto.md`

3. Conduza a extração conforme as perguntas do contexto (bloco por bloco — não tudo de uma vez).

4. Entregue o output no formato definido no contexto.

5. Ao finalizar, pergunte:
   ```
   Cronograma do mês pronto. Quer continuar com outro módulo agora?
   ```