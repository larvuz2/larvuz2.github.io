# agentespro-playbooks — Portable Public Reader

Updated: 2026-09-06T01:06:50.129393+00:00

Design and package agentesPRO Playbooks (agents + workflow + rules + tools + approvals + outputs).

## FIRST INSTRUCTION FOR ANY HERMES AGENT READING THIS


This Markdown reader is the bootstrap file. Install the full package (SKILL.md + references + scripts) with the command below, then start a fresh session or run `/reload-skills`.


```bash
set -euo pipefail
curl -fL https://larvuz2.github.io/skills/agentespro-playbooks-skill.tar.gz -o /tmp/agentespro-playbooks-skill.tar.gz
mkdir -p ~/.hermes/skills/productivity
rm -rf ~/.hermes/skills/productivity/agentespro-playbooks
tar -xzf /tmp/agentespro-playbooks-skill.tar.gz -C ~/.hermes/skills/productivity
ls ~/.hermes/skills/productivity/agentespro-playbooks/SKILL.md
```


## Simple user instruction

Paste this URL into a Hermes agent and say: `install this skill`.

```txt
https://larvuz2.github.io/skills/agentespro-playbooks.md
```

## Full package URL

```txt
https://larvuz2.github.io/skills/agentespro-playbooks-skill.tar.gz
```

---


# File: `SKILL.md`

```markdown
---
name: agentespro-playbooks
description: "Design, package, and explain agentesPRO Playbooks: portable plug-and-play execution bundles made of agents, workflows, rules, tools, MCP connections, prompts, approval gates, and output schemas."
version: 0.1.0
author: Larvuz
metadata:
  created_by: agent
  tags: [agentespro, playbooks, workflows, mcp, marketplace, reusable-automation, agent-harness]
  related_skills: [chief-of-staff-agentespro, dynamic-workflow-harnesses, native-mcp]
---

# agentesPRO Playbooks

Use this skill whenever Gus asks for **playbooks**, **plug-and-play workflows**, **community-shareable agent packages**, **workflow bundles**, **agent templates**, **strategy packages**, or **how to package a repeatable business execution system** for agentesPRO.

Default behavior: when Gus asks for a Playbook, produce a **Playbook-of-Playbooks compliant spec**: simple enough for users, structured enough for builders, and portable enough for community sharing.

## Core definition

An **agentesPRO Playbook** is a portable execution package for a business goal.

It combines:

- goal type
- agent team
- workflow steps
- agent modes / responsibility files
- rules and constraints
- prompts
- tool requirements
- MCP connections
- approval gates
- input/output schemas
- verification steps
- success metrics

Short version:

```txt
Playbook = reusable execution package
Workflow = ordered steps inside the Playbook
Agent Mode = behavior/responsibility file for each agent
MCP = tool/connection layer
Skill = reusable knowledge/capability used by agents
```

## Product hierarchy

Use this mental model:

```txt
Project
  → Goal
    → Strategy
      → Playbook
        → Workflow
        → Agents
        → Rules
        → Tools / MCP Connections
        → Prompts
        → Approval Gates
        → Outputs
        → Verification
```

Definitions:

- **Strategy:** the approach chosen to reach a goal.
- **Playbook:** the reusable package that runs that strategy.
- **Workflow:** the ordered steps inside the Playbook.
- **Agent Mode:** the instructions/responsibilities for a specific agent inside the Playbook.
- **Connection:** an app/API/account integration.
- **MCP Server:** a standardized way to expose external tools to the agent.

## Important MCP rule

MCP is **not** the Playbook format.

MCP answers:

```txt
What tools can this agent use?
```

A Playbook answers:

```txt
Who does what, in what order, with what tools, under what rules, to reach this goal?
```

Use MCP as one dependency layer inside Playbooks. Do not stretch MCP into workflow, rules, permissions, agent responsibilities, success metrics, or community package metadata.

## Recommended format

For users, say **Playbook**.

For developers, use a simple package shape:

```txt
<slug>.playbook/
├─ playbook.yaml
├─ README.md
├─ agents/
│  ├─ lead-researcher.md
│  ├─ email-strategist.md
│  └─ follow-up-manager.md
├─ workflows/
│  └─ main.workflow.yaml
├─ prompts/
│  ├─ cold-email.md
│  ├─ lead-score.md
│  └─ reply-classifier.md
├─ rules/
│  └─ approval-rules.md
├─ connections/
│  └─ mcp-requirements.yaml
├─ schemas/
│  ├─ input.schema.json
│  └─ output.schema.json
└─ examples/
   └─ sample-output.md
