// gerar_briefing_maio2026.js — Briefing Mensal Piuka Maio 2026
// Gera: briefing_maio2026.docx (master) + sub-docs individuais por pessoa
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, BorderStyle, WidthType, ShadingType } = require('docx');
const fs = require('fs'), path = require('path');

const OUT_DIR   = path.join(__dirname, 'implementacao');
const OUT_MASTER = path.join(OUT_DIR, 'briefing_maio2026.docx');
const OUT_SUBS  = {
  amanda:   path.join(OUT_DIR, 'subdoc_amanda_maio2026.docx'),
  isabelle: path.join(OUT_DIR, 'subdoc_isabelle_maio2026.docx'),
  pietra:   path.join(OUT_DIR, 'subdoc_pietra_maio2026.docx'),
  joy:      path.join(OUT_DIR, 'subdoc_joy_maio2026.docx'),
  marcela:  path.join(OUT_DIR, 'subdoc_marcela_maio2026.docx'),
};

// Piuka palette
const PR = 'C8956A'; // terracota/rosé
const DK = '1A1A1A';
const MD = '555555';
const LT = 'FAF7F4'; // creme
const WH = 'FFFFFF';
const GR = 'F2F2F2';

const W = 9360;
const noBorder = { style: BorderStyle.NONE, size: 0, color: WH };
const borders  = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder,
                   insideH: noBorder, insideV: noBorder };

// ── HELPERS ──────────────────────────────────────────────────────────────────

function colorBlock(text, bg, opts={}) {
  const col = opts.col || WH;
  const sz  = opts.sz  || 26;
  const runs = Array.isArray(text) ? text
    : [new TextRun({ text, bold: true, size: sz, font: 'Arial', color: col })];
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [W],
    rows: [new TableRow({ children: [new TableCell({
      shading: { fill: bg, type: ShadingType.CLEAR },
      margins: { top: opts.padV||160, bottom: opts.padV||160, left: opts.padH||240, right: opts.padH||240 },
      borders,
      width: { size: W, type: WidthType.DXA },
      children: [new Paragraph({ children: runs, alignment: opts.align, spacing: { before: 0, after: 0 } })],
    })] })],
  });
}

function sectionHeader(text) {
  return colorBlock(text, PR, { sz: 28, padV: 200, padH: 300 });
}

function subHeader(text) {
  return colorBlock(text, DK, { sz: 22, padV: 120, padH: 240 });
}

function labelBlock(label, value) {
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [2200, 7160],
    rows: [new TableRow({ children: [
      new TableCell({
        shading: { fill: LT, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 200, right: 200 },
        borders,
        width: { size: 2200, type: WidthType.DXA },
        children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 20, font: 'Arial', color: DK })], spacing: { before: 0, after: 0 } })],
      }),
      new TableCell({
        shading: { fill: WH, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 200, right: 200 },
        borders,
        width: { size: 7160, type: WidthType.DXA },
        children: [new Paragraph({ children: [new TextRun({ text: value, size: 20, font: 'Arial', color: MD })], spacing: { before: 0, after: 0 } })],
      }),
    ] })],
  });
}

function body(text, o={}) {
  return new Paragraph({
    children: [new TextRun({ text, size: o.sz||22, font:'Arial', color: o.col||DK, bold:!!o.bold, italics:!!o.it })],
    spacing: { before: o.before ?? 80, after: 0 },
    bullet: o.bullet ? { level: 0 } : undefined,
  });
}

function divider() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: PR, space: 1 } },
    spacing: { before: 100, after: 100 },
    children: [],
  });
}

function sp(n=100) {
  return new Paragraph({ children: [new TextRun({ text: '' })], spacing: { before: n, after: 0 } });
}

function codeBlock(text) {
  const lines = text.split('\n');
  const leftBorder = { style: BorderStyle.SINGLE, size: 16, color: PR };
  const codeBorders = { top: noBorder, bottom: noBorder, left: leftBorder, right: noBorder, insideH: noBorder, insideV: noBorder };
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [W],
    rows: [new TableRow({ children: [new TableCell({
      shading: { fill: GR, type: ShadingType.CLEAR },
      margins: { top: 120, bottom: 120, left: 240, right: 240 },
      borders: codeBorders,
      width: { size: W, type: WidthType.DXA },
      children: lines.map(l => new Paragraph({
        children: [new TextRun({ text: l, size: 18, font: 'Courier New', color: DK })],
        spacing: { before: 0, after: 0 },
      })),
    })] })],
  });
}

function tableBlock(headers, rows) {
  const colW = Math.floor(W / headers.length);
  const makeRow = (cells, isHeader) => new TableRow({
    children: cells.map(cell => new TableCell({
      shading: { fill: isHeader ? DK : WH, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 160, right: 160 },
      borders,
      children: [new Paragraph({
        children: [new TextRun({ text: String(cell), bold: isHeader, size: 18, font: 'Arial', color: isHeader ? WH : DK })],
        spacing: { before: 0, after: 0 },
      })],
    })),
  });
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: headers.map(() => colW),
    rows: [makeRow(headers, true), ...rows.map(r => makeRow(r, false))],
  });
}

function makeDoc(children) {
  return new Document({
    styles: { default: { document: { run: { font: 'Arial', size: 22, color: DK } } } },
    sections: [{
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1200, right: 1200, bottom: 1200, left: 1200 },
        },
      },
      children,
    }],
  });
}

// ── DADOS ─────────────────────────────────────────────────────────────────────

