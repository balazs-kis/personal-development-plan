<script lang="ts">
  import { formatDuration, type TopicStats } from '../../lib/progressStats';

  let { topics }: { topics: TopicStats[] } = $props();

  let expanded = $state(new Set<string>());

  function toggle(key: string) {
    const next = new Set(expanded);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    expanded = next;
  }

  const pct = (completed: number, total: number) => (total ? Math.round((completed / total) * 100) : 0);
</script>

<div class="topic-list">
  {#each topics as topic (topic.key)}
    {@const open = expanded.has(topic.key)}
    {@const done = topic.completed === topic.total}
    <div class="topic" class:untouched={topic.completed === 0} class:done>
      <button class="topic-row" onclick={() => toggle(topic.key)} aria-expanded={open}>
        <span class="topic-chevron" class:open>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </span>
        <span class="topic-name">{topic.label}{#if done}<span class="topic-check">✓</span>{/if}</span>
        <span class="progress-bar"><span class="progress-bar-fill" style="width: {pct(topic.completed, topic.total)}%"></span></span>
        <span class="topic-count">{topic.completed} / {topic.total}</span>
        <span class="topic-pct">{pct(topic.completed, topic.total)}%</span>
      </button>

      {#if open}
        <div class="chapter-list">
          {#each topic.chapters as chapter (chapter.key)}
            {@const chapterDone = chapter.completed === chapter.total}
            <div class="chapter-row" class:untouched={chapter.completed === 0} class:done={chapterDone}>
              <span class="chapter-name">{chapter.label}{#if chapterDone}<span class="topic-check">✓</span>{/if}</span>
              <span class="progress-bar small"><span class="progress-bar-fill" style="width: {pct(chapter.completed, chapter.total)}%"></span></span>
              <span class="topic-count">{chapter.completed} / {chapter.total}</span>
              <span class="topic-pct">
                {chapterDone ? 'done' : chapter.minutesRemaining ? formatDuration(chapter.minutesRemaining) + ' left' : '—'}
              </span>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/each}
</div>