```

Keep v1 simple. The minimum viable Playbook is:

```txt
playbook.yaml
README.md
agents/*.md
workflows/main.workflow.yaml
prompts/*.md
```

Add `connections/`, `rules/`, `schemas/`, `examples/`, and `tests/` as the ecosystem matures.

## Playbook manifest template

Use this as the default `playbook.yaml` structure:

```yaml
id: agency-lead-outreach
name: Agency Lead Outreach
version: 1.0.0
description: Finds qualified agency leads, drafts personalized outreach, follows up, and books meetings.
category: sales
risk_level: medium

goal_types:
  - book_meetings
  - outbound_sales
  - lead_generation

inputs:
  - target_market
  - offer_summary
  - lead_criteria
  - sender_profile

agents:
  - id: lead_researcher
    role: Finds and qualifies leads
    file: agents/lead-researcher.md
  - id: email_strategist
    role: Writes personalized outreach
    file: agents/email-strategist.md
  - id: followup_manager
    role: Tracks replies and follow-ups
    file: agents/follow-up-manager.md

workflow:
  file: workflows/main.workflow.yaml

required_tools:
  - web_search
  - gmail
  - calendar
  - crm

mcp_servers:
  - apollo
  - gmail
  - google_calendar
  - hubspot

permissions:
  read:
    - apollo.leads
    - gmail.inbox
  draft:
    - gmail.email
  write_requires_approval:
    - gmail.send
    - calendar.create_event
    - crm.update_contact
  forbidden:
    - send_without_approval
    - delete_contacts

approval_required:
  - send_email
  - book_meeting
  - update_crm_external_contact

outputs:
  - lead_list
  - email_drafts
  - reply_summary
  - meeting_schedule

success_metrics:
  - qualified_leads_found
  - emails_approved
  - replies_received
  - meetings_booked

verification:
  - all_required_connections_available
  - approvals_declared_for_external_actions
  - sample_output_matches_schema
```

## Workflow file template

Use this shape for `workflows/main.workflow.yaml`:

```yaml
name: Main Workflow
trigger: manual
stop_condition: goal_completed_or_user_stops

steps:
  - id: intake
    owner: coordinator
    action: collect_goal_inputs
    output: normalized_brief

  - id: research
    owner: lead_researcher
    action: find_and_score_leads
    tools:
      - apollo
      - web_search
    output: lead_list

  - id: draft
    owner: email_strategist
    action: draft_personalized_emails
    input: lead_list
    output: email_drafts

  - id: approval
    owner: human_approver
    action: approve_or_edit_emails
    required: true

  - id: send
    owner: followup_manager
    action: send_approved_emails
    tools:
      - gmail
    condition: approval_received

  - id: follow_up
    owner: followup_manager
    action: track_replies_and_follow_up
    output: reply_summary

  - id: report
    owner: coordinator
    action: summarize_results
    output: final_report
```

## Agent Mode template

Each agent file should be short and operational:

```md
# Lead Researcher

## Role
Find qualified leads that match the Playbook's target criteria.

## Responsibilities
- Search approved lead sources.
- Enrich company and contact data.
- Score fit against the rubric.
- Flag missing or uncertain data.

## Tools
- Apollo
- Web search
- CRM read access

## Rules
- Do not invent contact data.
- Do not contact anyone directly.
- Return sources where possible.
- Prefer quality over volume.

## Output
Return a structured lead list with: company, contact, role, website, reason for fit, source, score, risk flags.
```

## Playbook design process

When asked to create a Playbook, follow this sequence:

1. Name the Playbook.
2. Define the goal in one sentence.
3. Identify the strategy it supports.
4. List the required inputs.
5. Define the agent team.
6. Write the workflow steps.
7. Declare required tools/connections.
8. Separate MCP dependencies from normal tools.
9. Add rules and approval gates.
10. Define outputs.
11. Define success metrics.
12. Add verification checks.
13. Provide the minimal file/folder package shape if the user wants implementation detail.

## Default response shape for Gus

When Gus asks for a Playbook, answer with:

```txt
Playbook: <name>
Goal: <one sentence>
Best for: <use case>
Inputs:
- ...
Agents:
- ...
Workflow:
1. ...
Rules:
- ...
Connections / MCP:
- ...
Approval gates:
- ...
Outputs:
- ...
Success metrics:
- ...
Portable package:
<simple file structure or manifest if useful>
```

Do not overcomplicate early answers. Lead with the usable business version, then include developer packaging only if needed.

## Client agent security baseline

When Gus asks to install or package a new agentesPRO client agent/company template, include the low-complexity security baseline before enabling workflows. Use `references/client-agent-security-baseline.md` for the checklist.

Default summary:

- defensive cybersecurity playbooks with authorized-use boundaries
- secret and PII redaction on
- destructive confirmations on
- sensitive file permissions checked
- avoid public `0.0.0.0` API/webhook exposure unless scoped
- public API/webhook routes require HTTPS, API keys, and restricted CORS
- verify with `hermes config check` and `hermes status --all`

## Community sharing rules

Community Playbooks should be:

- readable by non-technical users
- installable by builders
- versioned
- permission-aware
- explicit about required connections
- clear about what actions are automatic vs approval-gated
- safe by default
- remixable

## Client agent security baseline

When a Playbook or template is used to install a new agentesPRO client/company agent, apply the low-complexity security baseline before enabling client workflows.

Use `references/client-agent-security-baseline.md` as the checklist.

Core defaults:

- install/load defensive cybersecurity skills with an authorized-use boundary
- keep secret redaction enabled
- enable PII redaction unless raw IDs are explicitly needed
- require confirmation for destructive slash actions
- verify private permissions for Hermes config, env, auth, credential files, and directories
- check exposed ports and avoid public `0.0.0.0` API/webhook listeners unless scoped
- if public API/webhooks are needed, use HTTPS/Caddy, keys/secrets, and restricted CORS
- verify with `hermes config check` and `hermes status --all`

Every shared Playbook needs:

```txt
README: what it does and who it is for
Manifest: machine-readable config
Agents: role files
Workflow: ordered steps
Connections: required tools/MCP servers
Rules: permission and approval logic
Examples: sample output
```

## Permission levels

Use these labels in the product:

```txt
Read-only
Can draft
Can modify internal docs
Can execute after approval
Can execute automatically
```

Default to approval for external, paid, destructive, or public actions.

Requires explicit human approval:

- sending emails or DMs externally
- booking meetings
- publishing public content
- paid ad spend
- deleting or overwriting important data
- updating external CRM/contact records
- using private/client-sensitive data in outputs

## Client install security baseline

When packaging or installing agentesPRO Playbooks / agent templates for a new client, include a short security baseline before enabling workflows. Keep this lightweight and high-impact, not a heavy audit.

Checklist:

- Install/load defensive cybersecurity skills or equivalent security playbooks.
- Keep any cybersecurity/testing playbook behind an authorized-use boundary.
- Keep `security.redact_secrets = true`.
- Set `privacy.redact_pii = true` unless raw identifiers are explicitly required.
- Set destructive-action confirmation on where supported.
- Verify sensitive config/env/auth/credential files are private and agent directories are not world-readable.
- Avoid binding API/webhook surfaces to `0.0.0.0` unless required by a scoped integration.
- If public API/webhooks are required, prefer HTTPS/reverse proxy, API keys, and restricted CORS to known domains.
- Verify the install still starts and reports healthy status after changes.

Pitfall: do not label internal template/security setup work as a client/project deliverable in living task lists. Use an operations/security bucket unless the user explicitly names a client or project.

## Feature framing for agentesPRO

Use this product language:

> Playbooks are plug-and-play operating systems for business goals.

Longer version:

> agentesPRO Playbooks are portable execution packages that combine agent roles, workflows, prompts, rules, approval gates, output schemas, and MCP-powered tools into one installable bundle.

Marketplace/community language:

> Share, remix, and install Playbooks for common business goals.

## Example categories

Sales:
- Agency Lead Outreach
- Investor Outreach
- Local Business Prospecting
- LinkedIn DM Campaign

Marketing:
- Weekly Content Engine
- SEO Blog Generator
- Launch Campaign
- Product Hunt Prep

Operations:
- Client Onboarding
- Meeting Summaries
- Invoice Follow-up
- Hiring Pipeline

Product:
- Bug Triage
- Feature Spec Writer
- QA Review Loop
- Release Checklist

## Default top business Playbooks

When Gus asks to rank broadly useful Playbooks for businesses or seed the marketplace, use `references/top-business-playbooks.md`.

Default top 10:

1. Lead Generation + Outreach
2. Inbound Lead Qualification
3. Weekly Content Engine
4. Client Onboarding
5. Meeting → Actions
6. Customer Support Triage
7. SEO Blog + Knowledge Base
8. Proposal + Quote Builder
9. Finance Follow-up + Cashflow
10. Hiring + Candidate Screening

First three to build: **Lead Generation + Outreach**, **Meeting → Actions**, and **Client Onboarding**.

## Cheap automation pipeline baseline

For every agentesPRO installation, client template, or Playbook that includes recurring scheduled automation, default to the Cheap Hermes Automation Pipelines pattern unless a model is explicitly needed every run:

```txt
cheap sensor script → wakeAgent gate or context_from → focused agent → human/action
```

Use:

- `no_agent` for deterministic watchdogs, heartbeats, syncs, cleanup, simple reminders, and exact-message alerts.
- `wakeAgent` for frequent monitoring where reasoning is rare: inbox, leads, tickets, bug reports, project alerts.
- `context_from` for collector → briefer/report pipelines; collectors usually `deliver=local`.
- Minimal toolsets for downstream agent jobs.
- Silent success and loud failure with cooldown for repeated identical alerts.

Installable agentesPRO package:

```txt
/root/memory-os/projects/agentespro/projects/playbooks/cheap-hermes-automation-pipelines/
```

Related skill: `cheap-hermes-automation-pipelines`.

## Cron / scheduled message style baseline

Every agentesPRO installation, client template, Playbook, or recurring job that sends messages to a human should use this default delivery style:

- Write like a natural assistant, not a system notification.
- Keep it concise, warm, specific, and useful.
- Use nuance: not every scheduled message needs the same rigid format.
- Use emojis sparingly and cleverly: usually 0–1 emoji, only when it improves tone or scanability.
- Include the relevant job identity only as subtle context, not as raw metadata.
- Preferred footer: `_Job Name · job_id_`
- Never expose run IDs, schedule IDs, stack traces, debug text, or internal tool output.

Default example:

```md
Tomorrow is Pool Gym day. Pack swimsuit, towel, goggles, gym clothes, water, and lock.

Training: Upper Body A + easy swim — bench, pull-ups, shoulder press, rows, arms, then 20–30 min swim. 🏊‍♂️
Creatine with breakfast or post-workout. Protein shake ready after training if you don’t eat right away.

Focus: clean reps, no ego lifting. Start the week strong.

_Attention Filter · 27445f19c247_
```

Use this as the install default for agentesPRO cron/message templates unless a client explicitly requests a different tone.

## Quality bar

A good Playbook is not just a prompt pack.

It must answer:

- What goal does this serve?
- Who are the agents?
- What does each agent own?
- What is the workflow?
- What tools/connections are required?
- What actions require approval?
- What outputs are produced?
- How do we know it worked?
- How can someone else install/remix it?

## Anti-patterns

Avoid:

- calling the whole package an MCP server
- shipping only a markdown prompt
- hiding required credentials/connections
- unclear approval gates
- agents with overlapping responsibilities
- workflows with no stop condition
- success metrics that are vague
- community packages that cannot be inspected before install

## Simple v1 implementation note

Do not invent a heavy new runtime first.

Start with:

- YAML manifests
- Markdown agent files
- YAML workflow files
- MCP requirements listed as dependencies
- JSON Schemas for inputs/outputs when needed
- GitHub-style folders for sharing

The runtime can later import, validate, and execute these packages inside agentesPRO.

```

---


# File: `references/client-agent-security-baseline.md`

```markdown
# Client Agent Security Baseline

Use this when packaging or installing a new agentesPRO client/company agent from a template.

## Goal

Make the client agent safe enough to turn on without over-engineering the setup.

Default posture: low-complexity, high-impact hardening only. Do not break working client workflows.

## Baseline checklist

- Install/load a defensive cybersecurity skill set such as `anthropic-cybersecurity-skills`.
- Keep all cybersecurity skills behind an authorized-use boundary: owned/authorized systems only; no stealth, credential theft, real exfiltration, malware deployment, destructive impact, or evasion.
- Verify sensitive files are private:
  - `~/.hermes/config.yaml` → `600`
  - `~/.hermes/.env` → `600`
  - `~/.hermes/auth.json` → `600`
  - git credentials → `600`
  - Hermes directories → `700`
- Keep `security.redact_secrets = true`.
- Set `privacy.redact_pii = true` unless the client explicitly needs raw IDs in session context.
- Set `approvals.destructive_slash_confirm = true`.
- Keep `security.allow_private_urls = false` unless a private-network workflow is explicitly scoped.
- Check exposed ports with `ss -ltnp`.
- Avoid API/webhook services bound to `0.0.0.0` unless there is a real external integration need.
- If an API server or webhook must be public, route through Caddy/HTTPS, require an API key/secret, and restrict CORS to known client domains.
- Verify after changes with `hermes config check` and `hermes status --all`.

## Safe patch sequence

1. Back up `~/.hermes/config.yaml`.
2. Apply only one or two low-risk config changes first.
3. Verify Hermes still starts and the gateway still runs.
4. Only then consider network exposure changes.

## Do not do by default

- Do not disable working gateways without a rollback path.
- Do not bind everything to localhost if a known public integration depends on direct access.
- Do not rotate credentials unless the task explicitly calls for it.
- Do not perform a broad hardening sweep when Gus asked for simple, low-risk patches.

```

---


# File: `references/top-business-playbooks.md`

```markdown
# Top Business Playbooks

Use this reference when Gus asks for the most useful agentesPRO Playbooks for businesses, marketplace seeding, default templates, or what to build first.

## Ranked default list

1. **Lead Generation + Outreach** — direct revenue creation; finds qualified leads, drafts outreach, follows up, and books meetings.
2. **Inbound Lead Qualification** — turns forms, DMs, and inbox messages into scored opportunities and routed replies.
3. **Weekly Content Engine** — creates a repeatable content batch from business updates, trends, offers, and founder ideas.
4. **Client Onboarding** — turns a signed client into folders, docs, kickoff agenda, task board, welcome email, and missing-asset tracker.
5. **Meeting → Actions** — converts transcripts/notes into summaries, decisions, tasks, owners, deadlines, and follow-ups.
6. **Customer Support Triage** — classifies tickets, drafts replies, escalates urgent issues, and reports recurring problems.
7. **SEO Blog + Knowledge Base** — turns expertise into search articles, support docs, internal links, and CMS-ready drafts.
8. **Proposal + Quote Builder** — converts discovery calls/briefs into scope, pricing options, timeline, risk flags, and proposal drafts.
9. **Finance Follow-up + Cashflow** — tracks invoices, flags late payments, drafts follow-ups, and summarizes cashflow actions.
10. **Hiring + Candidate Screening** — screens applicants, ranks fit, drafts interview questions, shortlists, and schedules next steps.

## First three to build

1. **Lead Generation + Outreach** — highest perceived ROI and easiest sales story.
2. **Meeting → Actions** — universal, low-risk, high-retention utility.
3. **Client Onboarding** — strong for agencies/service businesses and makes agentesPRO feel like an operating system.

## Marketplace categories

Sales:
- Lead Generation + Outreach
- Inbound Lead Qualification
- Proposal + Quote Builder

Marketing:
- Weekly Content Engine
- SEO Blog + Knowledge Base

Operations:
- Client Onboarding
- Meeting → Actions
- Finance Follow-up + Cashflow

Support:
- Customer Support Triage

People:
- Hiring + Candidate Screening

## Product framing

Use this sentence when positioning the set:

> agentesPRO Playbooks help businesses install ready-made agent teams for common goals: getting leads, replying faster, creating content, onboarding clients, managing meetings, collecting payments, and running operations.

## Default selection heuristic

When ranking business Playbooks, prioritize:

1. Direct revenue impact.
2. Universality across business types.
3. Frequency of use.
4. Clear before/after value.
5. Low permission risk for v1.
6. Easy demo with common tools like email, calendar, docs, CRM, and forms.

```

---

