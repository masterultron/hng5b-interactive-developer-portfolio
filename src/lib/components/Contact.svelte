<script lang="ts">
  // Svelte 5 State Runes
  let name = $state('');
  let email = $state('');
  let message = $state('');
  let status = $state<'idle' | 'sending' | 'success' | 'error'>('idle');
  let errors = $state<Record<string, string>>({});

  function validate() {
    errors = {};
    if (!name.trim()) errors.name = 'Name is required';
    if (!email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Invalid email';
    if (!message.trim()) errors.message = 'Message is required';
    else if (message.trim().length < 10) errors.message = 'Message too short';
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!validate()) return;

    status = 'sending';

    // Simulate sending delay
    await new Promise(r => setTimeout(r, 1500));

    // Open mail client as fallback
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.open(`mailto:abdurrahamanjamiu@email.com?subject=${subject}&body=${body}`);

    status = 'success';
    name = ''; email = ''; message = '';
    
    // Reset status after a few seconds
    setTimeout(() => status = 'idle', 4000);
  }
</script>

<section id="contact" class="py-24 bg-white dark:bg-slate-950">
  <div class="max-w-3xl mx-auto px-6">
    <div class="text-center mb-16">
      <span class="text-indigo-500 font-semibold text-sm uppercase tracking-widest">Get In Touch</span>
      <h2 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-2">
        Let's Work Together
      </h2>
      <p class="text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto">
        Have a project in mind? Drop me a message and I'll get back to you within 24 hours.
      </p>
    </div>

    <div class="flex flex-col gap-16">
      
      <form
        onsubmit={handleSubmit}
        class="space-y-6 bg-slate-50 dark:bg-slate-900/50 p-8 md:p-10 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm"
        novalidate
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label for="name" class="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              bind:value={name}
              placeholder="Abdurrahaman Jamiu"
              class="w-full px-4 py-3.5 bg-white dark:bg-slate-950 border rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all {errors.name ? 'border-red-400' : 'border-slate-200 dark:border-slate-800'}"
            />
            {#if errors.name}
              <p class="text-red-500 text-xs mt-1">{errors.name}</p>
            {/if}
          </div>

          <div class="space-y-2">
            <label for="email" class="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              bind:value={email}
              placeholder="jamiu@example.com"
              class="w-full px-4 py-3.5 bg-white dark:bg-slate-950 border rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all {errors.email ? 'border-red-400' : 'border-slate-200 dark:border-slate-800'}"
            />
            {#if errors.email}
              <p class="text-red-500 text-xs mt-1">{errors.email}</p>
            {/if}
          </div>
        </div>

        <div class="space-y-2">
          <label for="message" class="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Message
          </label>
          <textarea
            id="message"
            bind:value={message}
            rows="5"
            placeholder="Tell me about your project..."
            class="w-full px-4 py-3.5 bg-white dark:bg-slate-950 border rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none {errors.message ? 'border-red-400' : 'border-slate-200 dark:border-slate-800'}"
          ></textarea>
          {#if errors.message}
            <p class="text-red-500 text-xs mt-1">{errors.message}</p>
          {/if}
        </div>

        <button
          type="submit"
          disabled={status === 'sending' || status === 'success'}
          class="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-bold rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/20"
        >
          {#if status === 'sending'}
            <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sending...
          {:else if status === 'success'}
            <span>✅ Message Sent Successfully</span>
          {:else}
            <span>Send Message</span>
            <span class="text-xl">→</span>
          {/if}
        </button>
      </form>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {#each [
          { icon: '✉️', label: 'Email', value: 'Mail', href: 'mailto:abduurrahamanjamiu75@outlook.com' },
          { icon: '💼', label: 'LinkedIn', value: 'LinkedIn', href: 'https://www.linkedin.com/in/abdurrahaman-jamiu-14131524b/?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
          { icon: '⌨️', label: 'GitHub', value: 'GitHub', href: 'https://github.com/masterultron' },
        ] as item}
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            class="flex flex-col items-center text-center gap-3 p-6 bg-transparent rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800 group"
          >
            <span class="text-3xl mb-1">{item.icon}</span>
            <div>
              <p class="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">{item.label}</p>
              <p class="text-slate-700 dark:text-slate-300 font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {item.value}
              </p>
            </div>
          </a>
        {/each}
      </div>

    </div>
  </div>
</section>