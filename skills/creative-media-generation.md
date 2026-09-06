# creative-media-generation — Portable Public Reader

Updated: 2026-09-06T01:06:50.139275+00:00

FAL image/video generation setup for Hermes profiles, prompting rules, media delivery.

## FIRST INSTRUCTION FOR ANY HERMES AGENT READING THIS


This Markdown reader is the bootstrap file. Install the full package (SKILL.md + references + scripts) with the command below, then start a fresh session or run `/reload-skills`.


```bash
set -euo pipefail
curl -fL https://larvuz2.github.io/skills/creative-media-generation-skill.tar.gz -o /tmp/creative-media-generation-skill.tar.gz
mkdir -p ~/.hermes/skills/creative
rm -rf ~/.hermes/skills/creative/creative-media-generation
tar -xzf /tmp/creative-media-generation-skill.tar.gz -C ~/.hermes/skills/creative
ls ~/.hermes/skills/creative/creative-media-generation/SKILL.md
```


## Simple user instruction

Paste this URL into a Hermes agent and say: `install this skill`.

```txt
https://larvuz2.github.io/skills/creative-media-generation.md
```

## Full package URL

```txt
https://larvuz2.github.io/skills/creative-media-generation-skill.tar.gz
```

---


# File: `SKILL.md`

```markdown
---
name: creative-media-generation
description: "Generate and manipulate creative media across AI image/video/audio tools, ComfyUI workflows, model-specific helpers, segmentation, and delivery packaging."
version: 1.0.0
author: Hermes Agent
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [creative, media, image-generation, comfyui, audio, segmentation]
---

# Creative Media Generation

Use this umbrella when a task asks for AI-generated or AI-assisted media: images, video/image workflows, audio/music/sound, ComfyUI pipelines, masks/segmentation, prompt iteration, provider delivery, or model/workflow setup.

## Workflow

1. Clarify the deliverable only when the output modality or constraints are genuinely ambiguous.
2. Choose the execution path:
   - Hermes `image_generate` / `video_generate` for quick user-facing generations.
   - ComfyUI when the task needs local workflows, nodes, model management, or repeatable JSON workflow execution.
   - AudioCraft/MusicGen-style tools for local audio/music generation.
   - segmentation/masking helpers when the image task needs object masks, cutouts, or region-specific editing.
3. Preserve references, prompts, seeds, provider/model names, and generated artifact paths in the final response.
4. Verify artifact existence or URL accessibility before claiming completion.

## References and absorbed playbooks

Detailed subsection summaries live under `references/<skill-name>.md`; complete original narrow packages were archived intact during umbrella consolidation and can be restored if their support files are needed. Session-specific patterns live in `references/`.

- `references/money-making-agent-marketplace-ui.md`: UI prompt pattern for Hermes/AI money-machine marketplaces with outcome-machine cards, cost/yield metrics, and verification notes.
- `references/gus-personal-site-static-blog-publishing.md`: Gus personal website static blog publishing pattern: `staticBlogPosts.ts`, `public/blog/<slug>.png`, local preview, production cache-bust verification, and push/rebase workflow.
- `references/gus-static-blog-post-publishing.md`: compact current pattern for publishing static blog posts to `/root/work/gus`: write post in `staticBlogPosts.ts`, store hero under `public/blog/`, add sitemap URL, build, local-check, push, and production-verify canonical route.
- `references/hermes-profile-fal-image-generation-setup.md`: Target-profile FAL image generation setup: copy `FAL_KEY`, add `image_gen` config/plugin blocks, restart gateway/new session, and verify with a real target-profile `image_generate` call.
- `references/article-tldraw-explainer-workflow.md`: Article/X essay to TLDraw-style infographic workflow: source fallback, deterministic HTML/SVG/CSS board, Playwright PNG render, vision QA, overflow patch loop.
- `references/perception-natural-pattern-image-prompts.md`: Gus-specific image direction for brain/nature/perception/weird-wonder visuals — prefer microscopic/macro natural pattern continuity over literal fantasy forests or human silhouettes.
- `ai-image-generation-workflows`: FAL/image-generation prompting, edits, logo/text pitfalls, media delivery.
- `comfyui`: ComfyUI install/launch/workflow execution, REST/WebSocket API, node/model troubleshooting, reusable scripts.
- `audiocraft-audio-generation`: local AudioCraft/MusicGen audio generation procedures.
- `segment-anything-model`: SAM object segmentation via points, boxes, masks.

## Text-heavy whiteboard / tldraw infographics

When Gus asks for an explanation of a term, concept, process, system, strategy, or workflow, proactively complement the text with a casual TLDraw/Excalidraw-style visual when it will make the idea easier to grasp. Do not make it feel like a formal extra deliverable; send it naturally alongside the answer. Choose detail level by topic: broad concept map for strategic/simple questions, detailed flow diagram for process/system/workflow questions.

When the user asks for a clean tldraw-style plan, schedule, workout card, checklist, or other text-heavy image:

1. Use a white background, hand-drawn/excalidraw/tldraw-style boxes, minimal pastel accents, and simple line icons.
2. Keep copy short and structured; image models handle concise bullets better than dense paragraphs.
3. Put the exact hierarchy in the prompt: title, subtitle, layout, cards/sections, bottom notes.
4. Explicitly request readable high-contrast typography and no UI/logos/clutter.
5. After generation, verify visual legibility before delivery. If text is gibberish or crowded, regenerate with fewer words and larger sections.

See `references/tldraw-plan-infographics.md` for a reusable prompt structure.

## Browser-native creative coding prototypes

When turning a creative prompt into a small Vite/React/Canvas/Web MIDI prototype:

1. Build the working artifact, not just a prompt/spec: scaffold files, install dependencies, and run `npm run build`.
2. Include live-performance fallbacks: Web MIDI where available, keyboard controls for non-MIDI verification, and a clean capture/hide-UI mode.
3. For canvas clips, add a `canvas.captureStream()` + `MediaRecorder` export button when the brief asks for a 20–30 second capture; this avoids requiring external screen-recording setup for first review.
4. Verify in-browser behavior with the browser tool: load the local Vite server, press a few fallback keys, inspect console errors, and visually confirm the canvas renders the intended aesthetic before reporting completion.
5. Keep the first prototype scoped to the visual mechanic and constraints; avoid adding dashboards, unrelated 3D rooms, UI labels, or extra systems that flatten the concept.

## Blog / website hero image workflow

When Gus asks to generate an image for an existing article/blog post and add it to the site:

1. Generate a visually explanatory hero image, not just decoration. For concept/strategy posts, prefer clean editorial diagrams, dashboard metaphors, or tldraw-style system maps that make the thesis easier to understand.
2. Inspect the generated image with `vision_analyze` before using it. Check: concept fit, legibility, no broken/watermark text, no unwanted logos, no distracting mascots unless requested.
3. Store the asset in the website repo under a stable public path such as `public/blog/<slug>.png` or `public/blog/<slug>.webp`.
4. Wire the post data to the asset path. On Gus’s site this may mean updating `src/data/staticBlogPosts.ts` `image_url` for static posts; inspect the post renderer/data source first instead of guessing.
5. Build locally, run the site locally, open the exact blog URL, and verify the hero image appears with a nonzero natural size.
6. Push to the live site repo and wait for deployment. Then open the canonical `gusgarza.com` URL in browser, check the image source/natural dimensions, and inspect console errors before reporting done.

## Cross-profile image generation setup

When Gus asks to make another Hermes profile generate images with the same FAL/GPT-image behavior, do not stop at writing usage rules into that profile's skill. Configure the target profile runtime too: `.env` must contain `FAL_KEY`, `config.yaml` must include the `image_gen` provider/model/plugin block, the gateway/session must restart, and success must be verified by running a real image generation from that target profile. See `references/hermes-profile-fal-image-generation-setup.md` for the exact checklist.

## Quality checks

- For files: `test -s <path>` or inspect metadata before delivery.
- For generated visuals: review with `vision_analyze` when visual correctness matters, especially text-heavy images.
- For website/blog hero images: verify both local render and live canonical URL; include image path, commit SHA, build result, deployment state, and browser verification in the final report.
- For browser-native creative prototypes: verify both build output and live browser render/console state; include the repo/path/commit and commands run in the final report.
- For ComfyUI: health-check the server, validate workflow JSON integrity, and monitor queued jobs rather than assuming success.
- For provider APIs: report real returned URLs/paths and any rate-limit/provider failure honestly.

```

