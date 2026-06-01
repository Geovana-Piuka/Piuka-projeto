const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  PageBreak, LevelFormat
} = require('docx');
const fs = require('fs');
const path = require('path');

const outputDir = path.dirname(__filename);

const GOLD = 'B8860B';
const DARK = '1A1A1A';
const GRAY_BG = 'F5F5F5';
const WHITE = 'FFFFFF';
const WARN_BG = 'FFF3CD';
const RED_BG = 'FFEBEE';

const border = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
const borders = { top: border, bottom: border, left: border, right: border };

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

function makeDemandaTable(rows) {
  const cols = ['#', 'Loja', 'Demanda', 'Medida', 'Qtd', 'Prazo', 'Foto base', 'Status', 'Observações'];
  const widths = [300, 1100, 1300, 900, 300, 600, 1400, 600, 1700];

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
    width: { size: 8200, type: WidthType.DXA },
    columnWidths: widths,
    rows: [headerRow, ...dataRows]
  });
}

function makeTamanhoTable(rows, cols, widths) {
  const headerRow = new TableRow({
    tableHeader: true,
    children: cols.map((text, i) => new TableCell({
      borders,
      width: { size: widths[i], type: WidthType.DXA },
      shading: { fill: DARK, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 20, font: 'Arial', color: WHITE })] })]
    }))
  });

  const dataRows = rows.map((row, idx) => new TableRow({
    children: row.map((text, i) => new TableCell({
      borders,
      width: { size: widths[i], type: WidthType.DXA },
      shading: { fill: idx % 2 === 0 ? WHITE : GRAY_BG, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text, size: 20, font: 'Arial', color: DARK })] })]
    }))
  }));

  return new Table({
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: widths,
    rows: [headerRow, ...dataRows]
  });
}

const demandaRows = [
  ['1', 'Iguatemi Rio Preto', 'Banner Vitrine', '70L x 1,00A', '1', '05/06', 'foto humanizada após 04/06', 'A fazer', 'Sem clichê de namorados. Paleta neutros + dourado.'],
  ['2', 'Iguatemi Campinas', 'Banner Vitrine — Arco', '94L x 75A', '1', '05/06', 'foto humanizada após 04/06', 'A fazer', 'Mesmas diretrizes — formato arco'],
  ['3', 'Morumbi Shopping', 'Acrílico Vitrine — Arco', '57L x 1,12A', '1', '05/06', 'foto humanizada após 04/06', 'A fazer', 'Mesmas diretrizes visuais'],
  ['4', 'Morumbi Shopping (esq.)', 'Acrílico Vitrine', '62x60', '1', '05/06', 'foto produto puro após 03/06', 'A fazer', 'Produto em destaque, texto mínimo'],
  ['5', 'Rio Preto Shopping', 'Banner Vitrine — Arco', '59L x 1,17A', '1', '05/06', 'foto humanizada após 04/06', 'A fazer', 'Mesmas diretrizes visuais'],
  ['6', 'Ribeirão Shopping', 'Banner Vitrine — Arco', '78L x 96A', '1', '05/06', 'foto humanizada após 04/06', 'A fazer', 'Mesmas diretrizes visuais'],
  ['7', 'todas', 'Painel VM', 'ver tabela', '97 total', '05/06', 'foto produto puro após 03/06', 'A fazer', 'Painel de identidade — não de promoção']
];

const painelVMRows = [
  ['Campinas', '33'],
  ['Iguatemi Rio Preto', '18'],
  ['Morumbi Shopping', '11'],
  ['Rio Preto Shopping', '21'],
  ['Ribeirão Preto', '14']
];