const emails = [
  { n: 1,  data: 'Ter 29/04', campanha: 'Lançamento Dia das Mães',
    subA: 'Chegou a coleção do presente que ela vai usar todo dia',
    subB: 'Personalizado com a inicial dela — Coleção Letras chegou',
    pre:  'Semijoia que tem significado antes mesmo de abrir a caixa.',
    cta:  'ESCOLHER O PRESENTE DELA',
    copy: 'Tem presente que fica bonito na embalagem e vai parar na gaveta. E tem o presente que ela coloca no dia que recebe e não tira mais. A Coleção Letras chegou com personalização — a inicial dela, do jeito certo, em semijoia que dura. Se você quer dar algo que tem significado de verdade esse Dia das Mães, começa aqui.',
    html: `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Coleção Letras chegou</title></head>
<body style="margin:0;padding:0;background:#F5F5F5;font-family:Arial,sans-serif;">
<table width="600" align="center" cellpadding="0" cellspacing="0" style="background:#FFFFFF;">
  <!-- HEADER -->
  <tr><td style="background:#FAF7F4;padding:24px;text-align:center;">
    <img src="[LOGO_PIUKA]" alt="Piuka" width="120" style="display:block;margin:0 auto;">
  </td></tr>
  <!-- HERO IMAGE -->
  <tr><td style="padding:0;">
    <img src="[FOTO_COLECAO_LETRAS_HERO]" alt="Coleção Letras" width="600" style="display:block;width:100%;">
  </td></tr>
  <!-- HEADLINE -->
  <tr><td style="padding:40px 40px 16px;text-align:center;">
    <h1 style="margin:0;font-size:28px;color:#1A1A1A;font-weight:700;line-height:1.3;">Presente que ela vai usar todo dia</h1>
  </td></tr>
  <!-- COPY -->
  <tr><td style="padding:16px 40px 32px;color:#555555;font-size:16px;line-height:1.7;">
    <p>Tem presente que fica bonito na embalagem e vai parar na gaveta. E tem o presente que ela coloca no dia que recebe e não tira mais.</p>
    <p>A Coleção Letras chegou com personalização — a inicial dela, do jeito certo, em semijoia que dura. Se você quer dar algo que tem significado de verdade esse Dia das Mães, começa aqui.</p>
  </td></tr>
  <!-- CTA -->
  <tr><td style="padding:0 40px 40px;text-align:center;">
    <a href="[LINK_COLECAO_LETRAS]" style="display:inline-block;background:#C8956A;color:#FFFFFF;font-size:14px;font-weight:700;letter-spacing:1px;padding:16px 40px;text-decoration:none;border-radius:2px;">ESCOLHER O PRESENTE DELA</a>
  </td></tr>
  <!-- FOOTER -->
  <tr><td style="background:#FAF7F4;padding:24px;text-align:center;font-size:12px;color:#999999;">
    <p style="margin:0;">Piuka Semijoias · Ribeirão Preto</p>
    <p style="margin:8px 0 0;"><a href="[LINK_DESCADASTRO]" style="color:#999999;">Descadastrar</a></p>
  </td></tr>
</table>
</body></html>` },

  { n: 2,  data: 'Qui 01/05', campanha: 'Liquidação Relâmpago Pulseiras',
    subA: '30% OFF em pulseiras — só hoje',
    subB: 'Liquidação relâmpago: pulseiras com 30% de desconto até meia-noite',
    pre:  '24 horas. Depois acabou.',
    cta:  'APROVEITAR AGORA',
    copy: 'Hoje, 01 de maio, a Piuka tá com 30% OFF em toda a linha de pulseiras — por exatamente 24 horas. Sem código, sem complicação. O desconto já tá aplicado no site. Depois de meia-noite, voltou ao preço normal.',
    html: `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><title>30% OFF pulseiras — só hoje</title></head>
<body style="margin:0;padding:0;background:#F5F5F5;font-family:Arial,sans-serif;">
<table width="600" align="center" cellpadding="0" cellspacing="0" style="background:#1A1A1A;">
  <tr><td style="background:#FAF7F4;padding:24px;text-align:center;">
    <img src="[LOGO_PIUKA]" alt="Piuka" width="120" style="display:block;margin:0 auto;">
  </td></tr>
  <tr><td style="padding:0;">
    <img src="[FOTO_PULSEIRAS_BANNER]" alt="Pulseiras Piuka" width="600" style="display:block;width:100%;">
  </td></tr>
  <tr><td style="padding:40px;text-align:center;">
    <p style="margin:0 0 8px;color:#C8956A;font-size:14px;font-weight:700;letter-spacing:2px;">LIQUIDAÇÃO RELÂMPAGO</p>
    <h1 style="margin:0;font-size:64px;color:#FFFFFF;font-weight:800;line-height:1;">30%<br><span style="font-size:28px;">OFF</span></h1>
    <p style="margin:16px 0 0;color:#FFFFFF;font-size:16px;">Toda a linha de pulseiras · Só hoje até meia-noite</p>
    <p style="margin:24px 0;color:#FFFFFF;font-size:14px;">Sem código. O desconto já tá aplicado no site.</p>
    <a href="[LINK_PULSEIRAS]" style="display:inline-block;background:#C8956A;color:#FFFFFF;font-size:14px;font-weight:700;letter-spacing:1px;padding:16px 40px;text-decoration:none;border-radius:2px;">APROVEITAR AGORA</a>
  </td></tr>
  <tr><td style="background:#FAF7F4;padding:24px;text-align:center;font-size:12px;color:#999999;">
    <p style="margin:0;">Piuka Semijoias · Ribeirão Preto</p>
    <p style="margin:8px 0 0;"><a href="[LINK_DESCADASTRO]" style="color:#999999;">Descadastrar</a></p>
  </td></tr>
</table>
</body></html>` },

  { n: 3,  data: 'Sáb 03/05', campanha: 'Aquecimento Dia das Mães',
    subA: 'Faltam 8 dias — você já escolheu?',
    subB: 'O presente dela tá esperando por você',
    pre:  'Coleção Letras e Religiosos com personalização.',
    cta:  'VER COLEÇÃO COMPLETA',
    copy: 'Dia das Mães é dia 11. Ainda dá tempo de garantir um presente com personalização — mas a produção tem prazo. A Coleção Letras e Religiosos é feita pra quem quer dar algo que ela vai usar todo dia, não guardar na cômoda. Escolhe agora pra chegar a tempo.',
    html: `<!-- TEMPLATE PADRÃO: substituir [FOTO_HERO], [LINK_COLECAO], [LOGO_PIUKA], [LINK_DESCADASTRO] -->
<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Faltam 8 dias</title></head>
<body style="margin:0;padding:0;background:#F5F5F5;font-family:Arial,sans-serif;">
<table width="600" align="center" cellpadding="0" cellspacing="0" style="background:#FFFFFF;">
  <tr><td style="background:#FAF7F4;padding:24px;text-align:center;"><img src="[LOGO_PIUKA]" alt="Piuka" width="120" style="display:block;margin:0 auto;"></td></tr>
  <tr><td style="padding:0;"><img src="[FOTO_HERO_COLECAO]" alt="Coleção" width="600" style="display:block;width:100%;"></td></tr>
  <tr><td style="padding:32px 40px 8px;text-align:center;">
    <p style="margin:0;color:#C8956A;font-size:13px;font-weight:700;letter-spacing:2px;">DIA DAS MÃES · 11 DE MAIO</p>
    <h1 style="margin:12px 0 0;font-size:26px;color:#1A1A1A;font-weight:700;">Faltam 8 dias. Você já escolheu?</h1>
  </td></tr>
  <tr><td style="padding:16px 40px 32px;color:#555555;font-size:16px;line-height:1.7;">
    <p>Dia das Mães é dia 11. Ainda dá tempo de garantir um presente com personalização — mas a produção tem prazo.</p>
    <p>A Coleção Letras e Religiosos é feita pra quem quer dar algo que ela vai usar todo dia, não guardar na cômoda. Escolhe agora pra chegar a tempo.</p>
  </td></tr>
  <tr><td style="padding:0 40px 40px;text-align:center;"><a href="[LINK_COLECAO]" style="display:inline-block;background:#C8956A;color:#FFFFFF;font-size:14px;font-weight:700;letter-spacing:1px;padding:16px 40px;text-decoration:none;border-radius:2px;">VER COLEÇÃO COMPLETA</a></td></tr>
  <tr><td style="background:#FAF7F4;padding:24px;text-align:center;font-size:12px;color:#999999;"><p style="margin:0;">Piuka Semijoias · Ribeirão Preto</p><p style="margin:8px 0 0;"><a href="[LINK_DESCADASTRO]" style="color:#999999;">Descadastrar</a></p></td></tr>
</table></body></html>` },

  { n: 4,  data: 'Ter 06/05', campanha: 'Urgência Personalização',
    subA: 'Semijoia personalizada: prazo de produção termina em breve',
    subB: 'Garante com personalização antes de fechar o prazo',
    pre:  'Depois dessa data, não dá tempo de personalizar.',
    cta:  'GARANTIR COM PERSONALIZAÇÃO',
    copy: 'Semijoias com personalização têm prazo de produção. Se você quer garantir o presente com a inicial dela, o tempo tá ficando curto. A Coleção Letras e Religiosos ainda tá com todos os modelos disponíveis — mas a janela de personalização fecha nos próximos dias.',
    html: `<!-- TEMPLATE URGÊNCIA: substituir [FOTO_PRODUTO_PERSONALIZADO], [LINK_COLECAO], [LOGO_PIUKA], [LINK_DESCADASTRO] -->
<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Prazo de personalização</title></head>
<body style="margin:0;padding:0;background:#F5F5F5;font-family:Arial,sans-serif;">
<table width="600" align="center" cellpadding="0" cellspacing="0" style="background:#FFFFFF;">
  <tr><td style="background:#FAF7F4;padding:24px;text-align:center;"><img src="[LOGO_PIUKA]" alt="Piuka" width="120" style="display:block;margin:0 auto;"></td></tr>
  <tr><td style="padding:0;"><img src="[FOTO_PRODUTO_PERSONALIZADO]" alt="Personalização" width="600" style="display:block;width:100%;"></td></tr>
  <tr><td style="padding:32px 40px 8px;text-align:center;">
    <p style="margin:0;color:#C8956A;font-size:13px;font-weight:700;letter-spacing:2px;">ATENÇÃO — PRAZO ESGOTANDO</p>
    <h1 style="margin:12px 0 0;font-size:24px;color:#1A1A1A;font-weight:700;">O prazo de personalização fecha nos próximos dias</h1>
  </td></tr>
  <tr><td style="padding:16px 40px 32px;color:#555555;font-size:16px;line-height:1.7;">
    <p>Semijoias com personalização têm prazo de produção. Se você quer garantir o presente com a inicial dela, o tempo tá ficando curto.</p>
    <p>A Coleção Letras e Religiosos ainda tá com todos os modelos disponíveis — mas a janela fecha nos próximos dias. Não deixa passar.</p>
  </td></tr>
  <tr><td style="padding:0 40px 40px;text-align:center;"><a href="[LINK_COLECAO]" style="display:inline-block;background:#C8956A;color:#FFFFFF;font-size:14px;font-weight:700;letter-spacing:1px;padding:16px 40px;text-decoration:none;border-radius:2px;">GARANTIR COM PERSONALIZAÇÃO</a></td></tr>
  <tr><td style="background:#FAF7F4;padding:24px;text-align:center;font-size:12px;color:#999999;"><p style="margin:0;">Piuka Semijoias · Ribeirão Preto</p><p style="margin:8px 0 0;"><a href="[LINK_DESCADASTRO]" style="color:#999999;">Descadastrar</a></p></td></tr>
</table></body></html>` },

  { n: 5,  data: 'Qui 08/05', campanha: 'Pós-live urgência',
    subA: 'O que rolou na live de hoje (e ainda dá tempo de garantir)',
    subB: 'Últimas peças com entrega para o Dia das Mães',
    pre:  'Faltam 3 dias. Entrega garantida só até amanhã.',
    cta:  'GARANTIR AGORA',
    copy: 'Quem acompanhou a live hoje viu ao vivo as últimas peças disponíveis pra entrega antes do Dia das Mães. Se você perdeu, ainda dá tempo — mas o prazo de despacho é amanhã. Depois disso, só retirada nas lojas físicas em Ribeirão Preto.',
    html: `<!-- TEMPLATE PÓS-LIVE: substituir [FOTO_LIVE_CAPTURE], [LINK_COLECAO], [LOGO_PIUKA], [LINK_DESCADASTRO] -->
<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Últimas peças</title></head>
<body style="margin:0;padding:0;background:#F5F5F5;font-family:Arial,sans-serif;">
<table width="600" align="center" cellpadding="0" cellspacing="0" style="background:#FFFFFF;">
  <tr><td style="background:#FAF7F4;padding:24px;text-align:center;"><img src="[LOGO_PIUKA]" alt="Piuka" width="120" style="display:block;margin:0 auto;"></td></tr>
  <tr><td style="padding:0;"><img src="[FOTO_LIVE_CAPTURE]" alt="Live Piuka" width="600" style="display:block;width:100%;"></td></tr>
  <tr><td style="padding:32px 40px 8px;text-align:center;">
    <p style="margin:0;color:#C8956A;font-size:13px;font-weight:700;letter-spacing:2px;">ÚLTIMAS PEÇAS — DESPACHO AMANHÃ</p>
    <h1 style="margin:12px 0 0;font-size:24px;color:#1A1A1A;font-weight:700;">Ainda dá tempo — mas só se você garantir hoje</h1>
  </td></tr>
  <tr><td style="padding:16px 40px 32px;color:#555555;font-size:16px;line-height:1.7;">
    <p>Quem acompanhou a live hoje viu ao vivo as últimas peças disponíveis pra entrega antes do Dia das Mães.</p>
    <p>Se você perdeu, ainda dá tempo — mas o prazo de despacho é amanhã. Depois disso, só retirada nas lojas físicas em Ribeirão Preto.</p>
  </td></tr>
  <tr><td style="padding:0 40px 40px;text-align:center;"><a href="[LINK_COLECAO]" style="display:inline-block;background:#C8956A;color:#FFFFFF;font-size:14px;font-weight:700;letter-spacing:1px;padding:16px 40px;text-decoration:none;border-radius:2px;">GARANTIR AGORA</a></td></tr>
  <tr><td style="background:#FAF7F4;padding:24px;text-align:center;font-size:12px;color:#999999;"><p style="margin:0;">Piuka Semijoias · Ribeirão Preto</p><p style="margin:8px 0 0;"><a href="[LINK_DESCADASTRO]" style="color:#999999;">Descadastrar</a></p></td></tr>
</table></body></html>` },

  { n: 6,  data: 'Sex 09/05', campanha: 'Último dia entrega garantida',
    subA: 'Último dia com entrega garantida para o Dia das Mães',
    subB: 'Amanhã ainda chega — mas só se você garantir hoje',
    pre:  'Depois disso, só retirada na loja.',
    cta:  'GARANTIR AGORA',
    copy: 'Se você ainda não garantiu o presente da sua mãe, hoje é o último dia com entrega confirmada pra Dia das Mães. A Coleção Letras e Religiosos ainda tem disponibilidade — mas o prazo de despacho fecha hoje. Depois disso, a opção é retirada nas lojas físicas em Ribeirão Preto.',
    html: `<!-- TEMPLATE ÚLTIMO DIA: substituir [FOTO_FLAT_LAY], [LINK_COLECAO], [LOGO_PIUKA], [LINK_DESCADASTRO] -->
<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Último dia entrega garantida</title></head>
<body style="margin:0;padding:0;background:#F5F5F5;font-family:Arial,sans-serif;">
<table width="600" align="center" cellpadding="0" cellspacing="0" style="background:#FFFFFF;">
  <tr><td style="background:#FAF7F4;padding:24px;text-align:center;"><img src="[LOGO_PIUKA]" alt="Piuka" width="120" style="display:block;margin:0 auto;"></td></tr>
  <tr><td style="padding:0;"><img src="[FOTO_FLAT_LAY]" alt="Coleção Piuka" width="600" style="display:block;width:100%;"></td></tr>
  <tr><td style="padding:32px 40px 8px;text-align:center;">
    <p style="margin:0;color:#C8956A;font-size:13px;font-weight:700;letter-spacing:2px;">ÚLTIMO DIA COM ENTREGA GARANTIDA</p>
    <h1 style="margin:12px 0 0;font-size:24px;color:#1A1A1A;font-weight:700;">Amanhã ainda chega — mas só se você garantir hoje</h1>
  </td></tr>
  <tr><td style="padding:16px 40px 32px;color:#555555;font-size:16px;line-height:1.7;">
    <p>Se você ainda não garantiu o presente da sua mãe, hoje é o último dia com entrega confirmada pra Dia das Mães.</p>
    <p>A Coleção Letras e Religiosos ainda tem disponibilidade — mas o prazo de despacho fecha hoje. Depois disso, a opção é retirada nas lojas físicas em Ribeirão Preto.</p>
  </td></tr>
  <tr><td style="padding:0 40px 40px;text-align:center;"><a href="[LINK_COLECAO]" style="display:inline-block;background:#C8956A;color:#FFFFFF;font-size:14px;font-weight:700;letter-spacing:1px;padding:16px 40px;text-decoration:none;border-radius:2px;">GARANTIR AGORA</a></td></tr>
  <tr><td style="background:#FAF7F4;padding:24px;text-align:center;font-size:12px;color:#999999;"><p style="margin:0;">Piuka Semijoias · Ribeirão Preto</p><p style="margin:8px 0 0;"><a href="[LINK_DESCADASTRO]" style="color:#999999;">Descadastrar</a></p></td></tr>
</table></body></html>` },
];

