---
name: briefing-influenciadoras
description: >
  Gera briefings de conteúdo para influenciadoras parceiras da Piuka Semijoias em PDF, seguindo o padrão real dos briefings da marca. Conduz uma conversa estruturada para coletar nome, histórico, mix de produtos e campanha — depois gera o documento completo pronto para envio. Use quando o usuário mencionar "briefing influenciadora", "briefing influencer", "briefing para influencer Piuka", "montar briefing influencer", "criar briefing influencer".
trigger: >
  Acione esta skill quando o usuário mencionar "briefing influenciadora", "briefing influencer", "briefing para influencer", "montar briefing", "criar briefing influencer", ou qualquer variação que envolva gerar um documento de briefing de conteúdo para influenciadoras parceiras da Piuka.
---

# Skill: Briefings para Influenciadoras Piuka

## O que esta skill faz

Conduz uma conversa em blocos para coletar todas as informações necessárias e ao final gera um briefing completo em **PDF**, no padrão visual e editorial real da Piuka Semijoias, pronto para envio à influenciadora.

O fluxo é: coletar informações → preencher template HTML com os dados e imagens base64 → converter para PDF via WeasyPrint (Python).

---

## Passo 0 — Leitura das imagens (SEMPRE PRIMEIRO)

**Antes de rodar esta skill**, as fotos da influenciadora devem estar na pasta:
`.claude/skills/briefing-influenciadoras/imagens-briefing-influenciadoras/`

Para cada novo briefing: remova as fotos do briefing anterior e coloque as novas nessa pasta. A skill identifica automaticamente qual é capa, produto, editorial e detalhe pelo visual.

**Antes de fazer qualquer pergunta**, leia todas as imagens disponíveis nessa pasta.

Use Glob para listar os arquivos e depois leia cada imagem visualmente com Read.

**LOGO OBRIGATÓRIA:** Sempre leia e converta para base64 o arquivo `LogoPiuka-removebg-preview.png` desta pasta. Guarde internamente como `[BASE64_LOGO]` — será usado em 3 lugares no HTML (capa, rodapé pág 2, rodapé pág 3).

Para cada imagem encontrada, classifique internamente em uma das categorias:

| Categoria | Como identificar | Onde vai no briefing |
|-----------|-----------------|----------------------|
| **CAPA** | Foto da influenciadora sozinha, bem produzida | `[BASE64_FOTO_CAPA]` — fundo da página 1 |
| **PRODUTO** | Foto do produto isolado em fundo limpo/transparente | `[IMGS_PRODUTOS]` — coluna esquerda da página 2 |
| **EDITORIAL** | Influenciadora usando as peças, look completo | `[BASE64_FOTO_EDITORIAL]` — coluna direita da página 2 |
| **DETALHE** | Close no produto sendo usado (orelha, colo, pulso) | `[BASE64_FOTO_DETALHE]` — coluna direita da seção dúvidas |

Se não houver imagem DETALHE, use a EDITORIAL no lugar de `[BASE64_FOTO_DETALHE]`.

Se a pasta estiver **vazia**, continue e avise:
> "Não encontrei imagens na pasta. O briefing será gerado com placeholders — você pode substituir depois."

Se encontrar imagens, informe antes de prosseguir:
> "Encontrei [X] imagens: [lista com categoria de cada uma]. Vou usar assim. Vamos continuar?"

---

## Fluxo de perguntas — faça em blocos, um de cada vez

### Bloco 1 — Identificação da influenciadora

> Vamos montar o briefing! Me conta:
> 1. Qual o nome da influenciadora?
> 2. Qual a campanha ou mês? (ex: Campanha Mães, Maio 2026)
> 3. Ela já foi rosto de alguma coleção ou já trabalhou com a Piuka antes? Se sim, como?
> 4. Tem algum detalhe pessoal dela que a Piuka já conhece e pode mencionar? (ex: "você ama pérolas", "você não tem medo de peças marcantes")

### Bloco 2 — Mix de produtos

> Agora me conta sobre os produtos:
> Liste os nomes das peças do mix, uma por linha:
> (ex: Brinco Cathy Coração com Zirconias)
>
> Vou criar a descrição de cada peça no tom Piuka com base no nome e tipo.

### Bloco 3 — Campanha e data de lançamento

> Mais algumas infos:
> 1. Qual a data de lançamento das peças? (ex: "dia 20", "dia 16/04")
> 2. Tem algum contexto especial da campanha para mencionar? (ex: Campanha Mães, lançamento de coleção...)
> 3. Qual o cupom de desconto exclusivo dela? (ex: ARICANOVAS10)
> 4. Qual o texto do benefício do cupom? (ex: "Garante 10% OFF em todo o site" ou "Garante +10% OFF extra sobre os descontos do site!")

