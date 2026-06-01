# Treino — imagens-piuka-campanhas

## Passo 0 — Verificar imagens de referência na pasta da skill

Antes de qualquer pergunta, use Glob para listar arquivos de imagem em:
`.claude/skills/imagens-piuka-campanhas/imagens-campanha/`

**Se encontrar arquivos (excluindo LEIAME.md):**
- Mostre a lista: "Encontrei X imagens de referência: [nomes dos arquivos]"
- Pergunte: "Vou usar essas imagens como referência. Confirma, ou prefere enviar outras fotos no chat?"
- Se confirmado: use os caminhos completos como `imagem_ref_1`, `imagem_ref_2`, etc. no JSON
- Se o usuário enviar fotos no chat: priorizar as fotos do chat sobre as da pasta

**Se pasta vazia ou só LEIAME.md:**
- Prosseguir normalmente — perguntar sobre imagens dentro do fluxo padrão da skill

---

## 🚨 REGRAS ABSOLUTAS — LEIA ANTES DE QUALQUER COISA

> **SEMPRE UTILIZAR A FOTO ENVIADA PELO USUÁRIO — NUNCA GERAR UMA NOVA FOTO DA MODELO.**
> Se o usuário enviou uma foto de modelo, essa foto vai para o JSON como `"tipo": "imagem_referencia"` e o prompt Freepik instrui o Freepik a usar a imagem exata fornecida como base — sem recriar, sem substituir, sem "inspirar-se". A modelo, o enquadramento, a iluminação, o fundo: tudo preservado como na foto original.

> **NUNCA ALTERAR A APARÊNCIA DAS JOIAS ENVIADAS.**
> As joias que aparecem nas fotos enviadas devem ser descritas fielmente no prompt — forma, cor, material, tamanho relativo, detalhes (espiral, cristal, pérola, flor, etc.). O prompt Freepik nunca deve sugerir "joias similares", "joias douradas genéricas" ou qualquer variação. Descrever exatamente o que está na foto.

---

## ⚠️ ATENÇÃO — Este formato é DIFERENTE do skill-categorias

| | **imagens-piuka-campanhas** (este) | **imagens-piuka-categorias** (outro) |
|---|---|---|
| **Canvas** | 1024×1536px 
| **Uso** | WhatsApp + campanha de loja | Banners de categoria no site |
| **Tem CTA?** | ✅ Sim — botão rosa obrigatório | ❌ Não — sem botão |
| **Tem headline de oferta?** | ✅ Sim — ex: "10% OFF" | ❌ Não — só nome da categoria |
| **Overlay / texto sobre foto** | Zona de texto separada da foto | Texto discreto no canto inf. direito |
| **Estilo** | Promocional, impactante, hierarquia copy | Editorial limpo, fotográfico |

**Nunca misturar os dois formatos. São produtos completamente diferentes.**

---

## Como o agente funciona

O usuário envia:
1. **Foto(s) de referência** — produto(s) que serão destaque da campanha (pode ser flatlay, modelo, produto isolado)
2. **Oferta/campanha** — ex: "10% OFF site todo", "Dia das Mães", "Frete grátis acima de R$150"
3. **Copy opcional** — headline, subtítulo e CTA (se não enviar, o agente sugere com base no tema)
4. **Validade** (opcional) — ex: "válido até 31/05"

O agente gera **apenas o JSON completo** — sem prompt separado, sem instruções manuais. Tudo que o Freepik precisa para renderizar a peça final está dentro do `prompt_freepik_gerado`, incluindo foto, overlay, textos, fontes, cores, tamanhos e posições. O usuário não precisa fazer nenhum ajuste manual.

---

## Pergunta obrigatória — Colagem ou Imagem Única?

**Antes de gerar o JSON**, o agente SEMPRE deve perguntar:

> "Você quer gerar uma **imagem única** (1 foto principal) ou uma **colagem 2×2** (grade com 4 fotos)?"

### Se o usuário escolher Colagem 2×2:

Solicitar as **4 fotos** com orientação de qual vai em cada posição:

```
Para montar a colagem, preciso de 4 fotos. Me envie na seguinte ordem:

📸 Foto 1 — Topo esquerda
📸 Foto 2 — Topo direita
📸 Foto 3 — Baixo esquerda (aqui fica o texto principal sobreposto)
📸 Foto 4 — Baixo direita
```

### Regras da Colagem 2×2:

