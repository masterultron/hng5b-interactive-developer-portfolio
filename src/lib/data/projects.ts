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
    live: 'https://hng-whisperbox.netlify.app/login',
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
    live: 'https://ajoke-gold-international.netlify.app/',
    github: 'https://github.com/yourusername/ajoke-gold',
    image: '/projects/ajoke-gold.png',
    featured: true,
  },
  {
    id: 'car-rental',
    title: 'Premium Car Rental',
    description: 'Modern car rental platform with sleek UI and booking flow',
    longDescription: 'A high-performance landing page and booking system for a luxury car rental service. Features responsive design, car filtering, and a seamless reservation user experience.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    category: 'web',
    github: 'https://github.com/yourusername/car-rental',
    image: '/projects/rental.png',
    featured: true,
  },
  {
    id: 'ramadan-companion',
    title: 'Ramadan Companion',
    description: 'Personalized dua journal to help you stay connected and know your duas and the meanings during ramadan.',
    longDescription: 'A comprehensive spiritual companion app built with Next.js and Tailwind CSS. Features dynamic prayer times, progress tracking for fasting, and curated daily content.',
    tech: ['Next.js', 'React', 'Tailwind', 'TypeScript'],
    category: 'web',
    github: 'https://github.com/yourusername/ramadan-companion',
    image: '/projects/ramadan.png',
    featured: true,
  },
  {
    id: 'walk-in-library',
    title: 'e-Walk-In Library',
    description: 'Full-stack digital library management and reading system',
    longDescription: 'A robust MERN stack application for digital book management. Features secure user authentication, digital resource borrowing, and a real-time admin dashboard for inventory.',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Tailwind'],
    category: 'fullstack',
    github: 'https://github.com/yourusername/library',
    image: '/projects/library.png',
    featured: true,
  },
  {
    id: 'habit-tracker',
    title: 'Habit Tracker PWA',
    description: 'Progressive Web App for tracking daily habits with offline support',
    longDescription: 'A mobile-first PWA built with Next.js featuring local authentication, habit CRUD, streak calculation, and service worker caching for offline use.',
    tech: ['Next.js', 'TypeScript', 'PWA', 'Vitest', 'Playwright'],
    category: 'web',
    live: 'https://hng-stage3-habit-tracker.netlify.app/login',
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
    live: 'https://hng4-stage2-invoice-app.netlify.app/',
    github: 'https://github.com/yourusername/invoice-app',
    image: '/projects/invoice-app.png',
    featured: false,
  },
  {
    id: 'fal360',
    title: 'FaL360 ERP',
    description: 'Enterprise Resource Management Laravel + Inertia',
    longDescription: 'A full ERP system with multiple modules for FaLGates Limited built with Laravel, Inertia.js, and React. Features weighbridge operations, stock receipts, bin management.',
    tech: ['Laravel', 'React', 'Inertia.js', 'TypeScript', 'Tailwind'],
    category: 'fullstack',
    github: 'https://github.com/yourusername/fal360',
    image: '/projects/fal360.png',
    featured: false,
  },
];