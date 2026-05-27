#!/usr/bin/env node
/**
 * DES Solutions v3 — Local HTTPS Dev Server
 * ─────────────────────────────────────────
 * Run:          node server.js
 * Then open:    https://localhost:3443
 *
 * On first run, a self-signed certificate is auto-generated via OpenSSL.
 * Browser will show ONE security warning — click Advanced → Proceed.
 *
 * For a fully trusted cert (zero warnings), see README.md → mkcert setup.
 * ─────────────────────────────────────────
 */

const https  = require('https');
const http   = require('http');
const fs     = require('fs');
const path   = require('path');
const { execSync } = require('child_process');

const PORT      = 3443;
const HTTP_PORT = 3080;
const ROOT      = __dirname;
const SSL_DIR   = path.join(__dirname, '.ssl');
const CERT      = path.join(SSL_DIR, 'cert.pem');
const KEY       = path.join(SSL_DIR, 'key.pem');

const MIME = {
  '.html':  'text/html; charset=utf-8',
  '.css':   'text/css; charset=utf-8',
  '.js':    'application/javascript; charset=utf-8',
  '.json':  'application/json',
  '.svg':   'image/svg+xml',
  '.png':   'image/png',
  '.jpg':   'image/jpeg',
  '.jpeg':  'image/jpeg',
  '.webp':  'image/webp',
  '.ico':   'image/x-icon',
  '.woff':  'font/woff',
  '.woff2': 'font/woff2',
  '.ttf':   'font/ttf',
};

/* ── Auto-generate self-signed cert ── */
function ensureCert() {
  if (!fs.existsSync(SSL_DIR)) fs.mkdirSync(SSL_DIR, { recursive: true });
  if (fs.existsSync(CERT) && fs.existsSync(KEY)) return;
  console.log('\n🔐 Generating self-signed SSL certificate...');
  try {
    execSync(
      `openssl req -x509 -newkey rsa:4096 -keyout "${KEY}" -out "${CERT}" ` +
      `-days 365 -nodes -subj "/C=CA/ST=Quebec/L=Montreal/O=DES+Solutions/CN=localhost"`,
      { stdio: 'pipe' }
    );
    console.log('✅ Certificate created: .ssl/cert.pem\n');
  } catch {
    console.error('❌  OpenSSL not found. Please install OpenSSL or use mkcert (see README.md).');
    process.exit(1);
  }
}

/* ── Request handler ── */
function handler(req, res) {
  let urlPath = req.url.split('?')[0].split('#')[0];
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

  const filePath = path.normalize(path.join(ROOT, urlPath));

  // Prevent directory traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('403 Forbidden'); return;
  }

  const ext  = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Try /path/index.html
      const indexPath = path.join(filePath.replace(/\/$/, ''), 'index.html');
      fs.readFile(indexPath, (err2, data2) => {
        if (err2) {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(`<h2 style="font-family:sans-serif;padding:3rem">
            404 — Not Found<br><small style="color:#888">${urlPath}</small>
          </h2>`);
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
          res.end(data2);
        }
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': mime, 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    res.end(data);
  });
}

/* ── Start ── */
ensureCert();

const ssl = { key: fs.readFileSync(KEY), cert: fs.readFileSync(CERT) };

https.createServer(ssl, handler).listen(PORT, () => {
  const line = '─'.repeat(45);
  console.log(`
  ╔${line}╗
  ║   DES Solutions v3 — Local HTTPS Server          ║
  ╚${line}╝

  🔒  HTTPS  →  https://localhost:${PORT}
  🔁  HTTP   →  http://localhost:${HTTP_PORT}  (auto-redirects to HTTPS)

  ⚠️   First visit: browser shows a warning.
       Click  Advanced → Proceed to localhost  (safe — self-signed only)

  💡  For ZERO warnings: see README.md → mkcert setup (2 minutes)

  ⌨️   Ctrl+C to stop
  `);
});

// HTTP → HTTPS redirect
http.createServer((req, res) => {
  const host = (req.headers.host || `localhost:${HTTP_PORT}`).replace(`:${HTTP_PORT}`, '');
  res.writeHead(301, { Location: `https://${host}:${PORT}${req.url}` });
  res.end();
}).listen(HTTP_PORT);
