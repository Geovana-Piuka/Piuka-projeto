# Treino — imagens-piuka-categorias

## Passo 0 — Verificar imagens de referência na pasta da skill

Antes de qualquer pergunta, use Glob para listar arquivos de imagem em:
`.claude/skills/imagens-piuka-categorias/imagens-categoria/`

**Se encontrar arquivos (excluindo LEIAME.md):**
- Mostre a lista: "Encontrei X imagens de referência: [nomes dos arquivos]"
- Pergunte: "Vou usar essas imagens como referência. Confirma, ou prefere enviar outras fotos no chat?"
- Se confirmado: use os caminhos completos como `imagem_ref_1`, `imagem_ref_2`, etc. no JSON
- Se o usuário enviar fotos no chat: priorizar as fotos do chat sobre as da pasta

**Se pasta vazia ou só LEIAME.md:**
- Prosseguir normalmente — perguntar sobre imagens dentro do fluxo padrão da skill

---

## Como o agente funciona

O usuário envia:
1. **Imagem de referência** — pode ser foto de produto (flatlay) ou modelo usando a peça
2. **Texto desejado** — ex: "Em Alta", "Brincos", "Coleções"
3. **Instrução complementar** (opcional) — ex: "coloque esse colar em um colo", "use esse produto em flatlay"

O agente gera um **JSON completo** + **prompt Freepik** para produzir a imagem final no formato 552×332px.

---

## Regras fixas (nunca alterar)

- Canvas: **552×332px** — fixo, imutável
- Texto: sempre no **canto inferior direito**
- Texto: **branco, caixa alta, sans-serif limpa** (Montserrat ou Glacial Indifference)
- **Sem logo Piuka** — proibido neste formato
- **Sem overlay pesado** — a foto deve estar nítida; o texto vai na área mais neutra
- Fundo: sempre **tons neutros/quentes** — branco, bege, creme, marrom suave, pele

---

## Exemplos aprovados (referência visual)

