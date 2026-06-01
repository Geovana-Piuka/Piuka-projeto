---
name: emails-piuka
description: Gera HTML completo de e-mail marketing para campanhas da Piuka — compatível com Gmail, Outlook, Apple Mail. Estrutura em blocos (header, hero, produto 2-up, grid 4-detalhe, assinatura influencer, footer). Use sempre que o usuário mencionar "e-mail Piuka", "HTML Piuka", "email marketing Piuka", "newsletter Piuka", "e-mail de coleção", "e-mail de lançamento Piuka" ou quando a Ana pedir código de e-mail pra colar em ESP (RD Station, Mailchimp, ActiveCampaign, Brevo).
user-invocable: true
---

# E-mails Piuka — HTML pronto pra colar em ESP

## Contexto

A Piuka dispara 20–23 e-mails/mês. Cada e-mail tem estrutura modular previsível: header com logo+menu, hero editorial com influencer, 1-3 blocos de produto, bloco assinatura da coleção, footer com CTA de saída e redes sociais. Esta skill gera o HTML inline-styled completo, pronto pra colar no ESP.

**Regra das imagens:** fotos de e-mail NÃO passam por Freepik. A Ana envia as fotos da campanha (editorial, polaroid, closes de produto), hospeda em CDN (ou no próprio ESP) e substitui os placeholders `{{IMG_XXX}}` do HTML pelos links.

**Escopo:** só HTML de e-mail marketing transacional/promocional Piuka. Stories, peças Instagram e ads continuam em `/imagens-piuka`.

---

## Compatibilidade

HTML gerado por esta skill é:

- **Tabela-based** (não flexbox, não grid CSS). Gmail mobile, Outlook 2016/2019/365, Apple Mail, Yahoo, Thunderbird.
- **Inline styles** em todo elemento. Nada de `<style>` no `<head>` (quebra em Gmail Web).
- **Fontes web-safe com fallback**: Arial/Helvetica como fallback de Montserrat; Georgia como fallback de Playfair.
- **Largura fixa 600px** no container principal, com `max-width` e `width: 100%` para responsivo básico.
- **Imagens com `alt` text** obrigatório + `style="display:block"` (evita gaps em Outlook).
- **CTAs com padding via tabela** (botões CSS `padding` quebram em Outlook — usa `<table>` com `padding` nas TDs).

---

## Blocos disponíveis (biblioteca)

Cada e-mail é montado empilhando estes blocos. A ordem e quais blocos entram dependem da campanha.

| Bloco | Função | Obrigatório? |
|-------|--------|--------------|
| `header` | Logo Piuka centralizada + menu horizontal (COLARES / BRINCOS / CHOKERS / PULSEIRAS) | Sim |
| `hero` | Foto editorial full-width + título handwritten script + subtítulo "Por [Influencer]" + tagline bold + parágrafo explicativo | Sim |
| `produto_2up_polaroid` | 2 fotos em estilo polaroid lado a lado + copy com bold destacado + CTA sólido preto | Opcional |
| `produto_grid_4` | Grid 2x2 de 4 closes de produto no corpo + copy com bold + CTA sólido preto | Opcional |
| `assinatura_influencer` | Foto grande à esquerda + texto em serif itálico stack à direita ("Para X, / Para Y, / Para as duas.") + sub-copy + CTA outline | Opcional |
| `cta_saida` | Linha "Acesse o site Piuka..." + botão outline preto "IR PARA PIUKA.COM" | Sim |
| `footer_social` | Ícones sociais (FB/X/IG/YT) em círculos pretos + "Enviado por PIUKA.COM" + link de descadastro | Sim |

**Regra:** todo e-mail tem no mínimo `header + hero + cta_saida + footer_social`. Blocos de produto e assinatura são opcionais dependendo da profundidade da campanha.

---

## Sistema visual e-mail

### Paleta e-mail (v1.1 — refinada)

