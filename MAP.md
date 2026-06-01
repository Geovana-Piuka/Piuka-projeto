# MAP — Leonardo Piuka (Piuka Semijoias)

**Atualizado:** Abril 2026

---

## Quem é Leonardo Piuka

Fundador da Piuka, e-commerce e lojas físicas de semijoias e acessórios femininos. Base em Ribeirão Preto. Diretora de marketing: Ana Beatriz. Presença em múltiplos canais: e-commerce próprio, Shopee, TikTok Shop, lojas físicas.

**ICP (cliente da Piuka):** Mulher, 20-45 anos, conectada ao digital e às tendências. Valoriza personalização. Compra para si e para presentear. Sensível a datas comemorativas.

**Estrutura interna:** Geovana é responsável por manter os arquivos de briefing atualizados.

**Plataformas:** E-commerce (não é cliente de conteúdo LinkedIn — foco em e-commerce e campanhas)

---

## Skills associadas

| Skill | Papel |
|-------|-------|
| `/briefing-piuka` | **Single source of truth.** Conduz briefing mensal pós-reunião com Ana. Coleta TUDO: campanhas + copy por peça (4D) + tabela completa de 20-23 e-mails (4E) + @handles das influencers (4B) + imagens de referência. Gera super doc + copies + e-mails + lives + briefings visuais + sub-docs do time + pacote de imagens (2.5C) + pacote de e-mails (2.3). |
| `/imagens-piuka` | **Lê do briefing, não pergunta.** A partir da seção 2.5C aprovada, gera JSON de design + prompt Freepik por peça (4 famílias: collab_panels, story_9x16, produto_flatlay_4x5, single_1x1_editorial). Recebe imagens da influencer via chat (as mesmas que Ana subiu no Freepik), categoriza como imagem_ref_1/2/3, logo_piuka, assinatura_influencer. Prompt cita IDs explicitamente. |
| `/emails-piuka` | **Lê do briefing, não pergunta.** A partir da linha N da seção 2.3, gera HTML completo. Blocos modulares (header, hero, produto_2up_polaroid, produto_grid_4, assinatura_influencer, cta_saida, footer_social). 7 links sociais hardcoded no rodapé (site, IG, TikTok, YT, FB, Pinterest, LinkedIn). Bolds aplicados conforme declarado no briefing. Padrão v1.1 bege quente + preto #1A1A1A + radius 3px. |

---

## Fluxo mensal da Ana (passo-a-passo)

```
1. REUNIÃO MENSAL — Ana, Leonardo e equipe alinham calendário
   ↓
2. ABRIR /briefing-piuka
   Responder os blocos em ordem:
   • Blocos 1-3: campanha, produto, tom
   • Bloco 4: canais e volume de e-mails
   • Bloco 4B: influencers + @Instagram + @TikTok + estilo visual
   • Bloco 4C: sessões fotográficas
   • Bloco 4D: pacote de imagens — para CADA peça, declarar
     família, formato, headline, handwritten, CTA, disclaimer, imagens-ref
   • Bloco 4E: pacote de e-mails — tabela dos 20-23 e-mails com
     assunto, pré-header, objetivo, blocos, copy + palavras-bold por bloco
   • Blocos 5-6: secundárias, restrições, confirmação
   ↓
3. SUBIR IMAGENS NO FREEPIK
   Para cada influencer do mês, subir todas as fotos que serão usadas.
   Logo Piuka oficial já está no Freepik.
   ↓
4. PARA CADA PEÇA DE IMAGEM (iterar):
   • Abrir /imagens-piuka apontando para a peça N do briefing
   • Mandar no chat AS MESMAS fotos que subiu no Freepik
   • Skill categoriza: imagem_ref_1, imagem_ref_2, ..., logo_piuka, assinatura_influencer
   • Skill retorna JSON + prompt Freepik
   • Colar o prompt no Freepik com as mesmas imagens anexadas
   ↓
5. PARA CADA E-MAIL (iterar 20-23x):
   • Abrir /emails-piuka apontando para o e-mail N do briefing
   • Skill retorna HTML completo com bolds aplicados e 7 links sociais prontos
   • Substituir só {{IMG_*}} pelos links das imagens hospedadas no ESP
   • Substituir {{LINK_CTA_*}} pelos UTMs da campanha
   • Substituir {{LINK_DESCADASTRO}} pelo merge tag do ESP
   • Colar no ESP (RD Station, Mailchimp, ActiveCampaign, Brevo)
   • Agendar envio
   ↓
6. REGISTRAR NO LOG
   log_entregas.md — registrar peças + e-mails gerados no mês
```

**Regra:** Ana responde o briefing UMA vez. Nada de retorno a perguntar depois. Se precisar algo não coletado, pausa a execução e volta no briefing.

---

## Arquivos principais

| Arquivo | Descrição |
|---------|-----------|
| [instaladores/agente_especialista.md](instaladores/agente_especialista.md) | Agente especialista Piuka — cérebro da marca (campos [CAMPO_ANA] a preencher) |
| [instaladores/agente_copy_revisao.md](instaladores/agente_copy_revisao.md) | Agente de copy e revisão |
| [instaladores/instalador_briefing_mensal.md](instaladores/instalador_briefing_mensal.md) | Briefing mensal — ciclos de campanha |
| [perguntas_formulario.md](perguntas_formulario.md) | Formulário de extração com Ana |
| [prompt_gerador_forms.md](prompt_gerador_forms.md) | Prompt para gerar formulários de briefing |
| [gerar_briefing_maio2026.js](gerar_briefing_maio2026.js) | Script para gerar briefing de Maio 2026 |

---

## Estrutura do projeto

| Pasta | Conteúdo |
|-------|---------|
| `diagnostico/` | Diagnóstico inicial do projeto |
| `implementacao/` | Plano de implementação |
| `operacao/` | Operação corrente |
| `plano_aplicacao/` | Plano de aplicação de IA |
| `reunioes/` | Registros de reuniões |
| `sops/` | SOPs da operação Piuka |
| `recursos/` | Recursos e referências |

---

## Status atual

**Instalador agente_especialista.md:** esqueleto criado — vários campos `[CAMPO_ANA]` ainda não preenchidos. Sessão de extração com Ana pendente.

**Diferenciais de marca (provisionais):**
- Coleções colaborativas com influenciadoras (Paolla Star, Fe Tumas, Juliana Paes)
- Cashback 15% + 10% OFF primeira compra
- Presença física em RP + digital nacional

---

## Regras críticas

- TODO agente Piuka começa lendo `instaladores/agente_especialista.md` — é o cérebro da marca
- Geovana atualiza o instalador a cada campanha aprovada e a cada feedback da Ana
- Adicionar reprova com comentário da Ana → nova regra no instalador
- Campos `[CAMPO_ANA]` precisam de sessão de extração antes de qualquer produção criativa definitiva
