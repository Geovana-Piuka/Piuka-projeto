# -*- coding: utf-8 -*-
import base64, os, tempfile

def b64(path):
    with open(path, 'rb') as f:
        return base64.b64encode(f.read()).decode('utf-8')

BASE = r'C:\Users\ecommerceadm05\Desktop\piuka-projeto-main\.claude\skills\briefing-influenciadoras\imagens-briefing-influenciadoras'

logo      = b64(os.path.join(BASE, 'LogoPiuka-removebg-preview.png'))
capa      = b64(os.path.join(BASE, 'PIUKA11105   (1).jpg'))
editorial = b64(os.path.join(BASE, 'IMG_1183.jpg'))
detalhe   = b64(os.path.join(BASE, 'brinco-cathy-coracao-zirconias-folheado-a-ouro-18k-6126312.webp'))
prod1     = b64(os.path.join(BASE, 'brinco-cathy-coracao-zirconias-folheado-a-ouro-18k-8084125-removebg-preview.png'))
prod2     = b64(os.path.join(BASE, 'pulseira-coracao-sofi-folheado-a-ouro-18k-5556942-removebg-preview.png'))

html = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Briefing conteudos | Ariane Canovas</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap');
    * {{ margin:0; padding:0; box-sizing:border-box; }}
    :root {{ --rosa:#e91e8c; --rosa-card:#f8e4f2; --texto:#1a1a1a; }}
    body {{ font-family:'Montserrat',sans-serif; color:var(--texto); background:white; }}
    .pagina-capa {{ width:794px; min-height:1123px; position:relative; overflow:hidden; page-break-after:always; background:#d4bfb8; display:flex; align-items:flex-end; }}
    .pagina {{ width:794px; min-height:1123px; padding:52px 56px 48px 56px; page-break-after:always; display:flex; flex-direction:column; background:white; }}
    .capa-foto {{ position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; }}
    .capa-overlay {{ position:relative; z-index:2; background:rgba(255,255,255,0.82); margin:0 60px 60px 60px; padding:24px 28px 20px 28px; border-radius:2px; width:calc(100% - 120px); }}
    .capa-titulo {{ font-size:32px; font-weight:900; line-height:1.15; color:var(--texto); margin-bottom:20px; }}
    .secao-titulo {{ font-size:30px; font-weight:900; color:var(--rosa); margin-bottom:12px; line-height:1; }}
    .secao-titulo::after {{ content:'_'; }}
    .secao-subtitulo {{ font-size:16px; font-weight:800; color:var(--rosa); margin-top:28px; margin-bottom:10px; }}
    .secao-subtitulo::after {{ content:'_'; }}
    .texto-intro {{ font-size:15px; line-height:1.7; text-align:justify; }}
    .imagens-grid {{ display:flex; justify-content:space-between; align-items:flex-start; gap:16px; margin:18px 0; }}
    .link-badge {{ position:absolute; bottom:8px; right:8px; font-size:9px; color:var(--rosa); font-weight:700; text-shadow:0 1px 3px rgba(255,255,255,0.9); }}
    .lista-produtos {{ list-style:disc; padding-left:16px; margin-top:6px; }}
    .lista-produtos li {{ font-size:14px; line-height:1.65; margin-bottom:8px; text-align:justify; }}
    .produto-nome {{ font-weight:800; }}
    .rodape-logo {{ margin-top:auto; padding-top:20px; }}
    .chamada-texto {{ font-size:15px; line-height:1.7; text-align:justify; margin-bottom:10px; }}
    .chamada-lista {{ list-style:disc; padding-left:16px; margin-bottom:20px; }}
    .chamada-lista li {{ font-size:14px; line-height:1.65; }}
    .destaque {{ color:var(--rosa); font-weight:800; }}
    .cards-grid {{ display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin:20px 0; }}
    .card {{ background:var(--rosa-card); border-radius:4px; padding:14px 12px; }}
    .card-label {{ font-size:13px; font-weight:800; color:var(--rosa); display:block; margin-bottom:8px; }}
    .card-valor {{ font-size:13px; font-weight:600; }}
    .card-link {{ font-size:12px; color:var(--rosa); text-decoration:underline; font-weight:600; }}
    .duvidas-bloco-topo {{ margin-top:24px; margin-bottom:16px; width:100%; }}
    .duvidas-titulo {{ font-size:32px; font-weight:900; color:var(--rosa); line-height:1.1; margin-bottom:12px; width:100%; }}
    .duvidas-texto {{ font-size:14px; line-height:1.65; margin-bottom:12px; width:100%; }}
    .duvidas-inline {{ display:flex; align-items:center; gap:16px; margin-bottom:0; }}
    .contato-linha {{ display:flex; align-items:center; gap:8px; font-size:14px; font-weight:600; }}
    .duvidas-foto-abs {{ position:absolute; bottom:0; right:0; width:380px; height:auto; object-fit:cover; border-radius:200px 0 0 0; display:block; }}
    @page {{ margin:0; size:A4; }}
    @media print {{ .pagina-capa, .pagina {{ page-break-after:always; }} }}
    @media screen {{ body {{ background:#e0e0e0; display:flex; flex-direction:column; align-items:center; padding:20px 0; gap:20px; }} .pagina-capa, .pagina {{ box-shadow:0 2px 12px rgba(0,0,0,0.15); }} }}
  </style>
</head>
<body>

<!-- PAGINA 1: CAPA -->
<div class="pagina-capa">
  <img class="capa-foto" src="data:image/jpeg;base64,{capa}">
  <div class="capa-overlay">
    <div class="capa-titulo">Briefing<br>conteudos |<br>Ariane Canovas</div>
    <img src="data:image/png;base64,{logo}" style="height:28px;object-fit:contain;" alt="Piuka">
  </div>
</div>

<!-- PAGINA 2: INTRODUCAO + SOBRE O MIX -->
<div class="pagina">
  <h1 class="secao-titulo">Introdu&#231;&#227;o</h1>
  <p class="texto-intro">Ari, que alegria ter voc&#234; aqui! Para essa campanha de junho, preparamos um mix que &#233; puro voc&#234;: pe&#231;as com formato de cora&#231;&#227;o, zirconias que brilham e aquele toque dourado que voc&#234; j&#225; sabe usar t&#227;o bem. Brincos delicados que enquadram o rosto com eleg&#226;ncia e pulseira que adiciona brilho no pulso sem pesar no look. Mal podemos esperar para ver como voc&#234; vai apresentar essa sele&#231;&#227;o ao seu p&#250;blico!</p>

  <div class="imagens-grid">
    <div style="flex:0 0 42%;display:flex;flex-direction:column;gap:12px;align-items:center;justify-content:center;">
      <img src="data:image/png;base64,{prod1}" style="width:80%;max-height:200px;object-fit:contain;background:transparent;">
      <img src="data:image/png;base64,{prod2}" style="width:80%;max-height:200px;object-fit:contain;background:transparent;">
    </div>
    <div style="flex:1;position:relative;">
      <img src="data:image/jpeg;base64,{editorial}" style="width:100%;height:420px;object-fit:cover;object-position:center 20%;border-radius:24px;display:block;">
      <span class="link-badge">clique para acessar o link.</span>
    </div>
  </div>

  <h2 class="secao-subtitulo">Sobre o Mix</h2>
  <ul class="lista-produtos">
    <li><span class="produto-nome">Brinco Cathy Cora&#231;&#227;o com Zirconias Folheado a Ouro 18k:</span> Um brinco que une delicadeza e brilho no formato mais amado de todos. O cora&#231;&#227;o dourado com zirconias na base traz aquele toque rom&#226;ntico e sofisticado que transforma qualquer look do dia a dia em algo especial.</li>
    <li><span class="produto-nome">Pulseira Cora&#231;&#227;o Sofi Folheada a Ouro 18k:</span> Uma corrente de cora&#231;&#245;es com pingente central cravejado de zirconias, leve e elegante no pulso. Perfeita para usar sozinha ou empilhada com outras pe&#231;as, ela &#233; a defini&#231;&#227;o de charme sem esfor&#231;o.</li>
  </ul>

  <div class="rodape-logo">
    <img src="data:image/png;base64,{logo}" style="height:28px;object-fit:contain;" alt="Piuka">
  </div>
</div>

<!-- PAGINA 3: CHAMADA + DUVIDAS -->
<div class="pagina" style="position:relative;">
  <h2 class="secao-subtitulo">Chamada para o site</h2>
  <p class="chamada-texto">Ari, chegou a hora de apresentar essas pe&#231;as incr&#237;veis para o seu p&#250;blico! As novidades da Campanha Junho 2026 j&#225; est&#227;o no ar em <span class="destaque">piuka.com</span> e seus seguidores podem garantir as pe&#231;as com vantagens exclusivas pelo seu link e cupom personalizados. Lembre de refor&#231;ar os benef&#237;cios:</p>
  <ul class="chamada-lista">
    <li><strong>Seu Cupom: <span class="destaque">ARICANOVAS10</span></strong> (Garante 10% OFF em todo o site)</li>
    <li><strong>Cashback:</strong> <span class="destaque">15%</span> em todas as compras pelo site.</li>
    <li><strong>Frete Gr&#225;tis:</strong> Em compras acima de <span class="destaque">R$ 299,99</span>.</li>
    <li><strong>Qualidade Piuka:</strong> Semijoias banhadas a <span class="destaque">ouro 18k</span>, hipoalerg&#234;nicas e com a garantia que voc&#234; j&#225; confia.</li>
  </ul>

  <div class="cards-grid">
    <div class="card">
      <span class="card-label">cupom</span>
      <span class="card-valor">ARICANOVAS10</span>
    </div>
    <div class="card">
      <span class="card-label">benef&#237;cio</span>
      <span class="card-valor">10% OFF</span>
    </div>
    <div class="card">
      <span class="card-label">seu link</span>
      <span class="card-link">clique para acessar seu link.</span>
    </div>
  </div>

  <div class="duvidas-bloco-topo">
    <div class="duvidas-titulo">Ficou com alguma d&#250;vida?</div>
    <p class="duvidas-texto">Fique a vontade para entrar em contato conosco. Ser&#225; um prazer te ajudar!</p>
    <div class="duvidas-inline">
      <div class="contato-linha">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0;">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#1a1a1a"/>
        </svg>
        Marcela | (17) 99609-8668
      </div>
    </div>
  </div>

  <div style="margin-top:auto;">
    <img src="data:image/png;base64,{logo}" style="height:32px;object-fit:contain;" alt="Piuka">
  </div>

  <img src="data:image/jpeg;base64,{detalhe}" class="duvidas-foto-abs">
  <span style="position:absolute;bottom:8px;right:8px;font-size:11px;color:var(--rosa);font-weight:700;text-shadow:0 1px 3px rgba(255,255,255,0.9);">clique para acessar o link.</span>
</div>

</body>
</html>"""

output_dir = r'C:\Users\ecommerceadm05\Desktop\piuka-projeto-main\.claude\skills\briefing-influenciadoras\briefings-gerados'
os.makedirs(output_dir, exist_ok=True)
pdf_path = os.path.join(output_dir, 'briefing_ariane-canovas_junho-2026.pdf')

with tempfile.NamedTemporaryFile(mode='w', encoding='utf-8', suffix='.html', delete=False) as tmp:
    tmp.write(html)
    tmp_path = tmp.name

print(f'HTML temporario: {tmp_path}')

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.set_viewport_size({'width': 794, 'height': 1123})
    page.goto(f'file:///{tmp_path.replace(os.sep, "/")}', wait_until='networkidle')
    page.pdf(
        path=pdf_path,
        format='A4',
        print_background=True,
        margin={'top': '0', 'bottom': '0', 'left': '0', 'right': '0'}
    )
    browser.close()

os.unlink(tmp_path)
print(f'PDF gerado: {pdf_path}')
