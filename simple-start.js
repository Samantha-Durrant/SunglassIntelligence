#!/usr/bin/env node

// Ultra-simple server launcher - no dependencies on paths
process.chdir('/opt/render/project');

console.log('Working directory set to:', process.cwd());
console.log('Directory contents:', require('fs').readdirSync('.'));

// Direct execution
const { spawn } = require('child_process');

const server = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production' },
  cwd: '/opt/render/project'
});

server.on('error', (err) => {
  console.error('Server failed:', err);
  process.exit(1);
});

server.on('close', (code) => {
  process.exit(code);
});
