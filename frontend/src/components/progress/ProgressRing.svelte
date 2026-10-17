<script lang="ts">
  let { percent, size = 160, stroke = 14 }: { percent: number; size?: number; stroke?: number } = $props();

  const radius = $derived((size - stroke) / 2);
  const circumference = $derived(2 * Math.PI * radius);
  // Keep a sliver visible for tiny-but-nonzero progress, so 0.3% doesn't look like nothing.
  const shown = $derived(percent > 0 ? Math.max(percent, 1) : 0);
</script>

<svg class="progress-ring" width={size} height={size} viewBox="0 0 {size} {size}" role="img" aria-label="{percent.toFixed(1)}% complete">
  <circle class="progress-ring-track" cx={size / 2} cy={size / 2} r={radius} stroke-width={stroke} fill="none" />
  <circle
    class="progress-ring-value"
    cx={size / 2}
    cy={size / 2}
    r={radius}
    stroke-width={stroke}
    fill="none"
    stroke-linecap="round"
    stroke-dasharray={circumference}
    stroke-dashoffset={circumference * (1 - shown / 100)}
    transform="rotate(-90 {size / 2} {size / 2})"
  />
  <text class="progress-ring-percent" x="50%" y="47%" text-anchor="middle" dominant-baseline="middle">
    {percent === 0 ? 0 : percent < 10 ? percent.toFixed(1) : Math.round(percent)}%
  </text>
  <text class="progress-ring-caption" x="50%" y="66%" text-anchor="middle" dominant-baseline="middle">complete</text>
</svg>
