# Beautiful Presentations Skill — Portable Public Reader

Updated: 2026-06-05T19:37:34.097225+00:00

Public reader URL:

```txt
https://larvuz2.github.io/skills/beautiful-presentations.md
```

Portable tarball URL:

```txt
https://larvuz2.github.io/skills/beautiful-presentations-skill.tar.gz
```

## How another Hermes agent should use this

1. Read this URL.
2. If only following instructions, use the `SKILL.md` section below.
3. If installing the full skill, download the tarball and unpack it into `~/.hermes/skills/creative/`.
4. Run one-time GitHub setup before expecting live preview URLs:

```bash
python ~/.hermes/skills/creative/beautiful-presentations/scripts/setup_presentations_repos.py --owner YOUR_GITHUB_OWNER
```

5. Then create decks inside the shared private `presentations` source repo, sync to the public preview mirror if needed, and return the live feedback URL.

## Important setup caveat

Pasting/reading this skill gives the agent the full workflow, but live URLs require GitHub auth on that VPS/user. The agent needs `GITHUB_TOKEN`, `GH_TOKEN`, `gh auth login`, or git credentials. Without GitHub auth it can still build/QA/export locally, but it cannot create repos or publish the feedback URL.

---


# File: `SKILL.md`

```markdown
---
name: beautiful-presentations
description: Create stunning one-file HTML presentations with horizontal 16:9 slides, browser-first review, optional PDF export, optional video export, PPTX conversion, and high-design visual direction. Use for decks, pitches, proposals, product explainers, client presentations, investor decks, game bibles, film treatments, and project reviews.
version: 1.0.0
author: Larvuz / Hermes
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [presentations, slides, html, pdf, video, deck, design, pitch, frontend, client-review]
    related_skills: [claude-design, powerpoint, document-export-delivery]
---

# Beautiful Presentations

Use this skill whenever the user asks for a deck, slides, presentation, pitch deck, client proposal, visual explainer, HTML deck, PDF slides, or presentation video.

The default artifact is always a **single self-contained HTML file** for browser review.

Delivery rule: **never send or attach the raw HTML file unless the user explicitly asks for the file.** HTML attachments are bad for client review on chat platforms. Instead, publish/serve the HTML and send a preview URL.

PDF and video exports are optional. Create them only when the user asks.

This is Hermes-native. Do not assume Claude Code, Claude plugins, hosted artifacts, or special slash commands. It must work in any Hermes agent/profile/model with normal file, terminal, and browser tools.

## Core objective

Create beautiful, polished, zero-build presentations that run directly in the browser.

Default output:

```txt
project-name-deck.html
```

Optional outputs:

```txt
exports/project-name-deck.pdf
exports/project-name-deck.mp4
```

## Load order for linked files

Use only what the task needs:

- New HTML deck → read `templates/base-deck.html`, then `references/style-presets.md` and `references/slide-patterns.md`.
- User asks for styles, templates, examples, options, or “bold gallery” → read `references/bold-template-gallery.md`, then inspect the selected template folder before generating final slides.
- User asks specifically for Sakura Chroma, cassette-package, Japanese product-catalogue, or bold diagonal-ribbon style → read `references/sakura-chroma-source-analysis.md`, then inspect `gallery/beautiful-html-templates/templates/sakura-chroma/template.html` and `design.md` before generating final slides.
- HTML delivery → read `references/github-pages-preview-delivery.md` and `references/shared-presentations-repo.md`; use the single shared private presentations repo as the source of truth, with a public static preview mirror only when private GitHub Pages is unsupported; never attach raw HTML unless explicitly requested.
- Client-review preview/navigation expectations → read `references/client-review-preview-and-navigation.md`; live URL first, shared repo-backed preview, scroll wheel changes slides.
- Fallback non-GitHub delivery → use `scripts/publish_preview.py` only when GitHub is unavailable or the user asks for another host.
- Private-source/public-preview sync → use `scripts/sync_private_presentations_mirror.py` after pushing the private `presentations` source repo when GitHub Pages is unsupported for private repos.
- Any HTML deck motion/interactivity → read `references/subtle-slide-motion.md`; default decks need very subtle alive motion even when not animation-heavy.
- Animation-heavy deck → also read `references/animation-patterns.md`.
- PDF export → read `references/pdf-export.md`, use `scripts/export_pdf.py` if present.
- Video export → read `references/video-export.md`, use `scripts/export_video.py` if present.
- PPTX conversion → read `references/pptx-conversion.md`, use `scripts/extract_pptx.py` if present.
- Installing, packaging, or verifying the skill on another Hermes profile/VPS → read `references/installation-and-verification.md`; run `scripts/setup_presentations_repos.py` once if the shared private source repo / public preview mirror do not exist yet.
- Sharing the skill with another agent/user/VPS or answering “is it ready to paste?” → read `references/portable-sharing-checklist.md`; be explicit that live URLs need GitHub auth and one-time repo setup.
- Adapting an external presentation/design repo into this Hermes skill or making the workflow portable to another model/profile/VPS → read `references/repo-adaptation-and-portability.md`.
- Final portability test for a pasteable skill that any Hermes agent/model can run → read `references/portable-skill-paste-test.md`.
- Improving this skill or evaluating output quality → read `references/ramp-up-plan.md`.

## Non-negotiable format rules

Every generated HTML deck must use:

- one self-contained `.html` file
- preview URL delivery by default; raw HTML attachment only when explicitly requested
- inline CSS
- inline JavaScript
- fixed 16:9 horizontal slide stage
- authored slide size: `1920px × 1080px`
- uniform stage scaling to fit browser viewport
- no responsive reflow inside slides
- no slide scrolling
- keyboard navigation
- mouse wheel / trackpad scroll navigation: scrolling down advances one slide; scrolling up returns one slide
- touch/swipe navigation when practical
- visible slide counter or progress indicator outside the slide stage
- print CSS for one slide per PDF page
- controls hidden in print/export
- subtle default within-slide motion: quiet reveal, tiny motif drift/pulse, premium hover tactility
- `prefers-reduced-motion` handling for animated decks

Do not switch slides with `display: none` / `display: block`.

Use `visibility`, `opacity`, and `pointer-events` for slide state.

## Required base structure

Every generated deck should follow this structure:

```html
<div class="deck-viewport">
  <main class="deck-stage" id="deckStage">
    <section class="slide active visible" data-slide="1">
      <!-- slide content -->
    </section>
    <section class="slide" data-slide="2">
      <!-- slide content -->
    </section>
  </main>
</div>

<nav class="deck-controls" aria-label="Presentation controls">
  <button id="prevSlide">Prev</button>
  <span id="slideCounter">1 / 10</span>
  <button id="nextSlide">Next</button>
</nav>
```

Use `templates/base-deck.html` as the structural source of truth.

## Before designing

Detect the mode:

1. New deck
2. Redesign/enhancement of existing HTML deck
3. PPTX conversion
4. PDF export
5. Video export

Then identify:

- audience
- purpose
- density: live presentation or async reading
- slide count, if specified
- brand/project context
- visual posture
- export requirements

Do not ask too many questions. If the user gives enough context, proceed.

Useful single question when required:

```txt
Is this deck for live presenting or async reading?
```

If no answer is available, default to:

- async review / reading-first for client decks
- speaker-led for keynotes and cinematic pitches
- hybrid for investor decks

## Content discipline

Each slide needs one clear job.

Avoid filler. Do not invent fake metrics, fake client quotes, fake traction, fake logos, or unsupported claims.

If data is missing, use labeled placeholders:

```txt
[Metric placeholder]
[Client logo placeholder]
[Insert current traction]
```

If a slide is too dense, split it into two slides. Do not shrink text until it becomes ugly.

## Density modes

### Speaker-led deck

Use for keynotes, live pitches, cinematic proposals, and narrated presentations.

Rules:

- one idea per slide
- huge title type
- 1–3 bullets max
- strong visual rhythm
- more slides beats cramped slides

### Reading-first deck

Use for client async review, internal memos, reports, proposals, and handouts.

Rules:

- self-contained slides
- structured grids/cards allowed
- 4–8 bullets max if readable
- clear section labels
- still no cramped text

## Visual standards

The deck must feel custom.

Avoid:

- generic AI purple gradients
- default SaaS cards
- random icon grids
- overused Inter/Roboto-only typography
- weak centered layouts
- tiny text
- overfilled slides
- decorative stats
- meaningless dashboard visuals
- fake glassmorphism everywhere
- low contrast
- clutter

Prefer:

- strong type scale
- one dominant visual motif
- cinematic spacing
- elegant hierarchy
- precise grids
- custom palette
- abstract shapes
- editorial layouts
- atmospheric backgrounds
- tasteful animation
- real diagrams when useful
- strong opening and closing slides

## Style presets

Choose one style direction unless the user asks for options. See `references/style-presets.md`.

If the user asks for templates, visual examples, “show me styles,” or wants to choose a direction visually, use the imported Bold Template Gallery:

- Read `references/bold-template-gallery.md`.
- Offer 3–6 relevant options by name, mood, and best use.
- If the user chooses one, inspect the corresponding folder under `gallery/frontend-slides-bold/bold-template-pack/templates/` before generating.
- Reuse the visual system and template logic, not the demo content.

Default families:

- Cinematic Dark
- Founder Pitch
- Editorial Light
- Technical Blueprint
- Product Demo
- Game / IP Bible
- Agency Proposal
- Luxury Minimal
- AI Control Room
- Imported Bold Template Gallery

## Slide structure patterns

Use `references/slide-patterns.md`. Prefer designed compositions over bullet slides.

Common patterns:

- title / promise
- problem contrast
- before → after
- big claim + proof
- 3-part system
- timeline
- process flow
- architecture map
- feature anatomy
- cinematic mood board
- offer/package slide
- roadmap
- decision slide
- final ask

## Animation rules

Use motion with discipline. See `references/subtle-slide-motion.md` for default alive motion and `references/animation-patterns.md` for heavier motion systems.

Default for every HTML deck:

- very subtle within-slide animation so the page feels alive and interactive
- quiet entry reveals for slide content
- slow motif drift/pulse on 1–3 decorative systems only
- tiny hover/tactile motion for cards/buttons/controls
- motion must feel premium, minimal, and easy to ignore while reading

Good:

- staggered reveals
- subtle scale/fade
- tiny background/motif drift
- diagram line reveal
- section transition
- slow atmospheric background motion
- counter animation if real data exists

Bad:

- chaotic motion everywhere
- slow animations that block reading
- random floating objects
- large body text moving continuously
- heavy effects that hurt export
- animation that hides weak layout

Always support reduced motion.

## Output workflow

### Step 1 — Create outline

Before writing HTML, create a concise working slide outline:

```txt
01 — Title / promise
02 — Problem
03 — Why now
04 — Solution
05 — How it works
06 — Product/workflow
07 — Proof/examples
08 — Business model/offer
09 — Roadmap/next steps
10 — Ask
```

Adapt to the user's actual topic.

### Step 2 — Choose visual system

Define:

- palette
- typography
- spacing
- motif
- motion
- density
- slide rhythm

### Step 3 — Write the HTML

Create a complete `.html` file.

Rules:

- no markdown-only deck
- no partial snippets
- no external build
- no missing CSS
- no missing JS
- no broken navigation
- no text too small for 1920×1080 slides
- wheel/trackpad navigation uses throttling/debouncing so a single scroll gesture does not skip multiple slides
- wheel navigation must call `preventDefault()` in the active deck viewport to avoid page rubber-banding or accidental browser scroll

### Step 4 — Verify

If tools are available, verify before final response.

Minimum:

- file exists
- file is non-empty
- HTML contains `.deck-stage`
- HTML contains `.slide`
- HTML contains print CSS
- HTML contains JS controller

Better:

- open in browser
- check console errors
- navigate slides
- inspect screenshot of every slide, especially high-design layouts
- verify controls do not cover important content in the preview screenshot
- fix visual overlap even if DOM overflow checks pass
- test print mode if exporting PDF

Use `scripts/qa_html_deck.py` when available.

Do not claim browser verification unless actually performed.

## Preview URL delivery

Default delivery is a URL, not an HTML attachment.

Hard rule: **do not create a new GitHub repository for every deck.** Use one shared **private** presentations repository for all HTML deck previews unless the user explicitly requests a separate repo.

Preferred shared repo:

```txt
https://github.com/larvuz2/presentations
https://larvuz2.github.io/presentations/<project-slug>/
```

If working on a different GitHub owner/profile, create or reuse one central **private** repo named `presentations` and publish each deck inside its own slug folder:

```txt
/<project-slug>/index.html
/<project-slug>/exports/<project-name>.pdf
/<project-slug>/exports/<project-name>.mp4
```

Keep any old per-deck repos as legacy unless the user explicitly confirms deletion.

Important: the repository should be private, but GitHub Pages previews may still be public depending on GitHub account/plan/settings. Treat the repo privacy as protection for source/version history; do not assume a Pages URL is access-controlled unless verified.

After creating and verifying the HTML file:

1. Clone or reuse the shared private source repo. If this is a new VPS/user, first run `scripts/setup_presentations_repos.py --owner <github-owner>` to create/check the private source repo and public preview mirror.
2. Create/update a clean folder for the deck slug in the private source repo, e.g. `gus-sakura-chroma/index.html`.
3. Commit and push the private source repo.
4. If GitHub Pages from the private repo is unsupported, sync the static files into the public preview mirror using `scripts/sync_private_presentations_mirror.py`.
5. Poll the live preview URL until it returns HTTP 200.
6. Browser-check the live preview URL.
7. Send the live preview URL first.
8. Mention repo privacy and local path only as backup/debug info.
9. Do **not** attach `MEDIA:/path/deck.html` unless the user explicitly asks for the raw file.

Preferred preview methods, in order:

1. Shared `presentations` GitHub Pages repo with one folder per deck.
2. Existing project GitHub Pages/static deployment pipeline.
3. Project/VPS public preview directory if GitHub is unavailable.
4. Temporary static server with a reachable public domain/tunnel.
5. If no public URL is available, say the preview URL is blocked and ask whether to configure GitHub Pages or another preview host; still keep the verified HTML locally.

Fallback helper if GitHub is unavailable:

```bash
python ~/.hermes/skills/creative/beautiful-presentations/scripts/publish_preview.py deck.html --slug project-name
```

A good final response for HTML is:

```txt
Preview: https://preview-domain/path/Project_Name_Deck.html
Verified: 10 slides, navigation works, no console errors, no overflow.
Local backup: /absolute/path/Project_Name_Deck.html
```

Bad final response:

```txt
MEDIA:/absolute/path/Project_Name_Deck.html
```

## PDF export

Only export PDF when requested.

Preferred helper:

```bash
python ~/.hermes/skills/creative/beautiful-presentations/scripts/export_pdf.py deck.html exports/deck.pdf
```

Verify:

- file exists
- file size > 0
- file begins with `%PDF`
- controls are hidden by print/export CSS

If Chromium/Playwright is unavailable, explain the blocker and keep the HTML ready for browser print export.

## Video export

Only export video when requested.

Preferred helper:

```bash
python ~/.hermes/skills/creative/beautiful-presentations/scripts/export_video.py deck.html exports/deck.mp4 --seconds-per-slide 5
```

Preferred MVP:

1. Open deck at 1920×1080.
2. Capture one PNG per slide.
3. Use ffmpeg to assemble MP4.

Verify:

- MP4 exists
- file size > 0
- `ffprobe` or `file` identifies video
- duration roughly matches slide count × seconds per slide

If animated browser capture is available, use it. Otherwise, static slide video is acceptable as first export.

## PPTX conversion

Use this mode when the user provides a `.pptx`.

Process:

1. Extract text, notes, and images.
2. Preserve slide order.
3. Identify hierarchy.
4. Redesign into HTML instead of cloning ugly PowerPoint layouts.
5. Keep important content accurate.
6. Mark uncertain extraction clearly.
7. Verify output against extracted outline.

Useful helper:

```bash
python ~/.hermes/skills/creative/beautiful-presentations/scripts/extract_pptx.py source.pptx extracted/
```

If extraction tooling is missing, try `python -m markitdown source.pptx` or ask the user for exported text/images.

## File naming

Use clean names:

```txt
Project_Name_Deck.html
Project_Name_Deck_v2.html
exports/Project_Name_Deck.pdf
exports/Project_Name_Deck.mp4
```

For revisions, preserve prior versions unless the user asks to overwrite.

## Final response format

Keep final response short.

For HTML:

```txt
Preview: https://preview-domain/path/Project_Name_Deck.html
Verified: file exists, navigation works, no console errors, no overflow.
Local backup: /absolute/path/Project_Name_Deck.html
```

Never attach raw HTML with `MEDIA:` unless the user explicitly asks for the `.html` file.

For PDF:

```txt
Exported: /absolute/path/exports/Project_Name_Deck.pdf
Verified: PDF exists and is non-empty.
```

For video:

```txt
Exported: /absolute/path/exports/Project_Name_Deck.mp4
Verified: MP4 exists and is playable.
```

If delivering through Telegram or another gateway, attach exported files with:

```txt
MEDIA:/absolute/path/file.pdf
MEDIA:/absolute/path/file.mp4
```

## Quality bar

The deck is not done if it looks like generic AI output.

The deck is done when:

- the first slide has impact
- the visual system is coherent
- each slide has one clear job
- the type scale is strong
- spacing is intentional
- text is readable
- navigation works
- export path is ready
- the file can be opened directly by the user/client

```


