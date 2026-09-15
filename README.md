# 📊 Pulse - Fitness Analytics Dashboard

A React + Vite fitness analytics dashboard: six real pages behind client-side routing, an off-canvas mobile navigation drawer, and interactions that actually change what's on screen — a date-range selector that swaps the data, clickable stat cards that jump to detail pages, filterable/expandable workout logs, goals you can log progress against (persisted), and a settings page whose changes propagate live across the rest of the app.

View app: https://analytics-dashboard-fump.vercel.app/

<img width="1643" height="960" alt="image" src="https://github.com/user-attachments/assets/1d2e8303-25b6-4e68-b876-dc9bb320801a" />


## Features

- **Six routed pages**, not just one dashboard screen:
  - **Overview** — key stats, weekly activity chart, daily-goal rings, heart-rate trend, recent activity
  - **Activity** — full workout log, filterable by type, each entry expands on click to show duration/calories/avg. heart rate; a weekly distance-vs-duration chart up top
  - **Heart rate** — resting heart-rate trend with a 7/30/90-day range toggle that regenerates the chart, plus a time-in-zones breakdown
  - **Sleep** — nightly hours vs. an 8-hour goal, a sleep-stage composition breakdown, and a clickable per-night detail card
  - **Goals** — progress bars you can advance with a "Log progress" button, persisted to `localStorage`, with a completion badge once you hit target
  - **Settings** — display name and reminder time (explicit Save, with a confirmation toast), plus units and notification toggles that apply instantly
- **Genuinely dynamic, not just clickable window-dressing**:
  - The Overview date-range selector (This week / Last week / This month) swaps the underlying dataset — different stats, different chart labels, different numbers, not just a relabeled UI
  - Clicking a stat card on Overview navigates to the page with that metric's detail (e.g. "Resting heart rate" → Heart rate page)
  - Changing units in Settings (km/mi) immediately changes how distances are displayed on the Activity page
  - Changing your display name in Settings updates the sidebar and the Overview greeting the moment you save — all three read from one shared piece of state in `App.jsx`, not three independent copies
  - Goal progress and settings both persist across reloads via `localStorage`
- **Mobile-first responsive design**, carried over from the original build:
  - Sidebar becomes a slide-in drawer with a backdrop below 900px, opened via a hamburger button and closed by the backdrop, the close button, or <kbd>Escape</kbd>
  - Stat and goal grids reflow with `grid-template-columns: repeat(auto-fit, minmax(...))` instead of fixed breakpoints
  - All SVG charts scale via `viewBox`, so they stay crisp at any width
  - Verified with zero horizontal overflow at 375px, 768px, and 1280px viewports, including drawer navigation
- Light/dark theme via a `useTheme` hook, persisted to `localStorage` with a system-preference fallback

## Tech

- **React 19** with function components and hooks (`useState`, `useMemo`, `useId`, plus small custom `useTheme`/`useLocalStorage` hooks)
- **react-router-dom** (`HashRouter`) for client-side routing — hash-based specifically so the routed pages work correctly when deployed to a static host (GitHub Pages, etc.) that doesn't rewrite unknown paths back to `index.html`
- **Vite** for dev server and bundling
- **CSS Modules** per component/page, sharing one set of design-token custom properties defined in `src/index.css`, plus a shared `src/pages/PageLayout.module.css` for the stat-grid/panel primitives every page uses
- No chart library — bars, lines, and rings are plain SVG computed from data
- `vite.config.js` sets `base: './'` so the production build works from any subpath without extra config

## Project structure

```
src/
  components/          shared building blocks used across pages
    Sidebar/            off-canvas nav drawer on mobile, docked column on desktop (react-router NavLink)
    TopBar/              hamburger, page title, date-range select (Overview only), theme toggle
    StatCard/            one key-metric tile — optionally a Link to a detail page
    BarChart/ LineChart/ RingChart/ ActivityList/   SVG chart primitives
  pages/
    Overview/    Activity/    HeartRate/    Sleep/    Goals/    Settings/    NotFound/
    PageLayout.module.css     shared stat-grid/panel styles used by every page
  data/
    dashboardData.js    all mock data + per-range datasets in one place — the natural spot to wire up a real API
  hooks/
    useTheme.js          light/dark theme state + persistence
    useLocalStorage.js   generic persisted state (used by Goals and Settings)
  App.jsx                routes, shared layout, and the one source of truth for theme/settings/range state
  main.jsx               mounts <App/> inside a HashRouter
  index.css              design tokens, reset, global a11y helpers
```

A note on state: `settings` (display name, units, notifications) lives in `App.jsx`, not inside the Settings page component. Settings, the Sidebar, and the Activity page are all mounted at the same time as siblings under the same route tree, so a change made in the Settings form needs to update state the other components already hold a reference to — an independent `localStorage`-backed hook inside Settings would update `localStorage` correctly but wouldn't cause the Sidebar or Activity page to re-render. Goals didn't need this treatment since nothing else on screen depends on goal progress.

## Accessibility

- Skip-to-content link and semantic landmarks (`nav`, `main`, `aside`)
- The mobile nav drawer manages focus (moves focus to its close button on open), closes on <kbd>Escape</kbd>, and is announced correctly via `aria-expanded`/`aria-controls` on the hamburger button
- `aria-current="page"` on the active nav link, set automatically by react-router's `NavLink`
- Every chart is `role="img"` with a real `<title>`/`<desc>`; the bar chart's data is also exposed as a visually-hidden `<table>` so screen reader users get exact numbers, not just a description
- Toggle switches on Settings use `role="switch"`/`aria-checked`; progress bars on Goals use `role="progressbar"` with `aria-valuenow`
- Color is never the only signal — trend deltas pair an icon (▲/▼) with text
- Touch targets (nav links, buttons, chips) are sized to at least 40–44px
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

The build output in `dist/` is fully static and portable (thanks to `base: './'` in `vite.config.js` and the hash-based router), so it can be deployed as-is to GitHub Pages, Netlify, Vercel, or any static host:

- **Netlify / Vercel**: point the project at this repo with build command `npm run build` and publish directory `dist`.
- **GitHub Pages**: run `npm run build`, then publish the contents of `dist/` to a `gh-pages` branch (e.g. with the `gh-pages` npm package), or set Pages' source to "GitHub Actions" and use a workflow with `actions/upload-pages-artifact` + `actions/deploy-pages`.

## License

MIT — see [LICENSE](LICENSE).