- Canvas: **1024×1536px** — cada quadrante fica aproximadamente **512×768px**
- As 4 fotos podem ser: mesma modelo em ângulos diferentes, modelos diferentes com mesmo produto, ou mix produto/modelo
- **Texto principal** fica em uma destas posições (perguntar ao usuário):
  - **Faixa central horizontal** entre os dois pares de fotos (fundo semitransparente escuro) — padrão aprovado
  - **Canto inferior esquerdo** sobre o quadrante baixo-esquerda
- **Estética da colagem:** Pode ser dark/moody (tons marrons, preto) ou clara (bege, branco) — definir com base nas fotos recebidas
- **Sem botão CTA obrigatório** na colagem — o texto da oferta já cumpre esse papel
- O prompt Freepik descreve os **4 quadrantes separadamente** quando as fotos precisam ser geradas; se o usuário envia as fotos reais, apenas descrever a composição no JSON

---

## Regras fixas (nunca alterar)

- Canvas: **1024×1536px** — fixo, imutável
- **NUNCA inserir logo Piuka** — absolutamente proibido em qualquer elemento, camada, overlay ou prompt. Nem logo pequena, nem marca d'água, nem texto "Piuka" como elemento de identidade visual.
- **CTA sempre presente** — botão sólido rosa (`#E91E63`), nunca outline, texto em caixa alta
- Foto de produto/modelo ocupa a **zona superior** (0–500px)
- Headline + subtítulo ficam na **zona média** (500–1100px)
- Informações secundárias (validade) ficam na **zona inferior** (1100–1536px)
- Fontes: apenas BD Megalona DEMO, Montserrat e Glacial Indifference — nunca substituir
- **Nunca enviar prompt separado** — o `prompt_freepik_gerado` dentro do JSON já contém tudo
- **Nunca dar instruções de montagem manual** — a peça deve sair pronta do Freepik

---

## Como usar as fotos enviadas pelo usuário

| O usuário envia | Instrução | O agente faz no prompt Freepik |
|---|---|---|
| Foto de produto (flatlay) | — | Recriar flatlay com o(s) produto(s), fundo neutro creme/branco |
| Foto de produto isolado | "quero produto em destaque" | Produto centralizado com fundo limpo neutro, sombra suave |
| Foto de produto isolado | "coloque em uma modelo" | Modelo usando o produto, enquadramento colo/mão/pescoço |
| Foto de modelo usando | — | Manter estilo da referência, adaptar enquadramento para 1024×1536 |
| Várias fotos de produto | — | Flatlay composto com todas as peças, disposição editorial |
| Sem foto | Campanha geral | Usar estilo visual padrão da campanha (ver Estilos por tipo) |

---

## Estilos por tipo de campanha

### Promoção / Desconto (ex: "10% OFF site todo", "20% OFF")
- **Estilo de foto:** Flatlay de mix de joias sobre tecido branco/bege — transmite abundância e variedade
- **Composição:** Foto ocupa topo inteiro (0–550px), texto começa na área média
- **Headline:** Grande, em BD Megalona — ex: **"10% OFF"** em destaque máximo
- **Subtítulo:** Em Glacial Indifference — ex: "EM TODO O SITE" ou "EM TODA A LOJA"
- **CTA:** Botão rosa largo — "APROVEITAR AGORA" ou "COMPRAR COM DESCONTO"
- **Fundo canvas:** `#F4F2F0` (neutro quente) ou branco `#FFFFFF`
- **Paleta copy:** Headline preto `#111111`, subtítulo `#333333`, CTA rosa `#E91E63`
- **Prompt Freepik (base):** flatlay of mixed gold and silver jewelry — necklaces, earrings, rings, bracelets — arranged beautifully on white linen fabric, soft natural light, luxury product photography, clean neutral background, editorial composition, 1024x1536 vertical format

### Frete Grátis
- **Estilo:** Produto clean com fundo claro — composição simples e elegante
- **Headline:** "FRETE GRÁTIS" em BD Megalona, grande
- **Subtítulo:** "acima de R$ [valor]" em Glacial Indifference
- **CTA:** "COMPRAR AGORA"
- **Fundo:** Branco puro `#FFFFFF` — transmite simplicidade e clareza
- **Prompt Freepik (base):** single gold jewelry piece on clean white background, soft shadow, product photography, minimalist luxury style, vertical 1024x1536