### Bloco 4 — Link de afiliada

> Por último:
> 1. Link de afiliada dela (o "seu link" do card) — pode deixar em branco se não tiver, usamos "clique para acessar seu link." como placeholder

---

## Resumo antes de gerar

Após coletar tudo, apresente um resumo compacto:

> "Confirma? Vou gerar o briefing para **[NOME]** — **[CAMPANHA]** com [X] peças no mix e cupom **[CUPOM]**."

Só gere o documento após confirmação.

---

## Geração do documento

### Passo A — Preparar os valores dos placeholders

Antes de montar o HTML, defina internamente cada valor:

| Placeholder | O que colocar |
|-------------|---------------|
| `[BASE64_LOGO]` | base64 de `LogoPiuka-removebg-preview.png` (lido no Passo 0) |
| `[BASE64_FOTO_CAPA]` | base64 da imagem CAPA — se não houver, remova a tag `<img class="capa-foto">` |
| `[BASE64_FOTO_EDITORIAL]` | base64 da imagem EDITORIAL — se não houver, substituir pela div placeholder abaixo |
| `[BASE64_FOTO_DETALHE]` | base64 da imagem DETALHE — se não houver, usar EDITORIAL; se nenhuma, usar div placeholder |
| `[NOME]` | Nome da influenciadora |
| `[TEXTO_INTRODUCAO]` | Parágrafo personalizado (tom Piuka: próximo, caloroso, sofisticado) — sem travessões (--) |
| `[IMGS_PRODUTOS]` | Um `<img>` por produto PNG (ver regras abaixo) |
| `[LISTA_PRODUTOS]` | Um `<li>` por produto (ver regras abaixo) |
| `[TEXTO_CHAMADA]` | Texto de chamada, personalizando com nome da campanha e data |
| `[CUPOM]` | Código do cupom |
| `[TEXTO_BENEFICIO_CUPOM]` | Texto coletado no Bloco 3 |

**Regras para `[IMGS_PRODUTOS]`:**
- Um `<img>` por produto: `<img src="data:image/png;base64,..." style="width:100%;max-height:220px;object-fit:contain;background:transparent;">`
- Se produto único: `<img src="..." style="grid-column:span 2;width:60%;margin:0 auto;max-height:220px;object-fit:contain;background:transparent;">`
- Se não houver imagem de produto: `<div style="width:100%;height:180px;background:#f0e8ee;border-radius:4px;"></div>`

**Regras para `[LISTA_PRODUTOS]`:**
- Um `<li>` por produto: `<li><span class="produto-nome">NOME DO PRODUTO:</span> descrição da peça sem travessões.</li>`
- **A descrição deve ser redigida pela skill** com base no nome da peça — tom Piuka: caloroso, valoriza o design e o uso no dia a dia, sem travessões (--). Não peça a descrição ao usuário.

**Placeholder de imagem ausente (usar quando não houver foto editorial/detalhe):**
```html
<div style="width:100%;height:220px;background:#f0e8ee;border-radius:12px 12px 0 0;"></div>
```

**Introdução — tom obrigatório:**
- Chamar pelo apelido/primeiro nome
- Referenciar histórico com a Piuka se houver
- Conectar o mix ao gosto pessoal dela
- **NUNCA usar travessões (--) ou traços longos**

Exemplos reais:
- "Ari, para esse mix, trouxemos um acessório que é a sua cara: pérolas e a força do design orgânico!..."
- "Oi oi Fe, o mix dessa vez é uma novidade emocionante! Estamos lançando nossa Campanha Mães..."

---

### Passo B — Montar o HTML a partir do template obrigatório