const lives = [
  { n: 1, plataforma: 'Shopee', data: '30/04', produto: 'Coleção Letras', preco: 'R$ 89,90', cupom: 'MAES10 — 10% OFF extra',
    ab_a: 'Você já sabe o que vai dar pra sua mãe? Porque eu tenho uma ideia muito boa aqui.',
    ab_b: 'Gente, acabou de chegar aqui e eu preciso te mostrar antes de esgotar.',
    produto_desc: 'Semijoia com pingente de letra personalizada, acabamento em ródio ou dourado, R$ 89,90',
    oferta: 'Cupom MAES10 — 10% OFF extra. Digita no campo de cupom na Shopee. Só durante a live.',
    cta: '"Coleção Letras com personalização, R$ 89,90 mais 10% OFF com o cupom MAES10 — só durante a live. Clica no carrinho, escolhe a letra dela e garante."' },
  { n: 2, plataforma: 'TikTok Shop', data: '05/05', produto: 'Coleção Religiosos', preco: 'R$ 79,90', cupom: 'TIKMAES — frete grátis',
    ab_a: 'Gente, presente de Dia das Mães que ela vai usar todo dia — deixa eu te mostrar.',
    ab_b: 'Faltam 6 dias pro Dia das Mães e eu tenho o presente perfeito aqui.',
    produto_desc: 'Colares e pingentes com medalhas e símbolos religiosos em semijoia, R$ 79,90',
    oferta: 'Cupom TIKMAES — frete grátis. Faltam 6 dias — e com entrega do TikTok Shop tem prazo.',
    cta: '"R$ 79,90 com frete grátis — cupom TIKMAES. Clica no carrinho e garante o dela."' },
  { n: 3, plataforma: 'Shopee', data: '08/05', produto: 'Últimas peças — urgência', preco: 'Letras R$ 89,90 | Religiosos R$ 79,90', cupom: 'ULTIMAMAES — 15% OFF',
    ab_a: 'Gente, faltam 3 dias e ainda dá tempo — mas só se você garantir hoje.',
    ab_b: 'Última live antes do Dia das Mães. Depois disso só na loja física.',
    produto_desc: 'Últimas peças disponíveis para entrega garantida antes do Dia das Mães',
    oferta: 'Cupom ULTIMAMAES — 15% OFF. Depois dessa live, só retirada na loja física.',
    cta: '"Clica agora, escolhe a letra, garante o presente dela."' },
];

