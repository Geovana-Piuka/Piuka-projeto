# Treino — imagens-piuka-banners

## Passo 0 — Verificar imagens de referência na pasta da skill

Antes de qualquer pergunta, use Glob para listar arquivos de imagem em:
`.claude/skills/imagens-piuka-banners/imagens-banner/`

**Se encontrar arquivos (excluindo LEIAME.md):**
- Mostre a lista: "Encontrei X imagens de referência: [nomes dos arquivos]"
- Pergunte: "Vou usar essas imagens como referência. Confirma, ou prefere enviar outras fotos no chat?"
- Se confirmado: use os caminhos completos como `imagem_ref_1`, `imagem_ref_2`, etc. no JSON
- Se o usuário enviar fotos no chat: priorizar as fotos do chat sobre as da pasta

**Se pasta vazia ou só LEIAME.md:**
- Prosseguir normalmente — perguntar sobre imagens dentro do fluxo padrão da skill

---

## Exemplos aprovados

### Banner 1 — "Semijoias que transformam o look"
- **Layout:** Triptych (3 fotos verticais lado a lado, separadas por linhas douradas finas)
- **Composição:** Modelo usando semijoias (colar, anel, brinco dourado) em fundo bege estúdio
- **Fundo:** Bege neutro `#F4F2F0`
- **Copy:** *"Semijoias que transformam o look"* — fonte italic serif elegante, cor branca, posicionada no centro-baixo sobre a foto central
- **CTA:** "CONFIRA" — botão outline branco, sem preenchimento
- **Sem barra de benefícios**

### Banner 2 — "Toda Coleção De Letra Inicial — 15% OFF"
- **Layout:** Texto central com produtos nas laterais (coluna de texto no meio, produtos à esquerda e direita)
- **Composição:** Flatlay de colares de letra dourada nas laterais, emoldurados com borda dourada fina
- **Fundo:** Branco `#FFFFFF`
- **Copy:** Subtítulo "Toda Coleção De Letra Inicial" (Montserrat regular) + headline "15%OFF" (serif grande dourada) + texto de validade pequeno
- **CTA:** "COMPRAR AGORA" — botão outline dourado
- **Barra inferior:** Frete Grátis | Cashback | Parcelamento | Cupom 10%OFF (`#F4F2F0`, ~60px)

### Banner 3 — "Compre e Ganhe — Especial Dia das Mães"
- **Layout:** Texto à esquerda (~55% largura) + produto flatlay à direita (~45%)
- **Composição:** Brincos em cartela branca com logo PIUKA sobre tecido rosé
- **Fundo:** Rosa pastel `#FADADD`
- **Copy:** Tagline script *"Especial dia das mães"* + headline bold "COMPRE E GANHE" rosa `#E91E63` + corpo explicativo
- **CTA:** "COMPRE AGORA" — botão outline rosa
- **Barra inferior:** Frete Grátis | Cashback | Parcelamento | Cupom 10%OFF

### Banner 4 — "Lançamento Coleção Mães — Ariane Canovas"
- **Layout:** Split editorial (2 fotos lado a lado, texto sobreposto no centro-direito)
- **Composição:** Ariane Canovas com filha em ambiente clean branco/bege
- **Fundo:** Creme/bege estúdio `#F9F4EF`
- **Copy:** "LANÇAMENTO" (Montserrat pequeno) + *"Coleção Mães"* (serif cursiva grande) + "Por Ariane Canovas" (Glacial Indifference)
- **CTA:** "VER COLEÇÃO COMPLETA" — botão pill arredondado, rosa claro com texto escuro
- **Sem barra de benefícios**

### Banner 5 — "Coleção Religiosos"
- **Layout:** Triptych (2 fotos de modelo + 1 flatlay central)
- **Composição:** Colares religiosos dourados; texto sobreposto no centro-baixo
- **Fundo:** Bege neutro `#F4F2F0`
- **Copy:** "COLEÇÃO RELIGIOSOS" (headline bold branca grande) + "proteção, significado e propósito." (Glacial Indifference, branco)
- **CTA:** "CONHECER COLEÇÃO" — botão outline dourado pequeno
- **Sem barra de benefícios**

