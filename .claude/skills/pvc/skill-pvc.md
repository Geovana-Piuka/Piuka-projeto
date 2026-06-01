# Gerador de PVC Piuka — Cartão Frente

## Regras absolutas — nunca quebrar

- **A foto enviada pelo usuário É o fundo** — nunca sugerir gerar uma nova imagem de modelo/produto
- **Sempre gera apenas a frente** — nunca perguntar sobre verso, frente/verso ou quantidade de lados
- **Nunca perguntar sobre material** — PVC é sempre o padrão, sem exceção
- **O texto é gerado DENTRO da imagem pelo Freepik** — o usuário não vai editar no Canva depois; o JSON deve conter todos os elementos de texto com fontes, posição e estilo completos para o gerador
- **Nunca incluir** na peça:
  - Nome do produto (ex: "Colar Pérola")
  - Preço (ex: "R$ 189,90")
  - Código do produto
  - Site, Instagram ou redes sociais
  - Slogan da Piuka

O que vai na peça: **headline da campanha + tagline**, exatamente como nas imagens de referência.

---

## Fluxo da skill

**Passo 1 — Receber a foto**
O usuário enviou uma foto no chat? Essa foto É a imagem de fundo. Analise-a:
- Paleta de cores dominantes
- Tom emocional/vibe da cena
- Área livre no terço inferior (onde o texto vai)
- Escurecimento necessário no overlay para legibilidade

**Passo 2 — Perguntar só o essencial**
Faça apenas estas 2 perguntas em uma única mensagem:
1. "Qual o **headline** da campanha?" (ex: Pérolas, Personalize, Mãe e filha)
2. "Qual a **tagline**?" (ex: Atemporais & Elegantes., Realce sua beleza)

Se o usuário já informou headline e tagline junto com a foto — pule esta etapa e vá direto ao JSON.

**Passo 3 — Gerar o JSON**
Monte o JSON completo seguindo os padrões abaixo e entregue pronto para o Freepik.

---

## Referências visuais aprovadas

### Padrões extraídos das campanhas reais

1. **"Dois corações, um amor"** — Dia das Mães
   - Fundo bege/creme suave, luz difusa, ambiente clean
   - Tipografia: headline em sans-serif light/fino; tagline em script itálico
   - Texto no canto inferior esquerdo, dois pesos alternados
   - Paleta: creme, branco off-white, dourado das joias

2. **"Personalize"** — campanha personalização
   - Fundo: tecido bordô/malva, pele como elemento de composição
   - Tipografia: headline em serif display grande, tagline em sans-serif light
   - Texto centralizado na parte inferior

3. **"Pérolas"** — coleção pérolas
   - Fundo: cortinas creme, roupa branca com renda
   - Tipografia: headline em serif display + tagline em sans-serif light com "&"
   - Texto centralizado, paleta totalmente off-white, creme, dourado

4. **"Brincos"** — campanha brincos
   - Fundo neutro claro, close no rosto da modelo
   - Tipografia: headline em serif bold grande; tagline em script cursivo
   - Texto centralizado inferior

---

## JSONs de referência aprovados

Use estes JSONs como base estrutural. A foto do usuário substitui o campo `foto.descricao`.

