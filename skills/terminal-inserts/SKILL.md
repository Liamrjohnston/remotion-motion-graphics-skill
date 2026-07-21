---
name: terminal-inserts
description: Create terminal-style Remotion insert graphics for carousels and AI-agent demos — authentic CLI installs, skills-loaded sequences, server logs, agent run logs, generated output cards, and clean dark terminal animations.
metadata:
  tags: remotion, terminal, cli, carousel, ai-agents, claude-code
---

# Terminal Inserts

Use this with the Remotion skill and the `motion-graphics` skill when making carousel/body-slide inserts that should look like polished terminal/product UI — especially for Claude Code, Codex, MCP, agents, skills, repo workflows, and automation demos.

## Goal

Make the idea obvious in under 2 seconds using an authentic terminal metaphor. The insert should look like a premium CLI/product demo, not a random code screenshot, checklist UI, or generic neon animation.

Approved examples live in `assets/examples/`:
- `terminal-install.mp4` — command -> ASCII/large terminal word -> authentic CLI lines -> success state.
- `outreach-sequence-generator.mp4` — command -> status -> structured generated cards.

Contact sheets live in `references/` for quick visual recall.

## Default specs

- Carousel insert render: match the destination frame exactly when known. If unknown, render 1440x1080, 30fps, 5 seconds, then crop/fit consciously.
- Background: near-black/navy (`#05070F`, `#070B16`) with subtle grain or radial glow.
- Terminal panel: dark charcoal/near-black rounded rectangle, soft shadow, 1px low-opacity border.
- Chrome: macOS traffic-light dots top-left; muted centered title/path optional, e.g. `archive@skills`.
- Typography: monospace only for terminal scenes. Prefer SF Mono, JetBrains Mono, IBM Plex Mono, Berkeley Mono fallback.
- Accent: terminal green (`#4ade80`, `#22C55E`, `#39FF88`) plus white/muted gray. Use only 2-3 colors for authentic CLI scenes.
- Audio is optional; carousel inserts usually should work silently.

## Critical authenticity rules

For terminal install/log scenes, do **not** make UI checklist cards.

Use terminal symbols and real CLI structure:

```txt
~ $ codex skills load carousel-qa

        ██████╗  █████╗
        QA CHECK LOADED

        ( + Welcome to Carousel QA )
┌ installing carousel-qa...
◇ skill added: brand-rules ✓
◇ skill added: slide-fit-checker ✓
◇ skill added: remotion-frame-guard ✓
◇ skill added: export-reviewer
◇ skill added: final-qa-runner

✓ carousel QA skill ready
```

Required for this pattern:
- Prompt starts with `~ $ ` or project path + `$`.
- Command types character-by-character.
- Use `┌` for section openers when helpful.
- Use `◇` as the line prefix for install/progress rows.
- Use inline trailing `✓` after completed rows.
- Use plain flowing terminal text, not card rows, checkboxes, pills, status chips, or rounded checklist components.
- Use a blinking block cursor `▊` or pipe cursor at the active line.
- Main output can include ASCII-style logo/word in green with subtle glow.

Avoid:
- Checkbox UI on the left.
- Big check icons as separate components.
- Emoji.
- Sans-serif UI lists.
- Dividers, card backgrounds, or dashboards inside the terminal.
- Random fake code dumps.

## Perspective/motion standard

The approved terminal install style is not just color changes. The **window itself** moves like a floating screen:

- Terminal slides in from bottom with 3D perspective.
- Use `perspective(...) rotateX(18deg-22deg)` and a slight `rotateY` oscillation or directional tilt.
- Keep the terminal readable and mostly front-facing; the tilt should feel premium, not warped.
- Add subtle scale/fade on entry, then a small settling movement.
- End state holds cleanly for 20-30 frames.

## Reusable patterns

### 1. Authentic skill install / loaded skill

Use for Claude Skills, Codex setup, MCP install, agent bootstrapping.

Sequence:
1. Terminal window enters from bottom with perspective/tilt.
2. Command types in: `codex skills load research-router` or `claude skill install content-engine`.
3. ASCII/large green keyword appears: `LOADED`, `ARCHIVE`, `VERIFY`, `DEPLOY`.
4. Optional welcome pill rendered as terminal-looking text, not a UI pill: `( + Welcome to Archive Skills )`.
5. CLI lines reveal top-down using `◇ skill added: ...` and trailing `✓`.
6. End with one readable success line: `✓ workflow ready`.

