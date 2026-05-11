# My Developer Portfolio

A highly interactive developer portfolio built with SvelteKit and TailwindCSS.

## Live Demo
[https://mi-portafolior.netlify.app]

## Setup
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Architecture
- **SvelteKit** — routing, SSR, static generation
- **TailwindCSS v4** — utility-first styling
- **Svelte stores** — theme state management
- **Intersection Observer** — scroll-triggered animations
- **Canvas API** — particle background in hero

## Sections
1. **Hero** — particle animation, typewriter, staggered entrance
2. **Skills** — animated progress bars, category filtering
3. **Projects** — filterable grid, expandable modals
4. **Terminal** — interactive CLI with command history and tab autocomplete
5. **Contact** — form with validation and email integration

## Creative Feature
**Interactive Terminal** — A fully functional fake terminal where visitors can explore the portfolio through CLI commands (`help`, `about`, `projects`, `skills`, `contact`). Features command history (↑↓), tab autocomplete, and a boot sequence animation.

## Animation Decisions
- Native Svelte transitions (`fly`, `fade`) for entrance animations
- CSS transitions for hover states (no JS overhead)
- `IntersectionObserver` for scroll-triggered reveals
- Canvas requestAnimationFrame for particle system
- Reduced motion support via CSS media query

## Performance
- No heavy animation libraries (pure Svelte + CSS)
- Lazy section loading via IntersectionObserver
- System font fallback before Google Fonts loads
- Static generation for fast initial load

## Accessibility
- Skip navigation link
- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigable (Tab, Enter, Escape)
- Visible focus states
- Reduced motion support
- Color contrast WCAG AA compliant

## Trade-offs
- Used Canvas for particles (could use CSS instead for better perf)
- No backend for contact form (opens mail client instead)
- Static data for projects (could be CMS-driven)