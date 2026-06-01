---
name: briefing-imagens
description: >
  Gera briefing de demandas de imagem/arte da Piuka em dois documentos: um completo para Geovana (estratégia + IA + Gravia) e um simplificado para a Gravia (somente o que executar). Conduz conversa por blocos — digital/IA, impressos/Gravia, quadrinhos das lojas físicas e banners de vitrine — e já carrega as medidas e quantidades por loja. Use quando Geovana quiser briefar demandas visuais do ciclo, gerar briefing para Gravia, montar demandas de imagem por loja, ou estruturar artes para lojas físicas.
trigger: >
  Acione esta skill quando o usuário mencionar "briefing de imagens", "briefing de artes", "briefing para Gravia", "demandas visuais Piuka", "briefing de quadrinhos", "briefing de banners de vitrine", "montar briefing de imagem", "briefing loja física Piuka".
---

# Skill: Briefing de Imagens Piuka

## O que esta skill faz

Conduz Geovana por uma conversa em blocos para coletar todas as demandas visuais do ciclo e gera dois documentos ao final:

- **Doc 1 — Briefing Completo (Geovana):** visão estratégica + todas as peças + separação IA x Gravia
- **Doc 2 — Briefing da Gravia:** somente as peças que a Gravia executa, sem contexto interno

---

## Tabelas de lojas físicas (dados fixos — já carregados)

### Quadrinhos PVC 10x15 cm
| Loja | Qtd instalada |
|---|---|
| Campinas | 21 |
| Iguatemi RioPreto | 14 |
| Morumbi | 8 |
| RioPreto Shopping | 14 |
| Ribeirão Preto | 8 |

### Quadrinhos PVC 21x15 cm
| Loja | Qtd instalada |
|---|---|
| Campinas | 12 |
| Iguatemi RioPreto | 4 |
| Morumbi | 3 |
| RioPreto Shopping | 7 |
| Ribeirão Preto | 6 |

### Acrílico 15x15 cm (3mm) — Status: Aguardando
| Loja | Qtd |
|---|---|
| Campinas | 4 |
| Iguatemi RioPreto | 3 |
| Morumbi | 4 |
| RioPreto Shopping | 3 |
| Ribeirão Preto | 4 |

### Banners de Vitrine — Medidas por loja
| Loja | Largura | Altura | Obs |
|---|---|---|---|
| Iguatemi RioPreto | 70 cm | 100 cm | — |
| Iguatemi Campinas | 94 cm | 75 cm | Arco |
| Morumbi Shopping | 57 cm | 112 cm | Arco |
| Morumbi Shopping (acrílico lateral) | 62 cm | 60 cm | — |
| RioPreto Shopping | 59 cm | 117 cm | Arco |
| Ribeirão Shopping | 78 cm | 96 cm | Arco |

### Caixas Acrílico — Inventário por loja
| Loja | Modelo | Qtd |
|---|---|---|
| Ribeirão Preto | 60x60 cm | 1 |
| Morumbi | 30x30 cm | 2 |
| Morumbi | 1m x 40 cm | 1 |
| Campinas | 30x35 cm | 3 |

---

## Separação IA x Gravia

### Demandas que vão para IA
- Carrosséis de feed
- Posts de feed (unitários)
- Stories
- CRM / WhatsApp
- E-mail marketing
- Variações de banho/cor de produto (ouro → ródio, ouro → prata, outras variações)
- Imagens humanizadas (produto em modelo, colar no corpo, peça em uso)

### Demandas que vão para Gravia
- Banners de vitrine das lojas
- Layout home
- Outdoor / lonado
- Catálogo
- Paginação
- Quadrinhos PVC das lojas físicas (10x15, 21x15)
- Acrílico 15x15
- Qualquer peça com medida exata para impressão

---

## Fase 1 — Conversa de coleta com Geovana

Inicie sempre com:
> "Olá, Geovana! Vamos montar o briefing de imagens deste ciclo. Vou passar por blocos — me responde conforme o que tiver em pauta, pode pular o que não tiver demanda agora."

### Bloco A — Contexto geral
Perguntas:
1. Qual é o mês/período deste ciclo?
2. Tem campanha ou tema base? (ex: Dia das Mães, lançamento de coleção, institucional)
3. Já tem fotos ou produtos definidos como referência base?

### Bloco B — Demandas de IA (digital)
Para cada tipo listado abaixo, pergunte se tem demanda e, se sim, colete:
- Quantidade de peças
- Produto ou referência base
- Destino (canal: Instagram, WhatsApp, e-mail, etc.)

Tipos a perguntar: carrosséis / posts de feed / stories / CRM-WhatsApp / e-mail marketing / variações de banho-cor / imagens humanizadas

### Bloco C — Demandas da Gravia (impressos e design)
Para cada item com demanda, colete:
- Loja(s) de destino (ou "todas")
- A medida já está mapeada para banners e quadrinhos — confirmar se é o padrão ou tem exceção
- Quantidade necessária neste ciclo (pode diferir do inventário total)
- Foto ou produto base
- Prazo de entrega para a Gravia

Tipos a perguntar: banners de vitrine / layout home / outdoor-lonado / catálogo / paginação / peças com medidas específicas

### Bloco D — Quadrinhos das lojas físicas
Apresente a tabela já carregada e pergunte:
1. Qual campanha/foto vai para os quadrinhos deste ciclo?
2. Vai para todas as lojas ou lojas específicas?
3. Qual o prazo?
4. Tem alguma variação por loja (foto diferente por cidade, por exemplo)?

