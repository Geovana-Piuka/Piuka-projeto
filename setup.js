// setup.js — Configuração inicial do projeto Piuka
//
// Rode UMA VEZ ao clonar o repo pela primeira vez:
//   node setup.js
//
// O script guia você por cada credencial necessária,
// testa as conexões e cria o arquivo .env local.

const https    = require('https');
const fs       = require('fs');
const path     = require('path');
const readline = require('readline');

const ENV_PATH = path.join(__dirname, '.env');

// ── Helpers ───────────────────────────────────────────────────────────────────

function ask(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Accept: 'application/json' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch { resolve(null); }
      });
    }).on('error', reject);
  });
}

function postTelegram(token, chatId, text) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ chat_id: chatId, text });
    const options = {
      hostname: 'api.telegram.org',
      path: `/bot${token}/sendMessage`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch { resolve(null); } });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function ok(msg)   { console.log(`  ✅ ${msg}`); }
function fail(msg) { console.log(`  ❌ ${msg}`); }
function info(msg) { console.log(`  ℹ️  ${msg}`); }
function sep()     { console.log('\n' + '─'.repeat(60) + '\n'); }

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log('\n╔══════════════════════════════════════════════╗');
  console.log('║     Setup — Agente Piuka (primeira vez)      ║');
  console.log('╚══════════════════════════════════════════════╝\n');
  console.log('Este script configura as conexões necessárias para');
  console.log('o agente funcionar. Leva menos de 5 minutos.\n');

  // Carregar .env existente se houver
  const env = {};
  if (fs.existsSync(ENV_PATH)) {
    info('.env existente encontrado — vou reaproveitar o que já estiver preenchido.');
    fs.readFileSync(ENV_PATH, 'utf8').split('\n').forEach(line => {
      const [key, ...rest] = line.split('=');
      if (key && !key.startsWith('#') && rest.length) env[key.trim()] = rest.join('=').trim();
    });
  }

  // ── 1. Trello ────────────────────────────────────────────────────────────────
  sep();
  console.log('1/3  TRELLO\n');
  console.log('Você precisa da API Key e do Token do Trello.');
  console.log('Acesse: https://trello.com/power-ups/admin → selecione seu Power-Up → API Key\n');

  const trelloKey = env.trello_apikey
    || await ask(rl, '  Cole sua Trello API Key: ');

  const trelloToken = env.trello_token
    || await ask(rl, '  Cole seu Trello Token: ');

  // Testar Trello
  process.stdout.write('  Testando conexão com Trello...');
  const me = await get(
    `https://api.trello.com/1/members/me?key=${trelloKey.trim()}&token=${trelloToken.trim()}&fields=fullName,username`
  );
  if (me && me.fullName) {
    console.log(' ok');
    ok(`Conectado como: ${me.fullName} (@${me.username})`);
  } else {
    console.log(' falhou');
    fail('Credenciais inválidas. Verifique a API Key e o Token.');
    rl.close();
    process.exit(1);
  }

  // Board ID
  console.log('\n  Agora precisamos do ID do board da Piuka.');
  console.log('  Abra o board no Trello → veja a URL: trello.com/b/XXXXXXXX/nome-do-board');
  console.log('  O ID é a parte XXXXXXXX da URL.\n');
  const boardId = env.PIUKA_TRELLO_BOARD_ID
    || await ask(rl, '  Cole o ID do board: ');

  // Testar board
  process.stdout.write('  Verificando board...');
  const board = await get(
    `https://api.trello.com/1/boards/${boardId.trim()}?key=${trelloKey.trim()}&token=${trelloToken.trim()}&fields=name`
  );
  if (board && board.name) {
    console.log(' ok');
    ok(`Board encontrado: "${board.name}"`);
  } else {
    console.log(' falhou');
    fail('Board não encontrado. Verifique o ID e se você tem acesso a ele.');
    rl.close();
    process.exit(1);
  }

  // ── 2. Telegram ──────────────────────────────────────────────────────────────
  sep();
  console.log('2/3  TELEGRAM\n');
  console.log('O agente envia relatórios e alertas via Telegram.\n');
  console.log('  Token do bot já está configurado no sistema. Só precisa do seu Chat ID.');
  console.log('  Como obter seu Chat ID:');
  console.log('    1. Abra o Telegram');
  console.log('    2. Busque por @userinfobot e mande qualquer mensagem');
  console.log('    3. Ele responde com seu ID numérico\n');

  const tgToken = env.TELEGRAM_BOT_TOKEN
    || await ask(rl, '  Cole o Token do bot Telegram (ou Enter para pular): ');

  let chatIdAna = env.PIUKA_TELEGRAM_CHAT_ID || '';
  if (tgToken.trim()) {
    chatIdAna = await ask(rl, '  Cole seu Chat ID do Telegram: ');

    // Testar Telegram
    if (chatIdAna.trim()) {
      process.stdout.write('  Enviando mensagem de teste...');
      const tgRes = await postTelegram(
        tgToken.trim(),
        chatIdAna.trim(),
        '✅ Agente Piuka configurado com sucesso! Você vai receber relatórios diários aqui.'
      );
      if (tgRes && tgRes.ok) {
        console.log(' ok');
        ok('Mensagem enviada! Verifique seu Telegram.');
      } else {
        console.log(' falhou');
        fail(`Erro: ${tgRes?.description || 'resposta inválida'}. Verifique o Chat ID.`);
      }
    }
  } else {
    info('Telegram pulado. Você pode configurar depois editando o .env.');
  }

  // ── 3. Membros do board ───────────────────────────────────────────────────────
  sep();
  console.log('3/3  MEMBROS DO BOARD\n');
  console.log('  Buscando membros do board para configurar responsáveis nos cards...');

  const membros = await get(
    `https://api.trello.com/1/boards/${boardId.trim()}/members?key=${trelloKey.trim()}&token=${trelloToken.trim()}&fields=fullName,username`
  );

  const membrosMap = {};
  if (membros && Array.isArray(membros)) {
    console.log('\n  Membros encontrados:');
    membros.forEach(m => {
      console.log(`    • ${m.fullName} (@${m.username}) — ID: ${m.id}`);
      membrosMap[m.fullName] = m.id;
      membrosMap[m.username] = m.id;
    });

    const membrosPath = path.join(__dirname, 'membros_piuka.json');
    const membrosExistente = JSON.parse(fs.readFileSync(membrosPath, 'utf8'));

    console.log('\n  Mapeie os nomes do time para os membros do Trello:');
    const nomes = ['Amanda', 'Isabelle', 'Pietra', 'Joy', 'Marcela', 'Ana'];
    for (const nome of nomes) {
      if (membrosExistente[nome]) {
        info(`${nome} já mapeada — pulando`);
        continue;
      }
      const id = await ask(rl, `  ID do Trello para ${nome} (Enter para pular): `);
      if (id.trim()) membrosExistente[nome] = id.trim();
    }

    fs.writeFileSync(membrosPath, JSON.stringify(membrosExistente, null, 2));
    ok('membros_piuka.json atualizado');
  } else {
    info('Não foi possível buscar membros. Configure membros_piuka.json manualmente depois.');
  }

  // ── Salvar .env ───────────────────────────────────────────────────────────────
  sep();
  const novoEnv = {
    trello_apikey:            trelloKey.trim(),
    trello_token:             trelloToken.trim(),
    PIUKA_TRELLO_BOARD_ID:    boardId.trim(),
    TELEGRAM_BOT_TOKEN:       tgToken.trim() || (env.TELEGRAM_BOT_TOKEN || ''),
    PIUKA_TELEGRAM_CHAT_ID:   chatIdAna.trim() || '',
  };

  const linhas = Object.entries(novoEnv)
    .map(([k, v]) => `${k}=${v}`)
    .join('\n');

  fs.writeFileSync(ENV_PATH, linhas + '\n');
  ok(`.env salvo em ${ENV_PATH}`);

  // ── Resumo final ──────────────────────────────────────────────────────────────
  console.log('\n╔══════════════════════════════════════════════╗');
  console.log('║              Setup concluído!                ║');
  console.log('╚══════════════════════════════════════════════╝\n');
  console.log('O agente está configurado e vai rodar automaticamente:');
  console.log('  • 07:00 (seg-sex) — relatório matinal via Telegram');
  console.log('  • 08:00-20:00 (todo dia) — processa comandos [claude] nos cards');
  console.log('  • 12:00 (todo dia) — verifica atrasos e comenta nos cards');
  console.log('  • 18:00 (seg-sex) — resumo do dia via Telegram\n');
  console.log('Para testar agora:');
  console.log('  node monitor_piuka.js\n');
  console.log('Para criar os cards do próximo briefing no Trello:');
  console.log('  node criar_cards_trello.js\n');

  rl.close();
}

main().catch(err => {
  console.error('\nErro inesperado:', err.message);
  process.exit(1);
});
