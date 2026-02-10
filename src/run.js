#!/usr/bin/env node
// memory-infrastructure-skill: run
// Execute a memory layer (daily|weekly|hourly|all)

const { exec } = require('child_process');

const layer = process.argv[2];

async function runLayer(layer) {
  const profile = process.env.OPENCLAW_PROFILE || 'main';
  const payloads = {
    daily: 'DAILY MEMORY SYNC — sessions_list + sessions_history → distill → memory/YYYY-MM-DD.md → qmd update && qmd embed',
    weekly: 'WEEKLY MEMORY COMPOUND — read week logs → update MEMORY.md → qmd update && qmd embed',
    hourly: 'HOURLY MICRO-SYNC — check last 3h sessions → append summary → qmd update && embed (or do nothing)'
  };

  const messages = (layer === 'all') ? Object.values(payloads) : [payloads[layer]];
  if (!messages[0]) {
    console.error('Invalid layer. Choose: all|daily|weekly|hourly');
    process.exit(1);
  }

  // Use agentTurn to execute in isolated session
  for (const msg of messages) {
    const cmd = `npx openclaw sessions_spawn --profile ${profile} --model openrouter/stepfun/step-3.5-flash:free --task "${msg}"`;
    exec(cmd, (err, stdout, stderr) => {
      if (err) console.error('Error:', err.message);
      else console.log(stdout);
    });
  }
}

runLayer(layer);