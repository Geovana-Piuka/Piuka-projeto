---
name: imagens-piuka
description: Geração de JSONs de design + prompts Freepik para campanhas da Piuka — collab com influencer, stories, flatlay de produto e editorial single. Use sempre que o usuário mencionar "imagem Piuka", "JSON Piuka", "criativo Piuka", "gerar peça Piuka", "arte da campanha Piuka", "imagem da Jade Seba", "imagem da Nat Mosca", "flatlay Piuka", "story Piuka" ou ao executar o pacote de imagens declarado no briefing mensal (seção 2.5C).
user-invocable: true
allowed-tools: [Read, Glob]
---

# Imagens Piuka — JSON de design + prompt Freepik por peça

## Contexto

Piuka é e-commerce de semijoias baseado em Ribeirão Preto. Diretora de marketing: Ana Beatriz. Cada campanha mensal (gerada via `/briefing-piuka`) declara um pacote de peças visuais — collabs com influencers (Jade Seba, Nat Mosca e outras), stories de live, flatlays de produto e editoriais single atemporais.

Esta skill gera, por peça declarada no briefing:

1. Um **JSON de design** completo e reutilizável (fonte da verdade).
2. Um **prompt Freepik** derivado do JSON (pronto pra colar).

**Logos ficam fora do JSON.** A skill só marca o slot (posição + largura máxima). Ana ou Geovana anexam logo da Piuka e da influencer manualmente no Freepik depois que a imagem for gerada.

**Escopo:** só imagens. HTMLs de e-mail não entram aqui.

---

## Arquitetura híbrida

| Camada | O que é | Quem usa |
|--------|---------|----------|
| JSON de design | Estrutura de verdade — paleta hex, tipografia exata, posições, copy, slots de logo | Skill (output), Ana/Geovana (revisão), design manual futuro |
| Prompt Freepik | String textual derivada do JSON | Ana/Geovana colam direto no Freepik |
| Logos (Piuka + influencer) | PNG/SVG anexados ao Freepik como **imagem de referência** antes do render | Ana/Geovana — fora do JSON, dentro do prompt como instrução explícita |

O JSON é sempre gerado primeiro. O prompt Freepik é derivado dele.

**Regra crítica sobre logos:** a logo Piuka nunca deve ser renderizada pelo Freepik como texto — sempre anexar o PNG isolado da logo ao prompt e dizer no texto do prompt para usar a imagem anexada como referência visual no slot. Se o prompt falar só "deixar slot vazio para anexar depois", o Freepik invariavelmente preenche com texto fake (ex: "PIUKA", "Piuka Signature"). Para evitar isso:

1. O prompt Freepik **deve** conter a frase literal: `referência visual da logo Piuka aqui — usar a imagem anexada, não gerar texto`.
2. O mesmo vale para a assinatura handwritten da influencer quando existir (ex: `referência visual da assinatura de [nome] aqui — usar a imagem anexada`).
3. No Freepik, anexar os PNGs das logos como referências antes de rodar o prompt.

---

## Famílias de template

Quatro famílias cobrem todas as peças observadas nas referências reais da marca.

| Família | Proporção(ões) | Quando usar | Exemplo real |
|---------|----------------|-------------|--------------|
| `collab_panels` | 1:1, 16:9 | Campanha com influencer — 1, 2 ou 3 painéis colados (parâmetro `paineis`) | Jade Seba x Piuka triptych, Nat Mosca x Piuka diptych, Super Lançamento, Gold & Silver |
| `story_9x16` | 9:16 | Story de evento/live/lançamento com influencer vertical | "Live de Lançamento / É hoje às 19h / @piuka" |
| `produto_flatlay_4x5` | 4:5 | Peça de produto sem influencer — tipografia serif grande, flatlay | "15% OFF Coleção Religiosa" |
| `single_1x1_editorial` | 1:1 | Influencer single shot editorial, texto empilhado repetido, atemporal | "RIVIERAS RIVIERAS RIVIERAS — clássicas e atemporais" |

---

## Sistema visual Piuka

Validado contra piuka.com.br e 8 referências reais de campanha. Paleta fixa — nenhuma peça sai da paleta.

### Paleta (tokens hex)