const artes = [
  { nome: 'Arte 1 — Banner E-mail Hero Lançamento', json: {
    arte: 'banner_email_hero_lancamento', formato: 'banner_email', dimensoes: '600x400px',
    data_entrega: '25/04/2026', canal: 'e-mail RevSend',
    fundo: '#FFFFFF',
    restricoes: ['sem fundo preto', 'sem fonte serifada', 'logo canto inferior direito'],
    conteudo: { headline: 'Presente que ela merece', copy_apoio: 'Coleção Letras — personalizado com a inicial dela', cta: 'ESCOLHER O PRESENTE DELA', produto: 'Coleção Letras — foto shooting recente (colar sendo usado)' },
    hierarquia: { primeiro: 'produto em uso (modelo com colar)', segundo: 'headline centralizado', terceiro: 'botão CTA contrastante' },
    tipografia: { headline: { peso: 700, tamanho: '32px', cor: '#1A1A1A' }, cta: { peso: 700, cor: '#FFFFFF', fundo_botao: '#C8956A' } },
    logo: { posicao: 'bottom_right', tamanho: '80px' },
  }},
  { nome: 'Arte 2 — Post Feed Instagram Lançamento', json: {
    arte: 'post_feed_lancamento', formato: 'feed_quadrado', dimensoes: '1080x1080px',
    data_entrega: '25/04/2026', canal: 'Instagram feed',
    fundo: '#FAF7F4',
    restricoes: ['sem fundo preto', 'sem fonte serifada', 'logo canto inferior direito'],
    conteudo: { texto_arte: 'Presente que ela vai usar todo dia', produto: 'Coleção Letras — foto shooting', obs: 'produto ocupa 70% do frame' },
    hierarquia: { primeiro: 'produto (70% do frame)', segundo: 'texto sutil no rodapé' },
    tipografia: { texto: { peso: 400, tamanho: '28px', cor: '#1A1A1A' } },
    logo: { posicao: 'bottom_right', tamanho: '60px' },
  }},
  { nome: 'Arte 3 — Stories 3 Frames Lançamento', json: {
    arte: 'stories_lancamento_3frames', formato: 'stories_vertical', dimensoes: '1080x1920px',
    data_entrega: '25/04/2026', canal: 'Instagram stories',
    restricoes: ['sem fundo preto', 'sem fonte serifada', 'logo canto inferior direito'],
    frames: [
      { frame: 1, fundo: '#FAF7F4', texto: 'Você já sabe o que vai dar pra sua mãe?', tipografia: { peso: 700, tamanho: '36px', cor: '#1A1A1A' } },
      { frame: 2, fundo: '#FFFFFF', texto_principal: 'Coleção Letras e Religiosos', texto_apoio: 'Personalizado com a inicial dela', produto: 'close colar com letra' },
      { frame: 3, fundo: '#C8956A', texto: 'Garante o dela antes de esgotar', cta: 'VER COLEÇÃO', tipografia: { texto: { cor: '#FFFFFF' }, cta: { cor: '#C8956A', fundo_botao: '#FFFFFF' } } },
    ],
    logo: { posicao: 'bottom_right', em_todos_os_frames: true, tamanho: '60px' },
  }},
  { nome: 'Arte 4 — Liquidação Relâmpago Pulseiras', json: {
    arte: 'banner_liquidacao_pulseiras', formato: ['feed_quadrado', 'banner_email'],
    dimensoes: { feed: '1080x1080px', email: '600x400px' },
    data_entrega: '28/04/2026', canal: ['Instagram', 'e-mail'],
    fundo: '#1A1A1A',
    obs: 'Única exceção ao sem-fundo-preto — campanha de urgência. Validar com Ana.',
    conteudo: { headline: '30% OFF', copy_apoio: 'Pulseiras — só hoje', urgencia: '24 horas', produto: 'linha de pulseiras — fotos catálogo' },
    tipografia: { headline: { peso: 800, tamanho: '96px', cor: '#C8956A' }, copy_apoio: { tamanho: '24px', cor: '#FFFFFF' } },
    logo: { posicao: 'bottom_right', tamanho: '60px' },
  }},
  { nome: 'Arte 5 — Urgência Final 09/05', json: {
    arte: 'post_urgencia_final', formato: ['feed_quadrado', 'banner_email'],
    dimensoes: { feed: '1080x1080px', email: '600x400px' },
    data_entrega: '07/05/2026', canal: ['Instagram', 'e-mail'],
    fundo: '#FFFFFF',
    restricoes: ['sem fundo preto', 'sem fonte serifada', 'logo canto inferior direito'],
    conteudo: { headline: 'Último dia com entrega garantida', copy_apoio: 'Depois de hoje, só retirada na loja', produto: 'Coleção Letras + Religiosos flat lay', cta: 'GARANTIR AGORA' },
    tipografia: { headline: { peso: 700, tamanho: '36px', cor: '#1A1A1A' }, copy_apoio: { tamanho: '18px', cor: '#C8956A' }, cta: { cor: '#FFFFFF', fundo_botao: '#1A1A1A' } },
    logo: { posicao: 'bottom_right', tamanho: '60px' },
  }},
];

