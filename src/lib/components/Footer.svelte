<footer class="bg-gray-950 border-t border-gray-800 py-8">
  <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
    <p class="text-gray-500 text-sm">
      © {new Date().getFullYear()} Your Name. Built with
      <span class="text-orange-500 font-semibold">Svelte</span> &
      <span class="text-cyan-500 font-semibold">TailwindCSS</span>
    </p>
    <div class="flex items-center gap-6">
      {#each [
        { href: 'https://github.com/you', label: 'GitHub' },
        { href: 'https://linkedin.com/in/you', label: 'LinkedIn' },
        { href: 'mailto:you@email.com', label: 'Email' },
      ] as link}
        
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-500 hover:text-indigo-400 text-sm transition-colors"
        >
          {link.label}
        </a>
      {/each}
    </div>
  </div>
</footer>