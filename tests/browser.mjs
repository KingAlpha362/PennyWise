import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
await mkdir('test-results', { recursive: true });
const browser = await chromium.launch({ headless: true });
const base = process.env.PENNYWISE_TEST_URL || 'http://127.0.0.1:4173';
try {
  for (const width of [360, 390, 768, 1024, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto(base);
    await page.getByRole('heading', { name: /Make room for\s*what matters\./ }).waitFor();
    assert.equal(await page.locator('a[href="#"]').count(), 0);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: 'test-results/landing-' + width + '-light.png', fullPage: true });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    if (width < 1024) {
      await page.getByRole('button', { name: 'Open menu', exact: true }).click();
      await page.keyboard.press('Escape');
      assert.equal(await page.getByRole('button', { name: 'Open menu', exact: true }).getAttribute('aria-expanded'), 'false');
      assert.ok(await page.getByRole('button', { name: 'Open menu', exact: true }).evaluate(el => el === document.activeElement));
    }
    await page.getByRole('button', { name: 'Toggle landing theme', exact: true }).click();
    assert.equal(await page.locator('.editorial').getAttribute('data-landing-theme'), 'dark');
    await page.screenshot({ path: 'test-results/landing-' + width + '-dark.png', fullPage: true });
    await page.getByRole('button', { name: 'Toggle landing theme', exact: true }).click();
    assert.equal(await page.locator('.editorial').getAttribute('data-landing-theme'), 'light');
    await page.getByRole('button', { name: 'Yearly', exact: true }).click();
    assert.equal(await page.getByRole('button', { name: 'Yearly', exact: true }).getAttribute('aria-pressed'), 'true');
    for (const name of ['Explore Starter demo', 'Explore Pro demo']) {
      await page.getByRole('button', { name, exact: true }).click();
      await page.getByRole('heading', { name: 'Explore PennyWise', exact: true }).waitFor();
      assert.equal(await page.locator('input[type="password"]').count(), 0);
      await page.getByRole('button', { name: 'Back to PennyWise' }).click();
    }
    for (const [name, heading] of [['Your plan','A plan with perspective.'],['Your next chapter','Tokyo, someday soon.'],['Your spending','Money in motion.']]) {
      await page.getByRole('button', { name, exact: false }).click();
      await page.getByRole('heading', { name: heading, exact: true }).waitFor();
    }
    await page.getByText('Explore an illustrative savings scenario', { exact: true }).click();
    await page.getByRole('button', { name: 'Explore demo', exact: true }).last().click();
    await page.getByRole('heading', { name: 'Explore PennyWise', exact: true }).waitFor();
    await page.getByRole('button', { name: 'Back to PennyWise' }).click();
    await page.getByRole('button', { name: 'Explore the demo', exact: true }).first().click();
    await page.getByRole('button', { name: 'Open demo dashboard' }).click();
    await page.getByRole('button', { name: 'Add transaction', exact: true }).click();
    await page.getByLabel('Merchant', { exact: true }).fill('Regression coffee');
    await page.getByLabel('Amount', { exact: true }).fill('12.34');
    await page.getByRole('dialog').getByRole('button', { name: 'Add transaction', exact: true }).click();
    await page.getByText('Regression coffee', { exact: true }).waitFor();
    if (width < 768) await page.getByRole('button', { name: 'Open menu', exact: true }).click();
    await page.getByRole('button', { name: 'Sign out', exact: true }).click();
    await page.getByRole('heading', { name: /Make room for\s*what matters\./ }).waitFor();
    assert.deepEqual(errors, []);
    await page.close();
    console.log('Passed viewport ' + width);
  }
} finally { await browser.close(); }
