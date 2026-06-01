// monitor_piuka.js — Monitora tasks atrasadas no Trello da Piuka e avisa Ana via Telegram
//
// Uso:
//   node monitor_piuka.js
//
// Variáveis de ambiente necessárias:
//   trello_apikey, trello_token, PIUKA_TRELLO_BOARD_ID
//   TELEGRAM_BOT_TOKEN, PIUKA_TELEGRAM_CHAT_ID (chat ID da Ana)

const https = require('https');
const fs    = require('fs');
const path  = require('path');

// ── Config ────────────────────────────────────────────────────────────────────

const ENV_PATH = path.join(__dirname, '../../..', '.env');
loadEnv(ENV_PATH);

const KEY       = process.env.trello_apikey;
const TOKEN     = process.env.trello_token;
const BOARD     = process.env.PIUKA_TRELLO_BOARD_ID;
const TG_TOKEN  = process.env.TELEGRAM_BOT_TOKEN?.trim();
const TG_CHAT   = process.env.PIUKA_TELEGRAM_CHAT_ID?.trim();

if (!KEY || !TOKEN || !BOARD) {
  console.error('Faltam variáveis: trello_apikey, trello_token ou PIUKA_TRELLO_BOARD_ID');
  process.exit(1);
}

// Listas monitoradas (cards abertos nessas listas são verificados)
const LISTAS_MONITORADAS = ['Campanhas do Mês', 'Campanhas Lojas Físicas', 'Aprovar | E-mail'];

// Lista de concluídas (cards aqui são contados como done, não como atrasados)
const LISTA_CONCLUIDAS = 'Enviados / Concluídas';

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
    https.get(url, { headers: { Accept: 'application/json' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function apiPost(endpoint, body) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({ ...body, key: KEY, token: TOKEN });
    const options = {
      hostname: 'api.trello.com',
      path: `/1${endpoint}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
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

function sendTelegram(chatId, text) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' });
    const options = {
      hostname: 'api.telegram.org',
      path: `/bot${TG_TOKEN}/sendMessage`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
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

function diasAtraso(dueDate) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return Math.floor((hoje - due) / 86400000);
}

function formatDate(iso) {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}`;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const hoje = new Date().toLocaleDateString('pt-BR');
  console.log(`\n📋 Monitor Piuka — ${hoje}\n`);

  // Buscar todas as listas do board
  const listas = await apiGet(`/boards/${BOARD}/lists?filter=open&fields=id,name&cards=open&card_fields=id,name,due,dueComplete,idMembers`);
  const listaMap = {};
  listas.forEach(l => { listaMap[l.name] = l; });

  // Buscar lista de concluídas
  const listasConcluidas = await apiGet(`/boards/${BOARD}/lists?filter=open&fields=id,name`);
  const concluidas = listasConcluidas.find(l => l.name === LISTA_CONCLUIDAS);
  let cardsConcluidosCount = 0;
  if (concluidas) {
    const cc = await apiGet(`/lists/${concluidas.id}/cards?filter=closed&fields=id`);
    cardsConcluidosCount = cc.length;
    const co = await apiGet(`/lists/${concluidas.id}/cards?filter=open&fields=id`);
    cardsConcluidosCount += co.length;
  }

  // Buscar membros do board
  const membros = await apiGet(`/boards/${BOARD}/members?fields=id,fullName,username`);
  const membroMap = {};
  membros.forEach(m => { membroMap[m.id] = m.fullName || m.username; });

  // Classificar cards
  const atrasados = [];
  const noPrazo   = [];
  const semPrazo  = [];
  const aprovacao = [];

  for (const nomeLista of LISTAS_MONITORADAS) {
    const lista = listaMap[nomeLista];
    if (!lista) {
      console.warn(`  Lista não encontrada: "${nomeLista}"`);
      continue;
    }

    for (const card of (lista.cards || [])) {
      const nomeResp = card.idMembers?.map(id => membroMap[id] || id).join(', ') || 'Sem responsável';

      if (nomeLista === 'Aprovar | E-mail') {
        aprovacao.push({ ...card, nomeResp, nomeLista });
        continue;
      }

      if (!card.due) {
        semPrazo.push({ ...card, nomeResp, nomeLista });
        continue;
      }

      const dias = diasAtraso(card.due);
      if (dias > 0 && !card.dueComplete) {
        atrasados.push({ ...card, nomeResp, nomeLista, dias });
      } else {
        noPrazo.push({ ...card, nomeResp, nomeLista });
      }
    }
  }

  // Comentar nos cards atrasados
  for (const card of atrasados) {
    const texto = `⚠️ Este card está ${card.dias} dia(s) atrasado(s). Por favor, atualize o status ou informe um novo prazo para Ana.`;
    await apiPost(`/cards/${card.id}/actions/comments`, { text: texto });
    console.log(`  💬 Comentado em: "${card.name}" (${card.dias}d atraso)`);
  }

  // Montar relatório
  const linhasAtrasados = atrasados.map(c =>
    `  • [${c.nomeResp}] ${c.name} — ${c.dias}d (venceu ${formatDate(c.due)})`
  ).join('\n');

  const relatorio = [
    `📋 <b>Status Piuka — ${hoje}</b>`,
    '',
    `✅ Concluídas: ${cardsConcluidosCount} card(s)`,
    `⏳ Em andamento (no prazo): ${noPrazo.length} card(s)`,
    `❓ Sem prazo definido: ${semPrazo.length} card(s)`,
    atrasados.length
      ? `🔴 Atrasadas: ${atrasados.length} card(s)\n${linhasAtrasados}`
      : `🟢 Sem atrasos`,
    `⏸️ Aguardando aprovação: ${aprovacao.length} card(s)`,
  ].join('\n');

  console.log('\n' + relatorio.replace(/<\/?b>/g, '') + '\n');

  // Enviar no Telegram
  if (TG_TOKEN && TG_CHAT) {
    const res = await sendTelegram(TG_CHAT, relatorio);
    if (res.ok) {
      console.log('✅ Relatório enviado via Telegram para Ana.');
    } else {
      console.warn('⚠️ Telegram falhou:', res.description);
    }
  } else {
    console.log('ℹ️  Telegram não configurado (PIUKA_TELEGRAM_CHAT_ID vazio). Relatório apenas no terminal.');
  }
}

main().catch(err => { console.error(err); process.exit(1); });
