<script lang="ts">
  import { projects } from '$lib/data/projects';
  import type { Project } from '$lib/data/projects';

  let activeFilter: string = 'all';
  let selectedProject: Project | null = null;

  const filters = ['all', 'web', 'fullstack', 'tool', 'mobile'];

  $: filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const categoryColors: Record<string, string> = {
    web: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    fullstack: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    tool: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    mobile: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
  };
</script>

<section id="projects" class="py-24 bg-white dark:bg-gray-950">
  <div class="max-w-6xl mx-auto px-6">
    <!-- Header -->
    <div class="text-center mb-16">
      <span class="text-indigo-500 font-semibold text-sm uppercase tracking-widest">Portfolio</span>
      <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-2">
        Featured Projects
      </h2>
      <p class="text-gray-500 dark:text-gray-500 mt-4 max-w-xl mx-auto">
        Real projects built with real users in mind
      </p>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap justify-center gap-3 mb-12">
      {#each filters as filter}
        <button
          on:click={() => activeFilter = filter}
          class="px-5 py-2 rounded-full text-sm font-medium capitalize transition-all {
            activeFilter === filter
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }"
        >
          {filter}
        </button>
      {/each}
    </div>

    <!-- Projects grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filtered as project (project.id)}
        <article
          class="group bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
          on:click={() => selectedProject = project}
          on:keydown={(e) => e.key === 'Enter' && (selectedProject = project)}
          tabindex="0"
          role="button"
          aria-label="View {project.title} details"
        >
          <!-- Project image placeholder -->
          <div class="h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-900/50 dark:to-purple-900/50 relative overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center text-5xl opacity-30 group-hover:scale-110 transition-transform duration-500">
              {#if project.category === 'web'}🌐
              {:else if project.category === 'fullstack'}⚡
              {:else if project.category === 'tool'}🔧
              {:else}📱{/if}
            </div>
            {#if project.featured}
              <span class="absolute top-3 right-3 px-2 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full">
                Featured
              </span>
            {/if}
          </div>

          <div class="p-6">
            <!-- Category badge -->
            <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize mb-3 {categoryColors[project.category]}">
              {project.category}
            </span>

            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-500 transition-colors">
              {project.title}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-500 mb-4 leading-relaxed">
              {project.description}
            </p>

            <!-- Tech stack -->
            <div class="flex flex-wrap gap-2 mb-4">
              {#each project.tech.slice(0, 3) as tech}
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-md">
                  {tech}
                </span>
              {/each}
              {#if project.tech.length > 3}
                <span class="px-2 py-1 text-gray-400 text-xs">+{project.tech.length - 3}</span>
              {/if}
            </div>

            <!-- Links -->
            <div class="flex items-center gap-4" on:click|stopPropagation on:keydown|stopPropagation>
              {#if project.live}
                
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
                >
                  Live Demo →
                </a>
              {/if}
              {#if project.github}
                
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  GitHub
                </a>
              {/if}
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<!-- Project Modal -->
{#if selectedProject}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    on:click={() => selectedProject = null}
    on:keydown={(e) => e.key === 'Escape' && (selectedProject = null)}
    role="dialog"
    aria-modal="true"
    aria-label={selectedProject.title}
    tabindex="-1"
  >
    <div
      class="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 dark:border-gray-800"
      on:click|stopPropagation
      on:keydown|stopPropagation
    >
      <div class="h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center text-6xl rounded-t-2xl">
        {#if selectedProject.category === 'web'}🌐
        {:else if selectedProject.category === 'fullstack'}⚡
        {:else if selectedProject.category === 'tool'}🔧
        {:else}📱{/if}
      </div>

      <div class="p-8">
        <div class="flex items-start justify-between mb-4">
          <h2 class="text-2xl font-black text-gray-900 dark:text-white">{selectedProject.title}</h2>
          <button
            on:click={() => selectedProject = null}
            class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            aria-label="Close modal"
          >✕</button>
        </div>

        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          {selectedProject.longDescription}
        </p>

        <div class="mb-6">
          <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Tech Stack</h3>
          <div class="flex flex-wrap gap-2">
            {#each selectedProject.tech as tech}
              <span class="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-sm font-medium rounded-lg border border-indigo-100 dark:border-indigo-900">
                {tech}
              </span>
            {/each}
          </div>
        </div>

        <div class="flex gap-4">
          {#if selectedProject.live}
            
              href={selectedProject.live}
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-center transition-colors"
            >
              Live Demo →
            </a>
          {/if}
          {#if selectedProject.github}
            
              href={selectedProject.github}
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl text-center hover:border-indigo-500 transition-colors"
            >
              GitHub
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}