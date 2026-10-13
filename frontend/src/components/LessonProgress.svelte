<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { me, progress, initSession, recordView, setCompletion } from '../lib/session';

  let { slug }: { slug: string } = $props();

  // A view only counts after this much continuous time with the tab visible.
  const DWELL_MS = 6000;

  const lesson = $derived($progress.get(slug));
  const completed = $derived(!!lesson?.completedAt);
  let busy = $state(false);

  onMount(() => {
    const ready = initSession();
    let timer: ReturnType<typeof setTimeout> | undefined;
    let counted = false;

    async function fire() {
      counted = true;
      timer = undefined;
      await ready;
      if (get(me)?.authenticated) {
        await recordView(slug).catch((err) => console.error('Could not record view.', err));
      }
    }

    function start() {
      if (!counted && !timer) timer = setTimeout(fire, DWELL_MS);
    }

    function stop() {
      clearTimeout(timer);
      timer = undefined;
    }

    // Switching tabs resets the clock, so a lesson left open in the background doesn't count.
    const onVisibilityChange = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibilityChange);
    if (!document.hidden) start();

    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  });

  async function toggleCompleted() {
    busy = true;
    try {
      await setCompletion(slug, !completed);
    } catch (err) {
      console.error('Could not update completion.', err);
    } finally {
      busy = false;
    }
  }

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString();
  }
</script>

{#if $me?.authenticated}
  <div class="lesson-progress">
    <span class="lesson-progress-meta">
      {#if lesson && lesson.viewCount > 0}
        Viewed {lesson.viewCount} {lesson.viewCount === 1 ? 'time' : 'times'}, last on {formatDate(lesson.lastViewedAt)}
      {:else}
        Not viewed yet
      {/if}
    </span>
    <button class="lesson-complete" class:done={completed} onclick={toggleCompleted} disabled={busy}>
      {#if completed && lesson?.completedAt}
        ✓ Completed on {formatDate(lesson.completedAt)}
      {:else}
        Mark as complete
      {/if}
    </button>
  </div>
{/if}
