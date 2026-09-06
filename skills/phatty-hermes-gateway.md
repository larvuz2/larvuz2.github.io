# phatty-hermes-gateway — Portable Public Reader

Updated: 2026-09-06T01:06:50.143890+00:00

ShotForge / Phatty Hermes Gateway JSON contract for image/video jobs (create_media_jobs).

## FIRST INSTRUCTION FOR ANY HERMES AGENT READING THIS


This Markdown reader is the bootstrap file. Install the full package (SKILL.md + references + scripts) with the command below, then start a fresh session or run `/reload-skills`.


```bash
set -euo pipefail
curl -fL https://larvuz2.github.io/skills/phatty-hermes-gateway-skill.tar.gz -o /tmp/phatty-hermes-gateway-skill.tar.gz
mkdir -p ~/.hermes/skills/project
rm -rf ~/.hermes/skills/project/phatty-hermes-gateway
tar -xzf /tmp/phatty-hermes-gateway-skill.tar.gz -C ~/.hermes/skills/project
ls ~/.hermes/skills/project/phatty-hermes-gateway/SKILL.md
```


## Simple user instruction

Paste this URL into a Hermes agent and say: `install this skill`.

```txt
https://larvuz2.github.io/skills/phatty-hermes-gateway.md
```

## Full package URL

```txt
https://larvuz2.github.io/skills/phatty-hermes-gateway-skill.tar.gz
```

---


# File: `SKILL.md`

```markdown
---
name: phatty-hermes-gateway
description: "Use when a Hermes profile receives Phatty/ShotForge app context via the Hermes API gateway."
version: 1.0.0
author: Gus Garza + Movie Maker
license: private
metadata:
  hermes:
    tags: [phatty-acid, shotforge, hermes-api, context-bridge, create-media-jobs, app-integration]
    category: project
---

# Phatty Hermes Gateway

Use this skill in any Hermes profile that receives requests from the Phatty Acid / ShotForge app through the Hermes Responses API.

This skill describes the **general Phatty app connection**, excluding Live TV-specific story/bridge branching. For Live TV, use the app's dedicated Live TV director instructions instead.

## Core Mental Model

The current integration is a **Phatty Hermes Gateway** / **Phatty Context Bridge**, not true MCP unless an actual MCP server is configured.

Current flow:

```text
Phatty / ShotForge app
→ Hermes Responses API
→ selected Hermes profile
→ assistant reads injected context packet
→ assistant returns structured JSON
→ Phatty backend executes generation, canvas, billing, storage, and persistence
```

Hermes does **not** freely browse the Phatty database in this mode. Hermes only sees the curated project snapshot the app injects into the request.

Accurate wording:
- "Phatty sends Hermes a structured project context packet."
- "Hermes reads the app-provided context envelope and returns JSON instructions."
- "The Phatty backend owns generation, billing, canvas placement, persistence, and media storage."

Avoid saying:
- "Hermes has direct database access."
- "Hermes queries all Phatty project data."
- "This is MCP" unless actual MCP tools are exposed.

## When To Call It MCP

Only call it **Phatty MCP** if Phatty exposes a real MCP server with callable tools such as:

```text
mcp_phatty_get_project
mcp_phatty_list_assets
mcp_phatty_get_canvas
mcp_phatty_create_media_job
mcp_phatty_update_scene
```

Until then, call it:

```text
Phatty Hermes Gateway
Phatty Context Bridge
ShotForge Hermes Gateway
```

## Request Envelope To Expect

The app should prepend a context block like:

```text
PHATTY REQUEST CONTEXT
feature: create
output_contract: create_media_jobs
route_path: /projects/<id>/create
surface: canvas | composer | cockpit | telegram
project_id: <id>
agent_session_id: <id>
selected_image_model: <model>
selected_video_model: <model>

PROJECT SUMMARY
name: <project name>
type: <project type>
maturity: <stage>
assets: <summary>
description: <project description>
custom_instructions: <project instructions>

