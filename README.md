# 📊 Pulse (React) — Fitness Analytics Dashboard

A React + Vite mobile responsive fitness analytics: a real off-canvas navigation drawer below the tablet breakpoint, a fluid stat grid, and charts that stay legible from a 375px phone screen up to a wide desktop monitor.

## Features

- Componentized layout: `Sidebar`, `TopBar`, `StatCard`, `BarChart`, `LineChart`, `RingChart`, `ActivityList` — each owns its own markup and CSS Module
- **Mobile-first responsive design**:
  - Sidebar becomes a slide-in drawer with a backdrop below 900px, opened via a hamburger button and closed by the backdrop, the close button, or <kbd>Escape</kbd>
  - Stat cards reflow with `grid-template-columns: repeat(auto-fit, minmax(...))` instead of fixed breakpoints, so they resize fluidly rather than snapping awkwardly
  - Chart panels stack to a single column on narrow screens and become a 1.6:1 two-column layout once there's room (≥720px)
  - All SVG charts scale via `viewBox`, so they stay crisp and correctly proportioned at any width
  - Verified with zero horizontal overflow at 375px, 390px, 768px, 1024px, and 1440px viewports
- Four key-metric stat cards with trend indicators
- Weekly activity bar chart (steps vs. active minutes), a 7-day heart-rate line chart, concentric daily-goal progress rings, and a recent-activity feed
- Light/dark theme via a `useTheme` hook, persisted to `localStorage` with a system-preference fallback
- Date-range selector (UI only — swap in real data by editing `src/data/dashboardData.js`)

## Tech

- **React 19** with function components and hooks (`useState`, `useMemo`, `useId`, plus a small custom `useTheme` hook)
- **Vite** for dev server and bundling
- **CSS Modules** per component, sharing one set of design-token custom properties defined in `src/index.css`
- No chart library — bars, lines, and rings are plain SVG computed from the data, the same approach as the vanilla version, just expressed as React components instead of string-built markup
- `vite.config.js` sets `base: './'` so the production build works from any subpath (a GitHub Pages project site, a subfolder on any static host, etc.) without extra config

## Project structure

```
src/
  components/
    Sidebar/        off-canvas nav drawer on mobile, docked column on desktop
    TopBar/          hamburger, greeting, date-range select, theme toggle
    StatCard/        one key-metric tile
    BarChart/        weekly steps vs. active minutes (SVG)
    LineChart/       heart-rate trend (SVG)
    RingChart/       concentric daily-goal rings (SVG)
    ActivityList/    recent workouts feed
  data/
    dashboardData.js all mock data in one place — the natural spot to wire up a real API
  hooks/
    useTheme.js      light/dark theme state + persistence
  App.jsx            page layout and composition
  index.css          design tokens, reset, global a11y helpers
```

## Accessibility

- Skip-to-content link and semantic landmarks (`nav`, `main`, `aside`)
- The mobile nav drawer manages focus (moves focus to its close button on open), closes on <kbd>Escape</kbd>, and is announced correctly via `aria-expanded`/`aria-controls` on the hamburger button
- `aria-current="page"` on the active nav link
- Every chart is `role="img"` with a real `<title>`/`<desc>`; the bar chart's data is also exposed as a visually-hidden `<table>` so screen reader users get exact numbers, not just a description
- Color is never the only signal — trend deltas pair an icon (▲/▼) with text
- Touch targets (nav links, icon buttons) are sized to at least 44×44px
- Respects `prefers-reduced-motion`

## Running locally

```bash
npm install
npm run dev       # http://localhost:5173
```

## Building for production

```bash
npm run build      # outputs to dist/
npm run preview    # sanity-check the production build locally
```

## Deploying

The build output in `dist/` is fully static and portable (thanks to the relative `base: './'` in `vite.config.js`), so it can be deployed as-is to GitHub Pages, Netlify, Vercel, or any static host:

- **Netlify / Vercel**: point the project at this folder with build command `npm run build` and publish directory `dist`.
- **GitHub Pages**: run `npm run build`, then publish the contents of `dist/` to a `gh-pages` branch (e.g. with the `gh-pages` npm package or a GitHub Actions workflow using `actions/upload-pages-artifact` + `actions/deploy-pages`).

## License

MIT — see the root [LICENSE](../LICENSE).