### Lançamento de Coleção
- **Estilo:** Modelo editorial — retrato elegante com joias em destaque
- **Headline:** Nome da coleção em BD Megalona, peso 400 (mais sofisticado que bold)
- **Subtítulo:** "NOVA COLEÇÃO" ou "DISPONÍVEL AGORA" em Glacial Indifference
- **CTA:** "CONHECER COLEÇÃO"
- **Fundo canvas:** `#F4F2F0` (quente, sofisticado)
- **Prompt Freepik (base):** elegant Brazilian woman wearing layered gold jewelry — necklaces, earrings, bracelets — close-up portrait from neckline to forehead, warm cream tones, luxury fashion editorial photography, soft bokeh background, vertical 1024x1536

### Datas Comemorativas (Dia das Mães, Natal, Dia dos Namorados)
- **Estilo:** Modelo com joias + elemento de presente/embrulho elegante OU flatlay com peças e pétalas/props temáticos
- **Headline:** Nome da data em BD Megalona — ex: "DIA DAS MÃES"
- **Subtítulo:** Tagline emocional — ex: "Presentes que ela nunca esquece" em Glacial Indifference
- **CTA:** "PRESENTEAR AGORA" ou "VER SUGESTÕES"
- **Fundo canvas:** `#F4F2F0` para Dia das Mães (tons creme), `#111111` para Natal (dark luxury)
- **Prompt Freepik (base — Dia das Mães):** elegant woman wearing gold necklaces and earrings, soft feminine portrait, cream and warm rose tones, luxury jewelry editorial, pink flowers softly visible, vertical 1024x1536

### Kit / Conjunto
- **Estilo:** Flatlay organizado das peças que compõem o kit — dispostas em composição elegante
- **Headline:** Nome do kit em BD Megalona
- **Subtítulo:** Preço ou benefício em Glacial Indifference
- **CTA:** "QUERO MEU KIT"
- **Prompt Freepik (base):** top-down flatlay of jewelry set — matching necklace, earrings and bracelet — on cream fabric, symmetrical composition, luxury product photography, soft warm light, vertical 1024x1536

### Cupom
- **Estilo:** Produto de destaque + código de cupom visualmente em destaque
- **Headline:** "USE O CUPOM" + código em destaque (Montserrat 800, caixa alta)
- **CTA:** "COPIAR CUPOM" ou "USAR AGORA"
- **Elemento de design:** Linha pontilhada ou retângulo destacado ao redor do código

---

## Exemplos aprovados — referências reais

---

### Mix de Colares — 15% OFF
- **Tipo de foto:** Modelo — close-up de colo/pescoço, foto preenche o canvas inteiro (full bleed)
- **Produto:** Múltiplos colares dourados em layering (estrelas, bolinhas, cristais)
- **Composição:** Foto de colo da modelo ocupa 100% do canvas; zona de texto (copy) sobreposta na metade inferior diretamente sobre a foto com overlay escuro suave
- **Headline:** "MIX" (BD Megalona, ~120px, branco) + "DE COLARES" (menor, abaixo) + separador vertical "|" + "15%" (grande) + "OFF" — tudo branco, alinhado centro
- **CTA:** Sem botão CTA — substituído por pílula de validade com borda pontilhada no rodapé
- **Validade:** Retângulo arredondado com borda pontilhada, fundo semitransparente claro — "Ação válida de DD/MM até DD/MM ou enquanto durarem os estoques."
- **Fundo canvas:** A própria foto (pele dourada + joias); sem fundo separado
- **Prompt Freepik (base):** close-up portrait of Brazilian woman's neck and décolletage wearing multiple layered gold necklaces — star charms, crystal drops, gold bead chains — warm skin tones, soft natural light, luxury jewelry editorial, vertical full-bleed 1024x1536
- **Aprendizado:** Copy pode ir diretamente sobre a foto com overlay suave — não obrigatório ter zona separada. Pílula de validade substitui CTA quando o objetivo é awareness/desconto de categoria.

---