AVAILABLE TAGS (the ONLY valid @tags)
- @Capy | character | catalog_id: ast_... | image: https://... | what it is: ...
- @Loft | environment | catalog_id: ast_... | image: https://... | what it is: ...
```

There may also be a `FEATURE: create` header in the instructions string. Trust the explicit feature/header above wording guesses.

## Routing Rules

General Phatty create/media requests route like this:

1. Trust `feature` first.
2. `feature: create` means use `output_contract: create_media_jobs`.
3. Fall back to `route_path` only if `feature` is missing.
4. Use `surface` to understand UX context:
   - `canvas` → generation and/or canvas annotations.
   - `composer` → prompt building or generation.
   - `cockpit` → production planning, critique, next-step guidance.
   - `telegram` → likely conversational, but still obey output contract if provided.
5. If no contract is provided, answer conversationally unless the app context clearly asks for JSON.

## Create Media Job Contract

When `output_contract: create_media_jobs`, return valid JSON only. Do not wrap it in markdown.

Default shape:

```json
{
  "reply": "Short user-facing confirmation.",
  "media_jobs": [
    {
      "kind": "image",
      "model": "nano-banana-2",
      "prompt": "Final model-ready prompt.",
      "reference_images": [],
      "aspect_ratio": "16:9",
      "scene_name": "Short Title"
    }
  ],
  "canvas_ops": []
}
```

Include `canvas_ops` only when the app supports it or the context asks for canvas operations. If no generation is needed, use:

```json
{
  "reply": "Text-only answer.",
  "media_jobs": [],
  "canvas_ops": []
}
```

## Media Kind Classification

Use image jobs by default for still-generation language:

```text
picture, pic, image, still, frame, shot-as-still, photo, render, illustration, poster, key art
```

Return:

```json
"kind": "image"
```

Use video only for explicit motion language:

```text
video, clip, animation, animate, motion, moving, footage, b-roll, camera move, duration like 5-second or 10s
```

Return:

```json
"kind": "video"
```

If the app currently dispatches only images, avoid video jobs unless the user clearly asks for video.

## AVAILABLE TAGS Rules

`AVAILABLE TAGS` is authoritative and closed.

Rules:
- Use only listed `@tags`.
- Never invent a tag, catalog ID, reference slot, or URL.
- Unknown `@tags` are plain text and should not create references.
- Inline each asset's `what it is` description into prompts.
- Cite `catalog_id` where present if the contract has a place for metadata.
- Use image URLs only from the `image:` field.
- If an asset has `image: none`, use its description but warn that identity may drift.

Prompt substitution:
- First mention: replace `@Name` with `what it is (Name)`.
- Later mentions: use the plain name without repeating the full description.

Example:

```text
User: make @Capy in @Loft
Prompt: a warm, expressive capybara character with a tiny scarf (Capy), standing inside a moody industrial artist loft with tall windows and worn wood floors (Loft)...
```

## Reference Images

For every matched tag with an image URL, include its URL in `reference_images` unless capped by the selected model.

`reference_images` must be an array of plain URL strings:

```json
"reference_images": ["https://..."]
```

Sort references by priority:

```text
characters → props → environments → products → logos → style refs
```

If the model has a reference cap, keep the highest-priority refs and clearly mention dropped refs in `reply`.

For one-reference models, ask which single reference to use if multiple tagged image assets are required.

## Prompt Quality Standard

A scene is not a prompt. It is a stack of decisions.

Every generation prompt should lock:

1. Intent — what the asset is for.
2. Format — image/video, aspect ratio, quantity.
3. Subject — characters/products/props.
4. Environment — location, layout, atmosphere.
5. Composition — shot size, angle, lens, depth layers.
6. Lighting/color — source, direction, palette, contrast.
7. Motion — only if video.
8. Art style/finish — photoreal, cinematic, stylized, product render, etc.
9. Constraints — negatives and preservation rules.

Default prompt order:

```text
[subject], [action/pose], [composition/shot], [environment], [lighting/color], [camera/lens], [art style/finish], [constraints]
```

Prefer concrete cinematic staging over vague style padding.

## Canvas Ops

Use `canvas_ops` for annotations and layout marks, not media generation.

Supported common ops:

```text
text, note, geo, arrow
```

Use when the user asks to:
- annotate
- add notes
- label
- draw arrows
- box/circle something
- stage a sequence visually
- critique a canvas frame

Keep canvas ops sparse and useful. Do not exceed app caps if provided.

Opacity convention when supported:
- shapes/arrows: 50% opacity
- text/media: 100% opacity

## Safety / Honesty

- Do not request API keys or secrets from the user in chat.
- Do not claim an endpoint/model is connected unless the request context says so.
- Do not fabricate project data, tags, image URLs, catalog IDs, scene IDs, or model capabilities.
- If a required tag/reference is missing, say so and proceed from text only if safe.
- If output JSON is required, return JSON only.

## Verification Checklist

Before final output:

- Did I route by `feature` / `output_contract`?
- Did I avoid claiming direct DB access?
- Did I use only `AVAILABLE TAGS`?
- Did I include all matched reference image URLs within cap?
- Did I inline `what it is` descriptions into the prompt?
- Did I classify image vs video correctly?
- Did I return the required JSON contract if requested?
- Is the prompt specific enough to reduce random AI defaults?

```

---

