# PennyWise

A React 19 + Vite personal finance product demo. Financial data is fictional. No real authentication, bank connections, billing, or live AI service is configured.

## Local development

- npm ci
- npm run dev
- npm run build
- npm run preview
- npm run lint
- npm test

Browser regression suite: install Chromium with npx playwright install chromium, start the preview on port 4173, then run node tests/browser.mjs. The quality workflow runs this suite automatically for pull requests.

See docs/review-and-validation.md for fixes, validation evidence, and demo limits. See docs/premium-landing-proposal.md for the separate editorial design proposal.
