# Memory Infrastructure Skill

> 三层记忆系统 + 语义搜索，OpenClaw 永不失忆

## 功能
自动化记忆捕获、蒸馏和检索，确保 agent 永不丢失上下文。

## 三层架构

### Layer 1: Daily Context Sync（每日 23:00）
- 拉取当天所有 sessions
- 蒸馏关键决策、action items、对话
- 写入 `memory/YYYY-MM-DD.md`
- 执行 `qmd update && qmd embed`

### Layer 2: Weekly Memory Compound（每周日 22:00）
- 读取本周 7 天日志
- 提取新偏好、决策模式、项目状态变化
- 更新 `MEMORY.md`（精华）
- 剪枝过时信息
- 执行 `qmd update && qmd embed`

### Layer 3: Hourly Micro-Sync（工作时间 10,13,16,19,22）
- 检查最近 3 小时活动
- 如有重要事件，append 摘要到今日日志
- 执行 `qmd update && qmd embed`
- 如无活动，静默退出

### 底层: qmd Semantic Search
- 强制规则：`qmd query "<question>"` 检索历史
- 禁止暴力读取文件
- 自动索引保持新鲜

## 命令
```
/memory-sync init              # 初始化（创建 cron 规则）
/memory-sync run [layer]       # 立即执行（all/daily/weekly/hourly）
/memory-sync status            # 查看 cron 状态
/memory-sync configure         # 配置时间、qmd 路径
```

## 配置示例
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

## 文件结构
```
workspace/
├── MEMORY.md                  # 主记忆（自动注入）
├── memory/
│   ├── 2026-02-10.md          # 每日日志
│   └── ...
└── .beads/                    # qmd 索引
```

## 规则（必须添加到 AGENTS.md）
```markdown
## Memory Retrieval (MANDATORY)
Never read MEMORY.md or memory/*.md in full for lookups. Use qmd:
1. qmd query "<question>" — combined search with reranking
2. qmd get <file>:<line> -l 20 — pull only the needed snippet
3. Only if qmd returns nothing: fall back to reading files
```

---

*Skill: memory-infrastructure*
*Created: 2026-02-11 00:51*
*Inspired by @calicastle*