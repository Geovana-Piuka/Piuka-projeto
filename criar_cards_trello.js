// criar_cards_trello.js — Cria cards no Trello a partir do JSON de tasks do briefing Piuka
//
// Uso:
//   node criar_cards_trello.js                                       → usa tasks embutidas
//   node criar_cards_trello.js tasks.json                            → lê tasks de arquivo JSON externo
//   node criar_cards_trello.js tasks.json freela.json                → também cria cards no board da freela
//   node criar_cards_trello.js tasks.json --imagens ./pasta/refs/    → anexa covers dos cards
//
// Variáveis de ambiente necessárias (em .env na raiz do projeto):
//   trello_apikey, trello_token, PIUKA_TRELLO_BOARD_ID, FREELA_TRELLO_BOARD_ID

const https  = require('https');
const fs     = require('fs');
const path   = require('path');

// ── Config ────────────────────────────────────────────────────────────────────

const ENV_PATH = path.join(__dirname, '.env');
loadEnv(ENV_PATH);

const KEY         = process.env.trello_apikey;
const TOKEN       = process.env.trello_token;
const BOARD       = process.env.PIUKA_TRELLO_BOARD_ID;
const FREELA_BOARD = process.env.FREELA_TRELLO_BOARD_ID;

if (!KEY || !TOKEN || !BOARD) {
  console.error('Faltam variáveis: trello_apikey, trello_token ou PIUKA_TRELLO_BOARD_ID no .env');
  process.exit(1);
}

const MEMBROS_PATH = path.join(__dirname, 'membros_piuka.json');
const membros = JSON.parse(fs.readFileSync(MEMBROS_PATH, 'utf8'));

// ── Tasks do briefing (atualize aqui a cada novo mês) ─────────────────────────

