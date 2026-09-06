# cheap-hermes-automation-pipelines — Portable Public Reader

Updated: 2026-09-06T01:06:50.142656+00:00

Cheap cron automation: sensor script -> wakeAgent gate -> focused agent. Silent success, loud failure.

## FIRST INSTRUCTION FOR ANY HERMES AGENT READING THIS


This Markdown reader is the bootstrap file. Install the full package (SKILL.md + references + scripts) with the command below, then start a fresh session or run `/reload-skills`.


```bash
set -euo pipefail
curl -fL https://larvuz2.github.io/skills/cheap-hermes-automation-pipelines-skill.tar.gz -o /tmp/cheap-hermes-automation-pipelines-skill.tar.gz
mkdir -p ~/.hermes/skills/devops
rm -rf ~/.hermes/skills/devops/cheap-hermes-automation-pipelines
tar -xzf /tmp/cheap-hermes-automation-pipelines-skill.tar.gz -C ~/.hermes/skills/devops
ls ~/.hermes/skills/devops/cheap-hermes-automation-pipelines/SKILL.md
```


## Simple user instruction

Paste this URL into a Hermes agent and say: `install this skill`.

```txt
https://larvuz2.github.io/skills/cheap-hermes-automation-pipelines.md
```

## Full package URL

```txt
https://larvuz2.github.io/skills/cheap-hermes-automation-pipelines-skill.tar.gz
```

---


# File: `SKILL.md`

```markdown
---
name: cheap-hermes-automation-pipelines
description: Design Hermes cron automations using no_agent, wakeAgent gates, and context_from so scheduled jobs stay cheap, quiet, and reliable.
version: 1.0.0
author: Larvuz
license: MIT
platforms: [linux, macos]
metadata:
  hermes:
    tags: [hermes, cron, automation, no_agent, wakeAgent, context_from, watchdogs]
---

# Cheap Hermes Automation Pipelines

## When to load

Load this skill when the user asks to create, audit, optimize, or troubleshoot Hermes cron jobs, scheduled automations, watchdogs, recurring briefings, collectors, alerts, pipelines, or anything involving `no_agent`, `wakeAgent`, `context_from`, or cost/noise reduction.

## Core principle

Keep the model out of the loop until intelligence is actually needed.

Preferred architecture:

```txt
Cheap sensors → wake gate → focused agent → Telegram/action
```

Avoid:

```txt
Full agent turn every few minutes just to discover nothing changed
```

## Pattern 1 — `no_agent`

Use when a script can fully decide the output.

Behavior:

| Script output | Result |
|---|---|
| empty stdout | silent tick |
| non-empty stdout | delivered verbatim |
| non-zero exit | Hermes sends error alert |

Best for:

- RAM/disk/process watchdogs
- API/site health checks
- CI/build pings
- heartbeat/sync/cleanup jobs
- deterministic publisher jobs

Create via tool or CLI:

```bash
hermes cron create "every 5m" --no-agent --script ram-watch.sh --deliver telegram
```

With the `cronjob` tool, set:

```json
{
  "no_agent": true,
  "script": "ram-watch.sh",
  "schedule": "every 5m"
}
```

## Pattern 2 — `wakeAgent` gate

Use when a cheap script should decide whether the model wakes.

The pre-run script prints JSON:

```json
{"wakeAgent": false}
```

or:

```json
{
  "wakeAgent": true,
  "context": {
    "change": "new actionable item"
  }
}
```

If false, Hermes skips the agent and spends zero model tokens for that tick. If true, Hermes wakes the agent with the context already injected.

Best for:

- new important email/thread
- new lead/opportunity
- new bug report
- file/database count changed
- external flag dropped
- Discord/Telegram/project event that needs triage

Rule: watch constantly, think rarely.

## Pattern 3 — `context_from`

Use to chain jobs without fragile model-managed file handoffs.

Architecture:

```txt
Job 1 — collector
- no_agent=True
- script=collect.py
- deliver=local

