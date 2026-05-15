import { readdirSync, statSync } from 'node:fs';
import { join, posix, relative, resolve, dirname, sep } from 'node:path';
import { visit } from 'unist-util-visit';

const MATERIALS_DIR = resolve('src/content/materials');

function listMarkdownFiles(dir) {
  const out = new Set();
  function walk(d) {
    for (const name of readdirSync(d)) {
      const full = join(d, name);
      const s = statSync(full);
      if (s.isDirectory()) {
        walk(full);
      } else if (s.isFile() && name.endsWith('.md')) {
        const rel = relative(MATERIALS_DIR, full).split(sep).join('/');
        out.add(rel.replace(/\.md$/, ''));
      }
    }
  }
  walk(dir);
  return out;
}

function slugify(segment) {
  return segment.replace(/\./g, '');
}

function toSlugPath(canonicalPath) {
  return canonicalPath.split('/').map(slugify).join('/');
}

const validTargets = listMarkdownFiles(MATERIALS_DIR);

export default function remarkRewriteMdLinks() {
  return (tree, file) => {
    const fileAbs = file.history?.[0] ?? file.path;
    if (!fileAbs) return;

    const fileRelDir = dirname(relative(MATERIALS_DIR, fileAbs).split(sep).join('/'));

    visit(tree, 'link', (node) => {
      const url = node.url;
      if (!url) return;
      if (/^[a-z]+:\/\//i.test(url)) return;
      if (url.startsWith('#')) return;
      if (url.startsWith('mailto:')) return;

      const [pathPart, fragment] = url.split('#');
      if (!pathPart.endsWith('.md')) return;

      const fromDir = fileRelDir === '.' ? '' : fileRelDir;
      const resolved = posix.normalize(posix.join(fromDir, pathPart)).replace(/\.md$/, '');

      if (!validTargets.has(resolved)) {
        const fromLabel = relative(MATERIALS_DIR, fileAbs).split(sep).join('/');
        throw new Error(
          `[remarkRewriteMdLinks] Broken link in ${fromLabel}: "${url}" -> resolved to "${resolved}.md" which does not exist.`,
        );
      }

      const slug = toSlugPath(resolved);
      node.url = `/${slug}${fragment ? `#${fragment}` : ''}`;
    });
  };
}
