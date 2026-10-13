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
          <a class="user-menu-item" href={loginUrl('google', returnUrl)}>
            <svg class="user-menu-icon" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
              <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
            </svg>
            Continue with Google
          </a>
          <a class="user-menu-item" href={loginUrl('github', returnUrl)}>
            <svg class="user-menu-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            Continue with GitHub
          </a>
        </div>
      {/if}
    {/if}
  </div>
{/if}
