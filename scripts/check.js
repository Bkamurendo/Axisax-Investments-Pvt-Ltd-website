// Post-build checks: broken internal links, duplicate ids, missing labels,
// and stray "undefined" output. Exits non-zero on any problem.
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../src/data/site.js';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const base = new URL(site.url).pathname;
const problems = [];

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

async function exists(p) {
  try {
    const s = await stat(p);
    return s.isDirectory() ? exists(join(p, 'index.html')) : true;
  } catch { return false; }
}

for (const file of await walk(dist)) {
  const rel = relative(dist, file);
  const html = await readFile(file, 'utf8');
  if (/\bundefined\b|\[object Object\]/.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) problems.push(`${rel}: contains "undefined" or [object Object]`);

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) problems.push(`${rel}: duplicate ids ${[...new Set(dupes)].join(', ')}`);

  for (const m of html.matchAll(/<(input|select|textarea)\b([^>]*)>/g)) {
    const attrs = m[2];
    if (/type="(hidden|submit|button)"/.test(attrs)) continue;
    const id = attrs.match(/\sid="([^"]+)"/)?.[1];
    if (!id || !html.includes(`for="${id}"`)) problems.push(`${rel}: form control without label (${id || attrs.trim().slice(0, 40)})`);
  }

  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|tel:|#|data:)/.test(url)) continue;
    const clean = url.split(/[?#]/)[0];
    const target = clean.startsWith('/')
      ? join(dist, clean.startsWith(base) ? clean.slice(base.length) : clean)
      : join(dirname(file), clean);
    if (!(await exists(target))) problems.push(`${rel}: broken link ${url}`);
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  console.error(`\n${problems.length} problem(s) found.`);
  process.exit(1);
}
console.log('All checks passed.');
