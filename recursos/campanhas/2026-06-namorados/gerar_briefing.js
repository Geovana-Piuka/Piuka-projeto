const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageNumber, PageBreak, LevelFormat
} = require('docx');
const fs = require('fs');
const path = require('path');

const outputDir = path.dirname(__filename);

const GOLD = 'B8860B';
const DARK = '1A1A1A';
const GRAY_BG = 'F5F5F5';
const GOLD_BG = 'FFF8E1';
const WHITE = 'FFFFFF';
const WARN_BG = 'FFF3CD';

const border = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 120 },
    children: [new TextRun({ text, bold: true, size: 36, font: 'Arial', color: DARK })]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 80 },
    children: [new TextRun({ text, bold: true, size: 28, font: 'Arial', color: DARK })]
  });
}

function h3(text) {
  return new Paragraph({
    spacing: { before: 200, after: 60 },
    children: [new TextRun({ text, bold: true, size: 24, font: 'Arial', color: DARK })]
  });
}

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, size: 22, font: 'Arial', color: DARK, ...opts })]
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    spacing: { before: 40, after: 40 },
    children: [new TextRun({ text, size: 22, font: 'Arial', color: DARK })]
  });
}

function labelValue(label, value) {
  return new Paragraph({
    spacing: { before: 60, after: 40 },
    children: [
      new TextRun({ text: label + ': ', bold: true, size: 22, font: 'Arial', color: DARK }),
      new TextRun({ text: value, size: 22, font: 'Arial', color: DARK })
    ]
  });
}

function divider() {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD } },
    children: []
  });
}

function warning(text) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    shading: { fill: WARN_BG, type: ShadingType.CLEAR },
    children: [new TextRun({ text: '⚠️  ' + text, size: 22, font: 'Arial', color: DARK })]
  });
}

function makeEmailTable(emails) {
  const headerRow = new TableRow({
    tableHeader: true,
    children: ['#', 'Data', 'Hora', 'Assunto A', 'Assunto B', 'Pré-header', 'Objetivo', 'Influencer', 'Status'].map((text, i) => {
      const widths = [400, 600, 600, 2000, 2000, 1500, 800, 1200, 600];
      return new TableCell({
        borders,
        width: { size: widths[i], type: WidthType.DXA },
        shading: { fill: DARK, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 18, font: 'Arial', color: WHITE })] })]
      });
    })
  });

  const dataRows = emails.map((e, idx) => new TableRow({
    children: [
      e.n.toString(), e.data, e.hora, e.assuntoA, e.assuntoB, e.preheader, e.objetivo, e.influencer, e.status
    ].map((text, i) => {
      const widths = [400, 600, 600, 2000, 2000, 1500, 800, 1200, 600];
      return new TableCell({
        borders,
        width: { size: widths[i], type: WidthType.DXA },
        shading: { fill: idx % 2 === 0 ? WHITE : GRAY_BG, type: ShadingType.CLEAR },
        margins: { top: 60, bottom: 60, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun({ text, size: 18, font: 'Arial', color: DARK })] })]
      });
    })
  }));

  return new Table({
    width: { size: 9700, type: WidthType.DXA },
    columnWidths: [400, 600, 600, 2000, 2000, 1500, 800, 1200, 600],
    rows: [headerRow, ...dataRows]
  });
}

function makeCalendarioTable(rows) {
  const cols = ['Data', 'Tipo', 'Canal', 'Formato', 'Copy', 'Visual'];
  const widths = [600, 800, 1200, 900, 3500, 1700];

  const headerRow = new TableRow({
    tableHeader: true,
    children: cols.map((text, i) => new TableCell({
      borders,
      width: { size: widths[i], type: WidthType.DXA },
      shading: { fill: DARK, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 100, right: 100 },
      children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 18, font: 'Arial', color: WHITE })] })]
    }))
  });

  const dataRows = rows.map((row, idx) => new TableRow({
    children: row.map((text, i) => new TableCell({
      borders,
      width: { size: widths[i], type: WidthType.DXA },
      shading: { fill: idx % 2 === 0 ? WHITE : GRAY_BG, type: ShadingType.CLEAR },
      margins: { top: 60, bottom: 60, left: 100, right: 100 },
      children: [new Paragraph({ children: [new TextRun({ text, size: 18, font: 'Arial', color: DARK })] })]
    }))
  }));

  return new Table({
    width: { size: 8700, type: WidthType.DXA },
    columnWidths: widths,
    rows: [headerRow, ...dataRows]
  });
}

