# Research and authentic assets

Run this course before concept work. Keep it narrow and cacheable.

## Source priority

1. Exact user attachment or project asset. Never replace it.
2. Bundled `assets/logos/` asset with provenance in `references/logo-library.md`.
3. Official brand kit or official product/company domain.
4. Official docs, help center, press kit, or public product page.
5. Reputable curated vector source only when official files are unavailable; record that it is a fallback.

Use 1–3 authoritative pages normally; four is the hard maximum. Stop when identity, real surface, relevant action, and claim provenance are known. Do not perform broad trend research.

## Asset rules

- Download/copy assets into the project; never hotlink them in a render.
- Prefer a transparent SVG, then transparent high-resolution PNG/WebP.
- Reject SVGs containing scripts, event handlers, `foreignObject`, remote references, data URLs, or JavaScript URLs.
- Reject screenshots of logos, search thumbnails, watermarks, baked checker/gray backgrounds, approximate redraws, emoji substitutes, and AI-generated brand marks.
- Keep brand geometry, colors, clear space, and aspect ratio intact. No glow, texture, 3D extrusion, recoloring, or decorative effects unless the official brand system requires it.
- Supplied assets outrank the bundled library. A newer exact user-provided logo must replace an older cached one.

## Product-surface research

For `product-ui`, capture a real dashboard/app/docs surface that shows the relevant action or state. Learn only what the beat needs:

- navigation and panel structure
- exact feature names and short UI labels
- brand color/material behavior
- where the action begins and what visibly changes
- which values are verified and which must not appear

A faithful stylized reconstruction may simplify density for mobile, but cannot invent controls, metrics, prices, activity, people, or outcomes. If no authentic surface is available, ask the user instead of building a fake SaaS dashboard.

For `logo-system`, authentic logos plus documented relationships may be enough. For `terminal`, use authentic commands/output structure. For `editorial`, use the real article/page evidence. For `abstract`, web/logo research is optional, but the concept/reference brief is still required.

## Token-efficient cache

Store research under `.promptible/research/`. The gate hashes the brief, source list, logo/surface assets, visual mode, and selected reference. An unchanged hash returns `RESEARCH CACHE HIT`; reuse it without rereading pages. Refresh only when the product/version, user assets, claim, or visual mechanism changes.