### Leve 3 Semijoias — 15% OFF
- **Tipo de foto:** Modelo — close-up extremo de pulso/mão, full bleed
- **Produto:** Bracelete cuff geométrico dourado statement + anéis dourados + gargantilha choker plana dourada (visível ao fundo)
- **Composição:** Foto domina 80% do canvas (de cima até quase o rodapé); texto sobreposto na zona inferior direita diretamente sobre a foto, sem overlay — leitura pelo contraste
- **Headline:** "Leve **3 Semijoias** e ganhe" (Montserrat, mix regular + bold, branco) + "15% OFF" (BD Megalona, ~140px, branco) — alinhado à direita/centro-inferior
- **CTA:** Sem botão — headline funciona como CTA implícito (campanha de regra de compra)
- **Fundo canvas:** A própria foto — blusa de tricô branco/creme da modelo cria contraste para o texto
- **Prompt Freepik (base):** extreme close-up of woman's wrist and hand wearing bold geometric gold cuff bracelet and gold rings, cream knit sweater background, warm skin tones, luxury jewelry editorial photography, dramatic product focus, vertical full-bleed 1024x1536
- **Aprendizado:** Para campanhas de "leve X ganhe Y" sem CTA de botão, o texto grande no rodapé já comunica a ação. Close-up extremo de peça statement é mais impactante que full body.

---

### Colagem 2×2 — 25% OFF nas Semijoias Favoritas
- **Tipo de foto:** **COLAGEM** — grade 2×2 com 4 fotos de modelo/produto
- **Composição da colagem:**
  - Topo esquerda: Modelo com look all-black (jaqueta couro, óculos escuros, brinco statement + bracelete dourado)
  - Topo direita: Close-up de mãos com múltiplos anéis dourados + pulseira cravejada
  - Baixo esquerda: Close-up de colo com colares de pérola em dourado (fundo dark/roupa preta)
  - Baixo direita: Modelo em perfil com brinco folha dourado + colar nome dourado
- **Texto:** Sobreposto no canto inferior esquerdo sobre a foto — "Um presente especial" (Montserrat regular, branco) + "**25%**OFF" (BD Megalona, ~130px, branco) + "nas suas **Semijoias** favoritas" (mix regular/bold, branco)
- **CTA:** Sem botão — colagem com texto direto
- **Paleta geral:** Estética escura/moody — tons marrons quentes, preto, dourado
- **Prompt Freepik (base — cada quadrante):** Gerar 4 prompts separados ou descrever a grade completa pedindo composição 2x2
- **Aprendizado:** Colagem 2×2 é formato válido e aprovado. Texto fica no canto inferior esquerdo do quadrante baixo-esquerda, sobre a foto. Estética dark é aceita fora de Black Friday/Natal quando o conteúdo usa modelos em look fashion dark.

---

### 15% OFF — Aniversário Piuka Morumbi Shopping
- **Tipo de foto:** Modelo — retrato editorial do busto até a cabeça, fundo neutro (cortina/parede bege rosada)
- **Produto:** Ear cuff prateado, colares layering dourados/prateados (tennis + barra + veneziana), anéis dourados, pulseiras douradas
- **Composição:** Modelo ocupa toda a altura; texto sobreposto no centro da foto (zona do tronco), não na zona inferior
- **Headline:** "15%OFF" (BD Megalona, ~160px, branco) + "EM **TODA** LOJA!" (Montserrat, "TODA" em rosa `#E91E63`)
- **Subtítulo/box:** Retângulo com borda pontilhada — "**ANIVERSÁRIO 1 ANO** PIUKA / **MORUMBI SHOPPING**" (Montserrat bold, branco, caixa alta)
- **CTA:** Sem botão separado — o box com borda pontilhada funciona como elemento de destaque institucional
- **Fundo canvas:** A própria foto; fundo da foto é bege/nude suave — tom harmônico com joias douradas e prateadas
- **Destaque rosa:** A palavra "TODA" em rosa `#E91E63` dentro de texto branco — cria hierarquia visual sem botão
- **Prompt Freepik (base):** elegant Brazilian woman with brown hair wearing layered necklaces, ear cuff and gold bracelets, portrait from chest up, soft beige/blush background with curtain texture, warm editorial fashion photography, vertical 1024x1536
- **Aprendizado:** Texto pode ficar no centro do canvas (sobre o tronco da modelo) em vez do rodapé. Usar cor rosa `#E91E63` em UMA palavra dentro da headline branca para criar hierarquia — técnica de destaque sem mudar o tamanho da fonte.

---

### Colagem 2×2 — 05/05 — 15% Off em Todo Site
- **Tipo de foto:** **COLAGEM** — grade 2×2, 4 fotos de modelos usando brincos/joias
- **Composição da colagem:**
  - Topo esquerda: Modelo com óculos oval preto, brinco argola dourada grande, colar choker — fundo marrom quente (wood/parede)
  - Topo direita: Mesma modelo, ângulo de perfil, mesmos brincos — fundo marrom quente
  - Baixo esquerda: Modelo loira close-up lateral, brinco flor dourada com pérola — fundo verde/externo
  - Baixo direita: Mesma modelo de frente, brinco de pérola solitária, camisa branca — fundo externo
