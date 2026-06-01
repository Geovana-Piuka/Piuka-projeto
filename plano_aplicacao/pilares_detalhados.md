# Pilares Detalhados — Plano de Aplicação | Piuka

---

## Pilar 1 — Contexto | Agente Especialista na Piuka

**Aplicabilidade**

Esse agente não é usado pelo time — é a fundação que alimenta todos os outros. É um arquivo de contexto vivo que o Claude carrega antes de executar qualquer tarefa da Piuka.

Na prática: antes de gerar um e-mail, o agente de e-mail consulta o especialista. Antes de revisar uma copy, o agente de revisão consulta o especialista. Ele é o "cérebro da marca" que todos os outros usam.

---

**O que preciso perguntar**

Sessão dedicada com Ana — 2 a 3 horas.

*Sobre a marca:*
- Como você descreveria a Piuka em 3 palavras?
- Quem é a cliente da Piuka — idade, estilo de vida, o que ela valoriza?
- O que diferencia a Piuka de qualquer outra marca de moda no interior?
- Qual campanha dos últimos 2 anos você mais se orgulha? Por que funcionou?
- Qual campanha você nunca repetiria? O que foi errado?

*Sobre voz e tom:*
- Me dá um exemplo de copy que é 100% Piuka
- Me dá um exemplo de copy que jamais seria Piuka
- Quando você reprova uma arte ou texto, qual é o motivo mais comum?
- Tem palavras ou expressões que a marca nunca usa?
- O tom muda entre Instagram, e-mail e live? Como?

*Sobre produtos e sazonalidade:*
- Quais são as coleções fixas e quais são sazonais?
- Quais produtos vendem mais em qual época do ano?
- Tem produto que nunca entra em promoção?
- Como a marca se posiciona em datas como Páscoa, Dia das Mães, Natal?

*Sobre critérios de aprovação:*
- O que faz uma arte passar de primeira?
- O que faz uma arte voltar imediatamente?
- Qual o nível de formalidade do texto — pode ser informal? Até onde?
- Como a marca fala de preço e promoção — tem restrição de linguagem?

---

**Materiais que preciso coletar**

- 10-15 e-mails de campanhas aprovadas — os melhores de cada tipo (lançamento, promoção, data comemorativa)
- 5-10 posts aprovados por canal (Instagram feed, stories, TikTok)
- 2-3 lives gravadas
- Qualquer documento de identidade visual ou manual de marca que exista
- Campanhas de anúncios que mais converteram
- Histórico de campanhas sazonais dos últimos 12 meses

Tudo já foi pedido para o Leo — cobrar antes da próxima sessão com Ana.

---

**Framework**

O agente especialista é construído como um system prompt longo e estruturado carregado no Claude. Estrutura:

```
1. Quem é a Piuka — identidade, posicionamento, cliente
2. Voz e tom — o que é, o que não é, exemplos reais aprovados
3. Produtos e coleções — categorias, sazonalidade, regras
4. Critérios de aprovação — os filtros da Ana em linguagem estruturada
5. Histórico de campanhas — o que funcionou, o que não funcionou
6. Calendário sazonal — datas relevantes e como a marca se comporta em cada uma
7. Regras por canal — como o tom muda entre e-mail, Instagram, TikTok, live
```

Arquivo em markdown, versionado. Cada campanha aprovada adiciona uma entrada no histórico. Geovana aprende a atualizar.

---

**Como isso impacta**

- Qualquer agente que usar esse contexto gera output dentro da marca — não genérico
- Ana para de reprovar por "cara de GPT" porque o output já nasce com a voz certa
- O time para de depender da Ana para saber "se está certo" — consulta o agente
- Com o tempo, o agente fica mais preciso a cada campanha — o sistema melhora sozinho

---

## Pilar 2 — Produção | Agente de Briefing Mensal

**Aplicabilidade**

Ana sai da reunião mensal com a estratégia na cabeça. Em vez de redistribuir isso em conversas fragmentadas com o time, ela abre o agente e responde um conjunto de perguntas estruturadas. O agente conduz a conversa, extrai o que precisa e devolve um rascunho da campanha para ela validar.

Depois da aprovação, ele gera tudo de uma vez: super doc da campanha, todos os e-mails estruturados, copies por canal, roteiro de live, briefing visual para Isabelle, sub-doc por posição do time, e tasks formatadas para o Trello via MCP.

O que muda: Ana deixa de ser o hub de distribuição. Ela aprova uma vez, o sistema distribui. O time começa cada mês com 80% do trabalho estruturado antes de qualquer reunião interna.

---

**O que preciso perguntar**