Job 2 — briefer
- context_from=<Job 1 ID>
- summarizes latest collector output
- deliver=telegram
```

`context_from` prepends the upstream job’s latest completed output to the downstream prompt at runtime. The model does not need to know paths or remember to read files.

## Audit checklist

For each cron job, ask:

1. Does this need a model every run?
2. Can a script decide “nothing to report”?
3. Can the job be split into collector + briefer/digest?
4. Can `context_from` replace manual file handoffs?
5. If the job is mirrored to a dashboard, does it have practical name/category metadata?
6. Is Telegram delivery only for human-useful output?
7. Are enabled toolsets minimal?
8. Does failure become loud with non-zero exit?
9. Is the prompt focused on one job, not broad exploration?

## Gus / Larvuz defaults

- Default to silence unless something matters.
- Use `no_agent` for watchdogs, heartbeats, syncs, deterministic cleanup/publish.
- Use `wakeAgent` for monitoring leads, inbox, project alerts, bug reports, and external changes.
- Use `context_from` for daily/weekly/monthly briefings that summarize collector output.
- Keep collector jobs local whenever possible.
- Keep model jobs lean and focused.
- For public/publishing jobs, preserve approval gates and privacy rules.

## Verification

After changing jobs:

```bash
hermes cron list
hermes cron status
hermes cron run <job_id>
```

Check:

- expected job is enabled
- next run time is sane
- silent ticks stay silent
- forced run returns expected output
- failure paths alert clearly

## Related human-readable note

Gus’s Obsidian note:

```txt
/root/obsidian-vaults/gus-garza/05 Workflows/Hermes Cheap Automation Pipelines.md
```

## Session implementation reference

Use `references/gus-larvuz-cron-optimization-2026-06.md` for a production-tested implementation pass covering:

- collector + `context_from` pipelines
- `wakeAgent` inbox gate verification
- deterministic `no_agent` reminders
- cron output path shape: `/root/.hermes/cron/output/<job_id>/<timestamp>.md`
- Cron Control Room auditor pattern
- agentesPRO Playbook packaging location

Use `references/obsidian-decision-review-crons-2026-06.md` for the paired collector/digest pattern used by Obsidian Drift Cleaner and Decision Debt Review, including collector signals, dashboard metadata, and first-run verification.

```

---


# File: `references/gus-larvuz-cron-optimization-2026-06.md`

```markdown
# Gus / Larvuz cron optimization pass — 2026-06

Session learning from implementing cheap Hermes automation patterns in Gus's default Larvuz profile.

## Implemented architecture

```txt
Money Radar:
no_agent collector → context_from → focused daily agent brief

Weekly Creative Push:
no_agent creative-reference collector → context_from → focused weekly creative agent

Inbox Sentinel:
wakeAgent gate every 15m → agent wakes only for actionable candidates

Simple reminders:
fixed/calculated no_agent scripts, no model turn

Cron Control Room:
no_agent watchdog, silent when healthy, alerts on real cron/system issues
```

## Durable implementation patterns

### context_from collector pattern

Create a collector with:

- `no_agent=true`
- `script=<collector>.py`
- `deliver=local`
- schedule more frequent than the downstream briefer

Then update the downstream agent job with:

- `context_from=[collector_job_id]`
- a prompt that explicitly says the injected collector output is raw signal, not final truth
- a narrower `enabled_toolsets` list

Useful for money/opportunity scans, creative reference collection, status aggregation, and daily/weekly briefs.

### wakeAgent gate pattern

The gate script should emit exactly one of:

```json
{"wakeAgent": false}
```

```json
{"wakeAgent": true, "context": {"type": "new_actionable_items", "items": []}}
```

A successful `wakeAgent=false` run appears in cron output as:

```txt
Script gate returned `wakeAgent=false` — agent skipped.
```

Testing pitfall: a gate that tracks seen IDs may return `wakeAgent=true` on the first direct test and `wakeAgent=false` on the second because the first run marked items as seen. That is expected.

### no_agent reminder pattern

Convert deterministic reminders to scripts when the message is fixed or computable from date/time. Examples:

- daily supplement reminders
- weekly prep reminders
- payment reminders
- simple operational nudges

This avoids wasting a model turn to emit known text.

### Cron output path

Cron run outputs are stored under a directory per job, not directly as the job ID file:

```txt
/root/.hermes/cron/output/<job_id>/<YYYY-MM-DD_HH-MM-SS>.md
```

Use this path shape when verifying forced runs or inspecting latest output.

### Auditor pattern

A useful `no_agent` system auditor checks:

- `hermes cron status`
- recent `last_status` and `last_delivery_error` in `~/.hermes/cron/jobs.json`
- RAM/disk thresholds
- critical script existence
- repeated identical alert cooldown via a shared guard

Silent empty output means healthy.

## Verification sequence

After changes:

1. Run scripts directly.
2. `chmod +x` any cron scripts.
3. Create/update cron jobs.
4. Force-run key jobs with `cronjob action=run` or `hermes cron run`.
5. Wait for scheduler tick.
6. Confirm `last_status=ok` in cron list/jobs.json.
7. Inspect `/root/.hermes/cron/output/<job_id>/<timestamp>.md`.
8. Confirm `wakeAgent=false` skips the agent when appropriate.

## agentesPRO packaging note

The same class of pattern was packaged for agentesPRO as an installable Playbook at:

```txt
/root/memory-os/projects/agentespro/projects/playbooks/cheap-hermes-automation-pipelines/
```

When installing client automations, default to this pattern unless the client explicitly needs a model on every scheduled run.

```