---

## O que funciona bem

- **Triptych (3 fotos):** funciona muito bem para coleções — divide o banner em 3 colunas visuais iguais com texto no centro-baixo sobreposto
- **Texto à esquerda + produto à direita:** layout clássico para campanhas promocionais com produto flatlay
- **Split editorial 50/50:** ideal para lançamentos com modelo/celebridade
- **Botão CTA outline** (sem preenchimento sólido): padrão visual da marca — muito mais frequente que botão sólido
- **Bordas douradas finas** ao redor das fotos de produto: elemento de sofisticação recorrente
- **Barra inferior de benefícios** (~60px, fundo `#F4F2F0`): aparece em banners promocionais/sale
- **Tagline em fonte script/cursiva italic** acima do headline principal: funciona bem para campanhas sazonais
- **Texto sobreposto à foto** com cor branca ou escura dependendo do fundo da imagem

---

## Regra crítica — prompt Freepik sempre gera imagem com textos

O `prompt_freepik_gerado` deve **sempre** instruir o Freepik a renderizar os textos diretamente na imagem gerada — headline, subtítulo e botão CTA incluídos. Nunca gerar apenas a foto para montar em editor externo.

**Estrutura obrigatória do prompt Freepik:**
1. Descrever a composição visual (modelo, produto, fundo)
2. Descrever a zona de texto (posição, fundo limpo)
3. Listar todos os elementos de texto com conteúdo, tamanho aproximado e cor: headline, subtítulo, botão CTA
4. Especificar que o texto deve aparecer nítido e legível na imagem final

**Exemplo de trecho correto:**
```
TEXT ELEMENTS on the left side, left-aligned: (1) very large bold display text '15% OFF' approximately 140px, dark charcoal #111111; (2) below it 'Site Todo' approximately 100px, hot pink #E91E63; (3) smaller text 'use o cupom PIUKA15' approximately 28px, dark gray #333333; (4) filled rounded button 'Aproveitar Agora', white text on hot pink #E91E63 background. All text must appear crisp, legible and fully visible in the final image.
```

---

## O que evitar

- Botão CTA com fundo sólido rosa — o padrão Piuka é **outline**, não preenchido
- Texto muito pequeno em banners 1920px — headline mínimo 80px, subtítulos mínimo 28px
- Fundo colorido saturado — a marca sempre usa neutros (bege, branco, rosa pastel suave)
- Logo Piuka no banner — o header do site já exibe
- Centralizar o texto horizontalmente sem âncora clara — sempre alinhar à esquerda ou à direita de forma definida
- Misturar mais de 3 fontes
- Usar cor diferente do dourado ou rosa Piuka para CTAs

---

## Preferências de layout

### Tipo A — Triptych (Coleção/Editorial)
```
[FOTO MODELO] | [FOTO PRODUTO/CLOSE] | [FOTO MODELO]
                  HEADLINE GRANDE
                  subtítulo
                  [CTA OUTLINE]
```
- Texto no centro-baixo, sobreposto
- Divisores: linhas douradas finas entre colunas (opcional)
- Ideal para: apresentar coleção, editorial

### Tipo B — Produto Central (Sale/Promoção)
```
[PRODUTO LATERAL ESQ] | SUBTÍTULO / HEADLINE / CTA | [PRODUTO LATERAL DIR]
[==== BARRA BENEFÍCIOS: Frete Grátis | Cashback | Parcelamento | Cupom ====]
```
- Headline grande e chamativa no centro
- Fotos com borda dourada
- Ideal para: campanhas de desconto, sale

### Tipo C — Texto Esquerda + Produto Direita (Promoção Sazonal)
```
[TAGLINE SCRIPT]          |
[HEADLINE BOLD GRANDE]    |  [FOTO PRODUTO FLATLAY]
[corpo texto]             |
[CTA OUTLINE]             |
[==== BARRA BENEFÍCIOS ====]
```
- Fundo rosa pastel ou creme
- Ideal para: campanhas sazonais (Dia das Mães, Natal, etc.)