---


# File: `references/absorbed/INDEX.md`

```markdown
# Absorbed skill packages for `creative-media-generation`

Each subdirectory is a preserved package copied before archival. Use the umbrella SKILL.md as the entry point.

- `ai-image-generation-workflows/` — copied from `creative/ai-image-generation-workflows`

- `comfyui/` — copied from `creative/comfyui`

- `audiocraft-audio-generation/` — copied from `mlops/models/audiocraft`

- `segment-anything-model/` — copied from `mlops/models/segment-anything`

```

---


# File: `references/absorbed/ai-image-generation-workflows/ABSORBED_BY.md`

```markdown
# Absorbed package

Original top-level skill `ai-image-generation-workflows` was consolidated into umbrella `creative-media-generation`. This directory preserves the complete package contents for reference after archival.

```

---


# File: `references/absorbed/ai-image-generation-workflows/SKILL.md`

```markdown
---
name: ai-image-generation-workflows
description: Generate, edit, and deliver AI images for creative/technical work, including FAL image generations, reference-based edits, cinematic prompt crafting, tldraw-style explainers, and chat-native media delivery.
version: 1.0.0
author: Hermes Agent
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [image-generation, fal, creative-direction, tldraw, delivery]
    created_by: agent
---

# AI Image Generation Workflows

Use this skill when Gus asks to generate, edit, improve, or deliver AI images, especially via FAL or for cinematic / diagrammatic / tldraw-style visuals.

## Core workflow

1. **Infer the image goal fast.** If the request is clear, do not ask follow-up questions.
2. **Write the prompt with production direction.** Include subject hierarchy, composition, style, lighting, camera/framing, constraints, and negative instructions.
3. **Call the image generation/edit tool.** Use the configured provider; do not invent model names or fake outputs.
4. **Deliver the actual generated asset into chat.** For FAL-generated images, download the returned image URL to a local file and respond with `MEDIA:/absolute/path/to/file` so Telegram saves it as a photo/media item. Do not send URL-only delivery unless Gus explicitly asks for a link.
5. **Keep the final reply minimal.** Usually: `Done.` plus the `MEDIA:` attachment. Avoid extra explanation unless the user asked for prompt details.

## Gus-specific delivery rule

- FAL image generations must be delivered as actual chat media/photos, not just markdown image links or bare URLs.
- If the tool returns only a URL, download it first, save it under `/tmp/` or a relevant project folder, then include `MEDIA:/path/to/image.png` in the final response.

## Text and logo generation rule

When Gus asks for image generation containing readable text, typography, wordmarks, or logos, route to the GPT/GPT-2 image workflow/model when available instead of the default image workflow. Text accuracy is the priority.

For logo/wordmark explorations:

- If Gus asks for the whole word/name, do **not** make initials, monograms, isolated letters, or separate icons unless he asks for them.
- Repeat the exact required spelling in the prompt as a hard constraint.
- For personal-brand wordmarks like `gusgarza`, specify lowercase, one word, no spaces, no accents, no alternate spelling, no extra captions.
- If he requests a grid, obey the exact grid and aspect ratio, e.g. `4 columns x 3 rows`, `landscape 16:9`.
- Favor modern minimalist, premium, clean typography over decorative logo marks.

See `references/text-logo-prompting.md` for reusable prompt patterns and pitfalls.

## Tldraw / whiteboard explainer images

For requests like “same style,” “tldraw,” “whiteboard,” “explain this visually,” or “diagram style”:

- Use 16:9 landscape by default unless specified otherwise.
- Ask for clean hand-drawn rounded boxes, arrows, sticky notes, black marker outlines, pastel fills, and white background.
- Keep text large and legible; avoid tiny labels.
- Structure the image as a clear system map: title, central idea, layers, arrows, comparison boxes, formula sticky note when useful.
- Avoid corporate infographic, 3D render, logos, photorealism, glossy UI, and dense unreadable text.

See `references/fal-media-delivery.md` for the exact FAL media delivery pattern and a reusable tldraw explainer prompt checklist.

## Verification

Before finalizing:

- Confirm the image tool returned success.
- If the result is a URL and the platform is Telegram, download the image to a local file.
- Ensure the final response includes `MEDIA:/absolute/path` for the image file.
- Do not claim delivery succeeded if the download failed; report the blocker and provide the URL as fallback only if necessary.

```

