// setup_campanha.js — Cria estrutura de pastas para uma campanha Piuka + mapa_urls.json
//
// Uso:
//   node setup_campanha.js 2026-05-dia-das-maes
//   node setup_campanha.js 2026-05-dia-das-maes --placeholders '["{{IMG_HERO}}","{{IMG_PRODUTO_1}}"]'

const fs   = require('fs');
const path = require('path');

const BASE = path.join(__dirname, 'recursos', 'campanhas');

const ICONES_FIXOS = {
  '{{IMG_ICON_INSTAGRAM}}': 'recursos/icones_sociais/instagram.svg',
  '{{IMG_ICON_TIKTOK}}':    'recursos/icones_sociais/tiktok.svg',
  '{{IMG_ICON_YOUTUBE}}':   'recursos/icones_sociais/youtube.svg',
  '{{IMG_ICON_FACEBOOK}}':  'recursos/icones_sociais/facebook.svg',
  '{{IMG_ICON_PINTEREST}}': 'recursos/icones_sociais/pinterest.svg',
  '{{IMG_ICON_LINKEDIN}}':  'recursos/icones_sociais/linkedin.svg',
};

const PLACEHOLDERS_PADRAO = [
  '{{IMG_LOGO_PIUKA}}',
  '{{IMG_HERO}}',
  '{{IMG_PRODUTO_1}}',
  '{{IMG_PRODUTO_2}}',
  '{{IMG_PRODUTO_3}}',
  '{{IMG_PRODUTO_4}}',
  '{{IMG_ASSINATURA}}',
];

function slugValido(slug) {
  return /^\d{4}-\d{2}-.+$/.test(slug);
}

function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error('Uso: node setup_campanha.js {YYYY-MM-slug}\nEx:  node setup_campanha.js 2026-05-dia-das-maes');
    process.exit(1);
  }
  if (!slugValido(slug)) {
    console.error(`Slug inválido: "${slug}". Use o formato YYYY-MM-nome-da-campanha`);
    process.exit(1);
  }

  const campanhaDir = path.join(BASE, slug);

  // Criar subpastas
  for (const sub of ['refs', 'jsons', 'geradas', 'aprovadas']) {
    const dir = path.join(campanhaDir, sub);
    fs.mkdirSync(dir, { recursive: true });
    console.log(`  ✅ ${path.relative(__dirname, dir)}/`);
  }

  // Placeholders extras passados via --placeholders
  let extrasIdx = process.argv.indexOf('--placeholders');
  let extras = [];
  if (extrasIdx !== -1 && process.argv[extrasIdx + 1]) {
    try { extras = JSON.parse(process.argv[extrasIdx + 1]); } catch {}
  }

  const todosPlaceholders = [...new Set([...PLACEHOLDERS_PADRAO, ...extras])];

  // Gerar mapa_urls.json
  const mapaPath = path.join(campanhaDir, 'mapa_urls.json');
  let mapaExistente = {};
  if (fs.existsSync(mapaPath)) {
    mapaExistente = JSON.parse(fs.readFileSync(mapaPath, 'utf8')).placeholders || {};
  }

  const placeholders = {};
  for (const p of todosPlaceholders) {
    placeholders[p] = mapaExistente[p] || '';
  }
  Object.assign(placeholders, ICONES_FIXOS);

  const mapa = {
    campanha: slug,
    gerado_em: new Date().toISOString().slice(0, 10),
    _instrucao: 'Preencha as URLs vazias com os links das imagens hospedadas no CDN ou ESP antes de rodar substituir_placeholders.js',
    placeholders,
  };

  fs.writeFileSync(mapaPath, JSON.stringify(mapa, null, 2));
  console.log(`  ✅ mapa_urls.json criado em ${path.relative(__dirname, mapaPath)}`);
  console.log(`\nCampanha "${slug}" pronta. Próximos passos:`);
  console.log('  1. Colocar fotos de referência em refs/');
  console.log('  2. Rodar /imagens-piuka → salvar JSONs em jsons/');
  console.log('  3. Gerar artes no Freepik → salvar em geradas/');
  console.log('  4. Ana aprova → mover para aprovadas/ + preencher mapa_urls.json');
  console.log('  5. node substituir_placeholders.js', slug, 'email_semana1.html');
}

main();