const bannerVitrineRows = [
  ['Iguatemi Rio Preto', '70L x 1,00A', 'Retângulo'],
  ['Iguatemi Campinas', '94L x 75A', 'Arco'],
  ['Morumbi Shopping', '57L x 1,12A', 'Arco'],
  ['Morumbi Shopping (lado esq.)', '62x60', 'Retângulo'],
  ['Rio Preto Shopping', '59L x 1,17A', 'Arco'],
  ['Ribeirão Shopping', '78L x 96A', 'Arco']
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
            new TextRun({ text: '   |   Demandas da Freela — Namorados 2026   |   USO INTERNO', size: 18, font: 'Arial', color: '888888' })
          ]
        })]
      })
    },
    children: [
      // TÍTULO
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 480, after: 200 },
        children: [new TextRun({ text: 'DEMANDAS DA FREELA', bold: true, size: 56, font: 'Arial', color: GOLD })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 },
        children: [new TextRun({ text: 'NAMORADOS 2026', bold: true, size: 36, font: 'Arial', color: DARK })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 480 },
        children: [new TextRun({ text: 'Campanha: Amor que Brilha — Coleção Namorados 2026   |   Gerado em 29/05/2026', size: 22, font: 'Arial', color: '666666', italics: true })]
      }),

      // RESUMO DESTAQUE
      new Paragraph({
        spacing: { before: 0, after: 0 },
        shading: { fill: 'FFF8E1', type: ShadingType.CLEAR },
        children: []
      }),
      new Paragraph({
        spacing: { before: 100, after: 20 },
        shading: { fill: 'FFF8E1', type: ShadingType.CLEAR },
        children: [
          new TextRun({ text: 'Total de artes: ', bold: true, size: 24, font: 'Arial', color: DARK }),
          new TextRun({ text: '7   ', size: 24, font: 'Arial', color: DARK }),
          new TextRun({ text: '|   Prazo mais urgente: ', bold: true, size: 24, font: 'Arial', color: DARK }),
          new TextRun({ text: '05/06/2026   ', size: 24, font: 'Arial', color: DARK }),
          new TextRun({ text: '|   Produto foco: ', bold: true, size: 24, font: 'Arial', color: DARK }),
          new TextRun({ text: 'Coleção Namorados 2026', size: 24, font: 'Arial', color: DARK }),
        ]
      }),
      new Paragraph({
        spacing: { before: 0, after: 100 },
        shading: { fill: 'FFF8E1', type: ShadingType.CLEAR },
        children: []
      }),

      divider(),

      // TABELA GERAL
      h1('1. TABELA GERAL DE DEMANDAS'),
      p('Todas as artes deste mês em uma visão só. Detalhamento por demanda na seção 2.', { italics: true, size: 20 }),
      new Paragraph({ spacing: { before: 160, after: 160 }, children: [] }),
      makeDemandaTable(demandaRows),
      new Paragraph({ spacing: { before: 240, after: 80 }, children: [] }),

      divider(),

      // DETALHAMENTO
      h1('2. DETALHAMENTO POR DEMANDA'),

      h2('Demanda 1 — Banner Vitrine | Iguatemi Rio Preto'),
      labelValue('Loja', 'Iguatemi Rio Preto'),
      labelValue('Demanda', 'Banner Vitrine — Coleção Namorados 2026'),
      labelValue('Medida', '70L x 1,00A'),
      labelValue('Quantidade', '1'),
      labelValue('Prazo', '05/06/2026'),
      labelValue('Arquivo/Foto base', 'foto humanizada (sessão 04/06 — Marcela envia após a sessão)'),
      labelValue('Headline', 'AMOR QUE BRILHA'),
      labelValue('Copy de apoio', 'Semijoias para o dia a dia dela'),
      h3('Diretrizes visuais:'),
      bullet('Sem coração ou clichê de namorados. Tom: elegante, feminino, luz natural.'),
      bullet('Paleta: neutros (off-white, nude, cinza claro) + dourado, texto escuro'),
      bullet('Fundo off-white ou nude'),
      bullet('Logo Piuka em destaque'),

      divider(),

      h2('Demanda 2 — Banner Vitrine | Iguatemi Campinas (Arco)'),
      labelValue('Loja', 'Iguatemi Campinas'),
      labelValue('Medida', '94L x 75A — Arco'),
      labelValue('Quantidade', '1'),
      labelValue('Prazo', '05/06/2026'),
      labelValue('Arquivo/Foto base', 'foto humanizada (sessão 04/06)'),
      p('Mesmas diretrizes da Demanda 1 — adaptar composição para o formato arco.'),

      divider(),

      h2('Demanda 3 — Acrílico Vitrine | Morumbi Shopping (Arco)'),
      labelValue('Loja', 'Morumbi Shopping'),
      labelValue('Medida', '57L x 1,12A — Arco'),
      labelValue('Quantidade', '1'),
      labelValue('Prazo', '05/06/2026'),
      labelValue('Arquivo/Foto base', 'foto humanizada (sessão 04/06)'),
      p('Mesmas diretrizes visuais da Demanda 1.'),

      divider(),

      h2('Demanda 4 — Acrílico Vitrine | Morumbi Shopping (lado esquerdo)'),
      labelValue('Loja', 'Morumbi Shopping — lado esquerdo'),
      labelValue('Medida', '62x60'),
      labelValue('Quantidade', '1'),
      labelValue('Prazo', '05/06/2026'),
      labelValue('Arquivo/Foto base', 'foto produto puro (sessão 03/06 — fundo neutro)'),
      p('Peça mais quadrada — produto em destaque com texto mínimo: headline + logo Piuka. Sem copy de apoio.'),

      divider(),

      h2('Demanda 5 — Banner Vitrine | Rio Preto Shopping (Arco)'),
      labelValue('Loja', 'Rio Preto Shopping'),
      labelValue('Medida', '59L x 1,17A — Arco'),
      labelValue('Quantidade', '1'),
      labelValue('Prazo', '05/06/2026'),
      labelValue('Arquivo/Foto base', 'foto humanizada (sessão 04/06)'),
      p('Mesmas diretrizes visuais da Demanda 1.'),

      divider(),

      h2('Demanda 6 — Banner Vitrine | Ribeirão Shopping (Arco)'),
      labelValue('Loja', 'Ribeirão Shopping'),
      labelValue('Medida', '78L x 96A — Arco'),
      labelValue('Quantidade', '1'),
      labelValue('Prazo', '05/06/2026'),
      labelValue('Arquivo/Foto base', 'foto humanizada (sessão 04/06)'),
      p('Mesmas diretrizes visuais da Demanda 1.'),

      divider(),

      h2('Demanda 7 — Painel VM | todas as lojas'),
      labelValue('Loja', 'todas (ver tabela de quantidades)'),
      labelValue('Demanda', 'Painel VM — Coleção Namorados 2026'),
      labelValue('Medida', 'ver tabela de tamanhos ao final do documento'),
      labelValue('Quantidade total', '97 unidades'),
      labelValue('Prazo', '05/06/2026'),
      labelValue('Arquivo/Foto base', 'foto editorial produto puro (sessão 03/06)'),
      labelValue('Headline', 'AMOR QUE BRILHA'),
      h3('Diretrizes visuais:'),
      bullet('Painel de IDENTIDADE — não é peça promocional'),
      bullet('Produto em destaque como elemento principal'),
      bullet('Headline + logo Piuka'),
      bullet('Sem copy promocional, sem preço, sem desconto'),
      h3('Quantidades por loja:'),
      new Paragraph({ spacing: { before: 80, after: 160 }, children: [] }),
      makeTamanhoTable(painelVMRows, ['Loja', 'Quantidade'], [3000, 1500]),

      divider(),

      // TABELA DE TAMANHOS REFERÊNCIA
      h1('3. TABELA DE TAMANHOS — REFERÊNCIA'),
      p('Consultar esta tabela sempre que houver dúvida de medida.', { italics: true, size: 20 }),

      h2('Painel VM'),
      new Paragraph({ spacing: { before: 80, after: 80 }, children: [] }),
      makeTamanhoTable(painelVMRows, ['Loja', 'Quantidade'], [3000, 1500]),

      h2('Banner / Acrílico Vitrine'),
      new Paragraph({ spacing: { before: 80, after: 80 }, children: [] }),
      makeTamanhoTable(bannerVitrineRows, ['Loja', 'Medida', 'Formato'], [3000, 2000, 1500]),

      divider(),

      // INSTRUÇÕES FINAIS
      h1('4. INSTRUÇÕES FINAIS'),
      bullet('Para dúvidas de medida: consultar tabela na seção 3'),
      bullet('Fotos de cada sessão são enviadas por Marcela após as sessões (03/06 e 04/06)'),
      bullet('Dúvidas de conteúdo ou aprovação: contactar Marcela primeiro — ela escala para Ana se necessário'),
      warning('Para enviar arte pronta: [CAMPO_ANA — canal de entrega e aprovação a confirmar]'),
      warning('Não iniciar impressão sem aprovação. Confirmação de arte = Marcela responde "APROVADO" no canal combinado.'),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(path.join(outputDir, 'briefing_freela_namorados_2026.docx'), buffer);
  console.log('briefing_freela_namorados_2026.docx criado com sucesso');
}).catch(err => {
  console.error('Erro:', err.message);
  process.exit(1);
});
