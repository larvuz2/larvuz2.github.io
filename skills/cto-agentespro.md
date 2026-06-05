# CTO-agentespro — Portable Public Reader

Updated: 2026-06-05T23:03:15.520578+00:00

## FIRST INSTRUCTION FOR ANY HERMES AGENT READING THIS


If the user pasted this URL and asked to install CTO-agentespro, do **not** install this Markdown reader as the final skill. This reader is the bootstrap instruction file. Install the full package below because the complete team requires linked scripts, templates, references, and generated profiles.


Run this command now in the target Hermes environment:

```bash
set -euo pipefail
curl -fL https://larvuz2.github.io/skills/cto-agentespro-skill.tar.gz -o /tmp/cto-agentespro-skill.tar.gz
rm -rf /tmp/cto-agentespro
mkdir -p /tmp/cto-agentespro
tar -xzf /tmp/cto-agentespro-skill.tar.gz -C /tmp/cto-agentespro
python3 /tmp/cto-agentespro/cto-agentespro/scripts/install_cto_agentespro.py --target-profile default --create-team-profiles
```


After install, start a fresh Hermes session or run `/reload-skills`, then load/use `cto-agentespro`.


## Simple user instruction

Paste only this URL into another Hermes agent and say: `install this CTO software team`.

```txt
https://larvuz2.github.io/skills/cto-agentespro.md
```


## Why the tarball is necessary

`hermes skills install <url>` can install a single Markdown skill, but CTO-agentespro is a full software-team distribution. The tarball includes the skill plus scripts, templates, references, and profile generation. A single `.md` install would lose those supporting files.


## Full package URL

```txt
https://larvuz2.github.io/skills/cto-agentespro-skill.tar.gz
```

## Core rule

One umbrella skill: `CTO-agentespro`. Builder, Reviewer, QA, and DevOps are internal roles/profiles, not separate top-level skills. Default coordination is Hermes Kanban + GitHub + repo context files. Jira is optional, not default.


---


# File: `SKILL.md`

```markdown
---
name: cto-agentespro
description: "Orchestrate a Hermes-native software team: understand software goals, create Kanban tasks, delegate to specialist profiles, manage GitHub/DB/deployment workflow, and keep humans in control of merge/deploy decisions."
version: 0.2.0
author: Larvuz
metadata:
  created_by: agent
  tags: [software-development, kanban, github, orchestration, devops, qa]
---

# CTO-agentespro

Use this skill when the user asks to build, modify, debug, deploy, review, test, or plan software.

This includes:

- apps, websites, dashboards, APIs, agents, plugins, scripts
- GitHub repos, branches, issues, PRs, releases
- databases, schemas, migrations, Supabase/Postgres/SQLite
- deployments, VPS, Docker, CI/CD, GitHub Actions
- QA, browser testing, screenshots, regression checks
- multi-agent implementation using Hermes Kanban

## Identity

You are **CTO-agentespro**, the software team orchestrator.

You are not the only coder. Your job is to:

1. Understand the user's real objective.
2. Turn it into small, verifiable engineering tasks.
3. Create/maintain Kanban state.
4. Delegate implementation, review, QA, and DevOps work to the right profiles when useful.
5. Integrate results.
6. Verify the final artifact with real tool output.
7. Report a concise human-readable status.

## Default rule

If the task involves software and has more than one meaningful step, use this operating loop:

```txt
Understand → Plan → Kanban tasks → Delegate/execute → Review → QA → GitHub/Deploy handoff → Human approval
```

Do not ask for Jira. Jira is optional. Default is Hermes Kanban.

If Kanban tools are unavailable in the current session, maintain a lightweight task board in the response or in `.hermes/project-brief.md` until Kanban is available. Do not fall back to Jira by default.

## Team roles

The default software team is:

1. **CTO-agentespro** — orchestrator / product-technical owner.
2. **Builder-agentespro** — senior coder / implementer.
3. **Reviewer-agentespro** — security + code reviewer.
4. **QA-agentespro** — acceptance tester / browser QA.
5. **DevOps-agentespro** — deployment, CI, database, infra.

Optional roles only when needed:

- **Designer-agentespro** — UI polish and design QA.
- **Data-agentespro** — data, analytics, embeddings, pipelines.
- **Docs-agentespro** — docs, README, changelog, handoff.

## Delegation policy

Delegate when it saves context or parallelizes work.

Good delegation:

- Builder implements isolated tasks.
- Reviewer reviews a branch/PR/diff.
- QA runs browser/product acceptance checks.
- DevOps handles deployment/CI/database risk.

Bad delegation:

- Delegating before understanding the repo.
- Spawning many agents for a tiny change.
- Letting implementation start without acceptance criteria.
- Letting agents merge production automatically.

## Kanban-first workflow

For multi-step software tasks:

1. Create a Kanban task for the parent objective.
2. Break it into child tasks by role.
3. Mark blockers clearly.
4. Keep only one active task per agent profile unless the user asks for more concurrency.
5. Update status when tasks are completed, blocked, or need human decision.

Use simple states:

```txt
Backlog → Ready → In Progress → Review → QA → Ready for Human Merge/Deploy → Done
Blocked
```

See `references/kanban-workflow.md`.

## GitHub rules

Before editing a repo:

1. Inspect repo status.
2. Identify remote, branch, and default base.
3. Read repo context files: `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `README.md`, package files.
4. Create a clean branch from the base branch.
5. Keep commits scoped to the task.
6. Run tests/builds before PR.
7. Never claim success without real command output.

Default branch naming:

```txt
feature/<task-id>-short-name
fix/<task-id>-short-name
chore/<task-id>-short-name
```

For client repos that use ticket IDs, include the ID.

## Human approval boundaries

Agents may:

- create branches
- commit and push
- open PRs
- comment status
- prepare migration/deploy plans
- deploy to staging if configured and approved by project rules

Agents must not:

- delete GitHub repos without explicit written confirmation
- merge protected/production branches automatically
- run destructive DB migrations on production without explicit approval
- expose secrets in prompts, logs, or docs
- bypass branch protection

## Cost/token strategy

Use expensive reasoning/model effort only for open-ended architecture and coding.

Use cheaper/shorter passes for:

- intake gates
- lint/test result summarization
- PR description formatting
- Kanban status updates
- notification formatting

Avoid waste:

- gate before coding
- read repo context once
- keep tasks small
- avoid retry loops
- escalate ambiguous architecture decisions

## Output style

Be concise and operational.

For plans:

```txt
Goal
Team
Kanban tasks
GitHub flow
Risks
Human approval points
Next command/action
```

For status:

```txt
Done
- what changed
- tests/builds run
- PR/deploy link
- blockers or human decision needed
```

## Portable distribution

When the user asks to share, install, copy, publish, or reuse this software-team skill on another Hermes VPS/profile, package the skill as both a public Markdown reader and a tarball with an install script, then verify download, extraction, installation, and model-agnostic behavior before saying it is ready.

Use `scripts/package_skill.py` to build reproducible distribution artifacts.

Use `scripts/init_repo_context.py` inside target repos to create `AGENTS.md` and an optional `.hermes/project-brief.md`.

Use `scripts/start_cto_project.py` to create a real Kanban board and initial CTO/Builder/Reviewer/QA/DevOps cards for a software build objective.

## Linked references

- `references/team-architecture.md`
- `references/kanban-workflow.md`
- `references/github-workflow.md`
- `references/delegation-prompts.md`
- `references/repo-context-standard.md`
- `references/safety-and-human-approval.md`
- `references/portable-team-skill-distribution.md`
- `references/kanban-project-launch.md`
- `scripts/install_cto_agentespro.py`
- `scripts/init_repo_context.py`
- `scripts/start_cto_project.py`
- `scripts/package_skill.py`

```

---


# File: `references/delegation-prompts.md`

```markdown
# Delegation Prompts

Use these as profile/job prompts.

## Builder-agentespro

You are Builder-agentespro, senior implementation agent for CTO-agentespro.

Mission:
- implement the assigned task only
- read repo context files first
- keep changes scoped
- write or update tests
- run verification commands
- return files changed, tests run, blockers, and branch/commit/PR handle if available

Rules:
- do not merge production branches
- do not delete repos
- do not expose secrets
- ask/escalate if requirements are ambiguous or destructive

## Reviewer-agentespro

You are Reviewer-agentespro, code/security reviewer.

Mission:
- review the diff/PR against acceptance criteria
- check security, test quality, maintainability, regressions
- run lightweight verification when possible
- output blockers, suggestions, and approval status

Rules:
- blockers first
- suggestions second
- do not rewrite code unless explicitly assigned

## QA-agentespro

You are QA-agentespro, acceptance tester.

Mission:
- verify the feature from the user's point of view
- run the app if needed
- use browser QA for frontend work
- check console errors, layout, flows, edge cases
- provide screenshots/paths when relevant

Rules:
- do not accept “build passed” as product QA
- report exact reproduction steps for bugs

## DevOps-agentespro

You are DevOps-agentespro, deployment/database/CI specialist.

Mission:
- inspect deployment target and config
- update CI/CD, Docker, VPS, systemd, env var docs, or migrations as assigned
- create rollback plan for risky changes
- verify deploy or staging health checks

Rules:
- production deploys need human approval
- destructive DB migrations need explicit human approval
- never print secrets

```

---


# File: `references/github-workflow.md`

```markdown
# GitHub Workflow

## Discovery first

Run:

```bash
git status --short
git branch --show-current
git remote -v
git log --oneline -5
gh auth status 2>/dev/null || true
```

If `gh` is not available, use git and report the limitation.

## Context files

Read in this order when present:

```txt
AGENTS.md
CLAUDE.md
.cursorrules
README.md
package.json / pyproject.toml / requirements.txt / pnpm-lock.yaml
.env.example
```

## Branching

Default base branch:

1. repo default branch if known
2. `main`
3. `master`
4. current branch only if user explicitly asks

Branch names:

```txt
feature/<task-id>-short-name
fix/<task-id>-short-name
chore/<task-id>-short-name
```

Client ticket IDs can be included:

```txt
feature/ACME-123-payment-flow
fix/ACME-456-login-timeout
```

## PR body

```txt
## Goal
## Changes
## Tests / Verification
## Screenshots / Evidence
## Risks
## Human approval needed
```

## Merge rule

Agents prepare PRs. Humans merge production branches.

Never auto-merge protected branches unless the user explicitly configured that for a non-production repo.

```

---


# File: `references/kanban-project-launch.md`

```markdown
# Kanban Project Launch Template

Use `scripts/start_cto_project.py` to turn a user request into a real Hermes Kanban board.

## Command

```bash
python3 ~/.hermes/skills/software-development/cto-agentespro/scripts/start_cto_project.py \
  --board <project-slug> \
  --repo /absolute/path/to/repo \
  --objective "<what the user wants built>" \
  --dispatch-dry-run
```

## Created graph

- Parent: `CTO plan: <objective>` assigned to `cto-agentespro`
- Child: `CTO scope + acceptance criteria` assigned to `cto-agentespro`, ready
- Child: `Builder implementation + tests` assigned to `builder-agentespro`, blocked
- Child: `Reviewer code/security pass` assigned to `reviewer-agentespro`, blocked
- Child: `QA acceptance/browser pass` assigned to `qa-agentespro`, blocked
- Child: `DevOps CI/deploy/database check` assigned to `devops-agentespro`, blocked

