import type { LessonProgress } from './api';
import type { CatalogLesson } from './catalog';
import { addDays } from './progressStats';

// Sample progress shown at /progress?demo, for judging the page layout when real data is still sparse.
// Same shape as GET /api/progress, built from the real catalog. Seeded, so every reload looks the same;
// dates are relative to today, so the "current streak" is always live.
//
// The story: started ~5 months ago, finished most of topic 1, half of topic 2, started topic 3,
// dabbled in Linux, PostgreSQL and security. A 2-week break, a longest streak of 11 days,
// a current streak of 4, and a few lessons left half-read.

const HISTORY_DAYS = 160;

/** Share of each topic completed (by topic index) and when, as fractions of the history window. */
const PLAN: Record<number, { share: number; from: number; to: number }> = {
  0: { share: 0.95, from: 0.0, to: 0.45 }, // Advanced .NET
  1: { share: 0.62, from: 0.35, to: 0.82 }, // Architecture patterns
  2: { share: 0.22, from: 0.75, to: 1.0 }, // Distributed systems
  6: { share: 0.3, from: 0.5, to: 0.9 }, // Linux
  8: { share: 0.15, from: 0.6, to: 0.95 }, // PostgreSQL
  10: { share: 0.04, from: 0.85, to: 0.95 }, // Security
};

function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateMockProgress(catalog: CatalogLesson[], now = new Date()): LessonProgress[] {
  const rand = mulberry32(20261017);
  const lessons = catalog.filter((l) => !l.isOverview);
  const topics = [...new Set(lessons.map((l) => l.topic))];
  const today = addDays(now, 0);

  // 1. Which lessons get completed, each with a position (0..1) on the timeline.
  const planned: { lesson: CatalogLesson; position: number }[] = [];
  topics.forEach((topic, index) => {
    const plan = PLAN[index];
    if (!plan) return;
    const inTopic = lessons.filter((l) => l.topic === topic);
    const target = Math.round(inTopic.length * plan.share);
    const picked: CatalogLesson[] = [];
    for (const lesson of inTopic) {
      if (picked.length >= target) break;
      // Mostly in course order, occasionally skipping one so not every chapter is a clean sweep.
      if (plan.share < 0.9 && rand() < 0.08) continue;
      picked.push(lesson);
    }
    picked.forEach((lesson, i) =>
      planned.push({ lesson, position: plan.from + ((i + 0.5) / picked.length) * (plan.to - plan.from) }),
    );
  });
  planned.sort((a, b) => a.position - b.position);

  // 2. Which days were active.
  const activeDays: { date: Date; weight: number }[] = [];
  for (let ago = HISTORY_DAYS; ago >= 0; ago--) {
    const date = addDays(today, -ago);
    const weekend = date.getDay() === 0 || date.getDay() === 6;
    let active: boolean;
    if (ago <= 3) active = true; // current streak: 4 days
    else if (ago === 4) active = false;
    else if (ago >= 40 && ago <= 50) active = true; // longest streak: 11 days
    else if (ago === 39 || ago === 51) active = false;
    else if (ago >= 110 && ago <= 124) active = false; // two-week break
    // Sparse enough that most active days complete several lessons, so the heatmap shows a range.
    else active = rand() < (weekend ? 0.15 : 0.28);
    if (active) activeDays.push({ date, weight: 1 + Math.floor(rand() * 4) });
  }

  // 3. Spread completions over active days in timeline order: one per active day (so the scripted
  //    streaks hold), the rest by weight. If there are fewer completions than days, the oldest days lose out.
  const days = activeDays.slice(Math.max(0, activeDays.length - planned.length));
  const counts = days.map(() => 1);
  const extra = planned.length - days.length;
  const extraWeight = days.reduce((sum, d) => sum + d.weight - 1, 0) || 1;
  days.forEach((d, i) => (counts[i] += Math.floor((extra * (d.weight - 1)) / extraWeight)));
  for (let i = days.length - 1, left = planned.length - counts.reduce((a, b) => a + b, 0); left > 0; i = (i - 1 + days.length) % days.length, left--) {
    counts[i]++;
  }
  const dayOf: Date[] = days.flatMap((d, i) => Array<Date>(counts[i]).fill(d.date));

  const result = new Map<string, LessonProgress>();
  planned.forEach(({ lesson }, i) => {
    const date = dayOf[i];
    const completedAt = atTimeOfDay(date, today, now, rand);
    const firstViewedAt = new Date(completedAt.getTime() - Math.floor(rand() * 2) * 86_400_000 - rand() * 3_600_000);
    const revisited = rand() < 0.25;
    const lastViewedAt = revisited ? new Date(Math.min(now.getTime(), completedAt.getTime() + rand() * 20 * 86_400_000)) : completedAt;
    result.set(lesson.slug, {
      slug: lesson.slug,
      firstViewedAt: firstViewedAt.toISOString(),
      lastViewedAt: lastViewedAt.toISOString(),
      viewCount: 1 + (revisited ? 1 + Math.floor(rand() * 3) : 0),
      completedAt: completedAt.toISOString(),
    });
  });

  // 4. Half-read lessons: the next two in the current topic (recent), plus a few stale ones elsewhere.
  const opened = (lesson: CatalogLesson | undefined, daysAgo: number) => {
    if (!lesson || result.has(lesson.slug)) return;
    const at = atTimeOfDay(addDays(today, -daysAgo), today, now, rand).toISOString();
    result.set(lesson.slug, { slug: lesson.slug, firstViewedAt: at, lastViewedAt: at, viewCount: 1 + Math.floor(rand() * 2), completedAt: null });
  };
  const current = lessons.filter((l) => l.topic === topics[2] && !result.has(l.slug));
  opened(current[0], 0);
  opened(current[1], 2);
  for (const [topicIndex, daysAgo] of [[3, 19], [4, 26], [7, 33], [9, 47], [1, 58]]) {
    const candidates = lessons.filter((l) => l.topic === topics[topicIndex] && !result.has(l.slug));
    opened(candidates[Math.floor(rand() * Math.min(6, candidates.length))], daysAgo);
  }

  // 5. A few overview pages opened or ticked off; they must not move the percentage.
  for (const overview of catalog.filter((l) => l.isOverview).slice(0, 4)) {
    const at = atTimeOfDay(addDays(today, -150), today, now, rand).toISOString();
    result.set(overview.slug, { slug: overview.slug, firstViewedAt: at, lastViewedAt: at, viewCount: 1, completedAt: at });
  }

  return [...result.values()];
}

function atTimeOfDay(date: Date, today: Date, now: Date, rand: () => number): Date {
  if (date.getTime() === today.getTime()) {
    // Earlier today, but never in the future.
    return new Date(Math.max(today.getTime(), now.getTime() - (10 + rand() * 110) * 60_000));
  }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8 + Math.floor(rand() * 14), Math.floor(rand() * 60));
}
