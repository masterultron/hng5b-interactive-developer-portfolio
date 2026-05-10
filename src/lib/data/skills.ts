export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  icon: string;
}

export const skills: Skill[] = [
  { name: 'React', level: 95, category: 'frontend', icon: '⚛️' },
  { name: 'TypeScript', level: 90, category: 'frontend', icon: '🔷' },
  { name: 'Next.js', level: 88, category: 'frontend', icon: '▲' },
  { name: 'Svelte', level: 80, category: 'frontend', icon: '🔥' },
  { name: 'Tailwind CSS', level: 95, category: 'frontend', icon: '🎨' },
  { name: 'Node.js', level: 78, category: 'backend', icon: '🟢' },
  { name: 'Laravel', level: 72, category: 'backend', icon: '🐘' },
  { name: 'PostgreSQL', level: 70, category: 'backend', icon: '🐘' },
  { name: 'Web Crypto API', level: 82, category: 'tools', icon: '🔐' },
  { name: 'Git', level: 90, category: 'tools', icon: '📦' },
  { name: 'Docker', level: 65, category: 'tools', icon: '🐳' },
  { name: 'Playwright', level: 75, category: 'tools', icon: '🎭' },
];

export const techTags = [
  'React', 'Svelte', 'Next.js', 'TypeScript', 'JavaScript',
  'Tailwind CSS', 'Node.js', 'Laravel', 'PostgreSQL', 'WebSockets',
  'Web Crypto API', 'PWA', 'Chrome Extensions', 'REST APIs', 'Git',
];