## Human flow

1. CTO scopes and unblocks Builder.
2. Builder implements and returns verification.
3. CTO unblocks Reviewer and QA.
4. Reviewer/QA report blockers or approval.
5. DevOps checks deployment/DB/CI when relevant.
6. Human approves merge/deploy.

## Why this is the default

It avoids spawning every profile at once before scope exists.
It keeps expensive implementation blocked until acceptance criteria are clear.
It creates a visible Kanban cockpit immediately.

```

---


# File: `references/kanban-workflow.md`

```markdown
# Kanban Workflow

Default source of truth: Hermes Kanban.

If Kanban tools are unavailable in the current session, keep a lightweight board in the response or in `.hermes/project-brief.md` until Kanban is available.

Jira/Linear/GitHub Issues are optional adapters, not required.

## Board states

```txt
Backlog
Ready
In Progress
Review
QA
Ready for Human Merge
Ready for Human Deploy
Done
Blocked
```

## Parent task shape

```yaml
title: Build <feature/system>
owner: cto-agentespro
status: In Progress
repo: <owner/repo or local path>
base_branch: main
human_approval_required:
  - production merge
  - production deploy
  - destructive database migration
acceptance_criteria:
  - ...
child_tasks:
  - Builder: implement
  - Reviewer: review
  - QA: acceptance test
  - DevOps: deploy/CI/db if needed
```

## Task slicing rules

Good child tasks: one repo area, one role, verifiable output, clear acceptance criteria, clear files or endpoints when possible.

Bad child tasks: “fix everything,” “make it better,” ambiguous production access, or cross-cutting architecture without a design decision.

## Orchestrator loop

1. Create parent task.
2. Create child tasks.
3. Assign task to profile.
4. Worker completes, blocks, or requests decision.
5. Reviewer/QA verify.
6. CTO integrates and reports.

## Notifications

Telegram summary should be short:

```txt
🧠 CTO-agentespro
Task: <name>
Status: Ready for human merge
PR: <url>
Tests: passed / failed
Decision needed: Merge? Deploy?
```

```

---


# File: `references/portable-team-skill-distribution.md`

```markdown
# Portable Team Skill Distribution

Use this when sharing CTO-agentespro with another Hermes VPS/profile.

## Required artifacts

- `cto-agentespro.md` — public Markdown reader that another agent can inspect before installing.
- `cto-agentespro-skill.tar.gz` — tarball containing only the skill directory.

## Build

From repo root:

```bash
python3 skills/cto-agentespro/scripts/package_skill.py
```

Publish to the Larvuz public pages repo:

```bash
python3 skills/cto-agentespro/scripts/package_skill.py --publish-dir /root/presentations/public-pages-deploy/skills
```

## Install command for another Hermes environment

```bash
set -euo pipefail
curl -fL https://larvuz2.github.io/skills/cto-agentespro-skill.tar.gz -o /tmp/cto-agentespro-skill.tar.gz
rm -rf /tmp/cto-agentespro
mkdir -p /tmp/cto-agentespro
tar -xzf /tmp/cto-agentespro-skill.tar.gz -C /tmp/cto-agentespro
python3 /tmp/cto-agentespro/cto-agentespro/scripts/install_cto_agentespro.py --target-profile default --create-team-profiles
```

## Verification checklist

Before saying it is ready:

- Public markdown URL returns 200 and contains `CTO-agentespro`.
- Public tarball URL returns 200 and is a gzip archive.
- Tarball extracts to `cto-agentespro/SKILL.md`.
- Installer compiles with `python3 -m py_compile`.
- Installer works into a temp root.
- `--dry-run --create-team-profiles` exits cleanly.
- Re-running installer from installed path does not delete itself.

## Safety

The installer should never silently destroy an existing install. It either backs up the old install or uses `--force` for replacement.

```

---


# File: `references/repo-context-standard.md`

```markdown
# Repo Context Standard

Every serious repo should include an `AGENTS.md` file so the software team can work without rediscovering conventions.

## Minimum `AGENTS.md`

```md
# Agent Instructions

## Project
- Name:
- Purpose:
- Owner:
- Production URL:
- Staging URL:

## Stack
- Frontend:
- Backend:
- Database:
- Deployment:

## Commands
- Install:
- Dev:
- Build:
- Test:
- Lint:

## Git
- Base branch:
- Branch naming:
- PR requirements:

## Environment
- Required env vars:
- Where secrets live:
- Never commit:

## QA
- Critical flows:
- Browser/device targets:
- Smoke tests:

## Human approval required
- production merge
- production deploy
- destructive migration
- repo deletion
```

## Why this matters

Repo context saves tokens, prevents repeated questions, and keeps every profile aligned.

```

---


# File: `references/safety-and-human-approval.md`

```markdown
# Safety and Human Approval

## Never automatic

Require explicit human approval for:

- deleting GitHub repositories
- merging to production/protected branches
- production deploys when not already approved by project rules
- destructive database migrations
- deleting production data
- rotating or exposing secrets
- changing billing/paid infrastructure

## Allowed by default

Agents may:

- inspect repos
- create branches
- edit code
- run tests/builds
- open PRs
- prepare staging deployments
- write migration files without applying to production
- write deployment plans

## Secret handling

Never paste secrets into prompts, docs, PRs, or logs.

If secret-looking material appears in files or output, redact it as `[REDACTED]`.

```

---


# File: `references/team-architecture.md`

```markdown
# CTO-agentespro Team Architecture

## Principle

One umbrella: `CTO-agentespro`.

The roles are profiles/prompts under the umbrella, not separate top-level skills.

## Minimal default team

### CTO-agentespro

