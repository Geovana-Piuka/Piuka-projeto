---
name: briefing-ads
description: >
  Módulo ADS do briefing modular Piuka. Define verba, objetivo, criativos e copy dos anúncios pagos (Meta Ads e Google Ads) do mês. Ativado pelo /briefing-piuka ou diretamente.
trigger: >
  Acione quando Ana quiser estruturar as campanhas pagas do mês da Piuka.
---

# Briefing ADS — Piuka

## Fluxo

1. Receba do portão (ou pergunte se acionado diretamente):
   - Mês de referência
   - Foco/objetivo do mês

2. Leia o contexto completo do módulo:
   `clientes/ativos/leonardo_piuka/briefings/ads/contexto.md`

3. Conduza a extração conforme as perguntas do contexto (bloco por bloco).

4. Entregue o output no formato definido no contexto.

5. Ao finalizar, pergunte:
   ```
   Briefing de ADS pronto. Quer continuar com outro módulo agora?
   ```