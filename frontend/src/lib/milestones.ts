import type { LessonProgress } from './api';
import type { CatalogLesson } from './catalog';
import { addDays, dayKey } from './progressStats';

// Milestones are derived from progress data, never stored: each one either has the date it was
// reached, or a current/target pair for the "next up" progress bars.

export type MilestoneKind = 'lessons' | 'hours' | 'chapters' | 'topics' | 'streak' | 'breadth';

export interface Milestone {
  id: string;
  kind: MilestoneKind;
  icon: string;
  title: string;
  description: string;
  current: number;
  target: number;
  /** ISO date the milestone was reached; null while locked. */
  achievedAt: string | null;
  /** Phrase for what's left, e.g. "18 more lessons". */
  remaining: string;
  /** 0..1, used to pick and draw "next" milestones. Includes partial progress inside the closest chapter/topic. */
  ratio: number;
  /** e.g. "82 / 100", or "35 / 37 lessons" when one chapter/topic away. */
  progressLabel: string;
}

interface Definition {
  kind: MilestoneKind;
  icon: string;
  target: number;
  title: string;
  description: string;
}

function definitions(totals: { lessons: number; chapters: number; topics: number }): Definition[] {
  const lessons = (target: number, title: string): Definition => ({
    kind: 'lessons',
    icon: '📘',
    target,
    title,
    description: target === totals.lessons ? 'Complete every lesson in the course' : `Complete ${target} ${target === 1 ? 'lesson' : 'lessons'}`,
  });
  return [
    lessons(1, 'First steps'),
    lessons(10, 'Getting going'),
    lessons(25, 'Quarter century'),
    lessons(50, 'Half century'),
    lessons(100, 'Centurion'),
    lessons(250, 'Deep diver'),
    lessons(500, 'Unstoppable'),
    lessons(totals.lessons, 'Course complete'),
    { kind: 'hours', icon: '⏱️', target: 10, title: 'Ten hours in', description: 'Invest 10 hours of study' },
    { kind: 'hours', icon: '⏱️', target: 50, title: 'Committed', description: 'Invest 50 hours of study' },
    { kind: 'hours', icon: '⏱️', target: 100, title: 'Triple digits', description: 'Invest 100 hours of study' },
    { kind: 'hours', icon: '⏱️', target: 250, title: 'Seasoned', description: 'Invest 250 hours of study' },
    { kind: 'chapters', icon: '📗', target: 1, title: 'Chapter closed', description: 'Complete every lesson in a chapter' },
    { kind: 'chapters', icon: '📗', target: 10, title: 'Ten chapters', description: 'Complete 10 chapters' },
    { kind: 'chapters', icon: '📗', target: 25, title: 'Bookworm', description: 'Complete 25 chapters' },
    { kind: 'chapters', icon: '📗', target: 50, title: 'Library card', description: 'Complete 50 chapters' },
    { kind: 'topics', icon: '🏆', target: 1, title: 'Topic master', description: 'Complete every lesson in a topic' },
    { kind: 'topics', icon: '🏆', target: 5, title: 'Specialist', description: 'Complete 5 topics' },
    { kind: 'streak', icon: '🔥', target: 3, title: 'Warming up', description: 'Complete lessons 3 days in a row' },
    { kind: 'streak', icon: '🔥', target: 7, title: 'One-week streak', description: 'Complete lessons 7 days in a row' },
    { kind: 'streak', icon: '🔥', target: 14, title: 'Two-week streak', description: 'Complete lessons 14 days in a row' },
    { kind: 'streak', icon: '🔥', target: 30, title: 'Habit formed', description: 'Complete lessons 30 days in a row' },
    { kind: 'breadth', icon: '🧭', target: 5, title: 'Explorer', description: 'Complete a lesson in 5 different topics' },
    { kind: 'breadth', icon: '🧭', target: totals.topics, title: 'Polymath', description: `Complete a lesson in all ${totals.topics} topics` },
  ];
}

const UNITS: Record<MilestoneKind, [string, string]> = {
  lessons: ['lesson', 'lessons'],
  hours: ['hour', 'hours'],
  chapters: ['chapter', 'chapters'],
  topics: ['topic', 'topics'],
  streak: ['day', 'days'],
  breadth: ['topic', 'topics'],
};

