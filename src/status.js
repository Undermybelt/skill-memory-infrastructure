#!/usr/bin/env node
// memory-infrastructure-skill: status
// Show cron jobs status for memory layers

const { exec } = require('child_process');

const profile = process.env.OPENCLAW_PROFILE || 'main';
const expectedJobs = ['memory-daily-sync', 'memory-weekly-compound', 'memory-hourly-micro'];

exec(`npx openclaw cron list --profile ${profile}`, (err, stdout, stderr) => {
  if (err) {
    console.error('Failed to list cron:', err.message);
    process.exit(1);
  }
  const lines = stdout.split('\n').filter(l => l.includes('name:') && expectedJobs.some(j => l.includes(j)));
  console.log('\n=== Memory Infrastructure Cron Status ===\n');
  if (lines.length === 0) {
    console.log('⚠️  No cron jobs found. Run /memory-sync init first.');
  } else {
    lines.forEach(l => console.log(l.trim()));
  }
  console.log('\n=========================================\n');
});