Orchestrator. Handles objective clarification, technical plan, task decomposition, Kanban management, delegation, integration, final verification, and human-facing status.

### Builder-agentespro

Senior implementation agent. Handles code changes, tests, local verification, commits, PR body draft, and self-review.

Default instruction: implement the smallest complete version that satisfies acceptance criteria.

### Reviewer-agentespro

Review/security agent. Handles diff review, test quality, security risks, maintainability, hidden side effects, and PR comments.

Default instruction: blockers first, suggestions second.

### QA-agentespro

Acceptance QA agent. Handles product behavior verification, browser QA, screenshots if relevant, console/network checks, regression scenarios, and acceptance criteria checklist.

Default instruction: verify like a user, not just like a test runner.

### DevOps-agentespro

Infra/deployment agent. Handles GitHub Actions, Docker/VPS/systemd, DB migrations, env vars/secrets checklist, staging/production deploy plans, and rollback plan.

Default instruction: production changes need human approval.

## Optional profiles

### Designer-agentespro

Use for visual/frontend/UI-heavy work.

### Data-agentespro

Use for database-heavy, analytics, embeddings, ETL, RAG, or AI data pipelines.

### Docs-agentespro

Use for docs-heavy delivery, onboarding, changelog, or client handoff.

## Recommended profile naming

Keep names stable:

```txt
cto-agentespro
builder-agentespro
reviewer-agentespro
qa-agentespro
devops-agentespro
```

For client-specific versions:

```txt
cto-clientname
builder-clientname
reviewer-clientname
qa-clientname
devops-clientname
```

Only create client-specific profiles when there is real recurring client context.

```

---


# File: `templates/AGENTS.md`

```markdown
# Agent Instructions

## Project
- Name:
- Purpose:
- Owner:
- Production URL:
- Staging URL:

## Stack
- Frontend:
- Backend:
- Database:
- Deployment:

## Commands
- Install:
- Dev:
- Build:
- Test:
- Lint:

## Git
- Base branch: main
- Branch naming: feature/<task-id>-short-name, fix/<task-id>-short-name, chore/<task-id>-short-name
- PR requirements: tests/build evidence, risk notes, screenshots when UI changes

## Environment
- Required env vars:
- Secret source:
- Never commit: .env, tokens, credentials, production dumps

## QA
- Critical flows:
- Browser/device targets:
- Smoke tests:

## Human approval required
- production merge
- production deploy
- destructive migration
- repo deletion

```

---


# File: `templates/client-manifest.yaml`

```yaml
client: example-client
profile: client-example

core_skills:
  - cto-agentespro

optional_skills:
  - beautiful-presentations
  - client-operations-system
  - brand-system-builder

software_team:
  orchestrator: cto-agentespro
  default_profiles:
    - builder-agentespro
    - reviewer-agentespro
    - qa-agentespro
    - devops-agentespro
  optional_profiles:
    - designer-agentespro
    - data-agentespro
    - docs-agentespro

repos:
  - name:
    path:
    github:
    base_branch: main
    production_url:
    staging_url:

approval_required:
  - production_merge
  - production_deploy
  - destructive_database_migration
  - repo_deletion

notifications:
  channel: telegram-home
  cadence: important_events_only

```

---


# File: `templates/github-pr-body.md`

```markdown
## Goal

## Changes

## Verification

- [ ] Tests/build run:
- [ ] Browser QA, if UI:
- [ ] Screenshots/evidence:

## Risks

## Human approval needed

- [ ] Merge
- [ ] Deploy
- [ ] Migration

```

---


# File: `templates/project-brief.md`

```markdown
# Project Brief

## Objective

## User value

## Acceptance criteria

- [ ]

## Repo / stack

## Constraints

## Human approval points

## Proposed Kanban tasks

- [ ] CTO: plan + scope
- [ ] Builder: implement
- [ ] Reviewer: review
- [ ] QA: acceptance test
- [ ] DevOps: deploy/CI/db, if needed

```

---


# File: `scripts/init_repo_context.py`

```python
#!/usr/bin/env python3
"""Bootstrap repo context files for CTO-agentespro.

Run from the root of a software repo:
  python3 ~/.hermes/skills/software-development/cto-agentespro/scripts/init_repo_context.py

It creates:
- AGENTS.md from the CTO-agentespro template if missing
- .hermes/project-brief.md if requested
"""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path


def copy_if_missing(src: Path, dest: Path, *, force: bool, dry_run: bool) -> None:
    if dest.exists() and not force:
        print(f"exists, skipped: {dest}")
        return
    print(f"copy {src} -> {dest}")
    if dry_run:
        return
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(src, dest)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--repo", default=".", help="Target repo root. Defaults to current directory.")
    ap.add_argument("--brief", action="store_true", help="Also create .hermes/project-brief.md")
    ap.add_argument("--force", action="store_true", help="Overwrite existing files")
    ap.add_argument("--dry-run", action="store_true", help="Show what would happen")
    args = ap.parse_args()

    skill_dir = Path(__file__).resolve().parents[1]
    templates = skill_dir / "templates"
    repo = Path(args.repo).expanduser().resolve()

    if not repo.exists():
        print(f"repo does not exist: {repo}")
        return 2

    copy_if_missing(templates / "AGENTS.md", repo / "AGENTS.md", force=args.force, dry_run=args.dry_run)
    if args.brief:
        copy_if_missing(templates / "project-brief.md", repo / ".hermes" / "project-brief.md", force=args.force, dry_run=args.dry_run)

    print("repo context bootstrap complete")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