# File: `references/portable-sharing-checklist.md`

```markdown
# Portable Sharing Checklist

Use this before sharing the `beautiful-presentations` skill with another Hermes agent/profile/VPS.

## What must be included

The skill package must include the full directory, not only `SKILL.md`:

```txt
beautiful-presentations/
  SKILL.md
  templates/base-deck.html
  references/
  scripts/
  assets/
  gallery/                 # if available; optional but preferred for richer design systems
```

## One-time setup the receiving agent/user needs

Pasting/installing the skill is enough to generate local HTML decks, but live review URLs require GitHub auth and a one-time repo setup.

Prerequisites:

- GitHub auth available through `GITHUB_TOKEN`, `GH_TOKEN`, `gh auth login`, or git credentials
- Git installed
- Python 3 available
- Optional but useful: Playwright/Chromium for browser QA and PDF export, ffmpeg for video export

Run once after install:

```bash
python ~/.hermes/skills/creative/beautiful-presentations/scripts/setup_presentations_repos.py --owner YOUR_GITHUB_OWNER
```

This creates/checks:

- private source repo: `YOUR_GITHUB_OWNER/presentations`
- public preview mirror: `YOUR_GITHUB_OWNER/YOUR_GITHUB_OWNER.github.io`
- source clone: `~/presentations/shared-repo`
- preview mirror clone: `~/presentations/public-pages-deploy`
- live URL pattern: `https://YOUR_GITHUB_OWNER.github.io/presentations/<project-slug>/`

## Why source and preview are separate

Many GitHub plans do not support Pages directly from private repos. The durable pattern is:

- private `presentations` repo = source, exports, version history
- public `<owner>.github.io` repo = static browser-review mirror

Do not claim the preview URL is private unless access control has been explicitly verified. The default is private source + public review URL.

## Passing validation

A receiving agent passes when it can:

1. Load the skill.
2. Create a one-file 16:9 HTML deck.
3. Put it in `<project-slug>/index.html` inside the private source repo.
4. Sync/publish the mirror if needed.
5. Return a working URL for feedback.
6. Verify navigation and console health.
7. Export PDF only when asked, with true 16:9 pages.

## Good user-facing caveat

Do not say “paste only and everything works perfectly” unless GitHub auth and the shared repo/mirror already exist. Say:

```txt
The skill is portable. For live URLs, the new VPS needs GitHub auth and a one-time setup command. After that, deck generation follows the same structure automatically.
```

```


# File: `references/installation-and-verification.md`

```markdown
# Installation and Verification

Use this reference when packaging the skill for another Hermes profile/VPS or when checking that the skill is usable after installation.

## Install into the active Hermes profile

```bash
mkdir -p ~/.hermes/skills/creative/beautiful-presentations
# copy SKILL.md plus references/, templates/, scripts/, assets/ into that directory
```

Load it:

```bash
hermes -s beautiful-presentations
```

or in an active Hermes session:

```txt
/skill beautiful-presentations
```

## Install into another named profile

```bash
mkdir -p ~/.hermes/profiles/PROFILE_NAME/skills/creative/beautiful-presentations
# copy the complete skill directory contents there
```

Then run:

```bash
hermes -p PROFILE_NAME -s beautiful-presentations
```

## Portable tarball package

From an installed skill directory:

```bash
mkdir -p ~/.hermes/cache/documents
tar -C ~/.hermes/skills/creative -czf ~/.hermes/cache/documents/beautiful-presentations-skill.tar.gz beautiful-presentations
```

On another VPS:

```bash
mkdir -p ~/.hermes/skills/creative
tar -xzf beautiful-presentations-skill.tar.gz -C ~/.hermes/skills/creative
```

## One-time GitHub setup for a new VPS/user

The skill can generate decks without GitHub, but live review URLs require GitHub auth and repo setup.

Prerequisites:

- `git` installed
- GitHub auth available through `GITHUB_TOKEN`, `GH_TOKEN`, `gh auth login`, or git credentials
- a GitHub owner/user/org where repos can be created

Run once:

```bash
python ~/.hermes/skills/creative/beautiful-presentations/scripts/setup_presentations_repos.py --owner YOUR_GITHUB_OWNER
```

This creates/checks:

- private source repo: `YOUR_GITHUB_OWNER/presentations`
- public preview mirror: `YOUR_GITHUB_OWNER/YOUR_GITHUB_OWNER.github.io`
- local source clone: `~/presentations/shared-repo`
- local preview mirror clone: `~/presentations/public-pages-deploy`
- live URL pattern: `https://YOUR_GITHUB_OWNER.github.io/presentations/<project-slug>/`

Why two repos: many GitHub plans do not support Pages directly from private repos. The private repo preserves source/history; the public mirror preserves easy browser feedback URLs.

If the user/client requires private access-controlled preview URLs, GitHub Pages may not be enough. Use a private VPS/authenticated preview host instead.

## Minimum verification

Run these after install or edits:

```bash
chmod +x ~/.hermes/skills/creative/beautiful-presentations/scripts/*.py
python -m py_compile ~/.hermes/skills/creative/beautiful-presentations/scripts/*.py
python ~/.hermes/skills/creative/beautiful-presentations/scripts/export_pdf.py --help
python ~/.hermes/skills/creative/beautiful-presentations/scripts/export_video.py --help
python ~/.hermes/skills/creative/beautiful-presentations/scripts/extract_pptx.py --help
python ~/.hermes/skills/creative/beautiful-presentations/scripts/setup_presentations_repos.py --help
python ~/.hermes/skills/creative/beautiful-presentations/scripts/sync_private_presentations_mirror.py --help
python ~/.hermes/skills/creative/beautiful-presentations/scripts/qa_html_deck.py ~/.hermes/skills/creative/beautiful-presentations/templates/base-deck.html
```

The QA helper has two levels:

- Static checks: validate file shape, print CSS, controller, slide count, and 1920×1080 rules.
- Browser checks: if Playwright/Chromium is available, open the deck, capture console errors, inspect slides, and optionally produce screenshots.

Do not claim browser verification unless the browser checks actually ran. Static QA is still useful, but label it as static QA.

## Delivery pattern for Telegram / gateway

For file delivery, put portable archives or exports under:

```txt
~/.hermes/cache/documents/
```

Then attach with:

```txt
MEDIA:/root/.hermes/cache/documents/beautiful-presentations-skill.tar.gz
```

## Quality reminder

The purpose is not just to install files. A usable implementation means another Hermes agent can load the skill, generate an HTML deck, run QA, and export PDF/video when dependencies are available.
```


# File: `references/shared-presentations-repo.md`

```markdown
# Shared Presentations Repo

Use this reference when publishing browser-first HTML decks for Gus/Larvuz.

## User correction

Do **not** create a new GitHub repository for every deck or presentation.

Default to one shared **private** GitHub Pages repo that contains all presentations, with one folder per project/deck.

Current default for Gus:

```txt
Repo: https://github.com/larvuz2/presentations
Visibility: private repo
Local clone: /root/presentations/shared-repo
Pages root: https://larvuz2.github.io/presentations/
Deck URL pattern: https://larvuz2.github.io/presentations/<project-slug>/
Public deploy mirror: https://github.com/larvuz2/larvuz2.github.io
Deploy mirror local clone: /root/presentations/public-pages-deploy
```

## Privacy rule

The shared `presentations` repo should be private for Gus and for any user/profile that installs this skill. If the repo does not exist, create it as private. If it already exists and is public, convert it to private before continuing.

GitHub Pages previews can still be public depending on account/plan/settings. On GitHub plans that do not support Pages directly from private repos, keep `presentations` private as the source repo and publish a review-only static mirror to the public `larvuz2.github.io` deploy repo under `/presentations/`.

Verify both separately:

- repo API/settings reports `private: true`
- live deck URL still returns HTTP `200` if the user expects browser review to keep working

Do not assume the Pages URL itself is private or access-controlled unless this has been explicitly verified. The default Gus setup is: private source repo, public browser-review URL.

## Structure

```txt
presentations/
  index.html                         # gallery/index of all decks
  README.md
  <project-slug>/
    index.html                       # browser-first HTML deck
    exports/
      <project-name>.pdf             # only when requested
      <project-name>.mp4             # only when requested
    assets/                          # only if the deck cannot stay self-contained
```

## Workflow

1. Build and verify the one-file HTML deck locally.
2. Clone or reuse `/root/presentations/shared-repo`.
3. If this is a new VPS/user, run `scripts/setup_presentations_repos.py --owner <github-owner>` once to create/check the private source repo and public preview mirror.
4. Copy the deck to `<project-slug>/index.html`.
5. Put requested exports under `<project-slug>/exports/`.
6. Update the shared `index.html` gallery/landing page if useful.
7. Commit and push the private source repo to `main`.
8. Ensure the shared repo visibility is private.
9. If private-repo Pages is unsupported or unavailable, mirror the static files into `/root/presentations/public-pages-deploy/presentations/` and push `larvuz2.github.io`.
10. Poll the live deck URL until it returns HTTP `200`.
11. Browser-check the live deck URL, not just the local file.
12. Final response leads with the live deck URL and confirms repo privacy.

## Deletion rule

Old one-off deck repos may remain as legacy. Do **not** delete GitHub repositories unless Gus gives explicit written confirmation.

## Final response shape

```txt
Preview: https://larvuz2.github.io/presentations/<project-slug>/
Repo: https://github.com/larvuz2/presentations
Verified: live URL works, navigation works, no console errors.
Local backup: /root/presentations/shared-repo/<project-slug>/index.html
```

```


# File: `references/github-pages-preview-delivery.md`

```markdown
# GitHub Pages Preview Delivery

Use this when delivering browser-native HTML decks for client review.

## Rule

Default delivery is a live URL, not an HTML attachment.

For this user's presentation workflow, **do not create one new repo per deck**. Use one shared **private** GitHub Pages repository for all presentations unless the user explicitly requests a separate repo.

Current preferred shared repo:

```txt
Repo: https://github.com/larvuz2/presentations
Visibility: private repo
Pages root: https://larvuz2.github.io/presentations/
Deck URL pattern: https://larvuz2.github.io/presentations/<project-slug>/
Public deploy mirror if private Pages is unsupported: https://github.com/larvuz2/larvuz2.github.io
```

Privacy note: source/version history should live in a private repo. GitHub Pages previews may still be public depending on GitHub plan/settings, so verify repo privacy and preview availability as separate checks. If GitHub reports that the plan does not support Pages for the private source repo, keep the source repo private and push a static preview mirror to the public user-site repo instead.

## Why

- Clients can open the deck on phone/desktop without downloading HTML.
- Revisions are easier to review by URL.
- The shared repo keeps version history without cluttering GitHub with one-off deck repos.
- The same preview flow works across Hermes profiles, VPS agents, and models.

## Shared repo structure

```txt
presentations/
  index.html                         # optional gallery/index of all decks
  README.md
  <project-slug>/
    index.html                       # default browser review artifact
    exports/
      <project-name>.pdf             # only when requested
      <project-name>.mp4             # only when requested
    assets/                          # only if absolutely needed
```

Decks should still be self-contained whenever possible. Keep exports inside the same project folder.

## Workflow

1. Clone or reuse the shared private `presentations` repo.
2. Create/update a slug folder for the deck: `<project-slug>/index.html`.
3. If a PDF/MP4 export is requested, place it under `<project-slug>/exports/`.
4. Commit with a concise design/deploy message.
5. Push to `main`.
6. Confirm repo visibility is private.
7. Enable GitHub Pages from `main` / root if supported. If unsupported for the private repo, mirror the static `/presentations/` folder into `larvuz2.github.io` or the equivalent public preview deployment repo.
8. Poll the deck Pages URL until it returns HTTP 200 before telling the user it is live.
9. Browser-check the live deck URL, not only the local file.
10. Final response should lead with the preview URL and mention repo privacy.

## Preferred final response shape

```txt
Preview: https://<owner>.github.io/presentations/<project-slug>/
Repo: https://github.com/<owner>/presentations
Verified: live URL works, 3 slides, no console errors, no overflow.
Local backup: /absolute/path/presentations/<project-slug>/index.html
```

## Pitfalls

- Do not attach `MEDIA:/path/deck.html` unless the user explicitly asks for the raw file.
- Do not create a fresh GitHub repo for each presentation. Use the shared `presentations` repo unless the user asks for isolation.
- Do not leave the shared presentations repo public. Create/keep it private unless the user explicitly requests public source.
- Do not break the live review URL when making the source repo private. If private Pages is unsupported, use a public static deployment mirror while keeping the source repo private.
- Do not delete old per-deck repos without explicit written confirmation from Gus.
- Do not claim GitHub Pages is live immediately after enabling it; it may return 404 while building. Poll until 200.
- Do not rely only on local QA. Open the public Pages URL and check console errors.
- Keep navigation controls subtle and out of the slide composition. If controls obscure content in screenshots, move them or make them hover-only.
- For high-design decks, use visual QA screenshots in addition to DOM overflow checks. DOM can pass while the design still has ugly overlap.

```


# File: `references/client-review-preview-and-navigation.md`

```markdown
# Client Review Preview & Navigation Notes

Use this reference when generating browser-first decks intended for fast client/user review.

## Durable user correction captured

For HTML presentation deliverables, chat/file attachment is the wrong default. The review object should be a live URL that the user can open instantly, share, and comment on.

Default path:

1. Build the deck as a one-file `index.html`.
2. Verify locally: no console errors, no overflow, keyboard navigation works.
3. Publish through the shared `presentations` GitHub Pages repository, one folder per deck.
4. Send the live GitHub Pages URL first.
5. Include repo URL and local backup path only as secondary info.
6. Do not send raw HTML unless the user explicitly asks for the file.

## Scroll navigation requirement

