import {readdir, readFile, stat} from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('build');
const prefix = '/docs-as-code-lab/';
async function walk(dir) {
  const entries = await readdir(dir, {withFileTypes: true});
  return (await Promise.all(entries.map(e => e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name)))).flat();
}
const files = await walk(root);
const html = files.filter(f => f.endsWith('.html') && !f.endsWith('404.html'));
const errors = [];
let checked = 0;
for (const file of html) {
  const content = await readFile(file, 'utf8');
  const route = prefix + path.relative(root, file).replaceAll(path.sep, '/').replace(/index\.html$/, '');
  const base = new URL(route, 'https://abwonder.github.io');
  for (const [, raw] of content.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = new URL(raw.replaceAll('&amp;', '&'), base);
    if (url.origin !== base.origin) continue;
    if (!url.pathname.startsWith(prefix)) {errors.push(`${route}: outside project base URL: ${url.pathname}`); continue;}
    let candidate = path.join(root, decodeURIComponent(url.pathname.slice(prefix.length)));
    try {
      if ((await stat(candidate)).isDirectory()) candidate = path.join(candidate, 'index.html');
      await stat(candidate); checked++;
    } catch {errors.push(`${route}: missing ${url.pathname}`);}
  }
}
if (html.length < 11) errors.push('Expected at least 11 authored documentation pages');
if (errors.length) {console.error(errors.join('\n')); process.exitCode = 1;}
else console.log(`Verified ${html.length} HTML routes and ${checked} local link/asset targets under ${prefix}`);
