---
name: "motion-graphics"
description: "Add cached official-asset and product research preflight before reference selection and build authorization."
---

# Motion Graphics for AI Videos

Use with `remotion-best-practices` and `cinematic-camera`. This skill owns intake, research, authentic assets, reference selection, visual quality, and delivery authorization.

## Hard execution contract

Every build must pass `scripts/promptible-gate.mjs`.

Common paths:

- Claude Code: `.claude/skills/motion-graphics/scripts/promptible-gate.mjs`
- Other agents: `.agents/skills/motion-graphics/scripts/promptible-gate.mjs`

Do not write composition code until the script prints `BUILD AUTHORIZED`. Do not deliver a render until it prints `DELIVERY AUTHORIZED`. A failed command is a hard stop.

## Stage 1 — concise intake

Ask only for missing choices:

1. Format: **4:3 half-screen Instagram insert (1440×1080)** or **9:16 full-screen Instagram (1080×1920)**. Use 16:9 only when explicitly requested.
2. Surface: **warm light**, **clean dark**, **light grid**, or **dark grid**.
3. Exact script beat, duration, named products, verified claims, and supplied assets.

Never silently default to dark. If the user delegates surface choice, use warm light.

## Stage 2 — research and authentic assets

Read `references/research-and-assets.md` and `references/logo-library.md`.

Run the smallest useful research course before concept work:

- Supplied user assets are authoritative. Use them exactly; never redraw or replace them.
- For common products, copy a suitable bundled logo from `assets/logos/` into the project and retain its provenance.
- If missing, inspect 1–3 authoritative pages: official brand kit/homepage, official docs/product page, then a reputable curated icon source.
- Prefer transparent SVG. Never use screenshots of logos, search-result thumbnails, baked checker/gray backgrounds, unofficial recreations, or hotlinked remote assets.
- For a dashboard/product UI, acquire a real supplied screenshot/recording or an official public product/docs screenshot. If none exists, ask; do not invent a dashboard.
- Research visible structure, terminology, brand color, and the exact action/state relevant to the beat. Do not copy unsupported metrics, private information, or claims.
- Cache assets and notes under `.promptible/research/`. Reuse a cache hit when product, sources, asset hashes, and reference mechanism are unchanged.

Choose only the visual mode the beat needs: `logo-system`, `product-ui`, `terminal`, `editorial`, or `abstract`. Do not force a newsletter, dashboard, terminal, or elaborate camera move into every graphic.

Write `.promptible/research-brief.md` with these headings:

```markdown
## Product or concept
## Authoritative sources
## Real visual language
## Closest approved mechanism
## Motion plan
## Avoid
```

Then run:

```bash
node <skill-dir>/scripts/promptible-gate.mjs research \
  --project . \
  --research-mode authentic \
  --visual-mode product-ui \
  --product "Slack" \
  --reference kickbacks-same-run-editor \
  --brief .promptible/research-brief.md \
  --source https://slack.com/ \
  --logo public/research/slack.svg \
  --surface public/research/slack-dashboard.png
```

For unnamed conceptual work, use `--research-mode abstract --visual-mode abstract`; the brief and approved-reference comparison still apply, but unnecessary web/logo research does not.

## Stage 3 — verified reference preflight

Read `references/approved-references.md`. Select by story mechanism, not color. A new concept is allowed when it is more specific to the request, but it must explicitly inherit camera grammar, scale, restraint, and causal motion from the closest approved mechanism. Combine at most two mechanisms.

Run:

```bash
node <skill-dir>/scripts/promptible-gate.mjs init \
  --project . \
  --research .promptible/research-manifest.json \
  --format 9:16 \
  --background warm-light \
  --claim-source user \
  --beat "Exact visual idea being supported" \
  --duration 6
```

`init` revalidates research/assets, verifies the bundled approved MP4/contact sheet by SHA-256, and writes `.promptible/render-brief.json`.

Inspect the actual bundled MP4/contact sheet and the researched product evidence. Write `.promptible/reference-observations.md` with:

```markdown
## Composition
## Camera
## Identity
## Research match
## Anti-pattern
```

Then run:

```bash
node <skill-dir>/scripts/promptible-gate.mjs inspect \
  --project . \
  --observations .promptible/reference-observations.md
```

Only `BUILD AUTHORIZED` permits implementation.

## Stage 4 — build

Use the researched identity and the selected reference’s causal mechanism. The result should feel specific on the first pass, not like a template waiting for corrective prompting.

Hard rules:

- Zero neon, glow, bloom, luminous edges, colored shadows, gradient orbs/washes, cyan-purple gradients, glassmorphism, cyberpunk lighting, or vibe-coded AI styling.
- No generic receipt, invoice, dossier, clipboard, floating card, barcode, rubber stamp, certificate, pricing card, fake dashboard, or disconnected card-grid fallback.
- Realistic dashboards are encouraged only when grounded in supplied or authoritative product evidence. Recreate visible structure faithfully; never invent metrics, claims, controls, or product states.
- No invented UI, logos, prices, ranks, engagement, serials, or proof.
- No redundant narration text. Real data, product UI, commands, code, filenames, and short structural labels are allowed.
- Motion must reveal causality, scale, replacement, navigation, or state change. It may be restrained when a logo swap or authentic UI action communicates the beat clearly.
- A static centered object with rows appearing plus a slow zoom is not cinematic execution.
- Use fewer, larger focal objects. Keep the current action centered, fully visible, and readable at destination size.
- Dark scenes are opt-in. Dark means neutral charcoal with flat accents, never illuminated panels.

Read `references/rejected-patterns.md` before concept selection.

## Stage 5 — candidate evidence

Render the candidate. Generate a three-frame contact sheet and `ffprobe` JSON. Example for six seconds:

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

## Stage 6 — independent visual critic

The builder cannot grade its own work. Start a separate clean critic/subagent with:

- `references/visual-critic.md`
- research brief/manifest and authentic assets
- selected approved MP4/contact sheet
- candidate MP4/contact sheet
- `.promptible/render-brief.json`

The critic inspects actual media and returns JSON matching `templates/critic-output.example.json`. If independent review cannot run, stop; never self-approve.

## Stage 7 — delivery gate

```bash
node <skill-dir>/scripts/promptible-gate.mjs qa \
  --project . \
  --critic .promptible/critic.json
```

The gate rejects hard failures, any category below 8/10, average below 8.5, modified/missing research or evidence, or non-independent review. Revise until `DELIVERY AUTHORIZED`.

## Technical and delivery rules

- Drive motion with `useCurrentFrame()`, `spring()`, and `interpolate()`; no CSS animation.
- Use hold → travel → hold when travel helps. Action completes during holds.
- End with a stable editor hold.
- Typecheck or run the smallest meaningful build validation.
- Deliver MP4 with exact dimensions, duration, render command, and editor placement note only after authorization.
