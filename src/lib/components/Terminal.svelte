<script lang="ts">
  import { onMount } from 'svelte';
  import { tick } from 'svelte';

  interface Line {
    type: 'input' | 'output' | 'error' | 'success';
    text: string;
  }

  let input = '';
  let lines: Line[] = [];
  let terminalEl: HTMLDivElement;
  let inputEl: HTMLInputElement;
  let history: string[] = [];
  let historyIndex = -1;

  const commands: Record<string, () => string | string[]> = {
    help: () => [
      '┌─────────────────────────────────────┐',
      '│  Available Commands                 │',
      '├─────────────────────────────────────┤',
      '│  about       → About me             │',
      '│  skills      → My tech stack        │',
      '│  projects    → My projects          │',
      '│  contact     → Contact info         │',
      '│  experience  → Work experience      │',
      '│  education   → Education            │',
      '│  clear       → Clear terminal       │',
      '│  help        → Show this menu       │',
      '└─────────────────────────────────────┘',
    ],
    about: () => [
      '👤 About Me',
      '──────────────────────────────────────',
      'Name    : Your Full Name',
      'Title   : Frontend Engineer',
      'Location: Lagos, Nigeria 🇳🇬',
      'Status  : Available for work ✅',
      '',
      'I build immersive web experiences with',
      'modern tools. Passionate about perf,',
      'accessibility, and beautiful UIs.',
    ],
    skills: () => [
      '⚡ Tech Stack',
      '──────────────────────────────────────',
      '▸ Frontend  : React, Svelte, Next.js',
      '▸ Styling   : Tailwind, GSAP, Framer',
      '▸ Backend   : Node.js, Laravel',
      '▸ Database  : PostgreSQL, SQLite',
      '▸ Security  : Web Crypto API, JWT',
      '▸ Testing   : Vitest, Playwright',
      '▸ Tools     : Git, Docker, Vite',
    ],
    projects: () => [
      '🚀 Projects',
      '──────────────────────────────────────',
      '1. WhisperBox — E2EE Messaging App',
      '2. AI Page Summarizer — Chrome Ext',
      '3. Ajoke Gold — Luxury E-Commerce',
      '4. Habit Tracker — PWA',
      '5. Invoice App — Management Tool',
      '6. FaL360 — Enterprise ERP Module',
      '',
      'Type "open <number>" to view project',
    ],
    contact: () => [
      '📬 Contact',
      '──────────────────────────────────────',
      'Email  : you@email.com',
      'GitHub : github.com/yourusername',
      'Twitter: @yourusername',
      'LinkedIn: linkedin.com/in/yourusername',
      '',
      '→ Open to freelance & full-time roles',
    ],
    experience: () => [
      '💼 Experience',
      '──────────────────────────────────────',
      '2024 - Present',
      '  Frontend Developer @ Company Name',
      '  Built enterprise web applications',
      '',
      '2023 - 2024',
      '  Junior Developer @ Startup Name',
      '  Developed React + Node.js apps',
    ],
    education: () => [
      '🎓 Education',
      '──────────────────────────────────────',
      'B.Sc. Computer Science',
      'University Name, 2023',
      '',
      'Certifications:',
      '▸ HNG Frontend Wizard (Stage 5)',
      '▸ Web Security Fundamentals',
    ],
    clear: () => {
      lines = [];
      return '';
    },
    whoami: () => 'yourname — frontend engineer',
    date: () => new Date().toString(),
    pwd: () => '/home/yourname/portfolio',
    ls: () => ['about.txt', 'projects/', 'skills.json', 'resume.pdf', 'contact.md'],
  };

  function processCommand(cmd: string) {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    history = [cmd, ...history.slice(0, 49)];
    historyIndex = -1;

    lines = [...lines, { type: 'input', text: `$ ${cmd}` }];

    const [base, ...args] = trimmed.split(' ');

    if (base === 'open' && args[0]) {
      const num = parseInt(args[0]);
      const projectNames = [
        'whisperbox', 'ai-summarizer', 'ajoke-gold',
        'habit-tracker', 'invoice-app', 'fal360'
      ];
      if (num >= 1 && num <= projectNames.length) {
        lines = [...lines, { type: 'success', text: `→ Opening project ${num}...` }];
        setTimeout(() => {
          document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
        return;
      }
    }

    if (base === 'sudo') {
      lines = [...lines, { type: 'error', text: 'Permission denied — nice try 😄' }];
      return;
    }

    const handler = commands[base];
    if (handler) {
      const result = handler();
      if (result) {
        const outputs = Array.isArray(result) ? result : [result];
        outputs.forEach(text => {
          if (text) lines = [...lines, { type: 'output', text }];
        });
      }
    } else if (trimmed) {
      lines = [...lines, {
        type: 'error',
        text: `Command not found: ${base}. Type 'help' for available commands.`
      }];
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      processCommand(input);
      input = '';
      tick().then(() => {
        terminalEl?.scrollTo({ top: terminalEl.scrollHeight, behavior: 'smooth' });
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        input = history[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input = history[historyIndex];
      } else {
        historyIndex = -1;
        input = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const cmds = Object.keys(commands);
      const match = cmds.find(c => c.startsWith(input.toLowerCase()));
      if (match) input = match;
    }
  }

  onMount(() => {
    // Boot sequence
    const bootLines = [
      { type: 'success' as const, text: '  ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗  ██████╗ ' },
      { type: 'success' as const, text: 'Welcome to YourName Portfolio Terminal v1.0.0' },
      { type: 'output' as const, text: '──────────────────────────────────────────────' },
      { type: 'output' as const, text: 'Type "help" to see available commands.' },
      { type: 'output' as const, text: '' },
    ];

    bootLines.forEach((line, i) => {
      setTimeout(() => {
        lines = [...lines, line];
      }, i * 200);
    });
  });
</script>

<section id="terminal" class="py-24 bg-gray-50 dark:bg-gray-900">
  <div class="max-w-4xl mx-auto px-6">
    <div class="text-center mb-12">
      <span class="text-indigo-500 font-semibold text-sm uppercase tracking-widest">Interactive</span>
      <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-2">
        Terminal
      </h2>
      <p class="text-gray-500 dark:text-gray-500 mt-4">
        Explore my portfolio through an interactive terminal. Type <code class="text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded">help</code> to get started.
      </p>
    </div>

    <!-- Terminal window -->
    <div class="bg-gray-900 dark:bg-gray-950 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 dark:border-gray-800">
      <!-- Title bar -->
      <div class="bg-gray-800 dark:bg-gray-900 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
        <div class="flex gap-2">
          <div class="w-3 h-3 rounded-full bg-red-500" />
          <div class="w-3 h-3 rounded-full bg-yellow-500" />
          <div class="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span class="ml-2 text-gray-400 text-sm font-mono">portfolio — terminal</span>
        <span class="ml-auto text-xs text-gray-600 font-mono">bash</span>
      </div>

      <!-- Terminal body -->
      <div
        bind:this={terminalEl}
        class="p-6 font-mono text-sm h-96 overflow-y-auto space-y-1"
        on:click={() => inputEl?.focus()}
      >
        {#each lines as line}
          <div class="{
            line.type === 'input' ? 'text-indigo-400' :
            line.type === 'error' ? 'text-red-400' :
            line.type === 'success' ? 'text-green-400' :
            'text-gray-300'
          } leading-relaxed whitespace-pre-wrap break-all">
            {line.text}
          </div>
        {/each}

        <!-- Input line -->
        <div class="flex items-center gap-2 text-indigo-400">
          <span class="flex-shrink-0">
            <span class="text-green-400">yourname</span>
            <span class="text-gray-500">@</span>
            <span class="text-blue-400">portfolio</span>
            <span class="text-gray-500">:~$</span>
          </span>
          <input
            bind:this={inputEl}
            bind:value={input}
            on:keydown={handleKeydown}
            class="flex-1 bg-transparent outline-none text-gray-200 caret-indigo-400 min-w-0"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>

    <p class="text-center text-sm text-gray-400 dark:text-gray-600 mt-4">
      💡 Pro tip: Use ↑↓ arrows for history, Tab for autocomplete
    </p>
  </div>
</section>