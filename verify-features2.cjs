const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const mCtx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mp = await mCtx.newPage();
  await mp.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await mp.waitForTimeout(1000);
  // Scroll to bento section (further into the features section)
  await mp.evaluate(() => {
    const el = document.querySelector('.reveal.glass-card');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await mp.waitForTimeout(800);
  await mp.screenshot({ path: 'verify-bento-mobile.png' });
  console.log('Bento mobile captured');
  await browser.close();
})().catch(e => { console.error(e.stack); process.exit(1); });
