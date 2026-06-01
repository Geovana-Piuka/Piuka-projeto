# Script para gerar briefing_namorados_junho2026.docx
# Usa System.IO.Compression (built-in no PowerShell 5.1 / .NET Framework)

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$outputPath = "c:\Users\ecommerceadm05\Desktop\piuka-projeto-main\instaladores\briefing_namorados_junho2026.docx"
$tempDir = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), "piuka_docx_" + [System.Guid]::NewGuid().ToString("N"))

# Criar estrutura de pastas
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
New-Item -ItemType Directory -Path "$tempDir\_rels" -Force | Out-Null
New-Item -ItemType Directory -Path "$tempDir\word" -Force | Out-Null
New-Item -ItemType Directory -Path "$tempDir\word\_rels" -Force | Out-Null

# Helpers para escapar XML
function xe($s) { $s -replace '&','&amp;' -replace '<','&lt;' -replace '>','&gt;' -replace '"','&quot;' }

# Helper: paragrafo normal
function para($text, [switch]$bold, $color="000000", $sz=22, $spBefore=0, $spAfter=60) {
    $b = if ($bold) { "<w:b/><w:bCs/>" } else { "" }
    $col = if ($color -ne "000000") { "<w:color w:val=`"$color`"/>" } else { "" }
    $escaped = xe $text
    return @"
<w:p><w:pPr><w:spacing w:before="$spBefore" w:after="$spAfter"/></w:pPr><w:r><w:rPr>$b$col<w:sz w:val="$sz"/><w:szCs w:val="$sz"/><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr><w:t xml:space="preserve">$escaped</w:t></w:r></w:p>
"@
}

# Helper: heading
function h1($text) {
    $escaped = xe $text
    return @"
<w:p><w:pPr><w:pStyle w:val="Heading1"/><w:spacing w:before="360" w:after="120"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr><w:t xml:space="preserve">$escaped</w:t></w:r></w:p>
"@
}

function h2($text) {
    $escaped = xe $text
    return @"
<w:p><w:pPr><w:pStyle w:val="Heading2"/><w:spacing w:before="240" w:after="80"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr><w:t xml:space="preserve">$escaped</w:t></w:r></w:p>
"@
}

function h3($text) {
    $escaped = xe $text
    return @"
<w:p><w:pPr><w:pStyle w:val="Heading3"/><w:spacing w:before="180" w:after="60"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr><w:t xml:space="preserve">$escaped</w:t></w:r></w:p>
"@
}

# Helper: linha em branco
function blank() { return '<w:p><w:pPr><w:spacing w:after="60"/></w:pPr></w:p>' }

# Helper: page break
function pb() { return "<w:p><w:r><w:br w:type=`"page`"/></w:r></w:p>" }

# Helper: bullet item
function bullet($text) {
    $escaped = xe $text
    return @"
<w:p><w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr><w:spacing w:after="40"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr><w:t xml:space="preserve">$escaped</w:t></w:r></w:p>
"@
}

# Helper: celula de tabela
function tc($text, $w, [switch]$header, $align="left") {
    $escaped = xe $text
    $shade = if ($header) { "<w:shd w:val=`"clear`" w:color=`"auto`" w:fill=`"2C3E50`"/>" } else { "" }
    $col = if ($header) { "<w:color w:val=`"FFFFFF`"/>" } else { "" }
    $bold = if ($header) { "<w:b/><w:bCs/>" } else { "" }
    $ja = if ($align -eq "center") { "<w:jc w:val=`"center`"/>" } else { "" }
    return @"
<w:tc><w:tcPr>$shade<w:tcW w:w="$w" w:type="dxa"/><w:tcMar><w:top w:w="80" w:type="dxa"/><w:left w:w="120" w:type="dxa"/><w:bottom w:w="80" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tcMar></w:tcPr><w:p><w:pPr>$ja<w:spacing w:after="0"/></w:pPr><w:r><w:rPr>$bold$col<w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="18"/><w:szCs w:val="18"/></w:rPr><w:t xml:space="preserve">$escaped</w:t></w:r></w:p></w:tc>
"@
}

# Helper: linha de tabela
function tr($cells, [switch]$header) {
    $shadeRow = if ($header) { "<w:trPr><w:tblHeader/></w:trPr>" } else { "" }
    return "<w:tr>$shadeRow$($cells -join '')</w:tr>"
}

# Helper: tabela completa com bordas
function tbl($rows, $totalW) {
    $border = "<w:top w:val=`"single`" w:sz=`"4`" w:space=`"0`" w:color=`"CCCCCC`"/><w:left w:val=`"single`" w:sz=`"4`" w:space=`"0`" w:color=`"CCCCCC`"/><w:bottom w:val=`"single`" w:sz=`"4`" w:space=`"0`" w:color=`"CCCCCC`"/><w:right w:val=`"single`" w:sz=`"4`" w:space=`"0`" w:color=`"CCCCCC`"/><w:insideH w:val=`"single`" w:sz=`"4`" w:space=`"0`" w:color=`"CCCCCC`"/><w:insideV w:val=`"single`" w:sz=`"4`" w:space=`"0`" w:color=`"CCCCCC`"/>"
    return @"
<w:tbl><w:tblPr><w:tblW w:w="$totalW" w:type="dxa"/><w:tblBorders>$border</w:tblBorders><w:tblCellSpacing w:w="0" w:type="dxa"/></w:tblPr>$($rows -join '')
</w:tbl>
"@
}

# ============================================================
# CONTEUDO DO DOCUMENTO
# ============================================================

$body = @()

# CAPA
$body += @"
<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:before="2880" w:after="120"/></w:pPr><w:r><w:rPr><w:b/><w:bCs/><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="52"/><w:szCs w:val="52"/><w:color w:val="1A252F"/></w:rPr><w:t>BRIEFING PIUKA</w:t></w:r></w:p>
<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:before="120" w:after="120"/></w:pPr><w:r><w:rPr><w:b/><w:bCs/><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="36"/><w:szCs w:val="36"/><w:color w:val="C8A45A"/></w:rPr><w:t>O BRILHO DA NOSSA HISTORIA</w:t></w:r></w:p>
<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:before="120" w:after="120"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="26"/><w:szCs w:val="26"/><w:color w:val="555555"/></w:rPr><w:t>Campanha Dia dos Namorados 2026</w:t></w:r></w:p>
<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:before="120" w:after="120"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="22"/><w:szCs w:val="22"/><w:color w:val="888888"/></w:rPr><w:t>18 de Maio a 12 de Junho de 2026</w:t></w:r></w:p>
<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:before="120" w:after="120"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="20"/><w:szCs w:val="20"/><w:color w:val="888888"/></w:rPr><w:t>Gerado em: 29/04/2026</w:t></w:r></w:p>
"@

$body += pb

# 2.1 SUPER DOC
$body += h1 "2.1 - Super Doc da Campanha"
$body += para "CAMPANHA PRINCIPAL: O Brilho da Nossa Historia" -bold
$body += para "PERIODO: 18/05/2026 ate 12/06/2026"
$body += para "NARRATIVA: Sua historia brilha nos detalhes"
$body += para "CONCEITO: Presentear com significado - o acessorio como marcador de momentos do casal"
$body += para "TOM: 60% emocional (storytelling) + 40% oferta (urgencia pelo brinde, nao por desconto)"
$body += blank

$body += h2 "Fases da Campanha"
$body += bullet "TEASER: 18 a 24/05 - Storytelling, nostalgia, macro de pecas, sem revelar kit"
$body += bullet "LANCAMENTO: 25/05 - Abertura kits + brinde + live Marina Torres"
$body += bullet "CONVERSAO: 01 a 07/06 - Pressao diaria, kit por kit, social proof influencers"
$body += bullet "LAST CALL: 08 a 12/06 - Frete expresso, calcografia PDV, Dia D voucher digital"
$body += blank

$body += h2 "Kits de Presente"
$body += @(
    tr @((tc "Kit" 2000 -header), (tc "Composicao" 4500 -header), (tc "Preco" 1500 -header)) -header
    tr @((tc "Kit Paixao" 2000), (tc "Choker Coracoes + Colar Coracao Zirconias" 4500), (tc "R$ 259,00" 1500))
    tr @((tc "Kit Conexao" 2000), (tc "Colar Coracao Vazado + Coracao Mini Pingente" 4500), (tc "R$ 198,00" 1500))
    tr @((tc "Kit Eterno" 2000), (tc "Colar Coracao Perola + Brinco Combinando" 4500), (tc "R$ 310,00" 1500))
) | ForEach-Object { $_ }
$body += tbl @(
    (tr @((tc "Kit" 2000 -header), (tc "Composicao" 4500 -header), (tc "Preco" 1500 -header)) -header),
    (tr @((tc "Kit Paixao" 2000), (tc "Choker Coracoes + Colar Coracao Zirconias" 4500), (tc "R$ 259,00" 1500))),
    (tr @((tc "Kit Conexao" 2000), (tc "Colar Coracao Vazado + Coracao Mini Pingente" 4500), (tc "R$ 198,00" 1500))),
    (tr @((tc "Kit Eterno" 2000), (tc "Colar Coracao Perola + Brinco Combinando" 4500), (tc "R$ 310,00" 1500)))
) 8000
$body += blank
$body += para "BRINDE: Pulseira Thainae Perolas Folheado 18k - em todos os kits, edicao limitada 18/05 a 12/06" -bold
$body += para "LOJA FISICA: Pulseira Thainae + embalagem veludo exclusiva"
$body += blank

$body += h2 "Canais, Verba e Urgencias"
$body += bullet "Meta Ads 45%: retargeting quem visitou o site + interesse noivado/casamento"
$body += bullet "Influencers 35%: Fe Tumas + Rachel Apolino + Ari Canovas"
$body += bullet "Organico/CRM 20%: retencao base atual via e-mail + WhatsApp"
$body += blank
$body += para "URGENCIAS IMEDIATAS:" -bold
$body += bullet "[CRITICO] Sessao de foto: 05/05 - Golden Hour Intimista, 2 casais + hand model"
$body += bullet "[CRITICO] Kit Paixao: still interno em 06/05 (amostras chegam 04/05)"
$body += bullet "[CRITICO] Fotos tratadas para Isabelle ate 12/05"
$body += bullet "[CRITICO] Micro-casal em negociacao - definicao ate sexta-feira"
$body += bullet "[ATENCAO] Brinde (porta-joias): chega fornecedor 15/05 - plano B se atrasar"

$body += pb

# 2.2 COPY POR CANAL
$body += h1 "2.2 - Copy por Canal"

$body += h2 "Instagram Feed - Post Principal de Lancamento (25/05)"
$body += para "OPCAO A - Abertura emocional:" -bold
$body += para "Tem momentos que a gente guarda nao na memoria, mas no corpo. No brilho do pulso. No peso leve do colar que ganhou naquele dia."
$body += para "Os Kits de Namorados Piuka chegaram - e com eles, a Pulseira Thainae de brinde pra quem garantir o presente mais completo do ano."
$body += para "Link na bio. O mix perfeito ja esta montado por nos."
$body += blank
$body += para "OPCAO B - Produto em foco:" -bold
$body += para "Nao e so uma semijoia. E o capitulo que voce escolheu eternizar."
$body += para "Kit Paixao. Kit Conexao. Kit Eterno. Tres historias. Tres escolhas. Um brinde exclusivo que completa tudo."
$body += para "A Pulseira Thainae Perolas 18k vai junto - por tempo limitado."
$body += blank
$body += para "OPCAO C - Narrativa curta:" -bold
$body += para "Lembra daquele dia? A Piuka montou o kit para voce nao esquecer."
$body += para "Brinde exclusivo + curadoria pronta = a escolha que diz tudo."
$body += blank

$body += h2 "Instagram Stories - Sequencia de Lancamento (25/05)"
$body += para "FRAME 1 - GANCHO:" -bold
$body += para "Voce ja conhecia o brilho da Piuka. Agora chegou o capitulo mais bonito da nossa historia. [arrasta para ver]"
$body += para "FRAME 2 - PRODUTO + OFERTA:" -bold
$body += para "3 kits criados pra que o presente fale por voce. Kit Paixao - Kit Conexao - Kit Eterno. + Pulseira Thainae de brinde em todos eles. Edicao limitada - so ate o dia 12/06."
$body += para "FRAME 3 - CTA:" -bold
$body += para "Nao deixa a historia parar por falta de brilho. Link na bio."
$body += blank

$body += h2 "TikTok"
$body += para "LEGENDA A - storytelling:" -bold
$body += para "quando o presente diz mais do que qualquer palavra | os kits de namorados da @piuka chegaram e a pulseira thainae vem de brinde. de graca. serio. | link na bio"
$body += para "#semijoias #diadosnamorados #presentedenamorados #piuka #kitdepresente"
$body += blank
$body += para "LEGENDA B - urgencia leve:" -bold
$body += para "pro meu parceiro que vai deixar pra ultima hora: esse video e pra voce | a piuka ja montou o mix - voce so escolhe o estilo dela. | nao diz que nao avisei"
$body += para "#diadosnamorados2026 #presenteideia #semijoia #piuka #pulseira"
$body += blank

$body += h2 "WhatsApp VIP (RevSend)"
$body += para "LANCAMENTO (25/05):" -bold
$body += para "Oi [Nome]! Os Kits de Namorados Piuka acabaram de chegar. Sao 3 mixes prontos pra presentear sem erro: Kit Paixao R$259 | Kit Conexao R$198 | Kit Eterno R$310. E em todos eles: a Pulseira Thainae Perolas 18k de brinde. Edicao limitada. Enquanto durar o estoque."
$body += blank
$body += para "LAST CALL (08/06):" -bold
$body += para "[Nome], ultimo aviso antes do dia 12. O prazo de frete garantido para entrega ate sexta esta acabando. A Pulseira Thainae ainda vai junto - mas nao por muito tempo."
$body += blank

$body += h2 "Meta Ads"
$body += para "VARIACAO A - urgencia sofisticada:" -bold
$body += para "Headline: A Pulseira Thainae vai junto. Por enquanto."
$body += para "Texto: Os Kits de Namorados Piuka chegaram com brinde exclusivo. Curadoria pronta. Brilho que diz tudo. So ate 12/06."
$body += para "CTA: Garantir Kit"
$body += blank
$body += para "VARIACAO B - beneficio emocional:" -bold
$body += para "Headline: O mix que fala por voce no dia 12."
$body += para "Texto: Tres kits criados pela Piuka pra que o presente tenha estilo, significado e a Pulseira Thainae de brinde. A escolha que diz tudo."
$body += para "CTA: Ver Kits"

$body += pb

# 2.3 EMAILS
$body += h1 "2.3 - Pacote de E-mails (22 Disparos)"
$body += para "Distribuicao: 8 e-mails em maio (aquecimento/desejo) + 14 e-mails em junho (conversao diaria)"

# Tabela de emails - dividida em duas partes para caber
$body += h2 "Emails de Maio (Aquecimento)"
$body += tbl @(
    (tr @((tc "#" 400 -header), (tc "Data" 800 -header), (tc "Hora" 600 -header), (tc "Assunto A" 3200 -header), (tc "Objetivo" 1200 -header), (tc "Influencer" 1560 -header)) -header),
    (tr @((tc "1" 400), (tc "18/05" 800), (tc "10h" 600), (tc "Algo brilha no horizonte..." 3200), (tc "awareness" 1200), (tc "Nenhum" 1560))),
    (tr @((tc "2" 400), (tc "19/05" 800), (tc "18h" 600), (tc "O Brilho da Nossa Historia: conheca o conceito" 3200), (tc "awareness" 1200), (tc "Nenhum" 1560))),
    (tr @((tc "3" 400), (tc "20/05" 800), (tc "10h" 600), (tc "Como eternizar um momento?" 3200), (tc "engajamento" 1200), (tc "Nenhum" 1560))),
    (tr @((tc "4" 400), (tc "21/05" 800), (tc "18h" 600), (tc "Eles chegaram. Tres mixes. Tres historias." 3200), (tc "venda" 1200), (tc "Nenhum" 1560))),
    (tr @((tc "5" 400), (tc "22/05" 800), (tc "10h" 600), (tc "O que voce gostaria de ganhar?" 3200), (tc "engajamento" 1200), (tc "Nenhum" 1560))),
    (tr @((tc "6" 400), (tc "23/05" 800), (tc "10h" 600), (tc "A Pulseira Thainae esta chegando" 3200), (tc "venda" 1200), (tc "Nenhum" 1560))),
    (tr @((tc "7" 400), (tc "23/05" 800), (tc "18h" 600), (tc "Faltam 48h para o lancamento" 3200), (tc "awareness" 1200), (tc "Nenhum" 1560))),
    (tr @((tc "8" 400), (tc "24/05" 800), (tc "10h" 600), (tc "Prepare o coracao (e o carrinho)" 3200), (tc "awareness" 1200), (tc "Nenhum" 1560)))
) 7760
$body += blank

$body += h2 "Emails de Junho (Conversao)"
$body += tbl @(
    (tr @((tc "#" 400 -header), (tc "Data" 800 -header), (tc "Hora" 600 -header), (tc "Assunto A" 3200 -header), (tc "Objetivo" 1200 -header), (tc "Influencer" 1560 -header)) -header),
    (tr @((tc "9" 400), (tc "25/05" 800), (tc "09h" 600), (tc "Estao liberados: Kits + Brinde Exclusivo" 3200), (tc "venda" 1200), (tc "Marina Torres" 1560))),
    (tr @((tc "10" 400), (tc "28/05" 800), (tc "10h" 600), (tc "A Pulseira Thainae pode ser sua (de graca)" 3200), (tc "venda" 1200), (tc "Nenhum" 1560))),
    (tr @((tc "11" 400), (tc "01/06" 800), (tc "10h" 600), (tc "Junho chegou: o mes da sua historia" 3200), (tc "venda" 1200), (tc "Nenhum" 1560))),
    (tr @((tc "12" 400), (tc "02/06" 800), (tc "18h" 600), (tc "Kit Paixao: para quem nao abre mao do brilho" 3200), (tc "venda" 1200), (tc "Gabi & Leo" 1560))),
    (tr @((tc "13" 400), (tc "03/06" 800), (tc "18h" 600), (tc "Kit Conexao: o amor nos detalhes discretos" 3200), (tc "venda" 1200), (tc "Nenhum" 1560))),
    (tr @((tc "14" 400), (tc "04/06" 800), (tc "08h" 600), (tc "Estamos ao vivo! Condicoes especiais agora" 3200), (tc "engajamento" 1200), (tc "Bia Viana" 1560))),
    (tr @((tc "15" 400), (tc "05/06" 800), (tc "10h" 600), (tc "O que as clientes estao dizendo" 3200), (tc "recorrencia" 1200), (tc "Nenhum" 1560))),
    (tr @((tc "16" 400), (tc "06/06" 800), (tc "18h" 600), (tc "Kit Eterno: o classico que nunca passa" 3200), (tc "venda" 1200), (tc "Marina Torres" 1560))),
    (tr @((tc "17" 400), (tc "07/06" 800), (tc "10h" 600), (tc "O casal que viaja junto, brilha junto" 3200), (tc "venda" 1200), (tc "Gabi & Leo" 1560))),
    (tr @((tc "18" 400), (tc "08/06" 800), (tc "09h" 600), (tc "Ultimo prazo de frete com entrega ate dia 12" 3200), (tc "venda" 1200), (tc "Nenhum" 1560))),
    (tr @((tc "19" 400), (tc "09/06" 800), (tc "18h" 600), (tc "Ela ainda nao sabe. Mas vai adorar." 3200), (tc "venda" 1200), (tc "Bia Viana" 1560))),
    (tr @((tc "20" 400), (tc "10/06" 800), (tc "10h" 600), (tc "Ultimas unidades com a Pulseira Thainae" 3200), (tc "venda" 1200), (tc "Nenhum" 1560))),
    (tr @((tc "21" 400), (tc "11/06" 800), (tc "18h" 600), (tc "Amanha e o dia. Ainda da tempo." 3200), (tc "venda" 1200), (tc "Nenhum" 1560))),
    (tr @((tc "22" 400), (tc "12/06" 800), (tc "08h" 600), (tc "Feliz Dia dos Namorados + voucher especial" 3200), (tc "engajamento" 1200), (tc "Nenhum" 1560)))
) 7760
$body += blank

$body += h2 "Detalhamento Email 9 - Lancamento 25/05 (Marina Torres)"
$body += bullet "Titulo hero script: O Brilho da Nossa Historia"
$body += bullet "Subtitulo Por: Marina Torres"
$body += bullet "Tagline bold: A curadoria que fala por voce chegou!"
$body += bullet "Paragrafo hero: A nova colecao de Namorados Piuka reune tres mixes pensados para que o presente tenha estilo, significado e um brinde que completa a historia."
$body += bullet "Stack assinatura: Para quem sente tudo, / Para quem da com cuidado, / Para quem e Piuka."
$body += bullet "CTA principal: GARANTIR MEU KIT | piuka.com.br/namorados2026"
$body += blank

$body += h2 "Detalhamento Email 14 - Live Day 04/06 (Bia Viana)"
$body += bullet "Titulo hero: A Live comecou - Com Bia Viana"
$body += bullet "Tagline bold: Condicoes especiais so enquanto estiver ao vivo!"
$body += bullet "Stack assinatura: Uma historia real, / Um brilho que apoiou, / Uma escolha que ficou."
$body += bullet "CTA principal: ASSISTIR AGORA | [link live Instagram]"

$body += pb

# 2.4 ROTEIROS DE LIVE
$body += h1 "2.4 - Roteiros de Live"

$body += h2 "LIVE 1 - Instagram - 25/05/2026 (Lancamento)"
$body += para "Data: 25/05/2026 (segunda-feira) | Plataforma: Instagram Live + espelhamento site"
$body += para "Produto em foco: Kits de Namorados + Pulseira Thainae | Duracao: 45 minutos"
$body += para "Apresentadora: Pietra + Marina Torres (convidada)"
$body += blank
$body += para "[00:00-00:03] ABERTURA" -bold
$body += bullet "Opcao A: Gente, hoje e o dia. Os kits finalmente sairam do armario - e eu vou abrir cada caixinha aqui com voces ao vivo."
$body += bullet "Opcao B: Quem aqui ainda nao sabe o que dar de presente pro dia 12? Fica porque a Piuka ja resolveu isso pra voce."
$body += blank
$body += para "[00:03-00:15] PRODUTO - OS KITS" -bold
$body += bullet "Abrir Kit Paixao ao vivo: mostrar cada peca individualmente - Choker Coracoes + Colar Zirconias em cima."
$body += bullet "[ESPACO PIETRA - fale sobre como voce usaria esse mix, que look faria]"
$body += bullet "Abrir Kit Conexao: Coracao Vazado + Mini Pingente. Discreto mas cheio de intencao."
$body += bullet "[ESPACO PIETRA - quem voce recomendaria esse kit? que tipo de pessoa e ela?]"
$body += bullet "Abrir Kit Eterno: Olha a perola. Olha o brinco combinando. Marina escolheu esse como favorito dela."
$body += blank
$body += para "[00:15-00:25] MARINA TORRES" -bold
$body += bullet "Marina fala sobre o que inspirou a colecao e por que amor-proprio tambem e historia"
$body += bullet "Mostra como usaria cada kit no proprio estilo"
$body += bullet "[ESPACO PIETRA - interaja, pergunte o que Marina recomenda para cada perfil]"
$body += blank
$body += para "[00:25-00:35] BRINDE + OFERTA" -bold
$body += bullet "Revelar Pulseira Thainae ao vivo: Perola natural. Banho 18k. Vem em TODOS os kits. Enquanto o estoque durar."
$body += bullet "Como comprar: vai no link da bio, escolhe o kit, ja vem montado."
$body += blank
$body += para "[00:42-00:45] CTA FINAL" -bold
$body += bullet "Kit Paixao R$259 - Kit Conexao R$198 - Kit Eterno R$310"
$body += bullet "Link na bio. Estoque limitado de Thainae."
$body += bullet "Segue a @piuka pra nao perder o last call la no dia 04."
$body += blank

$body += h2 "LIVE 2 - Instagram - 04/06/2026 (Last Call)"
$body += para "Data: 04/06/2026 (quinta-feira) | Duracao: 30 minutos | Convidada: Bia Viana"
$body += blank
$body += para "[00:00-00:02] ABERTURA" -bold
$body += bullet "Opcao A: Faltam 8 dias. Quem aqui ainda nao garantiu o kit?"
$body += bullet "Opcao B: Bia, voce pode falar pra quem ta em cima do muro o que voce acha da Pulseira Thainae?"
$body += blank
$body += para "[00:02-00:10] URGENCIA + FRETE" -bold
$body += bullet "Mostrar tabela de frete por regiao ao vivo"
$body += bullet "[ESPACO PIETRA - se souber casos de clientes que ja receberam e adoraram, compartilhe]"
$body += blank
$body += para "[00:10-00:20] BIA VIANA" -bold
$body += bullet "Bia mostra Kit Eterno + Pulseira Thainae que recebeu"
$body += bullet "Conta historia real: como o apoio do marido inspirou ela a usar o kit como simbolo"
$body += bullet "[ESPACO PIETRA - reaja genuinamente, pergunte como foi receber o kit]"
$body += blank
$body += para "[00:27-00:30] ENCERRAMENTO" -bold
$body += bullet "Segue a Piuka, compartilha essa live com aquela amiga que deixa tudo pra ultima hora."
$body += bullet "[ESPACO PIETRA - despedida no seu tom, obrigada a Bia]"

$body += pb

# 2.4B INFLUENCERS / AFILIADAS
$body += h1 "2.4B - Briefing Influencers e Afiliadas"

$body += h2 "Fe Tumas - @fetumas"
$body += bullet "Nicho: Lifestyle & Autoestima, 25-35 anos | Estilo: Minimalista, tons neutros, luz natural"
$body += bullet "Recebe: Kit Eterno + Pulseira Thainae | Prazo envio: 09/05"
$body += bullet "Entregaveis: 1 Reels historia real + 2 Stories unboxing + Live 04/06 como convidada"
$body += bullet "Briefing: Contar como o apoio do marido no inicio da carreira virou um capitulo lindo. Nao roteirizar - ela tem voz propria. Pedido: Conte como foi. Nao venda, relate."
$body += bullet "Prazo publicacao: Reels 25 a 31/05 - Stories na live 04/06"
$body += bullet "Marcacao obrigatoria: @piuka + #OBrilhoDaNossaHistoria"
$body += blank

$body += h2 "Rachel Apolino - @rachelapolino"
$body += bullet "Nicho: Viagem e Casais, 20-30 anos | Estilo: Aventura, cores vibrantes, dinamico"
$body += bullet "Recebe: Kit Paixao + Kit Conexao | Prazo envio: 09/05"
$body += bullet "Entregaveis: 1 Reels Get Ready With Us jantar de viagem + 1 Story carrossel"
$body += bullet "Briefing: Casal Piuka do mes. Foco em como o mix Paixao + Conexao espelha dois estilos que se complementam."
$body += bullet "Prazo publicacao: Reels 01 a 07/06"
$body += bullet "Marcacao obrigatoria: @piuka + #OBrilhoDaNossaHistoria"
$body += blank

$body += h2 "Ari Canovas - @aricanovas"
$body += bullet "Nicho: Moda High-End & Estilo, 30-45 anos | Estilo: Editorial, elegante, Clean Girl"
$body += bullet "Recebe: 3 Kits completos + Pulseira Thainae | Prazo envio: 09/05"
$body += bullet "Entregaveis: 1 Reels editorial + 2 Stories curadoria + Live 25/05 como convidada"
$body += bullet "Briefing: Apresentar kits como curadoria de estilo. Angulo amor-proprio: presentear a si mesma tambem e capitulo."
$body += bullet "Prazo publicacao: Reels ate 25/05 - Stories 25 a 31/05"
$body += bullet "Marcacao obrigatoria: @piuka + #OBrilhoDaNossaHistoria"
$body += blank

$body += h2 "Afiliadas"
$body += para "MISSAO POR FASE:" -bold
$body += bullet "Fase 1 (18-24/05): Stories O que eu escolheria - peca pessoal + teaser: Spoiler da colecao de Namorados amanhã!"
$body += bullet "Fase 2 (25/05-05/06): Reels O Segredo do Mix - montar os 3 kits, destacar brilho zirconia e perola Thainae"
$body += bullet "Fase 3 (06-10/06): Posts SOS Namorados - last call + cupom frete + facilidade kits prontos"
$body += blank
$body += para "COMPETICAO A Melhor Contadora de Historias (25/05 a 12/06):" -bold
$body += bullet "1 lugar: iPhone 15 Pro Max + R$ 1.000 em creditos Piuka"
$body += bullet "2 lugar: Day Spa + R$ 500 em creditos Piuka"
$body += bullet "3 lugar: Kit completo O Brilho da Nossa Historia"
$body += blank
$body += para "GRUPO WHATSAPP (disponibilizar ate 25/05):" -bold
$body += bullet "Pack criativos white label da sessao 05/05 (sem logo centralizada)"
$body += bullet "Scripts de abordagem para o parceiro/marido da cliente"
$body += bullet "Audios diarios da diretora (motivacao + contorno de objecao de preco)"
$body += bullet "Tabela de prazos de frete por regiao do Brasil (atualizada semanalmente)"

$body += pb

# 2.5 BRIEFING VISUAL
$body += h1 "2.5 - Briefing Visual (Isabelle)"
$body += para "PALETA DA CAMPANHA: Dourado #C8A45A | Off-white #FAF7F2 | Preto elegante #1A1A1A"
$body += para "TIPOGRAFIA: headline com toque manuscrito/script | REFERENCIA: Rouje / Sezane"
$body += blank

$body += h2 "ARTE 1 - Banner Feed Lancamento"
$body += bullet "Formato: Feed Instagram + Meta Ads | Dimensoes: 1080x1080px"
$body += bullet "Data entrega: 22/05 | Canal: Instagram feed + Ads"
$body += bullet "Headline: O Brilho da Nossa Historia"
$body += bullet "Copy de apoio: Kit Paixao - Kit Conexao - Kit Eterno"
$body += bullet "CTA: Disponíveis a partir de 25/05"
$body += bullet "Produto em destaque: Pulseira Thainae sobre embalagem aberta (foto disponível: 12/05)"
$body += bullet "Hierarquia: Produto 60% da tela > Headline > Data + subtexto dos kits"
$body += bullet "NAO PODE: fundo branco clinico | fontes sans-serif genericas | mais de 2 elementos texto na area focal"
$body += blank

$body += h2 "ARTE 2 - Stories Teaser (3 frames)"
$body += bullet "Formato: Stories Instagram | Dimensoes: 1080x1920px | Data entrega: 16/05"
$body += bullet "Frame 1: Algo brilha no horizonte... - fundo escuro, detalhe macro de corrente, sem revelar produto"
$body += bullet "Frame 2: 18.05 em tipografia grande, fundo off-white, sem produto revelado"
$body += bullet "Frame 3: Logo Piuka + Em breve + link de wishlist"
$body += bullet "NAO PODE: revelar os kits antes do dia 25/05"
$body += blank

$body += h2 "ARTE 3 - Carrossel de Kits (4 slides)"
$body += bullet "Formato: Carrossel Feed Instagram | Dimensoes: 1080x1080px cada | Data entrega: 23/05"
$body += bullet "Slide 1 (capa): Tres historias. Qual e a sua? - foto dos 3 kits juntos"
$body += bullet "Slide 2: Kit Paixao - R$259 + Pulseira Thainae de brinde"
$body += bullet "Slide 3: Kit Conexao - R$198 + brinde"
$body += bullet "Slide 4: Kit Eterno - R$310 + brinde + CTA Link na bio"
$body += bullet "NAO PODE: usar PROMOCAO ou qualquer elemento visual de oferta agressiva"
$body += blank

$body += h2 "ARTE 4 - Banner Email Hero"
$body += bullet "Formato: Banner e-mail hero | Dimensoes: 600x400px | Data entrega: 23/05"
$body += bullet "Headline script: O Brilho da Nossa Historia (tipografia com toque manuscrito)"
$body += bullet "Subtitulo: Por Marina Torres"
$body += bullet "Produto: Kit Eterno ou Pulseira Thainae em destaque"
$body += bullet "NAO PODE: texto menor que 14px (leitura em mobile)"
$body += blank

$body += h2 "ARTE 5 - Story Live 25/05 (Marina Torres)"
$body += bullet "Formato: Story Instagram | Dimensoes: 1080x1920px | Data entrega: 22/05"
$body += bullet "Conteudo: Live de Lancamento + Ari Canovas x Piuka + Hoje as [HORARIO] + @piuka"
$body += bullet "Slot para foto da Marina Torres (Pietra insere a foto)"
$body += bullet "ATENCAO Isabelle: confirmar horario com Pietra antes de finalizar"

$body += pb

# 2.5B BRIEFING FOTOGRAFICO
$body += h1 "2.5B - Briefing Fotografico"

$body += h2 "Sessao 1 - Lifestyle Golden Hour Intimista (05/05)"
$body += bullet "Data: 05/05/2026 | Duracao: manha inteira (~4h)"
$body += bullet "Conceito: luz de recorte vinda de tras, sombras suaves, grao leve de foto de filme"
$body += bullet "Referencia: Rouje / Sezane - moodboard Pinterest ja entregue ao fotografo"
$body += bullet "Modelos: Casal heterossexual + casal feminino + hand model"
$body += bullet "Inclusividade: diversidade de tons de pele (retinta, parda, clara) - fotos decapitadas"
$body += bullet "Produtos: Kits Conexao e Eterno montados + Pulseira Thainae + colares avulsos + embalagem + cartao PDV"
$body += bullet "ATENCAO: Kit Paixao NAO fotografar nessa sessao - still interno 06/05"
$body += blank

$body += h2 "Sessao 2 - Still Kit Paixao Interno (06/05)"
$body += bullet "Data: 06/05/2026 | Duracao: 2h | Responsavel: interno"
$body += bullet "Produtos: Kit Paixao completo + Kit Paixao com Pulseira Thainae ao lado"
$body += bullet "Estilo: produto isolado sobre marmore ou linho, consistente com sessao 1"
$body += blank

$body += h2 "Cronograma de Aprovacao"
$body += tbl @(
    (tr @((tc "Etapa" 2800 -header), (tc "Data" 1400 -header), (tc "Responsavel" 2000 -header)) -header),
    (tr @((tc "Sessao de foto" 2800), (tc "05/05" 1400), (tc "Fotografo + time" 2000))),
    (tr @((tc "Entrega contato (fotos brutas)" 2800), (tc "07/05" 1400), (tc "Fotografo" 2000))),
    (tr @((tc "Selecao Piuka" 2800), (tc "08/05" 1400), (tc "Ana/Marcela" 2000))),
    (tr @((tc "Fotos tratadas em alta res" 2800), (tc "12/05 - DEADLINE" 1400), (tc "Fotografo" 2000))),
    (tr @((tc "Montagem de pecas graficas" 2800), (tc "13 a 17/05" 1400), (tc "Isabelle" 2000)))
) 6200

$body += pb

# 2.5C PACOTE DE IMAGENS
$body += h1 "2.5C - Pacote de Imagens (skill /imagens-piuka)"
$body += para "Total: 12 pecas | Chamar /imagens-piuka apontando para a peca desejada"
$body += blank
$body += tbl @(
    (tr @((tc "#" 400 -header), (tc "Peca" 2400 -header), (tc "Familia" 1600 -header), (tc "Influencer" 1400 -header), (tc "Formato" 800 -header), (tc "Entrega" 900 -header)) -header),
    (tr @((tc "1" 400), (tc "Triptych Fe Tumas - Kit Eterno" 2400), (tc "collab_panels (3)" 1600), (tc "@fetumas" 1400), (tc "1:1" 800), (tc "22/05" 900))),
    (tr @((tc "2" 400), (tc "Editorial Fe Tumas - impacto Pinterest" 2400), (tc "single_1x1_editorial" 1600), (tc "@fetumas" 1400), (tc "1:1" 800), (tc "22/05" 900))),
    (tr @((tc "3" 400), (tc "Story Rachel Apolino - GRWM jantar" 2400), (tc "story_9x16" 1600), (tc "@rachelapolino" 1400), (tc "9:16" 800), (tc "28/05" 900))),
    (tr @((tc "4" 400), (tc "Editorial Rachel Apolino - maos + joias" 2400), (tc "single_1x1_editorial" 1600), (tc "@rachelapolino" 1400), (tc "1:1" 800), (tc "28/05" 900))),
    (tr @((tc "5" 400), (tc "Story Ari Canovas - curadoria" 2400), (tc "story_9x16" 1600), (tc "@aricanovas" 1400), (tc "9:16" 800), (tc "22/05" 900))),
    (tr @((tc "6" 400), (tc "Triptych Ari Canovas - 3 Kits" 2400), (tc "collab_panels (3)" 1600), (tc "@aricanovas" 1400), (tc "1:1" 800), (tc "22/05" 900))),
    (tr @((tc "7" 400), (tc "Flatlay Kit Paixao - marmore" 2400), (tc "produto_flatlay_4x5" 1600), (tc "-" 1400), (tc "4:5" 800), (tc "14/05" 900))),
    (tr @((tc "8" 400), (tc "Flatlay Kit Conexao - linho" 2400), (tc "produto_flatlay_4x5" 1600), (tc "-" 1400), (tc "4:5" 800), (tc "14/05" 900))),
    (tr @((tc "9" 400), (tc "Flatlay Kit Eterno - pedra natural" 2400), (tc "produto_flatlay_4x5" 1600), (tc "-" 1400), (tc "4:5" 800), (tc "14/05" 900))),
    (tr @((tc "10" 400), (tc "Hero Shot Pulseira Thainae" 2400), (tc "produto_flatlay_4x5" 1600), (tc "-" 1400), (tc "4:5" 800), (tc "14/05" 900))),
    (tr @((tc "11" 400), (tc "Story Live Lancamento - Ari 25/05" 2400), (tc "story_9x16" 1600), (tc "@aricanovas" 1400), (tc "9:16" 800), (tc "22/05" 900))),
    (tr @((tc "12" 400), (tc "Story Live Last Call - Fe 04/06" 2400), (tc "story_9x16" 1600), (tc "@fetumas" 1400), (tc "9:16" 800), (tc "30/05" 900)))
) 7500
$body += blank

$body += h2 "Instrucoes para /imagens-piuka"
$body += bullet "Ana envia no chat as fotos da influencer + PNG da logo Piuka antes de gerar cada peca"
$body += bullet "A skill categoriza como imagem_ref_1, imagem_ref_2, logo_piuka e gera JSON + prompt Freepik"
$body += bullet "No Freepik: anexar as mesmas fotos como imagens de referencia antes de rodar o prompt"

$body += pb

# 2.6 SUB-DOCS
$body += h1 "2.6 - Sub-Docs por Pessoa"

$body += h2 "AMANDA - Social Media"
$body += para "Campanha: O Brilho da Nossa Historia | Periodo: 18/05 a 12/06/2026"
$body += blank
$body += tbl @(
    (tr @((tc "Data" 1000 -header), (tc "Tipo" 1000 -header), (tc "Canal" 1200 -header), (tc "Copy / Direcao" 3200 -header), (tc "Visual" 2160 -header)) -header),
    (tr @((tc "18/05 Seg" 1000), (tc "CAMPANHA" 1000), (tc "Feed+Stories" 1200), (tc "Algo brilha no horizonte... + Spoiler amanha" 3200), (tc "Macro detalhe corrente dourada, fundo escuro" 2160))),
    (tr @((tc "19/05 Ter" 1000), (tc "CAMPANHA" 1000), (tc "Stories" 1200), (tc "O conceito da campanha revelado" 3200), (tc "Off-white + data 25.05 tipografia grande" 2160))),
    (tr @((tc "20/05 Qua" 1000), (tc "CAMPANHA" 1000), (tc "Feed" 1200), (tc "Como eternizar um momento? (Reels)" 3200), (tc "Close maos com semijoia, golden hour" 2160))),
    (tr @((tc "21/05 Qui" 1000), (tc "CAMPANHA" 1000), (tc "Feed" 1200), (tc "Eles chegaram. 3 mixes. 3 historias. (Carrossel)" 3200), (tc "Kits revelados - arte Isabelle" 2160))),
    (tr @((tc "22/05 Sex" 1000), (tc "CAMPANHA" 1000), (tc "Stories" 1200), (tc "O que voce gostaria de ganhar? (poll/wishlist)" 3200), (tc "Fundo clean, tipografia elegante" 2160))),
    (tr @((tc "23/05 Sab" 1000), (tc "CAMPANHA" 1000), (tc "Feed" 1200), (tc "A Pulseira Thainae esta chegando" 3200), (tc "Foto hero Thainae sobre embalagem" 2160))),
    (tr @((tc "24/05 Dom" 1000), (tc "CAMPANHA" 1000), (tc "Stories" 1200), (tc "Faltam 24h. Prepara o coracao (e o carrinho)." 3200), (tc "Sticker countdown + arte Isabelle" 2160))),
    (tr @((tc "25/05 Seg" 1000), (tc "LANCAMENTO" 1000), (tc "Feed+Stories+Live" 1200), (tc "Copy Opcao A (feed) | Live Marina Torres" 3200), (tc "Arte lancamento Isabelle" 2160))),
    (tr @((tc "26/05 Ter" 1000), (tc "CAMPANHA" 1000), (tc "Stories" 1200), (tc "Repostar stories da Marina Torres" 3200), (tc "Manter estetica original da Marina" 2160))),
    (tr @((tc "27/05 Qua" 1000), (tc "CAMPANHA" 1000), (tc "Feed" 1200), (tc "Kit Paixao: pra quem nao abre mao do brilho (Reels)" 3200), (tc "Video produto em movimento, luz lateral" 2160))),
    (tr @((tc "28/05 Qui" 1000), (tc "CAMPANHA" 1000), (tc "Stories" 1200), (tc "3 kits, 3 estilos. Qual e o dela?" 3200), (tc "Comparativo 3 kits - arte Isabelle" 2160))),
    (tr @((tc "29/05 Sex" 1000), (tc "CAMPANHA" 1000), (tc "Feed" 1200), (tc "Detalhe Pulseira Thainae - o brinde que vai junto" 3200), (tc "Macro foto Thainae sobre cetim/marmore" 2160))),
    (tr @((tc "30/05 Sab" 1000), (tc "SAZONAL" 1000), (tc "Feed" 1200), (tc "Dica styling: como montar look com semijoias" 3200), (tc "Modelo, luz natural, pecas avulsas classicas" 2160))),
    (tr @((tc "31/05 Dom" 1000), (tc "SAZONAL" 1000), (tc "Stories" 1200), (tc "Qual estilo e mais voce? (poll)" 3200), (tc "Arte simples on-brand, fundo off-white" 2160))),
    (tr @((tc "01/06 Seg" 1000), (tc "CAMPANHA" 1000), (tc "Feed+Stories" 1200), (tc "Junho chegou. Faltam 11 dias." 3200), (tc "Arte contagem regressiva - Isabelle" 2160))),
    (tr @((tc "02/06 Ter" 1000), (tc "CAMPANHA" 1000), (tc "Feed" 1200), (tc "Amplificar conteudo Gabi & Leo (Kit Paixao)" 3200), (tc "Conteudo original deles" 2160))),
    (tr @((tc "03/06 Qua" 1000), (tc "CAMPANHA" 1000), (tc "Feed" 1200), (tc "Kit Conexao: o amor nos detalhes discretos" 3200), (tc "Flatlay Kit Conexao em linho" 2160))),
    (tr @((tc "04/06 Qui" 1000), (tc "LIVE" 1000), (tc "Feed+Stories+Live" 1200), (tc "Estamos ao vivo! Condicoes especiais agora" 3200), (tc "Arte Story live Bia Viana - Isabelle" 2160))),
    (tr @((tc "05/06 Sex" 1000), (tc "CAMPANHA" 1000), (tc "Feed" 1200), (tc "Depoimentos reais - Quem ja recebeu nao parou" 3200), (tc "Screenshots clientes + fotos kits" 2160))),
    (tr @((tc "06/06 Sab" 1000), (tc "CAMPANHA" 1000), (tc "Feed" 1200), (tc "Kit Eterno: o classico que nunca passa" 3200), (tc "Flatlay Kit Eterno pedra natural" 2160))),
    (tr @((tc "07/06 Dom" 1000), (tc "CAMPANHA" 1000), (tc "Stories" 1200), (tc "O favorito da Marina - Kit Eterno" 3200), (tc "Conteudo original Marina" 2160))),
    (tr @((tc "08/06 Seg" 1000), (tc "CAMPANHA" 1000), (tc "Feed+Stories" 1200), (tc "Ultimo prazo de frete com entrega ate dia 12" 3200), (tc "Arte urgencia sofisticada - sem vermelho" 2160))),
    (tr @((tc "09/06 Ter" 1000), (tc "CAMPANHA" 1000), (tc "Feed" 1200), (tc "Amplificar historia real da Bia" 3200), (tc "Conteudo original Bia" 2160))),
    (tr @((tc "10/06 Qua" 1000), (tc "CAMPANHA" 1000), (tc "Feed+Stories" 1200), (tc "Ultimas unidades com a Pulseira Thainae" 3200), (tc "Arte escassez sofisticada - Isabelle" 2160))),
    (tr @((tc "11/06 Qui" 1000), (tc "CAMPANHA" 1000), (tc "Stories" 1200), (tc "Amanha e o dia. Retirada na loja ate 18h." 3200), (tc "Arte com mapa/endereco da loja" 2160))),
    (tr @((tc "12/06 Sex" 1000), (tc "DIA D" 1000), (tc "Feed+Stories" 1200), (tc "Feliz Dia dos Namorados + voucher digital" 3200), (tc "Arte comemorativa elegante, floral dourado" 2160)))
) 9560
$body += blank
$body += para "OBSERVACOES AMANDA:" -bold
$body += bullet "Nenhum post usa presente perfeito - substituir por A escolha que diz tudo"
$body += bullet "Representacao plural: priorizar diversidade de casais e tons de pele no UGC"
$body += bullet "Lives 25/05 e 04/06: Amanda apoia com stories de aviso nas 3h anteriores"
$body += bullet "Hashtag obrigatoria em todos os posts: #OBrilhoDaNossaHistoria"
$body += bullet "Dias SAZONAIS (30/05 e 31/05): styling e poll - nao empurrar venda"
$body += blank

$body += h2 "ISABELLE - Designer"
$body += tbl @(
    (tr @((tc "Arte" 2800 -header), (tc "Data Limite" 1200 -header), (tc "Canal" 1200 -header), (tc "Observacao" 3520 -header)) -header),
    (tr @((tc "Stories Teaser (3 frames)" 2800), (tc "16/05" 1200), (tc "Stories" 1200), (tc "URGENTE - teaser comeca 18/05" 3520))),
    (tr @((tc "Banner Feed Lancamento" 2800), (tc "22/05" 1200), (tc "Feed + Ads" 1200), (tc "3 dias antes do lancamento" 3520))),
    (tr @((tc "Story Live Marina 25/05" 2800), (tc "22/05" 1200), (tc "Stories" 1200), (tc "Confirmar horario com Pietra antes de finalizar" 3520))),
    (tr @((tc "Carrossel 3 Kits (4 slides)" 2800), (tc "23/05" 1200), (tc "Feed" 1200), (tc "Publicacao dia 21/05" 3520))),
    (tr @((tc "Banner Email Hero" 2800), (tc "23/05" 1200), (tc "Email" 1200), (tc "Joy precisa para agendar email 9" 3520))),
    (tr @((tc "Story Live Bia 04/06" 2800), (tc "30/05" 1200), (tc "Stories" 1200), (tc "Live em 04/06" 3520))),
    (tr @((tc "Arte Last Call Frete" 2800), (tc "06/06" 1200), (tc "Feed+Stories" 1200), (tc "Publicacao 08/06" 3520))),
    (tr @((tc "Arte Dia D (12/06)" 2800), (tc "10/06" 1200), (tc "Feed+Stories" 1200), (tc "Post especial comemorativo" 3520)))
) 8720
$body += blank

$body += h2 "PIETRA - Lives + Influencers + Afiliadas"
$body += tbl @(
    (tr @((tc "Data" 1200 -header), (tc "Plataforma" 1500 -header), (tc "Produto" 2800 -header), (tc "Duracao" 900 -header), (tc "Convidada" 2360 -header)) -header),
    (tr @((tc "25/05 Seg" 1200), (tc "Instagram Live" 1500), (tc "Kits de Namorados - todos + Pulseira Thainae" 2800), (tc "45 min" 900), (tc "Marina Torres" 2360))),
    (tr @((tc "04/06 Qui" 1200), (tc "Instagram Live" 1500), (tc "Last Call - prazos + Kit Eterno" 2800), (tc "30 min" 900), (tc "Bia Viana" 2360)))
) 8760
$body += blank
$body += bullet "Roteiros completos na secao 2.4 - preencher [ESPACO PIETRA] antes de cada live"
$body += bullet "Marina Torres: call de alinhamento ate 08/05 | kit enviado ate 09/05"
$body += bullet "Bia Viana: contato ate 10/05 | kit enviado ate 09/05"
$body += bullet "Gabi & Leo: direcional escrito ate 12/05 | kit enviado ate 09/05"
$body += bullet "Afiliadas: enviar mensagem no grupo WhatsApp dia 25/05 (copy na secao 2.4B)"
$body += blank

$body += h2 "JOY - CRM"
$body += para "SEGMENTACAO:" -bold
$body += bullet "Segmento A - Clientes ativas (compra 90 dias): copy mais direta, focar no brinde como diferencial"
$body += bullet "Segmento B - Clientes inativas (90+ dias): reativacao + brinde como gancho exclusivo"
$body += bullet "Segmento C - Leads sem compra: apresentar curadoria Piuka + brinde como prova de valor"
$body += blank
$body += para "CADENCIA BASE:" -bold
$body += bullet "25/05: Email 9 (Lancamento) - todos os segmentos"
$body += bullet "28/05: Email 10 (Foco Thainae) - quem nao abriu o Email 9"
$body += bullet "04/06: Email 14 (Live Day) - segmentos A e B"
$body += bullet "08/06: Email 18 (Last Call Frete) - todos os segmentos"
$body += bullet "10/06: Email 20 (Last Call Thainae) - quem abriu mas nao comprou"
$body += bullet "12/06: Email 22 (Dia D) - toda a base"
$body += blank
$body += para "NAO DUPLICAR: automacoes de carrinho abandonado, pos-venda 30/50 e CRM bonus ja rodam sozinhas." -bold
$body += blank

$body += h2 "MARCELA - Assistente"
$body += tbl @(
    (tr @((tc "Task" 3200 -header), (tc "Data Limite" 1200 -header), (tc "Responsavel" 1600 -header), (tc "Escalar para Ana se:" 2760 -header)) -header),
    (tr @((tc "Confirmar sessao de foto 05/05 com fotografo" 3200), (tc "30/04" 1200), (tc "Marcela" 1600), (tc "Fotografo nao confirmar ate 30/04" 2760))),
    (tr @((tc "Garantir pasta de entrega das fotos tratadas" 3200), (tc "06/05" 1200), (tc "Marcela" 1600), (tc "Pasta nao definida ate 06/05" 2760))),
    (tr @((tc "Enviar kits para as 3 influencers" 3200), (tc "09/05" 1200), (tc "Marcela+Pietra" 1600), (tc "Kit nao confirmado recebido ate 13/05" 2760))),

    (tr @((tc "Confirmar entrega porta-joias (brinde fornecedor)" 3200), (tc "15/05" 1200), (tc "Marcela" 1600), (tc "Atraso confirmado - acionar ate 12/05" 2760))),
    (tr @((tc "Montar briefing calcigrafra PDV 10-12/06" 3200), (tc "01/06" 1200), (tc "Marcela" 1600), (tc "Calcigrafa nao encontrada ate 01/06" 2760))),
    (tr @((tc "Confirmar embalagem veludo na loja fisica" 3200), (tc "08/06" 1200), (tc "Marcela" 1600), (tc "Nao chegou ate 05/06" 2760))),
    (tr @((tc "Confirmar estoque kits na loja antes do lancamento" 3200), (tc "24/05" 1200), (tc "Marcela" 1600), (tc "Risco de falta de estoque ANTES de publicar" 2760)))
) 8760

$body += pb

# 2.7 TRELLO
$body += h1 "2.7 - Tasks para o Trello"
$body += para "Todos os cards vao para a lista: Campanhas do Mes"
$body += blank

$cards = @(
    @("Sessao de Foto 05/05 - Golden Hour Intimista", "Marcela", "30/04", "Confirmar com o fotografo horario, local, lista de produtos e modelos. Se fotografo nao confirmar ate 30/04 - escalar para Ana."),
    @("Envio de Kits para Influencers (Fe, Rachel, Ari)", "Marcela + Pietra", "09/05", "Embalar e enviar Kit Eterno (Fe Tumas), Kit Paixao+Conexao (Rachel Apolino), 3 Kits (Ari Canovas) + Pulseira Thainae. Confirmar rastreio enviado para cada influencer."),
    @("Fotos tratadas entregues - Deadline Isabelle", "Marcela (cobrar fotografo)", "12/05", "Garantir entrega fotos tratadas em alta res. Timeline: contato bruto 07/05 > selecao 08/05 > tratado 12/05."),
    @("Artes do Teaser - Stories 3 frames (Isabelle)", "Isabelle", "16/05", "Criar stories de teaser conforme briefing visual arte 2. Entregar 3 frames 1080x1920px editavel + exportado."),
    @("Artes de Lancamento - Feed + Email + Story Live Marina (Isabelle)", "Isabelle", "22/05", "Artes 1, 3, 4, 5 do briefing visual. Story live Marina: confirmar horario com Pietra antes de finalizar."),
    @("E-mails 1 a 8 agendados no RevSend (Joy)", "Joy", "17/05", "Agendar os 8 emails de aquecimento (18 a 24/05) no RevSend. Confirmar agendamento com previa dos assuntos."),
    @("Pack White Label + Scripts para Afiliadas (Pietra)", "Pietra", "24/05", "Selecionar e enviar no grupo WhatsApp o pack de criativos white label + scripts + tabela de frete."),
    @("Live de Lancamento 25/05 - Marina Torres (Pietra)", "Pietra", "25/05", "Conduzir live conforme roteiro secao 2.4 Live 1. Confirmar com Marina horario e dinamica."),
    @("E-mails 9 a 22 agendados no RevSend (Joy)", "Joy", "24/05", "Agendar emails 9 a 22. Emails com influencer: aguardar foto aprovada antes de finalizar HTML."),,
    @("Calcigrafa no PDV 10-12/06 (Marcela)", "Marcela", "01/06", "Contratar calcigrafa para escrever cartoes personalizados nos dias 10, 11 e 12/06."),
    @("Live Last Call 04/06 - Bia Viana (Pietra)", "Pietra", "04/06", "Conduzir live conforme roteiro secao 2.4 Live 2. Levar tabela de prazos de frete por regiao atualizada.")
)

foreach ($card in $cards) {
    $body += para "$($card[0])" -bold -color "1A252F"
    $body += para "Responsavel: $($card[1]) | Data Limite: $($card[2])"
    $body += para "$($card[3])"
    $body += blank
}

$body += pb

# 2.8 JSON
$body += h1 "2.8 - JSON Consolidado"
$body += para "JSON estruturado para registro e uso em integracoes futuras."
$body += blank

$jsonText = @'
{
  "mes": "junho_2026",
  "campanha": "O Brilho da Nossa Historia",
  "periodo": { "inicio": "2026-05-18", "fim": "2026-06-12" },
  "kits": [
    { "nome": "Kit Paixao", "preco": 259 },
    { "nome": "Kit Conexao", "preco": 198 },
    { "nome": "Kit Eterno", "preco": 310 }
  ],
  "brinde": "Pulseira Thainae Perolas 18k - edicao limitada",
  "tom": "60% emocional + 40% oferta pelo brinde",
  "canais": ["Instagram","TikTok","WhatsApp VIP","Email","Meta Ads","Google Shopping","Live","Loja fisica"],
  "volume_emails": 22,
  "verba": { "meta_ads": "45%", "influencers": "35%", "organico_crm": "20%" },
  "lives": [
    { "data": "2026-05-25", "convidada": "Ari Canovas (@aricanovas)", "duracao_min": 45 },
    { "data": "2026-06-04", "convidada": "Fe Tumas (@fetumas)", "duracao_min": 30 }
  ],
  "influencers": [
    { "nome": "Fe Tumas", "instagram": "@fetumas", "recebe": "Kit Eterno + Thainae" },
    { "nome": "Rachel Apolino", "instagram": "@rachelapolino", "recebe": "Kit Paixao + Conexao" },
    { "nome": "Ari Canovas", "instagram": "@aricanovas", "recebe": "3 Kits + Thainae" }
  ],
  "afiliadas": {
    "competicao": true,
    "periodo": "2026-05-25 a 2026-06-12",
    "premios": ["iPhone 15 Pro Max + R$1k creditos","Day Spa + R$500 creditos","Kit colecao completa"]
  },
  "pacote_imagens": 12,
  "trello_cards": 11
}
'@

# Escrever JSON como paragrafos de texto monoespaçado
$jsonLines = $jsonText -split "`n"
foreach ($line in $jsonLines) {
    if ($line.Trim() -ne "") {
        $escaped = xe $line
        $body += @"
<w:p><w:pPr><w:spacing w:after="0"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Courier New" w:hAnsi="Courier New"/><w:sz w:val="18"/><w:szCs w:val="18"/></w:rPr><w:t xml:space="preserve">$escaped</w:t></w:r></w:p>
"@
    } else {
        $body += '<w:p><w:pPr><w:spacing w:after="0"/></w:pPr></w:p>'
    }
}

# ============================================================
# MONTAR XML DO DOCUMENTO
# ============================================================

$nsW = 'xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:cx="http://schemas.microsoft.com/office/drawing/2014/chartex" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:aink="http://schemas.microsoft.com/office/drawing/2016/ink" xmlns:am3d="http://schemas.microsoft.com/office/drawing/2017/model3d" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:w16cex="http://schemas.microsoft.com/office/word/2018/wordml/cex" xmlns:w16cid="http://schemas.microsoft.com/office/word/2016/wordml/cid" xmlns:w16="http://schemas.microsoft.com/office/word/2018/wordml" xmlns:w16sdtdh="http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash" xmlns:w16se="http://schemas.microsoft.com/office/word/2015/wordml/symex" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape"'

$documentXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document $nsW mc:Ignorable="w14 w15 w16se w16cid w16 w16cex w16sdtdh wp14">
<w:body>
$($body -join "`n")
<w:sectPr>
  <w:pgSz w:w="11906" w:h="16838"/>
  <w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="709" w:footer="709" w:gutter="0"/>
</w:sectPr>
</w:body>
</w:document>
"@

$stylesXml = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
          xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml"
          mc:Ignorable="w14" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>
        <w:sz w:val="22"/>
        <w:szCs w:val="22"/>
        <w:lang w:val="pt-BR"/>
      </w:rPr>
    </w:rPrDefault>
    <w:pPrDefault>
      <w:pPr>
        <w:spacing w:after="120"/>
      </w:pPr>
    </w:pPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="22"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="Heading 1"/>
    <w:basedOn w:val="Normal"/>
    <w:next w:val="Normal"/>
    <w:pPr>
      <w:outlineLvl w:val="0"/>
      <w:spacing w:before="480" w:after="120"/>
      <w:pBdr>
        <w:bottom w:val="single" w:sz="6" w:space="1" w:color="C8A45A"/>
      </w:pBdr>
    </w:pPr>
    <w:rPr>
      <w:b/><w:bCs/>
      <w:rFonts w:ascii="Arial" w:hAnsi="Arial"/>
      <w:sz w:val="36"/>
      <w:szCs w:val="36"/>
      <w:color w:val="1A252F"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="Heading 2"/>
    <w:basedOn w:val="Normal"/>
    <w:next w:val="Normal"/>
    <w:pPr>
      <w:outlineLvl w:val="1"/>
      <w:spacing w:before="360" w:after="80"/>
    </w:pPr>
    <w:rPr>
      <w:b/><w:bCs/>
      <w:rFonts w:ascii="Arial" w:hAnsi="Arial"/>
      <w:sz w:val="28"/>
      <w:szCs w:val="28"/>
      <w:color w:val="2C3E50"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading3">
    <w:name w:val="Heading 3"/>
    <w:basedOn w:val="Normal"/>
    <w:next w:val="Normal"/>
    <w:pPr>
      <w:outlineLvl w:val="2"/>
      <w:spacing w:before="240" w:after="60"/>
    </w:pPr>
    <w:rPr>
      <w:b/><w:bCs/>
      <w:rFonts w:ascii="Arial" w:hAnsi="Arial"/>
      <w:sz w:val="24"/>
      <w:szCs w:val="24"/>
      <w:color w:val="C8A45A"/>
    </w:rPr>
  </w:style>
</w:styles>
'@

$numberingXml = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:abstractNum w:abstractNumId="0">
    <w:lvl w:ilvl="0">
      <w:start w:val="1"/>
      <w:numFmt w:val="bullet"/>
      <w:lvlText w:val="&#x2022;"/>
      <w:lvlJc w:val="left"/>
      <w:pPr>
        <w:ind w:left="720" w:hanging="360"/>
      </w:pPr>
      <w:rPr>
        <w:rFonts w:ascii="Symbol" w:hAnsi="Symbol" w:hint="default"/>
      </w:rPr>
    </w:lvl>
  </w:abstractNum>
  <w:num w:numId="1">
    <w:abstractNumId w:val="0"/>
  </w:num>
</w:numbering>
'@

$settingsXml = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:defaultTabStop w:val="720"/>
  <w:compat>
    <w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/>
  </w:compat>
</w:settings>
'@

$contentTypesXml = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
  <Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>
</Types>
'@

$relsXml = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>
'@

$wordRelsXml = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>
</Relationships>
'@

# ============================================================
# ESCREVER ARQUIVOS E EMPACOTAR
# ============================================================

$enc = [System.Text.Encoding]::UTF8

[System.IO.File]::WriteAllText("$tempDir\[Content_Types].xml", $contentTypesXml, $enc)
[System.IO.File]::WriteAllText("$tempDir\_rels\.rels", $relsXml, $enc)
[System.IO.File]::WriteAllText("$tempDir\word\document.xml", $documentXml, $enc)
[System.IO.File]::WriteAllText("$tempDir\word\styles.xml", $stylesXml, $enc)
[System.IO.File]::WriteAllText("$tempDir\word\numbering.xml", $numberingXml, $enc)
[System.IO.File]::WriteAllText("$tempDir\word\settings.xml", $settingsXml, $enc)
[System.IO.File]::WriteAllText("$tempDir\word\_rels\document.xml.rels", $wordRelsXml, $enc)

# Criar o ZIP (.docx)
if (Test-Path $outputPath) { Remove-Item $outputPath -Force }
[System.IO.Compression.ZipFile]::CreateFromDirectory($tempDir, $outputPath)

# Limpar temp
Remove-Item $tempDir -Recurse -Force

Write-Host "Documento criado com sucesso: $outputPath"