// ── BLOCOS REUTILIZÁVEIS POR PESSOA ──────────────────────────────────────────

function blocosAmanda() {
  const items = [];
  items.push(
    body('Amanda é responsável pelo calendário editorial e publicação em todos os canais digitais. Este sub-doc contém tudo que ela precisa para executar o mês sem depender da Ana para cada detalhe.', { col: MD }),
    sp(120),
    subHeader('CALENDÁRIO EDITORIAL — MAIO 2026'), sp(60),
    tableBlock(
      ['DATA', 'CANAL', 'FORMATO', 'COPY', 'VISUAL'],
      [
        ['28/04 (ter)', 'Insta feed', 'Post lançamento', 'Opção A — "Ela usa todo dia..."', 'Arte 2'],
        ['28/04 (ter)', 'Stories', 'Seq. 3 frames', 'Frames seção copy', 'Arte 3'],
        ['29/04 (qua)', 'TikTok', 'Post orgânico', 'Opção A TikTok — "Presente de Dia das Mães..."', 'Vídeo produto'],
        ['01/05 (qui)', 'Insta feed', 'Post relâmpago', '30% OFF pulseiras — só hoje', 'Arte 4'],
        ['01/05 (qui)', 'Stories', 'Urgência 24h', '30% OFF — arrasta pra ver', 'Arte 4 stories'],
        ['03/05 (sáb)', 'Insta feed', 'Aquecimento', 'Faltam 8 dias. Você já escolheu?', 'Flat lay coleção'],
        ['05/05 (seg)', 'TikTok', 'Aviso live', 'Live hoje às [HORÁRIO] — Coleção Religiosos', 'Card live'],
        ['06/05 (ter)', 'Insta feed', 'Urgência média', 'Prazo de personalização fechando em breve', 'Close produto'],
        ['08/05 (qui)', 'Stories', 'Live Shopee', 'Live agora — últimas peças, garante na bio', 'Card live'],
        ['09/05 (sex)', 'Insta feed', 'Urgência final', 'Último dia com entrega garantida', 'Arte 5'],
        ['10/05 (sáb)', 'Stories', 'Último dia', 'Amanhã é o dia — ainda dá na loja física', 'Card loja física'],
        ['11/05 (dom)', 'Insta feed', 'Dia das Mães', 'Post celebração — sem CTA de venda', 'Editorial afetivo'],
      ]
    ),
    sp(80),
    body('Regras de publicação:', { bold: true }),
    body('• Nunca publicar dois posts com CTA de venda no mesmo dia no feed', { bullet: false }),
    body('• Stories podem ser publicados mesmo em dias sem feed', { bullet: false }),
    body('• TikTok: adaptar a copy do Instagram, nunca copiar igual', { bullet: false }),
    body('• Dia 11 (Dia das Mães): post afetivo sem preço, sem link de compra', { bullet: false }),
  );
  return items;
}

function blocosIsabelle() {
  const items = [];
  items.push(
    body('Isabelle é responsável por todas as artes digitais da campanha. Cada arte tem um JSON completo com dimensões, hierarquia, tipografia, cores e restrições. Nenhuma arte deve ser entregue sem aprovação do JSON antes.', { col: MD }),
    sp(120),
    subHeader('PRIORIDADE DE ARTES — DATAS CRÍTICAS'), sp(60),
    tableBlock(
      ['ARTE', 'DATA LIMITE', 'CANAL', 'PRIORIDADE'],
      [
        ['Banner e-mail hero lançamento', '25/04', 'E-mail RevSend', 'CRÍTICO'],
        ['Post feed Instagram lançamento', '25/04', 'Instagram', 'CRÍTICO'],
        ['Stories 3 frames lançamento', '25/04', 'Instagram', 'CRÍTICO'],
        ['Banner liquidação pulseiras', '28/04', 'Instagram + e-mail', 'URGENTE'],
        ['Post aquecimento 03/05', '01/05', 'Instagram', 'Normal'],
        ['Arte urgência final 09/05', '07/05', 'Instagram + e-mail', 'Importante'],
      ]
    ),
    sp(120),
    subHeader('JSON DAS ARTES'), sp(40),
    body('As artes abaixo devem ser executadas exatamente conforme o JSON. Dúvidas sobre hierarquia ou fonte: consultar Ana antes de produzir.', { col: MD, it: true }),
    sp(80),
  );
  artes.forEach(a => {
    items.push(
      colorBlock(a.nome, LT, { sz: 20, padV: 100, col: DK }),
      sp(40),
      codeBlock(JSON.stringify(a.json, null, 2)),
      sp(80),
    );
  });
  return items;
}

function blococsPietra() {
  const items = [];
  items.push(
    body('Pietra conduz todas as lives da campanha. Os roteiros abaixo têm estrutura fixa, mas os campos [ESPAÇO PIETRA] são para ela preencher com a própria linguagem antes de cada live.', { col: MD }),
    sp(120),
  );
  lives.forEach(l => {
    items.push(
      subHeader(`Live ${l.n}  ·  ${l.plataforma}  ·  ${l.data}`), sp(60),
      labelBlock('Produto', l.produto),
      labelBlock('Preço', l.preco),
      labelBlock('Cupom exclusivo', l.cupom),
      sp(80),
      body('[00:00–00:03]  ABERTURA', { bold: true, col: PR }),
      body(`Opção A: ${l.ab_a}`, { col: MD }),
      body(`Opção B: ${l.ab_b}`, { col: MD }),
      sp(40),
      body('[00:03–00:15]  PRODUTO', { bold: true, col: PR }),
      body(l.produto_desc, { col: MD }),
      body('[ESPAÇO PIETRA — adicione histórias pessoais, como você usa, o que sente usando]', { it: true, col: PR }),
      sp(40),
      body('[00:15–00:25]  OFERTA', { bold: true, col: PR }),
      body(l.oferta, { col: MD }),
      sp(40),
      body('[00:25–00:30]  ENGAJAMENTO', { bold: true, col: PR }),
      body('[ESPAÇO PIETRA — pergunte algo para o chat, leia comentários, responda ao vivo]', { it: true, col: PR }),
      sp(40),
      body('[CTA FINAL]', { bold: true, col: PR }),
      body(l.cta, { col: MD }),
      sp(120),
    );
  });
  return items;
}

