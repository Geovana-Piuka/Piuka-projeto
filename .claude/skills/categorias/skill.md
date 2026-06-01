---
name: categorias
description: Gera JSON de design + prompt Freepik para banners de categoria do e-commerce Piuka (552x332px). Use quando o usuário enviar imagem de referência (produto ou modelo) + texto desejado para gerar banner de categoria. Exemplos de gatilho: "banner de categoria", "categoria Piuka", "imagem de categoria", "Em Alta", "Brincos", "Colares", "Coleções", "Elas Usam", "552x332".
user-invocable: true
allowed-tools: [Read, Glob]
---

# Imagens Piuka — Banners de Categoria (E-commerce)

## Treino e referências
Antes de gerar qualquer peça, leia [skill-categorias.md](skill-categorias.md).
Ele contém os exemplos aprovados, padrões visuais e notas de estilo da Piuka.

---

## Como o usuário vai te acionar

O usuário envia:
1. **Imagem de referência** — foto de produto (flatlay) OU foto de modelo usando a peça
2. **Texto desejado** — ex: "Em Alta", "Brincos", "Coleções"
3. **Instrução complementar** (quando a foto é de produto isolado) — ex: "coloque esse colar em um colo", "use em flatlay sobre tecido branco"

**Nunca perguntar pelo canvas** — é sempre **552×332px**, fixo e imutável.

---

## Regras críticas — sempre aplicar

| Regra | Valor |
|-------|-------|
| Canvas | **552×332px — fixo, nunca alterar** |
| Texto | **Canto inferior direito** — posição fixa |
| Texto | **Branco, caixa alta, sans-serif** (Montserrat Bold ou Glacial Indifference Bold) |
| Logo | **Ausente — proibida neste formato** |
| Overlay | **Suave ou inexistente** — foto clara, estilo editorial limpo |
| Fundo | **Tons neutros/quentes** — branco, bege, creme, marrom suave, pele |

---

## Fontes aprovadas

| Papel | Fonte | Peso |
|-------|-------|------|
| Texto principal (nome da categoria) | Montserrat | 700 (Bold) |
| Alternativa elegante | Glacial Indifference | 700 (Bold) |

> **Nota:** Neste formato de banner de categoria, o estilo visual usa sans-serif limpa.
> BD Megalona é reservada para peças maiores e mais elaboradas.

---

## Paleta Piuka

| Token | Hex | Uso |
|-------|-----|-----|
| `branco` | `#FFFFFF` | Texto — sempre |
| `rosa_piuka` | `#E91E63` | Destaque especial — raramente neste formato |
| `dourado` | `#D4AF37` | Detalhe se necessário |
| `neutro_foto` | `#F4F2F0` | Fundo quando sem foto |
| `preto` | `#111111` | Fundo escuro eventual |

---

## Fluxo de geração

### Passo 1 — Analisar o que o usuário enviou

**Com imagem de referência de modelo:**
- Identificar: tipo de enquadramento (colo, orelha, mãos, editorial), tom de cores, peças visíveis
- Manter o mesmo estilo e enquadramento no prompt Freepik

**Com imagem de produto isolado + instrução:**
- Usar a instrução para definir o contexto da foto (colo, flatlay, mão, etc.)
- Descrever o produto com precisão no prompt Freepik

**Sem imagem (só texto da categoria):**
- Consultar `skill-categorias.md` → seção "Preferências por categoria"
- Usar o estilo padrão documentado para aquela categoria

### Passo 2 — Gerar o JSON completo

### Passo 3 — Gerar o prompt Freepik dentro do JSON

---

## Schema JSON obrigatório

