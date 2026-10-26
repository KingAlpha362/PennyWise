# PennyWise editorial landing design

## Implemented direction

The landing page now uses a light-first editorial composition: Newsreader display typography, Inter body/UI type, cool paper surfaces, forest-green actions, and a statement illustration beside the opening copy. The dashboard remains its own design system and loads only when entered.

Palette: paper #F8FAFC, white #FFFFFF, ink #102A2B, emerald #176B54, muted slate #5B6B73, rule #D9E2E5. A scoped dark counterpart is available from the header. No new product claims or integrations are implied.

## Experience

- Hero: “Make room for what matters.” with a fictional monthly statement and a working demo action.
- Product tour: spending → plan → next chapter, controlled by three keyboard-accessible buttons with a live description and matching ledger, budget, or goal illustration.
- Three concise benefits, followed by factual demo capabilities.
- Optional savings calculator in an expandable disclosure.
- Transparent monthly/yearly proposed pricing, concise native FAQ disclosures, closing demo action, and compact footer.
- A single optional arrival animation on the desktop statement. No continuous decorative motion; reduced-motion preferences are honored.

## Validation

Run npm run lint, npm test, npm run build, and the browser suite documented in README.md. The suite checks 360, 390, 768, 1024, and 1440 px; both landing themes; tour switching; calculator disclosure; pricing actions; menu Escape/focus return; and demo entry, transaction creation, and exit. The available local browser is also used for visual review. GitHub CI is the browser-suite execution environment because local Chromium child-process launch is restricted.

This updates draft PR #2, which also contains the preceding demo fixes. No merge or production deployment is part of this change.
