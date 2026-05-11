<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';

  // Svelte 5 State Runes
  let scrolled = $state(false);
  let menuOpen = $state(false);

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#terminal', label: 'Terminal' },
    { href: '#contact', label: 'Contact' },
  ];

  onMount(() => {
    const handleScroll = () => {
      // Only keep the glassmorphism effect logic
      scrolled = window.scrollY > 20;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function handleNav(href: string) {
    menuOpen = false;
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>