const emails = [
  { n: 1, data: '02/06', hora: '10:00', assuntoA: 'Chegou: Coleção Namorados 2026 por Ariane', assuntoB: 'A coleção que ela vai usar além do 12/06', preheader: 'O presente que não fica na gaveta', objetivo: 'venda', influencer: 'Ariane (@arianecanovas)', status: 'pendente' },
  { n: 2, data: '04/06', hora: '18:30', assuntoA: 'Você viu a Coleção Namorados da Ariane?', assuntoB: 'Ainda não viu? A coleção já está bombando', preheader: 'Peças que combinam com o dia a dia dela', objetivo: 'recall', influencer: 'Ariane (@arianecanovas)', status: 'pendente' },
  { n: 3, data: '06/06', hora: '10:00', assuntoA: 'Qual conjunto combina mais com ela?', assuntoB: 'Colar, brinco ou pulseira — qual escolher?', preheader: 'A gente ajuda a decidir', objetivo: 'engajamento', influencer: '—', status: 'pendente' },
  { n: 4, data: '08/06', hora: '10:00', assuntoA: 'Faltam 4 dias — presente ainda dá tempo', assuntoB: '12/06 chegando: sua escolha está garantida?', preheader: 'Frete grátis acima de R$299,99', objetivo: 'venda', influencer: '—', status: 'pendente' },
  { n: 5, data: '09/06', hora: '18:30', assuntoA: 'Ariane escolheu — e a gente mostrou tudo', assuntoB: 'A peça favorita da Ariane na Coleção Namorados', preheader: 'O look dela com a coleção você precisa ver', objetivo: 'venda', influencer: 'Ariane (@arianecanovas)', status: 'pendente' },
  { n: 6, data: '10/06', hora: '10:00', assuntoA: 'Hoje tem live! Ariane apresenta a coleção ao vivo', assuntoB: 'Live hoje às 20h — Ariane + Coleção Namorados', preheader: 'Vai rolar cupom exclusivo pra quem assistir', objetivo: 'engajamento', influencer: 'Ariane (@arianecanovas)', status: 'pendente' },
  { n: 7, data: '11/06', hora: '10:00', assuntoA: 'Último dia com frete grátis garantido', assuntoB: 'Amanhã é 12/06 — seu pedido chega a tempo?', preheader: 'Pedido hoje = entrega garantida antes da data', objetivo: 'venda', influencer: '—', status: 'pendente' },
  { n: 8, data: '12/06', hora: '08:00', assuntoA: 'Feliz Dia dos Namorados 💛 — Flash sale 24h', assuntoB: 'Hoje tem 15% OFF em toda a Coleção Namorados', preheader: 'Só hoje. Só agora. Enquanto durar o estoque.', objetivo: 'venda', influencer: '—', status: 'pendente' }
];