| Token | Hex | Uso |
|-------|-----|-----|
| `branco` | `#FFFFFF` | Fundo limpo, peças produto, stories clean |
| `rosa_piuka` | `#E91E63` | Coração do logo, CTA pink, destaques femininos |
| `dourado` | `#D4AF37` | CTAs premium, coleções especiais, "SHOP NOW" |
| `texto_padrao` | `#333333` | Texto corpo |
| `neutro_foto` | `#F4F2F0` | Fundo fotográfico cinza claro (triptychs, diptychs) |
| `preto` | `#111111` | Headlines, handwritten, títulos |
| `lilas_suave` | `#E8E6F0` | Fundo alternativo trio influencer |

### Tipografia

**Fontes obrigatórias — use APENAS estas três, nunca substitua:**

| Papel | Fonte | Pesos | Tamanho-base |
|-------|-------|-------|--------------|
| Display / títulos grandes | BD Megalona DEMO Personal Use | 400, 700 | 72–160px |
| Interface / corpo / botões | Montserrat | 400, 600, 700, 800 | 14–64px |
| Subtítulos / taglines | Glacial Indifference | 400, 700 | 28–72px |

### Regras de CTA

- **Outline preto**: texto `#111111` em fundo claro com border `1.5px solid #111111`, padding `12px 32px`. Uso: CTAs neutros, triptychs.
- **Sólido rosa**: fundo `#E91E63`, texto `#FFFFFF`, border-radius `0`. Uso: CTAs de coleção pink, "QUERO CONHECER AGORA".
- **Dourado**: fundo `#D4AF37`, texto `#FFFFFF`. Uso: lançamentos premium, "SHOP NOW".
- **Underline**: texto `#FFFFFF` ou `#111111` sublinhado. Uso: CTAs discretos em peças produto.

---

## Fluxo de trabalho

A skill assume que o briefing mensal (Sub-Bloco 4D + seção 2.5C) já está preenchido com TODA
a copy e metadados de cada peça. A skill não pergunta headline/handwritten/CTA — só lê da tabela.

```
1. Ana chama a skill com referência à peça: "gera a peça 1 do briefing de maio"
2. Skill lê a linha N da tabela 2.5C em:
   clientes/ativos/leonardo_piuka/implementacao/briefing_[mes][ano].md
3. Skill pede à Ana (se ainda não enviou no chat) as imagens de referência:
   • Fotos da influencer (as mesmas que Ana subiu no Freepik)
   • Logo Piuka isolada (PNG fundo branco)
   • Assinatura handwritten da influencer (PNG, se houver)
4. Skill CATEGORIZA as imagens recebidas com IDs:
   • imagem_ref_1, imagem_ref_2, imagem_ref_3... (fotos da influencer, na ordem enviada)
   • logo_piuka (PNG da logo)
   • assinatura_influencer (se enviada)
   Mapear cada ID ao papel descrito no briefing (painel esquerdo, central, direito, etc).
5. Gerar JSON de design completo preenchendo imagens_referencia[] com os IDs categorizados
6. Derivar prompt Freepik que CITA os IDs explicitamente:
   "usar imagem_ref_1 no painel esquerdo, imagem_ref_2 no central, imagem_ref_3 no direito.
    Inserir logo_piuka no centro meio. Inserir assinatura_influencer acima da logo."
7. Validar contra checklist pré-entrega
8. Entregar inline no chat:
   - JSON completo (bloco ```json```)
   - Prompt Freepik (bloco ```text```)
   - Instrução: "No Freepik, anexe as mesmas imagens que me enviou + rode o prompt.
     O Freepik vai posicionar cada referência no slot correspondente."
9. Registrar no log_entregas.md do cliente
```

**Regra crítica de imagens:**
As fotos da influencer que Ana usa no Freepik são EXATAMENTE as mesmas que ela envia no chat.
Sem isso, a skill não consegue categorizar e o prompt vira genérico.
Se Ana esquecer de enviar, PEDIR antes de gerar o JSON — nunca inventar.

---

## Árvore de decisão de família

```
A PEÇA TEM INFLUENCER?
│
├── SIM
│   │
│   ├── É VERTICAL 9:16? (story, live, convite)
│   │   └── → story_9x16
│   │
│   ├── É SINGLE SHOT EDITORIAL? (1 pose, texto empilhado repetido)
│   │   └── → single_1x1_editorial
│   │
│   └── É COLLAB COM PAINÉIS COLADOS? (2-3 painéis)
│       └── → collab_panels (com paineis: 2 ou 3)
│
└── NÃO (só produto)
    └── → produto_flatlay_4x5
```