### Tipo D — Split Editorial 50/50 (Lançamento/Celebridade)
```
[FOTO MODELO ESQ] | [FOTO MODELO DIR]
                      LANÇAMENTO
                    *Headline Serif Cursiva*
                      subtítulo
                    [CTA PILL ARREDONDADO]
```
- Texto sobreposto no centro-direito
- CTA pill (border-radius alto), rosa claro
- Ideal para: lançamentos, collab com celebridade

---

## Campanhas recorrentes

| Campanha | Fundo | Paleta destaque | Layout preferido | Observações |
|---|---|---|---|---|
| Dia das Mães | Rosa pastel `#FADADD` | Rosa `#E91E63` | Tipo C ou Tipo D | Tagline script, CTA outline rosa, barra benefícios |
| Coleção Religiosos | Bege `#F4F2F0` | Dourado `#D4AF37` | Tipo A (Triptych) | Headline branca bold, subtítulo Glacial Indifference |
| Sale / Desconto | Branco `#FFFFFF` | Dourado `#D4AF37` | Tipo B (Central) | Barra benefícios obrigatória, headline % grande |
| Lançamento Coleção | Creme `#F9F4EF` | Dourado/neutro | Tipo D (Split) | Headline serif cursiva, CTA pill |
| Editorial Geral | Bege `#F4F2F0` | Branco/dourado | Tipo A (Triptych) | Foco na modelo, texto minimalista |

---

## Notas de estilo

- **CTA outline** é o padrão: `border: 1.5px solid [cor]`, `background: transparent`, `color: [cor]`
- **Barra de benefícios** usa 4 ícones fixos: Frete Grátis (a partir R$299,99) | Cashback (15% em semijoias) | Parcelamento (até 6x sem juros) | Ganhe 10% OFF (cupom PRIMEIRA10)
- **Tagline script** acima do headline: fonte cursiva ou italic, tamanho ~36–48px, cor mais suave que o headline
- **Bordas douradas nas fotos**: `border: 1.5px solid #D4AF37`, sem border-radius ou com radius mínimo
- **Texto sobre foto escura**: sempre branco `#FFFFFF`
- **Texto sobre fundo claro**: `#333333` ou `#111111`
- **Linha dourada divisória** entre colunas do triptych: `width: 1px`, `color: #D4AF37`

---

## JSONs de referência por tipo de layout

### JSON Tipo A — Triptych (ex: "Coleção Religiosos")