Browser-native decks should feel natural when opened by a client. In addition to arrows, buttons, and swipe:

- mouse wheel / trackpad scroll down advances one slide
- mouse wheel / trackpad scroll up returns one slide
- call `preventDefault()` in the wheel handler to stop browser rubber-banding
- throttle/debounce wheel gestures so one trackpad gesture does not skip multiple slides
- keep body/page overflow hidden; slides themselves must not scroll

Minimal wheel handler pattern:

```js
constructor() {
  this.wheelLocked = false;
}

handleWheel(event) {
  event.preventDefault();
  const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX)
    ? event.deltaY
    : event.deltaX;

  if (Math.abs(delta) < 18 || this.wheelLocked) return;

  this.show(this.current + (delta > 0 ? 1 : -1));
  this.wheelLocked = true;
  setTimeout(() => { this.wheelLocked = false; }, 640);
}

document.addEventListener('wheel', event => this.handleWheel(event), {
  passive: false
});
```

## Verification

After publishing, verify against the live URL, not only the local file:

- fetch/check the live URL returns the updated HTML from `https://<owner>.github.io/presentations/<project-slug>/`
- browser opens the GitHub Pages URL
- console has no JS errors
- wheel event changes the visible slide counter, e.g. `1 / 3 → 2 / 3`
- reverse wheel changes back, e.g. `2 / 3 → 1 / 3`
- visual QA confirms controls/hints do not cover important content

## Final response shape

Keep it short:

```txt
Updated: <live GitHub Pages URL>
Verified: scroll down/up changes slides, arrows/space still work, no console errors.
Repo: <GitHub repo URL>
```

```


# File: `references/portable-skill-paste-test.md`

```markdown
# Portable Skill Paste Test

Use this when the user wants the presentation workflow to be reusable across Hermes profiles, VPS machines, and models.

## Test objective

A separate Hermes agent should be able to paste/install this skill and produce the same class of artifact without needing Claude, the original chat, or local unstated assumptions.

The required outcome is:

- one self-contained 16:9 HTML deck by default
- browser-first review URL
- one shared private `presentations` repo for GitHub Pages previews, with one folder per deck; no new repo per deck by default
- beautiful custom visual system, not generic SaaS slides
- subtle alive motion by default
- keyboard, wheel, and touch navigation when practical
- print CSS for horizontal PDF export
- optional video export path
- clear QA and final response format

## What the skill package must include

- `SKILL.md` with triggers, defaults, non-negotiables, workflow, QA, and final response shape
- `templates/base-deck.html` as the copy-modify starting point
- `references/` for style systems, repo analyses, motion rules, delivery rules, and export notes
- `scripts/` for deterministic QA/export/publish helpers where possible

## Model-neutral requirements

Do not depend on:

- Claude Artifacts
- Claude Code slash commands
- a specific model family
- hidden chat context
- manual copy/paste of missing CSS or JS
- external build steps unless explicitly stated

The skill should read like operating instructions that any competent Hermes model can follow with file, terminal, browser, and GitHub tools.

## Final validation prompt

After installing the skill in another Hermes agent/profile, use a prompt like:

```txt
Use the beautiful-presentations skill to create a browser-first one-file HTML deck for [PROJECT]. Make it 16:9, high-design, with subtle alive motion by default, keyboard/wheel navigation, print CSS for PDF export, and a live preview URL. Publish it inside the shared private `presentations` GitHub Pages repo under a project slug folder; do not create a new repo unless I explicitly ask. Do not use Claude-specific features. Verify repo privacy and live preview availability before final response.
```

Passing means the other agent produces a working reviewed HTML presentation and can explain/export PDF or video only when asked.

```


# File: `references/style-presets.md`

```markdown
# Style Presets

Use one visual system per deck. Do not create color-swap variants unless the user specifically asks.

## Selection rule

- Startup/investor → Founder Pitch
- AI film/fantasy/game/cinematic production → Cinematic Dark
- Product architecture/workflows → Technical Blueprint or AI Control Room
- Client service proposal → Agency Proposal
- Game/IP bible → Game / IP Bible
- Report/memo/editorial review → Editorial Light
- Premium brand/treatment → Luxury Minimal
- SaaS platform/demo → Product Demo

## Cinematic Dark

Use for AI film, fantasy, game worlds, premium tech, dramatic pitches.

- Background: near-black charcoal, deep navy, warm shadow gradients
- Accent: candle gold, ember, ghost blue, bone white
- Type: elegant serif display + precise sans body
- Motif: spotlight cones, soft fog, thin rules, oversized title cards
- Motion: slow fade/blur, subtle parallax, staggered text
- Avoid: crushed blacks, unreadable gray, horror cliché unless requested

Suggested CSS tokens:

```css
:root {
  --stage-bg: #050506;
  --slide-bg: #08080a;
  --ink: #f3efe7;
  --muted: #a8a199;
  --accent: #d6aa62;
  --accent-2: #7ba7ff;
  --panel: rgba(255,255,255,0.055);
  --line: rgba(255,255,255,0.14);
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'IBM Plex Sans', Arial, sans-serif;
}
```

## Founder Pitch

Use for startups, investors, YC-style decks, business strategy.

- Background: off-white or hard dark
- Accent: one sharp color
- Type: bold grotesk headline + clean body
- Motif: big statements, crisp diagrams, labeled proof
- Motion: fast, confident, minimal
- Avoid: corporate jargon, fake metrics, bland blue SaaS

Tokens:

```css
:root {
  --stage-bg: #0b0c0f;
  --slide-bg: #f5f2ea;
  --ink: #111113;
  --muted: #625f59;
  --accent: #ff4d2e;
  --dark: #0b0c0f;
  --line: rgba(17,17,19,0.16);
  --font-display: 'Space Grotesk', Arial, sans-serif;
  --font-body: 'Manrope', Arial, sans-serif;
}
```

## Editorial Light

Use for reports, strategy narratives, cultural projects, thoughtful proposals.

- Background: warm paper/off-white
- Accent: restrained ink, muted red, olive, or blue
- Type: editorial serif headline + humanist sans body
- Motif: columns, pull quotes, margin labels, page numbers
- Motion: gentle staggered text
- Avoid: overdecorated magazine cosplay

Tokens:

```css
:root {
  --stage-bg: #2c2a27;
  --slide-bg: #f4efe5;
  --ink: #191816;
  --muted: #6f685e;
  --accent: #9b3d2f;
  --line: rgba(25,24,22,0.18);
  --font-display: 'Bodoni Moda', Georgia, serif;
  --font-body: 'DM Sans', Arial, sans-serif;
}
```

## Technical Blueprint

Use for architecture, AI workflows, CTO decks, systems.

- Background: graphite/navy
- Accent: cyan, lime, or amber
- Type: technical sans + mono labels
- Motif: grid lines, nodes, arrows, lanes, console labels
- Motion: diagram reveal, line trace, small pulse
- Avoid: fake code walls, illegible tiny labels

Tokens:

```css
:root {
  --stage-bg: #050914;
  --slide-bg: #07111f;
  --ink: #eaf3ff;
  --muted: #8fa3b8;
  --accent: #44f0d2;
  --accent-2: #b7ff5a;
  --panel: rgba(255,255,255,0.055);
  --line: rgba(130,190,255,0.18);
  --font-display: 'Sora', Arial, sans-serif;
  --font-body: 'IBM Plex Sans', Arial, sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
}
```

## Product Demo

Use for SaaS, platforms, dashboards, app concepts.

- Background: clean off-white or calm dark
- Accent: one product color
- Type: precise sans
- Motif: realistic product frame, cursor path, callout tags, workflow lanes
- Motion: screen reveal, cursor movement, panel focus
- Avoid: fake metric slop and random cards

## Game / IP Bible

Use for games, characters, worlds, gameplay systems.

- Background: dark cinematic or stylized parchment
- Accent: project-specific world color
- Type: bold title + readable body
- Motif: character slots, world map panels, mechanic cards, boss/ally hierarchy
- Motion: energetic cuts, punchy reveals
- Avoid: too kiddy unless requested, cheap cartoon, overloaded lore walls

## Agency Proposal

Use for marketing services, AI production services, retainers, client pitches.

- Background: premium light or dark
- Accent: confident but not gimmicky
- Type: founder-simple, service-clear
- Motif: before/after, workflow pipeline, package tiers, output examples
- Motion: clean reveal
- Avoid: “unlock growth” language, generic service grids

## Luxury Minimal

Use for premium treatments, high-end creative proposals, elegant brands.

- Background: bone, black, deep brown, muted gray
- Accent: gold, oxblood, moss, or cold silver
- Type: refined serif + sparse sans
- Motif: large whitespace, thin rules, quiet asymmetry
- Motion: very subtle
- Avoid: over-glossy, fake luxury, low-contrast gray text

## AI Control Room

Use for AI operations, automation, agents, monitoring, dashboards.

- Background: dark graphite
- Accent: signal green, electric cyan, orange warnings
- Type: technical sans + mono labels
- Motif: live system map, agent cards, status strips, signal timeline
- Motion: pulse, sweep, connection glow
- Avoid: random fake charts, unreadable terminal walls

```


# File: `references/slide-patterns.md`

```markdown
# Slide Patterns

Use patterns to avoid plain bullet decks. Every slide needs a visual job.

## 01 Title / Promise

- Huge title, one-line promise, small context label.
- Best for opening, section openers, final claim.
- Visual: atmospheric background, large wordmark, single abstract shape.

## 02 Problem Contrast

- Left: old broken way.
- Right: new desired way.
- Use strong visual contrast, not too many words.

## 03 Before → After

- Three-part transformation.
- Before state, mechanism, after state.
- Good for agency proposals and products.

## 04 Big Claim + Proof

- One bold claim.
- 2–3 proof points below.
- If proof is missing, use labeled placeholders.

## 05 Three-Part System

- Three large modules with clear names.
- Use for product pillars, service packages, workflows.
- Avoid generic words like “Optimize” unless content is specific.

## 06 Timeline / Roadmap

- Horizontal timeline.
- 3–5 phases max.
- Make current phase visually distinct.

## 07 Process Flow

- Steps connected by arrows or lanes.
- Good for AI pipelines, production workflows, sales process.
- Use short labels and supporting notes.

## 08 Architecture Map

- Nodes and flows.
- Good for technical decks.
- Keep labels readable; split into multiple slides if crowded.

## 09 Feature Anatomy

- One product/interface/workflow element in center.
- Callouts around it.
- Use realistic UI framing when possible.

## 10 Cinematic Mood Board

- Large visual area with placeholders.
- Use text labels for frame, mood, camera, lighting.
- Do not fake finished art unless user supplies it or asks for placeholders.

## 11 Offer / Package Slide

- 2–3 package tiers or one signature offer.
- Focus on deliverables and outcomes.
- Avoid generic pricing fluff.

## 12 Decision Slide

- Show options with recommendation.
- One option should be visually marked “Best.”
- Keep criteria clear.

## 13 Final Ask

- One direct ask.
- Next steps.
- Contact/project label.
- Strong but not salesy.

## Density checks

If a slide has:

- more than 8 bullets,
- more than 6 cards,
- more than 2 paragraphs,
- more than 3 nested layers,

split it.

## Text size guidance at 1920×1080

- Hero title: 96–170px
- Slide title: 58–96px
- Subtitle: 34–48px
- Body: 28–38px
- Small labels: 20–26px
- Footnotes: 18–22px only if truly minor

Do not go under 18px unless it is decorative metadata.

```


# File: `references/subtle-slide-motion.md`

```markdown
# Subtle Slide Motion

Default HTML decks should feel lightly alive, not animated for its own sake.

## Default motion posture

Use **very subtle, elegant, minimal motion inside each slide** unless the user asks for more.

The goal:

```txt
alive / modern / tactile / calm
```

Not:

```txt
flashy / distracting / keynote gimmick / loading screen
```

## Required defaults

Every generated HTML deck should include:

1. **Slide-entry reveal**
   - Active slide content fades in by 8–24px upward movement.
   - Duration: 500–900ms.
   - Stagger important elements by 60–140ms.
   - Do not delay readability for more than ~1 second.

2. **Subtle living motif motion**
   - Animate background motifs, ribbons, dots, gradients, blobs, or diagram accents very slowly.
   - Movement should be tiny: translate 4–18px, rotate 0.2–1.5deg, or opacity shift 0.05–0.12.
   - Duration: 8–24s.
   - Use alternate/ease-in-out loops.

3. **Interaction tactility**
   - Buttons/cards/controls can have tiny hover transforms: translateY(-1px to -4px), no bouncing.
   - Hover transitions should feel premium and fast: 140–240ms.

4. **Navigation motion**
   - Slide transition should be a quick opacity transition, not a complex wipe unless requested.
   - Do not use `display:none` for active slide switching.

5. **Reduced motion**
   - Always include `@media (prefers-reduced-motion: reduce)`.
   - Disable loops and reduce transitions there.

## Recommended CSS pattern

```css
@keyframes softFloat {
  from { transform: translate3d(0, 0, 0) rotate(0deg); }
  to   { transform: translate3d(10px, -8px, 0) rotate(0.6deg); }
}

@keyframes quietPulse {
  0%, 100% { opacity: .92; }
  50%      { opacity: 1; }
}

.motion-item {
  animation: softFloat 16s ease-in-out infinite alternate;
}

.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 700ms cubic-bezier(.16,1,.3,1), transform 700ms cubic-bezier(.16,1,.3,1);
}

.slide.visible .reveal {
  opacity: 1;
  transform: translateY(0);
}

.slide.visible .reveal:nth-child(2) { transition-delay: 80ms; }
.slide.visible .reveal:nth-child(3) { transition-delay: 160ms; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition-duration: .01ms !important;
  }
}
```

## Quality rules

- Motion should be nearly invisible when reading, but missed when removed.
- Do not animate large blocks of body text continuously.
- Do not animate every element. Pick 1–3 motif systems per deck.
- For client decks, prioritize calm reviewability over spectacle.
- For cinematic decks, subtle atmospheric motion is acceptable, but keep text stable.
- For PDF/video export, motion must not break static capture.

## Verification

Before delivery:

- open in browser
- check console errors
- navigate slides
- visually inspect that animation does not cover text, jitter, or make the deck feel cheap
- verify `prefers-reduced-motion` CSS exists

```


# File: `references/pdf-export.md`

```markdown
# PDF Export

Only export PDF when requested. HTML review remains the default.

Preferred helper:

```bash
python ~/.hermes/skills/creative/beautiful-presentations/scripts/export_pdf.py deck.html exports/deck.pdf
```

## Hard rule

PDF pages must be true horizontal 16:9 slides, not A4/Letter.

Target page size:

```txt
1920px × 1080px
16:9 landscape
0 margins
one slide per page
```

If the PDF looks like A4, portrait, cropped, unreadable, or tiny, it is broken. Fix export before delivery.

## Verification

Check:

- PDF exists
- PDF is non-empty
- first bytes are `%PDF`
- page size is 16:9 landscape, ideally around `1440 × 810 pts` when reported by `pdfinfo`
- number of pages matches slide count
- controls are hidden
- slides 2+ are readable, not cropped or squeezed

Useful command when available:

```bash
pdfinfo exports/deck.pdf | grep -E 'Pages|Page size'
```

## Browser print fallback

If exporting manually from browser:

- layout: landscape
- paper/page size: custom 16:9 if available
- margins: none
- background graphics: enabled
- scale: fit to printable area or 100%, whichever preserves full slide

Do not deliver a PDF if browser print creates A4/Letter pages.

```


# File: `references/video-export.md`

```markdown
# Video Export

Only export video when requested.

Preferred helper:

