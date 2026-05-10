<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import { onMount } from 'svelte';

  let scrolled = false;
  let menuOpen = false;

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#terminal', label: 'Terminal' },
    { href: '#contact', label: 'Contact' },
  ];

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function handleNav(href: string) {
    menuOpen = false;
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<nav
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled
    ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-800/50'
    : 'bg-transparent'}"
>
  <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
    <!-- Logo -->
    
      href="#hero"
      on:click|preventDefault={() => handleNav('#hero')}
      class="text-xl font-bold gradient-text"
    >
      &lt;YourName /&gt;
    </a>

    <!-- Desktop nav -->
    <div class="hidden md:flex items-center gap-8">
      {#each navLinks as link}
        
          href={link.href}
          on:click|preventDefault={() => handleNav(link.href)}
          class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
        >
          {link.label}
        </a>
      {/each}

      <!-- Theme toggle -->
      <button
        on:click={() => theme.toggle()}
        class="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        {#if $theme === 'dark'}
          <span class="text-lg">☀️</span>
        {:else}
          <span class="text-lg">🌙</span>
        {/if}
      </button>
    </div>

    <!-- Mobile menu button -->
    <div class="flex items-center gap-3 md:hidden">
      <button
        on:click={() => theme.toggle()}
        class="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
        aria-label="Toggle theme"
      >
        {$theme === 'dark' ? '☀️' : '🌙'}
      </button>
      <button
        on:click={() => (menuOpen = !menuOpen)}
        class="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center gap-1.5"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span class="w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all {menuOpen ? 'rotate-45 translate-y-2' : ''}" />
        <span class="w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all {menuOpen ? 'opacity-0' : ''}" />
        <span class="w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all {menuOpen ? '-rotate-45 -translate-y-2' : ''}" />
      </button>
    </div>
  </div>

  <!-- Mobile menu -->
  {#if menuOpen}
    <div class="md:hidden bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-6 py-4 space-y-3">
      {#each navLinks as link}
        
          href={link.href}
          on:click|preventDefault={() => handleNav(link.href)}
          class="block text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-500 py-2"
        >
          {link.label}
        </a>
      {/each}
    </div>
  {/if}
</nav>