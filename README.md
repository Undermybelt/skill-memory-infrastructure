# Memory Infrastructure Skill

OpenClaw 永不失忆三层记忆系统。

## Features
- ✅ Daily Context Sync (23:00)
- ✅ Weekly Memory Compound (周日 22:00)
- ✅ Hourly Micro-Sync (10,13,16,19,22)
- ✅ qmd Semantic Search integration
- ✅强制语义检索规则

## Quick Start

```bash
# 初始化（创建 cron）
/memory-sync init

# 查看状态
/memory-sync status

# 立即执行
/memory-sync run daily
/memory-sync run weekly
/memory-sync run hourly
```

## How It Works

### Layer 1: Daily Sync
每天 23:00 自动捕获当天所有 session，写入 `memory/YYYY-MM-DD.md` 并更新 qmd 索引。

### Layer 2: Weekly Compound
每周日 22:00 蒸馏本周日志，更新 `MEMORY.md`（长期记忆），保持索引新鲜。

### Layer 3: Hourly Micro-Sync
工作时间每小时检查，如有重要活动立即捕获，防止遗漏。

### qmd Integration
所有记忆写入后自动 `qmd update && qmd embed`，确保语义搜索立即可用。

## Configuration

编辑 `memory-infrastructure.yaml`（自动生成）：

```yaml
memory:
  daily:
    cron: "0 23 * * *"
    timezone: "Asia/Shanghai"
  weekly:
    cron: "0 22 * * 0"
    timezone: "Asia/Shanghai"
  hourly:
    cron: "0 10,13,16,19,22 * * *"
    timezone: "Asia/Shanghai"
qmd:
  collections: ["memory", "skills", "openclaw"]
  maxResults: 10
```

## Memory Retrieval Rule

必须添加到 `AGENTS.md`：

```markdown
## Memory Retrieval (MANDATORY)
Never read MEMORY.md or memory/*.md in full for lookups. Use qmd:
1. qmd query "<question>" — combined search with reranking
2. qmd get <file>:<line> -l 20 — pull only the needed snippet
3. Only if qmd returns nothing: fall back to reading files
```

## License
MIT

---

*Inspired by @calicastle's three-layer memory architecture*
*Created: 2026-02-11 00:51*