---

## Schema JSON base

Todo JSON gerado pela skill segue este schema. Campos obrigatórios sem valor = erro de validação.

```json
{
  "meta": {
    "template": "piuka_v1",
    "familia": "collab_panels | story_9x16 | produto_flatlay_4x5 | single_1x1_editorial",
    "formato": "1:1 | 4:5 | 9:16 | 16:9",
    "cliente": "Piuka",
    "campanha": "[nome da campanha do briefing]",
    "influencer": "[nome] | null",
    "data_entrega": "AAAA-MM-DD"
  },
  "canvas": {
    "width": 1080,
    "height": 1080,
    "background_color": "#F4F2F0"
  },
  "paleta": {
    "branco": "#FFFFFF",
    "rosa_piuka": "#E91E63",
    "dourado": "#D4AF37",
    "texto_padrao": "#333333",
    "neutro_foto": "#F4F2F0",
    "preto": "#111111",
    "lilas_suave": "#E8E6F0"
  },
  "tipografia": {
    "display": { "fonte": "BD Megalona DEMO Personal Use", "pesos": [400, 700] },
    "corpo": { "fonte": "Montserrat", "pesos": [400, 600, 700, 800] },
    "subtitulo": { "fonte": "Glacial Indifference", "pesos": [400, 700] }
  },
  "paineis": 3,
  "logo_piuka_slot": {
    "posicao": "painel_central_meio",
    "largura_max_px": 180,
    "obs": "anexar no Freepik após render"
  },
  "logo_influencer_slot": {
    "posicao": "painel_central_acima_piuka",
    "largura_max_px": 160,
    "obs": "anexar no Freepik como imagem de referência"
  },
  "imagens_referencia": [
    {
      "id": "imagem_ref_1",
      "descricao": "Ariane Cânovas — pose frontal, ombros descobertos, mão tocando o pescoço",
      "papel": "painel_esquerdo"
    },
    {
      "id": "imagem_ref_2",
      "descricao": "Ariane Cânovas — frontal, mãos cruzadas no peito, destaque dos colares",
      "papel": "painel_central"
    },
    {
      "id": "imagem_ref_3",
      "descricao": "Ariane Cânovas — 3/4, olhando para o lado, cabelo ao vento",
      "papel": "painel_direito"
    },
    {
      "id": "logo_piuka",
      "descricao": "Logo Piuka oficial, PNG isolado em fundo branco",
      "papel": "slot_logo_piuka"
    },
    {
      "id": "assinatura_influencer",
      "descricao": "Assinatura handwritten 'Ariane Cânovas' (ou null se não houver PNG)",
      "papel": "slot_assinatura_influencer"
    }
  ],
  "copy": {
    "headline": "[texto principal]",
    "handwritten": "[texto handwritten] | null",
    "cta": "[texto do CTA] | null",
    "disclaimer": "[texto disclaimer] | null"
  },
  "elementos": [
    {
      "id": "headline_collab",
      "tipo": "texto",
      "conteudo": "Jade Seba x Piuka",
      "fonte": "Glacial Indifference",
      "peso": 700,
      "tamanho": "64px",
      "cor": "#111111",
      "posicao": { "x": "540px", "y": "500px" },
      "alinhamento": "center"
    }
  ],
  "assets_referencia": [
    "clientes/ativos/leonardo_piuka/recursos/referencias_visuais/01_jade_seba_triptych.png"
  ],
  "prompt_freepik_gerado": "[string final — ver seção Geração do prompt]"
}
```

### Campos obrigatórios por família

| Família | `paineis` | `logo_influencer_slot` | `copy.handwritten` | `copy.cta` | `copy.disclaimer` |
|---------|-----------|------------------------|--------------------|-----------| ------------------|
| `collab_panels` | obrigatório (1, 2 ou 3) | obrigatório | obrigatório | obrigatório | null |
| `story_9x16` | null | obrigatório | opcional | opcional | null |
| `produto_flatlay_4x5` | null | null | obrigatório | obrigatório | opcional |
| `single_1x1_editorial` | null | obrigatório | obrigatório | obrigatório | null |

---

## Blueprints por família