function blocoJoy() {
  const items = [];
  items.push(
    body('Joy cuida do CRM, segmentação de base e cadência de disparos. As 22 datas de e-mail já estão planejadas — este sub-doc traz a lógica de quem recebe o quê e quando.', { col: MD }),
    sp(120),
    subHeader('SEGMENTAÇÃO DA BASE'), sp(60),
    tableBlock(
      ['SEGMENTO', 'CANAL', 'DISPARAR EM', 'TOM'],
      [
        ['Ativas (últimos 90 dias)', 'E-mail + WhatsApp', '29/04', 'Direto — já conhece a marca'],
        ['Inativas (90+ dias)', 'E-mail', '03/05', 'Reativação — oferta mais agressiva'],
        ['Leads sem compra', 'E-mail', '06/05', 'Apresentação + oferta de entrada'],
      ]
    ),
    sp(80),
    subHeader('FLUXO DE DISPAROS'), sp(60),
    tableBlock(
      ['DISPARO', 'DATA', 'QUEM RECEBE'],
      [
        ['1 — Lançamento Coleção Letras', '29/04', 'Todos os segmentos'],
        ['2 — Lembrete aquecimento', '03/05', 'Quem não abriu o disparo 1'],
        ['3 — Urgência personalização', '06/05', 'Quem abriu mas não comprou'],
        ['4 — Último dia entrega garantida', '09/05', 'Quem abriu qualquer e-mail mas não converteu'],
      ]
    ),
    sp(80),
    body('Não duplicar: carrinho abandonado, pós-venda e CRM bônus já rodam em automação separada.', { col: PR, bold: true }),
    sp(80),
    body('Whitelist de não-envio:', { bold: true }),
    body('• Clientes que já compraram na campanha — recebem apenas o e-mail de Dia das Mães afetivo (11/05)', { col: MD }),
    body('• Quem pediu descadastro em abril: não reativar neste ciclo', { col: MD }),
  );
  return items;
}

function blocoMarcela() {
  const items = [];
  items.push(
    body('Marcela é o braço-direito da Ana. Este sub-doc traz todas as tasks do mês organizadas por responsável, data e o que ela precisa cobrar de cada pessoa.', { col: MD }),
    sp(120),
    subHeader('TASKS DO MÊS — VISÃO GERAL'), sp(60),
    tableBlock(
      ['TASK', 'RESPONSÁVEL', 'DATA LIMITE', 'STATUS'],
      [
        ['Artes críticas entregues (3 peças)', 'Isabelle', '25/04', '⬜ pendente'],
        ['E-mails semana 1 agendados no RevSend', 'Joy', '26/04', '⬜ pendente'],
        ['Calendário Instagram no Trello', 'Amanda', '26/04', '⬜ pendente'],
        ['Roteiros de live preenchidos (campos Pietra)', 'Pietra', '29/04', '⬜ pendente'],
        ['Campanha loja física RP preparada', 'Marcela', '07/05', '⬜ pendente'],
      ]
    ),
    sp(120),
    subHeader('DETALHAMENTO POR PESSOA'), sp(80),
    body('Isabelle — cobrar até 25/04:', { bold: true, col: PR }),
    body('• Banner e-mail hero + post feed + stories 3 frames', { col: MD }),
    body('• Material de referência: JSON de artes no sub-doc da Isabelle', { col: MD }),
    body('• Se tiver dúvida de hierarquia ou fonte: resolver com Ana antes de produzir', { col: MD }),
    sp(60),
    body('Joy — cobrar até 26/04:', { bold: true, col: PR }),
    body('• E-mails 1 a 4 agendados no RevSend com subject, pré-header e copy', { col: MD }),
    body('• HTML de cada e-mail: usar os templates no briefing master', { col: MD }),
    body('• Confirmação de segmentação da base antes de agendar', { col: MD }),
    sp(60),
    body('Amanda — cobrar até 26/04:', { bold: true, col: PR }),
    body('• Calendário completo no Trello (1 card por post)', { col: MD }),
    body('• Copy e referência visual já estão no sub-doc da Amanda', { col: MD }),
    sp(60),
    body('Pietra — cobrar até 29/04:', { bold: true, col: PR }),
    body('• Roteiro live 1 lido e campos [ESPAÇO PIETRA] preenchidos', { col: MD }),
    body('• Confirmar disponibilidade dos produtos que vai mostrar', { col: MD }),
    sp(60),
    body('Marcela — própria task:', { bold: true, col: PR }),
    body('• Coordenar material visual e comunicação para lojas físicas RP (10–11/05)', { col: MD }),
    body('• Referência: super doc seção 1 do briefing master', { col: MD }),
  );
  return items;
}

// ── BUILDER: DOC MASTER ───────────────────────────────────────────────────────