```bash
python ~/.hermes/skills/creative/beautiful-presentations/scripts/export_video.py deck.html exports/deck.mp4 --seconds-per-slide 5
```

## MVP behavior

- open HTML deck at 1920×1080
- count `.slide` elements
- show each slide using `window.deck.show(index)` or class toggling fallback
- screenshot each slide as PNG
- assemble MP4 with ffmpeg

## Verification

After export:

- MP4 exists
- size > 0
- `ffprobe` or `file` identifies video
- duration roughly equals slide count × seconds per slide

## Notes

Static slide video is acceptable as the default export. Animated capture can be added later, but must be tested because browser animation recording is more fragile.

```


# File: `references/pptx-conversion.md`

```markdown
# PPTX Conversion

Use this when the user gives a `.pptx` and asks to convert, redesign, or improve it.

## Principle

Extract accurately, then redesign. Do not blindly recreate ugly PowerPoint layouts unless the user explicitly asks for pixel matching.

## Pipeline

1. Extract text, notes, and images.
2. Preserve slide order.
3. Build `outline.md` and `manifest.json`.
4. Identify hierarchy and key message per slide.
5. Redesign into browser-native HTML.
6. Verify deck against extracted outline.

## Helper

```bash
python ~/.hermes/skills/creative/beautiful-presentations/scripts/extract_pptx.py source.pptx extracted/
```

Expected output:

```txt
extracted/
├── outline.md
├── manifest.json
└── media/
```

## Fallback

If helper dependencies are missing, try:

```bash
python -m markitdown source.pptx
```

If both fail, ask the user for exported text/images.

```


# File: `references/repo-adaptation-and-portability.md`

```markdown
# Repo Adaptation + Portable Skill Pattern

Use when the user points to a design-inspiration repo and asks to implement the same objective in the Hermes ecosystem, without depending on the original agent/model/tooling.

## Core lesson

Do not copy the repo superficially. First identify the repo's real design and workflow primitives, then re-express them as a Hermes-native class-level skill that any profile/model can run.

For presentation repos such as `frontend-slides` / `beautiful-html-templates`, the durable value is usually:

- one-file HTML artifacts for browser-first review
- strong template/source inspection before generation
- reusable visual systems, not demo content
- export paths for PDF and video after HTML approval
- quality QA before delivery
- preview URL delivery instead of raw HTML attachment

## Required sequence

1. Inspect the actual repo or imported template folder.
2. Read the source files that define the design system, especially `template.html`, `design.md`, `template.json`, screenshots, CSS, and JS.
3. Extract reusable primitives:
   - layout archetypes
   - typography scale
   - color system
   - motifs
   - animation language
   - export mechanics
   - QA checks
4. Translate those primitives into Hermes-native workflow:
   - normal file/terminal/browser tools
   - no Claude-only artifact assumptions
   - no provider-specific phrasing unless the user explicitly asks
   - works on any model/profile/VPS with the skill installed
5. Generate a self-contained HTML deck first.
6. Publish a preview URL for review.
7. Export PDF/video only when requested or after approval.
8. Verify before final delivery.

## Portability requirements

A portable deck skill should include:

- rich `SKILL.md` with triggers, workflow, non-negotiables, QA, and final response format
- `templates/` for copy-modify starter HTML
- `references/` for design analyses, repo notes, export notes, and pitfalls
- `scripts/` for deterministic helpers like HTML QA, PDF export, video export, preview publishing

Avoid embedding environment-specific paths as hard requirements. Use them only as examples. Prefer env vars for VPS preview configuration:

```bash
HERMES_PRESENTATION_PREVIEW_ROOT=/var/www/presentations
HERMES_PRESENTATION_PREVIEW_BASE_URL=https://preview.example.com
```

## Pitfalls

- Do not deliver a raw HTML attachment by default. It is bad for chat/client review. Send a URL.
- Do not say the deck matches an inspiration repo unless the actual source/template was inspected.
- Do not clone demo content. Reuse structure and art direction.
- Do not make a generic SaaS deck with the repo's palette pasted on top.
- Do not rely on Claude artifacts, hosted previews, or special slash commands.
- Do not export PDF/video before the HTML review path is established unless the user asked directly.

## Final test for portability

A different Hermes agent on another VPS should be able to paste/install the skill, read the linked files, create a one-file HTML deck, publish a preview URL if configured, and optionally export 16:9 PDF/video without needing the original conversation context.

```


# File: `references/bold-template-gallery.md`

```markdown
# Bold Template Gallery

Imported design gallery from `zarazhangrui/frontend-slides` (MIT). Use this as a style-selection library when users ask for templates, examples, moods, or a bold template gallery.

Source assets live under `gallery/frontend-slides-bold/bold-template-pack/`.

## Usage

1. Show 3–6 style options by name and mood when the user asks for styles/templates.
2. If the user picks one, inspect that template folder / design notes before generating the final HTML deck.
3. Reuse the visual principles, layout language, colors, and CSS patterns. Do not blindly copy demo content.
4. Keep our non-negotiables: one-file HTML, 1920×1080 fixed stage, browser-first review, PDF/video only on request.

## Templates

### 8-Bit Orbit (`8-bit-orbit`)

- Tagline: Pixel-art neon arcade aesthetic on a deep navy void.
- Mood: retro-tech, playful, cyberpunk, energetic
- Tone: geeky, neon, rebellious, sci-fi
- Scheme: dark
- Density: medium
- Best for: Anything that should feel like a CRT screen at 2am: cyberpunk, gaming, web3, indie dev tools, hackathon demos. Just as good for a tech talk that wants to lean into nostalgic-digital craft, a synthwave brand deck, or a creative review that wants to feel like a console.
- Avoid for: Contexts where the dark neon palette would actively work against the message — quiet institutional finance disclosures, healthcare patient-facing materials, traditional luxury.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/8-bit-orbit`

### Biennale Yellow (`biennale-yellow`)

- Tagline: Solar yellow on warm parchment with deep indigo serif and atmospheric sun-glow gradients.
- Mood: editorial, atmospheric, warm, cultural-institution, poster-like
- Tone: literary, considered, contemplative, warm-modern, Dutch-editorial
- Scheme: light
- Density: medium
- Best for: Anything that should feel like an art-biennale poster or a museum's annual programme: exhibition decks, arts-institution announcements, design conference brochures, curatorial pitches, literary publications, studio retrospectives. Equally good for any deck wanting Dutch-editorial atmosphere with an unmistakable single-color signature.
- Avoid for: Decks that need visual punch or saturated multi-color energy — the warm-paper canvas and one-yellow palette are intentionally quiet and atmospheric.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/biennale-yellow`

### BlockFrame (`block-frame`)

- Tagline: Neobrutalist deck with pastel-neon color blocks and chunky black borders.
- Mood: bold, playful, graphic, fresh
- Tone: confident, graphic, pop, design-led
- Scheme: light
- Density: high
- Best for: Anything that should feel pop-graphic and design-led: indie SaaS launches, agency credentials, creative reviews, brand redesigns. Also a strong unexpected pick for tech, finance, or research when the speaker wants to land as confident and contemporary rather than buttoned-up.
- Avoid for: Contexts that require quiet institutional restraint or traditional weight (regulated disclosures, formal legal briefs).
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/block-frame`

### Blue Professional (`blue-professional`)

- Tagline: Cream paper background with electric cobalt blue accents; clean modern professional.
- Mood: professional, modern, calm, trustworthy
- Tone: clean, considered, polished, neutral
- Scheme: light
- Density: medium
- Best for: Anything that should feel modern-considered and lightly authoritative: B2B SaaS pitches, consulting deliverables, advisory updates, investor reports. Also a clean, tasteful choice whenever you want to read as professional without going stiff — research synthesis, internal reviews, brand work for service businesses.
- Avoid for: Contexts where the deck should feel hot, playful, or intentionally informal — the cool electric-blue restraint will read as overly polished.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/blue-professional`

### Bold Poster (`bold-poster`)

- Tagline: Editorial poster aesthetic with massive Shrikhand display and a single fire-engine red accent.
- Mood: bold, editorial, loud, confident
- Tone: dramatic, graphic, sharp, intentional
- Scheme: light
- Density: low
- Best for: Anything that should land like a magazine cover: brand manifestos, founder vision decks, editorial / cultural pitches, creative reviews. Excellent any time you want a few words to feel like a poster — including unexpected fits like a tech keynote or a finance manifesto that wants to be quotable.
- Avoid for: Decks that need to communicate dense information per slide — the layout is built around a few large statements, not paragraphs of detail.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/bold-poster`

### Broadside (`broadside`)

- Tagline: Dark editorial canvas with a single fire orange accent and bilingual Latin/Chinese type stack.
- Mood: editorial, dramatic, loud, newspaper
- Tone: graphic, punchy, literary, considered
- Scheme: dark
- Density: medium
- Best for: Anything that should land like a broadside newspaper headline: brand manifestos, magazine and cultural pitches, design talks, bilingual EN/CN decks, founder vision statements. Also a striking pick for tech, research, or business decks that want a dramatic single-accent editorial feel.
- Avoid for: Decks that need to feel quiet, warm, or institutionally traditional — the dark canvas with fire-orange accent commits to drama.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/broadside`

### Capsule (`capsule`)

- Tagline: Modular pill-shaped cards on warm bone with a full pastel-pop palette.
- Mood: playful, modern, warm, fresh, fun
- Tone: upbeat, graphic, approachable, cool
- Scheme: light
- Density: medium
- Best for: Anything that should feel modular, modern, and a little Y2K: lifestyle brands, creator portfolios, DTC launches, beauty / wellness, agency credentials. Also fun for a playful tech demo or a research deck that wants pop-art clarity instead of gravitas.
- Avoid for: Contexts that require traditional institutional weight — the capsule shapes and pastel pops actively soften authority.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/capsule`

### Cartesian (`cartesian`)

- Tagline: Quiet warm-neutral palette with classical Playfair serifs; tasteful and unhurried.
- Mood: quiet, considered, elegant, warm-minimal
- Tone: classical, literary, restrained, confident-quiet
- Scheme: light
- Density: low
- Best for: Anything that should feel quiet, considered, and grown-up: investment theses, white papers, advisory work, longform research, gallery / cultural decks. Also a strong choice for editorial features, founder reflections, or any deck where restraint is the message — including across tech and finance.
- Avoid for: Decks that need visual heat, multiple accents, or a sense of urgency — the warm-neutral palette is intentionally low-energy.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/cartesian`

### Cobalt Grid (`cobalt-grid`)

- Tagline: Electric cobalt serifs on a graph-paper canvas, anchored by stair-stepped pixel-glitch decorations and slim hairline rules.
- Mood: editorial, design-research, studious, modernist, tech-print, monochrome
- Tone: considered, literary, studious, quietly-modern, editorial
- Scheme: light
- Density: medium
- Best for: Anything that should feel like a quietly serious design / research bulletin, art publication, or curated trend report. Strong for studio annuals, agency capabilities decks, design-research publications, architecture / art / academic decks, and any deck wanting one strict accent colour and a printed-ledger calmness rather than corporate polish.
- Avoid for: Decks that need warmth, multi-colour energy, or a casual / playful voice — the strict cobalt + cream + grid palette is intentionally austere.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/cobalt-grid`

### Coral (`coral`)

- Tagline: Cream and coral on near-black, set in oversized Bebas Neue.
- Mood: bold, warm, modern, confident
- Tone: graphic, punchy, magazine
- Scheme: mixed
- Density: medium
- Best for: Anything that should feel warm-graphic and editorial: fashion, beauty, fitness, F&B, lifestyle brands, agency credentials. Just as strong for a creator portfolio, a manifesto, or a tech / research deck that wants warmth and a single bold accent instead of corporate cool.
- Avoid for: Contexts that should feel quiet or institutional — the coral accent and oversized Bebas Neue commit hard to a confident magazine voice.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/coral`

### Creative Mode (`creative-mode`)

- Tagline: Cream paper canvas with confident multi-color (green, pink, orange, yellow) accents and Archivo Black display.
- Mood: creative, confident, playful, design-led
- Tone: graphic, expressive, modern
- Scheme: light
- Density: medium-high
- Best for: Anything that should feel design-led and confident: creative agency pitches, design studio decks, ad shop credentials, brand creative reviews, art-direction reviews. Also a great unexpected pick for a tech talk, research findings, or finance review when the speaker wants to lead with taste rather than convention.
- Avoid for: Contexts that demand institutional restraint and a quiet authority — the saturated multi-accent palette will read as expressive, not formal.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/creative-mode`

### Daisy Days (`daisy-days`)

- Tagline: Cheerful pastel deck with hand-drawn daisies, stars, and rainbows. Friendly, soft, and warm.
- Mood: cheerful, playful, warm, sunny, wholesome
- Tone: friendly, soft, encouraging, approachable, lighthearted
- Scheme: light
- Density: medium
- Best for: Anything that should feel friendly, soft, and joyful: educational content, kids and family, wellness programs, community workshops, creator portfolios for craft / illustration. Also lovely for an unexpected playful internal kickoff, a wedding planning deck, or any moment where warmth is the message — including across tech or business contexts.
- Avoid for: Contexts where the audience explicitly expects authority and precision — the hand-drawn pastel SVG decorations are the opposite of buttoned-up.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/daisy-days`

### Editorial Forest (`editorial-forest`)

- Tagline: Forest green, dusty pink, and warm cream meet Source Serif 4 in a quiet, intentional quarterly-review deck.
- Mood: editorial, quiet, considered, warm, intentional
- Tone: literary, thoughtful, warm, low-pressure
- Scheme: mixed
- Density: medium
- Best for: Anything that should feel like a considered editorial — quarterly reviews, internal readouts, studio updates, creative-agency presentations. Equally good for any deck that wants to feel warm and unhurried rather than corporate, including research recaps, book or program announcements, and team retrospectives.
- Avoid for: Contexts that need to feel urgent, punchy, or sales-driven — the palette and rhythm are intentionally quiet.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/editorial-forest`

### Editorial Tri-Tone (`editorial-tri-tone`)

- Tagline: Three-color editorial system: dusty pink, mustard cream, and deep burgundy, set in Bricolage + Instrument Serif.
- Mood: editorial, warm, intentional, moody
- Tone: literary, warm, considered, stylish
- Scheme: mixed
- Density: medium
- Best for: Anything that should feel like a fashion-magazine spread: editorial pitches, fashion brand decks, lifestyle media, art direction reviews. Equally good for any deck — including tech, research, or business — that wants tri-tone discipline and serif/sans contrast instead of the usual neutrals.
- Avoid for: Decks that need to read as soft or comforting — the burgundy/pink/cream tri-tone is intentionally high-contrast and styled.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/editorial-tri-tone`

### Emerald Editorial (`emerald-editorial`)

- Tagline: A magazine-cover business deck: emerald + navy + paper, double-rule masthead ornaments, and a bold Bodoni-style display serif.
- Mood: editorial, considered, confident, magazine-cover
- Tone: literary, authoritative, warm, designed
- Scheme: mixed
- Density: medium
- Best for: Anything that should feel like the front of a serious magazine, including but not limited to leadership readouts, planning-office reviews, and strategy briefings. The double-rule masthead ornament gives it editorial gravitas without making it stiff — also a great unexpected pick for product launches or research recaps that want to feel considered rather than corporate.
- Avoid for: Contexts that need to read as quiet, neutral, or institutionally restrained — the emerald field is too saturated to disappear into the background.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/emerald-editorial`

### Grove (`grove`)

- Tagline: Forest-green canvas with cream type, classical Playfair serifs, and a single rust accent.
- Mood: organic, considered, warm, literary, natural
- Tone: classical, warm, considered, patient
- Scheme: mixed
- Density: medium
- Best for: Anything that should feel organic, considered, and grown-up: sustainability and wellness brands, outdoor / nature products, wineries and restaurants, literary or arts decks, advisory deliverables, bilingual EN/CN reports. Also a calm, distinctive choice for tech, research, or business decks that want patience over urgency.
- Avoid for: Decks that need neon energy or rapid-fire pop — the forest-green canvas and Playfair serif commit to a slow, classical voice.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/grove`

