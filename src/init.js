#!/usr/bin/env node
// memory-infrastructure-skill: init
// Creates cron jobs for three memory layers

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(process.env.OPENCLAW_WORKSPACE || '.', 'memory-infrastructure.yaml');

async function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    // 默认配置
    return {
      memory: {
        daily: { cron: '0 23 * * *', timezone: 'Asia/Shanghai' },
        weekly: { cron: '0 22 * * 0', timezone: 'Asia/Shanghai' },
        hourly: { cron: '0 10,13,16,19,22 * * *', timezone: 'Asia/Shanghai' }
      },
      qmd: { collections: ['memory', 'skills', 'openclaw'], maxResults: 10 }
    };
  }
  return YAML.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
}

async function createCronJob(profile, name, expr, payload) {
  const cmd = `npx openclaw cron add --profile ${profile} --name "${name}" --expr "${expr}" --message "${payload}"`;
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) reject(err);
      else resolve(stdout);
    });
  });
}

async function init() {
  try {
    const config = await loadConfig();
    const profile = process.env.OPENCLAW_PROFILE || 'main';

    // Daily Sync
    await createCronJob(profile, 'memory-daily-sync', config.memory.daily.cron,
      'DAILY MEMORY SYNC — sessions_list + sessions_history → distill → memory/YYYY-MM-DD.md → qmd update && qmd embed');

    // Weekly Compound
    await createCronJob(profile, 'memory-weekly-compound', config.memory.weekly.cron,
      'WEEKLY MEMORY COMPOUND — read week logs → update MEMORY.md → qmd update && qmd embed');

    // Hourly Micro-Sync
    await createCronJob(profile, 'memory-hourly-micro', config.memory.hourly.cron,
      'HOURLY MICRO-SYNC — check last 3h sessions → append summary → qmd update && embed (or do nothing)');

    console.log('✅ Memory infrastructure initialized');
    console.log(`Profile: ${profile}`);
    console.log('Cron jobs created.');
  } catch (err) {
    console.error('❌ Init failed:', err.message);
    process.exit(1);
  }
}

init();