# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint
npm run deploy    # Build then deploy to GitHub Pages (gh-pages -d dist)
```

There are no tests in this project.

## Architecture

PennyWise is a React + Vite marketing site for a personal finance app, with an embedded mock dashboard.

### View routing

All navigation is handled by a single `appView` state in `src/App.jsx` — no router library. The four views are:

- `'landing'` — the full marketing page (default)
- `'signin'` / `'signup'` — `<AuthForm>` (Radix UI + shadcn-style components). Auth is mock-only; any submission calls `onAuthSuccess()` and advances to the dashboard.
- `'dashboard'` — `<DashboardApp>`, a self-contained financial dashboard

### Landing page

`src/App.jsx` assembles ~12 section components rendered in sequence. Two animation systems run at mount:

1. **GSAP ScrollTrigger** — batch-reveals elements with class `.reveal` (opacity + translateY)
2. **IntersectionObserver** — triggers `.prog-fill[data-w]` width animations when visible

### Dashboard (`src/components/DashboardApp.jsx`)

A single large (~1700 line) component containing all dashboard logic. All data is static (hardcoded `const` arrays at the top of the file). The internal structure:

- **Data constants** — `ACCOUNTS`, `TRANSACTIONS`, `BUDGETS`, `GOALS`, `SUBSCRIPTIONS`, `INSIGHTS`, `CASHFLOW`, `NET_WORTH`, `CATEGORIES`
- **Helper functions** — `fmt()`, `fmtCompact()`, `fmtDate()`, `fmtDayWeek()`
- **Custom SVG icon system** — `<Icon name="...">` renders inline SVG paths; no icon library used
- **Custom chart components** — `<AreaChart>`, `<CashflowBars>`, `<Donut>`, `<Sparkline>`, `<GoalRing>` — all built with raw SVG, no charting library
- **Screen components** — `<Overview>`, `<Transactions>`, `<Spending>`, `<Budgets>`, `<Goals>`, `<Subscriptions>`, `<Insights>`, `<AIChat>` — selected by sidebar nav
- **Shell** — sidebar + topbar with dark/light theme toggle and density toggle (`compact` vs `default`)

### Two separate design systems

The landing page and dashboard use different CSS architectures that must not be mixed:

| | Landing | Dashboard |
|---|---|---|
| CSS files | `src/index.css` (Tailwind v4) + `src/pennywise-theme.css` | `src/dashboard.css` |
| Variables | `--bg`, `--accent`, `--border`, `--text-muted` | `--bg-elev`, `--brand`, `--pos`, `--neg`, `--warn` |
| Font | Plus Jakarta Sans (headings), Inter (body) | Plus Jakarta Sans (display), Inter (body), JetBrains Mono (numbers) |
| Class prefix | Tailwind utilities + `.glass-card`, `.btn-primary`, `.label`, `.prog-fill` | `.pw-*` (`.pw-card`, `.pw-btn`, `.pw-kpi`, `.pw-row`, `.pw-tag`, etc.) |

Dashboard theme tokens are defined under `[data-theme="light"]` and `[data-theme="dark"]` in `dashboard.css`. The `data-theme` attribute is toggled on `document.documentElement` by the dashboard's theme button.

### Key dependencies

- **GSAP + `@gsap/react`** — scroll animations on the landing page
- **Framer Motion / `motion`** — used in some landing section components
- **Lenis** — smooth scroll (landing page)
- **Recharts** — available but the dashboard uses custom SVG charts instead
- **Radix UI** (`@radix-ui/react-label`, `@radix-ui/react-slot`) — used in `AuthForm` via shadcn-style `src/components/ui/` wrappers
- **Tailwind v4** — configured via `@tailwindcss/postcss` (no `tailwind.config.js`; config is inline in PostCSS)
- **`src/lib/utils.js`** — exports `cn()` (clsx + tailwind-merge) for conditional class names