### Long Table (`long-table`)

- Tagline: Warm cream and rust-red supper-club aesthetic with bold uppercase grotesk headlines, Fraunces serifs, and pill-shaped outlined buttons.
- Mood: warm, intimate, modern, friendly, small-batch, social, hospitality
- Tone: warm, playful, considered, social, magazine-friendly, modern-editorial
- Scheme: light
- Density: medium
- Best for: Anything that should feel like a warm, intimate, modern hospitality / community brand: supper clubs, dinner series, small restaurants, creative-studio events, membership pitches, lifestyle and wine brands. Equally good for any deck wanting a single warm accent colour, mixed-weight typography, and a social-media-aware modern-editorial voice.
- Avoid for: Decks that need corporate polish, technical density, or a cold / minimalist register — the rust-red palette and bold serif mix are intentionally warm and people-facing.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/long-table`

### Mat (`mat`)

- Tagline: Dark sage canvas with bone paper and burnt-orange accent; mid-century modern with wood undertones.
- Mood: warm-modern, considered, tactile, mid-century
- Tone: warm, design-led, intentional, considered
- Scheme: mixed
- Density: medium
- Best for: Anything that should feel mid-century, tactile, and intentional: design studio credentials, architecture / interior brands, ceramics / craft / furniture, advisory decks. Also a warm, distinctive choice for tech, research, or business decks that want a considered analog feel instead of digital-cool.
- Avoid for: Contexts that need fast tech energy or institutional restraint — the muted sage and burnt-orange palette is intentionally warm and slow.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/mat`

### Monochrome (`monochrome`)

- Tagline: Ivory ledger paper with all-black type; Lora serif headlines, Jost body, no color at all.
- Mood: restrained, literary, archival, ledger
- Tone: literary, considered, neutral, honest
- Scheme: light
- Density: high
- Best for: Anything that should feel like a hand-typeset ledger: user research synthesis, white papers, longform reports, academic and policy briefs, advisory deliverables, bilingual EN/CN reports. Equally good for tech, design, or brand decks that want their words to be the only thing on the page.
- Avoid for: Decks that need visual personality or color-led storytelling — the all-ink palette is intentionally austere.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/monochrome`

### Neo-Grid Bold (`neo-grid-bold`)

- Tagline: Editorial neo-brutalism with a single neon yellow accent on off-white paper.
- Mood: confident, punchy, editorial, modern
- Tone: bold, minimal, design-led, graphic
- Scheme: light
- Density: high
- Best for: Anything that should feel confident and editorial-graphic: design-led pitches, brand work, founder talks, conference keynotes. Excellent for stat-heavy slides, comparisons, and process flows. Just as strong for tech, research, or finance when the speaker wants to read as design-led rather than corporate.
- Avoid for: Contexts that need to feel quiet, traditional, or warm — the neon-yellow accent and uppercase display commit to a confident editorial voice.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/neo-grid-bold`

### People's Platform (Block & Bold) (`peoples-platform`)

- Tagline: Activist poster energy: blue, orange, red on cream, with Alfa Slab + Caveat Brush.
- Mood: activist, loud, graphic, honest
- Tone: punchy, direct, expressive, warm-bold
- Scheme: light
- Density: medium-high
- Best for: Anything that should feel honest, loud, and graphic: cultural commentary, manifestos, civic and community decks, design talks, campaign pitches. Excellent for founder-vision moments, mission statements, or any deck — including across industries — that wants protest-poster energy instead of corporate polish.
- Avoid for: Contexts where institutional restraint is the actual goal — the saturated political-poster palette commits hard to expressive energy.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/peoples-platform`

### Pin & Paper (`pin-and-paper`)

- Tagline: Yellow paper with safety-pin illustrations, ink-blue handwritten Caveat, paper-grain texture.
- Mood: crafted, handmade, warm, thoughtful, literary
- Tone: literary, intimate, warm, grounded
- Scheme: light
- Density: medium
- Best for: Anything that should feel hand-crafted, warm, and literary: qualitative research findings, founder reflections, longform brand stories, workshop debriefs. The signature safety-pin illustrations and paper-grain texture make it especially good for any deck — including tech or business — that wants personality and warmth over polish.
- Avoid for: Decks that need to feel digital-native polished or rigorously data-driven — handwritten Caveat is intentionally informal.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/pin-and-paper`

### Pink Script — After Hours (`pink-script`)

- Tagline: Black canvas, hot pink accent, pearl-cream paper, Instrument Serif headlines: late-night editorial luxury.
- Mood: nocturnal, moody, intentional, luxe, expressive
- Tone: literary, sultry, considered, magazine
- Scheme: dark
- Density: low
- Best for: Anything that should feel nocturnal, intentional, and a little luxe: fashion brand decks, creator personal brands, after-hours / nightlife / spirits launches, luxury product reveals, editorial features. Also a striking unexpected pick for a tech keynote, research synthesis, or business pitch that wants to land with magnetic confidence.
- Avoid for: Daytime corporate-professional and traditional B2B contexts where the dark canvas with hot-pink accent reads as too styled or too expressive.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/pink-script`

### Playful (`playful`)

- Tagline: Sun-warm peach background with Syne display: a friendly indie launch deck.
- Mood: warm, approachable, indie, friendly
- Tone: upbeat, informal, welcoming
- Scheme: light
- Density: medium
- Best for: Anything that should feel warm, indie, and approachable: creator portfolios, indie product launches, lifestyle brands, small-business pitches, newsletter / community decks. Also welcoming for any deck — including tech or research — that wants to feel friendly and human rather than corporate.
- Avoid for: Contexts where institutional credibility matters more than warmth — the peach palette is intentionally informal.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/playful`

### Raw Grid (`raw-grid`)

- Tagline: Neo-brutalist deck with thick borders, offset shadows, and a pink/sage/ink palette.
- Mood: raw, punchy, energetic, confident
- Tone: direct, modern, no-nonsense, graphic
- Scheme: light
- Density: high
- Best for: Anything that should feel direct and graphic-confident: founder pitches, accelerator demos, brand decks, indie launches, creator portfolios. Strong for stat slides, comparison tables, and process flows. Equally good for tech, research, or finance when the speaker wants the deck to feel scrappy-confident rather than buttoned-up.
- Avoid for: Contexts that need to feel soft, warm, or intentionally quiet — the brutalist borders and offset shadows commit to a graphic voice.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/raw-grid`

### Retro Windows (`retro-windows`)

- Tagline: Windows 95 chrome: gray title bars, MS Sans Serif, pixel typography, full nostalgia.
- Mood: nostalgic, retro, geeky, playful
- Tone: winking, nostalgic, geeky, fun
- Scheme: light
- Density: medium
- Best for: Anything that should feel knowingly nostalgic: retro gaming, Y2K-aesthetic brands, creator portfolios with a 90s vibe, tech-history talks, deliberately tongue-in-cheek decks. A great choice anywhere a playful retro reference is the entire point.
- Avoid for: Decks that need to read as modern, elegant, or institutionally credible — the Win95 chrome will always read as a costume.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/retro-windows`

### Retro Zine (`retro-zine`)

- Tagline: Beige paper with green accent and Bebas Neue + Caveat: a riso-printed zine in HTML form.
- Mood: crafted, lo-fi, underground, warm-retro
- Tone: scrappy, warm, intentional, DIY
- Scheme: light
- Density: medium
- Best for: Anything that should feel printed, lo-fi, and crafted: indie zines and publications, music / arts brands, creator portfolios, small-batch craft launches, community decks. Also a great underdog choice for tech, research, or business decks that want a riso-print warmth instead of digital polish.
- Avoid for: Contexts that demand digital-native polish or fast modern-tech energy — the layered zine aesthetic intentionally feels handmade.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/retro-zine`

### Sakura Chroma (`sakura-chroma`)

- Tagline: Vintage Japanese cassette-package aesthetic: cream paper, diagonal rainbow ribbons, condensed bold type, JIS-style spec checkboxes.
- Mood: retro, playful, kawaii-tech, warm, tactile, product-catalogue
- Tone: playful, confident, warm, tactile, 80s-Japanese-tech
- Scheme: light
- Density: medium
- Best for: Anything that should feel like a vintage Japanese cassette package or a TDK / Sony / Sakura Color product catalogue: indie hardware brand decks, music-label release schedules, analog studio retrospectives, zine and magazine pitches, kawaii-tech product launches, creative-studio annual reports. Equally good for any deck wanting bold colour, condensed display type, and a tactile printed-product personality.
- Avoid for: Decks that need restrained, corporate, or quiet typography — the bold condensed lockups, ribbon stripes, and primary-colour palette are intentionally loud and product-page-y.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/sakura-chroma`

### Scatterbrain (`scatterbrain`)

- Tagline: Post-it inspired: pastel sticky notes, Caveat handwriting, Shrikhand and Zilla Slab type stack.
- Mood: playful, creative, warm, messy-on-purpose, workshop
- Tone: informal, warm, expressive, human
- Scheme: light
- Density: high
- Best for: Anything that should feel like a designer's whiteboard: brainstorms, workshops, creative-agency credentials, design-thinking sessions, ideation pitches, art-direction reviews. Equally fun for any deck — including tech, research, or business — that wants to read as in-progress thinking rather than polished conclusions.
- Avoid for: Contexts that demand precision and institutional weight — the post-it sticky-note aesthetic intentionally reads as warm and unfinished.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/scatterbrain`

### Signal (`signal`)

- Tagline: Deep navy canvas with bone paper and a single muted-gold accent; institutional with quiet weight.
- Mood: institutional, trustworthy, considered, weighty
- Tone: sober, polished, established, literary
- Scheme: mixed
- Density: high
- Best for: Anything that should feel weighty, considered, and credibly institutional: investor decks, board presentations, consulting deliverables, legal / policy briefs, advisory pitches. Also a strong choice for tech, research, or brand work that wants to read as quietly authoritative rather than loud.
- Avoid for: Contexts that should feel hot, fast, or intentionally playful — the navy + gold restraint commits to a sober voice.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/signal`

### Soft Editorial (`soft-editorial`)

- Tagline: Cormorant Garamond serif on warm paper with sage, blush, and lemon accents.
- Mood: literary, elegant, quiet, warm-classical
- Tone: literary, considered, warm, magazine
- Scheme: light
- Density: low
- Best for: Anything that should feel literary, elegant, and unhurried: editorial features, longform brand stories, gallery / museum decks, advisory deliverables, wedding / lifestyle media, founder essays. Equally good for tech, research, or business decks that want a Sunday-supplement warmth instead of corporate polish.
- Avoid for: Decks that need visual heat or punch — the warm-paper palette and Cormorant serif are intentionally quiet.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/soft-editorial`

### Stencil & Tablet (`stencil-tablet`)

- Tagline: Bone paper with stencil-cut headlines and a six-color earth palette: archaeology meets brand.
- Mood: archival, earthy, tactile, considered, graphic
- Tone: weighty, considered, tactile, literary
- Scheme: light
- Density: medium
- Best for: Anything that should feel archival, tactile, and weighty-graphic: museum and cultural-institution decks, art / architecture brands, longform research, heritage and craft brands, manifestos. A great choice anytime — including across tech and business — when you want the deck to feel like a field manual rather than a slide deck.
- Avoid for: Contexts that demand digital-native polish or playful pop — the stencil-cut display and earth-tone palette commit to a deliberate analog feel.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/stencil-tablet`

### Studio (`studio`)

- Tagline: Black canvas with electric-yellow type; high-voltage design studio aesthetic.
- Mood: electric, bold, graphic, design-led, high-contrast
- Tone: graphic, loud, modern, intentional
- Scheme: dark
- Density: medium
- Best for: Anything that should feel electric and design-led: studio credentials, creative agency pitches, brand showcases, art-direction reviews, fashion / sneaker brand work. Also a striking unexpected choice for tech, research, or business decks where the speaker wants the deck to *be* a brand statement.
- Avoid for: Contexts that should feel quiet or institutional — the black-and-electric-yellow palette is the loudest in the library.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/studio`

### Vellum (`vellum`)

- Tagline: Deep navy canvas with warm-yellow Cormorant serifs and a single dusty teal accent. A quiet, scholarly aesthetic.
- Mood: scholarly, literary, considered, quiet, intellectual
- Tone: literary, considered, patient, intelligent
- Scheme: dark
- Density: low
- Best for: Anything that should feel scholarly, literary, and quietly intelligent: research synthesis, white papers, academic and policy briefs, advisory deliverables, longform editorial pieces, founder reflections. Equally strong for any deck — including tech, business, or creator work — that wants a calm, considered atmosphere instead of energetic visuals.
- Avoid for: Contexts that need visual heat or pop — the navy + warm-yellow Cormorant aesthetic is intentionally low-tempo.
- Folder: `gallery/frontend-slides-bold/bold-template-pack/templates/vellum`

```


# File: `references/sakura-chroma-source-analysis.md`

```markdown
# Sakura Chroma Source Analysis

Source of truth copied from:

```txt
https://github.com/zarazhangrui/beautiful-html-templates/tree/main/templates/sakura-chroma
```

Local source files:

```txt
gallery/beautiful-html-templates/templates/sakura-chroma/template.html
gallery/beautiful-html-templates/templates/sakura-chroma/design.md
gallery/beautiful-html-templates/templates/sakura-chroma/template.json
```

Generated local preview screenshots:

```txt
gallery/beautiful-html-templates/templates/sakura-chroma/screenshots/
```

## What makes the real template work

Sakura Chroma is not just a cream background with rainbow stripes. It works because every slide behaves like a printed cassette/product catalogue page.

Key qualities:

- **Massive editorial type**: Big Shoulders Display is used at brutal scale, with tight line-height and dense lockups.
- **Large empty fields**: the template leaves confident cream-paper negative space instead of filling every region.
- **One dominant composition per slide**: cover, manifesto, product catalogue, quote/ribbon spread, ledger, stats, closing. Each has a different layout logic.
- **Print-object metaphors**: cards feel like catalogue SKUs, rows feel like spec sheets, badges feel like product stickers, checkboxes feel like JIS package markings.
- **Hard geometry**: rectangles, hairline rules, exact borders, no rounded cards, no soft shadows.
- **Flat color blocks**: the color is graphic and printed, not glossy, gradient, or decorative filler.
- **Micro-detail discipline**: mono specs, page numbers, tiny labels, footer metadata, Japanese accent text, and checkbox marks give it authenticity.
- **Compositional asymmetry**: it uses big off-center masses, sweeping ribbons, and large type blocks; it does not center everything like a generic AI deck.

## Where our first test deck failed

The first test was useful as a systems check, but not good enough aesthetically.

Problems:

- It translated the design tokens but not the *composition logic*.
- It overused generic product cards and underused catalogue poster rhythm.
- It made ribbons as decoration instead of structural composition.
- It had too many words trying to explain Gus instead of fewer stronger poster statements.
- It lacked the source template's confident negative space and typographic scale.
- It did not use enough authentic micro-details: SKU labels, product-format rows, edition marks, side labels, package metadata.
- It felt like a themed deck. The reference feels like a real object.

## Implementation rules for future Sakura Chroma decks

1. Start from the real `template.html`, not the generic base deck.
2. Preserve the source composition patterns:
   - cover package spread
   - giant manifesto statement with petal dots
   - four-card product catalogue grid
   - ribbon-backed quote box
   - ledger/spec-sheet rows
   - stat/equalizer spread
   - closing colophon
3. Replace demo content with user/project content, but keep the print-object grammar.
4. Use fewer, stronger phrases. Do not explain everything on every slide.
5. Build visual hierarchy first, content second.
6. Use strict 1920×1080 fixed-stage wrapper for Hermes, but keep the original template's proportions.
7. Never add modern SaaS styling: no glass, no blurred shadows, no rounded cards, no generic gradient backgrounds.
8. Use hard offset shadows only where the source does.
9. Use 16:9 PDF export verification before sending any PDF.
10. Deliver a preview URL, not raw HTML.

## Aesthetic target

The final deck should feel like:

```txt
Japanese cassette catalogue × creative-tech dossier × warm printed product object
```

Not:

```txt
A normal slide deck decorated with Sakura Chroma colors
```

```