---


# File: `references/absorbed/ai-image-generation-workflows/references/fal-media-delivery.md`

```markdown
# FAL Media Delivery Pattern

Session signal: Gus explicitly corrected FAL image delivery. He wants generated images delivered as actual Telegram media/photos so they are saved in chat, not as URL-only markdown links.

## Pattern

1. Call `image_generate` or the relevant FAL-backed image/edit tool.
2. If the tool returns an HTTPS URL, download the file to a local path:

```bash
python - <<'PY'
import urllib.request
url = 'https://...returned-image.png'
out = '/tmp/descriptive-image-name.png'
urllib.request.urlretrieve(url, out)
print(out)
PY
```

3. Final response should include:

```text
Done.

MEDIA:/tmp/descriptive-image-name.png
```

This makes Telegram upload it as native media/photo.

## Avoid

- Do not send only `![image](url)` for FAL outputs unless Gus asks for link-only delivery.
- Do not paste only the raw FAL URL.
- Do not over-explain the prompt in the final reply unless requested.

## Tldraw explainer checklist

When Gus asks for a tldraw-style explainer image:

- 16:9 landscape.
- White background.
- Hand-drawn marker lines.
- Rounded boxes, arrows, sticky notes.
- Pastel fills by semantic category.
- Big readable text.
- Central loop/system map when explaining architecture.
- Include a concise formula sticky note if helpful.
- Negative constraints: no 3D, no logos, no corporate infographic, no tiny unreadable text, no photorealistic rendering.

## Example final delivery

```text
Done.

