# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR, default port 5173)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint
npm run deploy    # Build then deploy to GitHub Pages (gh-pages -d dist)
```

There are no tests in this project. `playwright` is installed as a dev dependency and is used to capture dashboard screenshots (see Public assets below).

## Architecture

PennyWise is a React 19 + Vite marketing site for a personal finance app, with an embedded mock dashboard.

### View routing

All navigation is a single `appView` state in `src/App.jsx` — no router library. Views:

- `'landing'` — full marketing page (default); ~15 section components rendered in sequence
- `'signin'` / `'signup'` — `<AuthForm>` (Radix UI + shadcn-style). Auth is mock-only; any submission calls `onAuthSuccess()` and advances to dashboard.
- `'dashboard'` — `<DashboardApp>`, a self-contained financial dashboard

### `@` path alias

`@` resolves to `./src` (configured in `vite.config.js`). Use `@/lib/utils`, `@/components/ui/button`, etc.

### Landing page

`src/App.jsx` assembles section components in this order: `Header`, `Hero`, `Press`, `DashboardWidget`, `Stats`, `HowItWorks`, `ROICalculator`, `SecurityIntegrations`, `Features`, `Benefits`, `ComparisonTable`, `DashboardPreview`, `Testimonials`, `Pricing`, `FAQ`, `CTA`, `Footer`.

Two animation systems run at mount — they must NOT target the same elements:

1. **GSAP ScrollTrigger** — batch-reveals elements with class `.reveal` (starts at `opacity:0, y:40`, animates once on enter)
2. **Framer Motion `whileInView`** — used in `grid-feature-cards.jsx` cards; these must NOT have the `.reveal` class or both systems fight each other
3. **IntersectionObserver** — triggers `.prog-fill[data-w]` width animations when visible

### Dashboard (`src/components/DashboardApp.jsx`)

A single large (~1700 line) component. All data is static (`const` arrays at top). Internal structure:

- **Data constants** — `ACCOUNTS`, `TRANSACTIONS`, `BUDGETS`, `GOALS`, `SUBSCRIPTIONS`, `INSIGHTS`, `CASHFLOW`, `NET_WORTH`, `CATEGORIES`
- **Helper functions** — `fmt()`, `fmtCompact()`, `fmtDate()`, `fmtDayWeek()`
- **Custom SVG icon system** — `<Icon name="...">` renders inline SVG paths; no external icon library used inside the dashboard
- **Custom chart components** — `<AreaChart>`, `<CashflowBars>`, `<Donut>`, `<Sparkline>`, `<GoalRing>` — raw SVG, no charting library
- **Screen components** — `<Overview>`, `<Transactions>`, `<Spending>`, `<Budgets>`, `<Goals>`, `<Subscriptions>`, `<Insights>`, `<AIChat>` — selected via `screen` state
- **Shell** — sidebar + topbar with `button[title="Toggle theme"]` and density toggle

Sidebar nav items use class `pw-nav-item` and click `setScreen(id)` where id is `overview`, `transactions`, `budgets`, `goals`, `cashflow`, `insights`, `ai`, `settings`.

### Two separate design systems

The landing page and dashboard have entirely separate CSS — do not mix them:

| | Landing | Dashboard |
|---|---|---|
| CSS files | `src/index.css` (Tailwind v4) + `src/pennywise-theme.css` | `src/dashboard.css` |
| CSS variables | `--bg`, `--bg-card`, `--bg-subtle`, `--accent`, `--border`, `--text`, `--text-muted` | `--bg-elev`, `--brand`, `--pos`, `--neg`, `--warn`, `--pw-*` |
| Class prefix | Tailwind utilities + `.glass-card`, `.btn-primary`, `.btn-secondary`, `.label`, `.prog-fill` | `.pw-card`, `.pw-btn`, `.pw-kpi`, `.pw-row`, `.pw-tag`, `.pw-screen`, etc. |

### Dark mode — two separate mechanisms

**Landing page** — the Header toggle calls `document.documentElement.classList.toggle('dark')`. CSS variables switch via `.dark { ... }` in `src/index.css`. Tailwind `dark:` utilities are configured to respond to this class (not OS media query) via `@custom-variant dark (&:where(.dark, .dark *));` at the top of `src/index.css`. Always use class-based toggling on the landing page; never rely on `@media (prefers-color-scheme: dark)` for Tailwind utilities.

**Dashboard** — the theme toggle calls `document.documentElement.setAttribute('data-theme', theme)` and also toggles the `dark` class. Tokens are defined under `[data-theme="light"]` / `[data-theme="dark"]` in `dashboard.css`.

### Key dependencies

- **GSAP + `@gsap/react`** — scroll animations on landing; registered in `App.jsx` before use
- **Framer Motion** — import from `'framer-motion'` (NOT `'motion/react'`); used in `src/components/ui/grid-feature-cards.jsx` and some other landing components
- **Lenis** — smooth scroll (landing page only)
- **lucide-react** — icons on the landing page; one icon family, standardize `strokeWidth={1.5}`
- **Tailwind v4** — configured via `@tailwindcss/postcss` (no `tailwind.config.js`; all config is inside CSS via `@theme`, `@custom-variant`, etc.)
- **`src/lib/utils.js`** — exports `cn()` (clsx + tailwind-merge) for conditional class names

### Public assets (screenshots)

`public/` contains Playwright-captured screenshots used in the landing page:

- `dash-light.png`, `dash-dark.png` — full dashboard overview; used in `Hero.jsx` preview frame
- `feat-transactions-light/dark.png`, `feat-budgets-light/dark.png`, `feat-goals-light/dark.png`, `feat-insights-light/dark.png` — individual screen captures; used in the bento grid in `Features.jsx`

To regenerate screenshots, start the dev server then run:
```bash
node capture-screens.cjs   # captures feat-* screenshots
```
The hero screenshots (`dash-light.png`, `dash-dark.png`) require a separate script navigating through auth. Screenshots are committed to the repo since they're part of the UI.

Theme-aware image switching in JSX uses `dark:hidden` / `hidden dark:block` Tailwind classes — this works because of the `@custom-variant dark` config described above.

### `src/components/ui/` — reusable UI primitives

Shadcn-style components (`button.jsx`, `card.jsx`, `input.jsx`, `label.jsx`) plus custom animation components: `grid-feature-cards.jsx` (Framer Motion grid with SVG pattern background), `header-2.jsx` (fixed nav with dark-mode observer), `ScrollStack.jsx`, `timeline-animation.jsx`, `orbiting-accounts.jsx`, `testimonials-columns-1.jsx`, `sparkles.jsx`, `Grainient.jsx`, `ShapeGrid.jsx`, `vertical-cut-reveal.jsx`.
