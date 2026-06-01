---
name: Campanhas
description: Gera JSON de design + prompt Freepik para campanhas de loja e disparo de WhatsApp da Piuka (1024x1536px, retrato). Use quando mencionar "campanha Piuka", "imagem WhatsApp Piuka", "disparo WhatsApp", "campanha de loja", "peça campanha Piuka", "imagem para disparar".
user-invocable: true
allowed-tools: [Read, Glob]
---

# Imagens Piuka — Campanhas (WhatsApp + Loja)

## Treino e referências
Antes de gerar qualquer peça, leia [skill-campanhas.md](skill-campanhas.md).
Ele contém exemplos aprovados, preferências de estilo e notas acumuladas pela equipe.

---

## Contexto

Peças verticais para disparo de WhatsApp e campanhas de loja física. Dimensão fixa: **1024×1536 px** (proporção 2:3).

**Regra:** sem logo Piuka — assim como os outros formatos, a logo não é inserida na imagem.

Otimizadas para leitura rápida em tela de celular: CTA grande, hierarquia clara, contraste alto. Sem logo na imagem.

---

## Fontes obrigatórias — use APENAS estas três, nunca substitua

| Papel | Fonte | Pesos | Tamanho-base |
|-------|-------|-------|--------------|
| Display / títulos grandes | BD Megalona DEMO Personal Use | 400, 700 | 72–140px |
| Interface / corpo / botões | Montserrat | 400, 600, 700, 800 | 16–48px |
| Subtítulos / taglines | Glacial Indifference | 400, 700 | 28–56px |

---

## Paleta Piuka

| Token | Hex | Uso |
|-------|-----|-----|
| `branco` | `#FFFFFF` | Fundo clean, texto sobre fundo escuro |
| `rosa_piuka` | `#E91E63` | CTAs, destaques femininos |
| `dourado` | `#D4AF37` | CTAs premium, coleções especiais |
| `texto_padrao` | `#333333` | Texto corpo |
| `neutro_foto` | `#F4F2F0` | Fundo fotográfico |
| `preto` | `#111111` | Headlines, títulos |

---

## Fluxo de trabalho

Faça **uma pergunta por vez**. Espere a resposta antes de avançar.

### Pergunta 1 — Campanha/oferta
> "Qual é a campanha ou oferta? (ex: '20% OFF Toda Loja', 'Mês das Mães', 'Lançamento Coleção Verão')"

### Pergunta 2 — Copy principal
> "Qual é o headline e o subtítulo? (se não tiver, vou sugerir com base no tema)"

### Pergunta 3 — CTA
> "Qual é o texto do botão/CTA? (ex: 'Aproveitar Agora', 'Ver Coleção', 'Comprar')"

### Pergunta 4 — Produto destaque
> "Tem produto específico para destacar ou é campanha geral? Tem imagem de referência?"

### Pergunta 5 — Validade
> "A campanha tem data de validade? (ex: 'Válido até 31/05')"

Com as respostas, gerar o JSON e o prompt Freepik.

---

## Schema JSON obrigatório

```json
{
  "meta": {
    "template": "piuka_campanha_v1",
    "tipo": "campanha_whatsapp_loja",
    "cliente": "Piuka",
    "campanha": "[nome da campanha]",
    "validade": "[data] | null",
    "data_entrega": "AAAA-MM-DD"
  },
  "canvas": {
    "width": 1024,
    "height": 1536,
    "background_color": "#F4F2F0"
  },
  "tipografia": {
    "display": { "fonte": "BD Megalona DEMO Personal Use", "pesos": [400, 700] },
    "corpo": { "fonte": "Montserrat", "pesos": [400, 600, 700, 800] },
    "subtitulo": { "fonte": "Glacial Indifference", "pesos": [400, 700] }
  },
  "copy": {
    "headline": "[texto principal]",
    "subtitulo": "[subtítulo] | null",
    "cta": "[texto do botão]",
    "validade": "[texto de validade] | null"
  },
  "elementos": [
    {
      "id": "headline",
      "tipo": "texto",
      "conteudo": "[headline]",
      "fonte": "BD Megalona DEMO Personal Use",
      "peso": 700,
      "tamanho": "96px",
      "cor": "#111111",
      "posicao": { "x": "512px", "y": "700px" },
      "alinhamento": "center"
    },
    {
      "id": "subtitulo",
      "tipo": "texto",
      "conteudo": "[subtítulo]",
      "fonte": "Glacial Indifference",
      "peso": 400,
      "tamanho": "36px",
      "cor": "#333333",
      "posicao": { "x": "512px", "y": "820px" },
      "alinhamento": "center"
    },
    {
      "id": "cta_botao",
      "tipo": "botao",
      "conteudo": "[CTA]",
      "fonte": "Montserrat",
      "peso": 700,
      "tamanho": "22px",
      "cor_texto": "#FFFFFF",
      "cor_fundo": "#E91E63",
      "posicao": { "x": "512px", "y": "980px" },
      "padding": "18px 60px"
    },
    {
      "id": "validade",
      "tipo": "texto",
      "conteudo": "[validade] | null",
      "fonte": "Montserrat",
      "peso": 400,
      "tamanho": "14px",
      "cor": "#333333",
      "posicao": { "x": "512px", "y": "1480px" },
      "alinhamento": "center"
    }
  ],
  "imagens_referencia": [],
  "prompt_freepik_gerado": "[string final]"
}
```

---

## Regras de composição para 1024×1536 (retrato)

- **Zona superior (0–400px):** foto de produto/modelo ocupando o topo
- **Zona média (400–1100px):** headline + subtítulo + CTA — esta é a área de leitura rápida
- **Zona inferior (1100–1536px):** informações secundárias, validade, @piuka
- **CTA:** botão largo, mínimo 400px de largura, bem visível em celular
- **Sem logo** nesta peça

---

## Checklist pré-entrega

- [ ] `canvas.width: 1024` e `canvas.height: 1536` — obrigatório
- [ ] `logo_piuka` marcado como `"ausente"` — nunca inserir
- [ ] Todos os hex dentro da paleta Piuka
- [ ] Fontes usam apenas as 3 aprovadas
- [ ] CTA presente e legível (mínimo 20px, cor contrastante)
- [ ] Prompt Freepik sem variáveis `[XXX]` não preenchidas

---

## Erros comuns

| Erro | Como evitar |
|------|-------------|
| Canvas errado (ex: 1080x1080) | `width: 1024, height: 1536` é obrigatório |
| CTA pequeno | Mínimo 20px, padding generoso — leitura em celular |
| Qualquer texto ou símbolo de marca na imagem | Incluir explicitamente no prompt: "no logo, no brand mark, no watermark, no text other than the design layers" |
| Validade esquecida | Perguntar na Pergunta 5 — se houver, sempre incluir |