| Token | Hex | Uso |
|-------|-----|-----|
| `bg_externo` | `#EAE4DB` | Fundo do `<body>` — bege mais escuro, dá profundidade (efeito "card" no inbox) |
| `bg_container` | `#F4EFE8` | Fundo do container 600px (bege quente) |
| `bg_card_branco` | `#FFFFFF` | Fundo do bloco assinatura influencer + borda polaroid |
| `texto_principal` | `#1A1A1A` | Texto corpo, headlines e CTAs sólidos (substitui #000000 puro — mais suave e elegante) |
| `texto_footer` | `#777777` | Footer legal, disclaimer, link descadastro |
| `linha_divisora` | `#E0D9CB` | Border-top sutil entre bloco social e footer |
| `cta_solido_bg` | `#1A1A1A` | Fundo do CTA forte (nunca #000000 puro) |
| `cta_solido_texto` | `#FFFFFF` | Texto do CTA forte |
| `cta_outline_borda` | `#1A1A1A` | Borda do CTA outline (1.5px solid) |
| `link_menu` | `#1A1A1A` | Links do menu horizontal |

### Tipografia e-mail (v1.1 — consistência absoluta)

**Três famílias, sem exceção.** Nenhum texto usa fonte fora deste sistema.

| Família | Stack completa | Uso exclusivo |
|---------|---------------|---------------|
| **Sans-serif** | `'Montserrat', Arial, Helvetica, sans-serif` | TODO texto que não é script nem serif italic |
| **Serif italic** | `'Playfair Display', Georgia, 'Times New Roman', serif` com `font-style: italic` | Subtítulo "Por [Influencer]" + stack poético do bloco assinatura |
| **Script handwritten** | `'Great Vibes', 'Allura', 'Brush Script MT', cursive` | APENAS título do hero (1 uso por e-mail) |

**Mapeamento por papel:**

| Papel | Família | Peso | Tamanho | Letter-spacing |
|-------|---------|------|---------|----------------|
| Título hero script | Script | 400 | 52px | — |
| Subtítulo "Por [Influencer]" | Serif italic | 400 | 17px | 0.5px |
| Tagline bold hero | Sans | 700 | 19px | — |
| Parágrafo corpo | Sans | 400 | 15–16px | — |
| Menu horizontal | Sans | 600 | 12px uppercase | 2.5px |
| Copy bloco produto | Sans | 400 | 16px | — |
| CTA sólido | Sans | 700 | 13px uppercase | 2px |
| CTA outline (assinatura) | Sans | 700 | 11px uppercase | 2px |
| CTA outline (saída) | Sans | 700 | 12px uppercase | 2px |
| Assinatura stack | Serif italic | 400 | 24px | — |
| Sub-copy assinatura | Sans | 400 | 13px | — |
| Footer legal | Sans | 400 | 11px | 0.3px |

**Google Fonts:** incluir `<link>` no `<head>` carregando Montserrat (400,500,600,700), Playfair Display (400, 400i, 700, 700i) e Great Vibes (400). Gmail e Apple Mail carregam. Outlook cai no fallback via `<!--[if mso]>` conditional.

### Botões (v1.1 — elegância refinada)

Todos os CTAs usam `border-radius: 3px`. Não é reto (cara de formulário), não é oval (cara de app). Mantém editorial clean com toque premium.

| Tipo | Padding | Fundo | Texto | Borda | Radius |
|------|---------|-------|-------|-------|--------|
| Sólido (principal) | `16px 44px` | `#1A1A1A` | `#FFFFFF` | — | 3px |
| Outline médio (saída) | `14px 34px` | `#F4EFE8` | `#1A1A1A` | `1.5px solid #1A1A1A` | 3px |
| Outline pequeno (assinatura) | `12px 24px` | `#FFFFFF` | `#1A1A1A` | `1.5px solid #1A1A1A` | 3px |

**Importante:** `border-radius` vai tanto no `<td>` quanto no `<a>` (Outlook ignora radius no `<a>`, mas Gmail/Apple Mail respeitam). Container principal de 600px também com `border-radius: 4px` + `overflow: hidden` (dá cantos sutis no card todo).

---

## Links fixos da Piuka (hardcoded no blueprint)

Os links abaixo são HARDCODED no blueprint HTML — Ana NUNCA digita, a skill nunca pergunta.
Quando os links oficiais mudarem, editar aqui e atualizar o blueprint.

| Papel | URL |
|-------|-----|
| Site oficial | `https://piuka.com.br/` |
| Categoria Colares | `https://piuka.com.br/colares` |
| Categoria Brincos | `https://piuka.com.br/brincos` |
| Categoria Chokers | `https://piuka.com.br/chokers` |
| Categoria Pulseiras | `https://piuka.com.br/pulseiras` |
| Instagram | `https://www.instagram.com/piuka` |
| TikTok | `https://www.tiktok.com/@piuka` |
| YouTube | `https://www.youtube.com/channel/UCEcp_eM5RKFCRh9K2CphCaw` |
| Pinterest | `https://br.pinterest.com/piuka/` |
| LinkedIn | `https://br.linkedin.com/company/piuka` |
| Facebook | `https://www.facebook.com/piukaacessorios` |

## Placeholders variáveis por campanha

Estes são os placeholders que Ana/Geovana ou o ESP substituem por e-mail:

| Placeholder | O que é |
|-------------|---------|
| `{{IMG_LOGO_PIUKA}}` | URL do PNG da logo Piuka hospedado (mesmo em todo e-mail, mas depende de CDN) |
| `{{IMG_HERO}}` | URL da foto hero editorial (1120x1120 @2x) |
| `{{IMG_PRODUTO_N}}` | URL da N-ésima foto de produto (polaroid ou grid) |
| `{{IMG_ASSINATURA}}` | URL da foto grande do bloco assinatura influencer |
| `{{IMG_ICON_INSTAGRAM}}`, `{{IMG_ICON_TIKTOK}}`, `{{IMG_ICON_YOUTUBE}}`, `{{IMG_ICON_FACEBOOK}}`, `{{IMG_ICON_PINTEREST}}`, `{{IMG_ICON_LINKEDIN}}` | URLs dos PNGs dos 6 ícones sociais |
| `{{LINK_CTA_PRINCIPAL}}` | URL de destino do CTA "COMPRAR AGORA" (com UTM da campanha) |
| `{{LINK_CTA_ASSINATURA}}` | URL do CTA "VER TODA A COLEÇÃO" (com UTM) |
| `{{LINK_DESCADASTRO}}` | URL de opt-out (gerado pelo ESP — ex: `{{unsubscribe}}` no RD Station, `*|UNSUB|*` no Mailchimp) |
| `{{ENDERECO_FISICO}}` | Endereço físico da Piuka (LGPD/CAN-SPAM) |
| `{{ASSUNTO_EMAIL}}`, `{{PREHEADER}}` | Metadados do e-mail |
| Placeholders de copy | `{{TITULO_HERO_SCRIPT}}`, `{{NOME_INFLUENCER}}`, `{{TAGLINE_BOLD}}`, `{{PARAGRAFO_HERO}}`, `{{COPY_POLAROID_LINHA1}}`, `{{COPY_POLAROID_LINHA2}}`, `{{COPY_GRID_LINHA1}}`, `{{COPY_GRID_LINHA2}}`, `{{STACK_LINHA_1..3}}`, `{{SUBCOPY_ASSINATURA}}`, `{{TEXTO_CTA_PRINCIPAL}}`, `{{TEXTO_CTA_ASSINATURA}}` |

**Regra:** links de rede social NUNCA aparecem como placeholder — vão hardcoded na saída da skill. Links de CTA, imagens e copy sempre vêm da linha correspondente do pacote de e-mails (Seção 2.3 do briefing mensal).

---

## Fluxo de trabalho

A skill assume que o briefing mensal (Sub-Bloco 4E + seção 2.3) já está preenchido com TODA
a copy e estrutura de cada e-mail. A skill só lê a linha N correspondente — não pergunta nada.

```
1. Ana chama a skill com referência ao e-mail: "gera o HTML do e-mail 7 do briefing de maio"
2. Skill abre:
   clientes/ativos/leonardo_piuka/implementacao/briefing_[mes][ano].md
   e lê a linha N da seção 2.3 + o "Detalhamento do e-mail N" correspondente
3. Skill identifica os blocos declarados na coluna "Blocos" da tabela 2.3
   (ex: header, hero, produto_2up_polaroid, produto_grid_4, assinatura_influencer, cta_saida, footer_social)
4. Skill monta HTML inline-styled usando o blueprint canônico:
   - Header e menu: links hardcoded dos 7 oficiais (site + 4 categorias)
   - Hero: título script, subtítulo "Por [influencer]", tagline, parágrafo com bolds
   - Blocos de produto (se aplicável): copy + bolds declarados no briefing
   - Assinatura influencer (se aplicável): stack 3 linhas italic + sub-copy
   - CTA de saída: "Acesse o site Piuka..." + botão "IR PARA PIUKA.COM"
   - Footer social: 6 ícones hardcoded (Instagram, TikTok, YouTube, Facebook, Pinterest, LinkedIn)
   - Footer legal: endereço físico + descadastro
5. Aplicar bolds: ler campo `*_bolds` da linha 2.3 e envolver palavras em `<strong style="font-weight:700;">`
6. Validar contra checklist pré-entrega
7. Entregar HTML inline + instrução:
   "Cole no seu ESP (RD/Mailchimp/ActiveCampaign). Substitua apenas:
    - {{IMG_*}} pelos links das imagens hospedadas
    - {{LINK_CTA_PRINCIPAL}} e {{LINK_CTA_ASSINATURA}} pelos UTMs
    - {{LINK_DESCADASTRO}} pelo merge tag do ESP
    Os 7 links sociais já estão prontos."
4. Validar contra checklist
5. Entregar inline no chat com instrução:
   "Substitua os placeholders {{IMG_X}} pelos links das imagens hospedadas.
    Substitua os {{LINK_X}} pelos UTMs da campanha.
    Cole no seu ESP (RD/Mailchimp/ActiveCampaign) como 'conteúdo HTML custom'."
```

---

## Checklist pré-entrega

Antes de entregar qualquer HTML:

- [ ] HTML abre com `<!DOCTYPE html>` + `<html>` com namespace Outlook (`xmlns:v="urn:schemas-microsoft-com:vml"`)
- [ ] `<head>` tem `<meta charset="UTF-8">` + `<meta name="viewport">` + `<title>`
- [ ] Container principal é `<table>` com `width="600"` e `cellpadding="0" cellspacing="0" border="0"`
- [ ] Todos os styles são INLINE nos atributos `style=""`
- [ ] Nenhuma tag `<style>` dentro do `<head>` (ou se tiver, só fallbacks)
- [ ] Toda `<img>` tem `alt=""`, `style="display:block"`, `width=""` e `height=""`
- [ ] CTAs são `<table>` com `padding` nas TDs (não `<button>`, não `<a>` solto com padding CSS)
- [ ] Cores vêm exclusivamente da paleta Piuka e-mail (nada de rosa/dourado fora do brand)
- [ ] Placeholders `{{IMG_X}}` e `{{LINK_X}}` estão intactos
- [ ] Footer tem link de descadastro visível
- [ ] Footer tem endereço físico (exigência CAN-SPAM / LGPD pode pedir — preencher placeholder `{{ENDERECO_FISICO}}`)
- [ ] Largura total nunca ultrapassa 600px
- [ ] Testou mental: Gmail renderiza sem gaps? Outlook quebra VML? (evitar background-image em divs — usar em `<td>` com VML fallback)

---

## Erros comuns

| Erro | Consequência | Como evitar |
|------|--------------|-------------|
| `<style>` no `<head>` | Gmail Web remove, Outlook ignora parcialmente | Tudo inline nos `style=""` |
| Imagem sem `display:block` | Gap de 4-6px abaixo em Outlook | Sempre `style="display:block"` |
| CTA como `<button>` ou `<a>` com padding CSS | Não clica em Outlook, tamanho errado | CTA é `<table>` com TD com padding |
| Div com `background-image` | Outlook não renderiza | Usar `<td background="">` + VML fallback |
| Flexbox / grid CSS | Quebra em Outlook e Gmail App | Sempre `<table>` aninhada |
| Fonte sem fallback web-safe | Outlook renderiza Times New Roman feio | `font-family: 'Montserrat', Arial, sans-serif` |
| Largura > 600px | Scroll horizontal em mobile e clipping em desktop | Máximo 600px no container principal |
| Faltou link de descadastro | Problema legal (LGPD) + cai em spam | Footer sempre tem `{{LINK_DESCADASTRO}}` |
| URLs de exemplo no lugar dos placeholders | Ana dispara com link quebrado | Sempre placeholders `{{...}}` — nunca URLs fake |

---

## Situações comuns

**"Ana pediu um e-mail simples sem influencer, só produto."**
→ header + hero (usando foto de produto como hero, sem "Por [Influencer]") + produto_2up_polaroid OU produto_grid_4 + cta_saida + footer_social. Sem bloco assinatura.

**"E-mail de lançamento de collab com influencer."**
→ Composição completa: header + hero (com Por [Influencer]) + produto_2up_polaroid + produto_grid_4 + assinatura_influencer + cta_saida + footer_social.

**"E-mail de oferta relâmpago (24h)."**
→ header + hero enxuto + 1 bloco produto + cta_saida forte + footer. Adicionar disclaimer de validade no bloco produto ("Ação válida até DD/MM às 23h59").

**"Ana pediu em outro ESP que não suporta HTML custom completo."**
→ Entregar HTML mesmo assim + avisar: "Se o ESP não aceitar HTML custom completo, extraia os blocos individuais (hero, produto_2up, etc) e cole no editor de blocos. Cada bloco é uma `<table>` independente."

---

## Referência visual real

E-mail da Coleção Mães (Ariane Cânovas) — 16/04/2026 — é a referência canônica. Ver blueprint completo abaixo. Estrutura: header + hero "Coleção Mães / Por Ariane Cânovas" + produto_2up_polaroid (polaroids mãe+filha) + produto_grid_4 (4 closes de produto) + assinatura_influencer ("Para mães, / Para filhas, / Para as duas.") + cta_saida + footer_social.

---

## Blueprint HTML canônico (v1.1 — Coleção Mães)

Este é o HTML de referência, aprovado como padrão visual. Todo e-mail novo começa com esta estrutura e só ajusta copy, imagens, links e blocos (adicionar/remover `produto_2up_polaroid`, `produto_grid_4`, `assinatura_influencer` conforme a campanha).

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>{{ASSUNTO_EMAIL}}</title>
  <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
  <!--[if mso]>
  <style type="text/css">
    table, td, div, p, a, h1, h2, h3, span { font-family: Georgia, 'Times New Roman', serif !important; }
    .mso-sans { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0; padding:0; background-color:#EAE4DB; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; font-family:'Montserrat', Arial, Helvetica, sans-serif;">

  <div style="display:none; font-size:1px; color:#F4EFE8; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden;">{{PREHEADER}}</div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#EAE4DB;">
    <tr>
      <td align="center" style="padding:24px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px; max-width:600px; background-color:#F4EFE8; border-radius:4px; overflow:hidden;">

          <!-- HEADER -->
          <tr>
            <td align="center" style="padding:36px 20px 18px 20px; background-color:#F4EFE8;">
              <a href="https://piuka.com.br/" target="_blank" style="text-decoration:none; border:0;">
                <img src="{{IMG_LOGO_PIUKA}}" alt="Piuka" width="110" height="40" style="display:block; border:0; width:110px; height:auto;" />
              </a>
            </td>
          </tr>

          <!-- MENU HORIZONTAL -->
          <tr>
            <td align="center" style="padding:0 20px 28px 20px; background-color:#F4EFE8;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:0 14px;"><a href="https://piuka.com.br/colares" target="_blank" style="font-family:'Montserrat', Arial, Helvetica, sans-serif; font-size:12px; font-weight:600; color:#1A1A1A; text-decoration:underline; letter-spacing:2.5px; text-transform:uppercase;">Colares</a></td>
                  <td style="padding:0 14px;"><a href="https://piuka.com.br/brincos" target="_blank" style="font-family:'Montserrat', Arial, Helvetica, sans-serif; font-size:12px; font-weight:600; color:#1A1A1A; text-decoration:underline; letter-spacing:2.5px; text-transform:uppercase;">Brincos</a></td>
                  <td style="padding:0 14px;"><a href="https://piuka.com.br/chokers" target="_blank" style="font-family:'Montserrat', Arial, Helvetica, sans-serif; font-size:12px; font-weight:600; color:#1A1A1A; text-decoration:underline; letter-spacing:2.5px; text-transform:uppercase;">Chokers</a></td>
                  <td style="padding:0 14px;"><a href="https://piuka.com.br/pulseiras" target="_blank" style="font-family:'Montserrat', Arial, Helvetica, sans-serif; font-size:12px; font-weight:600; color:#1A1A1A; text-decoration:underline; letter-spacing:2.5px; text-transform:uppercase;">Pulseiras</a></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO -->
          <tr>
            <td align="center" style="padding:0 20px; background-color:#F4EFE8;">
              <a href="{{LINK_CTA_PRINCIPAL}}" target="_blank" style="text-decoration:none; border:0;">
                <img src="{{IMG_HERO}}" alt="{{ALT_HERO}}" width="560" height="560" style="display:block; border:0; width:100%; max-width:560px; height:auto;" />
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:28px 40px 6px 40px; background-color:#F4EFE8;">
              <p class="mso-sans" style="margin:0; font-family:'Great Vibes', 'Allura', 'Brush Script MT', cursive; font-size:52px; font-weight:400; color:#1A1A1A; line-height:1.1;">{{TITULO_HERO_SCRIPT}}</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:2px 40px 28px 40px; background-color:#F4EFE8;">
              <p style="margin:0; font-family:'Playfair Display', Georgia, 'Times New Roman', serif; font-size:17px; font-style:italic; font-weight:400; color:#1A1A1A; line-height:1.3; letter-spacing:0.5px;">Por {{NOME_INFLUENCER}}</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 40px 14px 40px; background-color:#F4EFE8;">
              <p class="mso-sans" style="margin:0; font-family:'Montserrat', Arial, Helvetica, sans-serif; font-size:19px; font-weight:700; color:#1A1A1A; line-height:1.4;">{{TAGLINE_BOLD}}</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 40px 44px 40px; background-color:#F4EFE8;">
              <p class="mso-sans" style="margin:0; font-family:'Montserrat', Arial, Helvetica, sans-serif; font-size:15px; font-weight:400; color:#1A1A1A; line-height:1.7;">{{PARAGRAFO_HERO}}</p>
            </td>
          </tr>

          <!-- BLOCO PRODUTO 2-UP POLAROID (opcional) -->
          <tr>
            <td align="center" style="padding:0 20px 28px 20px; background-color:#F4EFE8;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="width:560px; max-width:560px;">
                <tr>
                  <td align="center" valign="top" width="50%" style="padding:0 8px 0 0;">
                    <img src="{{IMG_PRODUTO_1}}" alt="{{ALT_PRODUTO_1}}" width="270" height="270" style="display:block; border:10px solid #FFFFFF; box-shadow:0 2px 6px rgba(0,0,0,0.08); width:100%; max-width:270px; height:auto; border-radius:2px;" />
                  </td>
                  <td align="center" valign="top" width="50%" style="padding:0 0 0 8px;">
                    <img src="{{IMG_PRODUTO_2}}" alt="{{ALT_PRODUTO_2}}" width="270" height="270" style="display:block; border:10px solid #FFFFFF; box-shadow:0 2px 6px rgba(0,0,0,0.08); width:100%; max-width:270px; height:auto; border-radius:2px;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr><td align="center" style="padding:16px 40px 6px 40px; background-color:#F4EFE8;"><p class="mso-sans" style="margin:0; font-family:'Montserrat', Arial, Helvetica, sans-serif; font-size:16px; font-weight:400; color:#1A1A1A; line-height:1.6;">{{COPY_POLAROID_LINHA1}}</p></td></tr>
          <tr><td align="center" style="padding:0 40px 26px 40px; background-color:#F4EFE8;"><p class="mso-sans" style="margin:0; font-family:'Montserrat', Arial, Helvetica, sans-serif; font-size:16px; font-weight:400; color:#1A1A1A; line-height:1.6;">{{COPY_POLAROID_LINHA2}}</p></td></tr>
          <tr>
            <td align="center" style="padding:0 40px 44px 40px; background-color:#F4EFE8;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" bgcolor="#1A1A1A" style="background-color:#1A1A1A; border-radius:3px;">
                    <a href="{{LINK_CTA_PRINCIPAL}}" target="_blank" class="mso-sans" style="display:inline-block; padding:16px 44px; font-family:'Montserrat', Arial, Helvetica, sans-serif; font-size:13px; font-weight:700; color:#FFFFFF; text-decoration:none; letter-spacing:2px; text-transform:uppercase; border-radius:3px;">{{TEXTO_CTA_PRINCIPAL}}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BLOCO PRODUTO GRID 4 (opcional) -->
          <tr>
            <td align="center" style="padding:0 20px 20px 20px; background-color:#F4EFE8;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="width:560px; max-width:560px;">
                <tr>
                  <td align="center" valign="top" width="50%" style="padding:0 4px 8px 0;"><img src="{{IMG_PRODUTO_3}}" alt="{{ALT_PRODUTO_3}}" width="274" height="274" style="display:block; border:0; width:100%; max-width:274px; height:auto; border-radius:2px;" /></td>
                  <td align="center" valign="top" width="50%" style="padding:0 0 8px 4px;"><img src="{{IMG_PRODUTO_4}}" alt="{{ALT_PRODUTO_4}}" width="274" height="274" style="display:block; border:0; width:100%; max-width:274px; height:auto; border-radius:2px;" /></td>
                </tr>
                <tr>
                  <td align="center" valign="top" width="50%" style="padding:0 4px 0 0;"><img src="{{IMG_PRODUTO_5}}" alt="{{ALT_PRODUTO_5}}" width="274" height="274" style="display:block; border:0; width:100%; max-width:274px; height:auto; border-radius:2px;" /></td>
                  <td align="center" valign="top" width="50%" style="padding:0 0 0 4px;"><img src="{{IMG_PRODUTO_6}}" alt="{{ALT_PRODUTO_6}}" width="274" height="274" style="display:block; border:0; width:100%; max-width:274px; height:auto; border-radius:2px;" /></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr><td align="center" style="padding:18px 40px 6px 40px; background-color:#F4EFE8;"><p class="mso-sans" style="margin:0; font-family:'Montserrat', Arial, Helvetica, sans-serif; font-size:16px; font-weight:400; color:#1A1A1A; line-height:1.6;">{{COPY_GRID_LINHA1}}</p></td></tr>
          <tr><td align="center" style="padding:0 40px 26px 40px; background-color:#F4EFE8;"><p class="mso-sans" style="margin:0; font-family:'Montserrat', Arial, Helvetica, sans-serif; font-size:16px; font-weight:400; color:#1A1A1A; line-height:1.6;">{{COPY_GRID_LINHA2}}</p></td></tr>
          <tr>
            <td align="center" style="padding:0 40px 48px 40px; background-color:#F4EFE8;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" bgcolor="#1A1A1A" style="background-color:#1A1A1A; border-radius:3px;">
                    <a href="{{LINK_CTA_PRINCIPAL}}" target="_blank" class="mso-sans" style="display:inline-block; padding:16px 44px; font-family:'Montserrat', Arial, Helvetica, sans-serif; font-size:13px; font-weight:700; color:#FFFFFF; text-decoration:none; letter-spacing:2px; text-transform:uppercase; border-radius:3px;">{{TEXTO_CTA_PRINCIPAL}}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BLOCO ASSINATURA INFLUENCER (opcional) -->
          <tr>
            <td align="center" style="padding:0 20px 32px 20px; background-color:#F4EFE8;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="width:560px; max-width:560px; background-color:#FFFFFF; border-radius:3px;">
                <tr>
                  <td align="left" valign="top" width="50%" style="padding:0;">
                    <img src="{{IMG_ASSINATURA}}" alt="{{ALT_ASSINATURA}}" width="280" height="360" style="display:block; border:0; width:100%; max-width:280px; height:auto; border-radius:3px 0 0 3px;" />
                  </td>
                  <td align="left" valign="middle" width="50%" style="padding:28px 26px 28px 26px; background-color:#FFFFFF;">
                    <p style="margin:0 0 4px 0; font-family:'Playfair Display', Georgia, 'Times New Roman', serif; font-size:24px; font-style:italic; font-weight:400; color:#1A1A1A; line-height:1.3;">{{STACK_LINHA_1}}</p>
                    <p style="margin:0 0 4px 0; font-family:'Playfair Display', Georgia, 'Times New Roman', serif; font-size:24px; font-style:italic; font-weight:400; color:#1A1A1A; line-height:1.3;">{{STACK_LINHA_2}}</p>
                    <p style="margin:0 0 20px 0; font-family:'Playfair Display', Georgia, 'Times New Roman', serif; font-size:24px; font-style:italic; font-weight:400; color:#1A1A1A; line-height:1.3;">{{STACK_LINHA_3}}</p>
                    <p class="mso-sans" style="margin:0 0 22px 0; font-family:'Montserrat', Arial, Helvetica, sans-serif; font-size:13px; font-weight:400; color:#1A1A1A; line-height:1.6;">{{SUBCOPY_ASSINATURA}}</p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="border:1.5px solid #1A1A1A; background-color:#FFFFFF; border-radius:3px;">
                          <a href="{{LINK_CTA_ASSINATURA}}" target="_blank" class="mso-sans" style="display:inline-block; padding:12px 24px; font-family:'Montserrat', Arial, Helvetica, sans-serif; font-size:11px; font-weight:700; color:#1A1A1A; text-decoration:none; letter-spacing:2px; text-transform:uppercase; border-radius:3px;">{{TEXTO_CTA_ASSINATURA}}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA DE SAÍDA -->
          <tr><td align="center" style="padding:16px 40px 10px 40px; background-color:#F4EFE8;"><p class="mso-sans" style="margin:0; font-family:'Montserrat', Arial, Helvetica, sans-serif; font-size:16px; font-weight:400; color:#1A1A1A; line-height:1.6;">{{COPY_SAIDA_LINHA1}}</p></td></tr>
          <tr><td align="center" style="padding:0 40px 26px 40px; background-color:#F4EFE8;"><p class="mso-sans" style="margin:0; font-family:'Montserrat', Arial, Helvetica, sans-serif; font-size:16px; font-weight:400; color:#1A1A1A; line-height:1.6;">{{COPY_SAIDA_LINHA2}}</p></td></tr>
          <tr>
            <td align="center" style="padding:0 40px 52px 40px; background-color:#F4EFE8;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="border:1.5px solid #1A1A1A; background-color:#F4EFE8; border-radius:3px;">
                    <a href="https://piuka.com.br/" target="_blank" class="mso-sans" style="display:inline-block; padding:14px 34px; font-family:'Montserrat', Arial, Helvetica, sans-serif; font-size:12px; font-weight:700; color:#1A1A1A; text-decoration:none; letter-spacing:2px; text-transform:uppercase; border-radius:3px;">Ir para Piuka.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER SOCIAL — 6 ícones hardcoded (IG, TikTok, YT, FB, Pinterest, LinkedIn) -->
          <tr>
            <td align="center" style="padding:28px 40px 18px 40px; background-color:#F4EFE8; border-top:1px solid #E0D9CB;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:0 8px;"><a href="https://www.instagram.com/piuka" target="_blank" style="text-decoration:none; border:0;"><img src="{{IMG_ICON_INSTAGRAM}}" alt="Instagram" width="32" height="32" style="display:block; border:0; width:32px; height:32px; border-radius:50%;" /></a></td>
                  <td style="padding:0 8px;"><a href="https://www.tiktok.com/@piuka" target="_blank" style="text-decoration:none; border:0;"><img src="{{IMG_ICON_TIKTOK}}" alt="TikTok" width="32" height="32" style="display:block; border:0; width:32px; height:32px; border-radius:50%;" /></a></td>
                  <td style="padding:0 8px;"><a href="https://www.youtube.com/channel/UCEcp_eM5RKFCRh9K2CphCaw" target="_blank" style="text-decoration:none; border:0;"><img src="{{IMG_ICON_YOUTUBE}}" alt="YouTube" width="32" height="32" style="display:block; border:0; width:32px; height:32px; border-radius:50%;" /></a></td>
                  <td style="padding:0 8px;"><a href="https://www.facebook.com/piukaacessorios" target="_blank" style="text-decoration:none; border:0;"><img src="{{IMG_ICON_FACEBOOK}}" alt="Facebook" width="32" height="32" style="display:block; border:0; width:32px; height:32px; border-radius:50%;" /></a></td>
                  <td style="padding:0 8px;"><a href="https://br.pinterest.com/piuka/" target="_blank" style="text-decoration:none; border:0;"><img src="{{IMG_ICON_PINTEREST}}" alt="Pinterest" width="32" height="32" style="display:block; border:0; width:32px; height:32px; border-radius:50%;" /></a></td>
                  <td style="padding:0 8px;"><a href="https://br.linkedin.com/company/piuka" target="_blank" style="text-decoration:none; border:0;"><img src="{{IMG_ICON_LINKEDIN}}" alt="LinkedIn" width="32" height="32" style="display:block; border:0; width:32px; height:32px; border-radius:50%;" /></a></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER LEGAL -->
          <tr><td align="center" style="padding:16px 40px 6px 40px; background-color:#F4EFE8;"><p class="mso-sans" style="margin:0; font-family:'Montserrat', Arial, Helvetica, sans-serif; font-size:11px; font-weight:400; color:#777777; line-height:1.6; letter-spacing:0.3px;">Enviado por <a href="https://piuka.com.br/" target="_blank" style="color:#777777; text-decoration:underline;">PIUKA.COM</a></p></td></tr>
          <tr><td align="center" style="padding:0 40px 6px 40px; background-color:#F4EFE8;"><p class="mso-sans" style="margin:0; font-family:'Montserrat', Arial, Helvetica, sans-serif; font-size:11px; font-weight:400; color:#777777; line-height:1.6; letter-spacing:0.3px;">{{ENDERECO_FISICO}}</p></td></tr>
          <tr><td align="center" style="padding:0 40px 36px 40px; background-color:#F4EFE8;"><p class="mso-sans" style="margin:0; font-family:'Montserrat', Arial, Helvetica, sans-serif; font-size:11px; font-weight:400; color:#777777; line-height:1.6; letter-spacing:0.3px;">Caso não queira mais receber nossos e-mails, <a href="{{LINK_DESCADASTRO}}" target="_blank" style="color:#777777; text-decoration:underline;">descadastre-se</a>.</p></td></tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
```

### Placeholders do blueprint

| Bloco | Placeholders |
|-------|--------------|
| Meta | `{{ASSUNTO_EMAIL}}`, `{{PREHEADER}}` |
| Header | `{{IMG_LOGO_PIUKA}}`, `https://piuka.com.br/` |
| Menu | `https://piuka.com.br/colares`, `https://piuka.com.br/brincos`, `https://piuka.com.br/chokers`, `https://piuka.com.br/pulseiras` |
| Hero | `{{IMG_HERO}}`, `{{ALT_HERO}}`, `{{TITULO_HERO_SCRIPT}}`, `{{NOME_INFLUENCER}}`, `{{TAGLINE_BOLD}}`, `{{PARAGRAFO_HERO}}`, `{{LINK_CTA_PRINCIPAL}}` |
| Polaroid 2-up | `{{IMG_PRODUTO_1}}`, `{{IMG_PRODUTO_2}}`, `{{ALT_PRODUTO_1}}`, `{{ALT_PRODUTO_2}}`, `{{COPY_POLAROID_LINHA1}}`, `{{COPY_POLAROID_LINHA2}}`, `{{TEXTO_CTA_PRINCIPAL}}` |
| Grid 4 | `{{IMG_PRODUTO_3}}` a `{{IMG_PRODUTO_6}}`, `{{ALT_PRODUTO_3}}` a `{{ALT_PRODUTO_6}}`, `{{COPY_GRID_LINHA1}}`, `{{COPY_GRID_LINHA2}}` |
| Assinatura | `{{IMG_ASSINATURA}}`, `{{ALT_ASSINATURA}}`, `{{STACK_LINHA_1}}` a `{{STACK_LINHA_3}}`, `{{SUBCOPY_ASSINATURA}}`, `{{TEXTO_CTA_ASSINATURA}}`, `{{LINK_CTA_ASSINATURA}}` |
| Saída | `{{COPY_SAIDA_LINHA1}}`, `{{COPY_SAIDA_LINHA2}}` |
| Footer | `{{IMG_ICON_FACEBOOK}}`, `{{IMG_ICON_TWITTER}}`, `{{IMG_ICON_INSTAGRAM}}`, `{{IMG_ICON_YOUTUBE}}`, `{{LINK_FACEBOOK}}`, `{{LINK_TWITTER}}`, `{{LINK_INSTAGRAM}}`, `{{LINK_YOUTUBE}}`, `{{ENDERECO_FISICO}}`, `{{LINK_DESCADASTRO}}` |

### Regra de aplicação do blueprint

1. Copiar o HTML acima integralmente.
2. Remover blocos opcionais que a campanha não usa (produto_2up_polaroid, produto_grid_4, assinatura_influencer).
3. Substituir todos os `{{...}}` pelos valores da campanha.
4. Aplicar `<strong style="font-weight:700;">palavra</strong>` em 1-3 palavras-chave por parágrafo de copy (ex: "Mais do que um detalhe, um <strong>relicário é destaque</strong>").
5. Validar contra checklist pré-entrega.

---

## Validação v1

Paleta e tipografia do e-mail são v1.1 (refinada em 2026-04-19) baseadas no e-mail Coleção Mães + ajustes aprovados pelo Cristian:
- Border-radius sutil em todos os CTAs (3px)
- `#1A1A1A` em vez de `#000000` puro
- Consistência absoluta nas 3 famílias de fonte
- Fundo externo `#EAE4DB` diferente do container `#F4EFE8` (efeito card)
- Letter-spacing padronizado em CTAs (2px) e footer (0.3px)

Quando Ana confirmar brand guide oficial de e-mail (pode ser diferente do brand guide de peças sociais), revisar a seção "Sistema visual e-mail" e atualizar hex/fontes se divergirem.
