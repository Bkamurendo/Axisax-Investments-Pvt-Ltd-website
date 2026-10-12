// Minimal local preview server for dist/. Serves the site under the same
// sub-path it will have in production so the 404 page links work too.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../src/data/site.js';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const base = new URL(site.url).pathname;
const port = Number(process.env.PORT) || 8080;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' };

async function resolve(path) {
  const file = normalize(join(dist, path));
  if (!file.startsWith(dist)) return null;
  try {
    const s = await stat(file);
    return s.isDirectory() ? (await stat(join(file, 'index.html')).then(() => join(file, 'index.html'), () => null)) : file;
  } catch { return null; }
}

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (!url.pathname.startsWith(base)) { res.writeHead(302, { Location: base }); return res.end(); }
  let path = decodeURIComponent(url.pathname.slice(base.length));
  const file = await resolve(path);
  if (file && !path.endsWith('/') && file.endsWith('index.html') && !path.endsWith('index.html')) {
    res.writeHead(301, { Location: url.pathname + '/' + url.search }); return res.end();
  }
  const target = file || join(dist, '404.html');
  res.writeHead(file ? 200 : 404, { 'Content-Type': types[extname(target)] || 'application/octet-stream' });
  res.end(await readFile(target));
}).listen(port, () => console.log(`Preview: http://localhost:${port}${base}`));
