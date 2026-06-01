# Agente Piuka — Instruções para Sessões Remotas

Este arquivo é lido automaticamente pelo agente quando acorda via rotina agendada (cron).

## Contexto do projeto

Você é o agente de automação do projeto Piuka Semijoias. Opera no board Trello da Ana Beatriz, monitora tarefas, processa comandos do time e envia relatórios via Telegram.

- **Repo:** github.com/OCristianvieira/piuka-projeto
- **Config das rotinas:** `rotinas/config.json` — leia antes de qualquer ação
- **Scripts disponíveis:** `monitor_piuka.js`, `criar_cards_trello.js`, `setup_campanha.js`, `substituir_placeholders.js`

## Como usar as credenciais

As credenciais (Trello key/token, Telegram token) são passadas via variáveis de ambiente na sessão remota. Nunca leia de arquivo — use `process.env.*`.

## Rotinas disponíveis

Descritas em `rotinas/config.json`. Cada rotina tem horário, dias e descrição do que deve fazer.

## Comandos que Ana pode usar no Trello

Ana (ou qualquer pessoa do time) pode adicionar um comentário em qualquer card com o prefixo `[claude]`:

| Comando | O que faz |
|---|---|
| `[claude] fechar` | Marca o card como concluído e move para Enviados/Concluídas |
| `[claude] status` | Responde no card com: responsável, prazo, lista atual |
| `[claude] criar NOME` | Cria novo card em Campanhas do Mês com o nome informado |
| `[claude] att DESCRICAO` | Atualiza a descrição do card com o texto informado |

## Para Ana: como alterar as rotinas

1. Abra o arquivo `rotinas/config.json` no GitHub
2. Edite o campo desejado (ex: `"ativo": false` para pausar uma rotina)
3. Faça commit — o agente lê o config na próxima execução

## Primeira vez? Rode o setup

```bash
node setup.js
```

O script guia você por cada credencial (Trello key/token, board ID, Telegram chat ID), testa as conexões e cria o `.env` automaticamente. Leva menos de 5 minutos.

## Para Ana: como conectar seu Telegram

Mande `/start` para [@userinfobot](https://t.me/userinfobot) no Telegram.  
Ele responde com seu chat ID numérico.  
Passe o número para Cristian colocar em `rotinas/config.json` → `telegram.chat_id_ana`.

## Estrutura do repo

```
piuka-projeto/
├── CLAUDE.md                    ← você está aqui
├── MAP.md                       ← visão geral do cliente
├── rotinas/
│   └── config.json              ← configuração das rotinas (edite aqui)
├── instaladores/                ← briefing mensal, copy, e-mails
├── recursos/
│   ├── logos/                   ← logos Piuka (PNG gitignored)
│   ├── icones_sociais/          ← SVGs do footer do e-mail
│   └── campanhas/               ← uma pasta por campanha (YYYY-MM-slug)
│       └── {slug}/
│           ├── mapa_urls.json   ← {{IMG_XXX}} → URL real
│           ├── jsons/           ← JSONs de design gerados por /imagens-piuka
│           ├── refs/            ← fotos de referência (gitignored)
│           ├── geradas/         ← PNGs do Freepik (gitignored)
│           └── aprovadas/       ← peças aprovadas prontas (gitignored)
├── sops/                        ← instruções por pessoa do time
├── monitor_piuka.js             ← roda diariamente — detecta atrasos
├── criar_cards_trello.js        ← cria cards do briefing no Trello
├── setup_campanha.js            ← cria estrutura de pastas por campanha
└── substituir_placeholders.js   ← substitui {{IMG_XXX}} no HTML do e-mail
```
