<script lang="ts">
  import { onMount } from 'svelte';
  import { loginUrl } from '../lib/api';
  import { me, initSession, logout } from '../lib/session';

  let open = $state(false);
  let root: HTMLDivElement | undefined = $state();

  // Rendered with client:only, so `location` is always available.
  const returnUrl = location.pathname;

  onMount(() => {
    initSession();
  });

  function closeOnOutsideClick(e: MouseEvent) {
    if (open && root && !root.contains(e.target as Node)) {
      open = false;
    }
  }
</script>

<svelte:window onclick={closeOnOutsideClick} />

{#if $me}
  <div class="user-menu" bind:this={root}>
    {#if $me.authenticated}
      <button class="user-menu-trigger" onclick={() => (open = !open)} aria-label="Account menu" aria-expanded={open}>
        {#if $me.avatarUrl}
          <img class="user-avatar" src={$me.avatarUrl} alt="" referrerpolicy="no-referrer" />
        {:else}
          <span class="user-avatar user-avatar-fallback">{($me.name ?? $me.email ?? '?').charAt(0).toUpperCase()}</span>
        {/if}
      </button>
      {#if open}
        <div class="user-menu-dropdown">
          <div class="user-menu-identity">
            {#if $me.name}<strong>{$me.name}</strong>{/if}
            {#if $me.email}<span>{$me.email}</span>{/if}
          </div>
          <button class="user-menu-item" onclick={logout}>Sign out</button>
        </div>
      {/if}
    {:else}
      <button class="user-menu-trigger user-menu-signin" onclick={() => (open = !open)} aria-expanded={open}>
        Sign in
      </button>
      {#if open}
        <div class="user-menu-dropdown">
          <a class="user-menu-item" href={loginUrl('google', returnUrl)}>Continue with Google</a>
          <a class="user-menu-item" href={loginUrl('github', returnUrl)}>Continue with GitHub</a>
        </div>
      {/if}
    {/if}
  </div>
{/if}