- Como é a reunião mensal hoje? Quem participa, qual o formato, o que sai dela?
- O que Ana faz depois da reunião? Como ela repassa para o time hoje?
- Qual é o tempo médio entre a reunião e o time saber o que fazer?
- Já existe algum template de campanha, mesmo que informal?
- Quais campanhas são recorrentes todo mês (sazonal, lançamento, liquidação)?
- O Trello já tem estrutura de tasks por posição ou está organizado de outro jeito?
- Ana prefere aprovar em bloco ou por entregável?
- Ela tem algum formato mental de "campanha boa" que nunca foi documentado?

---

**Materiais que preciso coletar**

- 3 a 5 campanhas antigas com tudo que foi produzido (referência de output real)
- Estrutura atual do Trello — print ou export das listas e templates de cards
- Calendário de datas comerciais que a Piuka usa (datas próprias além do calendário padrão)
- Qualquer briefing que tenha sido feito antes, mesmo que num Google Doc informal
- Relação dos canais ativos e volume atual por canal
- Lista de produtos recorrentes e sazonais com características principais

---

**Framework**

O agente opera em duas fases separadas por aprovação explícita da Ana.

**Fase 1 — Extração e estruturação:**
O agente faz as perguntas-chave, organiza as respostas e devolve um documento de visão da campanha para ela revisar. Nada é gerado além disso.

**Fase 2 — Geração em cascata:**
Depois da aprovação, usa o contexto do Pilar 1 + briefing aprovado para gerar todos os outputs. Cada output sai segmentado por destinatário: o que vai para Amanda, para Isabelle, para Pietra, para o Trello.

Ponto crítico: depende do Pilar 1. Sem contexto da marca construído antes, a Fase 2 gera output genérico.

---

**Como isso impacta**

O tempo entre "estratégia na cabeça da Ana" e "time com trabalho estruturado em mãos" cai de dias para horas. Ana responde o agente em 20-30 minutos, aprova o rascunho, e o time já recebe o que precisa fazer. O briefing estruturado no mesmo formato todo mês vira um histórico consultável de campanhas.

---

## Pilar 3 — Execução | Agentes por Entregável

**Aplicabilidade**

Depois que o briefing do Pilar 2 é aprovado, cinco agentes entram em operação. Cada um atende uma posição específica do time. O ponto central não é automação total — é entregar 80% pronto para que cada pessoa execute com qualidade em vez de criar do zero sob pressão.

---

**O que preciso perguntar**

- Qual o volume real de e-mails por mês? Todos são campanhas ou tem fluxos automáticos também?
- Como o RevSend recebe o HTML hoje? Há limitação de template?
- Quais são os canais orgânicos ativos e a frequência atual de cada um?
- O TikTok é produzido com roteiro ou é mais espontâneo?
- Como Pietra se prepara para as lives hoje? Tem algum material de referência?
- O que Isabelle recebe hoje antes de começar a criar? Tem algum briefing, mesmo que informal?
- Quais formatos e tamanhos de arte são recorrentes (feed, story, banner de e-mail, etc.)?
- Qual é o processo atual de revisão antes de postar? Passa por Ana sempre?

---

**Materiais que preciso coletar**

- Exemplos de e-mails enviados nos últimos 3 meses (copy + subject + HTML se disponível)
- Relação de formatos de arte por canal com medidas
- Paleta de cores e fontes da marca
- Lives gravadas de Pietra — 2 ou 3 para mapear estilo, expressões, estrutura que funciona
- Posts de melhor performance orgânica por canal
- Exemplos de briefings visuais já passados para Isabelle, mesmo que sejam mensagens no WhatsApp
- Estrutura atual do calendário editorial se houver

---

**Framework**

Cada agente recebe exatamente dois inputs: briefing aprovado (Pilar 2) + contexto da marca (Pilar 1). Nenhum depende de input adicional do time para funcionar.

**Agente de e-mail**
Output: HTML completo por semana de envio, com subject e pré-header separados para teste A/B. Segue o template já usado no RevSend — não muda a estrutura visual, só o conteúdo. 20-23 e-mails gerados em bloco.

**Agente de copy**
Opera em dois modos:
- *Geração* — recebe o briefing e gera copy por canal
- *Revisão* — recebe qualquer texto e retorna versão ajustada ao tom da marca com comentário sobre o que foi mudado e por quê

O modo revisão é o que tira Ana do loop de revisão operacional.

**Agente de lives**
Roteiro com marcações de tempo estimado por bloco, espaço para Pietra inserir comentários pessoais, e linha de "gancho de abertura" com três opções para ela escolher. Aprende o estilo dela com o tempo.