- **Texto:** Sobreposto na faixa horizontal ENTRE as duas linhas de fotos (centro do canvas) — "05/05" (Montserrat, branco, menor) + "15%" (BD Megalona, ~140px, branco) + "%Off" + "EM TODO SITE!" (Montserrat, menor, branco)
- **Fundo do texto:** Faixa escura semitransparente (`rgba(0,0,0,0.5)`) atravessa horizontalmente o centro separando as 4 fotos
- **Aprendizado:** Na colagem 2×2, o texto principal pode ir na faixa central entre os dois pares de fotos — cria separação natural e leitura limpa. As 4 fotos podem ser da mesma modelo em enquadramentos diferentes OU de modelos diferentes com o mesmo tipo de produto (brincos, anéis etc).

---

### ❌ REPROVADO — Colagem 2×2 Dia das Mulheres 15% OFF (faixa preta — NÃO REPETIR)
- **Por que reprovado:** Canvas `#111111` + faixa `rgba(0,0,0,0.58)` criou uma barra preta artificial e feia cortando as fotos ao meio. As fotos têm fundo de cortina bege/creme — o contraste com o preto ficou horroroso e quebrou a elegância da peça.
- **Erro 1 — canvas_background:** `#111111` foi usado por engano. Para colagem com fotos de fundo claro/bege, o canvas deve ser `#F4F2F0` ou `#FFFFFF`. Preto só é válido se as FOTOS em si forem dark/moody (look fashion escuro, fundo escuro).
- **Erro 2 — overlay opaco demais:** `rgba(0,0,0,0.58)` sobre fotos com fundo bege cria uma faixa brutalmente preta. Qualquer valor acima de `rgba(20,10,5,0.18)` já fica pesado demais — o objetivo é que as fotos continuem respirando através da faixa.
- **Regra derivada — leia antes de gerar colagem 2×2:**
  - **Fotos com fundo claro/bege/branco (estúdio):** overlay **máximo `rgba(20,10,5,0.18)`**, gradiente de transição de 60px nas bordas superior e inferior da faixa. Canvas `#F4F2F0`. A leitura do texto é garantida por `text-shadow` forte, não por overlay pesado.
  - **Fotos com fundo escuro/moody:** overlay até `rgba(0,0,0,0.30)` aceitável. Canvas pode ser `#111111`.
  - **Nunca use retângulo sólido** para a faixa de texto — sempre gradiente suave de entrada/saída com 60px de fade.
  - **A faixa deve ser quase imperceptível** — o texto flutua sobre as fotos, não dentro de uma barra escura.
- **O que deveria ter sido feito:** Faixa com `rgba(20,10,5,0.15)`, gradiente de entrada suave (60px fade in/out), canvas `#F4F2F0`, texto em branco puro com `text-shadow: 0px 2px 24px rgba(0,0,0,0.70)` forte para garantir leitura **sem overlay pesado**.

---

### ❌ REPROVADO — Colagem 2×2 05/05 Dia da Mulher 15% OFF (faixa central escura — NÃO REPETIR)
- **Por que reprovado:** A faixa central de texto ficou visualmente pesada — um borrão escuro cortando as fotos ao meio, mesmo com as fotos tendo fundo quente/bege.
- **Erro:** Overlay com alpha `0.42` é excessivo para fotos com fundo bege/marrom quente. Cria uma mancha preta artificial que destrói a elegância das fotos e contrasta feio com os tons dourados das joias.
- **Regra consolidada:** Para qualquer colagem com fotos de fundo claro, bege, marrom quente ou neutro — o overlay da faixa de texto **nunca passa de `rgba(20,10,5,0.18)`**. A legibilidade do texto é responsabilidade do `text-shadow`, não do escurecimento do fundo. Shadow forte recomendado: `text-shadow: 0px 2px 28px rgba(0,0,0,0.85)`.
- **O que deveria ter sido feito:** Faixa com `rgba(20,10,5,0.15)` máximo, gradiente de 60px de fade nas bordas, texto com shadow muito forte — as fotos devem respirar por baixo do texto, não sumir embaixo de uma faixa escura.

---

