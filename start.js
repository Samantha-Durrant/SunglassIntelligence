#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Log environment info
console.log('Starting SunglassIntelligence server...');
console.log('Working directory:', process.cwd());
console.log('__dirname:', __dirname);

// Check if server directory exists
const serverDir = path.join(__dirname, 'server');
const serverPath = path.join(serverDir, 'index.ts');

console.log('Looking for server at:', serverPath);
console.log('Server directory exists:', fs.existsSync(serverDir));
console.log('Server file exists:', fs.existsSync(serverPath));

if (!fs.existsSync(serverPath)) {
  console.error('Server file not found at:', serverPath);
  console.log('Directory contents:', fs.readdirSync(__dirname));
  if (fs.existsSync(serverDir)) {
    console.log('Server directory contents:', fs.readdirSync(serverDir));
  }
  process.exit(1);
}

// Start the server using tsx
console.log('Executing:', 'npx tsx', serverPath);
const tsx = spawn('npx', ['tsx', serverPath], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production' },
  cwd: __dirname
});

tsx.on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

tsx.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});

// Handle cleanup
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, killing server...');
  tsx.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, killing server...');
  tsx.kill('SIGINT');
});
