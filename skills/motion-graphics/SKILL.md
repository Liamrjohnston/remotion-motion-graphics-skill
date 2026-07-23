---
name: "motion-graphics"
description: "Production art direction, intake, anti-neon rules, reference review, and QA for premium Remotion video inserts."
---

# Motion Graphics for AI Videos

Use with `remotion-best-practices` and `cinematic-camera`. This skill owns taste, intake, mobile clarity, and the first-pass quality bar.

## Mandatory intake gate — ask before coding

Do not create files, write composition code, or render until these two decisions are known. If the user already specified one, ask only for the missing one.

1. **Delivery format**
   - **4:3 insert — 1440×1080:** for a half-screen Instagram layout or placement over A-roll.
   - **9:16 full-screen — 1080×1920:** for a full-screen Instagram/Reels/TikTok graphic.
   - Use **16:9 — 1920×1080** only when the user explicitly asks for YouTube/landscape.
2. **Background surface**
   - **Warm light:** off-white paper/canvas, dark ink, neutral borders.
   - **Clean dark:** charcoal/ink, neutral surfaces, restrained brand accent.
   - **Light grid:** warm light field with subtle neutral grid lines.
   - **Dark grid:** charcoal field with subtle neutral grid lines.

Ask plainly:

> Which format do you want: 4:3 half-screen Instagram insert or 9:16 full-screen Instagram? And which background: warm light, clean dark, light grid, or dark grid?

If the user says “you choose,” use **warm light**. Never silently default to dark.

Also confirm or infer the script beat, duration, authentic product assets, and placement in the edit. Do not burden the user with questions already answered.

## Absolute visual ban — zero neon or glow

This is non-negotiable across every background and every composition.

- No neon colors, fluorescent accents, electric cyan, electric purple, or lime-green “AI” palettes.
- No glow, bloom, luminous edges, colored drop shadows, aura, halo, light spill, or pulsing radiance.
- No cyan→purple, blue→purple, rainbow, or multicolor gradient bars.
- No gradient orbs, radial color washes, ambient color fog, aurora fields, or cyberpunk lighting.
- No glassmorphism, frosted-glass SaaS cards, shiny beveled UI, or translucent panels used as decoration.
- No “vibe-coded AI” look: dark navy void + glowing card + tiny badges + colorful gradient + generic icons.
- A dark or dark-grid choice means neutral charcoal materials—not glowing panels.
- Product brand colors may appear as restrained flat fills, strokes, or highlights. They never glow and do not become the whole scene’s lighting.

If any prohibited treatment appears in a still, reject the render and remove it before showing the user. Lowering the glow is not a fix; the glow must be zero.

## Approved-reference gate

Before planning or coding, inspect at least two relevant approved examples from the installed repository or the canonical gallery:

- `examples/openmontage-hook.mp4` — continuous physical world and clear product identity.
- `examples/openmontage-claude-pipeline.mp4` — connected workflow with camera-led causality.
- `examples/tsenta-apply-faster.mp4` — readable comparison with meaningful data.
- `examples/tsenta-one-click-wall.mp4` — one action producing a spatial payoff.
- `examples/kickbacks-same-run-editor.mp4` — authentic product workflow.
- `examples/smartlead-prewarmed-burn.mp4` — restrained cinematic product story.

Canonical repository: `https://github.com/Liamrjohnston/remotion-motion-graphics-skill`

Inspect the actual clip or representative frames, not only its filename. Continue its typography, spacing, density, material treatment, motion rhythm, and camera language. If the references cannot be accessed, use the locked fallback: warm off-white physical/editorial world, dark ink, muted neutrals, one restrained brand accent, soft neutral shadows, and no decorative effects.

Recent approved work is the minimum standard, not optional inspiration. Do not invent a new aesthetic just to make the request feel novel.

## Prime directive

Make the idea understandable in under two seconds. Build one strong visual mechanism, not a decorated summary of the script.

Priorities:

1. Clarity.
2. Product authenticity.
3. Mobile readability.
4. Purposeful motion.
5. Polish and reuse.

## No redundant on-screen text

Talking-head videos already have spoken VO and burned captions. Do not restate the narrated line, headline, or explanation on screen.

Allowed: real data, prices, counters, percentages, units, filenames, commands, code, product/UI text, and short structural labels.

