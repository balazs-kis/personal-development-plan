<script lang="ts">
  import { nextMilestones, type Milestone } from '../../lib/milestones';

  let { milestones }: { milestones: Milestone[] } = $props();

  const next = $derived(nextMilestones(milestones));
  const earned = $derived(milestones.filter((m) => m.achievedAt).length);

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
</script>

<p class="progress-hint">{earned} of {milestones.length} earned.</p>

{#if next.length > 0}
  <div class="milestone-next">
    {#each next as m (m.id)}
      <div class="milestone-next-item">
        <span class="milestone-icon">{m.icon}</span>
        <div class="milestone-next-body">
          <span class="milestone-title">{m.title}</span>
          <span class="milestone-remaining">{m.remaining}</span>
          <span class="progress-bar small"><span class="progress-bar-fill" style="width: {m.ratio * 100}%"></span></span>
        </div>
        <span class="milestone-count">{m.progressLabel}</span>
      </div>
    {/each}
  </div>
{/if}

<div class="milestone-grid">
  {#each milestones as m (m.id)}
    <div class="milestone-badge" class:earned={!!m.achievedAt} title={m.description}>
      <span class="milestone-icon">{m.achievedAt ? m.icon : '🔒'}</span>
      <span class="milestone-title">{m.title}</span>
      <span class="milestone-sub">{m.achievedAt ? formatDate(m.achievedAt) : m.description}</span>
    </div>
  {/each}
</div>