```json
{
  "campanha": "Pérolas — Atemporais & Elegantes",
  "formato": { "largura_px": 3000, "altura_px": 4500, "dpi": 300, "orientacao": "retrato" },
  "foto": {
    "descricao": "Modelo morena de cabelo semi-preso, postura frontal com braços cruzados, usando top de renda branco/blush com alças finas. Expressão serena e sofisticada.",
    "joias_visiveis": ["brinco flor dourado com pérola", "colar ômega dourado com pérola pendente", "pulseira fina dourada com pérola", "anel dourado com pérola"],
    "enquadramento": "Plano médio da cintura para cima, modelo centralizada",
    "iluminacao": "Luz difusa lateral, suave, sem sombras duras"
  },
  "fundo": {
    "cor_dominante": "#F0E6D8",
    "descricao": "Cortinas de tecido creme/off-white com textura suave, profundidade de campo desfocada"
  },
  "paleta": {
    "creme_cortina": "#F0E6D8",
    "pele_quente": "#E8D5C0",
    "dourado_joia": "#C9A84C",
    "branco_roupa": "#F8F4F0",
    "texto": "#FFFFFF"
  },
  "overlay": {
    "tipo": "gradiente_linear",
    "direcao": "bottom",
    "inicio": "60% da altura",
    "cor": "#1A1410",
    "opacidade_maxima": 0.45
  },
  "texto_principal": {
    "conteudo": "Pérolas",
    "fonte": "Cormorant Garamond",
    "variante": "Regular (400) — sem negrito",
    "tamanho_relativo": "~18% da largura da peça",
    "cor": "#FFFFFF",
    "alinhamento": "center",
    "posicao_vertical": "75% da altura",
    "espacamento_letras": "-0.5px"
  },
  "texto_secundario": {
    "conteudo": "Atemporais & Elegantes.",
    "fonte": "Montserrat",
    "variante": "Light (300)",
    "tamanho_relativo": "~4% da largura da peça",
    "cor": "#FFFFFF",
    "alinhamento": "center",
    "posicao_vertical": "85% da altura",
    "espacamento_letras": "3px"
  },
  "zonas": {
    "foto_area": "0% a 78%",
    "texto_area": "72% a 95%",
    "margem_seguranca_px": 150
  },
  "vibe": ["nupcial", "atemporal", "puro", "bridal", "sereno", "sofisticado"]
}
```

```json
{
  "campanha": "Brincos — Realce sua beleza",
  "formato": { "largura_px": 3000, "altura_px": 4500, "dpi": 300, "orientacao": "retrato" },
  "foto": {
    "descricao": "Modelo loira em close semi-perfil, usando óculos oval tartaruga com lentes âmbar. Expressão suave, levemente virada. Destaque no brinco flor dourado com pétalas em relevo e pérola no centro.",
    "joias_visiveis": ["brinco flor dourado com pétalas em relevo e pérola central"],
    "enquadramento": "Close do rosto, do ombro ao topo da cabeça, levemente à direita do centro",
    "iluminacao": "Luz natural suave, fundo neutro sem textura"
  },
  "fundo": {
    "cor_dominante": "#F2EDE6",
    "descricao": "Fundo liso creme muito claro, praticamente sem textura — editorial clean"
  },
  "paleta": {
    "creme_fundo": "#F2EDE6",
    "dourado_brinco": "#D4A96A",
    "pele_clara": "#E8C9A8",
    "branco_roupa": "#FFFFFF",
    "texto": "#FFFFFF"
  },
  "overlay": {
    "tipo": "gradiente_linear",
    "direcao": "bottom",
    "inicio": "58% da altura",
    "cor": "#1A1410",
    "opacidade_maxima": 0.50
  },
  "texto_principal": {
    "conteudo": "Brincos",
    "fonte": "Playfair Display",
    "variante": "Bold (700)",
    "tamanho_relativo": "~20% da largura da peça",
    "cor": "#FFFFFF",
    "alinhamento": "center",
    "posicao_vertical": "73% da altura",
    "espacamento_letras": "-1px"
  },
  "texto_secundario": {
    "conteudo": "Realce sua beleza",
    "fonte": "Great Vibes",
    "variante": "Regular — script cursivo",
    "tamanho_relativo": "~8% da largura da peça",
    "cor": "#FFFFFF",
    "alinhamento": "center",
    "posicao_vertical": "84% da altura",
    "espacamento_letras": "0px"
  },
  "zonas": {
    "foto_area": "0% a 75%",
    "texto_area": "70% a 92%",
    "margem_seguranca_px": 150
  },
  "vibe": ["moderno", "editorial", "clean", "luminoso", "feminino", "close-up"]
}
```

