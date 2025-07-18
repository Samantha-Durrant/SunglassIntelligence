const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('=== Direct TSX Execution ===');
console.log('Working directory:', process.cwd());

// Find server file
const serverPaths = [
  'server/index.ts',
  './server/index.ts',
  '../server/index.ts',
  path.join(process.cwd(), 'server/index.ts')
];

let foundPath = null;
for (const p of serverPaths) {
  if (fs.existsSync(p)) {
    foundPath = p;
    break;
  }
}

if (!foundPath) {
  console.error('Server file not found!');
  console.log('Current directory contents:', fs.readdirSync('.'));
  process.exit(1);
}

console.log('Found server at:', foundPath);
console.log('Executing: npx tsx', foundPath);

try {
  execSync(`npx tsx ${foundPath}`, { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
} catch (error) {
  console.error('Execution failed:', error);
  process.exit(1);
}
