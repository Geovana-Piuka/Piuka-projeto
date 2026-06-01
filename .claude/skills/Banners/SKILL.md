---
name: Banners
description: Gera JSON de design + prompt Freepik para banners do site Piuka (1920x560px). Use quando mencionar "banner Piuka", "banner do site", "banner 1920", "banner header", "banner home Piuka".
user-invocable: true
allowed-tools: [Read, Glob]
---

# Imagens Piuka — Banners do Site

## Treino e referências
Antes de gerar qualquer peça, leia [skill-banner.md](skill-banner.md).
Ele contém exemplos aprovados, preferências de estilo e notas acumuladas pela equipe.

---

## Contexto

Banners para o site Piuka (e-commerce de semijoias). Dimensão fixa: **1920×560 px**.

**Regra crítica:** banners do site **não levam logo da Piuka** — o header do site já exibe a logo. Nunca inserir logo no JSON nem no prompt Freepik.

---

## Fontes obrigatórias — use APENAS estas três, nunca substitua

| Papel | Fonte | Pesos | Tamanho-base |
|-------|-------|-------|--------------|
| Display / títulos grandes | BD Megalona DEMO Personal Use | 400, 700 | 80–180px |
| Interface / corpo / botões | Montserrat | 400, 600, 700, 800 | 14–48px |
| Subtítulos / taglines | Glacial Indifference | 400, 700 | 28–64px |

---

## Paleta Piuka

| Token | Hex | Uso |
|-------|-----|-----|
| `branco` | `#FFFFFF` | Fundo clean, texto sobre foto escura |
| `rosa_piuka` | `#E91E63` | CTAs, destaques femininos |
| `dourado` | `#D4AF37` | CTAs premium, coleções especiais |
| `texto_padrao` | `#333333` | Texto corpo |
| `neutro_foto` | `#F4F2F0` | Fundo fotográfico |
| `preto` | `#111111` | Headlines, títulos |

---

## Fluxo de trabalho

Faça **uma pergunta por vez**. Espere a resposta antes de avançar.

### Pergunta 1 — Tema/campanha
> "Qual é o tema deste banner? (ex: 'Coleção Religiosa', 'Sale 20% OFF', 'Lançamento Verão')"

### Pergunta 2 — Copy principal
> "Qual é o texto principal do banner? (headline + subtítulo/tagline, se houver)"

### Pergunta 3 — CTA
> "Tem botão de CTA? Se sim, qual é o texto? (ex: 'Ver Coleção', 'Comprar Agora')"

### Pergunta 4 — Referências visuais
> "Tem imagens de produto ou modelo para usar como referência?"

Com as respostas, gerar o JSON e o prompt Freepik.

**Regra de entrega:** nunca salvar o JSON em arquivo. Sempre exibir o JSON completo diretamente no chat, dentro de um bloco de código ```json, para que o usuário possa copiar e colar.

---

## Schema JSON obrigatório

```json
{
  "meta": {
    "template": "piuka_banner_v1",
    "tipo": "banner_site",
    "cliente": "Piuka",
    "campanha": "[nome da campanha]",
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
    "headline": "[texto principal]",
    "subtitulo": "[subtítulo ou tagline] | null",
    "cta": "[texto do botão] | null"
  },
  "elementos": [
    {
      "id": "headline",
      "tipo": "texto",
      "conteudo": "[headline]",
      "fonte": "BD Megalona DEMO Personal Use",
      "peso": 700,
      "tamanho": "120px",
      "cor": "#111111",
      "posicao": { "x": "200px", "y": "200px" },
      "alinhamento": "left"
    },
    {
      "id": "subtitulo",
      "tipo": "texto",
      "conteudo": "[subtítulo]",
      "fonte": "Glacial Indifference",
      "peso": 400,
      "tamanho": "36px",
      "cor": "#333333",
      "posicao": { "x": "200px", "y": "340px" },
      "alinhamento": "left"
    },
    {
      "id": "cta_botao",
      "tipo": "botao",
      "conteudo": "[texto CTA]",
      "fonte": "Montserrat",
      "peso": 700,
      "tamanho": "18px",
      "cor_texto": "#FFFFFF",
      "cor_fundo": "#E91E63",
      "posicao": { "x": "200px", "y": "420px" },
      "padding": "14px 40px"
    }
  ],
  "imagens_referencia": [],
  "prompt_freepik_gerado": "[string final]"
}
```

---

## Regras de composição para banners 1920×560

- **Proporção wide (3.4:1):** texto sempre em uma faixa lateral (esquerda ou direita), foto ocupa a outra metade
- **Área de texto:** 600–800px de largura, centralizada verticalmente (±280px do topo)
- **Área de foto:** produto ou modelo no lado oposto ao texto, com margem de 80px das bordas
- **Hierarquia:** headline → subtítulo → CTA, espaçamento mínimo 24px entre elementos
- **SEM logo:** nunca inserir logo Piuka no banner do site

---

## Checklist pré-entrega

- [ ] `canvas.width: 1920` e `canvas.height: 560` — obrigatório
- [ ] `logo_piuka` marcado como `"ausente"` — nunca inserir
- [ ] Todos os hex dentro da paleta Piuka
- [ ] Fontes usam apenas as 3 aprovadas (BD Megalona, Montserrat, Glacial Indifference)
- [ ] Prompt Freepik não menciona logo Piuka
- [ ] Prompt Freepik sem variáveis `[XXX]` não preenchidas

---

## Erros comuns

| Erro | Como evitar |
|------|-------------|
| Inserir logo no banner | Regra fixa: banners do site não têm logo — o header do site já tem |
| Canvas errado (ex: 1080x1080) | `width: 1920, height: 560` é obrigatório — sempre validar |
| Texto muito pequeno para wide | Headline mínimo 80px; em banner 1920px texto pequeno se perde |
| Fonte fora das 3 aprovadas | Só BD Megalona DEMO Personal Use, Montserrat, Glacial Indifference |