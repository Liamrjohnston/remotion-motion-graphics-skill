---
name: "cinematic-camera"
description: "Continuous-scene Remotion camera system with mandatory intake, approved-reference review, anti-neon rules, and first-pass QA."
---

# Cinematic Camera

Use with `remotion-best-practices` and `motion-graphics`. Build one connected world and move a shared camera through it instead of popping disconnected panels into a void.

## Mandatory intake

Before planning or coding, follow the `motion-graphics` intake gate. If missing, ask:

> Which format do you want: 4:3 half-screen Instagram insert or 9:16 full-screen Instagram? And which background: warm light, clean dark, light grid, or dark grid?

Do not silently default to 9:16 or dark. If the user delegates the choice, use warm light.

## Absolute visual ban

This skill never introduces neon, glow, bloom, luminous edges, colored shadows, gradient orbs, radial color washes, cyan-purple gradients, glassmorphism, or cyberpunk lighting. Camera movement cannot turn a restrained scene into a vibe-coded AI demo. Product accents remain flat and restrained.

## Mandatory approved-reference gate

Complete before planning or coding:

1. Inspect the latest 3–5 approved renders relevant to the same project, product, aspect ratio, placement, or visual mechanism.
2. Open source compositions and inspect camera keyframes, timing, spacing, typography, colors, density, entrances, exits, and end holds.
3. Inspect actual clips or representative frames; filenames alone are insufficient.
4. Inventory authentic assets: logos, mascots, screenshots, recordings, footage, and prior outputs.
5. Write a short beat map explaining how the clip continues the approved system.
6. If no project reference exists, use the locked fallback: warm off-white physical/editorial world, dark ink, muted neutrals, one restrained flat brand accent, neutral shadows, and zero decorative effects.

Reference priority: same video → same product/series → same aspect ratio/use case → other approved repository examples → locked fallback.

Canonical gallery: `https://github.com/Liamrjohnston/remotion-motion-graphics-skill`

Recent approved work is the baseline, not optional inspiration. Do not invent a new aesthetic for novelty.

## Core idea

Build one world larger than the viewport. Open tight on an action, hold while it completes, reveal context, travel to the contrast/payoff, then settle.

Panels may exist, but they must share a world and meaningful spatial relationship. Avoid disconnected cards appearing independently in empty space.

## Camera rig

Use one shared keyframe timeline for focal point and zoom:

```tsx
const ease = Easing.inOut(Easing.cubic);
const KEY_T = [0, 46, 62, 78, 96, 132, 174, TOTAL_FRAMES];

const fx = interpolate(frame, KEY_T, [/* focal x */], {
  easing: ease,
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});
const fy = interpolate(frame, KEY_T, [/* focal y */], {
  easing: ease,
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});
const z = interpolate(frame, KEY_T, [/* zoom */], {
  easing: ease,
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});

<AbsoluteFill style={{backgroundColor: BG}}>
  <div
    style={{
      position: 'absolute',
      transform: `translate(${VIEW_W / 2 - fx}px, ${VIEW_H / 2 - fy}px) scale(${z})`,
      transformOrigin: `${fx}px ${fy}px`,
    }}
  >
    {/* Entire scene in world coordinates */}
  </div>
</AbsoluteFill>
```

- Dimensions come from the confirmed format, never a hidden default.
- World width is usually 2–2.5 times viewport width.
- Repeated adjacent keys create holds.
- Camera moves usually take 14–24 frames.
- End with two nearly identical keys for a stable editor hold.
- Camera, cursor, effects, and connected objects remain in one coordinate system.

## Choreography

1. Open tight on something already moving.
2. Hold while the primary action completes.
3. Reveal its larger system.
4. Travel to the contrast/payoff.
5. Pull out while supporting objects finish in staggered sequence.
6. Settle for a clean cut.

Rules:

- Camera moves to the next action; action completes during the hold.
- One primary action per beat.
- Use micro-motion only to show state: typing, ticking, checking, playback, progress, cursor movement.
- Prefer continuous transformation over scene replacement.
- Prefer smooth travel over frantic whips.
- Motion explains causality; it never compensates for a weak concept.

## Authenticity and text

- Use real logos, footage, screenshots, recordings, UI, and verified data when available.
- Never substitute generic colored squares, fake marks, invented UI, or fake metrics.
- Product names, filenames, counters, commands, progress, and real UI text are allowed.
- Do not repeat narrated sentences or add explanatory badges because a frame feels empty.

## First-pass rejection gate

Do not show a render until every answer is “no”:

1. Was format or background unconfirmed?
2. Is there any neon, glow, colored lighting, gradient wash, glass panel, or vibe-coded AI treatment?
3. Is the scene a set of disconnected generic cards in a void?
4. Is dark used without the user choosing it or an approved reference requiring it?
5. Does camera movement decorate instead of guiding causality?
6. Are authentic assets missing when available?
7. Are essential elements unreadable at the chosen Instagram placement?
8. Does the result fail to match approved reference spacing, density, materials, and motion rhythm?

Revise privately until the gate passes.

## QA and delivery

1. Render stills for the opening, each camera destination, transition, payoff, and end hold.
2. Compare beside approved references for framing, density, identity, material restraint, and polish.
3. Verify authentic assets remain readable.
4. Verify hold → move → hold and no action is hidden during travel.
5. Inspect the full MP4 for empty travel, crops, dead frames, generic filler, neon/glow, and weak end holds.
6. Deliver only when it looks like the same approved visual system.

## Technical constraints

- Drive motion with `useCurrentFrame()`, `spring()`, and `interpolate()`; no CSS animation.
- `interpolate()` input ranges must be strictly increasing.
- Keep worlds moderate; large blurred/shadowed layers are expensive and usually violate the visual rules.
- Use tabular numerals for ticking data.
