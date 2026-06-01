# Agent Instructions — Carrossel IA · Piuka Semijoias

Este repositório empacota um sistema de produção de carrosséis e imagens com IA para a marca Piuka Semijoias.

## Princípios

- Sempre ler `config/marca.md` antes de criar qualquer peça.
- Sempre olhar as referências disponíveis em `referencias/`.
- Tratar referências como estrutura, estética, tom ou performance. Não copiar conteúdo literal salvo quando o usuário pedir explicitamente.
- Gerar a saída em `.md`, com Briefing + JSONs de imagens.
- Cada imagem deve ter um JSON separado. Não usar um array único para agrupar todas as imagens.
- JSON técnico é instrução de renderização. Metadados, hex codes, fonte, coordenadas e tamanhos nunca devem aparecer como texto visível na imagem.
- Manter sempre o tom da marca: quente, empoderador, feminino, acessível — nunca frio ou corporativo.

## Contexto da marca

- **Marca:** Piuka Semijoias
- **Público:** Mulheres brasileiras que usam acessórios como expressão de identidade
- **Estética:** Elegante e acessível, paleta dourada/off-white, limpa e editorial
- **Conteúdos frequentes:** styling tips, lançamentos, collabs com influenciadoras, datas comemorativas

## Estrutura obrigatória da saída

1. Título do documento.
2. Briefing.
3. Seção `## JSONs`.
4. Uma seção por imagem:
   - `### IMAGEM 01 — [Nome]`
   - bloco JSON completo.
5. `## Sumario de Referencias Por Slide`.
6. `## Sumario de Estruturas Visuais`.

## Caminhos

- Configuração da marca: `config/marca.md`
- Referências visuais: `estilos/Editorial/` e `estilos/produtos/`
- Saídas `.md`: `outputs/estilos/`
- Skill: `skills/carrossel-ia/SKILL.md`
