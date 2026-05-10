<footer class="bg-gray-950 border-t border-gray-800 py-8">
  <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
    <p class="text-gray-500 text-sm">
      © {new Date().getFullYear()} Abdurrahaman Jamiu. Built with
      <span class="text-orange-500 font-semibold">Svelte</span> &
      <span class="text-cyan-500 font-semibold">TailwindCSS</span>
    </p>
    <div class="flex items-center gap-6">
      {#each [
        { href: 'https://github.com/masterultron', label: 'GitHub' },
        { href: 'https://www.linkedin.com/in/abdurrahaman-jamiu-14131524b/?utm_source=share_via&utm_content=profile&utm_medium=member_ios', label: 'LinkedIn' },
        { href: 'https://www.instagram.com/theeabdurrahaman.dev?igsh=M3l2eHIyMWtra2hn&utm_source=qr', label: 'Instagram' },
        { href: 'mailto:abduurrahamanjamiu75@outlook.com', label: 'Email' },
      ] as link}
        
        <a
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