```json
{
  "campanha": "Dois corações, um amor — Dia das Mães",
  "formato": { "largura_px": 3000, "altura_px": 4200, "dpi": 300, "orientacao": "retrato" },
  "foto": {
    "descricao": "Mãe morena e filha com cabelos ondulados, ambas usando roupas brancas/off-white, sentadas em sofá bege, abraçadas com olhos fechados. Postura acolhedora e emocional.",
    "joias_visiveis": ["ear cuff de cristais (mãe)", "colar tennis de cristais (mãe)", "anéis dourados", "pulseiras finas douradas", "colar fino com pingente (filha)", "pulseiras delicadas (filha)"],
    "enquadramento": "Plano médio-geral, as duas centralizadas, espaço no terço inferior para texto",
    "iluminacao": "Luz ambiente quente, difusa, atmosfera aconchegante"
  },
  "fundo": {
    "cor_dominante": "#EDE5D8",
    "descricao": "Interior residencial com cortinas creme ao fundo, sofá bege, tons quentes neutros"
  },
  "paleta": {
    "creme_ambiente": "#EDE5D8",
    "branco_roupa": "#F5F0EA",
    "dourado": "#C9A84C",
    "tom_quente_geral": "#D4B896",
    "texto": "#FFFFFF"
  },
  "overlay": {
    "tipo": "gradiente_linear",
    "direcao": "bottom-left",
    "inicio": "65% da altura",
    "cor": "#1A1208",
    "opacidade_maxima": 0.40
  },
  "texto_principal": {
    "conteudo": "Dois corações,",
    "fonte": "Montserrat",
    "variante": "Light (300)",
    "tamanho_relativo": "~7% da largura da peça",
    "cor": "#FFFFFF",
    "alinhamento": "left",
    "posicao_vertical": "80% da altura",
    "posicao_horizontal": "8% da largura",
    "espacamento_letras": "0px"
  },
  "texto_secundario": {
    "conteudo": "um amor",
    "fonte": "Great Vibes",
    "variante": "Regular — script cursivo",
    "tamanho_relativo": "~13% da largura da peça",
    "cor": "#FFFFFF",
    "alinhamento": "left",
    "posicao_vertical": "88% da altura",
    "posicao_horizontal": "8% da largura",
    "nota": "Linha 1 em sans-serif light + linha 2 em script — mesmo bloco, estilos alternados"
  },
  "zonas": {
    "foto_area": "0% a 82%",
    "texto_area": "78% a 95%",
    "alinhamento_texto": "inferior esquerdo",
    "margem_seguranca_px": 150
  },
  "vibe": ["emocional", "familiar", "amoroso", "Dia das Mães", "quente", "aconchegante"]
}
```

```json
{
  "campanha": "Personalize — o seu colar e leve sua história com você",
  "formato": { "largura_px": 3000, "altura_px": 4500, "dpi": 300, "orientacao": "retrato" },
  "foto": {
    "descricao": "Close no pescoço e busto de modelo usando blusa malva/bordô com bolinhas. Mãos tocando os colares, múltiplos colares dourados sobrepostos — colar herringbone, corrente box, colar tennis de cristais e colar barra personalizado gravado.",
    "joias_visiveis": ["colar herringbone dourado", "corrente box dourada", "colar tennis cristais", "colar barra personalizado 'ANTONELLA'", "anéis dourados volumosos"],
    "enquadramento": "Close extremo do pescoço/busto, sem mostrar rosto, joias em primeiro plano",
    "iluminacao": "Luz quente direta, pele e dourado em destaque máximo"
  },
  "fundo": {
    "cor_dominante": "#8B4A5C",
    "descricao": "Tecido malva/bordô com textura de bolinhas sutis — roupa da modelo como fundo dominante"
  },
  "paleta": {
    "malva_bordô": "#8B4A5C",
    "dourado_quente": "#C9A84C",
    "pele": "#E8B896",
    "texto": "#FFFFFF"
  },
  "overlay": {
    "tipo": "gradiente_linear",
    "direcao": "bottom",
    "inicio": "62% da altura",
    "cor": "#2A0E18",
    "opacidade_maxima": 0.55
  },
  "texto_principal": {
    "conteudo": "Personalize",
    "fonte": "Cormorant Garamond",
    "variante": "Regular (400)",
    "tamanho_relativo": "~17% da largura da peça",
    "cor": "#FFFFFF",
    "alinhamento": "center",
    "posicao_vertical": "76% da altura",
    "espacamento_letras": "0px"
  },
  "texto_secundario": {
    "conteudo": "o seu colar e leve sua história com você!",
    "fonte": "Montserrat",
    "variante": "Light (300)",
    "tamanho_relativo": "~4% da largura da peça",
    "cor": "#FFFFFF",
    "alinhamento": "center",
    "posicao_vertical": "86% da altura",
    "espacamento_letras": "1px"
  },
  "zonas": {
    "foto_area": "0% a 78%",
    "texto_area": "73% a 93%",
    "margem_seguranca_px": 150
  },
  "vibe": ["quente", "pessoal", "íntimo", "maximalista controlado", "fashion", "dourado intenso"]
}
```