---


# File: `references/obsidian-decision-review-crons-2026-06.md`

```markdown
# Obsidian Drift + Decision Debt Cron Pattern — 2026-06

Use this as a reusable pattern for knowledge-base hygiene and decision-debt review jobs.

## Pattern

Prefer a cheap deterministic collector plus a concise human-facing digest:

```txt
no_agent collector script → local output → agent digest with context_from → Telegram
```

This keeps scanning cheap and lets the agent spend reasoning only on summarizing and prioritizing.

## Implemented job shapes

### Obsidian Drift Cleaner

- Collector: `Obsidian Drift Collector`
- Collector schedule: Sunday 17:55 America/Mexico_City / `55 23 * * 0` UTC
- Collector mode: `no_agent=True`, `deliver=local`
- Collector script: `obsidian_drift_collect.py`
- Digest: `Obsidian Drift Cleaner`
- Digest schedule: Sunday 18:00 America/Mexico_City / `0 0 * * 1` UTC
- Digest uses `context_from=<collector_job_id>`
- Category: `Review / Check`
- Collector category: `Sync / Health Check`

Collector signals worth surfacing:

- stale inbox/routing candidates
- recent notes changed
- signal-heavy notes containing TODO/pending/decision/follow-up words
- open markdown tasks
- possible orphan/unlinked notes
- top tags

Digest style:

- one-line vault health summary
- top 3 cleanup moves
- one concrete recommendation
- no note rewriting unless the user explicitly asks

### Decision Debt Review

- Job: `Decision Debt Review`
- Schedule: Friday 16:00 America/Mexico_City / `0 22 * * 5` UTC
- Script: `decision_debt_collect.py`
- Agent consumes script output and sends a short ranked review
- Category: `Review / Check`

Collector signals worth surfacing:

- decide/decision/choose/pending/blocked/stuck/approve/review/follow-up/TBD/todo language
- open `- [ ]` markdown tasks
- project hints from paths and text
- recency and signal score

Digest style:

- short diagnosis
- top 5 decision debts
- each item: `Decision:` + `Move:`
- end with the highest-leverage first decision
- do not invent decisions beyond collector evidence

## Dashboard metadata

When jobs should appear cleanly in agentesPRO/dashboard filters, add safe metadata to the Hermes cron job record:

```json
{
  "job_category": "Review / Check",
  "job_category_slug": "review-check",
  "job_display": {
    "category": "Review / Check",
    "category_slug": "review-check",
    "practical_name": "Decision Debt Review",
    "previous_name": "Decision Debt Review"
  }
}
```

If the dashboard schema cannot yet store arbitrary category fields, add a filter token to `toolsets` in the connector payload:

```txt
category:review-check
```

## Verification loop

1. Run collector script directly once and inspect first ~120 lines.
2. Create collector job with `deliver=local` and `no_agent=True`.
3. Create digest job with `context_from=[collector_job_id]`.
4. Force-run collector first.
5. Force-run digest second.
6. Confirm `last_status: ok` and next scheduled run returns to the intended cadence.
7. If the cron tool schedules but does not immediately execute, trigger with CLI `hermes cron run <job_id>` and wait for the scheduler tick.
8. Sync dashboard connector if recurring jobs are mirrored externally.

## Pitfalls

- Do not make the Obsidian drift digest a giant audit. The value is prioritization.
- Do not rewrite or move notes automatically from a scheduled hygiene job.
- Avoid persisting session-specific paths as universal rules; keep paths in the reference and make the main skill pattern class-level.
- Schedule paired collector/digest jobs a few minutes apart so `context_from` has fresh collector output.

```

---

