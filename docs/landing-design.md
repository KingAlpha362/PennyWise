# PennyWise — richer product studio revision

Dark emerald default with a light alternative. Strong sans-serif hero, editorial secondary headings, layered glass art, full-width product showcase, interactive walkthrough and differentiated visual feature panels. Retains honest demo copy and existing USD prices.

## Generated artwork

Created with the built-in image generation tool. Original PNGs preserved; production copies converted to WebP.

- public/images/emerald-progress.webp — 112,812 bytes. Decorative emerald-glass progress sculpture used in hero and closing section.
- public/images/kyoto-goal.webp — 410,182 bytes. Generated travel illustration used with a clearly labeled sample savings goal.

### Final prompts

#### Image 1

Use case: stylized-concept. Asset type: premium personal-finance SaaS landing page hero artwork, landscape 3:2. Create an exquisitely rendered sculptural still life: three translucent emerald glass ascending architectural steps, a satin silver sphere balanced on the middle step, a thin luminous mint glass circular arc framing the composition. Symbolizes thoughtful financial progress, not investment returns. Deep midnight teal studio background, directional softbox lighting, precise caustics, subtle reflective floor, cinematic luxury product photography quality, restrained mint and silver, physical glass detail. Composition clustered on right and lower center with clean dark negative space at left, close crop, visually substantial. No text, no letters, no logos, no coins, no currency symbols, no charts, no interface, no watermark.

#### Image 2

Use case: photorealistic-natural. Asset type: aspirational savings-goal image for PennyWise personal finance SaaS. Wide landscape editorial travel photograph of Kyoto Japan: beautiful quiet traditional lane with dark timber machiya houses and a distant pagoda, lush green foliage, early morning mist and soft pale golden sun, intimate human scale, cinematic composition, exquisite natural textures, refined travel magazine photography. No people needed, no text, no logos, no watermark. Rich forest greens, warm stone and muted copper, realistic photographic depth. This is an atmospheric illustrative travel goal image, not a financial claim.

## Validation

Production build, lint and seven calculation tests pass locally. Browser coverage checks 360, 390, 768, 1024 and 1440 widths, theme switching, image loading, navigation and demo transaction entry. The normal local test launcher cannot spawn child processes in this environment; calculation tests were run directly and browser coverage runs in GitHub Actions.
