---
name: "terminal-inserts"
description: "Authentic, restrained Remotion terminal inserts with mandatory format/background intake and zero neon or glow."
---

# Terminal Inserts

Use with `remotion-best-practices`, `motion-graphics`, and `cinematic-camera` for Claude Code, Codex, MCP, agents, skills, repository workflows, automation demos, and authentic CLI inserts.

## Mandatory intake

Follow the `motion-graphics` intake gate before coding. If not already specified, ask:

> Which format do you want: 4:3 half-screen Instagram insert or 9:16 full-screen Instagram? And which background: warm light, clean dark, light grid, or dark grid?

The terminal window may remain charcoal on any chosen surface. A terminal object does not force the entire scene to be dark.

## Absolute visual ban

- Zero neon, fluorescent green, electric cyan, electric purple, or multicolor AI palettes.
- Zero glow, bloom, luminous edges, colored shadow, radial color wash, halo, aura, or light spill.
- No glassmorphism, shiny gradients, cyberpunk atmosphere, scanline spectacle, or “hacker movie” styling.
- No cyan-purple gradients or green glow around text, cursors, panels, or ASCII words.
- Use flat ink/charcoal surfaces, neutral borders, neutral shadows, and at most one restrained flat product or ANSI accent.

If any glow or neon appears in a still, reject the render and remove it before delivery.

## Goal and references

Make the idea obvious in under two seconds using an authentic terminal metaphor—not a random code screenshot, checklist UI, dashboard, or generic AI animation.

Inspect the actual approved examples before coding:

- `assets/examples/terminal-install.mp4` — command → large terminal word → authentic CLI lines → success state.
- `assets/examples/outreach-sequence-generator.mp4` — command → status → structured generated output.
- Repository example `examples/kickbacks-spinner-terminals.mp4` — multiple CLI sessions in one connected world.

Use contact sheets in `references/` when available. Continue their typography, density, spacing, and motion, while enforcing the zero-glow rule above.

## Surface and terminal specs

- Match the selected destination exactly.
- 4:3 insert: 1440×1080, 30fps unless the user specifies otherwise.
- 9:16 full-screen: 1080×1920, 30fps unless specified otherwise.
- Terminal: `#101214` / `#15181B`, charcoal title bar, 1px neutral border, neutral black shadow.
- Scene surface comes from the user’s selected warm light, clean dark, light grid, or dark grid option.
- Typography: monospace only inside the terminal. Prefer SF Mono, JetBrains Mono, IBM Plex Mono, or Berkeley Mono fallback.
- Text: warm white and muted gray.
- Accent: one restrained flat product color or subdued terminal green such as `#4F8F6D`; no fluorescent `#39FF88`.
- macOS traffic-light dots are allowed as small authentic chrome, not as a decorative palette.

## Critical authenticity rules

For install/log scenes, use terminal symbols and flowing CLI text—not UI checklist cards:

```txt
~ $ codex skills load carousel-qa

        QA CHECK LOADED

        ( + Welcome to Carousel QA )
┌ installing carousel-qa...
◇ skill added: brand-rules ✓
◇ skill added: slide-fit-checker ✓
◇ skill added: remotion-frame-guard ✓
◇ skill added: export-reviewer

✓ carousel QA skill ready
```

Required:

- Prompt starts with `~ $ ` or a project path plus `$`.
- Command types character-by-character.
- `┌` may open a section.
- `◇` prefixes install/progress rows.
- Completed rows use a trailing `✓`.
- Use plain flowing terminal text, not rounded checklist components.
- Use a blinking `▊` or pipe cursor at the active line.
- A large ASCII/terminal word may fade and scale in using flat text color only—never glow.

Avoid:

- Checkbox UI or separate oversized check icons.
- Emoji and sans-serif UI lists inside the terminal.
- Pills, status chips, dividers, dashboards, or nested card rows for terminal logs.
- Random fake code dumps.
- Dense illegible logs used as decorative texture.

## Perspective and motion

- Build the terminal in the same connected camera world as supporting objects.
- Enter with controlled perspective such as `perspective(...) rotateX(18deg–22deg)` and a slight directional `rotateY`.
- Keep it readable and mostly front-facing; the tilt must feel physical, not warped.
- Use subtle scale/fade and a restrained settle.
- End with a clean 20–30 frame hold.
- Drive motion with `useCurrentFrame()`, `spring()`, and `interpolate()`; no CSS animation.
- Type commands at roughly one frame per character where practical.
- Stagger CLI rows by 6–12 frames and reveal trailing checks after each line.
- Do not add glow pulses, color pulses, scanline flashes, or decorative light sweeps.

## Reusable patterns

### Authentic skill install

1. Terminal enters with controlled perspective.
2. A real-looking command types in.
3. A large flat ASCII/terminal word appears: `LOADED`, `VERIFY`, or `DEPLOY`.
4. CLI rows reveal using `◇ ... ✓`.
5. One concise success line finishes the action.

### Command → generated output

1. Command types in.
2. A restrained flat status line appears.
3. Two or three output objects reveal.
4. Output objects may use cards only because generated structured output is the point; use neutral materials and one restrained accent.

### Agent run / verification log

1. Type a plausible command such as `codex run "fix checkout bug"`.
2. Reveal realistic actions: reading, reproducing, editing, testing.
3. End with `✓ diff ready for review` or another truthful state.

Never invent product capabilities or claim tests passed unless the supplied story requires that exact illustrative state.

## Mobile clarity

- One primary idea per insert.
- The main command, terminal word, or success state must remain readable at phone size.
- 4:3 inserts must be legible when occupying roughly half of a 9:16 frame.
- Tiny logs cannot carry the main message.
- Use no redundant narration text; real commands, filenames, UI strings, and verified output belong on screen.

## First-pass rejection gate

Do not deliver until every answer is “no”:

1. Was format or background left unconfirmed?
2. Is there any neon, glow, radial color wash, fluorescent green, or cyan-purple treatment?
3. Does the terminal look like a checklist, dashboard, glass card, or generic AI template?
4. Is the scene dark only because a terminal exists rather than because the user chose dark?
5. Is essential text unreadable at the destination size?
6. Are CLI structure, product identity, or output claims fake when authentic material exists?
7. Does the result miss the approved examples’ spacing, restraint, and motion quality?

Revise privately until the gate passes.

## QA and delivery

1. Typecheck/build or render the smallest meaningful validation.
2. Render stills for command entry, primary output, and end hold.
3. Compare against the approved terminal examples.
4. Inspect the MP4 for clipping, weak perspective, tiny text, generic filler, any glow/neon, and weak end frames.
5. Deliver the MP4 with dimensions, duration, exact render command, and editor placement note.