```json
{
  "meta": {
    "template": "piuka_banner_v1",
    "tipo": "banner_site",
    "layout": "triptych",
    "cliente": "Piuka",
    "campanha": "Coleção Religiosos",
    "data_entrega": "AAAA-MM-DD"
  },
  "canvas": {
    "width": 1920,
    "height": 560,
    "background_color": "#F4F2F0"
  },
  "tipografia": {
    "display": { "fonte": "BD Megalona DEMO Personal Use", "pesos": [400, 700] },
    "corpo": { "fonte": "Montserrat", "pesos": [400, 600, 700, 800] },
    "subtitulo": { "fonte": "Glacial Indifference", "pesos": [400, 700] }
  },
  "logo_piuka": "ausente — banners do site não levam logo",
  "copy": {
    "headline": "COLEÇÃO RELIGIOSOS",
    "subtitulo": "proteção, significado e propósito.",
    "cta": "CONHECER COLEÇÃO"
  },
  "estrutura_colunas": [
    { "coluna": 1, "tipo": "foto_modelo", "largura": "640px", "conteudo": "modelo usando colares religiosos dourados, fundo bege estúdio" },
    { "coluna": 2, "tipo": "foto_produto", "largura": "640px", "conteudo": "flatlay colares religiosos dourados sobre fundo neutro" },
    { "coluna": 3, "tipo": "foto_modelo", "largura": "640px", "conteudo": "modelo close usando colar religioso dourado" }
  ],
  "divisores": {
    "estilo": "linha_vertical",
    "cor": "#D4AF37",
    "largura": "1px"
  },
  "elementos": [
    {
      "id": "headline",
      "tipo": "texto",
      "conteudo": "COLEÇÃO RELIGIOSOS",
      "fonte": "BD Megalona DEMO Personal Use",
      "peso": 700,
      "tamanho": "96px",
      "cor": "#FFFFFF",
      "posicao": { "x": "center", "y": "380px" },
      "alinhamento": "center",
      "sombra": "0 2px 12px rgba(0,0,0,0.3)"
    },
    {
      "id": "subtitulo",
      "tipo": "texto",
      "conteudo": "proteção, significado e propósito.",
      "fonte": "Glacial Indifference",
      "peso": 400,
      "tamanho": "28px",
      "cor": "#FFFFFF",
      "posicao": { "x": "center", "y": "490px" },
      "alinhamento": "center"
    },
    {
      "id": "cta_botao",
      "tipo": "botao",
      "estilo": "outline",
      "conteudo": "CONHECER COLEÇÃO",
      "fonte": "Montserrat",
      "peso": 600,
      "tamanho": "14px",
      "cor_texto": "#FFFFFF",
      "cor_borda": "#D4AF37",
      "cor_fundo": "transparent",
      "posicao": { "x": "center", "y": "530px" },
      "padding": "10px 32px",
      "letter_spacing": "2px"
    }
  ],
  "barra_beneficios": null,
  "prompt_freepik_gerado": "Wide banner 1920x560px, triptych layout with three vertical panels divided by thin gold lines. Left panel: Brazilian woman model wearing gold religious necklaces and earrings, elegant studio background warm beige. Center panel: flatlay of gold religious pendants (saint medals, crosses, doves) on neutral cream surface. Right panel: close-up of woman wearing layered gold religious necklaces. Warm beige neutral background #F4F2F0. Soft studio lighting, elegant semijewelry e-commerce style. No logo. No text."
}
```

### JSON Tipo B — Central com Produtos Laterais (ex: "15% OFF Letra Inicial")

