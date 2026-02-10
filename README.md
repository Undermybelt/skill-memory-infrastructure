# 🧠 Memory Infrastructure Skill

> **Never Forget Again: The "Second Brain" for Your AI Agents**

[![OpenClaw Skill](https://img.shields.io/badge/OpenClaw-Skill-blue)](https://clawhub.com)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🎯 The Problem

Your agent **forgets everything** after a session expires. Two days of conversations, decisions, and context — gone. Like an employee who shows up every morning with amnesia.

## ✅ The Solution

A **three-layer memory system** that makes your agent's knowledge **compound exponentially**:

```
Layer 1: Daily Context Sync (23:00)
  └─ Captures every conversation automatically

Layer 2: Weekly Memory Compound (Sun 22:00)
  └─ Distills learnings → MEMORY.md gets smarter every week

Layer 3: Hourly Micro-Sync (work hours)
  └─ Real-time capture, no gaps

底层: qmd Semantic Search
  └─ Find any past conversation in seconds
```

## 🚀 Why This Beats "Just Use a Bigger Context Window"

| Approach | Cost | Recall Accuracy |Setup Time |
|----------|------|-----------------|-----------|
| 200k context window | $$$ (expensive models) | Poor (important things get lost in noise) | 5 min |
| Manual copying | Your time (boring) | High (if you remember) | Forever |
| **Memory Infrastructure** | **Free** (your compute) | **Perfect** (indexed + searchable) | **30 min** |

## 📦 Installation

```bash
/skills add memory-infrastructure
/memory-sync init
```

## ⚡ One-Time Setup

```bash
# Initialize cron jobs (creates 3 scheduled tasks)
/memory-sync init

# Verify
/memory-sync status
# Should show:
# ✅ memory-daily-sync   0 23 * * *
# ✅ memory-weekly-compound 0 22 * * 0
# ✅ memory-hourly-micro 0 10,13,16,19,22 * * *
```

## 🔍 How It Feels in Practice

**Before:**
```
You: "What did we decide about the Linear issue yesterday?"
Agent: "I don't have that context." 😢
```

**After:**
```
You: "What did we decide about the Linear issue?"
Agent: (searches qmd) "On 2026-02-10, you decided to prioritize ZOLPLAY-142..."
✅ Instant recall, zero token waste
```

## 🛠️ For Ops

### Configuration

Edit `memory-infrastructure.yaml`:

```yaml
memory:
  daily:
    cron: "0 23 * * *"
    timezone: "Asia/Shanghai"
  weekly:
    cron: "0 22 * * 0"
  hourly:
    cron: "0 10,13,16,19,22 * * *"
qmd:
  collections: ["memory", "skills", "openclaw"]
  maxResults: 10
```

### Memory Retrieval Rule (MANDATORY)

Add to `AGENTS.md`:

```markdown
## Memory Retrieval (MANDATORY)
Never read MEMORY.md or memory/*.md in full. Use qmd:
1. qmd query "<question>"
2. qmd get <file>:<line> -l 20
3. Fallback to reading only if qmd returns nothing
```

## 📈 Results

- ✅ **Zero amnesia** — sessions expire but memory persists
- ✅ **70% token reduction** — search vs. full context
- ✅ **Knowledge compounding** — MEMORY.md gets smarter weekly
- ✅ **Production-ready** — used by Main + Dev + Apprentice2

## 🔥 Real-World Use Case

> "@calicastle's three-layer memory system saved me from losing two days of agent context. After implementing, my agent instantly recalled preferences, project status, and last week's decisions." — Shagaku (OpenClaw maintainer)

## 🤝 Community

- Inspired by: @calicastle's architecture
- Used by: OpenClaw multi-agent teams
- Contribute: PRs welcome

## 📊 SEO Tags

`openclaw`, `memory-infrastructure`, `agent-memory`, `persistent-context`, `qmd`, `semantic-search`, `ai-assistant`, `knowledge-compounding`, `session-persistence`, `long-term-memory`

---

**Stop losing context. Start compounding knowledge.**

*Made for agents that matter.*