### 1. EM ALTA
- **Tipo de foto:** Flatlay — mix de peças douradas e prateadas (colar groumet, brincos argola, anéis, bracelete) sobre tecido branco neutro
- **Produto:** Mix de joias variadas, dourado e prata
- **Texto:** "EM ALTA" — canto inferior direito, branco, sem sombra, fonte sans-serif bold
- **Fundo:** Tecido branco/marfim, luz suave e uniforme
- **Paleta:** Neutro frio (#F4F2F0 ou branco), dourado e prata das peças
- **Prompt Freepik:** flatlay of gold and silver jewelry — necklace, hoop earrings, rings, bracelet — on white linen fabric, soft natural light, clean neutral background, luxury product photography, with the word 'EM ALTA' in Montserrat Bold font, white color, uppercase, positioned at the bottom right corner of the image, size 32px

### 2. COLEÇÕES
- **Tipo de foto:** Close de modelo — colo e mãos visíveis, colares sobrepostos em camadas
- **Produto:** Colares empilhados: choker corrente groumet, colar personalizado (nome cursivo "Nara"), anel chunky e anel liso
- **Modelo:** Mulher jovem, top marrom escuro, unhas bordô/marsala, mãos sobre o peito
- **Texto:** "COLEÇÕES" — canto inferior direito, branco, fonte sans-serif, peso regular
- **Fundo:** Tom marrom/terra (#4A3728 aproximado) — fundo de roupa da modelo
- **Prompt Freepik:** close-up of a young woman's neckline wearing layered gold necklaces — chunky chain choker, personalized script name necklace — dark brown top, bordeaux nails, hands resting on chest, warm mocha tones, luxury jewelry editorial, with the word 'COLEÇÕES' in Montserrat Bold font, white color, uppercase, positioned at the bottom right corner of the image, size 32px

### 3. ELAS USAM
- **Tipo de foto:** Retrato editorial — modelo elegante olhando para o espelho/câmera, com joias completas
- **Produto:** Colares dourados sobrepostos, pulseiras douradas e prateadas, brincos pequenos
- **Modelo:** Mulher adulta, morena, cabelos soltos longos, roupa amarela/creme, postura sofisticada
- **Texto:** "ELAS USAM" — canto inferior direito, branco, fonte sans-serif
- **Fundo:** Ambiente claro, reflexo de espelho, tons creme/dourado suave
- **Prompt Freepik:** elegant Brazilian woman wearing layered gold necklaces, gold and silver bracelets, small hoop earrings, yellow cream outfit, long dark hair, looking into mirror, bright airy interior, luxury jewelry lifestyle editorial, with the word 'ELAS USAM' in Montserrat Bold font, white color, uppercase, positioned at the bottom right corner of the image, size 32px

### 4. BRINCOS
- **Tipo de foto:** Close extremo de orelha — detalhe máximo dos brincos
- **Produto:** Argola grande dourada, argola média prata/rosé, ear cuff prata — mix de tamanhos e acabamentos
- **Modelo:** Cabelo loiro preso em coque baixo, pele quente
- **Texto:** "BRINCOS" — canto inferior direito, branco, fonte sans-serif bold, tamanho destacado
- **Fundo:** Tom nude/bege neutro (pele e cabelo da modelo)
- **Prompt Freepik:** extreme close-up of a woman's ear wearing oversized gold hoop earring, medium silver-rose hoop and silver ear cuff, blonde hair in low bun, warm beige skin tones, soft focus background, luxury jewelry detail shot, with the word 'BRINCOS' in Montserrat Bold font, white color, uppercase, positioned at the bottom right corner of the image, size 32px

### 5. COLARES
- **Tipo de foto:** Close de colo — colares sobrepostos em camadas, mão repousando no peito
- **Produto:** Colares empilhados: corrente malha dourada espessa, corrente delicada, pingente coração grande
- **Modelo:** Mulher jovem, roupa branca floral (flores 3D), unhas francesas (nude/branco), mão sobre o peito em pose elegante
- **Texto:** "COLARES" — canto inferior direito, branco, fonte sans-serif, peso regular-bold
- **Fundo:** Branco floral da roupa + pele suave — tons muito claros
- **Prompt Freepik:** close-up of woman's neckline wearing layered gold necklaces — thick mesh chain, delicate chain, large heart pendant — white floral 3D flower dress, french manicure nails, hand resting gracefully on chest, clean white tones, luxury jewelry editorial photography, with the word 'COLARES' in Montserrat Bold font, white color, uppercase, positioned at the bottom right corner of the image, size 32px

### 6. CHOKERS
- **Tipo de foto:** Flatlay diagonal em leque — chokers dispostos em diagonal do canto superior esquerdo ao inferior direito, sobrepostos levemente
- **Produto:** 7+ chokers variados em ouro e prata: corrente snake dourada, riviera com zircônias navete, riviera com zircônias redondas, riviera quadrada, riviera pedras quadradas grandes, mix de acabamentos
- **Texto:** "CHOKERS" — canto inferior direito, branco, fonte sans-serif, peso regular
- **Fundo:** Creme/bege muito suave (#F5F0EA aproximado) — fundo neutro liso, sem textura aparente
- **Composição:** Peças em leque diagonal preenchem ~70% do frame — elegante e organizado
- **Prompt Freepik:** top-down flatlay of multiple gold and silver choker necklaces fanned out diagonally — snake chain, tennis necklace with clear zirconia, square stone riviera, mixed finishes — soft cream beige background, luxury product photography, elegant diagonal arrangement, with the word 'CHOKERS' in Montserrat Bold font, white color, uppercase, positioned at the bottom right corner of the image, size 32px

### 7. PULSEIRAS
- **Tipo de foto:** Close de dois pulsos cruzados — pulseiras empilhadas em dois antebraços em pose de cruzar os braços
- **Produto:** Pulseira dourada bubble/berloques (formato oval) na parte inferior; bangles lisos em ouro e prata (smooth finish) no pulso superior — mix de texturas
- **Modelo:** Dois braços femininos, pele morena quente, manga de tricô creme/off-white visível (suéter)
- **Texto:** "PULSEIRAS" — canto inferior direito, branco, fonte sans-serif, peso regular
- **Fundo:** Tom quente de pele + tricô creme — composição aconchegante e sofisticada
- **Composição:** Dois pulsos cruzados formam composição geométrica interessante — foco total nas pulseiras
- **Prompt Freepik:** close-up of two female wrists crossed, wearing stacked bracelets — gold bubble oval link bracelet on lower arm, smooth gold and silver bangles on upper arm — warm brown skin tone, cream knit sweater sleeve visible, cozy editorial style, luxury jewelry photography, with the word 'PULSEIRAS' in Montserrat Bold font, white color, uppercase, positioned at the bottom right corner of the image, size 32px

### 8. ANÉIS
- **Tipo de foto:** Flatlay em bandeja/expositor de joalheria — anéis organizados em grade
- **Produto:** 12+ anéis dourados variados: coração aberto, coração vazado, cravejado com zircônia, signet liso, signet texturizado, geométrico, floral, twisted, ondulado — grande variedade de estilos
- **Texto:** "ANÉIS" — canto inferior direito, branco, fonte sans-serif, peso regular
- **Fundo:** Bandeja de veludo/camurça creme/bege claro, fundo branco limpo, puxador de cristal/vidro transparente visível no canto superior direito, objeto dourado ao fundo desfocado
- **Composição:** Expositor de loja — profissional, organizado, transmite variedade do catálogo
- **Prompt Freepik:** overhead flatlay of multiple gold rings displayed on cream velvet jewelry tray — hearts, geometric, floral, signet, twisted and plain band styles — white clean background, crystal drawer knob visible, blurred gold object in background, luxury jewelry store display photography, with the word 'ANÉIS' in Montserrat Bold font, white color, uppercase, positioned at the bottom right corner of the image, size 32px

### 9. ACESSÓRIOS
- **Tipo de foto:** Flatlay de acessórios de cabelo — dispostos sobre fundo branco limpo
- **Produto:** Presilhas/grampos dourados texturizados (efeito martelado/ondulado), clipe de cabelo liso dourado, presilha retangular larga, tiara/headband trançada dourada parcialmente visível — todos em rose gold/dourado
- **Texto:** "ACESSÓRIOS" — canto inferior direito, branco, fonte sans-serif, peso regular
- **Fundo:** Branco puro, bandeja dourada circular com borda trabalhada parcialmente visível no canto inferior esquerdo — elemento de styling
- **Composição:** Peças espalhadas de forma editorial — não organizado em grade, mas com intenção artística
- **Prompt Freepik:** flatlay of gold hair accessories on white background — textured hammered hair clips, rectangular barrettes, braided headband — rose gold and yellow gold finishes, golden round tray partially visible as styling prop, clean white surface, luxury accessories product photography, with the word 'ACESSÓRIOS' in Montserrat Bold font, white color, uppercase, positioned at the bottom right corner of the image, size 32px

---

## O que funciona bem

- **Flatlay:** Peças sobre tecido branco/neutro com luz natural difusa — resultado limpo e elegante
- **Close de colo:** Modelo com roupa de gola/decote aberto — colares em destaque máximo
- **Close de orelha:** Ideal para brincos — enquadramento tight, cabelo preso para não tampar
- **Texto no canto direito inferior:** Área naturalmente mais escura ou neutra nas fotos — texto legível sem overlay
- **Sobreposição de peças:** Colares empilhados, pulseiras stacked — transmite variedade e estilo
- **Unhas como detalhe:** Quando as mãos aparecem, unhas bem feitas (bordô, francesa, nude) elevam o visual

---

## O que evitar

- **Overlay escuro sobre a foto** — o estilo Piuka categorias é foto clara + texto limpo, não banner de promoção
- **Texto centralizado ou no topo** — o padrão é sempre inferior direito
- **Logo Piuka** — proibido neste formato
- **Fundo branco artificial** — preferir contexto (tecido, roupa, ambiente) a fundo recortado
- **Acessórios de cabelo ou maquiagem exagerada** — o foco é a joia, a modelo é suporte
- **Texto com sombra pesada** — só sombra suave se o fundo for muito claro

---

## Preferências por categoria

### Colares
- Close de colo com colares sobrepostos (2-3 camadas)
- Modelo com decote, roupa clara ou neutra (branco, creme, floral)
- Mão repousando no peito em pose elegante
- Tons: branco, creme, bege claro

### Chokers
- Flatlay diagonal em leque — peças dispostas em ângulo do canto sup. esq. ao inf. dir.
- Múltiplos modelos simultâneos (snake, riviera, tennis, pedras)
- Mix de ouro e prata para mostrar variedade
- Fundo: creme/bege neutro liso (#F5F0EA)

### Brincos
- Close extremo de orelha — enquadramento tight
- Cabelo preso (coque, rabo) para exposição máxima das peças
- Mix de modelos quando possível (argola + ear cuff)
- Tons: nude, pele quente, bege

### Pulseiras
- Close de dois pulsos cruzados ou empilhados
- Mix de texturas: bubble/oval + bangle liso
- Manga de roupa neutra visível (tricô, malha) para contexto
- Pele morena quente — tons aconchegantes

### Anéis
- Bandeja/expositor de joalheria com anéis organizados em grade
- 8–12 peças variadas mostrando diversidade do catálogo
- Fundo branco + veludo creme da bandeja
- Elemento de styling: puxador de cristal ou objeto dourado desfocado ao fundo

### Acessórios
- Flatlay editorial — peças espalhadas com intenção artística (não grade)
- Todos em dourado/rose gold sobre fundo branco
- Elemento de styling: bandeja dourada circular como prop
- Foco em presilhas, grampos, tiaras — acessórios de cabelo dourados

### Conjuntos / Coleções
- Modelo do colo para cima com várias peças simultâneas
- Colares + anéis + pulseiras visíveis
- Ambiente quente e elegante (tom marrom/terra ou creme)

### Em Alta / Novidades
- Flatlay com mix de categorias (colares, brincos, anéis, pulseiras juntos)
- Tecido branco/neutro como base — luz natural difusa, sombras suaves
- Mistura de dourado e prata para mostrar variedade

### Elas Usam
- Retrato editorial mais amplo (modelo da cintura para cima ou 3/4)
- Modelo sofisticada, com postura e expressão confiante
- Ambiente luminoso, tons creme/dourado

---

## Notas de estilo

- O estilo Piuka categorias é **editorial limpo**, não panfleto de promoção
- A joia é sempre protagonista — a modelo e o ambiente são suporte
- Tons quentes (dourado, creme, bege, marrom suave) dominam a paleta fotográfica
- Textos simples: **apenas o nome da categoria**, sem subtítulo na maioria dos casos
- A fonte não é BD Megalona neste formato — é **sans-serif limpa** (Montserrat Bold ou Glacial Indifference Bold)
- Peso visual leve: composição clean, nunca sobrecarregada

---

## Mapeamento de tipos de foto por entrada do usuário

| O usuário envia | Instrução | O agente gera no prompt Freepik |
|---|---|---|
| Foto de produto (flatlay) | — | Flatlay do produto sobre tecido neutro, mesma composição |
| Foto de produto isolado | "coloque em um colo" | Modelo usando o produto, close de colo/pescoço |
| Foto de produto isolado | "coloque na orelha" | Modelo usando o produto, close de orelha |
| Foto de modelo usando | — | Manter estilo da foto de referência, adaptar enquadramento |
| Sem foto | Categoria padrão | Usar estilo padrão da categoria (ver Preferências por categoria) |