const calendarioRows = [
  ['02/06', 'CAMPANHA', 'Instagram feed', 'Post', 'Ela vai usar hoje, amanhã e daqui a dez anos. Coleção Namorados 2026 chegou. Link na bio', 'Triptych Ariane (Peça 1)'],
  ['02/06', 'CAMPANHA', 'Instagram stories', 'Seq. 3 frames', 'Ver seção 2.2', 'Fotos sessão 04/06'],
  ['03/06', 'CAMPANHA', 'TikTok', 'Legenda vídeo', 'quando o presente é tão bom que ela não precisa guardar pra ocasião especial #piuka #namorados2026', 'Vídeo coleção'],
  ['04/06', 'CAMPANHA', 'Instagram stories', 'Recall', 'Você viu a Coleção Namorados? Ainda dá tempo. Link no bio', 'Fotos humanizadas'],
  ['05/06', 'SAZONAL', 'Instagram feed', 'Post', 'Conteúdo evergreen — dica de como usar semijoias no dia a dia', 'Foto de acervo'],
  ['06/06', 'CAMPANHA', 'Instagram feed', 'Post', 'Qual conjunto combina mais com ela? Conta aqui!', 'Flatlay Coleção (Peça 3)'],
  ['07/06', 'CAMPANHA', 'Instagram stories', 'Produto', '4 peças, 4 estilos — qual é o dela? + enquete', 'Fotos de mídia 03/06'],
  ['08/06', 'SAZONAL', 'Instagram feed', 'Post', 'Conteúdo evergreen ou bastidor da marca', 'A definir'],
  ['09/06', 'CAMPANHA', 'Instagram stories', 'Anúncio live', 'Amanhã tem live! A Ariane vai mostrar a coleção ao vivo — e tem cupom', 'Arte story live (Peça 2)'],
  ['09/06', 'CAMPANHA', 'Instagram feed', 'Post', 'A favorita da Ariane. Qual a sua?', 'Single editorial Ariane (Peça 4)'],
  ['10/06', 'LIVE', 'Instagram stories', 'Divulgação live', 'LIVE HOJE 20H NA SHOPEE 🎙️ Cupom exclusivo — link na bio', 'Arte story live (Peça 2)'],
  ['11/06', 'CAMPANHA', 'Instagram feed', 'Post', 'Último dia com entrega garantida antes do 12/06. Corre. Link na bio.', 'Flatlay ou foto humanizada'],
  ['11/06', 'CAMPANHA', 'Instagram stories', 'Urgência', 'Amanhã é o dia 💛 Pedido hoje ainda chega. Link no bio', 'Foto produto + texto urgência'],
  ['12/06', 'CAMPANHA', 'Instagram feed', 'Post', 'Feliz Dia dos Namorados 💛 Hoje tem 15% OFF — só hoje. Link na bio.', 'Flatlay comemorativo'],
  ['12/06', 'CAMPANHA', 'Instagram stories', 'Flash sale', 'HOJE 15% OFF 💛 Corre pro link no bio', 'Arte urgência stories']
];

