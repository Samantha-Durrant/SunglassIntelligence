import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../server/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register all routes
let routesRegistered = false;
let server: any;

const initializeRoutes = async () => {
  if (!routesRegistered) {
    server = await registerRoutes(app);
    routesRegistered = true;
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await initializeRoutes();
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Handle the request with Express
  app(req as any, res as any);
}
