const https = require('https');
const fs    = require('fs');
const path  = require('path');

const KEY     = process.env.TRELLO_KEY;
const TOKEN   = process.env.TRELLO_TOKEN;
const CARD_ID = process.env.TRELLO_CARD_ID || '6a1ef03d15e1a6a51aa9527d';

const filePath = 'C:/Users/ecommerceadm05/Desktop/imagens-teste/imagem-banner.webp';
const fileName = path.basename(filePath);
const fileData = fs.readFileSync(filePath);
const boundary = '----TrelloUpload' + Date.now();

const part1 = Buffer.from(
  `--${boundary}\r\nContent-Disposition: form-data; name="key"\r\n\r\n${KEY}\r\n` +
  `--${boundary}\r\nContent-Disposition: form-data; name="token"\r\n\r\n${TOKEN}\r\n` +
  `--${boundary}\r\nContent-Disposition: form-data; name="name"\r\n\r\n${fileName}\r\n` +
  `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${fileName}"\r\nContent-Type: image/webp\r\n\r\n`
);
const part2 = Buffer.from(`\r\n--${boundary}--\r\n`);
const body   = Buffer.concat([part1, fileData, part2]);

const options = {
  hostname: 'api.trello.com',
  path:     `/1/cards/${CARD_ID}/attachments`,
  method:   'POST',
  headers:  {
    'Content-Type':   `multipart/form-data; boundary=${boundary}`,
    'Content-Length': body.length,
  },
};

const req = https.request(options, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const r = JSON.parse(d);
    if (r.id) {
      console.log('Attachment ID:', r.id);
      console.log('URL:', r.url);
    } else {
      console.log('Resposta completa:', JSON.stringify(r, null, 2));
    }
  });
});
req.on('error', e => console.error('Erro:', e));
req.write(body);
req.end();
