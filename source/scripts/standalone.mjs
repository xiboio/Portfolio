// Inline the compiled assets so index.html can be opened directly from disk.
import { readFile, mkdir, writeFile, copyFile } from 'node:fs/promises';
const index = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const jsPath = index.match(/<script[^>]+src="([^"]+)"[^>]*><\/script>/)?.[1];
const cssPath = index.match(/<link[^>]+href="([^"]+\.css)"[^>]*>/)?.[1];
if (!jsPath || !cssPath) throw new Error('Expected one compiled JS bundle and stylesheet.');
const js = await readFile(new URL('../dist/' + jsPath.replace(/^\.\//, ''), import.meta.url), 'utf8');
const css = await readFile(new URL('../dist/' + cssPath.replace(/^\.\//, ''), import.meta.url), 'utf8');
const icon = await readFile(new URL('../public/favicon.svg', import.meta.url));
const html = index
  .replace(/<script[^>]+src="[^"]+"[^>]*><\/script>/, '')
  .replace('</body>', () => '<script>' + js.replace(/<\/script/gi, '<\\/script') + '</script></body>')
  .replace(/<link[^>]+href="[^"]+\.css"[^>]*>/, () => '<style>' + css.replace(/<\/style/gi, '<\\/style') + '</style>')
  .replace('./favicon.svg', 'data:image/svg+xml;base64,' + icon.toString('base64'));
await mkdir(new URL('../standalone/', import.meta.url), { recursive: true });
await writeFile(new URL('../standalone/index.html', import.meta.url), html);
await copyFile(new URL('../public/curriculo-murilo-freitas.pdf', import.meta.url), new URL('../standalone/curriculo-murilo-freitas.pdf', import.meta.url));
await copyFile(new URL('../public/murilo-freitas-resume-en.pdf', import.meta.url), new URL('../standalone/murilo-freitas-resume-en.pdf', import.meta.url));
console.log('Created standalone/index.html — open directly in a browser.');