### Coleção Glam — 10% OFF (Lançamento com Produto Isolado)
- **Tipo de foto:** Produto isolado em flatlay sobre tecido de seda branca
- **Produto:** 2 pares de brincos lado a lado — esquerda: brinco floral prateado com pérola gota; direita: brinco wave dourado cravejado
- **Composição:** Produtos no centro-inferior do canvas; headline da coleção no topo com mix tipográfico; botão de desconto e CTA no rodapé; validade no final
- **Headline topo:** "COLEÇÃO" (Montserrat/Glacial, serifado, dourado `#C9A84C`, caixa alta) + "Glam" (fonte script/cursiva elegante, dourado)
- **Subtítulo:** "Para celebrar momentos marcantes e inesquecíveis!" (Montserrat regular, pequeno, marrom escuro)
- **Elemento de desconto:** Retângulo arredondado branco com sombra — "**10%**off" (BD Megalona + Montserrat, preto/escuro) — parece botão mas é badge de oferta
- **CTA:** Botão sólido escuro/marrom — "CONHECER COLEÇÃO" (Montserrat 700, branco, caixa alta)
- **Validade:** Linha de texto pequena no rodapé — "Ação válida de DD/MM até DD/MM ou enquanto durarem os estoques."
- **Fundo canvas:** Seda/cetim branco com dobras suaves — luxo e leveza
- **Prompt Freepik (base):** two pairs of luxury earrings on white silk satin fabric with soft folds — left pair: silver floral design with pearl drop, right pair: gold wave design with crystals — top-down product photography, soft diffused light, elegant luxury jewelry presentation, vertical 1024x1536
- **Aprendizado:** Para lançamento de coleção com nome próprio, o nome da coleção em fonte script/cursiva no topo é padrão aprovado. Badge de desconto (retângulo branco com sombra) é alternativa ao botão rosa quando o contexto é mais editorial/elegante.

---

## O que funciona bem

- **Flatlay com mix de peças:** Transmite variedade do catálogo — ótimo para promoções gerais
- **Headline de desconto grande:** "20% OFF" em BD Megalona ocupa ~30–40% da largura — impacto visual imediato
- **CTA largo (mínimo 400px):** Leitura fácil em celular — nunca CTA estreito
- **Foto no topo, copy na parte de baixo:** Hierarquia clara — o olho vai da imagem para a oferta
- **Fundo creme `#F4F2F0`:** Harmoniza com dourado das joias — nunca fundo branco artificial se tiver produto dourado
- **Validade em pequeno no rodapé:** Transparência sem poluir visualmente o layout

---

## O que evitar

- **Gerar nova foto da modelo** — NUNCA. Se o usuário enviou foto, ela é usada como `imagem_referencia` intocável
- **Alterar aparência das joias** — NUNCA. Descrever no prompt exatamente as joias da foto: forma, cor, material, detalhes
- **Canvas errado** — nunca 1080×1080 ou 1080×1920 — sempre **1024×1536**
- **Logo Piuka** — NUNCA inserir, em nenhuma circunstância, em nenhuma camada, nem no prompt Freepik
- **CTA outline (borda sem preenchimento)** — sempre botão sólido rosa `#E91E63`
- **Texto pequeno demais** — mínimo 20px para qualquer elemento em celular
- **Fundo escuro com produto dourado** — ouro se perde no escuro, usar sempre fundo claro/neutro para produto dourado; fundo escuro só para campanhas temáticas (Natal, Black Friday)
- **Overlay pesado sobre foto** — se precisar de overlay, usar gradiente MUITO SUAVE (`rgba(20,10,5,0.18)` máximo para fotos claras). A leitura do texto é garantida por `text-shadow` forte, não pelo escurecimento da imagem. Borração preta visível = peça reprovada.
- **Faixa escura visível em colagem** — NUNCA usar valor de alpha acima de `0.20` em fotos com fundo claro/bege. A faixa deve ser quase imperceptível — o texto flutua sobre as fotos, não dentro de uma barra escura. Use `text-shadow: 0px 2px 24px rgba(0,0,0,0.80)` no texto em vez de escurecer o fundo.
- **Canvas `#111111` em colagem com fotos claras** — fundo preto só se as FOTOS forem dark. Se as fotos são de estúdio com fundo bege, o canvas é `#F4F2F0`
- **Muita informação na zona superior** — a foto deve respirar; não inserir texto sobre a foto do produto
- **Prompt Freepik com variáveis não preenchidas** — sempre substituir todos os `[XXX]` antes de enviar
- **Enviar prompt separado do JSON** — proibido; tudo vai dentro de `prompt_freepik_gerado`
- **Dar instruções de montagem manual** — proibido; a peça sai pronta do Freepik sem edição adicional

