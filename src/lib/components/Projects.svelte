<script lang="ts">
  import { projects } from '$lib/data/projects';
  import type { Project } from '$lib/data/projects';
  import { fade, fly } from 'svelte/transition';

  let activeFilter: string = 'all';
  let selectedProject: Project | null = null;

  const filters = [
    { id: 'all', label: 'All Work' },
    { id: 'featured', label: 'Featured' },
    { id: 'web', label: 'Web' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'tool', label: 'Tools' },
  ];

  $: filtered = activeFilter === 'all'
    ? projects
    : activeFilter === 'featured'
    ? projects.filter(p => p.featured)
    : projects.filter(p => p.category === activeFilter);
</script>

<section id="projects" class="bg-white dark:bg-[#0f172a]">
  <div class="max-w-7xl mx-auto px-6 py-24 md:py-32">

    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
      <div>
        <span class="text-indigo-500 font-semibold text-sm uppercase tracking-[0.2em]">Selected Work</span>
        <h2 class="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mt-2 leading-tight">
          Projects that<br />
          <span class="gradient-text">ship & scale</span>
        </h2>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-2">
        {#each filters as filter}
          <button
            on:click={() => activeFilter = filter.id}
            class="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 {
              activeFilter === filter.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }"
          >
            {filter.label}
          </button>
        {/each}
      </div>
    </div>

    <!-- Bento Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
      {#each filtered as project, i (project.id)}
        <article
          class="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl {
            i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
          }"
          style="min-height: {i === 0 ? '480px' : '280px'}"
          on:click={() => selectedProject = project}
          on:keydown={(e) => e.key === 'Enter' && (selectedProject = project)}
          tabindex="0"
          role="button"
          aria-label="View {project.title}"
        >
          <!-- Background gradient -->
          <div class="absolute inset-0 bg-gradient-to-br {project.color} opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

          <!-- Noise texture -->
          <div class="absolute inset-0 opacity-20" style="background-image: url('data:image/svg+xml,...')" />

          <!-- Big emoji -->
          <div class="absolute top-6 right-6 text-5xl md:text-6xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500 select-none">
            {project.emoji}
          </div>

          <!-- Content -->
          <div class="relative z-10 p-7 h-full flex flex-col justify-end">
            <!-- Year badge -->
            <span class="inline-block mb-3 text-xs font-bold text-white/70 uppercase tracking-widest">
              {project.year}
            </span>

            <h3 class="text-xl md:text-2xl font-black text-white mb-2 leading-tight">
              {project.title}
            </h3>
            <p class="text-white/70 text-sm leading-relaxed mb-4 {i === 0 ? 'max-w-md' : ''}">
              {project.description}
            </p>

            <!-- Tech pills -->
            <div class="flex flex-wrap gap-2 mb-5">
              {#each project.tech.slice(0, i === 0 ? 5 : 3) as tech}
                <span class="px-2.5 py-1 bg-white/20 text-white text-xs font-semibold rounded-lg backdrop-blur-sm">
                  {tech}
                </span>
              {/each}
            </div>

            <!-- Links -->
            <div
              class="flex items-center gap-4"
              on:click|stopPropagation
              on:keydown|stopPropagation
            >
              {#if project.live}
                
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-1.5 text-sm font-bold text-white hover:text-white/80 transition-colors"
                >
                  Live Demo
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7,7 17,7 17,17"/>
                  </svg>
                </a>
              {/if}
              {#if project.github}
                
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm font-bold text-white/70 hover:text-white transition-colors"
                >
                  GitHub →
                </a>
              {/if}
            </div>
          </div>

          <!-- Hover overlay -->
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </article>
      {/each}
    </div>
  </div>
</section>

<!-- Project Detail Modal -->
{#if selectedProject}
  <div
    class="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/70 backdrop-blur-md"
    on:click={() => selectedProject = null}
    on:keydown={(e) => e.key === 'Escape' && (selectedProject = null)}
    role="dialog"
    aria-modal="true"
    aria-label={selectedProject.title}
    tabindex="-1"
    transition:fade={{ duration: 200 }}
  >
    <div
      class="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
      on:click|stopPropagation
      on:keydown|stopPropagation
      transition:fly={{ y: 50, duration: 300 }}
    >
      <!-- Modal hero -->
      <div class="h-52 bg-gradient-to-br {selectedProject.color} rounded-t-3xl flex items-center justify-center text-7xl">
        {selectedProject.emoji}
      </div>

      <div class="p-8">
        <div class="flex items-start justify-between mb-4">
          <div>
            <span class="text-xs text-slate-400 uppercase tracking-widest">{selectedProject.year} · {selectedProject.category}</span>
            <h2 class="text-2xl font-black text-slate-900 dark:text-white mt-1">{selectedProject.title}</h2>
          </div>
          <button
            on:click={() => selectedProject = null}
            class="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            aria-label="Close"
          >✕</button>
        </div>

        <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          {selectedProject.longDescription}
        </p>

        <div class="mb-8">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Tech Stack</h3>
          <div class="flex flex-wrap gap-2">
            {#each selectedProject.tech as tech}
              <span class="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-sm font-semibold rounded-lg border border-indigo-100 dark:border-indigo-900">
                {tech}
              </span>
            {/each}
          </div>
        </div>

        <div class="flex gap-3">
          {#if selectedProject.live}
            
              href={selectedProject.live}
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-center transition-colors"
            >
              Live Demo →
            </a>
          {/if}
          {#if selectedProject.github}
            
              href={selectedProject.github}
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 py-3.5 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-2xl text-center hover:border-indigo-400 transition-colors"
            >
              GitHub
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}