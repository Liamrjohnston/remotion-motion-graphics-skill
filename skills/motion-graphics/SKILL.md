---
name: motion-graphics
description: Opinionated motion-graphics rules for AI-education video B-roll built with Remotion. Use when creating kinetic text, AI workflow diagrams, UI mockups, charts, comparisons, or short renderable insert clips.
metadata:
  tags: remotion, motion-graphics, b-roll, text-animation, ai-videos
---

# Motion Graphics for AI Videos

## Example output

Clips built by an agent following this skill (click for full MP4):

<p>
  <a href="../../examples/tsenta-apply-faster.mp4"><img src="../../previews/tsenta-apply-faster.gif" alt="Old way vs AI way comparison" width="24%"/></a>
  <a href="../../examples/openmontage-tool-chaos.mp4"><img src="../../previews/openmontage-tool-chaos.gif" alt="Tool chaos collapsing into one system" width="43%"/></a>
</p>

Use this alongside the official Remotion best-practices skill. The official skill gives API correctness; this skill gives taste, repeatable patterns, and production constraints for short-form and long-form AI education content.

## Prime Directive

Build graphics that make the video's point easier to understand in under 2 seconds.

## No Redundant On-Screen Text (Hard Rule)

Talking-head videos usually have spoken VO + burned captions over the top. The graphic must NOT repeat the script line as on-screen copy. Do not put the narrated phrase, headline restatements, or descriptive label sentences on screen. Carry meaning through the visual/diagram itself.

- Allowed: data the graphic IS about — counters, real numbers ($, token counts, %), axis/unit labels, UI/app text that belongs in a mockup, code.
- Not allowed: restating the VO ("Same answers", "60–95% fewer tokens", "You never touch your code", etc.), explanatory captions, or pill/badge phrases that echo the narration.
- When a beat feels empty without a phrase, the fix is a better/clearer graphic, not added text.

Priorities:
1. Clarity — the viewer instantly understands the idea.
2. Retention — motion creates pattern interrupts and guides attention.
3. Polish — smooth, modern, premium, but never distracting.
4. Reusability — components should be easy to remix for future videos.

## Default Canvas Presets

- Vertical short-form: `1080x1920`, 30fps, 3-8 seconds.
- Horizontal YouTube/B-roll: `1920x1080`, 30fps, 4-10 seconds.
- Transparent overlay: render ProRes/WebM only when explicitly useful; otherwise use a dark/clean background for easy review.
- Review copy: H.264 MP4 with reasonable CRF so it's small enough to share in chat.

## Visual Language

- Clean dark backgrounds, high contrast, crisp text.
- Modern SaaS/AI aesthetic: glass panels, subtle glows, thin outlines, soft shadows.
- Use blue/cyan/purple accents by default; add green for success/automation, red/orange for pain/problem states.
- Avoid cluttered cyberpunk, fake hologram spam, tiny labels, and overdone neon.
- Prefer fewer larger elements over many small ones.
- Do not default to generic fake SaaS/browser-card demos; build visuals grounded in the real product or idea.

Recommended defaults:
```ts
const COLORS = {
  bg: '#060812',
  panel: '#0F172A',
  panel2: '#111827',
  text: '#F8FAFC',
  muted: '#94A3B8',
  blue: '#3B82F6',
  cyan: '#22D3EE',
  purple: '#8B5CF6',
  green: '#22C55E',
  red: '#EF4444',
};
```

## Motion Rules

- Drive all animation from `useCurrentFrame()` and `useVideoConfig()`.
- No CSS transitions/keyframes/Tailwind animation classes for render-critical motion.
- Prefer `spring()` for entrances and emphasis; use `interpolate()` for precise fades, wipes, and progress.
- Use staggered entrances: 3-8 frames for dense UI items, 8-15 frames for major objects.
- Never animate everything at once. Sequence attention: headline → object → proof/detail → payoff.
- Use motion to explain causality: data flows left-to-right or top-to-bottom; transformations happen through arrows, lines, or morphing panels.
- Every clip should have either a subtle hold or clear end state so editors can cut cleanly.