const TASKS_EMBUTIDAS = [
  {
    titulo:   'Artes IA — lançamento Dia das Mães',
    resp:     'Amanda',
    data:     '25/04/2026',
    lista:    'Campanhas do Mês',
    fazer:    'Gerar artes IA (stories, carrosséis, e-mail hero) via /imagens-piuka conforme seção 2.5A',
    material: 'Seção 2.5A do briefing + pacote de imagens seção 2.5C',
    escalar:  'Se falta foto de referência ou produto não tem imagem aprovada',
  },
  {
    titulo:   'Agendar e-mails semana 1 no RevSend',
    resp:     'Joy',
    data:     '26/04/2026',
    lista:    'Campanhas do Mês',
    fazer:    'Agendar e-mails 1 a 4 com subject A/B, pré-header, copy e HTML prontos',
    material: 'Seção 3 do briefing + sub-doc Joy',
    escalar:  'Se o template RevSend não comportar a estrutura HTML',
  },
  {
    titulo:   'Calendário Instagram — criar cards no Trello',
    resp:     'Amanda',
    data:     '26/04/2026',
    lista:    'Campanhas do Mês',
    fazer:    'Criar 1 card por post do calendário com copy e referência visual',
    material: 'Sub-doc Amanda + seção 2 do briefing',
    escalar:  'Se uma data conflitar com algo não previsto',
  },
  {
    titulo:   'Roteiros de live — preencher [ESPAÇO PIETRA]',
    resp:     'Pietra',
    data:     '29/04/2026',
    lista:    'Campanhas do Mês',
    fazer:    'Ler roteiro live 1 (seção 4) e preencher campos pessoais antes da live',
    material: 'Sub-doc Pietra + seção 4 do briefing',
    escalar:  'Se produto não estiver disponível para mostrar na live',
  },
  {
    titulo:   'Campanha loja física RP — fim de semana Dia das Mães',
    resp:     'Marcela',
    data:     '07/05/2026',
    lista:    'Campanhas Lojas Físicas',
    fazer:    'Coordenar material visual e comunicação para lojas RP (10–11/05)',
    material: 'Super doc seção 1 do briefing',
    escalar:  'Qualquer decisão sobre desconto ou ação extra nas lojas',
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  fs.readFileSync(filePath, 'utf8').split('\n').forEach(line => {
    const [key, ...rest] = line.split('=');
    if (key && !key.startsWith('#') && rest.length) {
      process.env[key.trim()] = rest.join('=').trim();
    }
  });
}

function apiGet(path) {
  return new Promise((resolve, reject) => {
    const url = `https://api.trello.com/1${path}&key=${KEY}&token=${TOKEN}`;
    https.get(url, { headers: { 'Accept': 'application/json' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function apiPost(path, body) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({ ...body, key: KEY, token: TOKEN });
    const options = {
      hostname: 'api.trello.com',
      path: `/1${path}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.write(params.toString());
    req.end();
  });
}

function mimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
                '.webp': 'image/webp', '.gif': 'image/gif', '.json': 'application/json' };
  return map[ext] || 'application/octet-stream';
}

function anexarArquivo(cardId, filePath) {
  return new Promise((resolve, reject) => {
    const fileName  = path.basename(filePath);
    const fileData  = fs.readFileSync(filePath);
    const boundary  = '----TrelloUpload' + Date.now();
    const mime      = mimeType(filePath);
    const part1 = Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="key"\r\n\r\n${KEY}\r\n` +
      `--${boundary}\r\nContent-Disposition: form-data; name="token"\r\n\r\n${TOKEN}\r\n` +
      `--${boundary}\r\nContent-Disposition: form-data; name="name"\r\n\r\n${fileName}\r\n` +
      `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${fileName}"\r\nContent-Type: ${mime}\r\n\r\n`
    );
    const footer = Buffer.from(`\r\n--${boundary}--\r\n`);
    const body   = Buffer.concat([part1, fileData, footer]);

    const options = {
      hostname: 'api.trello.com',
      path:     `/1/cards/${cardId}/attachments`,
      method:   'POST',
      headers:  { 'Content-Type': `multipart/form-data; boundary=${boundary}`, 'Content-Length': body.length },
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function apiPut(path, body) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({ ...body, key: KEY, token: TOKEN });
    const options = {
      hostname: 'api.trello.com',
      path: `/1${path}`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.write(params.toString());
    req.end();
  });
}

function parseDateBR(str) {
  const [d, m, y] = str.split('/');
  if (!d || !m || !y) return null;
  return new Date(`${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}T23:59:00.000Z`).toISOString();
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  let tasks = TASKS_EMBUTIDAS;

  // Detectar argumento --imagens
  const imgIdx = process.argv.indexOf('--imagens');
  const PASTA_IMAGENS = imgIdx !== -1 ? path.resolve(process.argv[imgIdx + 1]) : null;
  if (PASTA_IMAGENS) console.log(`Pasta de covers: ${PASTA_IMAGENS}`);

  if (process.argv[2] && !process.argv[2].startsWith('--')) {
    const file = path.resolve(process.argv[2]);
    tasks = JSON.parse(fs.readFileSync(file, 'utf8'));
    console.log(`Tasks carregadas de: ${file}`);
  }

  console.log(`\nBoard: ${BOARD}`);
  console.log('Buscando listas...');

  const listas = await apiGet(`/boards/${BOARD}/lists?filter=open&fields=id,name`);
  const listaMap = {};
  listas.forEach(l => { listaMap[l.name] = l.id; });
  console.log(`Listas encontradas: ${listas.map(l => l.name).join(', ')}\n`);

  let criados = 0;
  let erros = 0;

  for (const t of tasks) {
    const idList = listaMap[t.lista];
    if (!idList) {
      console.warn(`  [AVISO] Lista não encontrada: "${t.lista}" — pulando "${t.titulo}"`);
      erros++;
      continue;
    }

    const desc = [
      `→ O que fazer: ${t.fazer}`,
      `→ Material de referência: ${t.material}`,
      `→ Quando escalar para Ana: ${t.escalar}`,
    ].join('\n');

    const payload = {
      name:  t.titulo,
      idList,
      desc,
      pos:   'bottom',
    };

    const due = parseDateBR(t.data);
    if (due) payload.due = due;

    const membroId = membros[t.resp];
    if (membroId) payload.idMembers = membroId;

    const card = await apiPost('/cards', payload);

    if (card.id) {
      console.log(`  ✅ [${t.lista}] ${t.titulo} → ${t.resp} | ${t.data}`);
      criados++;

      // Se a task tiver imagem de cover → fazer upload e definir como cover
      if (t.cover_image && PASTA_IMAGENS) {
        const imgPath = path.join(PASTA_IMAGENS, t.cover_image);
        if (fs.existsSync(imgPath)) {
          const attachment = await anexarArquivo(card.id, imgPath);
          if (attachment && attachment.id) {
            await apiPut(`/cards/${card.id}`, {
              'cover[idAttachment]': attachment.id,
              'cover[brightness]': 'light',
              'cover[size]': 'full',
            });
            console.log(`     🖼️  Cover: ${t.cover_image}`);
          }
        } else {
          console.log(`     ⚠️  Cover não encontrado: ${imgPath}`);
        }
      }

      // Se a task tiver JSON de arte anexo → anexar ao card
      if (t.json_arte) {
        const jsonPath = path.resolve(__dirname, t.json_arte);
        if (fs.existsSync(jsonPath)) {
          await anexarArquivo(card.id, jsonPath);
          console.log(`     📎 JSON anexado: ${path.basename(jsonPath)}`);
        } else {
          console.log(`     ℹ️  JSON não encontrado (ok criar depois): ${t.json_arte}`);
        }
      }
    } else {
      console.error(`  ❌ Erro criando "${t.titulo}":`, JSON.stringify(card));
      erros++;
    }
  }

  console.log(`\n${criados} card(s) criado(s) no board Piuka. ${erros} erro(s).`);
  if (erros) console.log('Verifique os nomes das listas e PIUKA_TRELLO_BOARD_ID no .env.');

  // ── Cards da freela (board próprio) ─────────────────────────────────────────
  // Ignorar argumentos que começam com '--' (ex: --imagens)
  const freelaArg = process.argv[3] && !process.argv[3].startsWith('--') ? process.argv[3] : null;
  const freelaFile = freelaArg ? path.resolve(freelaArg) : null;

  if (freelaFile && fs.existsSync(freelaFile)) {
    const demandas = JSON.parse(fs.readFileSync(freelaFile, 'utf8'));
    await criarCardsFreela(demandas);
  } else if (freelaFile) {
    console.warn(`\n[AVISO] Arquivo da freela não encontrado: ${freelaFile}`);
  }
}

// ── Criação de cards no board da freela ───────────────────────────────────────

async function criarCardsFreela(demandas) {
  if (!FREELA_BOARD) {
    console.warn('\n[FREELA] FREELA_TRELLO_BOARD_ID não configurado no .env — pulando cards da freela.');
    return;
  }

  console.log(`\n── Cards da Freela ──────────────────────────────────────────`);
  console.log(`Board freela: ${FREELA_BOARD}`);
  console.log('Buscando listas do board da freela...');

  const listas = await apiGet(`/boards/${FREELA_BOARD}/lists?filter=open&fields=id,name`);
  const listaMap = {};
  listas.forEach(l => { listaMap[l.name] = l.id; });
  console.log(`Listas encontradas: ${listas.map(l => l.name).join(', ')}\n`);

  const idListaAFazer = listaMap['A fazer'];
  if (!idListaAFazer) {
    console.error('[FREELA] Lista "A fazer" não encontrada no board da freela. Crie a lista e tente novamente.');
    return;
  }

  let criados = 0;
  let erros = 0;

  for (const d of demandas) {
    const desc = [
      `**LOJA:** ${d.loja || '—'}`,
      `**DEMANDA:** ${d.demanda || '—'}`,
      `**MEDIDA:** ${d.medida || '—'}`,
      `**QUANTIDADE:** ${d.quantidade || '—'}`,
      `**PRAZO:** ${d.prazo || '—'}`,
      `**ARQUIVO/FOTO BASE:** ${d.arquivo_foto_base || '—'}`,
      `**STATUS:** ${d.status || 'A fazer'}`,
      `**OBSERVAÇÕES:** ${d.observacoes || '—'}`,
    ].join('\n');

    const payload = {
      name:   `[${d.loja || 'Loja'}] ${d.demanda}`,
      idList: idListaAFazer,
      desc,
      pos:    'bottom',
    };

    const due = parseDateBR(d.prazo);
    if (due) payload.due = due;

    const card = await apiPost('/cards', payload);

    if (card.id) {
      console.log(`  ✅ ${payload.name} | prazo: ${d.prazo}`);
      criados++;
    } else {
      console.error(`  ❌ Erro criando "${payload.name}":`, JSON.stringify(card));
      erros++;
    }
  }

  console.log(`\n${criados} card(s) criado(s) no board da freela. ${erros} erro(s).`);
  if (erros) console.log('Verifique FREELA_TRELLO_BOARD_ID no .env e se a lista "A fazer" existe no board.');
}

main().catch(err => { console.error(err); process.exit(1); });
