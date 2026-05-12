<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import { onMount } from 'svelte';
  import '../app.css';

  let { children } = $props();

  // Sync store → html class immediately and on every change
  $effect(() => {
    // $effect runs on the client during hydration
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', $theme === 'dark');
    }
  });

  onMount(() => {
    theme.init();
  });
</script>

{@render children()}