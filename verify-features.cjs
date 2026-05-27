const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  // Desktop — check bento cards
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  // Scroll to Features section
  await page.evaluate(() => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verify-features-desktop.png' });
  console.log('Features desktop captured');

  // Scroll a bit more to see the bento cards
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'verify-features-bento.png' });
  console.log('Features bento captured');

  // Mobile — check bento card
  const mCtx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mp = await mCtx.newPage();
  await mp.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await mp.waitForTimeout(1000);
  await mp.evaluate(() => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView();
  });
  await mp.waitForTimeout(800);
  await mp.evaluate(() => window.scrollBy(0, 500));
  await mp.waitForTimeout(600);
  await mp.screenshot({ path: 'verify-features-mobile.png' });
  console.log('Features mobile captured');

  await browser.close();
  console.log('DONE');
})().catch(e => { console.error(e.stack); process.exit(1); });
