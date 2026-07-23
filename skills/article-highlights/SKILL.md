---
name: "article-highlights"
description: "Editorial Remotion article inserts with mandatory format/background intake, layered highlights, zero neon/glow, and mobile QA."
---

# Article Highlights

Use with `remotion-best-practices`, `motion-graphics`, and `cinematic-camera` for news, release, trend, and article-proof moments where a terminal would feel forced.

## Mandatory intake

Before coding, ask for any missing decision:

> Which format do you want: 4:3 half-screen Instagram insert or 9:16 full-screen Instagram? And which background: warm light, clean dark, light grid, or dark grid?

- 4:3 insert: 1440×1080, designed to remain readable at roughly half of a 9:16 frame.
- 9:16 full-screen: 1080×1920, respecting caption/interface zones.
- Use 16:9 only when explicitly requested.
- If the user delegates the background, use warm light.

The article paper can remain light on a clean-dark or dark-grid scene. Do not silently change the whole composition to dark.

## Absolute visual ban

Zero neon, glow, bloom, luminous edges, colored shadows, cyan-purple gradients, gradient orbs, radial color washes, glassmorphism, cyberpunk lighting, or vibe-coded AI decoration. Highlights must look like physical marker/paper treatment—not emitted light.

Reject any prohibited treatment before delivery.

## Approved reference

Inspect `assets/examples/article-highlight.mp4` and contact/reference frames before coding. Continue its editorial hierarchy, generous paper spacing, restrained marker treatment, slow camera, and legibility. Use the canonical repository gallery when local assets are unavailable: `https://github.com/Liamrjohnston/remotion-motion-graphics-skill`.

## When to use

Use for:

- Informative/news/release/trend beats.
- “Something changed or launched” proof.
- Real article excerpts with meaningful highlighted phrases.
- Non-terminal evidence where editorial material clarifies the point.

Use `terminal-inserts` for CLI/setup/agent-run stories. Use authentic product footage/UI when the beat is a product demo.

## Core architecture

Do not flatten the article when marker strokes must sit behind text. Build layered Remotion DOM/SVG:

1. Selected scene surface.
2. Editorial paper/card with generous safe padding.
3. Rough.js/SVG marker layer above paper.
4. DOM/SVG text above marker.

The marker must sit visibly behind words and above paper.

## Material and layout

- Paper: warm white/off-white with neutral border and soft neutral shadow; never colored glow.
- Typography: editorial/news hierarchy—small section label, large serif/editorial headline, muted byline/date, and at most 2–3 short body lines.
- Highlights: restrained semi-transparent physical marker color such as muted yellow; never fluorescent.
- Use real article/source identity and supplied copy. Do not invent publications, dates, claims, or quotes.
- Hard-wrap intentionally and keep text inside transformed safe margins.
- Do not center like a title slide; it should feel like an authentic article excerpt.
- Remove nonessential pills/buttons/source clutter if unreadable at destination size.

## Animation

- Begin with a brief restrained blur-to-focus only when it supports the approved reference; blur is optical focus, not glow.
- No marker visible during the early focus phase.
- Use a slow subtle camera push and restrained perspective rotation.
- Start marker strokes after focus settles.
- Draw each highlight left-to-right using a mask/wipe.
- Sequence highlights; never reveal all at once.
- End with all key phrases readable and a stable hold.
- Drive animation with `useCurrentFrame()`, `spring()`, and `interpolate()`; no CSS animation.

## Highlighter rules

- Use rough.js or an irregular SVG marker shape.
- Marker remains behind text.
- Slight imperfection is good; a perfect gradient rectangle is not.
- Highlight only meaningful verified phrases, not whole paragraphs.
- Marker opacity must preserve text contrast.
- No fluorescent yellow, light emission, blur halo, or glowing edge.

## No redundant narration

Article/source text may appear when it is the actual evidence. Do not add a separate headline that merely repeats the spoken VO. Use only the authentic excerpt and minimal structural metadata.

## First-pass rejection gate

Do not deliver until every answer is “no”:

1. Was format or background unconfirmed?
2. Is there neon, glow, luminous marker treatment, colored shadow, gradient wash, or glassmorphism?
3. Is the source/article identity or claim invented?
4. Is the card a generic centered title slide instead of an editorial surface?
5. Is any key text unreadable at the selected Instagram placement?
6. Does marker sit above/obscure text or appear too early?
7. Does the camera crop the paper or create empty travel?
8. Does the result miss the approved reference’s restraint and polish?

Revise privately until the gate passes.

## QA and delivery

1. Typecheck or run the smallest meaningful validation.
2. Render an early no-highlight still, a mid-stroke still, a final-highlight still, and the end hold.
3. Confirm the marker is invisible early, behind text, and complete at the end.
4. Inspect for clipping, unreadable copy, invented source details, neon/glow, and weak framing.
5. Deliver MP4 with dimensions, duration, exact render command, and editor placement note.