### 2. Command -> generated cards

Use when showing AI producing structured output like personas, hooks, briefs, or outreach steps.

Sequence:
1. Terminal command types in.
2. Green status line appears.
3. Reveal 2-3 dark output cards left-to-right or bottom-up.
4. Cards have green icon/avatar, green title, 1 short muted body line.

This pattern can use cards because the point is generated output. Do not use cards for pure terminal install/log scenes.

### 3. Agent run / verification log

Use for Codex or Claude Code doing work.

Sequence:
1. Command: `codex run "fix checkout bug"`.
2. Realistic log rows:
   - `◇ reading repository map ✓`
   - `◇ reproducing failing test ✓`
   - `◇ editing checkout handler ✓`
   - `◇ running npm test`
3. End with `✓ diff ready for review` or `✓ tests passed`.

## Motion rules

- Use `useCurrentFrame()`, `spring()`, and `interpolate()`. No CSS transitions for render-critical motion.
- Type commands at about 1 frame per character when possible.
- Stagger CLI line reveals by 6-12 frames.
- Reveal trailing `✓` a few frames after each line appears.
- ASCII/logo word should fade/scale in with subtle glow pulse, not bounce wildly.
- Tiny scanline/noise overlay is okay at very low opacity.
- End state should hold for at least 20-30 frames for preview capture.

## Mobile clarity rules

- One primary idea per insert.
- Big readable terminal word or readable final success line.
- Tiny log text may be texture, but the main message cannot depend on it.
- Prefer terminal authenticity over fake product screens.
- No random arrows/cursors/triangles unless they explain a step.
- Do not show dense real code unless the slide is explicitly about code.

## Professional brief requirements

When briefing an agent to build one of these, use a detailed scene-spec style prompt. Include:
- Exact canvas, FPS, duration, output path.
- Visual goal and reference examples.
- Scene-by-scene timing in frames.
- Exact command text, ASCII/hero word, log lines, final success line.
- Palette, fonts, terminal symbols, and explicit avoid-list.
- Motion details: perspective, rotateX/rotateY, spring/fade/scale, type speed, stagger timing.
- Validation: typecheck, render, ffprobe, frame/contact-sheet inspection.

## Brief template

```md
Create a Remotion video (1440x1080, 30fps, 5s / 150 frames) for a carousel insert.
Style: dark premium Mac terminal, matching approved examples in `assets/examples/terminal-install.mp4` and screenshot/reference.

Scene — Terminal install (150 frames)
- Terminal window with macOS traffic-light dots, title `archive@skills`, body #0d0d0d, title bar #1f1f1f.
- Window enters from bottom during frames 0-24 with perspective rotateX 20deg and slight rotateY oscillation, then settles while staying readable.
- Type command from frames 12-55 at ~1 frame/char: `~ $ codex skills load carousel-qa`.
- After typing, show large green ASCII/terminal word centered: `LOADED`.
- Show terminal-looking welcome line: `( + Welcome to Carousel QA )`.
- Reveal CLI lines progressively using exact terminal symbols, no UI checkboxes:
  `┌ installing carousel-qa...`
  `◇ skill added: brand-rules ✓`
  `◇ skill added: slide-fit-checker ✓`
  `◇ skill added: remotion-frame-guard ✓`
  `◇ skill added: export-reviewer ✓`
- Final line: `✓ carousel QA skill ready`.
- Use white for command, green for output, muted gray title. No cards, no checklist components, no emoji.
- Add blinking cursor at active/final line. Hold final state frames 120-150.

Validate with `npx tsc --noEmit`, render MP4, and inspect a frame/contact sheet.
```

## Carousel integration

- Remotion is only the visual insert; do not redesign the surrounding slide.
- Render at the exact insert aspect ratio/frame size whenever possible.
- If the slide frame uses rounded corners, keep important content away from the edges.
- Check the first frame: key text should already be acceptable or intentionally blank for motion. Avoid first-frame nonsense if the design tool exports a preview frame.
- Each carousel slide gets a distinct action/content state; repeated terminal shells are okay, repeated text/action is not.

## Quality gate

Before delivery:
- Typecheck/build or render a frame/video.
- Inspect the rendered output/contact sheet.
- Confirm: readable hero text, no clipping, terminal uses real CLI symbols, window has intended perspective movement, no generic filler, clean end hold.
- Deliver the MP4 and include the render command.
