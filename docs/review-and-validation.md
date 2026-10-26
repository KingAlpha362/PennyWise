# PennyWise review and validation

Reviewed against main commit 4f4cd3bca864dbcbbda013296c457ae24d421ca7. This is a correctness, usability, and implementation review, not a security audit. Production deployment is outside this change.

## Confirmed findings and corrections

| Severity | Reproduction on the original site | Correction |
| --- | --- | --- |
| High | Submit any nonempty sign-in form or click Google/Apple; dashboard appears as though authentication succeeded | Replace mock authentication with a credential-free, clearly labeled demo entry |
| High | Read hero, pricing, press, testimonials, comparison, security, and FAQ claims; no supporting integration or evidence exists in the repository | Remove unverified proof sections and replace claims with factual demo copy |
| Medium | Click a pricing CTA or calculator CTA; nothing happens. Header Get Started opens sign-in | Share signup navigation callback and keep sign-in separate |
| Medium | Submit footer newsletter; default form navigation occurs without subscribing. Footer links point to # | Remove inactive form/discount offer and keep links with real destinations |
| Medium | View the original header around tablet width; desktop items clip | Use a compact header and mobile drawer below 1280 px |
| Medium | Tab through the closed mobile menu | Make closed drawer inert; add Escape, focus return, and responsive scroll-lock cleanup |
| Medium | Create a goal/budget or contribute; success alert appears without changing data | Update session state and pass it to overview, goals, budgets, and assistant |
| Medium | Add transaction; summary/category charts and budgets disagree | Derive month totals, categories, and budget spend from shared transaction data |
| Medium | Change overview date range; chart stays unchanged | Slice sample chart data; mark unavailable long periods as disabled |
| Medium | Change cashflow Weekly/Daily; only label changes | Disable unavailable sample aggregations rather than imply working data |
| Medium | Adjust calculator income; result never changes | Remove unused income control; expose illustrative assumptions and named slider labels |
| Medium | Return from auth/dashboard; reveal/progress observers only ran at initial mount | Remove visibility-gating GSAP reveals, rebind progress observer on landing mount, and respect reduced motion |
| Medium | Switch dashboard theme then leave; global styles and root state leak between views | Scope landing CSS and restore root theme/density state on exit |
| Low | Search transactions by amount, as placeholder suggests; no result | Include amount text in search |
| Low | Select rows, change filters, then select all | Compare selected IDs against visible rows rather than comparing counts |
| Low | Open sample dialogs by keyboard | Add field-label associations, dialog semantics, focus containment, Escape, focus restoration, and positive amount constraints |
| Low | Run lint on original source | Fix duplicate icon case, prop reassignment, effect-derived palette state, and missing effect dependency |

## Validation completed locally

- Production build passes with Vite native config loading. The default config loader cannot spawn a Windows helper in this environment; native loading builds the same project config.
- ESLint passes with zero reported errors or warnings after fixes. Baseline had three errors and one warning.
- Seven regression cases pass: scenario rounding/defaults, zero/max/invalid spending, month filtering/category totals, transaction-to-budget updates, empty month.
- In-app browser at 1280 × 720: header/hero demo actions, credential-free entry, adding a transaction, creating a goal, recording a contribution, creating a budget, dashboard theme switch, and returning to landing all checked. The sample transaction was visible and the sidebar count increased from 43 to 44; new goal count increased from 4 to 5; the new Housing budget appeared with sample spend.
- Root dashboard theme attribute is removed on exit and the landing dark theme is restored.

## Automated coverage and limits

Run npm test, npm run lint, and npm run build. Then start npm run preview -- --host 127.0.0.1 --port 4173 and run node tests/browser.mjs. The GitHub Actions workflow performs those checks with Chromium.

The browser suite covers 360, 390, 768, 1024, and 1440 px, menu keyboard behavior, pricing actions, demo entry, sample transaction persistence, and exit. It could not launch locally because the environment rejects the Chromium child process with EPERM. These widths and reduced-motion emulation are not claimed as locally passed. CI results must be reviewed before merge.

Build warnings remain for a large landing bundle, old Browserslist data, and gradient syntax emitted by existing utility styles. Dashboard code now loads separately; further animation-library consolidation is a performance follow-up.

Vercel project penny-wise-website_1 was found, but the connection lacks authorization for its owning team. Check the PR's Vercel status for an automatically generated preview; no production deployment was requested.

## Deliberate demo boundaries

No real authentication, bank sync, payments, subscription billing, email collection, or live AI service was added. Historical cashflow/account balances and sample insights remain illustrations rather than a live ledger. Preview-only settings are labeled; unavailable notifications, profile editing, privacy policy, and security controls do not pretend to change real account settings. Session data resets on dashboard exit or reload.

The editorial redesign remains a separate proposal in premium-landing-proposal.md.