# File: `references/ramp-up-plan.md`

```markdown
# Beautiful Presentations Ramp-Up Plan

## Goal

Raise the skill from “can generate HTML slides” to “can reliably create beautiful, reference-grade browser-native decks.”

The core shift:

```txt
from themed slide generation → to design-system adaptation
```

A great deck should feel like a designed object, not content placed inside a style skin.

## Immediate fixes already applied

- Raw HTML files should not be attached by default.
- HTML delivery should produce a preview URL.
- Added `publish_preview.py` helper for preview publishing.
- PDF export now injects a 16:9 print page rule and exports 1920×1080 / 1440×810pt pages.
- Imported the real `beautiful-html-templates/templates/sakura-chroma` source.
- Added Sakura Chroma source-analysis notes.

## Phase 1 — Preview delivery infrastructure

### Problem

HTML files are technically correct but bad client deliverables in Telegram/chat. They need a URL.

### Implementation

Add a stable preview host for generated decks:

```txt
/var/www/presentations/<deck-slug>/<timestamp>/index.html
https://preview.domain.com/<deck-slug>/<timestamp>/
```

Set env vars on each Hermes VPS/profile:

```bash
HERMES_PRESENTATION_PREVIEW_ROOT=/var/www/presentations
HERMES_PRESENTATION_PREVIEW_BASE_URL=https://preview.domain.com
```

Then the skill uses:

```bash
python ~/.hermes/skills/creative/beautiful-presentations/scripts/publish_preview.py deck.html --slug project-name
```

### Acceptance criteria

- User receives a clickable URL.
- Raw HTML is never attached unless requested.
- Local backup path is still reported.
- URL works on phone and desktop.

## Phase 2 — Real template adaptation

### Problem

The first Sakura Chroma deck copied tokens and motifs, but not the source template's composition intelligence.

### Implementation

For every imported template, store:

```txt
template.html
design.md
template.json
screenshots/
adaptation-notes.md
```

For Sakura Chroma specifically, future decks should start from the real source template and map content into its slide archetypes:

- package cover
- giant manifesto statement
- product catalogue grid
- ribbon quote card
- ledger/spec sheet
- stat/equalizer page
- closing colophon

### Acceptance criteria

- Deck looks like a real object from the reference universe.
- Different slides use different composition archetypes.
- Visual system is not just colors + fonts.
- User content replaces demo content without collapsing the layout.

## Phase 3 — Design QA rubric

Before final delivery, evaluate every slide against:

- **Composition**: strong focal point, asymmetry, visual balance.
- **Typography**: correct type scale, no timid headings, readable body.
- **Density**: intentional whitespace, no cramped cards.
- **Motif discipline**: motifs used structurally, not randomly.
- **Authenticity**: micro-labels, metadata, spec rows, and object logic feel real.
- **Export**: no overflow, no console errors, PDF is 16:9 if requested.

Add scoring:

```txt
A = client-ready / reference-grade
B = usable but needs polish
C = generic themed deck
F = broken / unreadable / export failure
```

Do not deliver below B. For high-design asks, target A.

## Phase 4 — Template gallery upgrade

### Problem

The gallery currently exists as reference files, but agents may still generate generic approximations.

### Implementation

For each strong template:

1. Copy source template.
2. Generate screenshots.
3. Write adaptation notes.
4. Extract reusable slide archetypes.
5. Create mini CSS/component snippets.
6. Add “what not to do” pitfalls.

Priority templates:

1. Sakura Chroma
2. Studio
3. Bold Poster
4. Neo Grid Bold
5. Editorial Forest
6. Signal
7. Vellum
8. Raw Grid

## Phase 5 — Export hardening

PDF:

- Always force 16:9 page size.
- Verify with `pypdf` if `pdfinfo` is missing.
- Compare page count to slide count.
- Optionally screenshot PDF pages for visual QA.

Video:

- Export from verified slide screenshots first.
- Add animated capture later.

HTML:

- Preview URL first.
- Attach raw HTML only on explicit request.

## New generation rule

When a user asks for a named template style:

```txt
Do not approximate from memory. Read the template source, inspect screenshots, and adapt its composition system.
```

## Next implementation move

Rebuild the Gus 3-slide deck from the actual Sakura Chroma source template, not from the generic base. Use fewer words, stronger poster statements, and object-like catalogue composition.

```


