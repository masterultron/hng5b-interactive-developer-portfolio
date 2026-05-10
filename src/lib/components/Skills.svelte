<script lang="ts">
  import { onMount } from 'svelte';
  import { skills, techTags } from '$lib/data/skills';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  let sectionEl: HTMLElement;
  let visible = false;
  let activeCategory = 'all';

  const categories = ['all', 'frontend', 'backend', 'tools'];

  $: filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) visible = true; },
      { threshold: 0.2 }
    );
    observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section
  id="skills"
  bind:this={sectionEl}
  class="py-24 bg-gray-50 dark:bg-gray-900"
>
  <div class="max-w-6xl mx-auto px-6">
    <!-- Header -->
    <div class="text-center mb-16">
      <span class="text-indigo-500 font-semibold text-sm uppercase tracking-widest">Expertise</span>
      <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-2">
        Skills & Technologies
      </h2>
      <p class="text-gray-500 dark:text-gray-500 mt-4 max-w-xl mx-auto">
        Tools and technologies I use to bring ideas to life
      </p>
    </div>

    <!-- Category filter -->
    <div class="flex flex-wrap justify-center gap-3 mb-12">
      {#each categories as cat}
        <button
          on:click={() => activeCategory = cat}
          class="px-5 py-2 rounded-full text-sm font-medium capitalize transition-all {
            activeCategory === cat
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-indigo-500 border border-gray-200 dark:border-gray-700'
          }"
        >
          {cat}
        </button>
      {/each}
    </div>

    <!-- Skills grid with progress bars -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
      {#each filteredSkills as skill, i}
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-lg"
          style="animation-delay: {i * 100}ms"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <span class="text-2xl">{skill.icon}</span>
              <span class="font-semibold text-gray-900 dark:text-white">{skill.name}</span>
            </div>
            <span class="text-sm font-bold text-indigo-500">{skill.level}%</span>
          </div>
          <div class="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
              style="width: {visible ? skill.level : 0}%"
            />
          </div>
        </div>
      {/each}
    </div>

    <!-- Tech tags cloud -->
    <div class="text-center">
      <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6">Also familiar with</h3>
      <div class="flex flex-wrap justify-center gap-3">
        {#each techTags as tag, i}
          <span
            class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition-all cursor-default"
            style="animation-delay: {i * 50}ms"
          >
            {tag}
          </span>
        {/each}
      </div>
    </div>
  </div>
</section>