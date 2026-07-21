---
name: article-highlights
description: Create article/news-style Remotion carousel inserts with clean editorial cards, layered text, rough.js highlighter strokes behind keywords, blur-in, and subtle 3D camera motion for informative/release/news/trend topics.
metadata:
  tags: remotion, editorial, news, highlights, carousel, roughjs
---

# Article Highlights

## Example output

The approved reference render for this skill — an editorial card that blurs in, slowly zooms with a subtle 3D tilt, then draws hand-drawn highlighter strokes behind the key phrases (click for full MP4):

<p>
  <a href="assets/examples/article-highlight.mp4"><img src="../../previews/article-highlight.gif" alt="Article highlight editorial card" width="55%"/></a>
</p>

Use this with the Remotion skill and the `motion-graphics` skill when a carousel slide should feel like an editorial/news/article screenshot rather than a terminal demo.

Use this pattern for:
- Informative/news/release/trend slides.
- "Something just changed/launched" topics.
- Explaining a key claim by highlighting keywords in an article-like layout.
- Non-terminal visual proof where terminal UI would feel forced.

Prefer the `terminal-inserts` skill instead for Claude Code/Codex/skills/CLI/setup/agent-run visuals.

## Core architecture

Do **not** use a flattened article screenshot when the highlight must appear behind text.

Build layered Remotion DOM/SVG:
1. White full-HD background.
2. White editorial article/card/paper layer with generous padding.
3. Rough.js highlighter SVG layer above the paper.
4. DOM/SVG text layer above the highlighter.

This is required so the marker appears behind the words but visibly on the paper.

## Default specs

- Composition: 1920x1080, 30fps, 5s / 150 frames.
- Background: white or very light editorial canvas.
- Card: centered, generous margins, subtle shadow optional, no clipping.
- Typography: editorial/news-like hierarchy.
  - Small uppercase section label.
  - Large bold serif or editorial headline.
  - Muted byline/date.
  - 2-3 short body lines max.
  - Optional muted pill/button/source row.
- Highlights: semi-transparent yellow, rough.js/hand-drawn marker style, behind text.

## Animation standard

- Frames 0-30: whole composition starts blurred and unblurs over 1 second.
- No highlight visible at frame 0 or early blur frames.
- Full duration: slow subtle zoom into the article.
- Add slight 3D left-to-right rotation with perspective. Target around 15deg total per axis, but reduce if needed to prevent clipping/readability issues.
- Start highlighter only after blur finishes, around frame 38-45.
- Draw each highlight left-to-right like dragging a marker over paper.
- Sequence highlights, do not reveal all at once.
- Final state holds with highlights visible.

## Highlighter rules

- Use rough.js or irregular SVG marker shapes.
- Animate reveal with a clipping mask/wipe from left to right.
- Highlighter must be behind text and above paper.
- Yellow should be visible but not obscure text.
- Make the stroke slightly imperfect, not a clean rectangle.
- Target only meaningful keywords/phrases, not whole paragraphs.

## Layout rules

- Hard-wrap headline/body lines intentionally.
- Keep all text inside safe margins.
- Check transformed/rotated card does not clip in the viewport.
- Do not let body copy run off the right edge.
- Do not center it like a title slide; it should feel like an article/webpage excerpt.

## When briefing Remotion

Include:
- Composition size/FPS/duration/output path.
- The article copy and exact phrases to highlight.
- Exact timing: blur, first highlight, second highlight, final hold.
- Requirement that highlights start invisible and draw on after blur.
- Requirement to build layered DOM/SVG, not flattened image text.
- QA stills: early no-highlight frame, mid-highlight frame, final-highlight frame.

## Quality gate

Before delivery:
- `npx tsc --noEmit`.
- Render MP4.
- Render stills around frame 20, frame 60, frame 120.
- Confirm frame 20 has no highlight.
- Confirm target phrases are highlighted by final frame.
- Confirm no text clipping, no off-center/cut-off card, and marker sits behind text.
