---
name: "motion-graphics"
description: "Enforced Remotion art-direction workflow with bundled verified references, build preflight, independent criticism, and delivery gates."
---

# Motion Graphics for AI Videos

Use with `remotion-best-practices` and `cinematic-camera`. This skill owns intake, reference selection, authenticity, visual quality, and delivery authorization.

## Hard execution contract

Every build must pass the included gate script.

Locate this loaded skill directory, then use `scripts/promptible-gate.mjs`. Common paths:

- Claude Code: `.claude/skills/motion-graphics/scripts/promptible-gate.mjs`
- Other agents: `.agents/skills/motion-graphics/scripts/promptible-gate.mjs`

Do not write composition code until the script prints `BUILD AUTHORIZED`. Do not deliver a render until it prints `DELIVERY AUTHORIZED`. A failed command is a hard stop.

## Stage 1 — intake

Ask only for missing choices:

1. Format: **4:3 half-screen Instagram insert (1440×1080)** or **9:16 full-screen Instagram (1080×1920)**. Use 16:9 only when explicitly requested.
2. Surface: **warm light**, **clean dark**, **light grid**, or **dark grid**.
3. Script beat, duration, product identity, verified claims, and available assets.

Never silently default to dark. If the user delegates surface choice, use warm light.

## Stage 2 — reference preflight

Read `references/approved-references.md` and select the closest reference by mechanism—not merely color.

Run:

```bash
node <skill-dir>/scripts/promptible-gate.mjs init \
  --project . \
  --format 9:16 \
  --background warm-light \
  --reference tsenta-apply-faster \
  --identity authentic \
  --asset public/product-logo.svg \
  --claim-source user \
  --beat "Exact visual idea being supported" \
  --duration 6
```

`init` verifies the bundled approved MP4 and contact sheet by SHA-256, validates authentic local assets, and writes `.promptible/render-brief.json`.

Rules:

- Named products require `--identity authentic` and at least one real local asset.
- `--identity abstract` is only for unnamed conceptual visuals. Never add fake brands, UI, receipts, serials, or product claims.
- If verified references, assets, or claim provenance are missing: stop and ask. Never fall back to a generic visual.

Inspect the actual bundled MP4 and contact sheet. Write `.promptible/reference-observations.md` with these headings:

```markdown
## Composition
## Camera
## Identity
## Anti-pattern
```

Describe specific visible evidence under each heading, then run:

```bash
node <skill-dir>/scripts/promptible-gate.mjs inspect \
  --project . \
  --observations .promptible/reference-observations.md
```

Only `BUILD AUTHORIZED` permits implementation.

## Stage 3 — build

Follow the selected reference’s causal mechanism, camera grammar, object scale, density, and product authenticity—not merely its palette.

Hard rules:

- Zero neon, glow, bloom, luminous edges, colored shadows, gradient orbs/washes, cyan-purple gradients, glassmorphism, cyberpunk lighting, or vibe-coded AI styling.
- No generic receipt, invoice, dossier, clipboard, floating card, barcode, rubber stamp, certificate, pricing card, dashboard, or card-grid fallback.
- No invented UI, logos, metrics, prices, ranks, claims, engagement, serials, or product states.
- No redundant narration text. Real data, product UI, commands, code, filenames, and short structural labels are allowed.
- One connected world. Motion must reveal causality, scale, replacement, or state change.
- A static centered object with rows appearing plus a slow zoom is not cinematic-camera execution.
- Named product work uses real product surfaces and supplied assets. If unavailable, stop.
- Use fewer, larger focal objects. Keep the current action centered, fully visible, and readable at destination size.
- Dark scenes are opt-in. Dark means neutral charcoal with flat accents, never illuminated panels.

Read `references/rejected-patterns.md` before concept selection.

## Stage 4 — candidate evidence

Render the candidate. Generate a three-frame contact sheet and probe JSON using the chosen duration. Example for a 6-second render:

```bash
mkdir -p .promptible
ffmpeg -y -hide_banner -loglevel error -i out/candidate.mp4 \
  -vf "fps=3/6,scale=480:-1,tile=3x1:padding=12:margin=12:color=white" \
  -frames:v 1 .promptible/candidate-contact-sheet.jpg
ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height:format=duration -of json \
  out/candidate.mp4 > .promptible/candidate-probe.json
```

Then run:

```bash
node <skill-dir>/scripts/promptible-gate.mjs candidate \
  --project . \
  --render out/candidate.mp4 \
  --contact-sheet .promptible/candidate-contact-sheet.jpg \
  --probe .promptible/candidate-probe.json
```

This validates dimensions, duration, evidence files, and hashes them into the manifest.

## Stage 5 — independent visual critic

The builder cannot grade its own work. Start a separate clean critic/subagent and give it only:

- `references/visual-critic.md`
- selected approved MP4/contact sheet
- candidate MP4/contact sheet
- `.promptible/render-brief.json`

The critic inspects actual media and outputs JSON matching `templates/critic-output.example.json`. It must ignore builder rationale.

If an independent critic cannot run, stop and report that QA is unavailable. Never self-approve.

## Stage 6 — delivery gate

Save critic JSON, then run:

```bash
node <skill-dir>/scripts/promptible-gate.mjs qa \
  --project . \
  --critic .promptible/critic.json
```

The gate rejects hard failures, any category below 8/10, average below 8.5, incorrect dimensions, modified/missing evidence, or non-independent review. Revise and repeat candidate + critic + QA until `DELIVERY AUTHORIZED`.

## Technical and delivery rules

- Drive motion with `useCurrentFrame()`, `spring()`, and `interpolate()`; no CSS animation.
- Use hold → travel → hold. Action completes during holds; camera travels to the next action.
- End with a stable editor hold.
- Typecheck or run the smallest meaningful build validation.
- Deliver MP4 with exact dimensions, duration, render command, and editor placement note only after authorization.