### 1. `collab_panels` — triptych/diptych/trio influencer

```json
{
  "meta": {
    "template": "piuka_v1",
    "familia": "collab_panels",
    "formato": "1:1",
    "cliente": "Piuka",
    "campanha": "Lançamento Jade Seba x Piuka",
    "influencer": "Jade Seba",
    "data_entrega": "2026-05-02"
  },
  "canvas": { "width": 1080, "height": 1080, "background_color": "#F4F2F0" },
  "paineis": 3,
  "logo_piuka_slot": { "posicao": "painel_central_meio", "largura_max_px": 180, "obs": "anexar no Freepik" },
  "logo_influencer_slot": { "posicao": "painel_central_acima_piuka", "largura_max_px": 160, "obs": "anexar no Freepik" },
  "copy": {
    "headline": "A COLLAB MAIS AGUARDADA",
    "handwritten": "Jade Seba x Piuka",
    "cta": "VER AGORA",
    "disclaimer": null
  },
  "elementos": [
    { "id": "handwritten_collab", "tipo": "texto", "conteudo": "Jade Seba x Piuka", "fonte": "Glacial Indifference", "peso": 700, "tamanho": "64px", "cor": "#111111", "posicao": { "x": "540px", "y": "580px" }, "alinhamento": "center" },
    { "id": "headline_support", "tipo": "texto", "conteudo": "A COLLAB MAIS AGUARDADA", "fonte": "Montserrat", "peso": 400, "tamanho": "16px", "cor": "#111111", "posicao": { "x": "540px", "y": "660px" }, "alinhamento": "center" },
    { "id": "cta_canto", "tipo": "texto", "conteudo": "VER AGORA", "fonte": "Montserrat", "peso": 700, "tamanho": "14px", "cor": "#FFFFFF", "posicao": { "x": "1020px", "y": "60px" }, "alinhamento": "right" }
  ]
}
```

### 2. `story_9x16` — story de live/evento/lançamento

```json
{
  "meta": {
    "template": "piuka_v1",
    "familia": "story_9x16",
    "formato": "9:16",
    "cliente": "Piuka",
    "campanha": "Live Jade Seba x Piuka",
    "influencer": "Jade Seba",
    "data_entrega": "2026-05-02"
  },
  "canvas": { "width": 1080, "height": 1920, "background_color": "#F4F2F0" },
  "paineis": null,
  "logo_piuka_slot": null,
  "logo_influencer_slot": { "posicao": "topo_centro", "largura_max_px": 200, "obs": "anexar no Freepik" },
  "copy": {
    "headline": "Live de Lançamento",
    "handwritten": "Jade Seba x Piuka",
    "cta": "É hoje às 19h",
    "disclaimer": null
  },
  "elementos": [
    { "id": "titulo_evento", "tipo": "texto", "conteudo": "Live de Lançamento", "fonte": "Montserrat", "peso": 700, "tamanho": "36px", "cor": "#111111", "posicao": { "x": "540px", "y": "140px" }, "alinhamento": "center" },
    { "id": "handwritten_collab", "tipo": "texto", "conteudo": "Jade Seba x Piuka", "fonte": "Glacial Indifference", "peso": 700, "tamanho": "56px", "cor": "#111111", "posicao": { "x": "540px", "y": "220px" }, "alinhamento": "center" },
    { "id": "info_horario", "tipo": "texto", "conteudo": "É hoje às 19h", "fonte": "Montserrat", "peso": 600, "tamanho": "28px", "cor": "#111111", "posicao": { "x": "540px", "y": "1780px" }, "alinhamento": "center" },
    { "id": "handle_instagram", "tipo": "texto", "conteudo": "@piuka", "fonte": "Montserrat", "peso": 400, "tamanho": "22px", "cor": "#111111", "posicao": { "x": "540px", "y": "1840px" }, "alinhamento": "center" }
  ]
}
```

### 3. `produto_flatlay_4x5` — peça de produto com tipografia grande