---

## Hierarquia visual padrão (1024×1536)

```
┌─────────────────────────────┐
│                             │
│   FOTO DO PRODUTO/MODELO    │  ← Zona A: 0–500px
│   (flatlay, editorial,      │
│    close, produto isolado)  │
│                             │
├─────────────────────────────┤
│                             │
│   HEADLINE PRINCIPAL        │  ← Zona B: 500–720px
│   (BD Megalona, 96–140px)   │
│                             │
│   Subtítulo                 │  ← Zona C: 720–860px
│   (Glacial Indifference)    │
│                             │
│   [ BOTÃO CTA ROSA ]        │  ← Zona D: 860–1020px
│   (Montserrat 700, 22px)    │
│                             │
├─────────────────────────────┤
│                             │
│   Validade                  │  ← Zona E: 1020–1536px
│   (Montserrat 400, 14px)    │
│                             │
└─────────────────────────────┘
```

---

## Estrutura obrigatória do JSON — padrão de camadas

O JSON gerado deve sempre ter a chave `"camadas"` com as camadas na seguinte ordem. Cada camada é descrita com todos os atributos necessários para o Freepik renderizar sem edição manual.

```json
{
  "meta": { ... },
  "canvas": { "width": 1024, "height": 1536, "background_color": "#F4F2F0" },
  "tipografia": { ... },
  "logo_piuka": "ausente — sem logo neste formato",
  "copy": { ... },
  "camadas": [
    {
      "id": "fundo_foto",
      "tipo": "imagem_gerada",
      "descricao": "Descrição detalhada da foto — produto(s), fundo, luz, estilo, props",
      "posicao": { "x": 0, "y": 0 },
      "largura": 1024,
      "altura": 1536
    },
    {
      "id": "overlay_gradiente",
      "tipo": "retangulo_gradiente",
      "descricao": "Overlay MUITO SUAVE — quase imperceptível. Fotos com fundo claro/bege: máximo rgba(20,10,5,0.18). A leitura é garantida pelo text-shadow forte no texto, NÃO pelo overlay pesado. Nunca ultrapassar 0.20 em fotos de estúdio/fundo claro.",
      "gradiente": {
        "direcao": "vertical_top_to_bottom",
        "inicio": { "y": "650px", "cor": "rgba(0,0,0,0.00)" },
        "fim":    { "y": "1536px", "cor": "rgba(20,10,5,0.18)" }
      },
      "posicao": { "x": 0, "y": 650 },
      "largura": 1024,
      "altura": 886
    },
    {
      "id": "headline_desconto",
      "tipo": "texto",
      "conteudo": "TEXTO DO HEADLINE",
      "fonte": "BD Megalona DEMO Personal Use",
      "peso": 700,
      "tamanho_px": 148,
      "cor": "#FFFFFF",
      "posicao": { "x": "512px", "y": "860px" },
      "alinhamento": "center",
      "letter_spacing": "2px",
      "sombra": "0px 2px 18px rgba(0,0,0,0.35)"
    },
    {
      "id": "separador_linha",
      "tipo": "linha_horizontal",
      "largura": 320,
      "espessura": 1,
      "cor": "rgba(255,255,255,0.45)",
      "posicao": { "x": "352px", "y": "990px" }
    },
    {
      "id": "subtitulo_data",
      "tipo": "texto",
      "conteudo": "SUBTÍTULO EM CAIXA ALTA",
      "fonte": "Glacial Indifference",
      "peso": 700,
      "tamanho_px": 36,
      "cor": "#FFFFFF",
      "posicao": { "x": "512px", "y": "1030px" },
      "alinhamento": "center",
      "letter_spacing": "7px"
    },
    {
      "id": "tagline",
      "tipo": "texto",
      "conteudo": "Tagline emocional da campanha.",
      "fonte": "Glacial Indifference",
      "peso": 400,
      "tamanho_px": 24,
      "cor": "#F4DFD0",
      "posicao": { "x": "512px", "y": "1085px" },
      "alinhamento": "center",
      "letter_spacing": "1px"
    },
    {
      "id": "cta_botao",
      "tipo": "botao",
      "conteudo": "TEXTO DO CTA",
      "fonte": "Montserrat",
      "peso": 700,
      "tamanho_px": 22,
      "cor_texto": "#FFFFFF",
      "cor_fundo": "#E91E63",
      "borda": "none",
      "border_radius": "4px",
      "posicao_centro": { "x": "512px", "y": "1185px" },
      "largura": 460,
      "altura": 64,
      "padding": "18px 60px",
      "letter_spacing": "2px",
      "sombra": "0px 4px 20px rgba(233,30,99,0.45)"
    },
  ],
  "prompt_freepik_gerado": "Descrição completa da peça final em inglês, incluindo: foto de fundo, overlay, todos os textos com fonte/tamanho/cor/posição, botão CTA. Sem variáveis [XXX] não preenchidas. Sem @piuka, sem handle, sem marca."
}
```

