---
name: pvc
description: Gera JSON de design para material impresso PVC da Piuka — cartões, etiquetas e tags de produto. Tamanhos 10x15cm ou 21x15cm, 300 DPI. Use quando mencionar "PVC Piuka", "cartão PVC", "etiqueta Piuka", "tag de produto Piuka", "material impresso Piuka", "10x15", "21x15".
user-invocable: true
allowed-tools: [Read, Glob]
---

# Imagens Piuka — Material PVC (Impresso)

## Treino e referências
Antes de gerar qualquer peça, leia [skill-pvc.md](skill-pvc.md).
Ele contém exemplos aprovados, preferências de estilo e notas acumuladas pela equipe.

---

## Contexto

Material impresso em PVC: cartões de visita, etiquetas de produto, tags e panfletos. Dois tamanhos disponíveis — a skill pergunta qual antes de gerar.

**Especificações técnicas obrigatórias:**
- Unidade: **cm** (não px) — `"unit": "cm"` no JSON
- Resolução: **300 DPI** — `"dpi": 300` no JSON
- Sangria: **3 mm em todos os lados** — `"sangria_mm": 3` no JSON

---

## Tamanhos disponíveis

| Formato | Dimensão (cm) | Canvas com sangria | Uso típico |
|---------|--------------|---------------------|------------|
| `cartao_10x15` | 10×15 cm | 10.6×15.6 cm | Cartão de produto, etiqueta maior |
| `cartao_21x15` | 21×15 cm | 21.6×15.6 cm | Panfleto, cartão presentável, material de loja |

---

## Fontes obrigatórias — use APENAS estas três, nunca substitua

| Papel | Fonte | Pesos | Tamanho-base |
|-------|-------|-------|--------------|
| Display / títulos grandes | BD Megalona DEMO Personal Use | 400, 700 | 18–60pt |
| Interface / corpo / botões | Montserrat | 400, 600, 700, 800 | 8–24pt |
| Subtítulos / taglines | Glacial Indifference | 400, 700 | 10–30pt |

> Tamanhos em pt (pontos tipográficos) para material impresso.

---

## Paleta Piuka

| Token | Hex | Uso |
|-------|-----|-----|
| `branco` | `#FFFFFF` | Fundo clean |
| `rosa_piuka` | `#E91E63` | Destaques femininos |
| `dourado` | `#D4AF37` | Elementos premium |
| `texto_padrao` | `#333333` | Texto corpo |
| `preto` | `#111111` | Headlines |

---

## Fluxo de trabalho

Faça **uma pergunta por vez**. Espere a resposta antes de avançar.

### Pergunta 1 — Tamanho
> "Qual é o tamanho do PVC? 10×15 cm ou 21×15 cm?"

### Pergunta 2 — Finalidade
> "O que é este material? (ex: 'cartão de produto', 'etiqueta de preço', 'tag de presente', 'panfleto de loja')"

### Pergunta 3 — Frente e verso
> "Vai ter frente e verso ou só frente?"

### Pergunta 4 — Copy
> "Qual é o conteúdo? (nome do produto, preço, código, QR code, informações da loja, etc.)"

### Pergunta 5 — Referências
> "Tem imagem de produto ou referência visual para usar?"

Com as respostas, gerar o JSON. Material PVC não gera prompt Freepik — gera JSON para uso em editor vetorial (Canva, Illustrator, Photoshop).

---

## Schema JSON obrigatório

```json
{
  "meta": {
    "template": "piuka_pvc_v1",
    "tipo": "material_impresso_pvc",
    "formato": "cartao_10x15 | cartao_21x15",
    "cliente": "Piuka",
    "finalidade": "[etiqueta | tag | panfleto | cartao_produto]",
    "data_entrega": "AAAA-MM-DD"
  },
  "canvas": {
    "largura_cm": 10,
    "altura_cm": 15,
    "largura_com_sangria_cm": 10.6,
    "altura_com_sangria_cm": 15.6,
    "unit": "cm",
    "dpi": 300,
    "sangria_mm": 3,
    "background_color": "#FFFFFF"
  },
  "tipografia": {
    "display": { "fonte": "BD Megalona DEMO Personal Use", "pesos": [400, 700] },
    "corpo": { "fonte": "Montserrat", "pesos": [400, 600, 700, 800] },
    "subtitulo": { "fonte": "Glacial Indifference", "pesos": [400, 700] }
  },
  "logo_piuka": "ausente — sem logo neste formato",
  "lados": {
    "frente": {
      "elementos": [
        {
          "id": "headline",
          "tipo": "texto",
          "conteudo": "[texto principal]",
          "fonte": "BD Megalona DEMO Personal Use",
          "peso": 700,
          "tamanho": "36pt",
          "cor": "#111111",
          "posicao": { "x": "1cm", "y": "4cm" },
          "alinhamento": "center"
        }
      ]
    },
    "verso": null
  },
  "obs_impressao": "Arquivo final deve incluir área de sangria de 3mm. Resolução mínima 300 DPI. Modo de cor CMYK recomendado para impressão."
}
```

---

## Checklist pré-entrega

- [ ] `unit: "cm"` presente no canvas — obrigatório
- [ ] `dpi: 300` presente — obrigatório
- [ ] `sangria_mm: 3` presente — obrigatório
- [ ] Dimensões com sangria calculadas corretamente (+0.6cm em cada dimensão)
- [ ] Fontes usam apenas as 3 aprovadas
- [ ] Todos os hex dentro da paleta Piuka
- [ ] `obs_impressao` com instrução de CMYK e sangria

---

## Erros comuns

| Erro | Como evitar |
|------|-------------|
| Usar px em vez de cm | Material impresso sempre `"unit": "cm"` |
| Esquecer sangria | Sempre somar 0.6cm em cada dimensão (3mm × 2 lados) |
| DPI abaixo de 300 | `"dpi": 300` obrigatório — impressão abaixo disso fica pixelada |
| Tamanho errado | Confirmar com a Ana: 10×15 ou 21×15 — não adivinhar |
| Fonte fora das 3 aprovadas | Só BD Megalona DEMO Personal Use, Montserrat, Glacial Indifference |