```json
{
  "meta": {
    "template": "piuka_v1",
    "familia": "produto_flatlay_4x5",
    "formato": "4:5",
    "cliente": "Piuka",
    "campanha": "Coleção Religiosa 15% OFF",
    "influencer": null,
    "data_entrega": "2026-03-16"
  },
  "canvas": { "width": 1080, "height": 1350, "background_color": "#F4F2F0" },
  "paineis": null,
  "logo_piuka_slot": null,
  "logo_influencer_slot": null,
  "copy": {
    "headline": "15% OFF",
    "handwritten": "Semijoias que expressam sua fé com elegância",
    "cta": "COLEÇÃO RELIGIOSA",
    "disclaimer": "Ação válida de 16.03.2026 até 22.03.2026 | Ou enquanto durarem os estoques"
  },
  "elementos": [
    { "id": "eyebrow", "tipo": "texto", "conteudo": "COLEÇÃO RELIGIOSA", "fonte": "Montserrat", "peso": 400, "tamanho": "22px", "cor": "#D4AF37", "posicao": { "x": "540px", "y": "900px" }, "alinhamento": "center" },
    { "id": "headline_grande", "tipo": "texto", "conteudo": "15% OFF", "fonte": "BD Megalona DEMO Personal Use", "peso": 900, "tamanho": "160px", "cor": "#D4AF37", "posicao": { "x": "540px", "y": "1030px" }, "alinhamento": "center" },
    { "id": "tagline", "tipo": "texto", "conteudo": "Semijoias que expressam sua fé com elegância", "fonte": "Glacial Indifference", "peso": 400, "tamanho": "30px", "cor": "#333333", "posicao": { "x": "540px", "y": "1180px" }, "alinhamento": "center" },
    { "id": "disclaimer", "tipo": "texto", "conteudo": "Ação válida de 16.03.2026 até 22.03.2026 | Ou enquanto durarem os estoques", "fonte": "Montserrat", "peso": 400, "tamanho": "10px", "cor": "#333333", "posicao": { "x": "40px", "y": "675px" }, "alinhamento": "left", "rotacao": -90 }
  ]
}
```

### 4. `single_1x1_editorial` — single shot editorial atemporal

```json
{
  "meta": {
    "template": "piuka_v1",
    "familia": "single_1x1_editorial",
    "formato": "1:1",
    "cliente": "Piuka",
    "campanha": "Rivieras Clássicas",
    "influencer": "Nat Mosca",
    "data_entrega": "2026-05-10"
  },
  "canvas": { "width": 1080, "height": 1080, "background_color": "#FFFFFF" },
  "paineis": null,
  "logo_piuka_slot": null,
  "logo_influencer_slot": { "posicao": "rodape_direita", "largura_max_px": 140, "obs": "anexar no Freepik" },
  "copy": {
    "headline": "RIVIERAS",
    "handwritten": "Clássicas e atemporais",
    "cta": "VER AGORA",
    "disclaimer": null
  },
  "elementos": [
    { "id": "headline_stack_1", "tipo": "texto", "conteudo": "RIVIERAS", "fonte": "Montserrat", "peso": 800, "tamanho": "72px", "cor": "#FFFFFF", "posicao": { "x": "720px", "y": "280px" }, "alinhamento": "left" },
    { "id": "headline_stack_2", "tipo": "texto", "conteudo": "RIVIERAS", "fonte": "Montserrat", "peso": 800, "tamanho": "72px", "cor": "#FFFFFF", "posicao": { "x": "720px", "y": "360px" }, "alinhamento": "left" },
    { "id": "headline_stack_3", "tipo": "texto", "conteudo": "RIVIERAS", "fonte": "Montserrat", "peso": 800, "tamanho": "72px", "cor": "#FFFFFF", "posicao": { "x": "720px", "y": "440px" }, "alinhamento": "left" },
    { "id": "headline_stack_4", "tipo": "texto", "conteudo": "RIVIERAS", "fonte": "Montserrat", "peso": 800, "tamanho": "72px", "cor": "#FFFFFF", "posicao": { "x": "720px", "y": "520px" }, "alinhamento": "left" },
    { "id": "tagline", "tipo": "texto", "conteudo": "Clássicas e atemporais", "fonte": "Glacial Indifference", "peso": 400, "tamanho": "34px", "cor": "#111111", "posicao": { "x": "720px", "y": "620px" }, "alinhamento": "left" },
    { "id": "cta", "tipo": "texto", "conteudo": "VER AGORA", "fonte": "Montserrat", "peso": 700, "tamanho": "16px", "cor": "#111111", "posicao": { "x": "720px", "y": "780px" }, "alinhamento": "left", "underline": true }
  ]
}
```

---