export function computeMilestones(catalog: CatalogLesson[], progress: Map<string, LessonProgress>): Milestone[] {
  const lessons = catalog.filter((l) => !l.isOverview);
  const completedAt = (l: CatalogLesson) => progress.get(l.slug)?.completedAt ?? null;

  // Completions in the order they happened; each milestone kind turns this into "when was the Nth reached".
  const done = lessons
    .filter((l) => completedAt(l))
    .map((l) => ({ lesson: l, at: completedAt(l)! }))
    .sort((a, b) => a.at.localeCompare(b.at));

  // Dates (ascending) at which each count was reached, per kind: reached[kind][n - 1] = date of the nth.
  const reached: Record<MilestoneKind, string[]> = { lessons: [], hours: [], chapters: [], topics: [], streak: [], breadth: [] };
  const current: Record<MilestoneKind, number> = { lessons: 0, hours: 0, chapters: 0, topics: 0, streak: 0, breadth: 0 };

  reached.lessons = done.map((d) => d.at);
  current.lessons = done.length;

  // Hours: the date cumulative minutes first crossed each whole hour.
  let minutes = 0;
  for (const d of done) {
    minutes += d.lesson.minutes;
    while (reached.hours.length < Math.floor(minutes / 60)) reached.hours.push(d.at);
  }
  current.hours = Math.floor(minutes / 60);

  // Chapters / topics: a group is complete when its last lesson is; its date is that lesson's completion.
  // Also remembers the closest unfinished group, so "one more chapter" milestones can show real progress.
  const closest: Partial<Record<MilestoneKind, { label: string; done: number; total: number }>> = {};
  const groupDates = (kind: MilestoneKind, key: (l: CatalogLesson) => string | null, label: (l: CatalogLesson) => string) => {
    const groups = new Map<string, CatalogLesson[]>();
    for (const l of lessons) {
      const k = key(l);
      if (k) groups.set(k, [...(groups.get(k) ?? []), l]);
    }
    for (const ls of groups.values()) {
      const done = ls.filter((l) => completedAt(l)).length;
      const best = closest[kind];
      if (done < ls.length && (!best || done / ls.length > best.done / best.total)) {
        closest[kind] = { label: label(ls[0]), done, total: ls.length };
      }
    }
    return [...groups.values()]
      .filter((ls) => ls.every((l) => completedAt(l)))
      .map((ls) => ls.map((l) => completedAt(l)!).sort().at(-1)!)
      .sort();
  };
  reached.chapters = groupDates('chapters', (l) => l.chapter, (l) => l.chapterLabel!);
  reached.topics = groupDates('topics', (l) => l.topic, (l) => l.topicLabel);
  current.chapters = reached.chapters.length;
  current.topics = reached.topics.length;

  // Breadth: the date of the first completion in each topic.
  const firstPerTopic = new Map<string, string>();
  for (const d of done) if (!firstPerTopic.has(d.lesson.topic)) firstPerTopic.set(d.lesson.topic, d.at);
  reached.breadth = [...firstPerTopic.values()].sort();
  current.breadth = reached.breadth.length;

  // Streak: walk completion days; the first time a run reaches length n, that day reached n.
  const lastByDay = new Map<string, string>();
  for (const d of done) lastByDay.set(dayKey(new Date(d.at)), d.at);
  let run = 0;
  let previous: string | null = null;
  for (const key of [...lastByDay.keys()].sort()) {
    const [y, m, day] = key.split('-').map(Number);
    run = previous === dayKey(addDays(new Date(y, m - 1, day), -1)) ? run + 1 : 1;
    if (run > reached.streak.length) reached.streak.push(lastByDay.get(key)!);
    previous = key;
  }
  current.streak = reached.streak.length; // longest streak so far

  const totals = {
    lessons: lessons.length,
    chapters: new Set(lessons.map((l) => l.chapter).filter(Boolean)).size,
    topics: new Set(lessons.map((l) => l.topic)).size,
  };

  return definitions(totals).map((def) => {
    const value = current[def.kind];
    const left = Math.max(0, def.target - value);
    const [one, many] = UNITS[def.kind];
    let remaining = def.kind === 'streak' ? `${def.target}-day streak (best so far: ${value})` : `${left} more ${left === 1 ? one : many}`;
    let ratio = Math.min(1, value / def.target);
    let progressLabel = `${Math.min(value, def.target)} / ${def.target}`;

    // One chapter/topic short: show progress inside the closest one instead of "0 / 1".
    const near = closest[def.kind];
    if (left === 1 && near) {
      const lessonsLeft = near.total - near.done;
      remaining = `${lessonsLeft} more ${lessonsLeft === 1 ? 'lesson' : 'lessons'} in ${near.label}`;
      ratio = (value + near.done / near.total) / def.target;
      progressLabel = `${near.done} / ${near.total} lessons`;
    }

    return {
      id: `${def.kind}-${def.target}`,
      ...def,
      current: Math.min(value, def.target),
      achievedAt: value >= def.target ? reached[def.kind][def.target - 1] : null,
      remaining,
      ratio,
      progressLabel,
    };
  });
}

/** The locked milestones closest to completion. */
export function nextMilestones(milestones: Milestone[], count = 3): Milestone[] {
  return milestones
    .filter((m) => !m.achievedAt)
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, count);
}