```json
{
  "meta": {
    "template": "piuka_banner_v1",
    "tipo": "banner_site",
    "layout": "central_com_laterais",
    "cliente": "Piuka",
    "campanha": "Sale Coleção Letra Inicial",
    "data_entrega": "AAAA-MM-DD"
  },
  "canvas": {
    "width": 1920,
    "height": 560,
    "background_color": "#FFFFFF"
  },
  "tipografia": {
    "display": { "fonte": "BD Megalona DEMO Personal Use", "pesos": [400, 700] },
    "corpo": { "fonte": "Montserrat", "pesos": [400, 600, 700, 800] },
    "subtitulo": { "fonte": "Glacial Indifference", "pesos": [400, 700] }
  },
  "logo_piuka": "ausente — banners do site não levam logo",
  "copy": {
    "tagline": "Toda Coleção De Letra Inicial",
    "headline": "15%OFF",
    "validade": "Ação válida de 06/04/2026 até 15/04/2026 ou enquanto durarem os estoques.",
    "cta": "COMPRAR AGORA"
  },
  "estrutura_colunas": [
    { "coluna": "esquerda", "tipo": "foto_produto", "largura": "560px", "borda": { "cor": "#D4AF37", "espessura": "1.5px" }, "conteudo": "flatlay colares de letra inicial dourados V, S, T com correntes e pingentes" },
    { "coluna": "centro", "tipo": "copy", "largura": "800px" },
    { "coluna": "direita", "tipo": "foto_produto", "largura": "560px", "borda": { "cor": "#D4AF37", "espessura": "1.5px" }, "conteudo": "flatlay colares de letra inicial dourados P, J, L, R estilo balloon" }
  ],
  "elementos": [
    {
      "id": "tagline",
      "tipo": "texto",
      "conteudo": "Toda Coleção De Letra Inicial",
      "fonte": "Glacial Indifference",
      "peso": 400,
      "tamanho": "32px",
      "cor": "#C49A2A",
      "posicao": { "x": "center", "y": "200px" },
      "alinhamento": "center"
    },
    {
      "id": "headline",
      "tipo": "texto",
      "conteudo": "15%OFF",
      "fonte": "BD Megalona DEMO Personal Use",
      "peso": 700,
      "tamanho": "160px",
      "cor": "#C49A2A",
      "posicao": { "x": "center", "y": "240px" },
      "alinhamento": "center"
    },
    {
      "id": "cta_botao",
      "tipo": "botao",
      "estilo": "outline",
      "conteudo": "COMPRAR AGORA",
      "fonte": "Montserrat",
      "peso": 600,
      "tamanho": "14px",
      "cor_texto": "#C49A2A",
      "cor_borda": "#C49A2A",
      "cor_fundo": "transparent",
      "posicao": { "x": "center", "y": "420px" },
      "padding": "12px 40px",
      "letter_spacing": "2px"
    },
    {
      "id": "validade",
      "tipo": "texto",
      "conteudo": "Ação válida até [data] ou enquanto durarem os estoques.",
      "fonte": "Montserrat",
      "peso": 400,
      "tamanho": "11px",
      "cor": "#999999",
      "posicao": { "x": "center", "y": "460px" },
      "alinhamento": "center"
    }
  ],
  "barra_beneficios": {
    "altura": "60px",
    "fundo": "#F4F2F0",
    "posicao_y": "500px",
    "itens": [
      { "icone": "caminhao", "titulo": "FRETE GRÁTIS", "descricao": "em compras a partir de R$ 299,99" },
      { "icone": "cashback", "titulo": "CASHBACK", "descricao": "Ganhe 15% de volta em suas compras" },
      { "icone": "cartao", "titulo": "PARCELAMENTO", "descricao": "Em até 6x sem juros" },
      { "icone": "cupom", "titulo": "GANHE 10%OFF", "descricao": "Use o cupom: PRIMEIRA10" }
    ]
  },
  "prompt_freepik_gerado": "Wide banner 1920x500px (excluding 60px benefits bar). White background. Left side: flatlay of gold initial letter necklaces (V, S, T) with delicate chains on white surface, thin gold border frame. Right side: flatlay of gold balloon-style initial letter necklaces (P, J, L, R) on cream surface, thin gold border frame. Center: empty space for text overlay. Elegant semijewelry product photography, soft natural lighting, e-commerce style. No logo. No text."
}
```

### JSON Tipo C — Texto Esquerda + Produto Direita (ex: "Compre e Ganhe Dia das Mães")

