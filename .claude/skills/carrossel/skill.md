---
name: carrossel
description: >
  Cria carrosséis, infográficos e JSONs de imagens para GPT Image 2 a partir de briefing,
  referências visuais, configuração da marca e feedback. Use sempre que o usuário pedir
  carrossel com IA, infográfico com IA, JSON de imagem, imagem power, GPT Image 2,
  peças visuais em lote, ou transformar conteúdo e referências em prompts/JSONs estruturados.
---

# Carrossel IA

Use esta skill para gerar arquivos `.md` com Briefing + JSONs de imagens. A saída é pensada para alimentar um renderizador visual ou um gerador de imagem como GPT Image 2.

## Antes de criar

1. Leia `config/marca.md`.
2. Identifique tema, plataforma, formato e quantidade.
3. **Leia SEMPRE a pasta `imagens/` — obrigatório em toda execução:**
   - Liste todos os arquivos com Glob em `imagens/` e subpastas.
   - Abra e visualize cada imagem encontrada com a ferramenta Read.
   - Anote o que cada foto mostra: tipo de acessório, contexto, ângulo, paleta, energia visual.
   - Essas são as fotos reais que devem ser usadas nos slides — nunca substitua por placeholders se as fotos existirem.
   - Se o usuário indicar uma subpasta específica (ex: "as fotos estão em `imagens/dia-das-maes/`"), priorize essa pasta.
4. **Leia SEMPRE a pasta de estilo correspondente — obrigatório em toda execução:**
   - Para carrosséis editoriais (tendência, moda, inspiração): leia `estilos/Editorial/` — liste os arquivos, leia o `README-estilo-editorial.md` e visualize as imagens de referência.
   - Para carrosséis de produto (lançamento, mix, flat lay): leia `estilos/produtos/` — liste os arquivos, leia o `README-estilo-produto.md` e visualize as imagens de referência.
   - Se o tipo não estiver claro, leia ambas as pastas e escolha o estilo mais adequado ao tema.
   - Essas referências ensinam como os carrosséis da Piuka são compostos — estrutura de layout, posição de texto, energia visual. Use-as para montar os JSONs com fidelidade ao estilo aprovado.
5. Defina plataforma, formato, quantidade e tema.
6. Se algum dado essencial faltar, use o padrão da marca em `config/marca.md` e marque a suposição no briefing.

## Saída obrigatória

Sempre gerar um `.md` com esta ordem:

````markdown
# JSONs de Imagens — [Título]

## Briefing

- Marca:
- Tema:
- Data de criação:
- Mês:
- Semana:
- Plataforma:
- Formato: 1080x1080px (1:1)
- Quantidade:
- Estilo:
- Referências:

## JSONs

### IMAGEM 01 — [Nome]

```json
{
  "dia-metadado": "...",
  "metadata": {},
  "referencias": {},
  "branding": {},
  "layout": {}
}
```

## Sumario de Referencias Por Slide

- Slide 1 =

## Sumario de Estruturas Visuais

- Imagem 1 =
````

## Regras críticas

- Não usar array único para várias imagens.
- Cada imagem tem seu próprio JSON.
- Manter os campos principais: `dia-metadado`, `metadata`, `referencias`, `branding`, `layout`.
- Incluir sempre `metadata.aviso_renderizacao`.
- Em `referencias`, explicar qual arquivo visual inspira a estrutura e como usar sem copiar conteúdo.
- Em `branding`, incluir paleta. **Não incluir assinatura, logo ou marca d'água — a logo Piuka NUNCA aparece em nenhum slide.**
- Em `layout`, colocar apenas instruções de composição e textos visíveis.
- Não colocar nomes de fontes, tamanhos em px, hex codes, coordenadas ou metadados técnicos como texto visível.
- **NUNCA incluir a logo da Piuka, assinatura ou qualquer marca d'água em nenhum slide ou composição. Remover qualquer campo `assinatura` ou `posicao_assinatura` dos JSONs.**
- **NUNCA usar travessões ( — ) em nenhum texto visível ou copy dos slides.**
- **NUNCA usar fundo preto para realçar ou destacar texto.**
- **NUNCA usar texto na cor amarela em nenhum slide.**
- **NUNCA repetir o nome do produto duas vezes na mesma imagem** — se o nome aparece no label, não repete no rodapé; se aparece no rodapé, não repete no label.
- **NUNCA usar frases genéricas** como "o presente que ela nunca vai esquecer", "feito para você", "a peça perfeita" ou similares. O copy deve ser específico ao produto, ao tema e ao momento da cliente.
- **NUNCA repetir a mesma frase em slides diferentes** do mesmo carrossel.
- **Formato padrão obrigatório: 1080x1080px (1:1).** Sempre usar este formato salvo pedido explícito de outro tamanho. Nunca gerar 4:5 por padrão.
- **NUNCA gerar textos grandes que dominam ou ocupam boa parte da imagem.** Copy e títulos devem ser compactos e discretos — máximo 20% da altura do frame. Comportamento de legenda, nunca de título hero gigante.
- **SEMPRE que o nome do produto aparecer como label, incluir obrigatoriamente uma linha/seta apontando para o produto na foto.** O label deve ser um pill badge (retângulo com bordas arredondadas) com linha fina diagonal saindo do badge até o produto. Sem essa linha, o label não é válido.

## Referências internas

- Estrutura JSON: `references/estrutura-json.md`
- Como ler referências: `references/workflow-referencias.md`
- Guia visual: `references/guia-visual.md`
- Template de saída: `templates/carrossel-template.md`
- Template de marca: `templates/marca-config-template.md`

## Caminhos do projeto Piuka

- Configuração da marca: `config/marca.md`
- Referências visuais editoriais: `estilos/Editorial/`
- Referências visuais de produto: `estilos/produtos/`
- Fotos de conteúdo para slides: `imagens/`
- Saídas `.md`: `outputs/estilos/`
