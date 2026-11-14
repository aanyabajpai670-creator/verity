// Local-only preview of the static site and its existing assistant handler.
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import chatbot from './api/chatbot.js';

const root = fileURLToPath(new URL('.', import.meta.url));
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml' };

http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1');
    if (url.pathname === '/api/chatbot') {
      let body = '';
      for await (const chunk of req) {
        body += chunk;
        if (body.length > 65536) { res.writeHead(413).end(); return; }
      }
      try { req.body = body ? JSON.parse(body) : {}; }
      catch { res.writeHead(400).end('Invalid JSON'); return; }
      res.status = (code) => { res.statusCode = code; return res; };
      res.json = (value) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(value)); };
      await chatbot(req, res);
      return;
    }
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
    const path = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
    if (path.split('/').some((part) => part.startsWith('.'))) { res.writeHead(404).end(); return; }
    const file = resolve(root, '.' + path);
    if (!file.startsWith(root.endsWith(sep) ? root : root + sep)) { res.writeHead(404).end(); return; }
    const content = await readFile(file);
    res.setHeader('Content-Type', mime[extname(file)] || 'application/octet-stream');
    res.writeHead(200).end(req.method === 'HEAD' ? undefined : content);
  } catch { if (!res.headersSent) res.writeHead(404); res.end(); }
}).listen(8000, '127.0.0.1', () => console.log('Verity preview: http://127.0.0.1:8000/'));
