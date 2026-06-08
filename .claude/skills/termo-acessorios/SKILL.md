---
name: termo-acessorios
description: >
  Gera termos de comodato de peças/acessórios da Piuka Semijoias em .docx. Conduz uma conversa para coletar dados do comodatário (nome, CPF), modalidade (retirada em loja ou envio por correios), produtos emprestados e datas — depois gera o documento completo pronto para envio. Use quando o usuário mencionar "termo de empréstimo", "termo de comodato", "gerar termo", "termo acessórios", "termo Piuka".
trigger: >
  Acione esta skill quando o usuário mencionar "termo de empréstimo", "termo de comodato", "gerar termo", "criar termo", "termo acessórios", "termo Piuka", ou qualquer variação que envolva gerar um documento de empréstimo/comodato de peças ou acessórios.
---

# Skill: Termo de Comodato de Peças/Acessórios

## O que esta skill faz

Conduz uma conversa para coletar os dados variáveis e gera um novo `.docx` de termo de comodato, mantendo exatamente a formatação, fontes e estrutura do modelo original.

---

## Lojas cadastradas

Quando a modalidade for **retirada em loja**, o comodante é preenchido automaticamente conforme a loja escolhida:

| Loja | Comodante | CNPJ | Endereço da loja |
|------|-----------|------|-----------------|
| Piuka Morumbi | AL2 MORUMBI JOIAS LTDA | 59.586.938/0001-88 | Av. Roque Petroni Júnior, 1.089 - Loja 34-I - Piso Terreo - Vila Gertrudes, São Paulo - SP, 04707-900 |
| E-commerce (Correios) | JK3 COMERCIO DE ACESSORIOS LTDA | 42.454.126/0001-86 | Rua Ceará, n.º 426, Centro, CEP: 15.800-003, Catanduva/SP |

> Para adicionar uma nova loja: insira uma nova linha na tabela acima com Comodante, CNPJ e endereço.

---

## Estrutura do documento modelo

O modelo fica em:
```
.claude/skills/termo-acessorios/modelo/TERMO DE COMODATO DE PEÇAS - MODELO PADRÃO.docx
```

A estrutura do documento é:

- **P1** (bold): Título "TERMO DE COMODATO DE PEÇAS/ACESSÓRIOS"
- **P2** (bold): Subtítulo "PARA UTILIZAÇÃO EM PRODUÇÃO ARTÍSTICA/PUBLICITÁRIA"
- **P5**: Parágrafo de qualificação das partes — contém **nome do comodatário** (bold, run6) e **CPF** (bold, run8)
- **P7**: "O(A) COMODATÁRIO(A) solicitou o empréstimo as peças abaixo descritas:"
- **P8, P9**: parágrafos em branco — aqui entram as **linhas de produtos** (uma por parágrafo)
- **P10**: Parágrafo de entrega/retirada:
  - **Modo loja**: "O(A) [NOME] retirou as peças acima descritas diretamente na loja [LOJA] ([ENDEREÇO]), em [DATA]."
  - **Modo correios**: "A COMODANTE enviou as peças acima descritas, via correios, na data [DATA] para o endereço [ENDEREÇO] aos cuidados do(a) COMODATÁRIO(A) [NOME]"
- **P13**: Parágrafo de devolução:
  - **Modo loja**: "Fica acordado entre as partes que, as peças/acessórios deverão ser devolvidas até o dia [DATA] diretamente na loja [LOJA] ([ENDEREÇO])."
  - **Modo correios**: mantém texto original com data substituída via regex
- **P23**: Data do documento — "Catanduva – SP , DD de Mês de AAAA."
- **P35**: Nome do comodatário na assinatura (run0)

---

## Fluxo de perguntas — faça em blocos

### Bloco 1 — Comodatário

> Vamos gerar o termo! Me passa os dados de quem vai receber as peças:
> 1. Nome completo
> 2. CPF

### Bloco 2 — Modalidade

> As peças serão retiradas diretamente em loja ou enviadas por Correios?
> - **Loja**: qual loja? (Ex: Morumbi) — o comodante é preenchido automaticamente
> - **Correios**: qual o endereço completo para envio?

### Bloco 3 — Peças emprestadas

> Agora me lista as peças do comodato. Para cada uma informe:
> - Nome da peça, quantidade e valor unitário
>
> Ex: "Brinco Cathy Coração, 2 unidades, R$ 89,90"
>
> Quando terminar, escreva **pronto**.

### Bloco 4 — Datas

