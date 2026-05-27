/**
 * Captures feat-* screenshots from the dashboard's .pw-main element only
 * (excludes the sidebar so bento cards have no sidebar cutout).
 *
 * Usage:
 *   1. npm run dev          (keep running in a separate terminal)
 *   2. node capture-screens.cjs
 */

const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:5173';

const SCREENS = [
  { id: 'transactions', label: 'Transactions', file: 'feat-transactions' },
  { id: 'budgets',      label: 'Budgets',      file: 'feat-budgets'      },
  { id: 'insights',     label: 'Insights',     file: 'feat-insights'     },
  { id: 'goals',        label: 'Goals',        file: 'feat-goals'        },
];

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  // ── Navigate to landing page ──────────────────────────────────────────────
  console.log('Loading app…');
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // ── Open sign-in modal ────────────────────────────────────────────────────
  await page.getByRole('button', { name: /sign in/i }).first().click();
  await page.waitForTimeout(400);

  // ── Submit mock auth (any credentials work) ───────────────────────────────
  const emailInput = page.locator('input[type="email"], input[name="email"]').first();
  const passInput  = page.locator('input[type="password"]').first();
  await emailInput.fill('demo@pennywise.app');
  await passInput.fill('demo1234');
  await page.locator('button[type="submit"]').click();

  // ── Wait for dashboard to mount ───────────────────────────────────────────
  await page.waitForSelector('.pw-app', { timeout: 10_000 });
  await page.waitForTimeout(600); // let entrance animations settle

  const main = page.locator('.pw-main');

  for (const { id, label, file } of SCREENS) {
    // Navigate to screen via sidebar nav item
    await page.locator('.pw-nav-item').filter({ hasText: label }).first().click();
    await page.waitForTimeout(500);

    // ── Light mode ─────────────────────────────────────────────────────────
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    });
    await page.waitForTimeout(250);
    await main.screenshot({ path: `public/${file}-light.png` });
    console.log(`  ✓ public/${file}-light.png`);

    // ── Dark mode ──────────────────────────────────────────────────────────
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(250);
    await main.screenshot({ path: `public/${file}-dark.png` });
    console.log(`  ✓ public/${file}-dark.png`);
  }

  await browser.close();
  console.log('\nAll screenshots captured — no sidebar!');
}

run().catch(err => { console.error(err); process.exit(1); });
