<script lang="ts">
  import { addDays, dayKey } from '../../lib/progressStats';

  let { completionsByDay, today = new Date(), weeks = 26 }: { completionsByDay: Map<string, number>; today?: Date; weeks?: number } =
    $props();

  const CELL = 13;
  const GAP = 3;
  const LEFT = 30; // weekday labels
  const TOP = 18; // month labels

  // Columns are weeks (Monday first), the last column contains today.
  const mondayOffset = $derived((today.getDay() + 6) % 7);
  const start = $derived(addDays(today, -mondayOffset - (weeks - 1) * 7));

  const cells = $derived(
    Array.from({ length: weeks * 7 }, (_, i) => {
      const date = addDays(start, i);
      const count = completionsByDay.get(dayKey(date)) ?? 0;
      return { date, count, week: Math.floor(i / 7), weekday: i % 7, future: date > today };
    }),
  );

  const months = $derived(
    Array.from({ length: weeks }, (_, w) => addDays(start, w * 7))
      .map((date, w) => ({ w, date }))
      .filter(({ w, date }) => w === 0 || date.getMonth() !== addDays(date, -7).getMonth())
      // Drop the leading partial month's label if the next month starts right after it (they'd overlap).
      .filter(({ w }, i, all) => !(i === 0 && all[1] && all[1].w - w < 3))
      .map(({ w, date }) => ({ x: LEFT + w * (CELL + GAP), label: date.toLocaleDateString(undefined, { month: 'short' }) })),
  );

  function describe(count: number, date: Date): string {
    const day = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    return `${count === 0 ? 'No' : count} ${count === 1 ? 'lesson' : 'lessons'} completed on ${day}`;
  }
</script>

<!-- On narrow screens the grid scrolls sideways; start scrolled to the most recent weeks. -->
<div class="heatmap" {@attach (el) => { el.scrollLeft = el.scrollWidth; }}>
  <svg width={LEFT + weeks * (CELL + GAP)} height={TOP + 7 * (CELL + GAP)} role="img" aria-label="Lessons completed per day">
    {#each months as m (m.x)}
      <text class="heatmap-label" x={m.x} y="11">{m.label}</text>
    {/each}
    {#each [['Mon', 0], ['Wed', 2], ['Fri', 4]] as [label, row] (label)}
      <text class="heatmap-label" x="0" y={TOP + Number(row) * (CELL + GAP) + CELL - 2}>{label}</text>
    {/each}
    {#each cells as c (c.date.getTime())}
      {#if !c.future}
        <rect
          class="heatmap-cell"
          class:active={c.count > 0}
          x={LEFT + c.week * (CELL + GAP)}
          y={TOP + c.weekday * (CELL + GAP)}
          width={CELL}
          height={CELL}
          rx="3"
        >
          <title>{describe(c.count, c.date)}</title>
        </rect>
      {/if}
    {/each}
  </svg>
  <div class="heatmap-legend">
    <span class="heatmap-swatch"></span><span>No lessons</span>
    <span class="heatmap-swatch active"></span><span>Completed a lesson</span>
  </div>
</div>