---

## O que funciona bem

- **Hierarquia tipográfica em dois pesos**: headline display grande (serif ou bold) + tagline em light/script
- **Texto sempre na parte inferior** (1/3 inferior da peça), nunca competindo com o produto
- **Paleta contida**: máximo 2 cores de texto (branco + dourado, ou preto + creme)
- **Muito espaço negativo** — o produto/modelo respira, o layout não é carregado
- **Blend de fontes**: mistura de serif elegante com sans-serif moderno é a marca registrada
- **A foto do usuário é sempre o fundo** — full bleed com overlay escuro no rodapé
- Taglines curtas com pontuação elegante (ponto final, travessão, &)

---

## O que nunca incluir

- Nome de produto, preço, código, SKU
- Site, Instagram, WhatsApp, redes sociais
- Slogan da Piuka
- Instruções de cuidado ou material
- Elementos de verso (só existe frente)

---

## Estrutura do JSON de saída

O JSON gerado deve ter sempre estes campos para o Freepik renderizar corretamente:

```json
{
  "campanha": "Nome da campanha",
  "formato": { "largura_px": 3000, "altura_px": 4500, "dpi": 300, "orientacao": "retrato" },
  "imagem_fundo": {
    "origem": "foto enviada pelo usuário no chat",
    "instrucao": "usar a foto exatamente como enviada, sem alterações no enquadramento"
  },
  "overlay": {
    "tipo": "gradiente_linear",
    "direcao": "bottom",
    "inicio": "[X]% da altura",
    "cor": "#[hex escuro compatível com a paleta da foto]",
    "opacidade_maxima": 0.45
  },
  "texto_principal": {
    "conteudo": "[headline]",
    "fonte": "[Cormorant Garamond / Playfair Display / EB Garamond]",
    "variante": "[Regular 400 / Bold 700]",
    "tamanho_relativo": "~[15-20]% da largura da peça",
    "cor": "#FFFFFF",
    "alinhamento": "center",
    "posicao_vertical": "[73-80]% da altura",
    "espacamento_letras": "[0 a -1px]"
  },
  "texto_secundario": {
    "conteudo": "[tagline]",
    "fonte": "[Montserrat / Great Vibes / Sacramento]",
    "variante": "[Light 300 / script]",
    "tamanho_relativo": "~[4-8]% da largura da peça",
    "cor": "#FFFFFF",
    "alinhamento": "center",
    "posicao_vertical": "[83-88]% da altura",
    "espacamento_letras": "[1-3px]"
  },
  "zonas": {
    "foto_area": "0% a [75-82]%",
    "texto_area": "[70-78]% a 95%",
    "margem_seguranca_px": 150
  }
}
```

---

## Notas de impressão

- **Resolução**: sempre 300 DPI
- **Modo de cor**: CMYK (converter RGB para CMYK antes de enviar para gráfica)
- **Acabamento preferido**: laminação fosca
- **Sangria**: 3mm em todos os lados
- **Margem de segurança**: 5mm além da sangria para elementos importantes

---

## Notas de estilo

- O estilo visual Piuka é **luxo acessível**: sofisticado mas não frio, feminino mas não infantil
- Fontes aprovadas:
  - Serif display: Cormorant Garamond, Playfair Display, EB Garamond
  - Sans-serif: Montserrat Light/Regular, Raleway, Jost
  - Script: Great Vibes, Sacramento (uso pontual em taglines)
- Cores principais:
  - Dourado: `#C9A84C` ou `#B8973A`
  - Creme: `#FAF8F5`
  - Texto escuro: `#2C2A28`
  - Branco sobre foto: `#FFFFFF`