**CRÍTICO: NÃO reescreva o CSS nem a estrutura HTML. Copie o template abaixo exatamente e substitua apenas os `[PLACEHOLDERS]` pelos valores definidos no Passo A.**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Briefing conteúdos | [NOME]</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap');
    * { margin:0; padding:0; box-sizing:border-box; }
    :root { --rosa:#e91e8c; --rosa-card:#f8e4f2; --texto:#1a1a1a; }
    body { font-family:'Montserrat',sans-serif; color:var(--texto); background:white; }
    .pagina-capa { width:794px; min-height:1123px; position:relative; overflow:hidden; page-break-after:always; background:#d4bfb8; display:flex; align-items:flex-end; }
    .pagina { width:794px; min-height:1123px; padding:52px 56px 48px 56px; page-break-after:always; display:flex; flex-direction:column; background:white; }
    .capa-foto { position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; }
    .capa-overlay { position:relative; z-index:2; background:rgba(255,255,255,0.82); margin:0 60px 60px 60px; padding:24px 28px 20px 28px; border-radius:2px; width:calc(100% - 120px); }
    .capa-titulo { font-size:32px; font-weight:900; line-height:1.15; color:var(--texto); margin-bottom:20px; }
    .secao-titulo { font-size:30px; font-weight:900; color:var(--rosa); margin-bottom:12px; line-height:1; }
    .secao-titulo::after { content:'_'; }
    .secao-subtitulo { font-size:16px; font-weight:800; color:var(--rosa); margin-top:28px; margin-bottom:10px; }
    .secao-subtitulo::after { content:'_'; }
    .texto-intro { font-size:14px; line-height:1.7; text-align:justify; }
    .imagens-grid { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; margin:18px 0; }
    .link-badge { position:absolute; bottom:8px; right:8px; font-size:9px; color:var(--rosa); font-weight:700; text-shadow:0 1px 3px rgba(255,255,255,0.9); }
    .lista-produtos { list-style:disc; padding-left:16px; margin-top:6px; }
    .lista-produtos li { font-size:13px; line-height:1.65; margin-bottom:8px; text-align:justify; }
    .produto-nome { font-weight:800; }
    .rodape-logo { margin-top:auto; padding-top:20px; }
    .chamada-texto { font-size:14px; line-height:1.7; text-align:justify; margin-bottom:10px; }
    .chamada-lista { list-style:disc; padding-left:16px; margin-bottom:20px; }
    .chamada-lista li { font-size:13px; line-height:1.65; }
    .destaque { color:var(--rosa); font-weight:800; }
    .cards-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin:20px 0; }
    .card { background:var(--rosa-card); border-radius:4px; padding:14px 12px; }
    .card-label { font-size:12px; font-weight:800; color:var(--rosa); display:block; margin-bottom:8px; }
    .card-valor { font-size:11px; font-weight:600; }
    .card-link { font-size:10px; color:var(--rosa); text-decoration:underline; font-weight:600; }
    .duvidas-bloco-topo { margin-top:24px; margin-bottom:16px; width:100%; }
    .duvidas-titulo { font-size:32px; font-weight:900; color:var(--rosa); line-height:1.1; margin-bottom:12px; width:100%; }
    .duvidas-texto { font-size:13px; line-height:1.65; margin-bottom:12px; width:100%; }
    .duvidas-inline { display:flex; align-items:center; gap:16px; margin-bottom:0; }
    .contato-linha { display:flex; align-items:center; gap:8px; font-size:13px; font-weight:600; }
    .duvidas-foto-abs { position:absolute; bottom:0; right:0; width:380px; height:auto; object-fit:cover; border-radius:200px 0 0 0; display:block; }
    @page { margin:0; size:A4; }
    @media print { .pagina-capa, .pagina { page-break-after:always; } }
    @media screen { body { background:#e0e0e0; display:flex; flex-direction:column; align-items:center; padding:20px 0; gap:20px; } .pagina-capa, .pagina { box-shadow:0 2px 12px rgba(0,0,0,0.15); } }
  </style>
</head>
<body>

<!-- PÁGINA 1: CAPA -->
<div class="pagina-capa">
  <img class="capa-foto" src="data:image/jpeg;base64,[BASE64_FOTO_CAPA]">
  <div class="capa-overlay">
    <div class="capa-titulo">Briefing<br>conteudos |<br>[NOME]</div>
    <img src="data:image/png;base64,[BASE64_LOGO]" style="height:28px;object-fit:contain;" alt="Piuka">
  </div>
</div>

<!-- PÁGINA 2: INTRODUÇÃO + SOBRE O MIX -->
<div class="pagina">
  <h1 class="secao-titulo">Introdu&#231;&#227;o</h1>
  <p class="texto-intro">[TEXTO_INTRODUCAO]</p>

  <div class="imagens-grid">
    <div style="flex:0 0 45%;display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:center;">
      [IMGS_PRODUTOS]
    </div>
    <div style="flex:1;position:relative;">
      <img src="data:image/jpeg;base64,[BASE64_FOTO_EDITORIAL]" style="width:100%;height:auto;object-fit:cover;border-radius:24px;display:block;">
      <span class="link-badge">clique para acessar o link.</span>
    </div>
  </div>

  <h2 class="secao-subtitulo">Sobre o Mix</h2>
  <ul class="lista-produtos">
    [LISTA_PRODUTOS]
  </ul>

  <div class="rodape-logo">
    <img src="data:image/png;base64,[BASE64_LOGO]" style="height:28px;object-fit:contain;" alt="Piuka">
  </div>
</div>

<!-- PÁGINA 3: CHAMADA + DÚVIDAS -->
<div class="pagina" style="position:relative;">
  <h2 class="secao-subtitulo">Chamada para o site</h2>
  <p class="chamada-texto">[TEXTO_CHAMADA]</p>
  <ul class="chamada-lista">
    <li><strong>Seu Cupom: <span class="destaque">[CUPOM]</span></strong> ([TEXTO_BENEFICIO_CUPOM])</li>
    <li><strong>Cashback:</strong> <span class="destaque">15%</span> em todas as compras pelo site.</li>
    <li><strong>Frete Gr&#225;tis:</strong> Em compras acima de <span class="destaque">R$ 299,99</span>.</li>
    <li><strong>Qualidade Piuka:</strong> Semijoias banhadas a <span class="destaque">ouro 18k</span>, hipoalerg&#234;nicas e com a garantia que voc&#234; j&#225; confia.</li>
  </ul>

  <div class="cards-grid">
    <div class="card">
      <span class="card-label">cupom</span>
      <span class="card-valor">[CUPOM]</span>
    </div>
    <div class="card">
      <span class="card-label">benef&#237;cio</span>
      <span class="card-valor">10% OFF</span>
    </div>
    <div class="card">
      <span class="card-label">seu link</span>
      <span class="card-link">clique para acessar seu link.</span>
    </div>
  </div>

  <!-- LINHA 1: título e texto em bloco, largura total -->
  <div class="duvidas-bloco-topo">
    <div class="duvidas-titulo">Ficou com alguma d&#250;vida?</div>
    <p class="duvidas-texto">Fique a vontade para entrar em contato conosco. Ser&#225; um prazer te ajudar!</p>
    <!-- contato e logo na mesma linha, logo abaixo do texto -->
    <div class="duvidas-inline">
      <div class="contato-linha">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0;">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#1a1a1a"/>
        </svg>
        Pietra Mouco | (17) 99717-8118
      </div>
    </div>
  </div>

  <!-- Logo em baixo do contato -->
  <div style="margin-top:auto;">
    <img src="data:image/png;base64,[BASE64_LOGO]" style="height:32px;object-fit:contain;" alt="Piuka">
  </div>

  <!-- Foto colada na borda direita e inferior, saindo do padding -->
  <img src="data:image/jpeg;base64,[BASE64_FOTO_DETALHE]" class="duvidas-foto-abs">
  <span style="position:absolute;bottom:8px;right:8px;font-size:11px;color:var(--rosa);font-weight:700;text-shadow:0 1px 3px rgba(255,255,255,0.9);">clique para acessar o link.</span>
</div>

</body>
</html>
```

---

### Passo C — Gerar o PDF diretamente (sem salvar HTML)

Execute o script Python abaixo para gerar o PDF direto a partir da string HTML, **sem criar arquivo .html**:

```python
import os
from playwright.sync_api import sync_playwright

output_dir = r"C:\Users\ecommerceadm05\Desktop\piuka-projeto-main\.claude\skills\briefing-influenciadoras\briefings-gerados"
os.makedirs(output_dir, exist_ok=True)
pdf_path = os.path.join(output_dir, "briefing_[nome-influencer]_[mes-ano].pdf")

html_content = """COLAR_HTML_COMPLETO_AQUI"""

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.set_viewport_size({"width": 794, "height": 1123})
    page.set_content(html_content, wait_until="networkidle")
    page.pdf(
        path=pdf_path,
        format="A4",
        print_background=True,
        margin={"top": "0", "bottom": "0", "left": "0", "right": "0"}
    )
    browser.close()

print(f"PDF gerado: {pdf_path}")
```

**ATENÇÃO:** Usar sempre Playwright (não WeasyPrint). O `set_viewport_size(794, 1123)` é obrigatório — sem ele o Chromium usa 800x600 e corta o conteúdo nas bordas. Passar `margin` zero explícito evita as margens padrão do Chromium.

**Destino fixo — sempre:**
`.claude/skills/briefing-influenciadoras/briefings-gerados/briefing_[nome]_[mes-ano].pdf`

Após gerar, informe o caminho completo do PDF para abrir diretamente. **Não criar arquivo .html.**

---

## Informações fixas da marca (sempre usar)

- Site: www.piuka.com.br
- Cashback: 15%
- Frete grátis: acima de R$ 299,99
- Banho: ouro 18k
- Contato: Pietra Mouco | (17) 99717-8118
- Tom: próximo, feminino, sofisticado, empoderador — nunca frio ou genérico
- **Cor principal:** rosa `#e91e8c` | **Fonte:** Montserrat (Google Fonts)

---

## Após gerar

Pergunte se deseja:
1. Gerar briefing para outra influenciadora com a mesma campanha
2. Ajustar alguma seção do briefing gerado (editar o HTML e reconverter para PDF)