## Geração do prompt Freepik

Depois do JSON pronto, montar o prompt Freepik usando este template. A skill preenche as variáveis entre colchetes com valores do JSON.

### Template base

```
Editorial [FAMILIA_DESCRITIVA] [FORMATO] de campanha de semijoias Piuka. Fundo [BACKGROUND_COLOR_NOME] [BACKGROUND_HEX]. [DESCRICAO_COMPOSICAO]. Influencer: [INFLUENCER_DESC] (ou apenas flatlay de produto — colares/pulseiras/anéis em primeiro plano). Usar as imagens de referência anexadas ao prompt conforme os papéis abaixo: [MAPEAMENTO_IMAGENS_REF]. Tipografia: headline em [FONTE_HEADLINE] [PESO_HEADLINE] [TAMANHO_HEADLINE] cor [COR_HEADLINE] dizendo "[HEADLINE_TEXTO]"; handwritten cursivo em Glacial Indifference cor [COR_HANDWRITTEN] dizendo "[HANDWRITTEN_TEXTO]"; CTA em [ESTILO_CTA] dizendo "[CTA_TEXTO]". [POSICIONAMENTO_COPY]. Em [POSICAO_LOGO_PIUKA], inserir a logo Piuka usando a imagem de referência anexada (logo_piuka) — largura máxima [LARGURA_LOGO_PIUKA]px; não desenhar nem escrever a palavra "Piuka" à mão, usar exatamente a logo da imagem anexada[SLOT_LOGO_INFLUENCER]. Estética: premium, jovem, feminino, editorial limpo. Paleta restrita a #FFFFFF, #E91E63, #D4AF37, #333333, #F4F2F0, #111111. Sem outros textos, sem watermark, sem logos/assinaturas inventadas.
```

**Atenção ao operador:** antes de rodar este prompt no Freepik, anexe o PNG da logo Piuka (e, quando houver, o PNG da assinatura handwritten da influencer) como imagens de referência. Se anexar nada, o Freepik vai "chutar" e escrever a palavra PIUKA à mão ou inventar uma assinatura tipo "Piuka Signature" — foi exatamente o que aconteceu nas primeiras tentativas.

### Mapeamento de variáveis

| Variável | Origem no JSON | Exemplo |
|----------|----------------|---------|
| `FAMILIA_DESCRITIVA` | `meta.familia` traduzido | `collab_panels` → "triptych lado a lado" (se `paineis=3`), "diptych lado a lado" (se 2), "single" (se 1) |
| `FORMATO` | `meta.formato` | "1:1", "4:5", "9:16" |
| `BACKGROUND_COLOR_NOME` + `BACKGROUND_HEX` | `canvas.background_color` | "cinza neutro #F4F2F0" |
| `DESCRICAO_COMPOSICAO` | Inferido da família + paineis | "3 painéis colados com fotos da influencer em poses distintas, separados por espaços finos" |
| `INFLUENCER_DESC` | `meta.influencer` + pose inferida | "Jade Seba em pose editorial — ombros descobertos, mão tocando o pescoço, olhar para a câmera, usando colares e brincos Piuka" |
| `FONTE_HEADLINE` / `PESO_HEADLINE` / `TAMANHO_HEADLINE` / `COR_HEADLINE` | Primeiro elemento texto do tipo headline em `elementos` | "Montserrat peso 800 72px #FFFFFF" |
| `HEADLINE_TEXTO` | `copy.headline` | "RIVIERAS" |
| `HANDWRITTEN_TEXTO` | `copy.handwritten` | "Clássicas e atemporais" |
| `COR_HANDWRITTEN` | Elemento handwritten em `elementos` | "#111111" |
| `ESTILO_CTA` | Derivado de cor/fundo do CTA | "outline preto discreto no canto superior direito" \| "sublinhado preto" \| "botão sólido rosa #E91E63" |
| `CTA_TEXTO` | `copy.cta` | "VER AGORA" |
| `POSICIONAMENTO_COPY` | Derivado dos elementos | "copy centralizado no painel do meio" \| "copy alinhado à esquerda no terço superior" |
| `POSICAO_LOGO_PIUKA` + `LARGURA_LOGO_PIUKA` | `logo_piuka_slot` | "painel central meio, 180" |
| `SLOT_LOGO_INFLUENCER` | `logo_influencer_slot` ou vazio | " e, acima da Piuka, inserir a assinatura handwritten de [nome] usando a imagem de referência anexada (largura máxima 160px); não inventar uma assinatura" |

