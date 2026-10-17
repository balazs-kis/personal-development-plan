<script lang="ts">
  import { onMount } from 'svelte';
  import { loginUrl } from '../../lib/api';
  import type { CatalogLesson } from '../../lib/catalog';
  import { computeMilestones } from '../../lib/milestones';
  import { generateMockProgress } from '../../lib/mockProgress';
  import { computeStats, formatDuration, relativeDay, type LessonRef } from '../../lib/progressStats';
  import { initSession, me, progress } from '../../lib/session';
  import ActivityHeatmap from './ActivityHeatmap.svelte';
  import Milestones from './Milestones.svelte';
  import ProgressRing from './ProgressRing.svelte';
  import TopicBreakdown from './TopicBreakdown.svelte';

  let { catalog }: { catalog: CatalogLesson[] } = $props();

  // /progress?demo shows generated sample data instead of yours, for judging the layout when real data is sparse.
  // Rendered with client:only, so `location` is available.
  const demo = new URLSearchParams(location.search).has('demo');
  const today = new Date();

  // Render nothing until the session has loaded, so the page doesn't flash zeros first.
  let loaded = $state(demo);
  onMount(() => {
    if (!demo) initSession().then(() => (loaded = true));
  });

  const data = $derived(demo ? new Map(generateMockProgress(catalog, today).map((p) => [p.slug, p])) : $progress);
  const stats = $derived(computeStats(catalog, data, today));
  const milestones = $derived(computeMilestones(catalog, data));

  const STALE_DAYS = 14;
  let showAllInProgress = $state(false);
  const inProgressShown = $derived(showAllInProgress ? stats.inProgress : stats.inProgress.slice(0, 6));

  const isStale = (ref: LessonRef) => Date.now() - new Date(ref.progress!.lastViewedAt).getTime() > STALE_DAYS * 86_400_000;
  const crumb = (ref: LessonRef) => [ref.lesson.topicLabel, ref.lesson.chapterLabel].filter(Boolean).join(' › ');
</script>

{#if !loaded}
  <!-- Loading: usually a few milliseconds. -->
{:else if !demo && !$me}
  <div class="progress-page">
    <h1>My progress</h1>
    <p class="progress-empty">Couldn't reach the server, so your progress can't be shown right now. Try reloading in a moment.</p>
  </div>
{:else if !demo && !$me?.authenticated}
  <div class="progress-page">
    <h1>My progress</h1>
    <div class="progress-signin">
      <p>Sign in to keep track of the lessons you've read and completed, build a streak, and earn milestones along the way.</p>
      <div class="progress-signin-buttons">
        <a class="progress-signin-button" href={loginUrl('google', '/progress')}>Continue with Google</a>
        <a class="progress-signin-button" href={loginUrl('github', '/progress')}>Continue with GitHub</a>
      </div>
    </div>
  </div>
{:else}
  <div class="progress-page">
    {#if demo}
      <div class="progress-preview-banner">Sample data, not your progress. <a href="/progress">Show my progress</a></div>
    {/if}

    <h1>My progress</h1>

    <section class="progress-summary">
      <ProgressRing percent={stats.percent} />
      <div class="stat-tiles">
        <div class="stat-tile">
          <span class="stat-value">{stats.completed}<span class="stat-of">&nbsp;/ {stats.total}</span></span>
          <span class="stat-label">lessons completed</span>
        </div>
        <div class="stat-tile">
          <span class="stat-value">{formatDuration(stats.minutesInvested, 'down')}</span>
          <span class="stat-label">invested</span>
        </div>
        <div class="stat-tile">
          <span class="stat-value">{formatDuration(stats.minutesRemaining)}</span>
          <span class="stat-label">to go</span>
        </div>
        <div class="stat-tile">
          <span class="stat-value">{stats.currentStreak > 0 ? '🔥 ' : ''}{stats.currentStreak} {stats.currentStreak === 1 ? 'day' : 'days'}</span>
          <span class="stat-label">current streak</span>
        </div>
      </div>
    </section>

    <section>
      <h2>Pick up where you left off</h2>
      <div class="resume-cards">
        {#if stats.continueLesson}
          {@const ref = stats.continueLesson}
          <a class="resume-card" href="/{ref.lesson.slug}">
            <span class="resume-kind">Continue</span>
            <span class="resume-title">{ref.lesson.title}</span>
            <span class="resume-crumb">{crumb(ref)}</span>
            <span class="resume-meta">Opened {relativeDay(ref.progress!.lastViewedAt)}{ref.lesson.minutes ? ` · ${ref.lesson.minutes} min` : ''}</span>
          </a>
        {/if}
        {#if stats.nextLesson}
          {@const ref = stats.nextLesson}
          <a class="resume-card" href="/{ref.lesson.slug}">
            <span class="resume-kind">{stats.completed === 0 ? 'Start here' : 'Next up'}</span>
            <span class="resume-title">{ref.lesson.title}</span>
            <span class="resume-crumb">{crumb(ref)}</span>
            <span class="resume-meta">{ref.progress?.viewCount ? `Opened ${relativeDay(ref.progress.lastViewedAt)}` : 'Not started'}{ref.lesson.minutes ? ` · ${ref.lesson.minutes} min` : ''}</span>
          </a>
        {/if}
      </div>
    </section>

    <section>
      <h2>Topics</h2>
      <TopicBreakdown topics={stats.topics} />
    </section>

    <section>
      <h2>Activity</h2>
      <div class="activity">
        <ActivityHeatmap completionsByDay={stats.completionsByDay} {today} />
        <div class="streak-stats">
          <div class="stat-tile">
            <span class="stat-value">{stats.currentStreak} {stats.currentStreak === 1 ? 'day' : 'days'}</span>
            <span class="stat-label">current streak</span>
          </div>
          <div class="stat-tile">
            <span class="stat-value">{stats.longestStreak} {stats.longestStreak === 1 ? 'day' : 'days'}</span>
            <span class="stat-label">longest streak</span>
          </div>
          <div class="stat-tile">
            <span class="stat-value">{stats.activeDays}</span>
            <span class="stat-label">days with a completed lesson</span>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2>Milestones</h2>
      <Milestones {milestones} />
    </section>

    <section>
      <h2>In progress</h2>
      {#if stats.inProgress.length === 0}
        <p class="progress-empty">Nothing half-read. Nice.</p>
      {:else}
        <p class="progress-hint">Lessons you've opened but haven't marked complete.</p>
        <div class="in-progress-list">
          {#each inProgressShown as ref (ref.lesson.slug)}
            <a class="in-progress-item" href="/{ref.lesson.slug}">
              <span class="in-progress-title">{ref.lesson.title}</span>
              <span class="in-progress-crumb">{crumb(ref)}</span>
              <span class="in-progress-when" class:stale={isStale(ref)}>{isStale(ref) ? '⏳ ' : ''}opened {relativeDay(ref.progress!.lastViewedAt)}</span>
            </a>
          {/each}
        </div>
        {#if stats.inProgress.length > 6}
          <button class="progress-more" onclick={() => (showAllInProgress = !showAllInProgress)}>
            {showAllInProgress ? 'Show fewer' : `Show all ${stats.inProgress.length}`}
          </button>
        {/if}
      {/if}
    </section>
  </div>
{/if}
