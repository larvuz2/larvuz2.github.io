# anthropic-cybersecurity-skills — Portable Public Reader

Updated: 2026-09-06T01:06:53.782409+00:00

Defensive cybersecurity corpus wrapper (Apache-2.0 upstream mukul975/Anthropic-Cybersecurity-Skills) with authorized-use boundaries.

## FIRST INSTRUCTION FOR ANY HERMES AGENT READING THIS


This Markdown reader is the bootstrap file. Install the full package (SKILL.md + references + scripts) with the command below, then start a fresh session or run `/reload-skills`.


```bash
set -euo pipefail
curl -fL https://larvuz2.github.io/skills/anthropic-cybersecurity-skills-skill.tar.gz -o /tmp/anthropic-cybersecurity-skills-skill.tar.gz
mkdir -p ~/.hermes/skills/cybersecurity
rm -rf ~/.hermes/skills/cybersecurity/anthropic-cybersecurity-skills
tar -xzf /tmp/anthropic-cybersecurity-skills-skill.tar.gz -C ~/.hermes/skills/cybersecurity
ls ~/.hermes/skills/cybersecurity/anthropic-cybersecurity-skills/SKILL.md
```


## Simple user instruction

Paste this URL into a Hermes agent and say: `install this skill`.

```txt
https://larvuz2.github.io/skills/anthropic-cybersecurity-skills.md
```

## Full package URL

```txt
https://larvuz2.github.io/skills/anthropic-cybersecurity-skills-skill.tar.gz
```

---


## Authorized-use boundary

Use only on systems you own or have written authorization to assess. Defensive, non-destructive, evidence-based. Refuse stealth, credential theft, exfiltration, malware, evasion, or unauthorized targeting. Upstream corpus is Apache-2.0; the tarball includes references/LICENSE.

---


# File: `SKILL.md`

