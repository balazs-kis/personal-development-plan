import type { LessonProgress } from './api';
import type { CatalogLesson } from './catalog';

// Pure progress calculations: catalog + per-lesson progress in, everything the progress page shows out.
// Doesn't care whether the progress comes from the API or from mock data.

export interface GroupStats {
  key: string;
  label: string;
  total: number;
  completed: number;
  minutesRemaining: number;
}

export interface TopicStats extends GroupStats {
  chapters: GroupStats[];
}

export interface LessonRef {
  lesson: CatalogLesson;
  progress?: LessonProgress;
}

export interface Stats {
  total: number;
  completed: number;
  /** 0–100, real lessons only. */
  percent: number;
  minutesInvested: number;
  minutesRemaining: number;
  /** Streaks count days with at least one completion (local time). */
  currentStreak: number;
  longestStreak: number;
  activeDays: number;
  /** Most recently opened lesson that isn't completed yet. */
  continueLesson: LessonRef | null;
  /** First unfinished lesson in course order after the latest completion. */
  nextLesson: LessonRef | null;
  topics: TopicStats[];
  /** Opened but not completed, most recently opened first. */
  inProgress: LessonRef[];
  /** Local "yyyy-mm-dd" -> number of lessons completed that day. */
  completionsByDay: Map<string, number>;
}

export function dayKey(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${m}-${d}`;
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function group(key: string, label: string, lessons: CatalogLesson[], isDone: (l: CatalogLesson) => boolean): GroupStats {
  return {
    key,
    label,
    total: lessons.length,
    completed: lessons.filter(isDone).length,
    minutesRemaining: lessons.filter((l) => !isDone(l)).reduce((sum, l) => sum + l.minutes, 0),
  };
}

export function computeStats(catalog: CatalogLesson[], progress: Map<string, LessonProgress>, today = new Date()): Stats {
  const lessons = catalog.filter((l) => !l.isOverview);
  const isDone = (l: CatalogLesson) => !!progress.get(l.slug)?.completedAt;
  const done = lessons.filter(isDone);

  // Activity: completions per local day.
  const completionsByDay = new Map<string, number>();
  for (const l of done) {
    const key = dayKey(new Date(progress.get(l.slug)!.completedAt!));
    completionsByDay.set(key, (completionsByDay.get(key) ?? 0) + 1);
  }

  // A streak stays alive through today until midnight, so start from yesterday if nothing is done yet today.
  let currentStreak = 0;
  let cursor = completionsByDay.has(dayKey(today)) ? today : addDays(today, -1);
  while (completionsByDay.has(dayKey(cursor))) {
    currentStreak++;
    cursor = addDays(cursor, -1);
  }

  let longestStreak = 0;
  let run = 0;
  let previous: string | null = null;
  for (const key of [...completionsByDay.keys()].sort()) {
    const [y, m, d] = key.split('-').map(Number);
    run = previous === dayKey(addDays(new Date(y, m - 1, d), -1)) ? run + 1 : 1;
    longestStreak = Math.max(longestStreak, run);
    previous = key;
  }

  // viewCount 0 happens when a lesson was marked complete without a recorded view, then un-completed.
  const opened = lessons
    .filter((l) => (progress.get(l.slug)?.viewCount ?? 0) > 0 && !isDone(l))
    .map((l) => ({ lesson: l, progress: progress.get(l.slug) }))
    .sort((a, b) => b.progress!.lastViewedAt.localeCompare(a.progress!.lastViewedAt));

  const latestDone = done.reduce<CatalogLesson | null>(
    (latest, l) => (!latest || progress.get(l.slug)!.completedAt! > progress.get(latest.slug)!.completedAt! ? l : latest),
    null,
  );
  // If that lesson is the one already shown under "Continue", suggest the one after it instead.
  const continueSlug = opened[0]?.lesson.slug;
  const startAt = latestDone ? lessons.indexOf(latestDone) + 1 : 0;
  const next = [...lessons.slice(startAt), ...lessons.slice(0, startAt)].find((l) => !isDone(l) && l.slug !== continueSlug);

  const topicKeys = [...new Set(lessons.map((l) => l.topic))];
  const topics = topicKeys.map((topic) => {
    const inTopic = lessons.filter((l) => l.topic === topic);
    const chapterKeys = [...new Set(inTopic.map((l) => l.chapter).filter((c): c is string => !!c))];
    return {
      ...group(topic, inTopic[0].topicLabel, inTopic, isDone),
      chapters: chapterKeys.map((chapter) => {
        const inChapter = inTopic.filter((l) => l.chapter === chapter);
        return group(chapter, inChapter[0].chapterLabel!, inChapter, isDone);
      }),
    };
  });

  return {
    total: lessons.length,
    completed: done.length,
    percent: lessons.length ? (done.length / lessons.length) * 100 : 0,
    minutesInvested: done.reduce((sum, l) => sum + l.minutes, 0),
    minutesRemaining: lessons.filter((l) => !isDone(l)).reduce((sum, l) => sum + l.minutes, 0),
    currentStreak,
    longestStreak,
    activeDays: completionsByDay.size,
    continueLesson: opened[0] ?? null,
    nextLesson: next ? { lesson: next, progress: progress.get(next.slug) } : null,
    topics,
    inProgress: opened,
    completionsByDay,
  };
}

/** Rounds to the nearest hour; pass `round: 'down'` for time already spent, so it never overstates. */
export function formatDuration(minutes: number, round: 'nearest' | 'down' = 'nearest'): string {
  if (minutes < 60) return `${minutes} min`;
  return `~${round === 'down' ? Math.floor(minutes / 60) : Math.round(minutes / 60)} h`;
}

export function relativeDay(iso: string, today = new Date()): string {
  const then = new Date(iso);
  const days = Math.round((addDays(today, 0).getTime() - addDays(then, 0).getTime()) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 14) return `${days} days ago`;
  if (days < 60) return `${Math.round(days / 7)} weeks ago`;
  return `${Math.round(days / 30)} months ago`;
}
