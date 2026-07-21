# Prompt Threads — How These Clips Actually Got Made

Condensed from real production sessions (wording lightly edited for brevity; the renders are the real ones). None of these clips came out perfect on the first try — and that's the point. The workflow is: **describe the beat → get a render → give blunt visual feedback → get a revision → approve.**

Notice what the feedback looks like: it's never "make it better." It's always one concrete visual problem — "the mascot is cropped," "too zoomed in," "that looks like a checklist, not a terminal."

---

## Thread 1 — Cinematic camera: the GitHub repo reveal

> **User:** Now let's do one for this script line: "It's called OpenMontage. 25,000+ stars on GitHub. An open-source agentic video production system."

> **Agent:** Concept — open tight on the repo header as the star button gets clicked, an odometer rolls past 25,000, then the camera pulls out to reveal the full repo page: file tree (`agents/`, `pipelines/`, `remotion/`, `skills/`, `tools/`), language bar, contributors, README with the mascot as the hero image. 6.4s, 1080×1920, 30fps. Camera keyframes in one `KEY_T` array, click at frame 64 if your VO pacing shifts.
>
> *[delivers v1 render]*

> **User:** The mascot is cut off — in the avatar and in the opening frame.

> **Agent:** Fixed — mascot now fully fits inside the avatar circle, and the opening camera position starts further left so the full header is in frame from frame 0.
>
> *[delivers v2 render]*

> **User:** Approved. ✅

**What to copy:** the request is just the script line. The agent picks the metaphor, the timing, and exposes the tuning constants. The revision request is one sentence naming exactly what's visually wrong.

---

## Thread 2 — Motion graphics: real screen recording + title

> **User:** This beat: "It watches 50,000+ career pages." Here's a screen recording of their actual site — use the real footage, then show it firing off applications.
>
> *[attaches screen recording]*

> **Agent:** Built — your recording plays inside a rounded card, then swaps to an 8-card application run. 4.5s, 30fps. Swap timing is in `SWAP_FRAME`, click cadence in `CLICKS_START`, and the recording's in-point in `VIDEO_START_FROM`.
>
> *[delivers v1 render]*

> **User:** Rejected — the recording is too zoomed in and cropped. I want the full recording visible, with a bold black title on top: "Scanning 50,000+ career pages."

> **Agent:** v2 — full recording visible in the card, bold black title above it. Same constants if you need to retime.
>
> *[delivers v2 render]*

> **User:** Approved. ✅

**What to copy:** real product footage beats a rebuilt fake UI every time — hand the agent the recording. Note the title was allowed because "Scanning 50,000+ career pages" is *data the graphic is about*, not a restated narration line.

---

## Thread 3 — Terminal inserts: from fake checklist to authentic CLI

> **User:** I need a carousel insert: installing a skill into the agent from the terminal. Dark, premium, feels like a real Mac terminal.

> **Agent:** *[delivers v1: a dark panel with rounded checklist rows, checkbox icons, and status chips]*

> **User:** This looks like a SaaS checklist UI, not a terminal. Nobody's terminal has checkboxes. I want real CLI output — a typed command, plain flowing text, the little `◇` progress rows with a `✓` at the end of each line, a blinking cursor.

> **Agent:** Rebuilt as authentic CLI — command types character-by-character (`~ $ codex skills load carousel-qa`), big green ASCII word, then `◇ skill added: ...` rows revealing top-down with trailing `✓`, blinking block cursor, and the whole window floating in with 3D perspective tilt.
>
> *[delivers v2 render]*

> **User:** That's it. This is the style. ✅

**What to copy:** this rejection became the skill's authenticity rules (the `◇`/`✓` symbols, the no-checkbox ban, the perspective float). When you correct your agent, the correction is reusable — put it in the skill so you never give that note twice.

---

## Thread 4 — Article highlights: three versions to the standard

> **User:** Make it look like a news article about the topic — clean editorial card — and then key phrases get highlighted like someone went over them with a marker.

> **Agent:** *[delivers v1: article card rendered as one flattened image, yellow highlight drawn over the text]*

> **User:** The highlighter is sitting on top of the words — it should be *behind* the text, like a real marker on paper. And start the whole thing blurred, then sharpen in.

> **Agent:** Rebuilt in layers — paper, then rough.js marker strokes, then live text on top — so the highlight draws behind the words. Added the 1-second blur-in and a slow zoom with a slight 3D rotation.
>
> *[delivers v2 render]*

> **User:** Better, but the card clips at the edge when it rotates, and the second highlight starts before the blur is done.

> **Agent:** v3 — reduced the rotation so the card never leaves frame, highlights now start only after the blur finishes (~frame 40) and draw one at a time, left to right.
>
> *[delivers v3 render — the reference clip shipped with this skill]*

> **User:** This is the standard now. ✅

**What to copy:** iteration converged because each round fixed named defects, then the final version was locked as "the standard" — which is exactly what the reference-review gate in `cinematic-camera` feeds on next time.

---

## The meta-pattern

1. **Prompt with the script beat + any real assets**, not with implementation details.
2. **Judge the render, not the code.** Watch it, name the single biggest visual problem, send it back.
3. **One concrete note per round** beats a paragraph of vibes.
4. **When a version is right, say so explicitly** — approved versions become the reference baseline for every future clip.
5. **Turn repeated corrections into skill rules.** Every hard rule in these skills started life as feedback on a bad render.