# File: `templates/base-deck.html`

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Beautiful Presentation Template</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

    :root {
      --stage-bg: #050506;
      --slide-bg: #08080a;
      --ink: #f3efe7;
      --muted: #a8a199;
      --accent: #d6aa62;
      --accent-2: #7ba7ff;
      --panel: rgba(255, 255, 255, 0.055);
      --line: rgba(255, 255, 255, 0.14);
      --font-display: 'Cormorant Garamond', Georgia, serif;
      --font-body: 'IBM Plex Sans', Arial, sans-serif;
      --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes softDrift {
      from { transform: translate3d(0, 0, 0) scale(1); }
      to { transform: translate3d(12px, -10px, 0) scale(1.01); }
    }

    @keyframes quietPulse {
      0%, 100% { opacity: .88; }
      50% { opacity: 1; }
    }

    html,
    body {
      width: 100%;
      height: 100%;
      margin: 0;
      overflow: hidden;
      background: var(--stage-bg, #000);
    }

    * { box-sizing: border-box; }

    .deck-viewport {
      position: fixed;
      inset: 0;
      overflow: hidden;
      background: var(--stage-bg, #000);
    }

    .deck-stage {
      position: absolute;
      left: 0;
      top: 0;
      width: 1920px;
      height: 1080px;
      overflow: hidden;
      transform-origin: 0 0;
      background: var(--slide-bg, #fff);
    }

    .slide {
      position: absolute;
      inset: 0;
      width: 1920px;
      height: 1080px;
      overflow: hidden;
      display: block;
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
      background: var(--slide-bg, #fff);
      color: var(--ink);
      font-family: var(--font-body);
      padding: 82px;
    }

    .slide.active,
    .slide.visible {
      visibility: visible;
      opacity: 1;
      pointer-events: auto;
      z-index: 1;
    }

    img, video, canvas, svg {
      max-width: 100%;
      max-height: 100%;
    }

    .slide::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: .96;
      background:
        radial-gradient(circle at 15% 20%, rgba(214, 170, 98, .20), transparent 32%),
        radial-gradient(circle at 85% 12%, rgba(123, 167, 255, .12), transparent 28%),
        linear-gradient(135deg, rgba(255,255,255,.035), transparent 38%);
    }

    .slide.visible::before { animation: softDrift 18s ease-in-out infinite alternate; }

    .slide::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: .14;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.78' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");
    }

    .content {
      position: relative;
      z-index: 2;
      height: 100%;
      display: grid;
      grid-template-rows: auto 1fr auto;
      gap: 48px;
    }

    .eyebrow {
      color: var(--accent);
      font-size: 22px;
      letter-spacing: .18em;
      text-transform: uppercase;
      font-weight: 600;
    }

    h1, h2 {
      font-family: var(--font-display);
      letter-spacing: -0.055em;
      line-height: .88;
      margin: 0;
    }

    h1 { font-size: 154px; max-width: 1250px; }
    h2 { font-size: 104px; max-width: 1220px; }

    p {
      margin: 0;
      color: var(--muted);
      font-size: 34px;
      line-height: 1.28;
      max-width: 920px;
    }

    .grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
      align-self: end;
    }

    .card {
      min-height: 250px;
      padding: 34px;
      border: 1px solid var(--line);
      background: var(--panel);
      border-radius: 28px;
      backdrop-filter: blur(18px);
      transition: transform 220ms var(--ease-out), border-color 220ms var(--ease-out), background 220ms var(--ease-out);
    }

    .card:hover {
      transform: translateY(-3px);
      border-color: rgba(255,255,255,.26);
      background: rgba(255,255,255,.075);
    }

    .card strong {
      display: block;
      color: var(--ink);
      font-size: 34px;
      margin-bottom: 18px;
    }

    .card span {
      display: block;
      color: var(--muted);
      font-size: 25px;
      line-height: 1.32;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: end;
      color: rgba(243,239,231,.55);
      font-size: 22px;
      letter-spacing: .04em;
    }

    .rule {
      width: 280px;
      height: 1px;
      background: linear-gradient(90deg, var(--accent), transparent);
      margin-top: 36px;
    }

    .reveal {
      opacity: 0;
      transform: translateY(26px);
      filter: blur(8px);
      transition: opacity 700ms var(--ease-out), transform 700ms var(--ease-out), filter 700ms var(--ease-out);
    }

    .slide.visible .reveal {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }

    .slide.visible .reveal:nth-child(1) { transition-delay: 80ms; }
    .slide.visible .reveal:nth-child(2) { transition-delay: 160ms; }
    .slide.visible .reveal:nth-child(3) { transition-delay: 240ms; }
    .slide.visible .reveal:nth-child(4) { transition-delay: 320ms; }

    .deck-controls {
      position: fixed;
      left: 50%;
      bottom: 22px;
      transform: translateX(-50%);
      z-index: 1000;
      display: flex;
      gap: 12px;
      align-items: center;
      padding: 10px 14px;
      border: 1px solid rgba(255,255,255,.14);
      background: rgba(5,5,6,.72);
      color: #fff;
      border-radius: 999px;
      backdrop-filter: blur(18px);
      font-family: var(--font-body);
    }

    .deck-controls button {
      border: 0;
      background: rgba(255,255,255,.1);
      color: #fff;
      padding: 9px 14px;
      border-radius: 999px;
      cursor: pointer;
    }

    .deck-controls button:hover,
    .deck-controls button:focus-visible {
      background: var(--accent);
      color: #090806;
      outline: none;
    }

    #slideCounter { min-width: 64px; text-align: center; color: rgba(255,255,255,.72); }

    @media print {
      html, body { width: 1920px; height: auto; overflow: visible; background: #fff; }
      .deck-viewport { position: static; overflow: visible; background: #fff; }
      .deck-stage { position: static; width: auto; height: auto; transform: none !important; background: none; }
      .slide {
        position: relative;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        pointer-events: auto !important;
        width: 1920px;
        height: 1080px;
        break-after: page;
        page-break-after: always;
      }
      .slide:last-child { break-after: auto; page-break-after: auto; }
      .deck-controls, .review-tools, .export-tools { display: none !important; }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation: none !important;
        transition-duration: 0.01ms !important;
      }
    }
  </style>
</head>
<body>
  <div class="deck-viewport">
    <main class="deck-stage" id="deckStage">
      <section class="slide active visible" data-slide="1">
        <div class="content">
          <div class="eyebrow reveal">Project / Presentation</div>
          <div>
            <h1 class="reveal">Replace with a sharp title.</h1>
            <div class="rule reveal"></div>
          </div>
          <div class="footer reveal"><span>Browser-native deck</span><span>01</span></div>
        </div>
      </section>

      <section class="slide" data-slide="2">
        <div class="content">
          <div class="eyebrow reveal">Section</div>
          <div>
            <h2 class="reveal">One clear idea per slide.</h2>
            <p class="reveal">Use the space for hierarchy, contrast, and visual rhythm. Split dense content instead of shrinking it.</p>
          </div>
          <div class="grid-3 reveal">
            <div class="card"><strong>Signal</strong><span>Say the important thing directly.</span></div>
            <div class="card"><strong>System</strong><span>Show the mechanism or structure.</span></div>
            <div class="card"><strong>Proof</strong><span>Use real evidence or labeled placeholders.</span></div>
          </div>
        </div>
      </section>
    </main>
  </div>

  <nav class="deck-controls" aria-label="Presentation controls">
    <button id="prevSlide" type="button">Prev</button>
    <span id="slideCounter">1 / 2</span>
    <button id="nextSlide" type="button">Next</button>
  </nav>

  <script>
    class SlideDeck {
      constructor() {
        this.stage = document.getElementById('deckStage');
        this.slides = Array.from(document.querySelectorAll('.slide'));
        this.storageKey = `${location.pathname}:beautifulDeckSlide`;
        this.current = Number(localStorage.getItem(this.storageKey) || 0);
        this.current = Math.max(0, Math.min(this.current, this.slides.length - 1));
        this.counter = document.getElementById('slideCounter');
        this.prevButton = document.getElementById('prevSlide');
        this.nextButton = document.getElementById('nextSlide');
        this.wheelLocked = false;
        this.scaleStage();
        this.bindEvents();
        this.show(this.current);
      }

      scaleStage() {
        const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
        const x = (window.innerWidth - 1920 * scale) / 2;
        const y = (window.innerHeight - 1080 * scale) / 2;
        this.stage.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      }

      show(index) {
        this.current = Math.max(0, Math.min(index, this.slides.length - 1));
        this.slides.forEach((slide, i) => {
          slide.classList.toggle('active', i === this.current);
          slide.classList.toggle('visible', i === this.current);
        });
        if (this.counter) this.counter.textContent = `${this.current + 1} / ${this.slides.length}`;
        localStorage.setItem(this.storageKey, String(this.current));
      }

      next() { this.show(this.current + 1); }
      previous() { this.show(this.current - 1); }

      handleWheel(event) {
        event.preventDefault();
        const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
        if (Math.abs(delta) < 18 || this.wheelLocked) return;
        delta > 0 ? this.next() : this.previous();
        this.wheelLocked = true;
        window.setTimeout(() => { this.wheelLocked = false; }, 640);
      }

      bindEvents() {
        window.addEventListener('resize', () => this.scaleStage());
        document.addEventListener('keydown', (event) => {
          if (['ArrowRight', ' ', 'PageDown'].includes(event.key)) { event.preventDefault(); this.next(); }
          if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); this.previous(); }
          if (event.key === 'Home') { event.preventDefault(); this.show(0); }
          if (event.key === 'End') { event.preventDefault(); this.show(this.slides.length - 1); }
        });
        document.addEventListener('wheel', (event) => this.handleWheel(event), { passive: false });
        if (this.prevButton) this.prevButton.addEventListener('click', () => this.previous());
        if (this.nextButton) this.nextButton.addEventListener('click', () => this.next());
        let startX = null;
        document.addEventListener('touchstart', (event) => { startX = event.touches[0].clientX; }, { passive: true });
        document.addEventListener('touchend', (event) => {
          if (startX === null) return;
          const delta = event.changedTouches[0].clientX - startX;
          if (Math.abs(delta) > 60) delta < 0 ? this.next() : this.previous();
          startX = null;
        }, { passive: true });
      }
    }

    window.addEventListener('DOMContentLoaded', () => { window.deck = new SlideDeck(); });
  </script>
</body>
</html>

```


# File: `scripts/setup_presentations_repos.py`

```python
#!/usr/bin/env python3
"""Create/check the shared presentations repo structure for browser-first deck previews.

Default pattern:
- private source repo: <owner>/presentations
- public deploy mirror: <owner>/<owner>.github.io
- live URLs: https://<owner>.github.io/presentations/<project-slug>/

This script is intentionally model-neutral and uses only git + GitHub REST.
It reads auth from either GITHUB_TOKEN/GH_TOKEN or git credential fill.
"""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import urllib.error
import urllib.request
from pathlib import Path


def run(cmd: list[str], cwd: Path | None = None, check: bool = True) -> subprocess.CompletedProcess[str]:
    proc = subprocess.run(cmd, cwd=cwd, text=True, capture_output=True)
    if check and proc.returncode != 0:
        raise SystemExit(
            f"Command failed: {' '.join(cmd)}\nSTDOUT:\n{proc.stdout}\nSTDERR:\n{proc.stderr}"
        )
    return proc


def get_token() -> str:
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if token:
        return token
    proc = subprocess.run(
        ["git", "credential", "fill"],
        input="protocol=https\nhost=github.com\n\n",
        text=True,
        capture_output=True,
    )
    if proc.returncode == 0:
        values = dict(line.split("=", 1) for line in proc.stdout.splitlines() if "=" in line)
        if values.get("password"):
            return values["password"]
    raise SystemExit("No GitHub token found. Set GITHUB_TOKEN/GH_TOKEN or configure git credentials for github.com.")


def api(token: str, method: str, path: str, data: dict | None = None) -> tuple[int, dict]:
    body = None if data is None else json.dumps(data).encode()
    req = urllib.request.Request(
        "https://api.github.com" + path,
        data=body,
        method=method,
        headers={
            "Authorization": f"token {token}",
            "Accept": "application/vnd.github+json",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            raw = resp.read().decode() or "{}"
            return resp.status, json.loads(raw)
    except urllib.error.HTTPError as exc:
        raw = exc.read().decode(errors="ignore")
        try:
            payload = json.loads(raw)
        except Exception:
            payload = {"raw": raw}
        return exc.code, payload


def ensure_repo(token: str, owner: str, repo: str, private: bool, description: str) -> dict:
    status, payload = api(token, "GET", f"/repos/{owner}/{repo}")
    if status == 404:
        status, payload = api(
            token,
            "POST",
            "/user/repos",
            {"name": repo, "private": private, "description": description, "auto_init": False},
        )
        if status not in (200, 201):
            raise SystemExit(f"Could not create {owner}/{repo}: {status} {payload}")
    elif status != 200:
        raise SystemExit(f"Could not inspect {owner}/{repo}: {status} {payload}")

    if bool(payload.get("private")) != private:
        status, payload = api(token, "PATCH", f"/repos/{owner}/{repo}", {"private": private})
        if status != 200:
            raise SystemExit(f"Could not set {owner}/{repo} private={private}: {status} {payload}")
    return payload


def ensure_clone(owner: str, repo: str, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists():
        run(["git", "clone", f"https://github.com/{owner}/{repo}.git", str(path)], check=False)
    if not (path / ".git").exists():
        path.mkdir(parents=True, exist_ok=True)
        run(["git", "init"], cwd=path)
        run(["git", "checkout", "-B", "main"], cwd=path)
        run(["git", "remote", "remove", "origin"], cwd=path, check=False)
        run(["git", "remote", "add", "origin", f"https://github.com/{owner}/{repo}.git"], cwd=path)


def ensure_public_pages(token: str, owner: str, repo: str) -> None:
    status, payload = api(token, "GET", f"/repos/{owner}/{repo}/pages")
    if status == 200:
        return
    status, payload = api(token, "POST", f"/repos/{owner}/{repo}/pages", {"source": {"branch": "main", "path": "/"}})
    if status not in (200, 201, 204):
        print(f"Warning: could not enable Pages for {owner}/{repo}: {status} {payload}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--owner", required=True, help="GitHub owner/user/org, e.g. larvuz2")
    parser.add_argument("--source-repo", default="presentations")
    parser.add_argument("--deploy-repo", help="Default: <owner>.github.io")
    parser.add_argument("--source-path", default="~/presentations/shared-repo")
    parser.add_argument("--deploy-path", default="~/presentations/public-pages-deploy")
    args = parser.parse_args()

    owner = args.owner
    deploy_repo = args.deploy_repo or f"{owner}.github.io"
    token = get_token()

    source = ensure_repo(
        token,
        owner,
        args.source_repo,
        True,
        "Private source repo for shared browser-first HTML presentations.",
    )
    deploy = ensure_repo(
        token,
        owner,
        deploy_repo,
        False,
        "Public GitHub Pages deployment mirror for presentation review URLs.",
    )

    source_path = Path(args.source_path).expanduser().resolve()
    deploy_path = Path(args.deploy_path).expanduser().resolve()
    ensure_clone(owner, args.source_repo, source_path)
    ensure_clone(owner, deploy_repo, deploy_path)

    # If the public deploy repo is empty, make one initial commit so Pages can enable.
    if not any(p.name != ".git" for p in deploy_path.iterdir()):
        (deploy_path / "index.html").write_text(
            "<!doctype html><meta charset='utf-8'><title>Presentations</title><a href='/presentations/'>Presentations</a>\n"
        )
        run(["git", "add", "."], cwd=deploy_path)
        run(["git", "commit", "-m", "chore: initialize pages deploy repo"], cwd=deploy_path)
        run(["git", "push", "-u", "origin", "main"], cwd=deploy_path)

    ensure_public_pages(token, owner, deploy_repo)

    print(json.dumps({
        "source_repo": source.get("html_url"),
        "source_private": source.get("private"),
        "source_path": str(source_path),
        "deploy_repo": deploy.get("html_url"),
        "deploy_private": deploy.get("private"),
        "deploy_path": str(deploy_path),
        "pages_root": f"https://{owner}.github.io/presentations/",
        "deck_url_pattern": f"https://{owner}.github.io/presentations/<project-slug>/",
    }, indent=2))


if __name__ == "__main__":
    main()

```


# File: `scripts/sync_private_presentations_mirror.py`

```python
#!/usr/bin/env python3
"""Sync a private presentations source repo into a public GitHub Pages deploy mirror.

Default Gus/Larvuz setup:
- private source: /root/presentations/shared-repo
- public mirror: /root/presentations/public-pages-deploy
- mirror path: public repo /presentations/

Use this when GitHub Pages cannot serve directly from a private source repo on the current plan.
The script copies static deck files only; it does not change repo privacy.
"""
from __future__ import annotations

import argparse
import shutil
import subprocess
from pathlib import Path


def run(cmd: list[str], cwd: Path | None = None) -> str:
    proc = subprocess.run(cmd, cwd=cwd, text=True, capture_output=True)
    if proc.returncode != 0:
        raise SystemExit(
            f"Command failed: {' '.join(cmd)}\nSTDOUT:\n{proc.stdout}\nSTDERR:\n{proc.stderr}"
        )
    return proc.stdout.strip()


def copy_tree_contents(source: Path, dest: Path) -> None:
    if not source.exists():
        raise SystemExit(f"Source repo not found: {source}")
    dest.mkdir(parents=True, exist_ok=True)
    if dest.exists():
        shutil.rmtree(dest)
    dest.mkdir(parents=True, exist_ok=True)

    for item in source.iterdir():
        if item.name == ".git":
            continue
        target = dest / item.name
        if item.is_dir():
            shutil.copytree(item, target)
        else:
            shutil.copy2(item, target)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", default="/root/presentations/shared-repo")
    parser.add_argument("--mirror", default="/root/presentations/public-pages-deploy")
    parser.add_argument("--mirror-subdir", default="presentations")
    parser.add_argument("--message", default="chore: sync presentations preview mirror")
    parser.add_argument("--no-push", action="store_true", help="Commit locally but do not push")
    args = parser.parse_args()

    source = Path(args.source).expanduser().resolve()
    mirror = Path(args.mirror).expanduser().resolve()
    mirror_subdir = mirror / args.mirror_subdir

    if not (source / ".git").exists():
        raise SystemExit(f"Source must be a git repo: {source}")
    if not (mirror / ".git").exists():
        raise SystemExit(f"Mirror must be a git repo: {mirror}")

    copy_tree_contents(source, mirror_subdir)

    run(["git", "add", args.mirror_subdir], cwd=mirror)
    status = run(["git", "status", "--short"], cwd=mirror)
    if not status:
        print("No mirror changes to commit.")
        return

    print(status)
    run(["git", "commit", "-m", args.message], cwd=mirror)
    if not args.no_push:
        run(["git", "push"], cwd=mirror)
    print(f"Synced {source} -> {mirror_subdir}")


if __name__ == "__main__":
    main()

```


# File: `scripts/qa_html_deck.py`

```python
#!/usr/bin/env python3
"""QA a Beautiful Presentations HTML deck.

Usage:
    python qa_html_deck.py deck.html [--screenshots qa/screenshots]
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any


def static_checks(html_path: Path) -> dict[str, Any]:
    text = html_path.read_text(encoding="utf-8", errors="replace")
    checks = {
        "exists": html_path.exists(),
        "non_empty": html_path.stat().st_size > 0,
        "has_deck_stage": "deck-stage" in text,
        "has_slides": "class=\"slide" in text or "class='slide" in text or ".slide" in text,
        "has_print_css": "@media print" in text,
        "has_controller": "class SlideDeck" in text or "class SlidePresentation" in text or "window.deck" in text,
        "has_1920_1080": "1920" in text and "1080" in text,
    }
    slide_count = len(re.findall(r"<section[^>]+class=[\"'][^\"']*\bslide\b", text, flags=re.I))
    if slide_count == 0:
        slide_count = len(re.findall(r"data-slide=", text, flags=re.I))
    return {"checks": checks, "slide_count": slide_count}


def browser_checks(html_path: Path, screenshots_dir: Path | None) -> dict[str, Any]:
    try:
        from playwright.sync_api import sync_playwright  # type: ignore
    except Exception as exc:
        return {"available": False, "reason": f"Playwright unavailable: {exc}"}

    result: dict[str, Any] = {"available": True, "console_errors": [], "slides": []}
    if screenshots_dir:
        screenshots_dir.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080}, device_scale_factor=1)

        page.on("console", lambda msg: result["console_errors"].append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda err: result["console_errors"].append(str(err)))

        page.goto(html_path.resolve().as_uri(), wait_until="networkidle")
        page.wait_for_timeout(250)

        slide_count = page.locator(".slide").count()
        result["slide_count"] = slide_count
        result["has_window_deck"] = page.evaluate("() => Boolean(window.deck)")
        result["stage_box"] = page.locator("#deckStage").bounding_box()

        for index in range(slide_count):
            page.evaluate(
                """
                (i) => {
                  if (window.deck && typeof window.deck.show === 'function') window.deck.show(i);
                  else {
                    const slides = Array.from(document.querySelectorAll('.slide'));
                    slides.forEach((slide, idx) => {
                      slide.classList.toggle('active', idx === i);
                      slide.classList.toggle('visible', idx === i);
                    });
                  }
                }
                """,
                index,
            )
            page.wait_for_timeout(700)
            overflow = page.evaluate(
                """
                () => Array.from(document.querySelectorAll('.slide.visible, .slide.active')).map(slide => ({
                  index: Number(slide.dataset.slide || 0),
                  scrollWidth: slide.scrollWidth,
                  clientWidth: slide.clientWidth,
                  scrollHeight: slide.scrollHeight,
                  clientHeight: slide.clientHeight,
                  overflowing: slide.scrollWidth > slide.clientWidth || slide.scrollHeight > slide.clientHeight
                }))
                """
            )
            shot_path = None
            if screenshots_dir:
                shot_path = screenshots_dir / f"slide_{index + 1:03d}.png"
                page.screenshot(path=str(shot_path), full_page=True)
            result["slides"].append({"index": index + 1, "overflow": overflow, "screenshot": str(shot_path) if shot_path else None})
        browser.close()

    return result


def main() -> int:
    parser = argparse.ArgumentParser(description="QA a Beautiful Presentations HTML deck.")
    parser.add_argument("html", help="Input deck.html")
    parser.add_argument("--screenshots", help="Optional screenshot output directory")
    args = parser.parse_args()

    html_path = Path(args.html).expanduser().resolve()
    if not html_path.exists():
        print(json.dumps({"ok": False, "error": f"File not found: {html_path}"}, indent=2))
        return 2

    result: dict[str, Any] = {"html": str(html_path)}
    result.update(static_checks(html_path))
    screenshots_dir = Path(args.screenshots).expanduser().resolve() if args.screenshots else None
    result["browser"] = browser_checks(html_path, screenshots_dir)

    static_ok = all(result["checks"].values()) and result["slide_count"] > 0
    browser = result["browser"]
    browser_ok = True
    if browser.get("available"):
        browser_ok = not browser.get("console_errors") and browser.get("slide_count", 0) > 0
    result["ok"] = bool(static_ok and browser_ok)
    print(json.dumps(result, indent=2))
    return 0 if result["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())

```


# File: `scripts/export_pdf.py`

```python
#!/usr/bin/env python3
"""Export a Beautiful Presentations HTML deck to PDF.

Usage:
    python export_pdf.py deck.html exports/deck.pdf
"""
from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys
from pathlib import Path


def file_url(path: Path) -> str:
    return path.resolve().as_uri()


def verify_pdf(path: Path) -> None:
    if not path.exists():
        raise RuntimeError(f"PDF was not created: {path}")
    if path.stat().st_size <= 0:
        raise RuntimeError(f"PDF is empty: {path}")
    with path.open("rb") as handle:
        header = handle.read(4)
    if header != b"%PDF":
        raise RuntimeError(f"Output does not look like a PDF: {path}")


def export_with_playwright(html_path: Path, pdf_path: Path) -> bool:
    try:
        from playwright.sync_api import sync_playwright  # type: ignore
    except Exception:
        return False

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080}, device_scale_factor=1)
        page.goto(file_url(html_path), wait_until="networkidle")
        page.emulate_media(media="print")
        page.add_style_tag(content="""
          @page { size: 1920px 1080px; margin: 0; }
          html, body { width: 1920px !important; margin: 0 !important; padding: 0 !important; }
          .deck-controls, .review-tools, .export-tools { display: none !important; }
          .deck-viewport { position: static !important; width: 1920px !important; overflow: visible !important; }
          .deck-stage { position: static !important; transform: none !important; width: 1920px !important; height: auto !important; overflow: visible !important; }
          .slide { position: relative !important; display: block !important; visibility: visible !important; opacity: 1 !important; pointer-events: auto !important; width: 1920px !important; height: 1080px !important; overflow: hidden !important; break-after: page !important; page-break-after: always !important; }
          .slide:last-child { break-after: auto !important; page-break-after: auto !important; }
        """)
        page.pdf(
            path=str(pdf_path),
            print_background=True,
            landscape=True,
            width="1920px",
            height="1080px",
            margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
            prefer_css_page_size=False,
        )
        browser.close()
    verify_pdf(pdf_path)
    return True


def find_browser() -> str | None:
    candidates = [
        "chromium",
        "chromium-browser",
        "google-chrome",
        "google-chrome-stable",
        "microsoft-edge",
        "brave-browser",
    ]
    for name in candidates:
        found = shutil.which(name)
        if found:
            return found
    return None


def export_with_browser_binary(html_path: Path, pdf_path: Path) -> bool:
    browser = find_browser()
    if not browser:
        return False
    user_data_dir = pdf_path.parent / ".pdf-browser-profile"
    user_data_dir.mkdir(parents=True, exist_ok=True)
    cmd = [
        browser,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        f"--user-data-dir={user_data_dir}",
        f"--print-to-pdf={pdf_path}",
        "--print-to-pdf-no-header",
        file_url(html_path),
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    verify_pdf(pdf_path)
    return True


def main() -> int:
    parser = argparse.ArgumentParser(description="Export a one-file HTML deck to PDF.")
    parser.add_argument("html", help="Input deck.html")
    parser.add_argument("pdf", help="Output deck.pdf")
    args = parser.parse_args()

    html_path = Path(args.html).expanduser().resolve()
    pdf_path = Path(args.pdf).expanduser().resolve()

    if not html_path.exists():
        print(f"ERROR: HTML file not found: {html_path}", file=sys.stderr)
        return 2
    if html_path.suffix.lower() not in {".html", ".htm"}:
        print(f"ERROR: input is not an HTML file: {html_path}", file=sys.stderr)
        return 2

    pdf_path.parent.mkdir(parents=True, exist_ok=True)

    try:
        if export_with_playwright(html_path, pdf_path):
            print(f"Exported with Playwright: {pdf_path}")
            return 0
    except Exception as exc:
        print(f"Playwright export failed: {exc}", file=sys.stderr)

    try:
        if export_with_browser_binary(html_path, pdf_path):
            print(f"Exported with browser binary: {pdf_path}")
            return 0
    except Exception as exc:
        print(f"Browser binary export failed: {exc}", file=sys.stderr)

    print(
        "ERROR: PDF export needs Playwright Chromium or a local headless browser "
        "(chromium/google-chrome/etc.). HTML remains browser-printable.",
        file=sys.stderr,
    )
    return 1


if __name__ == "__main__":
    raise SystemExit(main())

```


# File: `scripts/export_video.py`

```python
#!/usr/bin/env python3
"""Export a Beautiful Presentations HTML deck to a static MP4 slideshow.

Usage:
    python export_video.py deck.html exports/deck.mp4 --seconds-per-slide 5
"""
from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path


def require_tool(name: str) -> str:
    found = shutil.which(name)
    if not found:
        raise RuntimeError(f"Missing required command: {name}")
    return found


def capture_frames(html_path: Path, frames_dir: Path) -> int:
    try:
        from playwright.sync_api import sync_playwright  # type: ignore
    except Exception as exc:
        raise RuntimeError(f"Playwright is required for frame capture: {exc}") from exc

    frames_dir.mkdir(parents=True, exist_ok=True)
    for old in frames_dir.glob("slide_*.png"):
        old.unlink()

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080}, device_scale_factor=1)
        page.goto(html_path.resolve().as_uri(), wait_until="networkidle")
        page.wait_for_timeout(250)
        slide_count = page.locator(".slide").count()
        if slide_count <= 0:
            raise RuntimeError("No .slide elements found")
        for index in range(slide_count):
            page.evaluate(
                """
                (i) => {
                  if (window.deck && typeof window.deck.show === 'function') window.deck.show(i);
                  else {
                    const slides = Array.from(document.querySelectorAll('.slide'));
                    slides.forEach((slide, idx) => {
                      slide.classList.toggle('active', idx === i);
                      slide.classList.toggle('visible', idx === i);
                    });
                  }
                }
                """,
                index,
            )
            page.wait_for_timeout(120)
            page.screenshot(path=str(frames_dir / f"slide_{index + 1:03d}.png"), full_page=True)
        browser.close()
    return slide_count


def build_video(frames_dir: Path, output_path: Path, seconds_per_slide: float) -> None:
    require_tool("ffmpeg")
    output_path.parent.mkdir(parents=True, exist_ok=True)
    fps_expr = f"1/{seconds_per_slide:g}"
    cmd = [
        "ffmpeg",
        "-y",
        "-framerate",
        fps_expr,
        "-i",
        str(frames_dir / "slide_%03d.png"),
        "-vf",
        "scale=1920:1080,format=yuv420p",
        "-c:v",
        "libx264",
        str(output_path),
    ]
    subprocess.run(cmd, check=True)
    if not output_path.exists() or output_path.stat().st_size <= 0:
        raise RuntimeError(f"Video was not created or is empty: {output_path}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Export an HTML deck to static MP4 slideshow.")
    parser.add_argument("html", help="Input deck.html")
    parser.add_argument("mp4", help="Output deck.mp4")
    parser.add_argument("--seconds-per-slide", type=float, default=5.0)
    parser.add_argument("--frames-dir", help="Optional frames output directory")
    args = parser.parse_args()

    html_path = Path(args.html).expanduser().resolve()
    output_path = Path(args.mp4).expanduser().resolve()
    frames_dir = Path(args.frames_dir).expanduser().resolve() if args.frames_dir else output_path.parent / "frames"

    if not html_path.exists():
        print(f"ERROR: HTML file not found: {html_path}", file=sys.stderr)
        return 2
    if args.seconds_per_slide <= 0:
        print("ERROR: --seconds-per-slide must be greater than 0", file=sys.stderr)
        return 2

    try:
        slide_count = capture_frames(html_path, frames_dir)
        build_video(frames_dir, output_path, args.seconds_per_slide)
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1

    print(f"Exported {slide_count} slides to video: {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

```


# File: `scripts/extract_pptx.py`

```python
#!/usr/bin/env python3
"""Extract a PPTX into outline.md, manifest.json, and media files.

Usage:
    python extract_pptx.py source.pptx extracted/
"""
from __future__ import annotations

import argparse
import json
import shutil
import sys
import zipfile
from pathlib import Path
from typing import Any
from xml.etree import ElementTree as ET

NS = {
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
}


def text_from_slide_xml(xml_bytes: bytes) -> list[str]:
    root = ET.fromstring(xml_bytes)
    texts: list[str] = []
    for t in root.findall(".//a:t", NS):
        if t.text and t.text.strip():
            texts.append(t.text.strip())
    return texts


def safe_extract_media(zf: zipfile.ZipFile, out_dir: Path) -> list[dict[str, Any]]:
    media_dir = out_dir / "media"
    media_dir.mkdir(parents=True, exist_ok=True)
    media: list[dict[str, Any]] = []
    for name in zf.namelist():
        if not name.startswith("ppt/media/") or name.endswith("/"):
            continue
        src_name = Path(name).name
        dest = media_dir / src_name
        with zf.open(name) as source, dest.open("wb") as target:
            shutil.copyfileobj(source, target)
        media.append({"source": name, "file": str(dest.relative_to(out_dir)), "bytes": dest.stat().st_size})
    return media


def extract_with_zip(source: Path, out_dir: Path) -> dict[str, Any]:
    out_dir.mkdir(parents=True, exist_ok=True)
    slides: list[dict[str, Any]] = []
    with zipfile.ZipFile(source) as zf:
        slide_names = sorted(
            [n for n in zf.namelist() if n.startswith("ppt/slides/slide") and n.endswith(".xml")],
            key=lambda n: int(Path(n).stem.replace("slide", "")) if Path(n).stem.replace("slide", "").isdigit() else 9999,
        )
        for index, slide_name in enumerate(slide_names, 1):
            text = text_from_slide_xml(zf.read(slide_name))
            slides.append({"index": index, "source": slide_name, "text": text})
        media = safe_extract_media(zf, out_dir)
    return {"source": str(source), "slide_count": len(slides), "slides": slides, "media": media}


def write_outputs(manifest: dict[str, Any], out_dir: Path) -> None:
    manifest_path = out_dir / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")

    lines: list[str] = [f"# Extracted PPTX Outline", "", f"Source: `{manifest['source']}`", "", f"Slides: {manifest['slide_count']}", ""]
    for slide in manifest["slides"]:
        lines.append(f"## Slide {slide['index']}")
        lines.append("")
        if slide["text"]:
            for item in slide["text"]:
                lines.append(f"- {item}")
        else:
            lines.append("- [No text extracted]")
        lines.append("")
    if manifest.get("media"):
        lines.extend(["## Media", ""])
        for item in manifest["media"]:
            lines.append(f"- `{item['file']}` ({item['bytes']} bytes)")
        lines.append("")
    (out_dir / "outline.md").write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Extract text and media from a PPTX file.")
    parser.add_argument("pptx", help="Input .pptx file")
    parser.add_argument("out_dir", help="Output directory")
    args = parser.parse_args()

    source = Path(args.pptx).expanduser().resolve()
    out_dir = Path(args.out_dir).expanduser().resolve()

    if not source.exists():
        print(f"ERROR: PPTX file not found: {source}", file=sys.stderr)
        return 2
    if source.suffix.lower() != ".pptx":
        print(f"ERROR: input is not a .pptx file: {source}", file=sys.stderr)
        return 2

    try:
        manifest = extract_with_zip(source, out_dir)
        write_outputs(manifest, out_dir)
    except Exception as exc:
        print(f"ERROR: failed to extract PPTX: {exc}", file=sys.stderr)
        return 1

    print(f"Extracted {manifest['slide_count']} slides to: {out_dir}")
    print(f"Outline: {out_dir / 'outline.md'}")
    print(f"Manifest: {out_dir / 'manifest.json'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

```


# File: `scripts/publish_preview.py`

```python
#!/usr/bin/env python3
"""Publish/serve a Beautiful Presentations HTML deck for URL-based review.

This helper does not upload anywhere. It copies the deck into a preview directory and prints
an HTTP URL if a base URL is configured. If no public base URL is configured, it prints the
local path plus setup instructions.

Environment variables:
  HERMES_PRESENTATION_PREVIEW_ROOT=/var/www/presentations
  HERMES_PRESENTATION_PREVIEW_BASE_URL=https://deck-preview.example.com

Usage:
  python publish_preview.py deck.html --slug project-name
"""
from __future__ import annotations

import argparse
import re
import shutil
import sys
import time
from pathlib import Path
from urllib.parse import quote


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-+", "-", value).strip("-")
    return value or "deck"


def main() -> int:
    parser = argparse.ArgumentParser(description="Publish an HTML deck into a preview directory and print its review URL.")
    parser.add_argument("html", help="Input deck.html")
    parser.add_argument("--slug", help="URL-safe project/deck slug")
    parser.add_argument("--root", help="Preview root directory. Defaults to HERMES_PRESENTATION_PREVIEW_ROOT or ~/.hermes/cache/presentation-previews")
    parser.add_argument("--base-url", help="Public base URL. Defaults to HERMES_PRESENTATION_PREVIEW_BASE_URL")
    args = parser.parse_args()

    html_path = Path(args.html).expanduser().resolve()
    if not html_path.exists() or html_path.suffix.lower() not in {".html", ".htm"}:
        print(f"ERROR: input must be an existing HTML file: {html_path}", file=sys.stderr)
        return 2

    import os
    root = Path(args.root or os.getenv("HERMES_PRESENTATION_PREVIEW_ROOT", "~/.hermes/cache/presentation-previews")).expanduser().resolve()
    base_url = (args.base_url or os.getenv("HERMES_PRESENTATION_PREVIEW_BASE_URL", "")).rstrip("/")

    slug = slugify(args.slug or html_path.stem)
    stamp = time.strftime("%Y%m%d-%H%M%S")
    dest_dir = root / slug / stamp
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / "index.html"
    shutil.copy2(html_path, dest)

    print(f"published_path={dest}")
    if base_url:
        url = f"{base_url}/{quote(slug)}/{stamp}/"
        print(f"preview_url={url}")
    else:
        print("preview_url=")
        print("note=No public preview URL configured. Set HERMES_PRESENTATION_PREVIEW_ROOT and HERMES_PRESENTATION_PREVIEW_BASE_URL, or deploy this folder behind nginx/Caddy.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

```


# File: `references/animation-patterns.md`

```markdown
# Animation Patterns

Use motion as design discipline. It should clarify hierarchy and make the deck feel alive without hurting export.

## Default reveal

```css
.reveal {
  opacity: 0;
  transform: translateY(26px);
  filter: blur(8px);
  transition:
    opacity 700ms var(--ease-out),
    transform 700ms var(--ease-out),
    filter 700ms var(--ease-out);
}

.slide.visible .reveal {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

.slide.visible .reveal:nth-child(1) { transition-delay: 80ms; }
.slide.visible .reveal:nth-child(2) { transition-delay: 160ms; }
.slide.visible .reveal:nth-child(3) { transition-delay: 240ms; }
.slide.visible .reveal:nth-child(4) { transition-delay: 320ms; }
```

## Feeling map

### Cinematic / dramatic

- Slow fade and blur
- Spotlight gradients
- subtle atmospheric drift
- large title scale

### Technical / futuristic

- grid reveal
- line tracing
- small pulsing nodes
- mono labels

### Founder / sharp pitch

- fast 250–400ms fades
- clean slide-in
- no ornamental loops

### Editorial

- text cascade
- image/text interplay
- subtle page-like movement

### Playful / game

- snappier easing
- card pops
- controlled bounce

## Background texture

Use subtle texture to avoid flatness:

```css
.noise::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: .18;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E");
}
```

## Export warning

PDF export captures final visual state better than complex animations. Make sure every animated object has a clean visible final state.

Video export from screenshots will not capture motion unless animated capture is specifically implemented. Static slide MP4 is acceptable as MVP.

```


# File: `references/sakura-chroma-test-notes.md`

```markdown
# Sakura Chroma Deck Test Notes

Session-derived notes from building and QAing a 3-slide personal deck in the `sakura-chroma` gallery style.

## When user asks for a gallery style

1. Load `references/bold-template-gallery.md`.
2. Load the selected template's `design.md` before generating final slides.
3. Reuse the style system: palette, typography roles, component vocabulary, density, and layout logic.
4. Do not copy demo/template content. Use the user's real content.
5. Default deliverable stays the one-file HTML deck. PDF/video exports are optional downstream artifacts.

## Portable package clarity

A `.tar.gz` skill package is only for installing the skill on another Hermes profile/VPS/agent. It is not the deck deliverable.

When delivering a deck, prioritize:

- `MEDIA:/absolute/path/deck.html`
- optional `MEDIA:/absolute/path/deck.pdf` only if exported/asked/used for verification

Only send the skill `.tar.gz` when the user asks for portability, another VPS/profile, or reusable ecosystem install.

## CSS overflow pitfall: diagonal ribbons

Large rotated absolutely-positioned ribbon stacks can make `scrollWidth` / `scrollHeight` exceed the 1920×1080 slide even when `.slide { overflow: hidden; }` visually clips them. This creates false or real export QA failures.

Preferred fix:

- Render full-bleed diagonal ribbon bands as `.slide::before` linear-gradients on a `ribbon-left` / `ribbon-right` class.
- Keep decorative ribbon layers inside the slide box instead of using huge off-canvas rotated DOM elements.
- If using rotated DOM ribbons anyway, QA all slides with Playwright and patch until overflow is false.

## Screenshot QA timing

If slides use reveal animations, do not screenshot immediately after `window.deck.show(i)`. Wait for the animation duration plus buffer.

Known-good default:

```js
page.wait_for_timeout(700)
```

This prevents screenshots from capturing semi-transparent or still-moving content.

## Verification loop

For generated HTML decks:

1. Run static QA.
2. Run Playwright browser QA when available.
3. Capture screenshots for every slide.
4. Inspect screenshots visually for style fidelity, readability, clipping, hidden content, and hierarchy.
5. Patch until:
   - no console errors
   - `scrollWidth === clientWidth`
   - `scrollHeight === clientHeight`
   - all slide screenshots look complete after animation settle
6. Export PDF only when asked or when useful to validate print/export behavior.

```
