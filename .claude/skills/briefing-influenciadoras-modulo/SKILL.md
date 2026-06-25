---
name: briefing-influenciadoras-modulo
description: >
  Módulo Influenciadoras do briefing modular Piuka. Mapeia influencers e afiliadas do mês: produto, prazo de kit, briefing de conteúdo, missão mensal. Diferente de /briefing-influenciadoras (que gera PDF para enviar à influencer). Ativado pelo /briefing-piuka.
trigger: >
  Ativado internamente pelo portão /briefing-piuka quando Ana escolhe o módulo D. Para gerar o PDF de briefing individual de uma influencer, use /briefing-influenciadoras diretamente.
---

# Briefing Influenciadoras — Módulo Mensal

## Fluxo

1. Receba do portão:
   - Mês de referência
   - Foco/objetivo do mês

2. Leia o contexto completo do módulo:
   `clientes/ativos/leonardo_piuka/briefings/influenciadoras/contexto.md`

3. Conduza a extração conforme as perguntas do contexto (influencers primeiro, depois afiliadas).

4. Entregue o output no formato definido no contexto.

5. Ao finalizar, pergunte:
   ```
   Briefing de influenciadoras do mês pronto. Quer continuar com outro módulo agora?
   ```

## Nota

Para gerar o PDF de briefing individual para enviar à influencer, usar `/briefing-influenciadoras` diretamente — essa skill gera o documento em PDF com HTML estruturado.