const doc = new Document({
  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      }
    ]
  },
  styles: {
    default: { document: { run: { font: 'Arial', size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 36, bold: true, font: 'Arial', color: DARK },
        paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 28, bold: true, font: 'Arial', color: DARK },
        paragraph: { spacing: { before: 280, after: 80 }, outlineLevel: 1 } }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD } },
          children: [
            new TextRun({ text: 'PIUKA SEMIJOIAS', bold: true, size: 18, font: 'Arial', color: GOLD }),
            new TextRun({ text: '   |   Campanha Dia dos Namorados 2026   |   Gerado em 29/05/2026', size: 18, font: 'Arial', color: '888888' })
          ]
        })]
      })
    },
    children: [
      // TÍTULO
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 480, after: 240 },
        children: [new TextRun({ text: 'BRIEFING PIUKA', bold: true, size: 56, font: 'Arial', color: GOLD })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 },
        children: [new TextRun({ text: 'CAMPANHA DIA DOS NAMORADOS 2026', bold: true, size: 32, font: 'Arial', color: DARK })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 480 },
        children: [new TextRun({ text: 'Amor que Brilha — Coleção Namorados 2026', size: 24, font: 'Arial', color: '666666', italics: true })]
      }),

      divider(),

      // SEÇÃO 1
      h1('1. CAMPANHA PRINCIPAL'),
      labelValue('Campanha', 'Amor que Brilha — Coleção Namorados 2026'),
      labelValue('Período', '02/06/2026 → 12/06/2026'),
      labelValue('Produto/Coleção', 'Coleção Namorados 2026 — conjuntos colar + brinco em zircônia e pérola, pulseiras riviera e anéis solitários'),
      labelValue('Promessa', 'O presente que ela vai usar todos os dias — não só no Dia dos Namorados'),
      labelValue('Tom', 'Emocional + urgência leve'),
      labelValue('Diferencial', 'Lançamento de coleção exclusiva com timing estratégico — peças para o dia a dia, não só para a data'),

      h3('Canais ativos:'),
      bullet('E-mail marketing (RevSend) — 8 disparos'),
      bullet('Instagram feed — posts diários'),
      bullet('Instagram Stories — sequências diárias'),
      bullet('TikTok — 3 posts orgânicos + TikTok Shop'),
      bullet('WhatsApp (RevSend) — 2 disparos'),
      bullet('Meta Ads — campanha paga com 2 variações'),
      bullet('Live Shopee — 1 live em 10/06'),
      bullet('Lojas físicas — vitrine + PDV atualizado'),

      h3('Campanhas secundárias:'),
      bullet('12/06 | Flash sale 24h | 15% OFF em toda a Coleção Namorados | todos os canais'),

      h3('Restrições:'),
      bullet('Coleção Religiosa não entra em promoção nesta campanha'),
      bullet('Tom nunca direcionado ao namorado — a marca sempre fala COM ela, não sobre ela'),
      bullet('Urgência sempre com fundamento real (data 12/06 ou estoque)'),

      h3('Aprendizado do mês anterior:'),
      bullet('Funcionou: e-mails com nome da influencer no assunto — abertura acima da média'),
      bullet('Não funcionou: posts sem gancho visual claro no primeiro frame — alcance orgânico abaixo do esperado'),

      divider(),

      // SEÇÃO 2
      h1('2. COPY POR CANAL'),

      h2('Instagram — Feed (lançamento 02/06)'),
      h3('Opção A:'),
      labelValue('Gancho', 'Ela vai usar hoje, amanhã e daqui a dez anos.'),
      p('A Coleção Namorados 2026 chegou — e não é sobre a data. É sobre ela. Sobre o que fica no corpo e na memória. Zircônia, pérola e riviera num conjunto que foi feito pra durar.'),
      labelValue('CTA', 'Link na bio pra ver a coleção completa.'),
      h3('Opção B:'),
      labelValue('Gancho', 'Presente bom é aquele que ela não tira mais.'),
      p('Lançamos a Coleção Namorados 2026 pensando exatamente nisso. Peças que combinam com o dia a dia dela — e com os momentos que ela vai querer lembrar.'),
      labelValue('CTA', 'Arrasta pra ver cada peça da coleção.'),
      h3('Opção C:'),
      labelValue('Gancho', 'Não é presente. É joia.'),
      p('Tem diferença entre um presente que fica na gaveta e um que ela coloca todo dia. A Coleção Namorados 2026 é do segundo tipo.'),
      labelValue('CTA', 'Veja a coleção completa no link da bio.'),

      h2('Instagram — Stories (lançamento 02/06)'),
      bullet('Frame 1: “Você está prestes a ver a nossa coleção mais esperada do semestre” [sticker contagem regressiva]'),
      bullet('Frame 2: “Coleção Namorados 2026 chegou” | Conjuntos colar + brinco | Pulseiras Riviera | Anéis Solitários [flatlay]'),
      bullet('Frame 3: “Corre pro site antes de esgotar” | “Link na bio ou arrasta aqui” [link sticker]'),

      h2('TikTok'),
      labelValue('Legenda A', 'quando o presente é tão bom que ela não precisa guardar pra ocasião especial #piuka #semijoias #diadosnamorados #presenteperfeito #joias #colecaonamorados'),
      labelValue('Legenda B', 'namorados 2026 e a gente lançou a coleção mais linda do ano — colar, brinco, pulseira e anel, tudo combinando #piuka #semijoias #namorados2026 #presenteperfeito'),

      h2('WhatsApp (RevSend)'),
      h3('Mensagem de lançamento (02/06):'),
      p('Oi! Chegou a Coleção Namorados 2026 da Piuka. Conjuntos de colar + brinco, pulseiras riviera e anéis solitários — peças que ela vai usar todo dia, não só no 12/06. Frete grátis acima de R$299,99. [LINK_COLECAO]'),
      h3('Mensagem lembrete — último dia (12/06):'),
      p('Hoje é o dia! Ainda dá tempo de garantir a peça perfeita. Coleção Namorados 2026 com frete grátis acima de R$299,99. Só hoje: 15% OFF. [LINK_COLECAO]'),

      h2('Meta Ads'),
      h3('Variação A (urgência):'),
      labelValue('Headline', 'Só até 12/06 — Coleção Namorados'),
      labelValue('Texto', 'Conjuntos exclusivos de colar, brinco e pulseira. Frete grátis acima de R$299,99. Últimas peças.'),
      labelValue('CTA', 'Comprar agora'),
      h3('Variação B (benefício):'),
      labelValue('Headline', 'O presente que ela não vai tirar'),
      labelValue('Texto', 'Coleção Namorados 2026 da Piuka — zircônia, pérola e riviera num conjunto feito pra durar além da data.'),
      labelValue('CTA', 'Ver coleção'),

      divider(),

      // SEÇÃO 3
      h1('3. PACOTE DE E-MAILS'),
      p('8 disparos de 02/06 a 12/06. Tabela de referência para a skill /emails-piuka.', { size: 20, italics: true }),
      new Paragraph({ spacing: { before: 160, after: 160 }, children: [] }),
      makeEmailTable(emails),
      new Paragraph({ spacing: { before: 240, after: 80 }, children: [] }),

      h2('Detalhamento por e-mail'),
      h3('E-mail 1 — Lançamento com Ariane (02/06)'),
      labelValue('Hipótese A/B', 'Emocional com influencer ("por Ariane") vs benefício direto'),
      labelValue('Título hero script', 'Coleção Namorados'),
      labelValue('Tagline bold', 'O presente que ela vai usar hoje, amanhã e sempre.'),
      p('Parágrafo hero: A nova Coleção Namorados 2026 chegou com tudo — conjuntos de colar e brinco, pulseiras riviera e anéis solitários pensados para marcar cada momento com elegança e leveza.'),
      labelValue('Stack assinatura', 'Para ela, / Para vocês dois, / Para sempre.'),
      labelValue('CTA principal', 'VER A COLEÇÃO'),

      h3('E-mail 2 — Recall (04/06)'),
      labelValue('Hipótese A/B', 'Pergunta direta vs afirmação social'),
      labelValue('Título hero script', 'Ainda dá tempo'),
      labelValue('Tagline bold', 'A coleção já está nas mãos de quem não esperou.'),
      labelValue('CTA principal', 'GARANTIR AGORA'),

      h3('E-mail 3 — Engajamento (06/06)'),
      labelValue('Título hero script', 'Qual é a dela?'),
      labelValue('Tagline bold', 'A gente ajuda você a acertar na escolha.'),
      labelValue('CTA principal', 'ESCOLHER O PRESENTE'),

      h3('E-mail 4 — Urgência suave (08/06)'),
      labelValue('Título hero script', 'Faltam 4 dias'),
      labelValue('Tagline bold', 'Pedido hoje, presente na mão antes do 12/06.'),
      labelValue('CTA principal', 'GARANTIR COM ENTREGA'),

      h3('E-mail 5 — Ariane mostra favorita (09/06)'),
      labelValue('Título hero script', 'A favorita da Ariane'),
      labelValue('Tagline bold', 'Tem uma peça que ela não para de usar. A gente mostrou.'),
      labelValue('Stack assinatura', 'Uma peça. / Uma escolha. / O presente que fica.'),
      labelValue('CTA principal', 'VER A FAVORITA'),

      h3('E-mail 6 — Aquecimento live (10/06)'),
      labelValue('Título hero script', 'Hoje tem live'),
      labelValue('Tagline bold', 'Vai rolar cupom exclusivo para quem assistir ao vivo.'),
      labelValue('CTA principal', 'ATIVAR LEMBRETE NA SHOPEE'),

      h3('E-mail 7 — Penúltimo dia (11/06)'),
      labelValue('Título hero script', 'Último dia seguro'),
      labelValue('Tagline bold', 'Pedido hoje ainda chega antes do 12/06.'),
      labelValue('CTA principal', 'COMPRAR AGORA'),

      h3('E-mail 8 — Flash sale 12/06 (08:00)'),
      labelValue('Título hero script', '12 de Junho'),
      labelValue('Tagline bold', 'Hoje tem 15% OFF em toda a Coleção Namorados. Só hoje.'),
      labelValue('CTA principal', 'APROVEITAR AGORA'),

      divider(),

      // SEÇÃO 4
      h1('4. ROTEIRO DE LIVE — Shopee 10/06/2026'),
      labelValue('Data', '10/06/2026'),
      labelValue('Plataforma', 'Shopee Live'),
      labelValue('Produto', 'Coleção Namorados 2026'),
      labelValue('Duração estimada', '45 minutos'),
      labelValue('Cupom', 'LIVEPIUKA10 — 10% OFF, válido só durante a live'),

      h3('[00:00–00:03] ABERTURA'),
      labelValue('Opção A', '“Você chegou na hora certa — hoje eu vou te mostrar o presente que nenhuma mulher vai querer guardar na gaveta.”'),
      labelValue('Opção B', '“Gente, eu recebi a Coleção Namorados da Piuka essa semana e preciso te mostrar cada peça — porque eu mesma não consigo parar de usar.”'),

      h3('[00:03–00:20] PRODUTO'),
      bullet('O que é: Coleção exclusiva com conjuntos colar + brinco em zircônia e pérola, pulseiras riviera e anéis solitários banhados'),
      bullet('Como usar: mostrar cada peça no corpo, combinações, look dia a dia e look mais arrumado'),
      bullet('Diferencial: peças que não são "só de namorados" — dá pra usar no trabalho, no happy hour, em encontro'),
      bullet('[ESPAÇO PIETRA — conta como você usaria cada peça, qual foi sua favorita ao ver a coleção]'),

      h3('[00:20–00:35] OFERTA'),
      bullet('Preço normal: [CAMPO_ANA — preços por peça]'),
      bullet('Condição da live: cupom LIVEPIUKA10 — 10% OFF, válido só durante a live'),
      bullet('Como comprar: "Clica no produto fixado aqui embaixo, adiciona ao carrinho e aplica o cupom LIVEPIUKA10 antes de fechar"'),
      bullet('Urgência: "O cupom expira quando a live acabar — não tem como usar depois"'),

      h3('[00:35–00:42] CTA FINAL'),
      bullet('"Se você chegou agora: Coleção Namorados 2026 com cupom LIVEPIUKA10 — 10% OFF só durante a live."'),
      bullet('"Produto fixado embaixo, adiciona ao carrinho, coloca o cupom LIVEPIUKA10 e finaliza."'),
      bullet('"Segue a loja pra não perder os próximos lançamentos"'),

      warning('[ESPAÇO PIETRA — GERAL]: Adicione seus comentários pessoais, histórias do dia a dia, reações espontâneas. O roteiro é a estrutura. A energia, o humor e a personalidade são seus.'),

      divider(),

      // SEÇÃO 5
      h1('5. INFLUENCERS E AFILIADAS'),

      h2('Influencer — Ariane Cânovas (@arianecanovas)'),
      labelValue('Estilo visual', 'clean atemporal, neutros, luz natural'),
      labelValue('Produto enviado', 'Kit completo Coleção Namorados 2026 (conjunto colar + brinco zircônia, pulseira riviera e anel solitário)'),
      labelValue('Prazo de entrega do kit', '30/05/2026'),
      labelValue('Publicações esperadas', '2 stories look do dia | 1 reels/feed conjunto completo | 1 story com link sticker'),
      labelValue('Prazo de publicação', 'entre 02/06 e 08/06'),
      labelValue('Hashtags obrigatórias', '@piuka #piuka #semijoias #colecaonamorados'),
      p('Briefing de conteúdo: mostrar as peças no corpo, no dia a dia dela — não em estúdio. Ariane tem liberdade de roteirizar do jeito dela.'),

      h2('Afiliadas'),
      labelValue('Missão', 'De 02/06 a 12/06, postar pelo menos 1 story por dia mostrando a Coleção Namorados 2026'),
      labelValue('Competição', 'SIM | 02/06 → 12/06 | Métrica: total de vendas via link de afiliada'),
      labelValue('Prêmio', 'Kit completo da nova coleção de julho + destaque nos stories oficiais da Piuka'),
      labelValue('Rankings', 'Pietra posta no grupo WhatsApp nos dias 06/06 e 10/06'),
      h3('Mensagem de abertura para o grupo WhatsApp:'),
      new Paragraph({
        spacing: { before: 80, after: 80 },
        shading: { fill: GRAY_BG, type: ShadingType.CLEAR },
        children: [new TextRun({ text: 'Meninas! A Coleção Namorados 2026 chegou e a nossa missão começa HOJE. De 02/06 a 12/06, quem mais vender leva o kit completo da próxima coleção + destaque no nosso @piuka. A missão é simples: 1 story por dia, mostra as peças, manda pro link. Vou postar o ranking no dia 6 e no dia 10 pra vocês saberem como estão indo. Bora?!', size: 22, font: 'Arial', italics: true })]
      }),

      divider(),

      // SEÇÃO 6
      h1('6. BRIEFING DE ARTES'),

      h2('Artes IA'),
      h3('1. Triptych Ariane — lançamento'),
      labelValue('Família', 'collab_panels | 3 painéis | 1:1 | 1080x1080px'),
      labelValue('Entrega', '01/06/2026'),
      labelValue('Canal', 'Feed Instagram + Meta Ads'),
      labelValue('Headline', 'AMOR QUE BRILHA'),
      labelValue('Handwritten', 'Ariane Cânovas x Piuka'),
      labelValue('CTA', 'VER AGORA (outline preto)'),
      labelValue('Observação visual', 'Fundo cinza neutro #F4F2F0 contínuo entre os 3 painéis, espaços finos de 6px'),

      h3('2. Story anúncio live 10/06'),
      labelValue('Família', 'story_9x16 | 1080x1920px'),
      labelValue('Entrega', '09/06/2026'),
      labelValue('Canal', 'Instagram Stories + WhatsApp'),
      labelValue('Headline', 'HOJE TEM LIVE'),
      labelValue('Handwritten', '10/06 | 20h | Shopee'),
      labelValue('CTA', 'ATIVAR LEMBRETE (sólido preto)'),

      h3('3. Flatlay Coleção Namorados 2026'),
      labelValue('Família', 'produto_flatlay_4x5 | 1080x1350px'),
      labelValue('Entrega', '05/06/2026'),
      labelValue('Canal', 'Feed Instagram + Hero e-mails 3, 4 e 7'),
      labelValue('Headline', 'COLEÇÃO NAMORADOS 2026'),
      labelValue('Handwritten', 'O presente que ela não tira mais'),
      labelValue('CTA', 'VER AGORA (dourado)'),

      h3('4. Single Editorial — A Favorita da Ariane'),
      labelValue('Família', 'single_1x1_editorial | 1080x1080px'),
      labelValue('Entrega', '07/06/2026'),
      labelValue('Canal', 'Feed Instagram + Meta Ads'),
      labelValue('Headline', 'A FAVORITA DA ARIANE'),
      labelValue('Handwritten', 'Ariane Cânovas x Piuka'),
      labelValue('CTA', 'VER A COLEÇÃO (sólido preto)'),

      h3('5. PVC 10x15cm — PDV todas as lojas'),
      labelValue('Entrega', '05/06/2026'),
      labelValue('Quantidade total', '65 unidades (Campinas 21 / Iguatemi RP 14 / Morumbi 8 / RioPreto Shopping 14 / Ribeirão Preto 8)'),

      h3('6. Acrílico Quadrinho 15x15cm'),
      labelValue('Entrega', '05/06/2026'),
      labelValue('Quantidade total', '18 unidades (Campinas 4 / Iguatemi RP 3 / Morumbi 4 / RioPreto Shopping 3 / Ribeirão Preto 4)'),
      labelValue('Headline', 'AMOR QUE BRILHA'),

      h2('Artes Freela'),
      h3('1. Banner / Acrílico Vitrine — todas as lojas (entrega: 05/06)'),
      bullet('Iguatemi Rio Preto: 70L x 1,00A'),
      bullet('Iguatemi Campinas: 94L x 75A — Arco'),
      bullet('Morumbi Shopping: 57L x 1,12A — Arco'),
      bullet('Morumbi Shopping (esq.): 62x60'),
      bullet('Rio Preto Shopping: 59L x 1,17A — Arco'),
      bullet('Ribeirão Shopping: 78L x 96A — Arco'),

      h3('2. Painel VM — todas as lojas (entrega: 05/06)'),
      bullet('Campinas: 33 | Iguatemi RioPreto: 18 | Morumbi: 11 | RioPreto Shopping: 21 | Ribeirão Preto: 14'),

      warning('CAMPOS PENDENTES DE ANA: Resolução e proporção padrão das fotos | Pasta/ferramenta de entrega das fotos | Preços por peça (roteiro da live) | Canal de entrega e aprovação de artes da Freela'),

      divider(),

      // SEÇÃO 7
      h1('7. SUB-DOCS POR PESSOA'),

      h2('Amanda — Social Media'),
      p('Calendário editorial completo de 02/06 a 12/06:', { bold: true }),
      new Paragraph({ spacing: { before: 160, after: 160 }, children: [] }),
      makeCalendarioTable(calendarioRows),

      h2('Pietra — Lives + Influencers + Afiliadas'),
      labelValue('Live', '10/06 | Shopee | Coleção Namorados 2026 | 45 min | cupom LIVEPIUKA10'),
      bullet('Roteiro completo na seção 4'),
      bullet('Kit Ariane: enviar até 30/05/2026'),
      bullet('Afiliadas: enviar mensagem de abertura de campanha (copy na seção 5)'),
      bullet('Competição de venda: ranking no grupo nos dias 06/06 e 10/06'),

      h2('Joy — CRM'),
      labelValue('Segmento A (ativas 90 dias)', 'e-mail + WhatsApp | copy direta | disparar 02/06'),
      labelValue('Segmento B (inativas 90+ dias)', 'e-mail | copy de reativação | disparar 04/06'),
      labelValue('Segmento C (leads sem compra)', 'e-mail | apresentação + 10% OFF primeira compra | disparar 06/06'),
      h3('Cadência:'),
      bullet('Disparo 1 (02/06) — lançamento — todos os segmentos'),
      bullet('Disparo 2 (04/06) — recall — quem não abriu o Disparo 1'),
      bullet('Disparo 3 (08/06) — urgência suave — quem abriu mas não comprou'),
      bullet('Disparo 4 (10/06) — live — todos os segmentos ativos'),
      bullet('Disparo 5 (11/06) — último dia — quem abriu mas não comprou'),
      bullet('Disparo 6 (12/06) — flash sale — todos os segmentos'),

      h2('Marcela — Assistente Braço-Direito'),
      h3('Tasks por prioridade:'),
      bullet('Confirmar entrega kit Ariane — até 29/05'),
      bullet('Confirmar sessões fotográficas com fotógrafo — até 02/06'),
      bullet('Receber artes IA e encaminhar para impressão — até 06/06'),
      bullet('Receber artes Freela e encaminhar para lojas — até 06/06'),
      bullet('Distribuir PVC 10x15 (65 unid), Acrílico Quadrinho (18 unid), Banner Vitrine (1 por loja), Painel VM — até 08/06'),
      bullet('Confirmar preços corretos no PDV — até 09/06'),
      bullet('Alinhar equipe das lojas sobre campanha — até 09/06'),
      bullet('Confirmar estoque físico da coleção — até 10/06'),
      warning('Quando escalar para Ana: estoque insuficiente antes de 10/06 | dúvida de conteúdo antes de imprimir | prazo comprometido — avisar com 2 dias de antecedência'),

      divider(),

      // SEÇÃO 8
      h1('8. TASKS DO TRELLO'),
      bullet('Enviar kit Coleção Namorados para Ariane Cânovas | Pietra | 30/05/2026'),
      bullet('Sessão fotográfica — Fotos de Mídia | Marcela | 03/06/2026'),
      bullet('Sessão fotográfica — Fotos Humanizadas | Marcela | 04/06/2026'),
      bullet('Artes IA — Triptych Ariane | Artes IA | 01/06/2026'),
      bullet('Artes IA — Flatlay Coleção Namorados | Artes IA | 05/06/2026'),
      bullet('Artes IA — Story + PVC + Acrílico Quadrinho | Artes IA | 09/06/2026'),
      bullet('Artes Freela — Banner Vitrine + Painel VM | Marcela | 05/06/2026'),
      bullet('Distribuição materiais físicos — todas as lojas | Marcela | 08/06/2026'),
      bullet('Joy — Cadência de e-mails no RevSend | Joy | 01/06/2026'),
      bullet('Amanda — Calendário editorial 02–12/06 | Amanda | 01/06/2026'),
      bullet('Live Shopee — 10/06 | Pietra | 10/06/2026'),
      bullet('Ranking de afiliadas — 06/06 e 10/06 | Pietra | 06/06/2026'),
      bullet('Alinhamento das lojas físicas sobre campanha | Marcela | 09/06/2026'),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(path.join(outputDir, 'briefing_namorados_2026.docx'), buffer);
  console.log('briefing_namorados_2026.docx criado com sucesso');
}).catch(err => {
  console.error('Erro:', err.message);
  process.exit(1);
});
