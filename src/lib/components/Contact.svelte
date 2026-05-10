<script lang="ts">
  let name = '';
  let email = '';
  let message = '';
  let status: 'idle' | 'sending' | 'success' | 'error' = 'idle';
  let errors: Record<string, string> = {};

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

    // Simulate sending — replace with your email service
    await new Promise(r => setTimeout(r, 1500));

    // Open mail client as fallback
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.open(`mailto:you@email.com?subject=${subject}&body=${body}`);

    status = 'success';
    name = ''; email = ''; message = '';
    setTimeout(() => status = 'idle', 4000);
  }
</script>

<section id="contact" class="py-24 bg-white dark:bg-gray-950">
  <div class="max-w-4xl mx-auto px-6">
    <div class="text-center mb-16">
      <span class="text-indigo-500 font-semibold text-sm uppercase tracking-widest">Get In Touch</span>
      <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-2">
        Let's Work Together
      </h2>
      <p class="text-gray-500 dark:text-gray-500 mt-4 max-w-xl mx-auto">
        Have a project in mind? Let's build something great together.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Contact info -->
      <div class="space-y-8">
        <div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Let's connect</h3>
          <p class="text-gray-500 dark:text-gray-500 leading-relaxed">
            I'm currently available for freelance work and full-time opportunities.
            Drop me a message and I'll get back to you within 24 hours.
          </p>
        </div>

        <div class="space-y-4">
          {#each [
            { icon: '✉️', label: 'Email', value: 'you@email.com', href: 'mailto:you@email.com' },
            { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/you', href: 'https://linkedin.com/in/you' },
            { icon: '⌨️', label: 'GitHub', value: 'github.com/you', href: 'https://github.com/you' },
          ] as item}
            
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/30 border border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group"
            >
              <span class="text-2xl">{item.icon}</span>
              <div>
                <p class="text-xs text-gray-400 uppercase tracking-wider">{item.label}</p>
                <p class="text-gray-700 dark:text-gray-300 font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.value}</p>
              </div>
            </a>
          {/each}
        </div>
      </div>

      <!-- Contact form -->
      <form
        on:submit={handleSubmit}
        class="space-y-5"
        novalidate
      >
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            bind:value={name}
            placeholder="John Doe"
            class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all {errors.name ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'}"
          />
          {#if errors.name}
            <p class="text-red-500 text-xs mt-1">{errors.name}</p>
          {/if}
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            bind:value={email}
            placeholder="john@example.com"
            class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all {errors.email ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'}"
          />
          {#if errors.email}
            <p class="text-red-500 text-xs mt-1">{errors.email}</p>
          {/if}
        </div>

        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            bind:value={message}
            rows="5"
            placeholder="Tell me about your project..."
            class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none {errors.message ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'}"
          />
          {#if errors.message}
            <p class="text-red-500 text-xs mt-1">{errors.message}</p>
          {/if}
        </div>

        <button
          type="submit"
          disabled={status === 'sending' || status === 'success'}
          class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {#if status === 'sending'}
            <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sending...
          {:else if status === 'success'}
            ✅ Message Sent!
          {:else}
            Send Message →
          {/if}
        </button>
      </form>
    </div>
  </div>
</section>