Good spring presets:
```ts
const SPRINGS = {
  snappy: { damping: 20, stiffness: 200 },
  smooth: { damping: 200, stiffness: 100 },
  bouncy: { damping: 10, stiffness: 140 },
  heavy: { damping: 16, stiffness: 80, mass: 1.6 },
};
```

## Kinetic Text Patterns

Use text animation when the point is a phrase, claim, contrast, or hook.

Preferred patterns:
- Word-by-word reveal with slight y-slide + fade.
- Highlight sweep behind the key word.
- Word carousel for before/after replacements.
- Typewriter only for AI/chat/code moments; use string slicing, not per-character hidden spans.
- Two-layer crossfade for highlighted final text to avoid layout jumps.

Rules:
- Mobile headline minimum: ~64px on 1080x1920.
- Supporting text minimum: ~38px vertical / ~30px horizontal.
- Use max 1-2 font weights per graphic.
- Keep line lengths short; break phrases intentionally.
- Do not put critical text near Reels/TikTok UI zones.

## AI Workflow / System Diagram Patterns

1. **Input → AI Agent → Output**
   - Great for simple automation explanations.
   - Animate input card in, pulse agent node, line draw to output card.

2. **Old Way vs AI Way**
   - Split screen or stacked comparison.
   - Old way: gray/red, more steps, slower animation.
   - AI way: blue/green, fewer steps, faster/smoother path.

3. **Agent Team / Multi-Agent Flow**
   - Central orchestrator node with specialist nodes around it.
   - Use staggered line draws and small status chips.

4. **Tool Stack / Pipeline**
   - Horizontal cards: Trigger → Reasoning → Tool Call → Database/CRM → Report.
   - Use small animated packets moving along lines.

5. **ROI / Before-After Metric**
   - Big number animation, simple bar/line/progress visual.
   - Always include label and context so it is not just eye candy.

## UI Mockups

For product demos and stylized software screens:
- Recreate the *idea* of the UI, not exact copyrighted pixels unless assets are provided.
- Use large fake UI panels that read on mobile.
- Animate cursor/clicks only when they clarify the action.
- Use callouts: outline box + short label + arrow/leader line.
- Blur or abstract sensitive/private data.

## Charts / Data Visuals

Use charts for metrics, money, time saved, adoption, lead flow, or performance.

Rules:
- Always label axes or use direct labels.
- Animate bars/lines with staggered spring entrances.
- Use `@remotion/paths` for line/path drawing and marker-following.
- Avoid third-party chart library animations; Remotion controls the animation.
- Keep charts simple: 3-7 data points usually beats a full dashboard.

## Transitions

Use `@remotion/transitions` for multi-scene clips when scenes need a professional flow.

Best defaults:
- Fade: clean idea shift.
- Slide: step-by-step process or carousel.
- Wipe: reveal/compare.
- Flip: use sparingly; can feel gimmicky.

Remember: transitions overlap adjacent scenes, so calculate duration accordingly.

## Package Arsenal

Core packages worth having installed:
- `@remotion/transitions` — scene transitions.
- `@remotion/paths` — SVG line/path/chart animations.
- `@remotion/google-fonts` — clean font loading when needed.
- `@remotion/layout-utils` — measure/fit text and avoid overflow.
- `@remotion/media` — audio/video helpers.
- `@remotion/shapes` — primitives for clean geometric visuals.

Use optional packages only when the concept needs them:
- `@remotion/lottie` for provided Lottie files.
- `@remotion/captions` for real caption/subtitle workflows.
- `@remotion/three` only for true 3D scenes; do not default to 3D.

## Prompt Intake Checklist

Before building, infer or decide:
- Script beat / exact line being supported.
- Best visual metaphor: text, diagram, UI mock, chart, comparison, caption, transition, abstract loop.
- Canvas: vertical/horizontal/transparent overlay.
- Duration and where the editor will place it.
- Main text and any data points.
- Whether it should loop, hold, or end cleanly.

If missing, make a first-pass assumption and state it briefly.

## Quality Gate Before Delivering

Before shipping a render:
- Build/typecheck or run the smallest meaningful validation.
- Render a compressed review MP4/still.
- Watch/inspect enough to ensure it actually rendered correctly.
- Include concise editor notes: what it is, where it fits, and what can be changed.
