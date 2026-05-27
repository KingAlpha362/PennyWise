const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  // Load the image directly to get its dimensions
  await page.goto('http://localhost:5173/feat-transactions-light.png');
  const dims = await page.evaluate(() => {
    const img = document.querySelector('img');
    return img ? { w: img.naturalWidth, h: img.naturalHeight } : null;
  });
  console.log('feat-transactions-light.png dimensions:', dims);
  await browser.close();
})().catch(e => console.error(e.stack));