**Agente de redes sociais**
Calendário em formato tabela (data, canal, formato, copy, orientação visual) pronto para importar no Trello como cards ou usar como planilha de controle pela Amanda.

**Agente de artes**
Briefing visual padronizado com todos os campos que Isabelle precisa para começar sem perguntar nada: dimensões, hierarquia de texto, o que é mandatório vs. opcional, referência descrita de estilo.

---

**Como isso impacta**

O time para de esperar instrução para começar. O filtro de revisão do agente de copy significa que Ana recebe textos já dentro do tom da marca — ela decide se aprova, não se corrige. O tempo de produção mensal cai e a qualidade do que chega na Ana sobe.

---

## Pilar 4 — Governança | SOPs, Treinamento e Análise

**Aplicabilidade**

Os três pilares anteriores só sustentam se o time sabe usar, se há processo documentado para cada situação, e se o sistema aprende com o que acontece mês a mês. Governança não é burocracia — é o que impede que tudo volte ao estado anterior quando aparece uma pressão de prazo.

Cada posição tem um SOP específico: o que fazer no início do mês, como usar o agente correspondente, o que entra no Trello, quando escalar para Ana. Criados com Ana, não por Cristian sozinho — ela é quem conhece as exceções e os critérios reais de qualidade.

---

**O que preciso perguntar**

- Ana tem critérios implícitos de qualidade que nunca foram escritos? Quais são os "jamais faça isso" dela?
- Quem é responsável por cobrar o time hoje quando algo não é entregue no prazo?
- O Trello é monitorado ativamente ou é mais um registro?
- Já houve tentativa de documentar processos na Piuka antes? O que aconteceu?
- Qual o maior ponto de resistência que Ana imagina no time para adotar os agentes?
- Geovana está no escopo de implementação ou só de suporte técnico?
- Há alguma integração entre RevSend, Meta Ads e Google Ads que já gera relatório hoje?
- Qual a periodicidade ideal para Ana receber o relatório?
- Marcela é nova — qual é o nível de autonomia esperado para ela nos primeiros 3 meses?

---

**Materiais que preciso coletar**

- Relatórios de performance que Ana usa hoje (mesmo que extrações manuais)
- Critérios de qualidade implícitos — extraídos em sessão com Ana
- Estrutura atual do Trello com todas as listas, templates de card e fluxo de status
- Qualquer tentativa anterior de SOP ou manual interno, mesmo que incompleto
- Acesso às métricas de e-mail no RevSend (ou print de relatório recente)
- Dados de Meta Ads e Google Ads dos últimos 3 meses para definir o baseline do relatório
- Calendário de integração de Marcela

---

**Framework**

Três camadas:

**Camada 1 — SOPs**
Um documento por posição com no máximo duas páginas. Estrutura fixa: o que faço no início do mês, quais ferramentas uso, o que entrego, para quem entrego, o que faço quando tenho dúvida. Criado em sessão com Ana para cada posição.

**Camada 2 — Treinamentos por posição**
Cada pessoa recebe treinamento específico para o agente que ela usa. Formato prático: a pessoa usa o agente durante o treinamento com um exemplo real. Não é aula de IA — é "veja como você faz isso agora". O treinamento de Ana é separado e mais aprofundado.

| Posição | Foco |
|---|---|
| CMO | Agente de briefing, leitura de relatório, visão estratégica de IA |
| Designer | Briefing visual, Freepic em escala, revisão antes de entregar |
| Social Media | Calendário gerado, assistente de legenda, Trello |
| Apresentadora de Lives | Roteiro gerado, personalização para seu estilo |
| Assistente de Marketing | Cobranças no Trello, assistentes operacionais, quando escalar para Ana |

**Camada 3 — Ciclo de melhoria mensal**
Ao final de cada campanha, três perguntas registradas no sistema: o que funcionou, o que não funcionou, o que o agente errou. Ana revisa e decide o que vira aprendizado permanente do agente especialista. Pode ser um formulário de 5 minutos — não uma reunião longa.

**Relatório mensal automático**
Usa integrações disponíveis (RevSend, Meta Ads, Google Ads) para puxar dados. O agente interpreta e gera documento formatado. Ana recebe diagnóstico com linguagem de negócio — não tabela de métricas.

---

**Como isso impacta**

O sistema não depende mais da memória da Ana para funcionar. Cada pessoa tem clareza do que faz, com qual ferramenta, em qual ordem. Novas contratações têm SOP para seguir desde o primeiro dia. Quando Ana está ausente, o processo continua porque está documentado. E mês a mês, o sistema fica mais preciso — porque cada campanha aprovada é um dado novo que o agente especialista absorve.
