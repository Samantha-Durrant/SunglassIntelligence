const express = require("express");
const path = require("path");
const fs = require("fs");

console.log("=== Starting SunglassIntelligence Server (Pure JS) ===");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Basic logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (req.path.startsWith("/api")) {
      console.log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});

// Sample brands data (same as in seed-data.ts)
const sampleBrands = [
  {
    id: 1,
    name: "Ray-Ban",
    category: "Luxury",
    founded: 1937,
    revenue: 3200000000,
    growthRate: 8.5,
    marketShare: 15.2,
    investmentScore: 95,
    headquarters: "Luxottica, Italy",
    description: "Iconic American sunglasses brand known for aviator and wayfarer styles"
  },
  {
    id: 2,
    name: "Oakley",
    category: "Sports",
    founded: 1975,
    revenue: 1800000000,
    growthRate: 12.3,
    marketShare: 8.7,
    investmentScore: 88,
    headquarters: "California, USA",
    description: "Premium sports and lifestyle sunglasses with cutting-edge technology"
  },
  {
    id: 3,
    name: "Warby Parker",
    category: "D2C",
    founded: 2010,
    revenue: 540000000,
    growthRate: 25.8,
    marketShare: 2.1,
    investmentScore: 92,
    headquarters: "New York, USA",
    description: "Direct-to-consumer eyewear brand disrupting traditional retail"
  }
  // Add more brands as needed
];

// In-memory storage
let brands = [...sampleBrands];

// API Routes
app.get("/api/brands", (req, res) => {
  res.json(brands);
});

app.get("/api/metrics", (req, res) => {
  const totalRevenue = brands.reduce((sum, brand) => sum + brand.revenue, 0);
  const avgGrowthRate = brands.reduce((sum, brand) => sum + brand.growthRate, 0) / brands.length;
  const totalMarketShare = brands.reduce((sum, brand) => sum + brand.marketShare, 0);
  
  res.json({
    totalBrands: brands.length,
    totalRevenue,
    avgGrowthRate: Math.round(avgGrowthRate * 10) / 10,
    totalMarketShare: Math.round(totalMarketShare * 10) / 10
  });
});

app.post("/api/seed", (req, res) => {
  brands = [...sampleBrands];
  console.log(`Seeded database with ${brands.length} brands`);
  res.json({ 
    message: `Successfully seeded ${brands.length} brands`,
    brands: brands.length 
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Serve static files in production
const publicPath = path.join(__dirname, "public");
const buildPath = path.join(__dirname, "dist");

console.log("Static file paths:");
console.log("Public path:", publicPath, "exists:", fs.existsSync(publicPath));
console.log("Build path:", buildPath, "exists:", fs.existsSync(buildPath));

// Serve React build if available, otherwise serve simple HTML
if (fs.existsSync(buildPath)) {
  console.log("Serving React build from:", buildPath);
  app.use(express.static(buildPath));
  
  // Catch-all handler for React routing
  app.get("*", (req, res) => {
    const buildIndexPath = path.join(buildPath, "index.html");
    if (fs.existsSync(buildIndexPath)) {
      res.sendFile(buildIndexPath);
    } else {
      res.json({ error: "React build index.html not found" });
    }
  });
  
} else if (fs.existsSync(publicPath)) {
  console.log("Serving simple HTML from:", publicPath);
  app.use(express.static(publicPath));
  
  // Catch-all handler for simple HTML
  app.get("*", (req, res) => {
    const indexPath = path.join(publicPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.json({ error: "Simple HTML index.html not found" });
    }
  });
  
} else {
  console.log("No frontend build found, serving API only");
  app.get("*", (req, res) => {
    res.json({ 
      message: "SunglassIntelligence API Server",
      endpoints: ["/api/brands", "/api/metrics", "/api/seed"],
      note: "No frontend build available - build the React app first",
      publicPath: publicPath,
      buildPath: buildPath,
      publicExists: fs.existsSync(publicPath),
      buildExists: fs.existsSync(buildPath)
    });
  });
}

// Error handling
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const port = parseInt(process.env.PORT || '10000', 10);
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`🌐 API available at: http://localhost:${port}/api/brands`);
  console.log(`📊 Metrics at: http://localhost:${port}/api/metrics`);
  console.log(`🌱 Seed data at: http://localhost:${port}/api/seed`);
});
