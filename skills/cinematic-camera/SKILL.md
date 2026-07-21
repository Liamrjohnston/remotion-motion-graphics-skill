---
name: cinematic-camera
description: Continuous-scene camera-rig style and approved-reference review process for Remotion motion graphics.
---

# Cinematic Camera

A movement system for Remotion graphics: instead of disconnected panels popping in and out of a void, build one continuous scene and move a camera through it. Use for most renders unless the request explicitly calls for a static composition.

## Approved-reference gate

Complete this before planning or coding:

1. Look at the latest 3–5 approved renders relevant to the same project, series, product, aspect ratio, or visual idea.
2. Open the source compositions and inspect their camera keyframes, timing, spacing, typography, colors, density, entrances, exits, and end holds.
3. Inspect representative frames or the actual renders when available. Filenames alone are not enough.
4. Inventory real product assets in `public/`: logos, mascots, screenshots, recordings, footage, and prior outputs. Prefer authentic assets over CSS placeholders or invented marks.
5. Write a short beat map that explains how the new clip continues the approved visual system.
6. If no relevant approved reference exists, say so and plan the new direction before rendering.

Do not begin implementation from generic defaults when an approved project-specific system exists. Recent approved work is the baseline, not optional inspiration.

Reference priority:

1. Same project and same video.
2. Same product or series.
3. Same aspect ratio and use case.
4. Other recently approved renders.
5. Generic defaults only when no approved reference applies.

## Core idea

Build one continuous scene—a world larger than the viewport—and move a camera through it. The viewer travels through the idea: open tight on an action, reveal its context, move to the contrast or payoff, then settle.

Avoid disconnected panels appearing independently in a void. Panels may exist, but they should share one world and camera, with meaningful spatial relationships.

## Camera rig

Use one shared keyframe timeline for focal point and zoom:

```tsx
const ease = Easing.inOut(Easing.cubic);
const KEY_T = [0, 46, 62, 78, 96, 132, 174, TOTAL_FRAMES];

const fx = interpolate(frame, KEY_T, [/* focal x */], {
  easing: ease,
  extrapolateRight: 'clamp',
});
const fy = interpolate(frame, KEY_T, [/* focal y */], {
  easing: ease,
  extrapolateRight: 'clamp',
});
const z = interpolate(frame, KEY_T, [/* zoom */], {
  easing: ease,
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

- Default canvas: 1080x1920 at 30fps unless the editor requests another format.
- World width is usually 2–2.5 times the viewport width.
- Repeat values across adjacent keys to create holds.
- Camera moves generally take 14–24 frames.
- End with two nearly identical keys for a clean editor hold.
- Keep the camera, cursor, impact effects, and connected panels in the same world coordinate system.

## Choreography grammar

1. Open tight on something already moving.
2. Hold while the primary action completes.
3. Reveal that the action belongs to a larger system.
4. Whip-pan or travel to the contrast/payoff.
5. Pull out while supporting elements finish in staggered waves.
6. Settle for a clean cut.

Rules:

- Camera moves to the action; the action happens during the hold.
- One primary action per beat.
- Use micro-motion during holds: typing, ticking, pulsing, playback, progress, or cursor movement.
- Prefer continuous transformation over scene replacement.
- Clicks use a short press, ripple, and visible state change.
- Motion must explain the script beat, not merely decorate it.

## Authenticity and identity

- Use real logos, mascots, footage, screenshots, recordings, or output files when available.
- Do not substitute colored squares, generic landscapes, invented marks, or fake UI when authentic assets exist.
- Match the product's established visual identity before applying generic defaults.
- Reuse the project's existing components and camera language when appropriate.
- Product names, filenames, counters, progress, and real UI text are allowed. Do not repeat narrated sentences.

## Mandatory QA before delivery

1. Render representative stills for the opening, each major camera destination, the transition/impact, and the payoff.
2. Compare those frames beside the approved references for framing, density, identity, and polish.
3. Verify every important logo and product asset is real and readable.
4. Verify camera moves follow hold → move → hold and the action is not hidden during a whip.
5. Render the full review MP4.
6. Inspect the full motion pass enough to catch lingering overlays, empty transitions, cropped assets, dead frames, or weak end holds.
7. Deliver only when it looks like the same visual system as the approved references.

If the first pass misses the reference standard, revise before showing it.

## Technical constraints

- Drive render-critical motion with `useCurrentFrame()`, `spring()`, and `interpolate()`.
- No CSS transitions or keyframes.
- `interpolate()` input ranges must be strictly increasing.
- Keep worlds moderate in size; large blurred or shadowed layers can slow renders.
- Use tabular numerals for ticking data.
- Follow the `motion-graphics` skill and the official Remotion best-practices skill alongside this one.