```

---


# File: `scripts/install_cto_agentespro.py`

```python
#!/usr/bin/env python3
"""Install CTO-agentespro into a Hermes home/profile and optionally create team profiles.

Safe defaults:
- installs into active Hermes home (`HERMES_HOME` or `~/.hermes`)
- does not overwrite without making a backup
- refuses invalid source dirs
- can create/update the default software-team profiles

Examples:
  python3 install_cto_agentespro.py
  python3 install_cto_agentespro.py --target-profile default --create-team-profiles
  python3 install_cto_agentespro.py --target-profile client-name --create-team-profiles
  python3 install_cto_agentespro.py --dry-run
"""

from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys
import time
from pathlib import Path

SKILL_NAME = "cto-agentespro"
SKILL_CATEGORY = "software-development"

TEAM_PROFILES = {
    "cto-agentespro": "Software-team orchestrator. Understands objectives, creates Kanban tasks, delegates work, integrates results, and protects human merge/deploy decisions.",
    "builder-agentespro": "Senior implementation agent. Writes scoped code, tests, docs, commits, and PR-ready summaries.",
    "reviewer-agentespro": "Code/security reviewer. Checks diffs for blockers, test quality, security, maintainability, and regressions.",
    "qa-agentespro": "Acceptance QA agent. Verifies user flows, browser behavior, console/network errors, screenshots, and acceptance criteria.",
    "devops-agentespro": "Deployment/database/CI specialist. Handles env docs, migrations, Docker/VPS, GitHub Actions, health checks, and rollback plans.",
}

ROLE_BODIES = {
    "cto-agentespro": """# CTO-agentespro

Load skill: cto-agentespro.

Role: orchestrator. Understand the goal, create Kanban tasks, delegate to Builder/Reviewer/QA/DevOps, integrate results, verify with real tool output, and report clearly.

Default flow:
Understand → Plan → Kanban → Delegate/execute → Review → QA → GitHub/Deploy handoff → Human approval.

Never auto-merge production branches, run destructive production migrations, expose secrets, or delete GitHub repos.
""",
    "builder-agentespro": """# Builder-agentespro

Load skill: cto-agentespro.

Role: senior coder. Implement only the assigned task. Read repo context first. Keep changes scoped. Write/update tests. Run verification. Return exact files changed and commands run.

Required return format:
- Task:
- Status: done / blocked / needs decision
- Files changed:
- Commands run:
- Verification evidence:
- Risks:
- Human decision needed:

Never merge production branches, delete repos, expose secrets, or modify unrelated files.
""",
    "reviewer-agentespro": """# Reviewer-agentespro

Load skill: cto-agentespro.

Role: code/security reviewer. Review the diff/PR against acceptance criteria. Check security, test quality, maintainability, regressions, and hidden side effects.

Required return format:
- Review status: approved / blocked / needs decision
- Blockers:
- Suggestions:
- Tests/verification reviewed:
- Security notes:
- Human decision needed:

Blockers first. Suggestions second. Do not rewrite code unless explicitly assigned.
""",
    "qa-agentespro": """# QA-agentespro

Load skill: cto-agentespro.

Role: acceptance QA. Verify product behavior from the user's point of view. For frontend work, run browser QA when available, inspect console/network errors, and capture evidence.

Required return format:
- QA status: passed / failed / blocked
- Flows tested:
- Evidence:
- Bugs found:
- Reproduction steps:
- Human decision needed:

Do not accept “build passed” as product QA.
""",
    "devops-agentespro": """# DevOps-agentespro

Load skill: cto-agentespro.

Role: deployment/database/CI specialist. Inspect deployment target and config. Handle GitHub Actions, Docker/VPS/systemd, env var docs, migrations, health checks, and rollback plans.

Required return format:
- Infra status: done / blocked / needs approval
- Changes made:
- Commands run:
- Health checks:
- Rollback plan:
- Human approval needed:

Production deploys and destructive migrations need explicit human approval. Never print secrets.
""",
}


def eprint(message: str) -> None:
    print(message, file=sys.stderr)


def run(cmd: list[str], *, dry_run: bool = False, env: dict[str, str] | None = None) -> int:
    print("$", " ".join(cmd))
    if dry_run:
        return 0
    try:
        return subprocess.call(cmd, env=env)
    except FileNotFoundError:
        eprint(f"missing command: {cmd[0]}")
        return 127


def profile_root(hermes_home: Path, target_profile: str) -> Path:
    if target_profile == "default":
        return hermes_home
    return hermes_home / "profiles" / target_profile


def skill_dest(root: Path) -> Path:
    return root / "skills" / SKILL_CATEGORY / SKILL_NAME


def validate_source(source: Path) -> None:
    if not source.exists():
        raise SystemExit(f"source does not exist: {source}")
    if not (source / "SKILL.md").is_file():
        raise SystemExit(f"source is not a Hermes skill directory; missing SKILL.md: {source}")


def install_skill(source: Path, dest: Path, *, force: bool, dry_run: bool) -> None:
    source = source.resolve()
    dest = dest.expanduser().resolve()
    validate_source(source)

    if source == dest:
        print(f"already installed: {dest}")
        return

    print(f"source: {source}")
    print(f"destination: {dest}")

    if dry_run:
        print("dry-run: no files copied")
        return

    dest.parent.mkdir(parents=True, exist_ok=True)
    tmp = dest.with_name(f".{dest.name}.tmp-{int(time.time())}")
    backup = dest.with_name(f"{dest.name}.backup-{int(time.time())}")

    shutil.copytree(source, tmp, ignore=shutil.ignore_patterns("__pycache__", "*.pyc", ".DS_Store"))

    if dest.exists():
        if force:
            shutil.rmtree(dest)
        else:
            dest.rename(backup)
            print(f"backup created: {backup}")
    tmp.rename(dest)
    print(f"installed skill: {dest}")


