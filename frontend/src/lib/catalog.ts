import type { CollectionEntry } from 'astro:content';
import { formatLabel } from './tree';

// Build-time description of every page in the course, passed to client-side progress views.
// Slugs match the backend's lesson slugs (the Astro content id).

export interface CatalogLesson {
  slug: string;
  title: string;
  /** Topic folder, e.g. "01-advanced-dotnet". Empty for the root overview page. */
  topic: string;
  topicLabel: string;
  /** Chapter folder, e.g. "01-advanced-dotnet/0101-modern-csharp-features"; null for topic-level pages. */
  chapter: string | null;
  chapterLabel: string | null;
  /** Topic/chapter overview pages are introductions; they never count toward progress. */
  isOverview: boolean;
  /** From the "Primary Resource(s) (N minutes)" heading; 0 if the lesson has none. */
  minutes: number;
}

// Every lesson states its time estimate in exactly this heading format.
const MINUTES = /^### Primary Resources \((\d+) minutes\)\s*$/m;
const H1 = /^#\s+(.+)$/m;

const heading = (entry: CollectionEntry<'materials'>) => entry.data.title ?? entry.body?.match(H1)?.[1];

export function buildCatalog(entries: CollectionEntry<'materials'>[]): CatalogLesson[] {
  // Topic and chapter names come from their overview pages ("# Topic 1: Advanced .NET & C#"),
  // falling back to the folder name ("Advanced Dotnet").
  const folderNames = new Map<string, string>();
  for (const entry of entries) {
    const segments = entry.id.split('/');
    const title = heading(entry);
    if (segments.length > 1 && segments[segments.length - 1].endsWith('overview') && title) {
      folderNames.set(segments.slice(0, -1).join('/'), title.replace(/^(Topic|Chapter)\s+[\d.]+:\s*/i, '').trim());
    }
  }
  const folderName = (path: string) => folderNames.get(path) ?? formatLabel(path.split('/').pop()!);

  const catalog = entries
    .map((entry) => {
      const segments = entry.id.split('/');
      const name = segments[segments.length - 1];
      const body = entry.body ?? '';
      const title = heading(entry);
      const topic = segments.length > 1 ? segments[0] : '';
      const chapter = segments.length > 2 ? `${segments[0]}/${segments[1]}` : null;

      return {
        slug: entry.id,
        // "Lesson 2: Records and Immutability" -> "Records and Immutability"
        title: title ? title.replace(/^Lesson\s+\d+:\s*/i, '').trim() : formatLabel(name),
        topic,
        topicLabel: topic ? folderName(topic) : '',
        chapter,
        chapterLabel: chapter ? folderName(chapter) : null,
        isOverview: name.endsWith('overview'),
        minutes: Number(body.match(MINUTES)?.[1] ?? 0),
      };
    })
    // Ids sort into course order: numeric prefixes, and "01-overview" sorts before "0101-...".
    .sort((a, b) => a.slug.localeCompare(b.slug));

  const missing = catalog.filter((l) => !l.isOverview && l.minutes === 0);
  if (missing.length > 0) {
    console.warn(
      `[catalog] ${missing.length} lesson(s) without a "### Primary Resources (N minutes)" heading; ` +
        `they count as 0 minutes:\n  ${missing.map((l) => l.slug).join('\n  ')}`,
    );
  }
  return catalog;
}