MEDIA:/tmp/hermes-secret-sauce-tldraw.png
```

```

---


# File: `references/absorbed/ai-image-generation-workflows/references/text-logo-prompting.md`

```markdown
# Text / Logo Prompting Notes for Gus

Use this reference when Gus asks for logos, wordmarks, posters, interface labels, titles, or any image where readable text matters.

## Core rule

Use the GPT/GPT-2 image workflow/model when available. Default image models often produce attractive visuals but weak typography. For text/logo work, legibility and exact spelling beat visual richness.

## Prompt structure

1. State the output type clearly: `wordmark exploration board`, `logo grid`, `typography sheet`, etc.
2. Put the text rule near the top:
   - `Every visible word must read exactly: gusgarza`
   - `lowercase only, one word, no spaces, no accents, no alternate spelling`
3. If the user wants the full word, explicitly ban initials:
   - `Do not make initials, monograms, isolated letters, or separate icons.`
   - `Every concept must use the full word.`
4. Lock the layout:
   - `4 columns x 3 rows, 12 total concepts`
   - `landscape 16:9 widescreen canvas`
5. Define taste:
   - `modern minimalist, premium, clean typography, strong negative space`
   - `flat vector, black/charcoal, warm off-white background`
6. Add negatives:
   - `no extra captions, no watermark, no 3D, no mockups, no shadows, no gradients, no illegible small text, no misspellings`

## Reusable prompt skeleton

```text
Widescreen wordmark exploration board for the personal brand [EXACT_NAME].

CRITICAL TEXT RULE: Every design must use the full word exactly: [EXACT_NAME]. [case rule]. One word. No spaces. No accents. No alternate spelling. No extra words. Do not make initials, monograms, isolated letters, or separate icons.

Layout: [COLUMNS] columns x [ROWS] rows grid, [TOTAL] total concepts, landscape 16:9 canvas, warm off-white background, generous spacing. Each cell contains one full-word logo reading exactly “[EXACT_NAME]”.

Design direction: top-notch modern minimalist wordmarks, elegant personal brand, creative technologist / cinematic founder / design studio energy. Simple but premium. Custom typography, refined spacing, subtle cuts, clean lowercase geometry, quiet confidence.

Visual rules: flat vector only, black/charcoal ink, warm gray, optional muted copper accent. Lots of whitespace. Crisp typography. Balanced proportions. No icons separate from the word. No initials. No 3D. No mockups. No gradients. No shadows. No texture. No captions. No watermark. No illegible micro text. No misspellings.
```

## Pitfalls from session

- A grid of logo examples can drift into `GG` monograms even when Gus wants the full word. Ban initials explicitly.
- Text/logo requests should not be treated like normal image generation. Model choice matters.
- If Gus says “again,” preserve the corrected constraints from the prior failed attempt and strengthen them, instead of just making the style adjectives stronger.

```

---


# File: `references/article-tldraw-explainer-workflow.md`