> Por último:
> 1. Data de retirada/envio (DD/MM/AAAA)
> 2. Data de devolução (DD/MM/AAAA)

---

## Resumo antes de gerar

> "Confirma? Vou gerar o termo para **[NOME]** (CPF [CPF]) — **[X] peça(s)**, [retirada em loja [LOJA] / envio por Correios para [ENDEREÇO]], em **[DATA_RETIRADA]**, devolução até **[DATA_DEVOLUCAO]**."

Só gere após confirmação.

---

## Geração do documento

Execute o script Python abaixo para gerar o novo `.docx`:

```python
# -*- coding: utf-8 -*-
import os, copy, re
from docx import Document
from datetime import datetime

W         = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
XML_SPACE = '{http://www.w3.org/XML/1998/namespace}space'

# ── dados coletados ──────────────────────────────────────────
NOME           = "NOME_DO_COMODATARIO"
CPF            = "000.000.000-00"
MODALIDADE     = "loja"   # "loja" ou "correio"

# --- Se MODALIDADE == "loja" ---
NOME_LOJA      = "Piuka Morumbi"
ENDERECO_LOJA  = "Av. Roque Petroni Júnior, 1.089 - Loja 34-I - Piso Terreo - Vila Gertrudes, São Paulo - SP, 04707-900"

# --- Se MODALIDADE == "correio" ---
ENDERECO_ENVIO = "Rua Exemplo, 123, Cidade/SP"   # endereço do comodatário

DATA_RETIRADA  = "DD/MM/AAAA"
DATA_DEVOLUCAO = "DD/MM/AAAA"
PECAS = [
    # (nome, qtd, valor_unitario)
    ("Brinco Cathy Coração", 1, 89.90),
]
# ─────────────────────────────────────────────────────────────

LOJAS = {
    "Piuka Morumbi": {
        "razao": "AL2 MORUMBI JOIAS LTDA",
        "cnpj":  "59.586.938/0001-88",
    },
    # E-commerce (padrão do modelo): JK3 COMERCIO DE ACESSORIOS LTDA — não precisa trocar
}

def data_extenso(data_str):
    meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho",
             "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]
    d = datetime.strptime(data_str, "%d/%m/%Y")
    return f"{d.day} de {meses[d.month-1]}  de {d.year}"

def set_run_text(run, texto):
    """Seta texto garantindo xml:space='preserve' no <w:t> — preserva formatação."""
    run.text = texto
    t_elem = run._element.find(f'{{{W}}}t')
    if t_elem is not None:
        t_elem.set(XML_SPACE, 'preserve')

pasta_modelo = r'c:\Users\ecommerceadm05\Desktop\piuka-projeto-main\.claude\skills\termo-acessorios\modelo'
arquivo_modelo = os.path.join(pasta_modelo, [f for f in os.listdir(pasta_modelo) if f.endswith('.docx') and not f.startswith('~')][0])
doc = Document(arquivo_modelo)

# ── P5: comodante (run0=razão social, run1=CNPJ) + comodatário ──
# IMPORTANTE: só trocar run0 e CNPJ em run1. NÃO tocar run3 (endereço sede).
p5 = doc.paragraphs[5]
if MODALIDADE == "loja" and NOME_LOJA in LOJAS:
    loja = LOJAS[NOME_LOJA]
    p5.runs[0].text = loja["razao"]  # bold+underline preservados automaticamente
    p5.runs[1].text = re.sub(r'\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}', loja["cnpj"], p5.runs[1].text)
set_run_text(p5.runs[6], f" {NOME} ")
set_run_text(p5.runs[8], f"{CPF} ")

# ── Tabela de peças: está dentro de <w:sdt> em body[9] ───────
# IMPORTANTE: as peças ficam numa <w:tbl> dentro de um structured document tag,
# NÃO em parágrafos simples. body[9] é o sdt, não um parágrafo.
body = doc.element.body
sdt_outer = list(body)[9]
tbl = sdt_outer.find(f'.//{{{W}}}tbl')
rows = tbl.findall(f'{{{W}}}tr')

# Capturar template (row[1]) ANTES de remover qualquer linha
row_template = copy.deepcopy(rows[1])

# Remover todas as linhas de dados — manter apenas o header (rows[0])
for row in rows[1:]:
    tbl.remove(row)

# Inserir novas linhas com as peças deste termo
for nome_p, qtd, valor in PECAS:
    nova_row = copy.deepcopy(row_template)
    textos_t = nova_row.findall(f'.//{{{W}}}t')
    textos_t[0].text = nome_p
    textos_t[1].text = str(qtd)
    textos_t[2].text = f"{valor:.2f}".replace('.', ',')
    tbl.append(nova_row)

# ── P10: retirada/envio ──────────────────────────────────────
paragrafos = doc.paragraphs
p10 = None
for p in paragrafos:
    if "COMODANTE" in p.text and "enviou" in p.text:
        p10 = p
        break

if p10:
    if MODALIDADE == "loja":
        set_run_text(p10.runs[0], "O(A) ")
        set_run_text(p10.runs[1], "COMODATÁRIO(A)")   # run1 mantém bold do modelo
        set_run_text(p10.runs[2], f" retirou as peças acima descritas diretamente na loja {NOME_LOJA} ({ENDERECO_LOJA}), em {DATA_RETIRADA}.")
        # Remover runs extras (3 e 4) do XML para não deixar runs vazios
        for run in list(p10.runs[3:]):
            run._element.getparent().remove(run._element)
    else:
        set_run_text(p10.runs[2], f" enviou as peças acima descritas, via correios, na data {DATA_RETIRADA} para o endereço {ENDERECO_ENVIO}  aos cuidados do(a) ")
        set_run_text(p10.runs[4], f"{NOME} ")

# ── P13: devolução ───────────────────────────────────────────
p13 = None
for p in paragrafos:
    if "Fica acordado" in p.text:
        p13 = p
        break

if p13:
    if MODALIDADE == "loja":
        set_run_text(p13.runs[0], f"Fica acordado entre as partes que, as peças/acessórios deverão ser devolvidas até o dia {DATA_DEVOLUCAO} diretamente na loja {NOME_LOJA} ({ENDERECO_LOJA}).")
        # Remover runs extras do XML (eram runs 1–6 de "via correios")
        for run in list(p13.runs[1:]):
            run._element.getparent().remove(run._element)
    else:
        set_run_text(p13.runs[0], re.sub(r'\d{2}/\d{2}/\d{4}', DATA_DEVOLUCAO, p13.runs[0].text, count=1))

# ── P23: data do documento ───────────────────────────────────
for p in paragrafos:
    if p.text.startswith("Catanduva"):
        set_run_text(p.runs[0], f"Catanduva – SP , {data_extenso(DATA_RETIRADA)}.")
        break

# ── P35: nome na assinatura ──────────────────────────────────
for p in paragrafos:
    if len(p.runs) > 0 and "Manoela" in p.runs[0].text:
        set_run_text(p.runs[0], f"{NOME} ")
        break

# ── salvar ───────────────────────────────────────────────────
pasta_saida = r'c:\Users\ecommerceadm05\Desktop\piuka-projeto-main\.claude\skills\termo-acessorios\gerados'
os.makedirs(pasta_saida, exist_ok=True)
nome_arquivo = NOME.lower().replace(" ", "-")
data_arquivo = DATA_RETIRADA.replace("/", "")
caminho_saida = os.path.join(pasta_saida, f"termo_{nome_arquivo}_{data_arquivo}.docx")
doc.save(caminho_saida)
print(f"Termo gerado: {caminho_saida}")
```

