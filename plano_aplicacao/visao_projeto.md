# Visão do Projeto | Piuka

---

## Problema Central

Três problemas que se reforçam:

1. **Concentração na Ana** — tudo passa por ela. Briefing, aprovação, cobrança, redirecionamento. CMO operando como gestora de projetos + revisora + fiscal de qualidade. 20h/semana em operacional.

2. **Falta de processo claro para o time** — reunião mensal gera alinhamento verbal, não estrutura. Time não tem onde consultar o que fazer, como fazer, qual o padrão esperado.

3. **Todo mês é o mesmo mês** — campanha sazonal → briefing verbal → time executa → aprovação Ana → retrabalho → entrega. O fluxo é idêntico todo mês. É templatizável. O que hoje leva 30 dias poderia sair em 1-2 dias com o processo certo.

---

## Os 4 Pilares

### 1. Contexto — Agente Especialista na Piuka
Base de tudo. Precisa existir antes de qualquer outro agente.

O que tem:
- Voz e tom da marca — o que é e o que não é a Piuka
- Histórico de campanhas aprovadas
- Produtos e coleções — categorias, sazonalidade, diferenciais
- Critérios implícitos de aprovação da Ana
- Calendário sazonal — varejo + eventos regionais
- Referências visuais e de copy aprovadas

Como é alimentado:
- Sessão de extração com Ana — tirar da cabeça dela o que nunca foi documentado
- E-mails e campanhas passadas (a enviar pelo Leo)
- Lives gravadas (a enviar pelo Leo)
- Evolução contínua — cada campanha aprovada alimenta o agente

**Ponto crítico:** a maior parte do conhecimento da marca está na cabeça da Ana. A primeira tarefa real do projeto é fazer essa extração.

---

### 2. Produção — Agente de Briefing Mensal
Ponto de entrada operacional do mês. Transforma a estratégia da Ana em estrutura consumível pelo time.

Como funciona:
- Ana abre o agente depois da reunião mensal
- Conversa — o agente faz as perguntas certas, ela responde
- Agente retorna as ideias estruturadas para ela revisar e aprovar
- Depois da aprovação, gera tudo

O que o agente pergunta:
- Campanha, motivo, data
- Produto ou coleção em foco
- Promessa principal e diferencial
- Canais a ativar
- Volume — quantos e-mails, posts, lives
- Foto e vídeo disponível ou precisa produzir
- Tom — urgência, emocional, promocional

Output depois da aprovação:
- Super doc da campanha — nome, data, moat, promessa, diferencial, tom, calendário
- Todos os e-mails estruturados
- Todos os anúncios por canal
- Movimentação em cada rede social
- Roteiro de live por data
- Briefing visual para a designer
- Sub-doc por posição do time
- Tasks prontas para criar no Trello

**Ponto crítico:** depende do pilar 1. Sem contexto da marca, o briefing gera output genérico que Ana reprova.

---

### 3. Execução — Agentes por Entregável
Rodam a partir do briefing aprovado. Cada agente pega sua parte e entrega 80% pronto. O time revisa e ajusta — não cria do zero.

**Agente de e-mail**
- Input: briefing + histórico de e-mails aprovados
- Output: HTML completo — estrutura, copy, CTA, subject, pré-header
- Volume: 20-23 e-mails/mês gerados em bloco no início do mês

**Agente de copy**
- Input: briefing + voz da marca
- Output: copy por canal — Instagram, TikTok, WhatsApp, anúncio
- Função secundária: filtro de revisão — qualquer texto do time passa por ele antes de chegar na Ana

**Agente de lives**
- Input: briefing + produto + dados de lives anteriores
- Output: roteiro estruturado — abertura, produto, oferta, CTA, encerramento
- Aprende o estilo da apresentadora com o tempo

**Agente de redes sociais**
- Input: briefing + calendário
- Output: calendário completo do mês — o que postar, quando, formato, copy, orientação visual

**Agente de artes**
- Não gera arte — gera briefing visual para a designer
- Output: lista de artes com formato, tamanho por canal, copy, referência visual, paleta

**Ponto crítico:** todos dependem da qualidade do briefing aprovado no pilar 2.

---

### 4. Governança — SOPs, Treinamento e Análise
O que garante que o sistema funciona independente de quem está no time.

**SOPs por posição**
- SOP do agente de briefing
- SOP de cada entregável — e-mail, copy, live, redes, arte
- SOP de gestão do Trello
- SOP de onboarding — qualquer pessoa nova opera em 1 semana
- Criados por Cristian e Ana juntos — não Cristian sozinho

**Treinamentos por posição**

| Posição | Foco do treinamento |
|---|---|
| CMO / Diretora | Agente de briefing, leitura de relatório, visão estratégica de IA |
| Designer | Briefing visual, Freepic em escala, revisão antes de entregar |
| Social Media | Calendário gerado, assistente de legenda, Trello |
| Apresentadora de Lives | Roteiro gerado, como personalizar para seu estilo |
| Assistente de Marketing | Fluxo de cobranças no Trello, assistentes operacionais, escalar só o necessário para Ana |

Formato: prático, presencial, curto — aprende fazendo. Genérico por posição, não por nome.

**Relatório mensal automático**
- Performance de e-mails, anúncios, orgânico, lives, automações de CRM
- Interpretação — não números brutos, diagnóstico
- Sugestão para o mês seguinte
- Ana recebe o diagnóstico pronto, decide — não analisa

**Evolução contínua**
Cada campanha aprovada alimenta o agente especialista. O sistema fica melhor a cada mês sem intervenção técnica constante.

**Ponto crítico:** sem governança o projeto funciona enquanto Cristian está presente. Com governança, funciona independente de quem opera.

---

## Ferramentas

| Ferramenta | Papel |
|---|---|
| Claude (claude.ai) | Interface da Ana — briefing, aprovações, consultas |
| Claude Code | Construção dos agentes, orquestração, MCP Trello |
| Gemini corporativo | Assistentes do time por posição |
| Trello | Gestão de tasks — integrado via MCP |
| Freepic | Geração de imagens em escala para a designer |
| RevSend | Disparo de e-mail marketing e WhatsApp |

---

## Divisão Claude × Gemini

**Claude** — o que exige inteligência e orquestração:
- Agente especialista da Piuka
- Agente de briefing mensal
- Geração de e-mails HTML
- Relatório mensal com interpretação
- Conexão MCP Trello

**Gemini corporativo** — assistentes simples do time:
- Revisão de copy e português
- Descrição de produto (já existe, expandir)
- Legenda por canal para social media
- Roteiro de live para a apresentadora
- Assistente operacional para a assistente de marketing

Lógica: time continua no Gemini que já conhece, com assistentes melhores e com contexto da marca. A mudança para eles é pequena. A orquestração fica no Claude.