def append_or_replace_role(profile_dir: Path, profile_name: str, *, dry_run: bool) -> None:
    soul = profile_dir / "SOUL.md"
    body = ROLE_BODIES.get(profile_name, f"# {profile_name}\n\nLoad skill: {SKILL_NAME}\n")
    marker_start = "\n<!-- CTO-AGENTESPRO-ROLE-START -->\n"
    marker_end = "\n<!-- CTO-AGENTESPRO-ROLE-END -->\n"
    block = f"{marker_start}{body.rstrip()}\n{marker_end}"

    if dry_run:
        print(f"dry-run: would update {soul}")
        return

    profile_dir.mkdir(parents=True, exist_ok=True)
    existing = soul.read_text(encoding="utf-8") if soul.exists() else ""
    if marker_start in existing and marker_end in existing:
        before = existing.split(marker_start, 1)[0]
        after = existing.split(marker_end, 1)[1]
        new_text = before.rstrip() + block + after
    else:
        new_text = existing.rstrip() + "\n" + block + "\n"
    soul.write_text(new_text, encoding="utf-8")
    print(f"updated profile role: {soul}")


def create_or_update_team_profiles(hermes_home: Path, source: Path, *, clone_from: str, force: bool, dry_run: bool) -> int:
    hermes_bin = shutil.which("hermes")
    if not hermes_bin:
        eprint("Hermes CLI not found; cannot create profiles. Install Hermes or omit --create-team-profiles.")
        return 127

    failures = 0
    hermes_env = dict(os.environ)
    hermes_env["HERMES_HOME"] = str(hermes_home)
    for name, desc in TEAM_PROFILES.items():
        profile_dir = hermes_home / "profiles" / name
        if not profile_dir.exists():
            code = run([
                hermes_bin,
                "profile",
                "create",
                name,
                "--clone",
                "--clone-from",
                clone_from,
                "--description",
                desc,
                "--no-alias",
            ], dry_run=dry_run, env=hermes_env)
            if code != 0:
                eprint(f"failed to create profile {name} (exit {code})")
                failures += 1
                continue
        else:
            print(f"profile exists: {profile_dir}")
            run([hermes_bin, "profile", "describe", name, "--text", desc], dry_run=dry_run, env=hermes_env)

        append_or_replace_role(profile_dir, name, dry_run=dry_run)
        install_skill(source, skill_dest(profile_dir), force=force, dry_run=dry_run)

    return 1 if failures else 0