```json
{
  "meta": {
    "template": "piuka_categoria_v1",
    "tipo": "banner_categoria_ecommerce",
    "cliente": "Piuka",
    "categoria": "[nome da categoria / texto desejado]",
    "data_entrega": "AAAA-MM-DD"
  },
  "canvas": {
    "width": 552,
    "height": 332,
    "background_color": "#F4F2F0"
  },
  "tipografia": {
    "display": { "fonte": "Montserrat", "peso": 700, "alternativa": "Glacial Indifference" }
  },
  "logo_piuka": "ausente — banner de categoria não leva logo",
  "copy": {
    "texto_principal": "[texto exato que o usuário pediu — caixa alta]",
    "posicao_texto": "inferior direito",
    "cor_texto": "#FFFFFF"
  },
  "elementos": [
    {
      "id": "texto_categoria",
      "tipo": "texto",
      "conteudo": "[TEXTO EM CAIXA ALTA]",
      "fonte": "Montserrat",
      "peso": 700,
      "tamanho": "32px",
      "cor": "#FFFFFF",
      "posicao": { "x": "490px", "y": "305px" },
      "alinhamento": "right",
      "text_shadow": "none"
    }
  ],
  "foto_referencia": {
    "tipo": "[flatlay | close_colo | close_orelha | close_maos | editorial_modelo]",
    "descricao": "[descrição objetiva da foto de referência enviada pelo usuário]",
    "instrucao_usuario": "[instrução complementar do usuário, se houver]"
  },
  "overlay": {
    "ativo": false,
    "cor": "rgba(0,0,0,0)",
    "nota": "Estilo Piuka categorias é foto limpa sem overlay — aplicar só se o texto não tiver legibilidade"
  },
  "tamanho_imagem": "552x332px",
  "prompt_freepik_gerado": "[string final do prompt — ver regras abaixo]"
}
```

---

## Como construir o prompt Freepik

### Estrutura do prompt

```
[descrição do produto/cena] + [tipo de enquadramento] + [modelo/contexto se houver] + [paleta/tons] + [estilo fotográfico] + [instrução de texto tipográfico]
```

### Regras do prompt

- Descrever o produto com precisão (material, formato, cor, acabamento)
- Especificar o enquadramento (flatlay, close-up neckline, close-up ear, hands detail, editorial portrait)
- Incluir tons de cor do fundo/ambiente
- **O texto da categoria DEVE ser incluído no prompt** — o Freepik gera a imagem já com o texto, sem necessidade de ferramentas externas
- Sempre terminar com a instrução de tipografia: `with the word '[TEXTO EM CAIXA ALTA]' in Montserrat Bold font, white color, uppercase, positioned at the bottom right corner of the image, size 32px`

### Exemplos de prompts por tipo

**Flatlay:**
`flatlay of [descrever peças] on white linen fabric, soft natural diffused light, neutral clean background, luxury product photography, with the word '[CATEGORIA]' in Montserrat Bold font, white color, uppercase, positioned at the bottom right corner of the image, size 32px`

**Close de colo:**
`close-up of a young woman's neckline wearing [descrever peças], [descrever roupa], elegant pose, hand resting on chest, [tons de cor], luxury jewelry editorial photography, with the word '[CATEGORIA]' in Montserrat Bold font, white color, uppercase, positioned at the bottom right corner of the image, size 32px`

**Close de orelha:**
`extreme close-up of a woman's ear wearing [descrever brincos], [cor/tipo do cabelo], soft background, warm skin tones, luxury jewelry detail shot, with the word '[CATEGORIA]' in Montserrat Bold font, white color, uppercase, positioned at the bottom right corner of the image, size 32px`

**Editorial modelo:**
`elegant Brazilian woman wearing [descrever peças], [descrever roupa e ambiente], confident pose, [tons de cor], luxury jewelry lifestyle editorial, with the word '[CATEGORIA]' in Montserrat Bold font, white color, uppercase, positioned at the bottom right corner of the image, size 32px`

---

## Posicionamento do texto (referência de coordenadas)

Para canvas 552×332:
- **Texto inferior direito:** `x: 490px` (alinhamento right), `y: 305px`
- Margem da borda: ~30px direita, ~20px baixo
- Tamanho padrão do texto: **28–36px** dependendo do comprimento da palavra

---

## Checklist pré-entrega

- [ ] `canvas.width: 552` e `canvas.height: 332` — imutável
- [ ] Texto no **canto inferior direito**
- [ ] Texto em **caixa alta, branco**
- [ ] `logo_piuka` marcado como `"ausente"`
- [ ] Prompt Freepik **inclui instrução de tipografia** (Montserrat Bold, branco, inferior direito, 32px)
- [ ] Overlay `false` por padrão (foto editorial limpa)
- [ ] `foto_referencia.tipo` preenchido corretamente

---

## Erros comuns

| Erro | Como evitar |
|------|-------------|
| Canvas errado | `width: 552, height: 332` — fixo, nunca perguntar |
| Texto no centro ou topo | Posição fixa: inferior direito |
| Overlay pesado | Estilo Piuka é limpo — overlay só se absolutamente necessário |
| Logo inserida | Proibida — regra fixa |
| Texto em caixa baixa | Sempre caixa alta |
| Prompt sem instrução de texto | O texto DEVE estar no prompt — Freepik gera a imagem já com tipografia, sem ferramentas externas |