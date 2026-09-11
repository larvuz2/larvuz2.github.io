---
name: hyperframes-video-rendering
description: Create deterministic MP4 videos from HTML.
version: 0.1.0
author: Hermes
metadata:
  hermes:
    tags: [Video, HTML, Rendering, Agents]
---

# HyperFrames Video Rendering

Use this skill to create, preview, and render deterministic MP4 videos from HTML, CSS, media, and seekable animations with HyperFrames. It does not replace video editing judgment, source asset selection, or final creative direction. Dependency stance: requires Node.js 22+ and FFmpeg; use HyperFrames agent skills before writing compositions when possible.

## When to Use

- The user asks to create, edit, animate, preview, or render a video from HTML.
- The user wants an agent-built product intro, explainer, motion graphic, website video, PR video, captioned clip, talking-head recut, slideshow, or music-synced video.
- The user needs deterministic MP4 output suitable for CI, batch rendering, or automated video pipelines.
- The user mentions HyperFrames, `/hyperframes`, `npx hyperframes`, or “Write HTML. Render video.”

## Prerequisites

- Node.js 22+.
- FFmpeg for local MP4 encoding.
- Optional but recommended: install the HyperFrames skill catalog into the working project before authoring.
- For GitHub PR videos, `gh` must be installed and authenticated because `/pr-to-video` reads PRs through the `gh` CLI.
- No API key is required for the basic local CLI workflow described here.

## How to Run

Invoke setup, preview, render, and verification commands through the `terminal` tool from the target project directory. Use `web_extract` on `https://hyperframes.heygen.com/llms.txt` first when you need the latest documentation index, then fetch the specific docs page.

## Quick Reference

```bash
npx skills add heygen-com/hyperframes
npx skills add heygen-com/hyperframes --all
npx skills add heygen-com/hyperframes --skill <name>
node --version
ffmpeg -version
npx hyperframes init my-video
cd my-video
npx hyperframes init my-video --non-interactive --example blank
npx hyperframes init my-video --example warm-grain --video ./intro.mp4
npx hyperframes preview
npx hyperframes render
npx hyperframes render --output output.mp4
npx hyperframes render --output demo.mp4
```

Core HyperFrames skills:

```text
/hyperframes
/hyperframes-core
/hyperframes-animation
/hyperframes-creative
/hyperframes-cli
/hyperframes-media
/hyperframes-registry
/general-video
```

Workflow skills:

```text
/product-launch-video
/website-to-video
/faceless-explainer
/pr-to-video
/embedded-captions
/talking-head-recut
/motion-graphics
/music-to-video
/slideshow
/remotion-to-hyperframes
```

## Procedure

1. Gather current docs if needed.

   Use `web_extract` on:

   ```text
   https://hyperframes.heygen.com/llms.txt
   https://hyperframes.heygen.com/quickstart
   https://hyperframes.heygen.com/guides/skills
   https://hyperframes.heygen.com/introduction
   ```

2. Verify the local prerequisites through the `terminal` tool.

   ```bash
   node --version
   ffmpeg -version
   ```

   Node must be `v22.0.0` or any version `>= 22`.

3. Install HyperFrames agent skills before writing compositions.

   ```bash
   npx skills add heygen-com/hyperframes
   ```

   Use the picker for a targeted install, or install every skill in one shot:

   ```bash
   npx skills add heygen-com/hyperframes --all
   ```

   To install one capability only, pass the bare name with no leading slash:

   ```bash
   npx skills add heygen-com/hyperframes --skill hyperframes-animation
   ```

4. Start with `/hyperframes` for any video request.

   Treat `/hyperframes` as the router and capability map. It routes “make me a video” requests to the right workflow and points to domain skills like `/hyperframes-core`, `/hyperframes-animation`, `/hyperframes-media`, and `/hyperframes-cli`.

5. Pick the workflow by input shape.

   - `/product-launch-video`: product marketing, launches, and promotions from a URL, brief, or script; sweet spot 30–90 seconds and supports up to about 3 minutes.
   - `/website-to-video`: site tours, portfolio showcases, landing-page videos, or social clips from website visuals.
   - `/faceless-explainer`: topic or concept explainer from arbitrary text with generated visual systems.
   - `/pr-to-video`: GitHub PR changelog, feature reveal, fix explanation, or refactor explainer.
   - `/motion-graphics`: short unnarrated design-led motion graphics under about 10 seconds.
   - `/music-to-video`: beat-synced visuals from a music track or video audio.
   - `/general-video`: fallback for longer, multi-scene, brand, sizzle, title-card, loop, or freeform compositions.

6. Scaffold a project through the `terminal` tool.

   ```bash
   npx hyperframes init my-video
   cd my-video
   ```

   For agent/CI-style startup without prompts:

   ```bash
   npx hyperframes init my-video --non-interactive --example blank
   ```

   If the user provides source footage:

   ```bash
   npx hyperframes init my-video --example warm-grain --video ./intro.mp4
   ```

7. Author the composition as HTML.

   HyperFrames uses standard HTML with `data-*` timing/layout metadata. Important attributes include:

   - `data-composition-id`
   - `data-start`
   - `data-duration`
   - `data-track-index`
   - `data-width`
   - `data-height`
   - `data-volume`

   Timed visual elements should follow the HyperFrames composition contract, including `class="clip"` where the skills require it.

8. Use seekable animation only.

   HyperFrames renders deterministically by seeking each frame. Prefer animation systems covered by `/hyperframes-animation`, including GSAP, Lottie, Three.js, Anime.js, CSS, WAAPI, TypeGPU, or a custom frame adapter. Avoid wall-clock-dependent animation.

9. Preview in the browser through the `terminal` tool.

   ```bash
   npx hyperframes preview
   ```

   This starts HyperFrames Studio/live browser preview and reloads edits to `index.html`.

10. Render the MP4 through the `terminal` tool.

    ```bash
    npx hyperframes render --output output.mp4
    ```

    HyperFrames loads the HTML in headless Chrome, seeks each frame, captures frames with Chrome `beginFrame`, and encodes with FFmpeg.

11. Iterate like a video editor.

    Ask for or apply concrete edit notes: bigger title, dark mode, fade-out, lower third at a specific timestamp, caption timing, sound level, or shot duration. Re-preview and re-render after material changes.

## Pitfalls

- Install HyperFrames skills before writing compositions; generic web docs miss `data-*` semantics, runtime-owned media playback, GSAP timeline registration, adapter registries, Tailwind v4 browser-runtime styles, captions, and voiceover patterns.
- If slash commands do not appear after installing skills, open a new agent session, run `/skills` in Copilot CLI, or restart the agent skill loader.
- Use bare skill names with `npx skills add heygen-com/hyperframes --skill <name>`; do not include the leading `/`.
- `/slideshow` creates a navigable deck with slides, reveals, branching, hotspots, and presenter mode; it is not a rendered video workflow by default.
- `/remotion-to-hyperframes` is one-way migration from existing Remotion React compositions to HyperFrames HTML, not a general new-video workflow.
- Local rendering depends on FFmpeg; preview may work while MP4 output fails if FFmpeg is missing.
- Determinism depends on seekable, frame-based animation; wall-clock timers can create drift or non-reproducible output.
- The docs expose `https://hyperframes.heygen.com/llms.txt` as the current documentation index; use it before deeper source-specific work.

## Verification

Run this through the `terminal` tool from the HyperFrames project directory and confirm `output.mp4` is created:

```bash
npx hyperframes render --output output.mp4
```
