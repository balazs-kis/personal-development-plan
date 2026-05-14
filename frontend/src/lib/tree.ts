import type { CollectionEntry } from 'astro:content';

export interface FileNode {
  type: 'file';
  name: string;
  label: string;
  icon: string;
  href: string;
  id: string;
}

export interface FolderNode {
  type: 'folder';
  name: string;
  label: string;
  path: string;
  children: TreeNode[];
}

export type TreeNode = FileNode | FolderNode;

function formatLabel(name: string): string {
  let label = name.replace(/\.(md|txt)$/i, '');
  label = label.replace(/^[\d.]+-/, '');
  return label
    .split('-')
    .map((word) => (word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(' ');
}

function getFileIcon(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('overview')) return '📋';
  if (lower.includes('lesson')) return '📝';
  if (lower.includes('readme')) return '📖';
  return '📄';
}

export function buildTree(entries: CollectionEntry<'materials'>[]): TreeNode[] {
  const root: TreeNode[] = [];

  for (const entry of entries) {
    const segments = entry.id.split('/');
    let currentChildren = root;
    let currentPath = '';

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const isLast = i === segments.length - 1;
      currentPath = currentPath ? `${currentPath}/${segment}` : segment;

      if (isLast) {
        currentChildren.push({
          type: 'file',
          name: segment,
          label: formatLabel(segment),
          icon: getFileIcon(segment),
          href: `/${entry.id}`,
          id: entry.id,
        });
      } else {
        let folder = currentChildren.find(
          (n): n is FolderNode => n.type === 'folder' && n.name === segment,
        );
        if (!folder) {
          folder = {
            type: 'folder',
            name: segment,
            label: formatLabel(segment),
            path: currentPath,
            children: [],
          };
          currentChildren.push(folder);
        }
        currentChildren = folder.children;
      }
    }
  }

  sortTree(root);
  return root;
}

function sortTree(nodes: TreeNode[]): void {
  nodes.sort((a, b) => {
    if (a.type === 'file' && b.type === 'folder') return -1;
    if (a.type === 'folder' && b.type === 'file') return 1;
    return a.name.localeCompare(b.name);
  });
  for (const n of nodes) {
    if (n.type === 'folder') sortTree(n.children);
  }
}