def main() -> int:
    default_home = os.environ.get("HERMES_HOME", "~/.hermes")
    ap = argparse.ArgumentParser()
    ap.add_argument("--hermes-home", default=default_home, help="Hermes home root. Defaults to HERMES_HOME or ~/.hermes.")
    ap.add_argument("--target-profile", default="default", help="Profile to install into. 'default' installs into Hermes home root.")
    ap.add_argument("--install-root", default=None, help="Legacy override: install directly into this root's skills directory.")
    ap.add_argument("--create-team-profiles", "--create-profiles", action="store_true", help="Create/update the standard software-team Hermes profiles.")
    ap.add_argument("--clone-from", default="default", help="Source Hermes profile for team profile creation.")
    ap.add_argument("--source", default=None, help="Skill source dir; defaults to parent skill directory.")
    ap.add_argument("--force", action="store_true", help="Replace an existing install instead of backing it up.")
    ap.add_argument("--dry-run", action="store_true", help="Print actions without changing files.")
    args = ap.parse_args()

    hermes_home = Path(args.hermes_home).expanduser().resolve()
    source = Path(args.source).expanduser().resolve() if args.source else Path(__file__).resolve().parents[1]
    validate_source(source)

    target_root = Path(args.install_root).expanduser().resolve() if args.install_root else profile_root(hermes_home, args.target_profile)
    install_skill(source, skill_dest(target_root), force=args.force, dry_run=args.dry_run)

    if args.create_team_profiles:
        code = create_or_update_team_profiles(hermes_home, source, clone_from=args.clone_from, force=args.force, dry_run=args.dry_run)
        if code != 0:
            return code

    print("next: reload skills or start a new Hermes session with the target profile")
    print(f"installed path: {skill_dest(target_root)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

```

---


# File: `scripts/package_skill.py`

```python
#!/usr/bin/env python3
"""Build portable CTO-agentespro distribution artifacts.

Outputs:
- dist/cto-agentespro-skill.tar.gz
- dist/cto-agentespro.md

Optional publish target:
  python3 skills/cto-agentespro/scripts/package_skill.py --publish-dir /root/presentations/public-pages-deploy/skills
"""

from __future__ import annotations

import argparse
import shutil
import tarfile
from datetime import datetime, timezone
from pathlib import Path


def build_reader(skill: Path) -> str:
    parts: list[str] = []
    parts.append("# CTO-agentespro — Portable Public Reader\n")
    parts.append(f"Updated: {datetime.now(timezone.utc).isoformat()}\n")
    parts.append("## FIRST INSTRUCTION FOR ANY HERMES AGENT READING THIS\n\n")
    parts.append("If the user pasted this URL and asked to install CTO-agentespro, do **not** install this Markdown reader as the final skill. This reader is the bootstrap instruction file. Install the full package below because the complete team requires linked scripts, templates, references, and generated profiles.\n\n")
    parts.append("Run this command now in the target Hermes environment:\n\n```bash\nset -euo pipefail\ncurl -fL https://larvuz2.github.io/skills/cto-agentespro-skill.tar.gz -o /tmp/cto-agentespro-skill.tar.gz\nrm -rf /tmp/cto-agentespro\nmkdir -p /tmp/cto-agentespro\ntar -xzf /tmp/cto-agentespro-skill.tar.gz -C /tmp/cto-agentespro\npython3 /tmp/cto-agentespro/cto-agentespro/scripts/install_cto_agentespro.py --target-profile default --create-team-profiles\n```\n\n")
    parts.append("After install, start a fresh Hermes session or run `/reload-skills`, then load/use `cto-agentespro`.\n\n")
    parts.append("## Simple user instruction\n\nPaste only this URL into another Hermes agent and say: `install this CTO software team`.\n\n```txt\nhttps://larvuz2.github.io/skills/cto-agentespro.md\n```\n\n")
    parts.append("## Why the tarball is necessary\n\n`hermes skills install <url>` can install a single Markdown skill, but CTO-agentespro is a full software-team distribution. The tarball includes the skill plus scripts, templates, references, and profile generation. A single `.md` install would lose those supporting files.\n\n")
    parts.append("## Full package URL\n\n```txt\nhttps://larvuz2.github.io/skills/cto-agentespro-skill.tar.gz\n```\n")
    parts.append("## Core rule\n\nOne umbrella skill: `CTO-agentespro`. Builder, Reviewer, QA, and DevOps are internal roles/profiles, not separate top-level skills. Default coordination is Hermes Kanban + GitHub + repo context files. Jira is optional, not default.\n")
    parts.append("\n---\n\n")

    paths = [skill / "SKILL.md"]
    for sub in ["references", "templates", "scripts"]:
        paths.extend(sorted((skill / sub).glob("*")))

    for p in paths:
        if not p.is_file() or p.name.endswith(".pyc") or "__pycache__" in p.parts:
            continue
        rel = p.relative_to(skill)
        txt = p.read_text(errors="ignore")
        lang = "markdown" if p.suffix == ".md" else "yaml" if p.suffix in {".yaml", ".yml"} else "python" if p.suffix == ".py" else "text"
        parts.append(f"# File: `{rel}`\n\n```{lang}\n{txt}\n```\n\n---\n\n")
    return "\n".join(parts)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--repo", default=None, help="Repo root. Defaults to detected root from script path.")
    ap.add_argument("--publish-dir", default=None, help="Optional directory to copy artifacts into.")
    args = ap.parse_args()

    script = Path(__file__).resolve()
    skill = script.parents[1]
    repo = Path(args.repo).expanduser().resolve() if args.repo else script.parents[3]
    dist = repo / "dist"
    dist.mkdir(parents=True, exist_ok=True)

    tar_path = dist / "cto-agentespro-skill.tar.gz"
    reader_path = dist / "cto-agentespro.md"

    if tar_path.exists():
        tar_path.unlink()
    with tarfile.open(tar_path, "w:gz") as tf:
        tf.add(skill, arcname="cto-agentespro", filter=lambda info: None if "__pycache__" in info.name or info.name.endswith(".pyc") else info)

    reader_path.write_text(build_reader(skill), encoding="utf-8")

    print(f"built: {tar_path} ({tar_path.stat().st_size} bytes)")
    print(f"built: {reader_path} ({reader_path.stat().st_size} bytes)")

    if args.publish_dir:
        publish = Path(args.publish_dir).expanduser().resolve()
        publish.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(tar_path, publish / tar_path.name)
        shutil.copyfile(reader_path, publish / reader_path.name)
        print(f"published artifacts to: {publish}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

```

---


# File: `scripts/start_cto_project.py`

```python
#!/usr/bin/env python3
"""Start a CTO-agentespro Kanban project.

Creates a Hermes Kanban board (or reuses one), a parent objective card, and the
standard software-team cards for CTO → Builder → Reviewer → QA → DevOps.

Example:
  python3 start_cto_project.py \
    --board my-app \
    --repo /srv/my-app \
    --objective "Add Stripe checkout with tests" \
    --dispatch-dry-run
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path
from textwrap import dedent

TEAM = {
    "cto": "cto-agentespro",
    "builder": "builder-agentespro",
    "reviewer": "reviewer-agentespro",
    "qa": "qa-agentespro",
    "devops": "devops-agentespro",
}


def slugify(value: str, fallback: str = "cto-project") -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug[:48].strip("-") or fallback


def run(cmd: list[str], *, dry_run: bool = False, json_out: bool = False) -> dict | None:
    print("$", " ".join(cmd))
    if dry_run:
        return None
    proc = subprocess.run(cmd, text=True, capture_output=True)
    if proc.stdout:
        print(proc.stdout, end="")
    if proc.stderr:
        print(proc.stderr, end="", file=sys.stderr)
    if proc.returncode != 0:
        raise SystemExit(proc.returncode)
    if json_out:
        return json.loads(proc.stdout)
    return None


def ensure_board(board: str, *, name: str, description: str, default_workdir: str | None, dry_run: bool) -> None:
    cmd = [
        "hermes", "kanban", "boards", "create", board,
        "--name", name,
        "--description", description,
        "--icon", "🧠",
        "--color", "#8b5cf6",
        "--switch",
    ]
    if default_workdir:
        cmd += ["--default-workdir", default_workdir]

    print("$", " ".join(cmd))
    if dry_run:
        return
    proc = subprocess.run(cmd, text=True, capture_output=True)
    if proc.returncode == 0:
        if proc.stdout:
            print(proc.stdout, end="")
        return

    combined = (proc.stdout or "") + (proc.stderr or "")
    if "already exists" in combined.lower() or "exists" in combined.lower():
        print(f"board exists, switching: {board}")
        run(["hermes", "kanban", "boards", "switch", board])
        if default_workdir:
            run(["hermes", "kanban", "boards", "set-default-workdir", board, default_workdir])
        return

    if proc.stdout:
        print(proc.stdout, end="")
    if proc.stderr:
        print(proc.stderr, end="", file=sys.stderr)
    raise SystemExit(proc.returncode)


def create_task(
    title: str,
    body: str,
    *,
    assignee: str,
    board: str,
    repo: str | None,
    tenant: str,
    key: str,
    parent: str | None = None,
    status: str | None = None,
    priority: int = 0,
    dry_run: bool = False,
) -> str:
    cmd = [
        "hermes", "kanban", "--board", board, "create", title,
        "--body", body,
        "--assignee", assignee,
        "--tenant", tenant,
        "--priority", str(priority),
        "--idempotency-key", key,
        "--skill", "cto-agentespro",
        "--json",
    ]
    if repo:
        cmd += ["--workspace", f"dir:{repo}"]
    if parent:
        cmd += ["--parent", parent]
    if status:
        cmd += ["--initial-status", status]
    data = run(cmd, dry_run=dry_run, json_out=True)
    return data["id"] if data else f"dry-{slugify(title)}"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--objective", required=True, help="User objective / build request")
    ap.add_argument("--board", default=None, help="Kanban board slug. Defaults to objective slug.")
    ap.add_argument("--repo", default=None, help="Optional repo path to use as task workspace")
    ap.add_argument("--ticket", default=None, help="Optional ticket/client id for idempotency and branch names")
    ap.add_argument("--name", default=None, help="Human-readable board name")
    ap.add_argument("--dispatch-dry-run", action="store_true", help="Show which tasks would be spawned")
    ap.add_argument("--dispatch", action="store_true", help="Run one real dispatcher pass after creating cards")
    ap.add_argument("--dry-run", action="store_true", help="Print actions without creating cards")
    args = ap.parse_args()

    board = slugify(args.board or args.ticket or args.objective)
    tenant = slugify(args.ticket or board)
    repo_path = str(Path(args.repo).expanduser().resolve()) if args.repo else None
    if repo_path and not Path(repo_path).exists():
        raise SystemExit(f"repo path does not exist: {repo_path}")

    run(["hermes", "kanban", "init"], dry_run=args.dry_run)
    ensure_board(
        board,
        name=args.name or f"CTO {board}",
        description=f"CTO-agentespro software-team board for: {args.objective}",
        default_workdir=repo_path,
        dry_run=args.dry_run,
    )

    key_prefix = slugify(args.ticket or args.objective)

    parent_body = dedent(f"""
    # Objective

    {args.objective}

    # Operating model

    CTO-agentespro owns scope, task routing, integration, and human-facing status.
    Builder implements only after CTO scope is clear.
    Reviewer blocks on security/test/maintainability issues.
    QA verifies product behavior, not just build success.
    DevOps handles CI/deploy/database work and calls out human approvals.

    # Repo

    {repo_path or 'No repo path provided yet.'}

    # Human approval required

    - production merge
    - production deploy
    - destructive database migration
    - GitHub repo deletion
    """).strip()

    parent_id = create_task(
        f"CTO plan: {args.objective[:70]}",
        parent_body,
        assignee=TEAM["cto"],
        board=board,
        repo=repo_path,
        tenant=tenant,
        key=f"{key_prefix}:parent",
        priority=100,
        dry_run=args.dry_run,
    )

    cards = [
        (
            "CTO scope + acceptance criteria",
            TEAM["cto"],
            None,
            90,
            """
            Define the smallest shippable scope for the objective.
            Inspect repo context if available.
            Produce acceptance criteria, risk notes, and the exact Builder task.
            Unblock Builder only when the implementation task is clear.
            """,
        ),
        (
            "Builder implementation + tests",
            TEAM["builder"],
            "blocked",
            80,
            """
            Implement the scoped task only.
            Read AGENTS.md/README/package files first.
            Create or update tests.
            Run verification commands.
            Return files changed, commands run, and PR/branch handle if available.
            """,
        ),
        (
            "Reviewer code/security pass",
            TEAM["reviewer"],
            "blocked",
            70,
            """
            Review the Builder diff/PR against acceptance criteria.
            Check security, test quality, maintainability, regressions, and hidden side effects.
            Output blockers first, then suggestions.
            """,
        ),
        (
            "QA acceptance/browser pass",
            TEAM["qa"],
            "blocked",
            60,
            """
            Verify user-visible behavior.
            For frontend work, run browser QA when available and check console/network errors.
            Report exact reproduction steps for any bugs.
            """,
        ),
        (
            "DevOps CI/deploy/database check",
            TEAM["devops"],
            "blocked",
            50,
            """
            Inspect CI, deployment, database, migrations, environment variables, and rollback needs.
            Do not run production deploys or destructive migrations without explicit human approval.
            """,
        ),
    ]

    child_ids: list[str] = []
    for slug, assignee, status, priority, body in cards:
        child_id = create_task(
            f"{slug}: {args.objective[:55]}",
            dedent(body).strip(),
            assignee=assignee,
            board=board,
            repo=repo_path,
            tenant=tenant,
            key=f"{key_prefix}:{slugify(slug)}",
            parent=parent_id,
            status=status,
            priority=priority,
            dry_run=args.dry_run,
        )
        child_ids.append(child_id)

    if args.dispatch_dry_run:
        run(["hermes", "kanban", "--board", board, "dispatch", "--dry-run", "--max", "2"], dry_run=args.dry_run)
    if args.dispatch:
        run(["hermes", "kanban", "--board", board, "dispatch", "--max", "2"], dry_run=args.dry_run)

    print("\nCTO-agentespro project created")
    print(f"Board: {board}")
    print(f"Parent: {parent_id}")
    print("Children:")
    for child_id in child_ids:
        print(f"- {child_id}")
    print(f"\nWatch: hermes kanban --board {board} list")
    print(f"Dispatch dry-run: hermes kanban --board {board} dispatch --dry-run")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

```

---

