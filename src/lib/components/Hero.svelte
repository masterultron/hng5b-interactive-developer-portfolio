<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';

  let visible = false;
  let typewriterText = '';
  let particleCanvas: HTMLCanvasElement;

  const roles = [
    'Frontend Engineer',
    'UI/UX Developer',
    'Full Stack Builder',
    'Open Source Contributor',
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  // Typewriter effect
  function typewrite() {
    const current = roles[roleIndex];
    if (!deleting) {
      typewriterText = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typewrite, 1800);
        return;
      }
    } else {
      typewriterText = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typewrite, deleting ? 60 : 100);
  }

  // Particle animation
  function initParticles() {
    const canvas = particleCanvas;
    const ctx = canvas.getContext('2d')!;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticles = () => {
      particles = Array.from({ length: 80 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();
    window.addEventListener('resize', () => { resize(); createParticles(); });

    return () => cancelAnimationFrame(animId);
  }

  onMount(() => {
    visible = true;
    setTimeout(typewrite, 500);
    const cleanup = initParticles();
    return cleanup;
  });
</script>

<section
  id="hero"
  class="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950"
>
  <!-- Particle canvas -->
  <canvas
    bind:this={particleCanvas}
    class="absolute inset-0 w-full h-full opacity-60"
    aria-hidden="true"
  />

  <!-- Gradient orbs -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-3xl" />
    <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl" />
  </div>

  <div class="relative z-10 max-w-4xl mx-auto px-6 text-center">
    {#if visible}
      <!-- Status badge -->
      <div
        in:fly={{ y: -20, duration: 600, delay: 200 }}
        class="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-full px-4 py-1.5 text-sm text-indigo-600 dark:text-indigo-400 mb-8"
      >
        <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        Available for work
      </div>

      <!-- Name -->
      <h1
        in:fly={{ y: 30, duration: 800, delay: 400 }}
        class="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-4 leading-tight"
      >
        Hi, I'm <span class="gradient-text">Your Name</span>
      </h1>

      <!-- Typewriter role -->
      <div
        in:fly={{ y: 30, duration: 800, delay: 600 }}
        class="text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-400 mb-6 h-10"
      >
        <span>{typewriterText}</span><span class="cursor-blink text-indigo-500">|</span>
      </div>

      <!-- Description -->
      <p
        in:fly={{ y: 30, duration: 800, delay: 800 }}
        class="text-lg text-gray-500 dark:text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        I build immersive web experiences with modern tools.
        Passionate about performance, accessibility, and beautiful interfaces
        that feel as good as they look.
      </p>

      <!-- CTAs -->
      <div
        in:fly={{ y: 30, duration: 800, delay: 1000 }}
        class="flex flex-wrap items-center justify-center gap-4 mb-12"
      >
        
          href="#projects"
          on:click|preventDefault={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
          class="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
        >
          View My Work
        </a>
        
          href="/resume.pdf"
          download
          class="px-8 py-3.5 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:scale-105"
        >
          Download CV
        </a>
      </div>

      <!-- Social links -->
      <div
        in:fade={{ duration: 800, delay: 1200 }}
        class="flex items-center justify-center gap-6"
      >
        {#each [
          { href: 'https://github.com/yourusername', label: 'GitHub', icon: '⌨️' },
          { href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn', icon: '💼' },
          { href: 'https://twitter.com/yourusername', label: 'Twitter', icon: '🐦' },
          { href: 'mailto:you@email.com', label: 'Email', icon: '✉️' },
        ] as social}
          
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
            aria-label={social.label}
          >
            <span>{social.icon}</span>
            <span class="hidden sm:inline">{social.label}</span>
          </a>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Scroll indicator -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
    <span class="text-xs uppercase tracking-widest">Scroll</span>
    <div class="w-5 h-8 border-2 border-gray-300 dark:border-gray-700 rounded-full flex justify-center pt-1.5">
      <div class="w-1 h-2 bg-indigo-500 rounded-full animate-bounce" />
    </div>
  </div>
</section>