```json
{
  "meta": {
    "template": "piuka_banner_v1",
    "tipo": "banner_site",
    "layout": "texto_esquerda_produto_direita",
    "cliente": "Piuka",
    "campanha": "Compre e Ganhe — Dia das Mães",
    "data_entrega": "AAAA-MM-DD"
  },
  "canvas": {
    "width": 1920,
    "height": 560,
    "background_color": "#FADADD"
  },
  "tipografia": {
    "display": { "fonte": "BD Megalona DEMO Personal Use", "pesos": [400, 700] },
    "corpo": { "fonte": "Montserrat", "pesos": [400, 600, 700, 800] },
    "subtitulo": { "fonte": "Glacial Indifference", "pesos": [400, 700] }
  },
  "logo_piuka": "ausente — banners do site não levam logo",
  "copy": {
    "tagline": "Especial dia das mães",
    "headline": "COMPRE E GANHE",
    "corpo": "Em compras a partir de R$ 399,99 ganhe um Kit de Brincos June.\nDireto no carrinho de compras",
    "validade": "Ação válida de 15.04.2026 até 08.05.2026 | Ou enquanto durarem os estoques | 1 Brinde por CPF",
    "cta": "COMPRE AGORA"
  },
  "estrutura": {
    "area_texto": { "largura": "960px", "posicao": "esquerda", "padding_left": "120px" },
    "area_produto": { "largura": "960px", "posicao": "direita", "conteudo": "brincos em cartela branca com logo PIUKA sobre tecido rosé suave" }
  },
  "elementos": [
    {
      "id": "tagline",
      "tipo": "texto",
      "conteudo": "Especial dia das mães",
      "fonte": "Glacial Indifference",
      "peso": 400,
      "tamanho": "36px",
      "cor": "#E91E63",
      "estilo": "italic",
      "posicao": { "x": "120px", "y": "180px" },
      "alinhamento": "left"
    },
    {
      "id": "headline",
      "tipo": "texto",
      "conteudo": "COMPRE E GANHE",
      "fonte": "BD Megalona DEMO Personal Use",
      "peso": 700,
      "tamanho": "120px",
      "cor": "#E91E63",
      "posicao": { "x": "120px", "y": "220px" },
      "alinhamento": "left"
    },
    {
      "id": "corpo",
      "tipo": "texto",
      "conteudo": "Em compras a partir de R$ 399,99 ganhe um Kit de Brincos June.\nDireto no carrinho de compras",
      "fonte": "Montserrat",
      "peso": 400,
      "tamanho": "20px",
      "cor": "#333333",
      "posicao": { "x": "120px", "y": "360px" },
      "alinhamento": "left",
      "line_height": "1.6"
    },
    {
      "id": "cta_botao",
      "tipo": "botao",
      "estilo": "outline",
      "conteudo": "COMPRE AGORA",
      "fonte": "Montserrat",
      "peso": 600,
      "tamanho": "14px",
      "cor_texto": "#E91E63",
      "cor_borda": "#E91E63",
      "cor_fundo": "transparent",
      "posicao": { "x": "120px", "y": "430px" },
      "padding": "12px 40px",
      "letter_spacing": "2px"
    },
    {
      "id": "validade",
      "tipo": "texto",
      "conteudo": "Ação válida até [data] | Ou enquanto durarem os estoques | 1 Brinde por CPF",
      "fonte": "Montserrat",
      "peso": 400,
      "tamanho": "10px",
      "cor": "#999999",
      "posicao": { "x": "120px", "y": "480px" },
      "alinhamento": "left"
    }
  ],
  "barra_beneficios": {
    "altura": "60px",
    "fundo": "#F4F2F0",
    "posicao_y": "500px",
    "itens": [
      { "icone": "caminhao", "titulo": "FRETE GRÁTIS", "descricao": "em compras a partir de R$ 299,99" },
      { "icone": "cashback", "titulo": "CASHBACK", "descricao": "Ganhe 15% de volta em suas compras" },
      { "icone": "cartao", "titulo": "PARCELAMENTO", "descricao": "Em até 6x sem juros" },
      { "icone": "cupom", "titulo": "GANHE 10%OFF", "descricao": "Use o cupom: PRIMEIRA10" }
    ]
  },
  "prompt_freepik_gerado": "Wide banner 1920x500px (excluding 60px benefits bar at bottom). Soft pink pastel background #FADADD. Right half of image: two white jewelry cards (cartela) with gold and pearl stud earrings sets, the cards have printed 'PIUKA' logo, placed on soft rosé fabric with gentle shadows. Left half: completely empty for text overlay. Elegant, feminine, Mother's Day campaign style. Soft diffuse lighting, high-end e-commerce product photography. No models. No text (except PIUKA on the cards)."
}
```

### JSON Tipo D — Split Editorial 50/50 (ex: "Lançamento Coleção Mães")

