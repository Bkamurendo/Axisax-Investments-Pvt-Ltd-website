// Static site build: renders every page in src/pages to dist/, copies assets
// and writes sitemap.xml and robots.txt. No dependencies; run `npm run build`.

import { mkdir, rm, writeFile, cp } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from './src/data/site.js';
import { renderPage } from './src/lib/layout.js';
import home from './src/pages/home.js';
import about from './src/pages/about.js';
import services from './src/pages/services.js';
import categories from './src/pages/categories.js';
import forms from './src/pages/forms.js';
import legal from './src/pages/legal.js';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'dist');

const pages = [home, about, ...services, ...categories, ...forms, ...legal].filter((p) => !p.enabled || p.enabled());

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

for (const page of pages) {
  const file = page.path.endsWith('.html') ? page.path : join(page.path, 'index.html');
  const dest = join(out, file);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, renderPage(page));
}

await cp(join(root, 'src/assets'), join(out, 'assets'), { recursive: true });

const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .filter((p) => !p.is404 && !p.noindex)
  .map((p) => `  <url><loc>${new URL(p.path, site.url).href}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n');
await writeFile(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
await writeFile(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', site.url).href}\n`);
// Tell GitHub Pages to serve files as-is.
await writeFile(join(out, '.nojekyll'), '');

console.log(`Built ${pages.length} pages into dist/`);