```markdown
# Article → TLDraw-style explainer workflow

Use when Gus asks for a TLDraw/Excalidraw-style image explaining an article, X article, LinkedIn post, essay, or long argument.

## Pattern from session

1. **Resolve the source first.** If an X API/MCP call fails or the X post points to an inaccessible article, search by tweet ID/title/author and use accessible mirrors or canonical reposts such as LinkedIn/article pages. Do not fabricate the article content.
2. **Extract the argument into a visual hierarchy:**
   - title / thesis
   - why now
   - upside
   - risks
   - proposed mechanism
   - step-by-step process
   - tension / open question
   - bottom-line interpretation
3. **Prefer deterministic HTML/SVG/CSS for text-heavy TLDraw-style explainers** instead of direct image generation. This preserves readable text and allows precise patching.
4. **Render to PNG with Playwright** when browser file navigation is blocked:
   - create `/root/artifacts/<slug>.html`
   - use Playwright `page.goto(Path(...).as_uri())`
   - set a large viewport matching the board size
   - `page.screenshot(path=..., full_page=True)`
5. **Always visually verify and patch.** Use vision inspection to check for overlap, cropped text, too-small text, or weak hierarchy. Patch the HTML and rerender until good enough.
6. **Keep final delivery simple:** send the PNG as `MEDIA:/absolute/path.png` and mention it was verified.

## Design notes

- White background, thick hand-drawn black borders, pastel cards, subtle shadows, big readable type.
- Use short text per card; long article nuance belongs in the layout, not dense paragraphs.
- For complex governance/strategy articles, a strong board shape is:
  `left = context/upside/risks`, `center = proposed answer`, `right = institution/political design`, `bottom = process + deep read`.
- If text overflows in step cards, shorten the words rather than shrinking the whole board.

## Pitfalls

- Direct image generation often mangles text; use deterministic rendering for text-heavy explainers.
- Do not stop after one render. Text overflow is common. Inspect, patch, rerender.
- If the original social URL is inaccessible, state/follow the fallback source internally, but do not clutter the final delivery unless provenance matters.
```

---


# File: `references/audiocraft-audio-generation.md`

```markdown
# audiocraft-audio-generation

Absorbed into `creative-media-generation` during the 2026-06-19 umbrella consolidation pass.

Original description: AudioCraft: MusicGen text-to-music, AudioGen text-to-sound.

The complete original skill package, including any support files and relative links, was archived intact at:

`.archive/curator-umbrella-20260619/creative-media-generation/audiocraft-audio-generation`

Package inventory before archive: references/ (2 files).

Use the parent umbrella workflow first. Restore or inspect the archived package only when this subsection's detailed provider/tool-specific recipes are needed.

```

---


# File: `references/comfyui.md`

```markdown
# comfyui

Absorbed into `creative-media-generation` during the 2026-06-19 umbrella consolidation pass.

Original description: Generate images, video, and audio with ComfyUI — install, launch, manage nodes/models, run workflows with parameter injection. Uses the official comfy-cli for lifecycle and direct REST/WebSocket API for execution.

The complete original skill package, including any support files and relative links, was archived intact at:

`.archive/curator-umbrella-20260619/creative-media-generation/comfyui`

Package inventory before archive: references/ (4 files), scripts/ (11 files).

Use the parent umbrella workflow first. Restore or inspect the archived package only when this subsection's detailed provider/tool-specific recipes are needed.

```

---


# File: `references/gus-personal-site-static-blog-publishing.md`