### Exemplo de prompt gerado (collab_panels Jade Seba)

```
Editorial triptych lado a lado 1:1 de campanha de semijoias Piuka. Fundo cinza neutro #F4F2F0. 3 painéis colados com fotos da influencer em poses distintas, separados por espaços finos. Influencer: Jade Seba em pose editorial — ombros descobertos, mão tocando o pescoço, olhar para a câmera, usando colares e brincos Piuka. Tipografia: headline em Montserrat peso 400 16px cor #111111 dizendo "A COLLAB MAIS AGUARDADA"; handwritten cursivo em Glacial Indifference cor #111111 dizendo "Jade Seba x Piuka"; CTA em outline preto discreto no canto superior direito dizendo "VER AGORA". Copy centralizado no painel do meio. No painel central meio, inserir a logo Piuka usando a imagem de referência anexada ao prompt — largura máxima 180px; não desenhar nem escrever a palavra "Piuka" à mão, usar exatamente a logo da imagem anexada. Acima da logo Piuka, inserir a assinatura handwritten de Jade Seba usando a imagem de referência anexada (largura máxima 160px); não inventar uma assinatura. Estética: premium, jovem, feminino, editorial limpo. Paleta restrita a #FFFFFF, #E91E63, #D4AF37, #333333, #F4F2F0, #111111. Sem outros textos, sem watermark, sem logos/assinaturas inventadas.
```

**Antes de rodar no Freepik:** anexar 2 imagens de referência — PNG da logo Piuka isolada em fundo branco + PNG da assinatura handwritten "Jade Seba" isolada em fundo branco.

---

## Checklist pré-entrega

Antes de entregar qualquer peça, validar:

- [ ] Todos os hex vêm da paleta Piuka fixa (nenhuma cor fora da lista)
- [ ] Todo elemento texto tem `fonte + peso + tamanho + cor`
- [ ] `canvas.width` e `canvas.height` batem com `meta.formato`
- [ ] `meta.campanha`, `meta.cliente`, `meta.data_entrega` preenchidos
- [ ] Para `collab_panels`: `paineis` é 1, 2 ou 3 — não null
- [ ] `logo_piuka_slot` marcado (quando a família exige) — posição + largura máxima
- [ ] `logo_influencer_slot` marcado (quando há influencer) — posição + largura máxima
- [ ] Nenhum arquivo de logo embutido no JSON — só slot
- [ ] Prompt Freepik contém a instrução literal `usando a imagem de referência anexada` em todo slot de logo — nunca "deixar slot vazio"
- [ ] Prompt Freepik contém a instrução `não desenhar nem escrever a palavra "Piuka" à mão`
- [ ] Instrução pós-entrega avisa o operador pra anexar o PNG da logo Piuka (e assinatura influencer quando aplicável) como imagem de referência no Freepik
- [ ] `copy.cta` presente quando a família exige (ver tabela de obrigatoriedade)
- [ ] `prompt_freepik_gerado` é string única, sem variáveis `[...]` não preenchidas
- [ ] `assets_referencia` aponta para arquivo existente no cliente (se aplicável)

---

## Erros comuns