```json
{
  "meta": {
    "template": "piuka_banner_v1",
    "tipo": "banner_site",
    "layout": "split_editorial",
    "cliente": "Piuka",
    "campanha": "Lançamento Coleção Mães — Ariane Canovas",
    "data_entrega": "AAAA-MM-DD"
  },
  "canvas": {
    "width": 1920,
    "height": 560,
    "background_color": "#F9F4EF"
  },
  "tipografia": {
    "display": { "fonte": "BD Megalona DEMO Personal Use", "pesos": [400, 700] },
    "corpo": { "fonte": "Montserrat", "pesos": [400, 600, 700, 800] },
    "subtitulo": { "fonte": "Glacial Indifference", "pesos": [400, 700] }
  },
  "logo_piuka": "ausente — banners do site não levam logo",
  "copy": {
    "label": "LANÇAMENTO",
    "headline": "Coleção Mães",
    "credito": "Por Ariane Canovas",
    "cta": "VER COLEÇÃO COMPLETA"
  },
  "estrutura": {
    "painel_esquerdo": { "largura": "960px", "tipo": "foto_modelo", "conteudo": "mãe e filha com testa encostadas, sorrindo, usando semijoias douradas, ambiente clean branco" },
    "painel_direito": { "largura": "960px", "tipo": "foto_modelo_com_texto", "conteudo": "mãe abraçando filha sorrindo, roupas brancas, semijoias delicadas, ambiente sala bege claro" }
  },
  "elementos": [
    {
      "id": "label",
      "tipo": "texto",
      "conteudo": "LANÇAMENTO",
      "fonte": "Montserrat",
      "peso": 600,
      "tamanho": "14px",
      "cor": "#333333",
      "posicao": { "x": "1050px", "y": "180px" },
      "alinhamento": "center",
      "letter_spacing": "4px"
    },
    {
      "id": "headline",
      "tipo": "texto",
      "conteudo": "Coleção Mães",
      "fonte": "BD Megalona DEMO Personal Use",
      "peso": 400,
      "tamanho": "80px",
      "cor": "#333333",
      "estilo": "italic",
      "posicao": { "x": "1050px", "y": "210px" },
      "alinhamento": "center"
    },
    {
      "id": "credito",
      "tipo": "texto",
      "conteudo": "Por Ariane Canovas",
      "fonte": "Glacial Indifference",
      "peso": 400,
      "tamanho": "24px",
      "cor": "#555555",
      "posicao": { "x": "1050px", "y": "310px" },
      "alinhamento": "center"
    },
    {
      "id": "cta_botao",
      "tipo": "botao",
      "estilo": "pill",
      "conteudo": "VER COLEÇÃO COMPLETA",
      "fonte": "Montserrat",
      "peso": 600,
      "tamanho": "13px",
      "cor_texto": "#333333",
      "cor_fundo": "#F5C6CB",
      "border_radius": "50px",
      "posicao": { "x": "1050px", "y": "370px" },
      "padding": "12px 36px",
      "letter_spacing": "1px"
    }
  ],
  "barra_beneficios": null,
  "prompt_freepik_gerado": "Wide banner 1920x560px, split editorial layout. Left half: Brazilian woman and little girl touching foreheads lovingly, smiling, wearing white clothes and delicate gold jewelry (necklace, earrings, bracelet), clean white studio background. Right half: same woman and girl hugging and smiling broadly, beige/cream living room background with soft sofa. Both photos: warm natural lighting, editorial Mother's Day campaign, elegant and emotional atmosphere. No logo. No text."
}
```

### JSON Tipo E — Produto + Texto Esquerda / Dupla de Modelos Direita (ex: "Coleção Glam")