function buildMaster() {
  const c = [];

  // CAPA
  c.push(
    colorBlock('PIUKA', DK, { sz: 48, padV: 320, align: AlignmentType.CENTER }),
    colorBlock('BRIEFING MENSAL  ·  MAIO 2026', PR, { sz: 28, padV: 200, align: AlignmentType.CENTER }),
    sp(80),
    colorBlock('Campanha principal: Dia das Mães — "Presente que ela merece"', LT, { sz: 22, padV: 140, col: DK, align: AlignmentType.CENTER }),
    sp(60),
    colorBlock('Período da campanha: 28/04/2026  →  11/05/2026  ·  Mês completo: 01/05  →  31/05/2026', LT, { sz: 18, padV: 100, col: MD, align: AlignmentType.CENTER }),
    sp(200), divider(),
  );

  // 1. SUPER DOC
  c.push(sp(200), sectionHeader('1  |  SUPER DOC DA CAMPANHA'), sp(80));
  c.push(
    labelBlock('Campanha', 'Dia das Mães — Presente que ela merece'),
    labelBlock('Período campanha', '28/04/2026  →  11/05/2026'),
    labelBlock('Produto principal', 'Coleção Letras + Coleção Religiosos'),
    labelBlock('Promessa central', 'O presente que ela vai usar todo dia — personalizado com a inicial dela'),
    labelBlock('Tom do mês', 'Emocional com urgência progressiva. Sem clichê de "mãe é tudo".'),
    labelBlock('Diferencial', 'Personalização com inicial — presente afetivo, não só acessório'),
    labelBlock('Canais ativos', 'E-mail (22 disparos) · Instagram · TikTok · WhatsApp · Meta Ads · Lives (3) · Loja física RP'),
    labelBlock('Campanha secundária', 'Liquidação Relâmpago Pulseiras — 01/05 · 30% OFF · 24 horas'),
    labelBlock('Restrições', 'Anéis ouro 18K fora de promoção · Sem sobrecarga de campanhas simultâneas · Sem copy genérica de Dia das Mães'),
    labelBlock('Cliente-alvo', 'Mulher 22–38 anos, classe B/C, Ribeirão Preto e região. Descobre via Instagram e TikTok.'),
    labelBlock('Métricas-alvo', 'Taxa abertura e-mail >28% · CTR e-mail >3,5% · Conversão campanhas pagas >1,8% · Meta faturamento: [CAMPO_ANA]'),
  );
  c.push(sp(80));

  // Calendário master
  c.push(subHeader('CALENDÁRIO DO MÊS'), sp(60));
  c.push(tableBlock(
    ['DATA', 'EVENTO', 'CANAL', 'RESPONSÁVEL'],
    [
      ['28/04 (ter)', 'Lançamento campanha Dia das Mães', 'Feed + Stories + E-mail 1', 'Amanda + Joy'],
      ['29/04 (qua)', 'TikTok orgânico lançamento', 'TikTok', 'Amanda'],
      ['30/04 (qui)', 'Live 1 — Shopee Coleção Letras', 'Shopee', 'Pietra'],
      ['01/05 (qui)', 'Liquidação Relâmpago Pulseiras 30% OFF', 'Feed + E-mail 2', 'Amanda + Joy'],
      ['03/05 (sáb)', 'Aquecimento — faltam 8 dias', 'Feed + E-mail 3', 'Amanda + Joy'],
      ['05/05 (seg)', 'Live 2 — TikTok Shop Coleção Religiosos', 'TikTok Shop', 'Pietra'],
      ['06/05 (ter)', 'Urgência personalização', 'Feed + E-mail 4', 'Amanda + Joy'],
      ['08/05 (qui)', 'Live 3 — Shopee últimas peças', 'Shopee', 'Pietra'],
      ['08/05 (qui)', 'Pós-live — e-mail urgência', 'E-mail 5', 'Joy'],
      ['09/05 (sex)', 'Último dia entrega garantida', 'Feed + Stories + E-mail 6', 'Amanda + Joy'],
      ['10/05 (sáb)', 'Lembrete último dia + loja física', 'Stories + WhatsApp', 'Amanda + Marcela'],
      ['11/05 (dom)', 'Dia das Mães — post afetivo', 'Feed + Stories', 'Amanda'],
    ]
  ));
  c.push(sp(120), divider());

  // 2. DIRETRIZES DE COPY POR CANAL
  c.push(sp(200), sectionHeader('2  |  DIRETRIZES DE COPY POR CANAL'), sp(80));
  c.push(
    body('Este bloco define tom, linguagem e restrições por canal. As copies prontas estão nos sub-docs individuais de Amanda e Joy.', { col: MD, it: true }),
    sp(80),
  );

  c.push(subHeader('Instagram Feed'), sp(60));
  c.push(
    labelBlock('Tom', 'Direto, afetivo sem ser sentimental. Foco no uso do produto, não na emoção genérica de Dia das Mães.'),
    labelBlock('CTA padrão', '"Link na bio" ou "Arrasta pra ver" em posts de carrossel'),
    labelBlock('Hashtags', '#piuka #semijoia #diaDasMaes #presentedalva #joias — max 5 por post'),
    labelBlock('Proibido', 'Frases clichê: "mãe é tudo", "amor incondicional". Manter copy específica no produto.'),
  );

  c.push(sp(80), subHeader('Instagram Stories'), sp(60));
  c.push(
    labelBlock('Tom', 'Mais espontâneo. Pode usar interrogação. Urgência explícita é bem-vinda.'),
    labelBlock('Estrutura padrão', 'Frame 1: pergunta ou gancho · Frame 2: produto + benefício · Frame 3: CTA com botão'),
    labelBlock('CTA padrão', 'Botão "VER COLEÇÃO" ou "COMPRAR AGORA" no último frame'),
  );

  c.push(sp(80), subHeader('TikTok'), sp(60));
  c.push(
    labelBlock('Tom', 'Mais próximo, coloquial. "Gente" como vocativo é ok. Emojis com moderação.'),
    labelBlock('Hashtags', '#diaDasMaes #semijoia #piuka #presente — max 4'),
    labelBlock('Importante', 'Nunca copiar copy do Instagram. Reescrever sempre para o tom TikTok.'),
  );

  c.push(sp(80), subHeader('WhatsApp'), sp(60));
  c.push(
    labelBlock('Tom', 'Direto e pessoal. Trata como conversa, não como anúncio. Sem excesso de emoji.'),
    labelBlock('Tamanho', 'Máximo 3 parágrafos curtos. Sempre terminar com link.'),
    labelBlock('Momentos', 'Lançamento (28/04) + Último dia (10/05) + Lojas físicas se relevante'),
  );

  c.push(sp(80), subHeader('Meta Ads — Regras de A/B'), sp(60));
  c.push(
    labelBlock('Variação A', 'Urgência — headline com prazo ou escassez, CTA "Comprar agora"'),
    labelBlock('Variação B', 'Benefício — headline com proposta de valor, CTA "Ver coleção"'),
    labelBlock('Testar primeiro', 'Variação B nos primeiros 3 dias, virar para A se CTR < 1,5%'),
    labelBlock('Segmentação', 'Mulheres 22–45 anos · Ribeirão Preto + 50km · Interesse em moda e presentes'),
  );
  c.push(sp(120), divider());

  // 3. E-MAILS
  c.push(sp(200), sectionHeader('3  |  E-MAILS DO MÊS  (22 disparos)'), sp(80));
  c.push(
    body('Os 6 e-mails da campanha principal estão detalhados abaixo com copy, HTML estruturado e subject A/B. Os 16 disparos restantes do mês seguem a cadência CRM padrão (automações de carrinho, pós-venda, reativação).', { col: MD, it: true }),
    sp(80),
    body('Estrutura de HTML: width 600px, background #FAF7F4 no header/footer, tipografia Arial, botões com background #C8956A. Os placeholders entre [colchetes] devem ser preenchidos por Joy antes do agendamento.', { col: MD, it: true }),
    sp(120),
  );

  emails.forEach(e => {
    c.push(
      subHeader(`E-mail ${e.n} de 22  ·  ${e.data}`), sp(60),
      labelBlock('Campanha', e.campanha),
      labelBlock('Subject A', e.subA),
      labelBlock('Subject B', e.subB),
      labelBlock('Pré-header', e.pre),
      labelBlock('CTA principal', e.cta),
      sp(60),
      body('Copy do e-mail:', { bold: true }),
      body(e.copy, { col: MD }),
      sp(80),
      body('HTML (estrutura base — substituir placeholders [ENTRE COLCHETES]):', { bold: true }),
      codeBlock(e.html),
      sp(120),
    );
  });
  c.push(divider());

  // 4. ROTEIROS DE LIVE
  c.push(sp(200), sectionHeader('4  |  ROTEIROS DE LIVE  (Pietra)'), sp(80));
  blococsPietra().forEach(b => c.push(b));
  c.push(divider());

  // 5. JSON DE ARTES
  c.push(sp(200), sectionHeader('5  |  JSON DE ARTES  (Isabelle)'), sp(80));
  artes.forEach(a => {
    c.push(subHeader(a.nome), sp(40), codeBlock(JSON.stringify(a.json, null, 2)), sp(100));
  });
  c.push(divider());

  // 6. SUB-DOCS (resumo no master)
  c.push(sp(200), sectionHeader('6  |  SUB-DOCS POR POSIÇÃO'), sp(80));
  c.push(
    body('Os sub-docs completos foram gerados como arquivos individuais. Este bloco é o resumo de escopo de cada pessoa.', { col: MD, it: true }),
    sp(80),
  );

  c.push(subHeader('AMANDA — Calendário Editorial'), sp(60));
  blocosAmanda().forEach(b => c.push(b));
  c.push(sp(120));

  c.push(subHeader('ISABELLE — Prioridade de Artes'), sp(60));
  c.push(tableBlock(
    ['ARTE', 'DATA LIMITE', 'CANAL', 'PRIORIDADE'],
    artes.map((a, i) => [a.nome.replace('Arte ' + (i+1) + ' — ', ''), a.json.data_entrega, Array.isArray(a.json.canal) ? a.json.canal.join(' + ') : a.json.canal, i < 3 ? 'CRÍTICO' : i === 3 ? 'URGENTE' : 'Importante'])
  ));
  c.push(sp(40), body('JSON completo de cada arte: sub-doc individual da Isabelle ou seção 5 deste doc.', { col: MD, it: true }), sp(120));

  c.push(subHeader('PIETRA — Lives do Mês'), sp(60));
  c.push(tableBlock(
    ['DATA', 'PLATAFORMA', 'PRODUTO', 'CUPOM', 'DURAÇÃO'],
    lives.map(l => [l.data, l.plataforma, l.produto, l.cupom.split(' ')[0], '20–30 min'])
  ));
  c.push(sp(40), body('Roteiros completos: seção 4 deste doc + sub-doc individual Pietra.', { col: MD, it: true }), sp(120));

  c.push(subHeader('JOY — CRM e Cadência'), sp(60));
  blocoJoy().forEach(b => c.push(b));
  c.push(sp(120));

  c.push(subHeader('MARCELA — Tasks do Mês'), sp(60));
  blocoMarcela().forEach(b => c.push(b));
  c.push(sp(120), divider());

  // 7. TASKS TRELLO
  c.push(sp(200), sectionHeader('7  |  TASKS TRELLO'), sp(80));
  const tasks = [
    { titulo: 'Artes críticas — lançamento Dia das Mães', resp: 'Isabelle', data: '25/04', lista: 'Campanhas do Mês',
      fazer: 'Criar banner e-mail hero + post feed + stories 3 frames conforme JSON na seção 5',
      material: 'Sub-doc Isabelle + seção 5 deste briefing',
      escalar: 'Só se o JSON tiver lacuna que não consegue resolver sozinha' },
    { titulo: 'Agendar e-mails semana 1 no RevSend', resp: 'Joy', data: '26/04', lista: 'Campanhas do Mês',
      fazer: 'Agendar e-mails 1 a 4 com subject A/B, pré-header, copy e HTML prontos',
      material: 'Seção 3 deste briefing + sub-doc Joy',
      escalar: 'Se o template RevSend não comportar a estrutura HTML' },
    { titulo: 'Calendário Instagram — criar cards no Trello', resp: 'Amanda', data: '26/04', lista: 'Campanhas do Mês',
      fazer: 'Criar 1 card por post do calendário com copy e referência visual',
      material: 'Sub-doc Amanda + seção 2 deste briefing',
      escalar: 'Se uma data conflitar com algo não previsto' },
    { titulo: 'Roteiros de live — preencher [ESPAÇO PIETRA]', resp: 'Pietra', data: '29/04', lista: 'Campanhas do Mês',
      fazer: 'Ler roteiro live 1 (seção 4) e preencher campos pessoais antes da live',
      material: 'Sub-doc Pietra + seção 4 deste briefing',
      escalar: 'Se produto não estiver disponível para mostrar na live' },
    { titulo: 'Campanha loja física RP — fim de semana Dia das Mães', resp: 'Marcela', data: '07/05', lista: 'Campanhas Lojas Físicas',
      fazer: 'Coordenar material visual e comunicação para lojas RP (10–11/05)',
      material: 'Super doc seção 1 deste briefing',
      escalar: 'Qualquer decisão sobre desconto ou ação extra nas lojas' },
  ];
  tasks.forEach(t => {
    c.push(
      colorBlock(t.titulo, DK, { sz: 20, padV: 100 }),
      labelBlock('Responsável', t.resp),
      labelBlock('Data limite', t.data),
      labelBlock('Lista Trello', t.lista),
      labelBlock('O que fazer', t.fazer),
      labelBlock('Material de referência', t.material),
      labelBlock('Quando escalar para Ana', t.escalar),
      sp(80),
    );
  });
  c.push(divider());

  // 8. JSON CONSOLIDADO
  c.push(sp(200), sectionHeader('8  |  JSON CONSOLIDADO'), sp(80));
  const jsonConsolidado = {
    mes: 'Maio 2026', gerado_em: '12/04/2026',
    campanha_principal: {
      nome: 'Dia das Mães — Presente que ela merece',
      periodo: { inicio: '28/04/2026', fim: '11/05/2026' },
      produto: 'Coleção Letras + Coleção Religiosos',
      precos: { colecao_letras: 'R$ 89,90', colecao_religiosos: 'R$ 79,90' },
      cupons: { MAES10: '10% OFF extra — Shopee live 30/04', TIKMAES: 'frete grátis — TikTok Shop live 05/05', ULTIMAMAES: '15% OFF — Shopee live 08/05' },
      tom: 'Emocional com urgência progressiva. Sem clichê.',
      canais: ['e-mail', 'instagram', 'tiktok', 'whatsapp', 'meta_ads', 'lives', 'loja_fisica'],
      volume_emails: 22,
      lives: lives.map(l => ({ data: l.data, plataforma: l.plataforma, produto: l.produto, cupom: l.cupom.split(' ')[0] })),
      campanhas_secundarias: [{ data: '01/05', nome: 'Liquidação Pulseiras', desconto: '30% OFF', duracao: '24h' }],
      restricoes: ['Anéis ouro 18K fora de promoção', 'Sem sobrecarga simultânea', 'Sem copy genérica Dia das Mães'],
    },
    metricas_alvo: { abertura_email: '>28%', ctr_email: '>3,5%', conversao_paga: '>1,8%', faturamento_meta: '[CAMPO_ANA]' },
    emails: 22, artes: 5, lives: 3, trello_tasks: 5,
    sub_docs: ['Amanda', 'Isabelle', 'Pietra', 'Joy', 'Marcela'],
  };
  c.push(codeBlock(JSON.stringify(jsonConsolidado, null, 2)), sp(120), divider());

  // RODAPÉ
  c.push(sp(200), colorBlock('PIUKA  ·  BRIEFING MAIO 2026  ·  Agente de Briefing Styem  ·  12/04/2026', LT, { sz: 18, padV: 120, col: MD, align: AlignmentType.CENTER }));

  return c;
}