```markdown
# Gus personal site static blog publishing

Use when adding a generated blog post to Gus's personal website.

Observed repo/pattern:
- Repo: `/root/work/gus`
- Static blog source: `src/data/staticBlogPosts.ts`
- Static images: `public/blog/<slug>.png`
- Route: `/blog/:id`; static posts resolve by `id` or `slug`.
- Homepage writing section reads `staticBlogPosts` first and shows the newest entries before remote Supabase duplicates.

Workflow:
1. Inspect `src/data/staticBlogPosts.ts` and `src/pages/BlogPost.tsx` before editing; do not assume schema.
2. Generate or choose a hero image when the post benefits from it. For concept essays, prefer clean TLDraw/scientific whiteboard diagrams over decorative art.
3. Download the image into `public/blog/<slug>.png`; verify with `test -s` and `file`.
4. Insert the post near the top of `staticBlogPosts` with stable `id`, `slug`, `title`, `image_url`, `published: true`, timestamps, metadata, and full `content` as a template literal.
5. Run `npm run build`.
6. Run a local preview (`npm run preview -- --host 127.0.0.1 --port 4173`) and open `/blog/<slug>` in browser.
7. Verify with DOM/console checks: title, H1, hero `naturalWidth > 0`, a distinctive body sentence, and no JS errors.
8. Commit and push. If push is rejected because remote moved, `git pull --rebase origin main`, rebuild, then push.
9. Production can briefly serve the previous asset bundle. Check the live HTML references the new `assets/index-*.js` or includes the slug; if not, wait/retry. Use a cache-busting query like `/blog/<slug>?verify=<sha>` for browser verification.
10. Final report should include live URL, build result, commit SHA, and production verification.

Pitfalls:
- Do not stop at committing; verify production actually serves the post.
- Do not harden transient deployment lag into a tool failure. The useful pattern is wait/retry and cache-bust.
- If the writing request was corrected toward “more scientific,” depersonalize the post before publishing; avoid making it mainly about Gus's own projects.

```

---


# File: `references/gus-static-blog-post-publishing.md`

```markdown
# Gus static blog post publishing pattern

Use when Gus asks to create/publish a blog post on his website from a current conversation or concept.

## Repo and data path

- Website repo: `/root/work/gus`
- Static posts live in `src/data/staticBlogPosts.ts`
- Blog hero images should live under `public/blog/<slug>.png`
- The canonical route is usually `https://gusgarza.com/blog/<slug>`
- Add blog routes to `public/sitemap.xml` when publishing durable static posts.

## Workflow

1. Shape the post in Gus/Larvuz voice: direct, founder/creative-technical, no corporate padding.
2. Generate or choose a blog hero that explains the thesis visually, not just decoration.
3. Inspect the hero image before committing it. Check for clear concept, readable main labels, no broken text/watermarks/logos.
4. Download/store the asset at `public/blog/<slug>.png`.
5. Add a new `staticBlogPosts` entry near the top of `src/data/staticBlogPosts.ts` so it appears first in Writing/Browse.
6. Use stable fields: `id`, `slug`, `title`, `image_url`, `published`, `created_at`, `updated_at`, `metadata`, `content`.
7. Run `npm run build`.
8. Preview locally and verify:
   - route loads
   - `h1` matches
   - hero `img` resolves with real dimensions or is visually visible
   - `.blog-content` contains the expected ending text
   - no console errors
9. Commit and push to `main`.
10. Production-verify on the clean canonical URL. If Netlify/browser cache shows old JS or “Post not found,” retry with a cache-busting query once, then reload the clean URL.
11. Use browser vision if DOM image dimensions look stale but the image URL is reachable; visual confirmation is the final check.

## Pitfalls

- Do not stop after adding text locally. Gus expects the live website pushed and verified.
- Do not leave the hero image remote-only; store it in the repo under `public/blog/`.
- Do not rely only on DOM `naturalWidth` during cache/transient reload states. Also check the asset URL with HTTP/file metadata and inspect visually.
- The blog article body uses the site’s dark background and white text; if screenshots look partly white, scroll/inspect actual content before assuming a rendering bug.

## Example post thesis from session

Creative Partner positioning:

- Not an OS publicly; “OS” sounds too technical.
- The system leads; the user steers.
- AI has agency without authority.
- The human is the creative director, not the operator.
- Entertainment at the front, workspace underneath.
- Taste becomes memory; worlds become projects.

```

---


# File: `references/hermes-profile-fal-image-generation-setup.md`

```markdown
# Hermes profile FAL image-generation setup

Use when Gus asks to make another Hermes profile (for example `agentespro-hq`) generate images with the same FAL / GPT-image / Nano Banana Pro behavior as the current Larvuz profile.

## Lesson

Do not only add prompting rules to a skill. If the profile says `FAL_KEY environment variable is not set`, the runtime itself is missing provider configuration/credentials. Fix the profile environment and config, then verify with a real `image_generate` call from that profile.

## Setup checklist

1. Check the source/default profile has a FAL key in its `.env` without printing the value.
2. Copy the key into the target profile `.env` as `FAL_KEY=<secret>`.
3. Ensure the target profile `config.yaml` includes the image generation provider block:

```yaml
image_gen:
  model: fal-ai/nano-banana-pro
  use_gateway: false
  text_model: fal-ai/gpt-image-2
  route_text_requests: true
  provider: fal
plugins:
  enabled:
  - image_gen/fal
  - video_gen/fal
  disabled: []
video_gen:
  provider: fal
  fal:
    model: pixverse-v6
  model: pixverse-v6
```

4. Restart the target gateway/profile so env/config changes load. If running from inside a gateway and direct restart is blocked, schedule a detached restart from a separate process, then verify service activity.
5. Verify with a real target-profile one-shot:

```bash
hermes --profile <profile-name> chat -q "Generate one simple test image using the image_generate tool. Reply only with the generated image URL/path and provider if available." --toolsets image_gen,vision --quiet
```

6. Only report success after the command returns a real image URL/path and provider.

## Pitfall

A skill rule like “use `image_generate`” is not enough. The target profile needs `FAL_KEY`, `image_gen` config, plugin enablement, gateway restart/new session, and a real generation test.
```

---


# File: `references/money-making-agent-marketplace-ui.md`

```markdown
# Money-Making Agent Marketplace Visual Prompts

Use this when Gus asks for UI images around agents that make money, agent marketplaces, or “money machines.”

## Stronger concept frame

Avoid generic “lead generation” cards unless Gus explicitly asks. The sharper frame is outcome machines: agents that directly create, collect, recover, negotiate, sell, license, build, or compound revenue.

Useful card names:

- Deal Taker — monitors marketplaces and claims profitable arbitrage opportunities.
- Offer Machine — turns existing skills, files, workflows, templates, or media into small paid offers.
- Upsell Engine — expands current clients into higher-value packages.
- Invoice Collector — follows up, negotiates, and recovers unpaid invoices.
- Price Raiser — detects underpriced services and rewrites them into premium tiers.
- Asset Licenser — packages unused media, prompts, loops, templates, characters, or IP for licensing.
- Micro-SaaS Builder — turns repeated workflows into tiny paid tools.
- Sponsorship Closer — packages projects, audiences, communities, or IP into sponsor-ready deals.

## Metrics to show on UI cards

- Money Action
- Estimated Cost / Est. Cost
- Time to First Dollar
- Expected Monthly Yield
- Human Approval
- Automation Level
- Risk
- ROI Estimate
- Best Margin
- Does it deserve more fuel?

Example values:

- Est. Cost: `$3–$45/run`
- Time to First Dollar: `2h`, `24h`, `3 days`, `7 days`
- Expected Monthly Yield: `$300–$2k`, `$1k–$8k`, `$5k–$25k`
- Human Approval: `Required`, `Optional`, `Auto`
- Automation Level: `72%`, `88%`, `94%`
- Risk: `Low`, `Medium`

## Visual direction

Use a premium SaaS / AI command center aesthetic:

- Clean white editorial dashboard.
- Dark navy glass panels as accents, not heavy dark mode.
- Electric green for revenue.
- Blue for automation.
- Small amber risk chips.
- Dense but elegant.
- Shopify App Store + Bloomberg terminal + AI operating system.

Avoid:

- Cartoon mascots.
- Fake 3D characters.
- Generic “AI assistant” cards.
- Lead-gen-heavy positioning when Gus asks for money machines.
- Logo/watermark clutter.

## Verification

After generating, inspect the image with vision when visual correctness matters. Specifically check whether the UI reads as a marketplace dashboard, whether the agent cards are visible, and whether text labels/metrics are at least partially legible.

```

---


# File: `references/perception-natural-pattern-image-prompts.md`

```markdown
# Perception / Nature / Microscopic-Macro Pattern Image Direction

Use when Gus asks for visuals around brain, nature, perception, weird wonder, neuroaesthetics, hidden systems, or natural pattern intelligence.

## Session lesson

A first-pass cinematic forest/neural scene with a human silhouette felt too literal/fantasy. Gus preferred the later direction when it became:

- more microscopic;
- more macro-natural-pattern;
- more intrinsic and interwoven;
- less scene, more hidden grammar of nature across scales.

## Strong direction

Frame the image as **scale ambiguity**: impossible to tell whether it is a microscope slide, satellite image, organism, neural tissue, river delta, fungal web, coral, ice fracture, or cosmic structure.

Use motifs like:

- cellular membranes;
- mycelium threads;
- neural/capillary branching;
- leaf venation;
- coral growth;
- lichen/mineral surfaces;
- pollen/spores;
- river deltas;
- ice fractures;
- tree rings;
- wave interference;
- turbulence and growth fronts.

The key thesis: **one hidden natural pattern repeating across scales.**

## Visual language

Prefer:

- extreme macro / microscope perspective;
- tactile wet/mineral/organic surfaces;
- translucent layered membranes;
- fine interwoven filaments;
- soft internal glow;
- muted moss green, teal, indigo, amber-gold, pearlescent whites, rust/mineral accents;
- dense but elegant composition;
- quiet awe / soft fascination.

Avoid:

- human silhouettes;
- literal forests;
- glowing portals;
- obvious brain icons;
- skulls;
- clipart neurons;
- generic sci-fi/cyberpunk;
- mandala clichés;
- oversaturated neon;
- medical diagram aesthetics;
- fake spiritual symbolism.

## Reusable prompt core

```text
Create a sophisticated 16:9 art-science image about microscopic and macro natural patterns. No humans, no faces, no text, no logos, no UI.

Show a seamless scale-shift where cellular membranes become river deltas, mycelium becomes neural branching, leaf veins become coral growth, lichen becomes mineral crystal, pollen becomes stars, ice fractures become vascular networks, and tree rings become wave interference. Everything should feel like one hidden grammar of nature: self-similarity, branching, spirals, lattices, membranes, veins, filaments, pores, turbulence, growth fronts, and capillary flow.

Make it extreme macro / microscope-like, but with hints of landscapes inside the details. Dense but elegant. A woven diagonal flow crosses the frame, with nested pattern islands of crystalline geometry, fungal threads, plant veins, neural/capillary webs, soft cellular bubbles, eroded river channels, and tiny bioluminescent spores. Soft depth-of-field, tactile wet mineral surfaces, translucent layers, quiet internal glow.

Palette: deep moss green, muted teal, dark indigo, amber-gold bioelectric accents, pearlescent membrane whites, subtle rust and mineral tones. Mature, strange, beautiful, scientific wonder. Avoid literal forests, human silhouettes, portals, cyberpunk, cheap fractal art, medical diagrams, and obvious spiritual symbols. It should be impossible to tell whether this is a microscope slide, satellite image, living organism, or universe.
```

```

---


# File: `references/segment-anything-model.md`

```markdown
# segment-anything-model

Absorbed into `creative-media-generation` during the 2026-06-19 umbrella consolidation pass.

Original description: SAM: zero-shot image segmentation via points, boxes, masks.

The complete original skill package, including any support files and relative links, was archived intact at:

`.archive/curator-umbrella-20260619/creative-media-generation/segment-anything-model`

Package inventory before archive: references/ (2 files).

Use the parent umbrella workflow first. Restore or inspect the archived package only when this subsection's detailed provider/tool-specific recipes are needed.

```

---


# File: `references/tldraw-plan-infographics.md`

```markdown
# tldraw-style plan infographic prompt pattern

Use when generating a clean visual plan, weekly schedule, checklist, or routine card in a tldraw / excalidraw whiteboard style.

## Prompt structure

```text
Create a clean full-page [topic] infographic in the style of a hand-drawn tldraw whiteboard.
Pure white background, simple black sketch lines, subtle pastel accent blocks, neat handwritten-looking labels, clean spacing, minimal line icons.
No logos, no UI, no clutter.

Title at top: [TITLE]
Subtitle: [short useful framing]

Layout: [number] cards/sections, organized like a clean tldraw board.
Each card has a small icon and concise bullet list.

[SECTION 1]
[short bullets]

[SECTION 2]
[short bullets]

Bottom small section: [daily notes / totals / supplements]
[short bullets]

Make the typography readable, high contrast, balanced, clean, tldraw/excalidraw-style imperfect hand-drawn boxes and arrows, white background.
```

## Legibility rules

- Prefer portrait for full weekly plans.
- Use short bullets, not paragraphs.
- Avoid too much text per card.
- Ask for exact title/subtitle/section labels.
- Validate the generated image before delivery; if text is broken, regenerate with fewer words.

## Common fit for Gus

- Weekly health plans.
- Simple AI system diagrams.
- Founder operating maps.
- Creative-tech workflow explainers.
- White-background deck-ready diagrams.

```

---

