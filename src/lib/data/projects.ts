export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  category: 'web' | 'mobile' | 'tool' | 'fullstack';
  live?: string;
  github?: string;
  image: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'whisperbox',
    title: 'WhisperBox',
    description: 'End-to-end encrypted messaging app with Web Crypto API',
    longDescription: 'A secure messaging application where the server never sees plaintext. Built with Next.js, RSA-OAEP key exchange, AES-GCM encryption, and IndexedDB for private key storage.',
    tech: ['Next.js', 'TypeScript', 'Web Crypto API', 'WebSocket', 'IndexedDB'],
    category: 'fullstack',
    live: 'https://your-whisperbox-url.vercel.app',
    github: 'https://github.com/yourusername/whisperbox',
    image: '/projects/whisperbox.png',
    featured: true,
  },
  {
    id: 'ai-summarizer',
    title: 'AI Page Summarizer',
    description: 'Chrome extension that summarizes any webpage using AI',
    longDescription: 'A Manifest V3 Chrome extension that extracts page content and summarizes it using Cohere AI. Features caching, dark mode, and secure API key storage.',
    tech: ['Chrome Extension', 'JavaScript', 'Cohere AI', 'Manifest V3'],
    category: 'tool',
    github: 'https://github.com/yourusername/ai-page-summarizer',
    image: '/projects/ai-summarizer.png',
    featured: true,
  },
  {
    id: 'ajoke-gold',
    title: 'Ajoke Gold International',
    description: 'Luxury jewelry e-commerce with E2EE payment gateway',
    longDescription: 'A premium jewelry e-commerce platform with Paystack and PayPal integration, Resend email notifications, and a royal inquiry system.',
    tech: ['React', 'TypeScript', 'Paystack', 'Resend', 'Tailwind'],
    category: 'web',
    live: 'https://ajoke-gold-international.netlify.app',
    github: 'https://github.com/yourusername/ajoke-gold',
    image: '/projects/ajoke-gold.png',
    featured: true,
  },
  {
    id: 'habit-tracker',
    title: 'Habit Tracker PWA',
    description: 'Progressive Web App for tracking daily habits with offline support',
    longDescription: 'A mobile-first PWA built with Next.js featuring local authentication, habit CRUD, streak calculation, and service worker caching for offline use.',
    tech: ['Next.js', 'TypeScript', 'PWA', 'Vitest', 'Playwright'],
    category: 'web',
    live: 'https://your-habit-tracker.vercel.app',
    github: 'https://github.com/yourusername/habit-tracker',
    image: '/projects/habit-tracker.png',
    featured: false,
  },
  {
    id: 'invoice-app',
    title: 'Invoice Management App',
    description: 'Full-featured invoice app with CRUD, filtering, and dark mode',
    longDescription: 'A responsive invoice management application with create/edit/delete functionality, status filtering, draft system, and persistent localStorage.',
    tech: ['React', 'TypeScript', 'Tailwind', 'localStorage'],
    category: 'web',
    live: 'https://your-invoice-app.vercel.app',
    github: 'https://github.com/yourusername/invoice-app',
    image: '/projects/invoice-app.png',
    featured: false,
  },
  {
    id: 'fal360',
    title: 'FaL360 Warehouse Module',
    description: 'Enterprise warehouse management system with Laravel + Inertia',
    longDescription: 'A full warehouse management module for FaL360 ERP built with Laravel, Inertia.js, and React. Features weighbridge operations, stock receipts, bin management.',
    tech: ['Laravel', 'React', 'Inertia.js', 'TypeScript', 'Tailwind'],
    category: 'fullstack',
    github: 'https://github.com/yourusername/fal360',
    image: '/projects/fal360.png',
    featured: false,
  },
];