Not allowed: explanatory sentences, narration copied into a headline, decorative pills that repeat the point, or extra text added because the frame feels empty. Improve the visual mechanism instead.

## Composition and material language

- Build one connected physical/spatial world and move attention through it.
- Prefer paper, canvas, desktop, real product surfaces, documents, receipts, timelines, queues, physical handoffs, authentic terminals, and real UI.
- Use real logos, screenshots, recordings, product assets, and verified data whenever available.
- Do not replace real identity with colored squares, generic landscape icons, fake app marks, or fake browser chrome.
- Avoid generic dashboards, arbitrary card grids, decorative progress bars, fake metrics, and stock “AI workflow” diagrams.
- A centered glass pricing card with glowing badges and a gradient progress bar is an explicitly banned pattern.
- One graphic teaches one primary idea. Sequence multiple stages over time.
- Use fewer, larger objects. Essential information must remain readable on a phone.

### Surface recipes

**Warm light**

- Base: `#F7F5EF` / `#FBFAF6`.
- Ink: `#16181B`.
- Muted: `#6F7378`.
- Border: `#DDE0E3`.
- Shadows: neutral black at low opacity, never colored.

**Clean dark**

- Base: `#111315` / `#15181B`.
- Surface: `#1D2024`.
- Text: `#F4F1EA`.
- Muted: `#A5A8AC`.
- Border: `#34383D`.
- One flat product accent only; no luminous edge or color wash.

**Light grid**

- Use the warm-light recipe.
- Grid lines: neutral ink at roughly 4–7% opacity.
- Keep the grid quiet; it is a spatial aid, not decoration.

**Dark grid**

- Use the clean-dark recipe.
- Grid lines: neutral white at roughly 4–7% opacity.
- No blue/cyan grid and no glow at intersections.

## Concept selection

Match the mechanism to the claim:

- Price/value: receipt, invoice, price tag, token stack with real units, or authentic pricing surface.
- Before/after: one system transforming or replacing another, not two unrelated dashboards.
- Workflow: connected objects and visible causality through lines, handoffs, queues, or real product actions.
- Product demo: authentic recording or faithful UI with camera-guided focus.
- News/release: editorial article surface with restrained physical highlighting.
- CLI/agent run: authentic terminal structure, not a fake checklist or dashboard.
- Data claim: chart only when every value is real and labeled.

Never fabricate prices, benchmarks, ranks, metrics, capabilities, UI, or product identity.

## Motion and camera

- Drive render-critical motion with `useCurrentFrame()`, `spring()`, and `interpolate()`; no CSS animation.
- Use hold → travel → hold. The camera moves to the next action; the action completes during the hold.
- Prefer smooth 14–24 frame moves over frantic whips.
- Use micro-motion only when it communicates state: typing, ticking, checking, playback, progress, cursor action.
- Never animate every object at once.
- End with all key elements visible and a stable editor hold.

## Mobile clarity

- 4:3 inserts must remain readable when occupying roughly half of a 9:16 frame.
- 9:16 full-screen work must respect Reels/TikTok UI and caption zones.
- Use short labels, strong hierarchy, generous margins, and large focal objects.
- If a label is not essential at phone size, remove it.

## First-pass rejection gate

Do not show the first render until every answer is “no”:

1. Did implementation begin before format and background were chosen?
2. Is there any neon, glow, bloom, colored shadow, cyan-purple gradient, or decorative color wash?
3. Does it resemble a generic AI/SaaS dashboard, glass card, template, or vibe-coded demo?
4. Is dark being used without the user choosing dark or an approved reference requiring it?
5. Does the graphic repeat the narration?
6. Are any values, UI, product marks, or claims invented?
7. Is essential text too small for the selected Instagram placement?
8. Does the scene lack authentic product identity when assets exist?
9. Does motion decorate instead of explaining causality?
10. Does it fail to match the quality, spacing, material restraint, and camera language of the approved references?

If any answer is yes, revise privately and rerun the gate. The user should see the strongest pass, not an avoidable rough draft.

## QA and delivery

1. Typecheck or run the smallest meaningful build validation.
2. Render stills for the opening, each camera destination, payoff, and end hold.
3. Compare them beside approved references for framing, density, identity, color restraint, and polish.
4. Inspect the full MP4 for crops, tiny text, dead travel, generic filler, lingering overlays, and weak end frames.
5. Deliver the review MP4 with exact dimensions, duration, render command, and editor placement note.