// ── BUILDER: SUB-DOCS ─────────────────────────────────────────────────────────

function buildSubDoc(nome, cargoPT, intro, blocos) {
  const c = [];
  c.push(
    colorBlock('PIUKA', DK, { sz: 36, padV: 240, align: AlignmentType.CENTER }),
    colorBlock(`BRIEFING MAIO 2026  ·  ${nome.toUpperCase()}`, PR, { sz: 24, padV: 160, align: AlignmentType.CENTER }),
    sp(60),
    colorBlock(cargoPT, LT, { sz: 18, padV: 100, col: MD, align: AlignmentType.CENTER }),
    sp(200), divider(),
    sp(120),
    ...blocos,
    sp(200),
    colorBlock(`PIUKA  ·  ${nome.toUpperCase()}  ·  MAIO 2026  ·  Agente de Briefing Styem`, LT, { sz: 16, padV: 100, col: MD, align: AlignmentType.CENTER }),
  );
  return c;
}

// ── GERAR DOCS ────────────────────────────────────────────────────────────────

async function gerarTodos() {
  const jobs = [
    { path: OUT_MASTER, children: buildMaster(), label: 'master' },
    { path: OUT_SUBS.amanda,   children: buildSubDoc('Amanda',   'Social Media — Calendário Editorial e Publicação', '', blocosAmanda()),  label: 'subdoc_amanda' },
    { path: OUT_SUBS.isabelle, children: buildSubDoc('Isabelle', 'Designer — JSON de Artes e Prioridade de Entrega', '', blocosIsabelle()), label: 'subdoc_isabelle' },
    { path: OUT_SUBS.pietra,   children: buildSubDoc('Pietra',   'Lives — Roteiros e Cupons Exclusivos', '', blococsPietra()),   label: 'subdoc_pietra' },
    { path: OUT_SUBS.joy,      children: buildSubDoc('Joy',      'CRM — Segmentação e Cadência de Disparos', '', blocoJoy()),       label: 'subdoc_joy' },
    { path: OUT_SUBS.marcela,  children: buildSubDoc('Marcela',  'Braço-direito da Ana — Tasks e Cobranças do Mês', '', blocoMarcela()),  label: 'subdoc_marcela' },
  ];

  for (const job of jobs) {
    const doc = makeDoc(job.children);
    const buf = await Packer.toBuffer(doc);
    fs.writeFileSync(job.path, buf);
    console.log(`✓ ${job.label}: ${path.basename(job.path)}`);
  }
}

gerarTodos().catch(e => { console.error('Erro:', e.message); process.exit(1); });