### Bloco E — Banners de vitrine
Apresente a tabela de medidas por loja e pergunte:
1. Qual foto ou campanha base para cada banner neste ciclo?
2. Alguma loja tem demanda nova ou exceção de medida?
3. Prazo de entrega para a Gravia?

Após coletar todos os blocos, apresente um **resumo consolidado** e peça confirmação de Geovana antes de gerar os documentos.

---

## Fase 2 — Geração dos documentos

### Doc 1: Briefing Completo (Geovana)

Estrutura:
```
BRIEFING DE IMAGENS — [MÊS/ANO]
Gerado em: [data]
Responsável: Geovana

1. CONTEXTO DO CICLO
   - Período
   - Campanha/tema base
   - Referências disponíveis

2. DEMANDAS DE IA
   Tabela: tipo | canal/destino | produto base | quantidade | observações

3. DEMANDAS DA GRAVIA
   Tabela: loja | tipo de peça | medida | quantidade | foto base | prazo | observações

4. QUADRINHOS DAS LOJAS FÍSICAS
   Tabela por formato (10x15 / 21x15 / acrílico 15x15):
   loja | qtd instalada | qtd neste ciclo | campanha/foto | prazo

5. BANNERS DE VITRINE
   Tabela: loja | medida | foto base | prazo | observações

6. TABELA GERAL DE PEÇAS
   Todos os itens juntos:
   loja | tipo | medida | quantidade | foto base | destino | responsável | IA ou Gravia | prazo

7. DEPENDÊNCIAS E OBSERVAÇÕES ESTRATÉGICAS

8. TASKS SUGERIDAS PARA O TRELLO
   1 card por demanda com: título / loja / medida / qtd / prazo / arquivo base / responsável

9. CHECKLIST DE VALIDAÇÃO DA IA
   (aparece somente se houver demandas de IA neste briefing)
   Exibir apenas os blocos relevantes às demandas do ciclo:

   [ ] TESTE DE FORMATO (10x15 e 21x15)
       - Testar adaptação da foto para cada formato
       - Verificar se a IA cortou, distorceu ou alterou a imagem

   [ ] TESTE DE CARROSSEL
       - Testar com conteúdo real no formato final de Instagram
       - Validar se o resultado precisa passar pelo Canva para ajuste final

   [ ] TESTE DE VARIAÇÃO DE PRODUTO (banho/cor)
       - Ouro → ródio, ouro → prata, outras variações
       - Verificar se a IA manteve a peça fiel ao original

   [ ] TESTE DE IMAGEM HUMANIZADA
       - Produto em modelo: colar, pingente no corpo, peça em uso
       - Verificar: rosto da modelo / proporção do produto / detalhes da peça
```

### Doc 2: Briefing da Gravia (simplificado)

Estrutura:
```
BRIEFING GRAVIA — [MÊS/ANO]
Enviado por: Piuka Semijoias
Data: [data]

1. PEÇAS SOLICITADAS NESTE CICLO
   Tabela: loja | tipo de peça | medida exata | quantidade | foto base | prazo

2. QUADRINHOS DAS LOJAS
   Tabela: loja | formato | medida | quantidade | campanha/foto | prazo

3. BANNERS DE VITRINE
   Tabela: loja | largura | altura | obs (arco/reto) | foto base | prazo

4. OBSERVAÇÕES POR PEÇA
   Campo livre por item se necessário

IMPORTANTE: os arquivos de referência serão enviados separadamente por Geovana.
```

**Regra:** o Doc 2 não contém nenhuma informação sobre estratégia, IA, copies ou contexto interno da Piuka.

---

## Campos obrigatórios em cada item

Todo item de demanda deve ter antes de ir para os docs:
- Loja (ou "digital" para peças sem loja física)
- Tipo de peça
- Medida (ou formato para digital)
- Quantidade
- Foto/produto base
- Destino final
- Responsável (IA ou Gravia)
- Prazo

Se algum campo estiver vazio, sinalizar com ⚠️ e pedir para Geovana confirmar antes de fechar o documento.

---

## Regras gerais

- As tabelas de medidas e quantidades por loja já estão carregadas nesta skill — não perguntar o que já se sabe
- Nunca incluir no Doc da Gravia: nomes internos do time, estratégia de campanha, copies, contexto de IA
- Cada documento deve ser autocontido: quem recebe lê só o que precisa
- O agente deve sinalizar incompatibilidades: ex. se a quantidade pedida para uma loja for maior que o inventário instalado, alertar Geovana
- Após gerar os docs, sugerir tasks para o Trello da Gravia com base nas demandas mapeadas

---

## Checklist de testes por tipo de demanda de IA

Quando gerar cards do Trello para demandas de IA, incluir na descrição do card os pontos de verificação correspondentes:

| Tipo de demanda | Verificação que entra no card |
|---|---|
| Quadrinho 10x15 ou 21x15 gerado por IA | Teste de formato: verificar se a IA cortou, distorceu ou alterou a imagem ao adaptar para o formato |
| Carrossel / post de feed / stories | Teste de carrossel: verificar resultado no formato final de Instagram e se precisa ajuste no Canva |
| Variação de banho/cor (ouro → ródio, prata, etc.) | Teste de variação: verificar se a peça está fiel ao original — cor, textura e detalhes |
| Imagem humanizada (produto em modelo) | Teste humanizada: verificar rosto da modelo, proporção do produto e detalhes da peça |

**Regra:** o Doc 2 (Gravia) nunca recebe o checklist de testes — é exclusivo do Doc 1 (Geovana) e dos cards do Trello de demandas de IA.