### Como usar o script

1. Preencha as variáveis no topo (`NOME`, `CPF`, `MODALIDADE`, dados de loja ou endereço, datas, `PECAS`)
2. Execute com: `python gerar_termo.py`
3. O arquivo é salvo em `gerados/termo_[nome]_[DDMMAAAA].docx`

---

## Campos variáveis do documento

| Campo | Onde aparece no docx | Dado coletado |
|-------|----------------------|---------------|
| Razão social comodante | P5 run0 (bold+underline) | Loja escolhida |
| CNPJ comodante | P5 run1 (via regex) | Loja escolhida |
| Nome do comodatário | P5 run6, P35 run0 | Nome completo |
| CPF | P5 run8 | CPF |
| Peças | Tabela dentro de sdt (body[9]) — linhas 1..N | Nome, qtd, valor |
| Texto de retirada/envio | P10 runs 0–4 | Depende da modalidade |
| Data de devolução | P13 run0 | DD/MM/AAAA |
| Endereço de devolução | P13 runs 0–6 | Loja ou endereço Correios |
| Data do documento | P23 run0 | Extenso via data_extenso() |

---

## Destino dos arquivos gerados

```
.claude/skills/termo-acessorios/gerados/termo_[nome]_[DDMMAAAA].docx
```

---

## Após gerar

Informe o caminho completo do arquivo e pergunte se deseja:
1. Gerar outro termo para outra pessoa
2. Corrigir algum dado do termo gerado