```json
{
  "meta": {
    "template": "piuka_banner_v1",
    "tipo": "banner_site",
    "layout": "produto_texto_esquerda_modelos_direita",
    "cliente": "Piuka",
    "campanha": "Coleção Glam — 10% OFF",
    "data_entrega": "AAAA-MM-DD"
  },
  "canvas": {
    "width": 1920,
    "height": 560,
    "background_color": "#FFFFFF"
  },
  "tipografia": {
    "display": { "fonte": "BD Megalona DEMO Personal Use", "pesos": [400, 700] },
    "corpo": { "fonte": "Montserrat", "pesos": [400, 600, 700, 800] },
    "subtitulo": { "fonte": "Glacial Indifference", "pesos": [400, 700] }
  },
  "logo_piuka": "ausente — banners do site não levam logo",
  "copy": {
    "label_colecao": "COLEÇÃO",
    "nome_colecao_script": "Glam",
    "headline_desconto": "10% OFF",
    "cta": "VER COLEÇÃO COMPLETA",
    "validade": "Ação válida de 25/04 até 31/05 ou enquanto durarem os estoques."
  },
  "estrutura": {
    "area_esquerda": {
      "largura": "760px",
      "tipo": "produto_com_copy",
      "fundo": "#FFFFFF",
      "produto": "2 brincos em flatlay sobre tecido branco: 1 brinco de pérola com flores de zircônia prata e 1 brinco de asa dourada com zircônias",
      "copy_sobreposto": true
    },
    "area_direita": {
      "largura": "1160px",
      "tipo": "dupla_modelos",
      "painel_esq": "modelo noiva meia figura com véu e buquê de flores brancas, luz solar quente, outdoor",
      "painel_dir": "close-up modelo noiva sorrindo com véu branco, usando brincos dourados, fundo suave"
    }
  },
  "paleta_especifica": {
    "label_colecao": "#5C3D1E",
    "nome_colecao_script": "#C8A45A",
    "headline_desconto": "#3D2B0F",
    "obs": "Paleta bronze/marrom — usada em coleções sofisticadas/noivas/glam"
  },
  "elementos": [
    {
      "id": "label_colecao",
      "tipo": "texto",
      "conteudo": "COLEÇÃO",
      "fonte": "Montserrat",
      "peso": 700,
      "tamanho": "28px",
      "cor": "#5C3D1E",
      "posicao": { "x": "60px", "y": "130px" },
      "alinhamento": "left",
      "letter_spacing": "4px"
    },
    {
      "id": "nome_colecao",
      "tipo": "texto",
      "conteudo": "Glam",
      "fonte": "BD Megalona DEMO Personal Use",
      "peso": 400,
      "tamanho": "72px",
      "cor": "#C8A45A",
      "estilo": "italic",
      "posicao": { "x": "60px", "y": "160px" },
      "alinhamento": "left"
    },
    {
      "id": "headline_desconto",
      "tipo": "texto",
      "conteudo": "10% OFF",
      "fonte": "BD Megalona DEMO Personal Use",
      "peso": 700,
      "tamanho": "110px",
      "cor": "#3D2B0F",
      "posicao": { "x": "60px", "y": "240px" },
      "alinhamento": "left"
    },
    {
      "id": "cta_botao",
      "tipo": "botao",
      "estilo": "outline",
      "conteudo": "VER COLEÇÃO COMPLETA",
      "fonte": "Montserrat",
      "peso": 600,
      "tamanho": "12px",
      "cor_texto": "#5C3D1E",
      "cor_borda": "#C8A45A",
      "cor_fundo": "transparent",
      "posicao": { "x": "60px", "y": "390px" },
      "padding": "10px 28px",
      "letter_spacing": "1.5px"
    },
    {
      "id": "validade",
      "tipo": "texto",
      "conteudo": "Ação válida de [data_inicio] até [data_fim] ou enquanto durarem os estoques.",
      "fonte": "Montserrat",
      "peso": 400,
      "tamanho": "10px",
      "cor": "#999999",
      "posicao": { "x": "60px", "y": "430px" },
      "alinhamento": "left"
    }
  ],
  "barra_beneficios": {
    "altura": "60px",
    "fundo": "#F4F2F0",
    "posicao_y": "500px",
    "itens": [
      { "icone": "caminhao", "titulo": "FRETE GRÁTIS", "descricao": "em compras a partir de R$ 299,99" },
      { "icone": "cashback", "titulo": "CASHBACK", "descricao": "Ganhe 15% de volta em suas compras" },
      { "icone": "cartao", "titulo": "PARCELAMENTO", "descricao": "Em até 6x sem juros" },
      { "icone": "cupom", "titulo": "GANHE 10%OFF", "descricao": "Use o cupom: PRIMEIRA10" }
    ]
  },
  "prompt_freepik_gerado": "Wide banner 1920x500px (excluding 60px benefits bar). Left 40%: white fabric texture background with two elegant earrings displayed as flatlay — one silver flower-shaped earring with pearl drop and zirconia, one gold wing-shaped earring with zirconia stones. Space for text overlay on upper-left. Right 60%: two panels of Brazilian woman bride — left panel: mid-body shot bride wearing white dress and veil holding white flower bouquet, warm outdoor golden sunlight; right panel: close-up smiling bride with white veil wearing gold drop earrings, soft background. Elegant, luxurious, wedding and glamour semijewelry campaign. Soft and warm lighting throughout. No logo. No text."
}
```