### Regras da chave `prompt_freepik_gerado`

- Sempre em **inglês**
- Descreve a peça **completa** — foto + overlay + cada elemento de texto com fonte, tamanho, cor, posição
- Nunca usa variáveis como `[XXX]` — tudo substituído com valores reais
- Começa sempre com `"Vertical graphic design piece, 1024x1536px, [tema da campanha]..."`
- Termina com a descrição do botão CTA — sem handle, sem @piuka, sem marca
- É o único prompt que o usuário precisa colar no Freepik

---

## Adaptações por tipo de produto recebido

### O usuário envia: flatlay de produto (foto plana de cima)
→ Manter composição flatlay, ampliar com props (tecido, fundo neutro)
→ Prompt: "top-down flatlay of [produtos descritos], [fundo], soft natural light, luxury product photography..."

### O usuário envia: produto isolado (recortado ou fundo branco)
→ Recontextualizar: colocar em flatlay editorial ou modelo usando
→ Perguntar ao usuário: "Prefere a peça em flatlay ou em uma modelo?"

### O usuário envia: foto de modelo usando
→ Manter estilo, adaptar enquadramento para vertical 1024×1536
→ Se modelo for até o busto, manter; se for horizontal, instruir Freepik para recomposição vertical

### O usuário envia: várias fotos (mix de produtos)
→ Flatlay composto com todas as peças dispostas de forma editorial
→ "Mix de [lista de peças] dispostos em flatlay sobre [fundo]..."

---

## Preferências de CTA

- **Sempre botão sólido** — nunca outline
- **Sempre em caixa alta** — "APROVEITAR AGORA", não "Aproveitar agora"
- **Cor padrão:** `#E91E63` (rosa Piuka) — exceção: CTAs premium em coleções especiais podem usar `#D4AF37` (dourado)
- **Largura mínima:** 400px — nunca CTA estreito
- **Padding padrão:** `18px 60px`
- **Fonte:** Montserrat 700, 22px, cor texto `#FFFFFF`

---

## Campanhas recorrentes (referências fixas)

| Campanha | Headline padrão | CTA padrão | Fundo canvas |
|---|---|---|---|
| 10% OFF site todo | "10% OFF" + "EM TODO O SITE" | "APROVEITAR AGORA" | `#F4F2F0` |
| Frete grátis | "FRETE GRÁTIS" | "COMPRAR AGORA" | `#FFFFFF` |
| Dia das Mães | "DIA DAS MÃES" | "PRESENTEAR AGORA" | `#F4F2F0` |
| Black Friday | "BLACK FRIDAY" | "QUERO MEU DESCONTO" | `#111111` |
| Lançamento | "[nome coleção]" | "CONHECER COLEÇÃO" | `#F4F2F0` |
| Volta às aulas | "BRILHE SEMPRE" | "VER LOOKS" | `#FFFFFF` |
| Natal | "PRESENTEIE COM AMOR" | "VER PRESENTES" | `#111111` |

---

## Notas de estilo

- O estilo Piuka campanhas é **impactante mas elegante** — não panfleto de supermercado
- Headline grande não significa feio — BD Megalona tem personalidade que eleva o visual
- O produto sempre aparece — mesmo em campanha de desconto geral, sempre tem joia na foto
- Tons quentes dominam: creme, bege, dourado — evitar azul, verde, roxo que destoa da identidade
- **Para produtos dourados:** fundo sempre claro — branco, creme, bege
- **Para campanhas dark (Natal, Black Friday):** fundo `#111111` com CTA dourado `#D4AF37`
- Quando há validade: sempre incluir no rodapé — transparência é valor da marca
- Nunca inserir `@piuka`, handle ou qualquer referência de marca na imagem