| Erro | Consequência | Como evitar |
|------|--------------|-------------|
| Prompt dizendo "deixar slot vazio para anexar depois" | Freepik desenha "PIUKA" à mão ou inventa "Piuka Signature" no lugar | Sempre usar `inserir a logo Piuka usando a imagem de referência anexada`; nunca `slot vazio` isolado |
| Rodar prompt sem anexar o PNG da logo no Freepik | Freepik "chuta" e renderiza texto ou logo errada | Antes de rodar, anexar PNG da logo Piuka + assinatura influencer como imagens de referência |
| Gerar JSON sem receber as imagens da influencer de Ana no chat | Prompt Freepik sai genérico, Freepik inventa pose/styling | PEDIR as imagens antes de gerar. Sem imagens recebidas, não gerar JSON — perguntar "Ana, me manda as mesmas fotos que você subiu no Freepik". |
| Não categorizar as imagens recebidas com IDs (imagem_ref_1, imagem_ref_2...) | JSON sem rastreabilidade, prompt Freepik não sabe qual foto vai em qual painel | Sempre listar em `imagens_referencia[]` com id, descricao curta e papel no layout |
| Papel das imagens não bater com o briefing 2.5C | Triptych sai com foto errada em cada painel | Ler "Detalhamento por peça" da seção 2.5C e mapear exatamente como declarado por Ana |
| Logo embutido no JSON | Ana retrabalha, precisa editar arquivo | Sempre slot — nunca URL/path de logo |
| Cor fora da paleta (ex: rosa #FF4081 em vez de #E91E63) | Peça sai do padrão da marca | Checar paleta fixa antes de gerar |
| Handwritten em Montserrat | Perde identidade Piuka | Subtítulos/taglines sempre Glacial Indifference |
| `paineis` null em `collab_panels` | Prompt Freepik sai ambíguo | Obrigatório 1, 2 ou 3 |
| Prompt Freepik com variáveis `[XXX]` não preenchidas | Freepik gera lixo | Validar prompt antes de entregar |
| Disclaimer em fonte grande | Polui peça produto | Disclaimer sempre ≤10px, lateral ou rodapé |
| CTA ausente em peça de venda | Perde conversão | Validar obrigatoriedade por família |
| Influencer em peça `produto_flatlay_4x5` | Família errada | Flatlay = só produto. Com influencer → outra família |

---

## Situações comuns

**"Ana pediu 3 peças da Jade Seba em formatos diferentes."**
→ 1 `collab_panels` 1:1 (triptych) + 1 `story_9x16` (live) + 1 `single_1x1_editorial`. Três JSONs + três prompts Freepik. Todos com `meta.influencer: "Jade Seba"` e `meta.campanha` igual.

**"Peça de coleção sem influencer."**
→ `produto_flatlay_4x5`. `logo_influencer_slot: null`. Headline em serif (BD Megalona DEMO Personal Use) grande.

**"Briefing declarou só copy, não disse família."**
→ Rodar árvore de decisão: tem influencer? vertical? → escolher família. Explicitar no output qual família foi escolhida e por quê.

**"Influencer não está na lista de referências visuais."**
→ Gerar JSON mesmo assim. Em `prompt_freepik_gerado`, descrever a influencer genericamente ("mulher brasileira jovem, cabelo [cor], estilo [descrição]"). Flag no output: "⚠️ Sem referência visual de [nome] — Ana pode ajustar o prompt antes de colar no Freepik."

**"Ana pediu peça em formato não previsto (ex: 2:3)."**
→ Usar `formato: "2:3"` no meta, ajustar canvas, usar a família mais próxima. Flag no output: "⚠️ Formato 2:3 não é padrão — canvas ajustado, validar com Ana antes de render."

---

## Referências visuais reais

As 8 peças que serviram de base para os blueprints devem ser salvas em:

```
clientes/ativos/leonardo_piuka/recursos/referencias_visuais/
├── 01_jade_seba_triptych_1x1.png
├── 02_super_lancamento_diptych.png
├── 03_nat_mosca_diptych.png
├── 04_gold_silver_diptych.png
├── 05_rivieras_single_1x1.png
├── 06_nat_mosca_trio.png
├── 07_live_jade_seba_story_9x16.png
└── 08_colecao_religiosa_4x5.png
```

Geovana é responsável por manter este diretório atualizado sempre que uma peça real for aprovada. A skill usa estes arquivos em `assets_referencia` e como base para o prompt Freepik.

---

## Pós-entrega

Depois de entregar os JSONs + prompts, registrar no log do cliente:

```
clientes/ativos/leonardo_piuka/implementacao/log_entregas.md
```

Entrada: `[data] — Gerados [N] JSONs + prompts Freepik para campanha [nome]. Famílias: [lista]. Influencer(s): [lista].`

---

## Validação v1

Paleta e tipografia são v1 baseadas em piuka.com.br + 8 referências reais. Quando Ana preencher os campos `[CAMPO_ANA]` do `agente_especialista.md` com brand guide oficial, revisar a seção "Sistema visual Piuka" desta skill e atualizar os hex/fontes se divergirem.

---

## Treino e referências

Antes de gerar qualquer peça, leia [skill-social.md](skill-social.md).
Ele contém exemplos aprovados, preferências de estilo e notas acumuladas pela equipe para collab, stories, flatlay e editorial.

