#!/usr/bin/env node

// Simple startup script for Railway deployment
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function start() {
  try {
    console.log('🚀 Starting SunglassIntelligence server...');
    
    // Build the client if needed
    try {
      console.log('📦 Building client assets...');
      await execAsync('npm run build:client');
      console.log('✅ Client build completed');
    } catch (buildError) {
      console.log('⚠️ Client build failed, proceeding with server-only mode');
    }
    
    // Start the server
    console.log('🌐 Starting server...');
    const { spawn } = await import('child_process');
    const server = spawn('npx', ['tsx', 'server/index.ts'], {
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' }
    });
    
    server.on('close', (code) => {
      console.log(`Server process exited with code ${code}`);
      process.exit(code);
    });
    
  } catch (error) {
    console.error('❌ Startup failed:', error);
    process.exit(1);
  }
}

start();
