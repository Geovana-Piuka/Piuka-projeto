// substituir_placeholders.js — Substitui {{IMG_XXX}} no HTML do e-mail usando mapa_urls.json
//
// Uso:
//   node substituir_placeholders.js 2026-05-dia-das-maes email_semana1.html
//   node substituir_placeholders.js 2026-05-dia-das-maes email_semana1.html --dry-run
//
// Saída: email_semana1_pronto.html (na mesma pasta do HTML original)

const fs   = require('fs');
const path = require('path');

function main() {
  const slug    = process.argv[2];
  const htmlArg = process.argv[3];
  const dryRun  = process.argv.includes('--dry-run');

  if (!slug || !htmlArg) {
    console.error('Uso: node substituir_placeholders.js {YYYY-MM-slug} {arquivo.html} [--dry-run]');
    process.exit(1);
  }

  const mapaPath = path.join(__dirname, 'recursos', 'campanhas', slug, 'mapa_urls.json');
  if (!fs.existsSync(mapaPath)) {
    console.error(`mapa_urls.json não encontrado: ${mapaPath}`);
    console.error('Rode primeiro: node setup_campanha.js ' + slug);
    process.exit(1);
  }

  const htmlPath = path.isAbsolute(htmlArg) ? htmlArg : path.resolve(process.cwd(), htmlArg);
  if (!fs.existsSync(htmlPath)) {
    console.error(`HTML não encontrado: ${htmlPath}`);
    process.exit(1);
  }

  const mapa = JSON.parse(fs.readFileSync(mapaPath, 'utf8'));
  let html   = fs.readFileSync(htmlPath, 'utf8');

  const substituidos = [];
  const vazios       = [];
  const naoUsados    = [];

  for (const [placeholder, url] of Object.entries(mapa.placeholders)) {
    if (html.includes(placeholder)) {
      if (url) {
        html = html.replaceAll(placeholder, url);
        substituidos.push(`  ✅ ${placeholder} → ${url}`);
      } else {
        vazios.push(`  ⚠️  ${placeholder} — URL vazia no mapa_urls.json (mantido no HTML)`);
      }
    } else {
      naoUsados.push(`  ℹ️  ${placeholder} — não encontrado no HTML (ignorado)`);
    }
  }

  if (substituidos.length) console.log('\nSubstituídos:\n' + substituidos.join('\n'));
  if (vazios.length)       console.log('\nURLs vazias (preencha no mapa_urls.json):\n' + vazios.join('\n'));
  if (naoUsados.length > 3) console.log(`\n${naoUsados.length} placeholders não usados neste HTML (normal).`);

  if (vazios.length) {
    console.log('\n⚠️  HTML gerado com placeholders vazios — NÃO disparar antes de preencher as URLs.');
  }

  if (!dryRun) {
    const outName = path.basename(htmlPath).replace(/\.html$/, '_pronto.html');
    const outPath = path.join(path.dirname(htmlPath), outName);
    fs.writeFileSync(outPath, html);
    console.log(`\n✅ Salvo em: ${outPath}`);
    console.log('   Pronto para colar no RevSend (se não houver URLs vazias acima).');
  } else {
    console.log('\n[dry-run] Nenhum arquivo escrito.');
  }
}

main();
