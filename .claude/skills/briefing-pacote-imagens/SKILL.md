---
name: briefing-pacote-imagens
description: >
  Módulo Imagens do briefing modular Piuka. Declara o pacote completo de peças visuais do mês para gerar via /imagens-piuka: família, formato, influencer, copy e referências. Diferente de /briefing-imagens (que é para Gravia/impressos). Ativado pelo /briefing-piuka ou diretamente.
trigger: >
  Acione quando Ana quiser estruturar o pacote de imagens digitais do mês para gerar via /imagens-piuka.
---

# Briefing Pacote de Imagens — Piuka

## Fluxo

1. Receba do portão (ou pergunte se acionado diretamente):
   - Mês de referência
   - Foco/objetivo do mês

2. Leia o contexto completo do módulo:
   `clientes/ativos/leonardo_piuka/briefings/imagens/contexto.md`

3. Conduza a extração conforme as perguntas do contexto (cobertura geral primeiro, depois ficha por peça).

4. Entregue o output no formato definido no contexto (tabela + detalhamento por peça).

5. Ao finalizar, pergunte:
   ```
   Pacote de imagens estruturado. Quer continuar com outro módulo agora?
   ```