```markdown
---
name: anthropic-cybersecurity-skills
description: "Use for authorized cybersecurity work: defensive security, vulnerability management, incident response, threat detection, cloud/app/API/mobile/security testing, DFIR, AI security, and security governance. This is a patched Hermes wrapper around mukul975/Anthropic-Cybersecurity-Skills with explicit authorized-use boundaries."
version: 1.2.0-hermes-phase1
author: mahipal + Larvuz patch
license: Apache-2.0
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [cybersecurity, defensive-security, vulnerability-management, incident-response, threat-detection, authorized-testing]
    source_repo: https://github.com/mukul975/Anthropic-Cybersecurity-Skills
    source_commit: 04450304b12645cb2b974ab96d28c0664758a88d
    phase1_patch: authorized-use-boundary-in-all-imported-skills
---

# Anthropic Cybersecurity Skills — Hermes Wrapper

This installs the `mukul975/Anthropic-Cybersecurity-Skills` corpus as a Hermes-compatible wrapper skill instead of registering 754 individual skills into the global skill prompt.

## Phase-1 Safety Patch

Every imported `references/cybersecurity-skills/*/SKILL.md` file has an added **Authorized-use Boundary** section.

Default behavior:
- Use only for systems Gus owns or has explicit written authorization to assess.
- Keep testing non-destructive and evidence-based.
- Use synthetic accounts, synthetic tokens, lab targets, screenshots, and logs instead of real data theft or harm.
- If a request asks for stealth, persistence, credential theft, real exfiltration, malware deployment, evasion, destructive impact, or unauthorized targeting, refuse that part and redirect to defensive alternatives: scoping, detection, hardening, logging, recovery, or safe lab simulation.

## How to Use

1. Identify the security domain or vulnerability class.
2. Search the linked corpus under `references/cybersecurity-skills/` for the closest skill.
3. Load/read that skill file directly when needed.
4. Apply the authorized-use boundary before following any workflow.

Useful corpus files:
- `references/README.md` — upstream overview.
- `references/index.json` — upstream skill index.
- `references/ATTACK_COVERAGE.md` — MITRE ATT&CK coverage.
- `references/cybersecurity-skills/<skill-name>/SKILL.md` — individual skill playbooks.
- `references/hermes-local-security-hardening.md` — low-risk Hermes security hardening quick pass for Gus: redaction flags, destructive confirmations, file permissions, exposed API ports, backup/verify pattern.

## Fast Search Examples

```bash
python ~/.hermes/skills/cybersecurity/anthropic-cybersecurity-skills/scripts/search_cyber_skills.py jwt
python ~/.hermes/skills/cybersecurity/anthropic-cybersecurity-skills/scripts/search_cyber_skills.py "incident response" --limit 20
```

```bash
find ~/.hermes/skills/cybersecurity/anthropic-cybersecurity-skills/references/cybersecurity-skills -maxdepth 2 -name SKILL.md | wc -l
```

```

---


# File: `references/hermes-local-security-hardening.md`

```markdown
# Hermes Local Security Hardening — Low-Risk Phase 1

Use this reference when Gus asks to make Hermes “more secure” but explicitly wants simple, low-complexity, high-impact changes that should not break anything.

## Scope

This is a configuration and exposure quick pass, not a source-code audit.

Prioritize:
- Secret/PII redaction
- Destructive-action confirmations
- Sensitive file permissions
- Listening-port exposure
- Gateway/API server binding risk
- Backups before config edits
- Verification that Hermes still starts/loads

Avoid unless explicitly approved:
- Disabling platforms/tools Gus actively uses
- Restarting gateway during an active conversation unless needed
- Binding public API ports to localhost if external clients may depend on them
- Changing provider/model/auth settings
- Rotating credentials without user coordination

## Low-risk audit checklist

1. Check config and env paths:
   - `hermes config path`
   - `hermes config env-path`

2. Check sensitive file modes:
   - `~/.hermes/config.yaml`
   - `~/.hermes/.env`
   - `~/.hermes/auth.json`
   - `~/.git-credentials`
   - Expected: `600` for files, `700` for private dirs.

3. Check current defensive flags:
   - `security.redact_secrets` should be `true`
   - `security.allow_private_urls` should usually be `false`
   - `privacy.redact_pii` should usually be `true` for gateway contexts
   - `approvals.destructive_slash_confirm` should be `true`
   - `approvals.mode` should not be `off` unless Gus explicitly wants YOLO behavior

4. Check listening ports:
   - `ss -ltnp`
   - Look for Hermes/API/dashboard ports on `0.0.0.0` vs `127.0.0.1`.
   - Public `0.0.0.0` API bindings are high-impact findings, but do not change them blindly if integrations may depend on direct access.

5. Verify service state:
   - `hermes status --all`
   - `hermes config check`

## Safe patch pattern

Before edits:

```bash
cp -p ~/.hermes/config.yaml ~/.hermes/config.yaml.bak.security-phase1-$(date +%Y%m%d-%H%M%S)
```

Typical safe config patches:

```bash
hermes config set privacy.redact_pii true
hermes config set approvals.destructive_slash_confirm true
```

Then verify:

```bash
hermes config check
hermes status --all
```

## API server caution

If `API_SERVER_ENABLED=true`, `API_SERVER_HOST=0.0.0.0`, and CORS allows `*`, flag it clearly as the next high-impact item.

Do not immediately bind it to `127.0.0.1` if Gus has external clients, dashboards, webhooks, Caddy routes, or Lovable/agent integrations that may call the API directly. Recommend approval first:

- bind API server to `127.0.0.1`
- expose only through Caddy / controlled domain if needed
- tighten CORS to known domains
- verify existing integrations after restart

## Reporting style for Gus

Keep it simple:
- “Patched now”
- “Verified”
- “Important thing I did not patch yet”
- “Next safe patch if you approve”

Do not over-explain. Separate real changes from findings not changed.
```

---


# File: `scripts/search_cyber_skills.py`

```python
#!/usr/bin/env python3
"""Search the imported Anthropic Cybersecurity Skills corpus.

Usage:
  python scripts/search_cyber_skills.py jwt
  python scripts/search_cyber_skills.py "incident response" --limit 20
"""
from __future__ import annotations

import argparse
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "references" / "cybersecurity-skills"


def summarize(path: Path, query: str) -> str:
    text = path.read_text(encoding="utf-8", errors="ignore")
    title = path.parent.name
    for line in text.splitlines():
        if line.startswith("# "):
            title = line[2:].strip()
            break
    q = query.lower()
    hit = ""
    for line in text.splitlines():
        clean = line.strip()
        if clean and q in clean.lower() and not clean.startswith("---"):
            hit = clean[:180]
            break
    rel = path.relative_to(Path(__file__).resolve().parents[1])
    return f"{title}\n  path: {rel}\n  match: {hit}"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("query", help="keyword or phrase to search")
    ap.add_argument("--limit", type=int, default=15)
    args = ap.parse_args()

    results = []
    q = args.query.lower()
    for path in sorted(ROOT.glob("*/SKILL.md")):
        text = path.read_text(encoding="utf-8", errors="ignore")
        if q in text.lower():
            results.append(path)

    print(f"matches: {len(results)}")
    for path in results[: args.limit]:
        print("\n" + summarize(path, args.query))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

```

---

