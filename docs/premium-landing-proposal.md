# PennyWise: premium editorial landing proposal

This proposal is separate from the functional fixes. The editorial redesign has not been implemented.

## Direction

Make PennyWise feel like a carefully edited financial journal with a useful product at its center. Use a single memorable, asymmetric opening composition: a left-aligned statement beside a generous product window. Keep the rest calm and product-led. Avoid adding more decorative cards, badges, glowing backgrounds, or repeated entrance animations.

Suggested tokens: paper #F8FAFC, white #FFFFFF, ink #102A2B, emerald #176B54, muted slate #5B6B73, rule #D9E2E5. Dark counterpart: ink background, white text, emerald accents adjusted for contrast. Keep green as a brand connection; use color primarily for actions and financial meaning.

Type: Newsreader for major editorial headings; Inter for body, navigation, and product labels. Use tabular figures for money. Body text 16–18 px, line height 1.6, line length about 65 characters. No ornamental all-caps labels above every section. Validate font loading and contrast before release.

## Recommended page order

1. Product introduction: editorial hero and one prominent demo action.
2. Guided product walkthrough: transactions → budget → goal, with sample-data disclosure beside it.
3. Three concrete benefits: understand spending, plan a limit, track a goal.
4. Demo capabilities and boundaries: what works now, what is only a preview.
5. Transparent proposed pricing, with annual billing explained in one sentence.
6. Concise FAQ, closing demo action, and compact footer.

Keep the calculator optional and collapse it behind an invitation to explore a scenario. Do not use it as proof of savings. Add customer stories only when authentic quotes, consent, and supporting evidence are available.

## Ranked additions

| Priority | Addition | Why | Implementation effort estimate |
| --- | --- | --- | --- |
| 1 | Editorial hero and consistent typography/spacing tokens | Establish quality and clearer hierarchy immediately | Medium: 1–2 engineer/design days |
| 2 | A focused three-step interactive product tour | Demonstrate value without requiring visitors to understand the entire dashboard | Medium: 2–3 days |
| 3 | Consolidated benefits and honest capabilities section | Reduce repetition and make the product easier to understand | Small: 0.5–1 day |
| 4 | Purposeful visual system for screenshots, captions, charts, and responsive crops | Make the product presentation consistent at every width | Medium: 1–2 days |
| 5 | Verified customer story or trust evidence, when available | Establish credibility using evidence rather than badges | Small build: 0.5–1 day, plus content collection |

Effort estimates assume approved copy and the existing React/Vite stack. They exclude real financial integrations or authentication.

## Example copy

Hero: “Make room for what matters.”
Supporting copy: “See your spending, plan your next month, and follow your savings goals in one place. Explore the PennyWise demo with sample data.”
Primary action: “Explore the demo”
Walkthrough heading: “From a transaction to a plan.”
Capabilities heading: “A clear view of what works today.”
Closing heading: “Start with a clearer picture.”

## Motion and acceptance

Use one short opening transition, plus feedback when someone switches a tour step or changes a value. No continuous sparkles, scrolling marquees, or motion required to reveal content. Respect reduced motion, keyboard navigation, visible focus, 44 px touch targets, and layouts at 360, 390, 768, 1024, and 1440 px. Verify light and dark contrast and provide meaningful product-image captions.

Before release, compare screenshots at the five widths, test the complete demo entry/exit flow, and ensure every claim and link has a real source or destination.
