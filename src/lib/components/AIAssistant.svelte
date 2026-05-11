<script lang="ts">
  import { fade, fly } from 'svelte/transition';

  interface Message {
    role: 'user' | 'assistant';
    content: string;
  }

  let isOpen = $state(false);
  let input = $state('');
  let messages = $state<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Abdurrahaman's AI assistant. Ask me anything about his skills, projects, or experience! 👋",
    },
  ]);
  let loading = $state(false);
  let chatEl = $state<HTMLDivElement>();

  const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY;

  const SYSTEM_CONTEXT = `You are an AI assistant for Abdurrahaman Jamiu's developer portfolio. Answer questions about him concisely and professionally.

Here is everything you know about Abdurrahaman:

NAME: Abdurrahaman Jamiu
TITLE: Frontend Engineer
LOCATION: Abuja, Nigeria
STATUS: Available for freelance and full-time roles
EMAIL: abduurrahamanjamiu75@outlook.com
GITHUB: github.com/masterultron
INSTAGRAM: @theeabdurrahaman.dev
LINKEDIN: linkedin.com/in/abdurrahaman-jamiu-14131524b

EDUCATION:
- B.Eng. Computer Engineering, Federal University of Technology Minna, 2025
- Diploma in Java - NIIT
- Software Engineering - ALX Africa
- HNG Frontend Wizard (Stage 5)
- Web Security Fundamentals

EXPERIENCE:
- 2024 - Present: Frontend Developer (Freelance/Contract) — Building enterprise-grade web solutions
- 2023 - 2024: Frontend Engineer — Specialized in Svelte and React ecosystems

SKILLS:
- Frontend: React, Svelte/SvelteKit, Next.js, TypeScript, JavaScript
- Styling: Tailwind CSS, GSAP, Framer Motion
- Backend: Node.js, Laravel, PHP
- Database: PostgreSQL, SQLite, MySQL
- Security: Web Crypto API, JWT, E2EE
- Testing: Vitest, Playwright
- Tools: Git, Docker, Vite, Chrome Extensions

PROJECTS:
1. WhisperBox - End-to-end encrypted messaging app. Built with Next.js, RSA-OAEP key exchange, AES-GCM encryption, WebSockets, IndexedDB for private key storage. Server never sees plaintext messages.
2. AI Page Summarizer - Chrome Extension (Manifest V3) that summarizes any webpage using Cohere AI. Features caching, dark mode, secure API key storage.
3. Ajoke Gold International - Luxury jewelry e-commerce with Paystack and PayPal payment integration, Resend email notifications, WhatsApp inquiry system. Deployed on Netlify.
4. Habit Tracker PWA - Progressive Web App with streak tracking, offline support, local auth. Fully tested with Vitest and Playwright.
5. Invoice Management App - Full-featured invoice manager with dark mode, status filtering, localStorage persistence.
6. FaL360 Warehouse Module - Enterprise ERP module built with Laravel, Inertia.js, React. Features weighbridge operations, stock management.
7. This Portfolio - Built with SvelteKit, TailwindCSS, interactive terminal, particle animations.

Keep answers short (2-4 sentences max). Be friendly and professional. If asked something you don't know, say you're not sure but direct them to contact Abdurrahaman directly.`;

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    input = '';
    messages = [...messages, { role: 'user', content: userMessage }];
    loading = true;

    setTimeout(() => {
      chatEl?.scrollTo({ top: chatEl.scrollHeight, behavior: 'smooth' });
    }, 50);

    try {
      const response = await fetch('https://api.cohere.com/v2/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${COHERE_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'command-r',
          messages: [
            { role: 'system', content: SYSTEM_CONTEXT },
            ...messages.map(m => ({ role: m.role, content: m.content })),
          ],
        }),
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      const reply = data.message?.content?.[0]?.text || "Sorry, I couldn't get a response. Please try again.";

      messages = [...messages, { role: 'assistant', content: reply }];
    } catch {
      messages = [...messages, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Feel free to reach out to Abdurrahaman directly at abduurrahamanjamiu75@outlook.com",
      }];
    } finally {
      loading = false;
      setTimeout(() => {
        chatEl?.scrollTo({ top: chatEl.scrollHeight, behavior: 'smooth' });
      }, 50);
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const suggestions = [
    'What are his best projects?',
    'What tech does he use?',
    'Is he available for hire?',
    'Tell me about WhisperBox',
  ];
</script>

<!-- Floating button -->
<div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

  {#if isOpen}
    <!-- Chat window -->
    <div
      transition:fly={{ y: 20, duration: 300 }}
      class="w-[360px] md:w-[400px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col"
      style="height: 520px;"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-lg">
            🤖
          </div>
          <div>
            <p class="text-white font-bold text-sm">AI Assistant</p>
            <p class="text-white/70 text-xs">Ask about Abdurrahaman</p>
          </div>
        </div>
        <button
          onclick={() => isOpen = false}
          class="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>

      <!-- Messages -->
      <div
        bind:this={chatEl}
        class="flex-1 overflow-y-auto p-4 space-y-3"
      >
        {#each messages as msg}
          <div class="flex {msg.role === 'user' ? 'justify-end' : 'justify-start'}">
            {#if msg.role === 'assistant'}
              <div class="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-sm flex-shrink-0 mr-2 mt-0.5">
                🤖
              </div>
            {/if}
            <div
              class="max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed {
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm'
              }"
            >
              {msg.content}
            </div>
          </div>
        {/each}

        {#if loading}
          <div class="flex justify-start">
            <div class="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-sm flex-shrink-0 mr-2">
              🤖
            </div>
            <div class="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
              <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms" />
              <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms" />
              <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms" />
            </div>
          </div>
        {/if}

        <!-- Suggestions (only show when just the welcome message) -->
        {#if messages.length === 1}
          <div class="flex flex-wrap gap-2 mt-2">
            {#each suggestions as suggestion}
              <button
                onclick={() => { input = suggestion; sendMessage(); }}
                class="text-xs px-3 py-1.5 bg-indigo-50 dar