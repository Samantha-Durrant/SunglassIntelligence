// Simple Node.js server that compiles and runs TypeScript on the fly
const fs = require('fs');
const path = require('path');

console.log('=== SunglassIntelligence Server Startup ===');
console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);

// Check multiple possible server locations
const possiblePaths = [
  path.join(__dirname, 'server', 'index.ts'),           // ./server/index.ts
  path.join(__dirname, '..', 'server', 'index.ts'),     // ../server/index.ts  
  path.join(process.cwd(), 'server', 'index.ts'),       // cwd/server/index.ts
  path.join(process.cwd(), '..', 'server', 'index.ts'), // cwd/../server/index.ts
];

let serverPath = null;

console.log('Searching for server file...');
for (const testPath of possiblePaths) {
  console.log('Checking:', testPath);
  if (fs.existsSync(testPath)) {
    serverPath = testPath;
    console.log('✅ Found server at:', serverPath);
    break;
  } else {
    console.log('❌ Not found');
  }
}

if (!serverPath) {
  console.error('ERROR: Server file not found in any expected location');
  console.log('Current directory contents:', fs.readdirSync(process.cwd()));
  
  // Try to find server directory
  try {
    const entries = fs.readdirSync(process.cwd());
    const serverDir = entries.find(entry => entry === 'server');
    if (serverDir) {
      const serverDirPath = path.join(process.cwd(), serverDir);
      console.log('Found server directory:', serverDirPath);
      console.log('Server directory contents:', fs.readdirSync(serverDirPath));
    }
  } catch (e) {
    console.error('Error reading directories:', e);
  }
  
  process.exit(1);
}

// Try to require tsx and run the server
try {
  console.log('Starting server with tsx...');
  require('tsx/cjs').register();
  require(serverPath);
} catch (error) {
  console.error('Failed to start server with tsx:', error);
  
  // Fallback: try using ts-node if available
  try {
    console.log('Trying fallback with ts-node...');
    require('ts-node').register({
      transpileOnly: true,
      compilerOptions: {
        module: 'commonjs'
      }
    });
    require(serverPath);
  } catch (fallbackError) {
    console.error('Fallback also failed:', fallbackError);
    
    // Last resort: try to execute tsx as child process
    try {
      console.log('Last resort: spawning tsx process...');
      const { spawn } = require('child_process');
      const tsx = spawn('npx', ['tsx', serverPath], {
        stdio: 'inherit',
        env: { ...process.env, NODE_ENV: 'production' },
        cwd: path.dirname(serverPath)
      });
      
      tsx.on('error', (err) => {
        console.error('Spawn failed:', err);
        process.exit(1);
      });
      
      tsx.on('close', (code) => {
        console.log(`Server process exited with code ${code}`);
        process.exit(code);
      });
      
    } catch (spawnError) {
      console.error('All methods failed:', spawnError);
      process.exit(1);
    }
  }
}
