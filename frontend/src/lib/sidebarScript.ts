import { getCollection } from 'astro:content';
import { createHash } from 'node:crypto';
import { buildTree, type TreeNode } from './tree';

// The sidebar tree is the same on every page (~800 entries, ~400 KB of markup), so instead of
// inlining it 800 times it's built once into /sidebar.js, which each page loads and the browser caches.
// The script inserts the markup in place of itself. Active lesson and open folders are applied
// client-side by the tree script in Sidebar.astro.

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const CHEVRON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>';

function renderNodes(nodes: TreeNode[], level: number): string {
  const indent = `padding-left: ${level * 0.5}rem`;
  return nodes
    .map((node) =>
      node.type === 'folder'
        ? `<div class="tree-item" style="${indent}">` +
          `<div class="tree-item-header folder" data-folder="${escape(node.path)}">` +
          `<span class="tree-icon">${CHEVRON}</span><span class="file-icon">📁</span><span class="tree-label">${escape(node.label)}</span></div>` +
          `<div class="tree-children">${renderNodes(node.children, level + 1)}</div></div>`
        : `<div class="tree-item" style="${indent}">` +
          `<a class="tree-item-header file" href="${escape(node.href)}" data-path="${escape(node.id)}">` +
          // Empty icon slot keeps lesson labels aligned with folder labels.
          `<span class="tree-icon"></span><span class="file-icon">${node.icon}</span><span class="tree-label">${escape(node.label)}</span></a></div>`,
    )
    .join('');
}

let cached: Promise<{ script: string; url: string }> | undefined;

/** The /sidebar.js source, and its URL with a content hash so a new deploy never serves a stale cached tree. */
export function sidebarScript() {
  cached ??= getCollection('materials').then((entries) => {
    const html = renderNodes(buildTree(entries), 0);
    const script = `document.currentScript.insertAdjacentHTML('beforebegin', ${JSON.stringify(html)});\n`;
    const hash = createHash('sha256').update(script).digest('hex').slice(0, 10);
    return { script, url: `/sidebar.js?v=${hash}` };
  });
  return cached;
}
