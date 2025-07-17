import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBrandSchema, insertAiInsightSchema, insertEmailReportSchema } from "@shared/schema";
import { generateMarketInsights, analyzeBrand, generateInvestmentReport } from "./services/openai";
import { sendMarketReport } from "./services/sendgrid";
import { seedDatabase } from "./seed-data";

export async function registerRoutes(app: Express): Promise<Server> {
  // Brand routes
  app.get("/api/brands", async (req, res) => {
    try {
      const { search } = req.query;
      let brands;
      
      if (search && typeof search === 'string') {
        brands = await storage.searchBrands(search);
      } else {
        brands = await storage.getBrands();
      }
      
      res.json(brands);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch brands" });
    }
  });

  app.get("/api/brands/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const brand = await storage.getBrand(id);
      
      if (!brand) {
        return res.status(404).json({ message: "Brand not found" });
      }
      
      res.json(brand);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch brand" });
    }
  });

  app.post("/api/brands", async (req, res) => {
    try {
      const validatedData = insertBrandSchema.parse(req.body);
      const brand = await storage.createBrand(validatedData);
      res.status(201).json(brand);
    } catch (error) {
      res.status(400).json({ message: "Invalid brand data" });
    }
  });

  app.put("/api/brands/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertBrandSchema.partial().parse(req.body);
      const brand = await storage.updateBrand(id, validatedData);
      
      if (!brand) {
        return res.status(404).json({ message: "Brand not found" });
      }
      
      res.json(brand);
    } catch (error) {
      res.status(400).json({ message: "Invalid brand data" });
    }
  });

  app.delete("/api/brands/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteBrand(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Brand not found" });
      }
      
      res.json({ message: "Brand deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete brand" });
    }
  });

  // Market metrics routes
  app.get("/api/metrics", async (req, res) => {
    try {
      const metrics = await storage.getMarketMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch metrics" });
    }
  });

  // AI insights routes
  app.get("/api/insights", async (req, res) => {
    try {
      const insights = await storage.getAiInsights();
      res.json(insights);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch insights" });
    }
  });

  app.post("/api/insights/generate", async (req, res) => {
    try {
      const brands = await storage.getBrands();
      const insights = await generateMarketInsights(brands);
      
      // Store insights in database
      const savedInsights = await Promise.all([
        storage.createAiInsight({
          type: "opportunity",
          title: "Investment Opportunity",
          content: insights.opportunity,
          confidence: "0.85"
        }),
        storage.createAiInsight({
          type: "trend",
          title: "Market Trend",
          content: insights.trend,
          confidence: "0.80"
        }),
        storage.createAiInsight({
          type: "risk",
          title: "Risk Alert",
          content: insights.risk,
          confidence: "0.75"
        })
      ]);
      
      res.json(savedInsights);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate insights: " + (error as Error).message });
    }
  });

  // Brand analysis route
  app.post("/api/brands/:id/analyze", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const brand = await storage.getBrand(id);
      
      if (!brand) {
        return res.status(404).json({ message: "Brand not found" });
      }
      
      const analysis = await analyzeBrand(brand);
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ message: "Failed to analyze brand: " + (error as Error).message });
    }
  });

  // Email reports routes
  app.get("/api/email-reports", async (req, res) => {
    try {
      const reports = await storage.getEmailReports();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch email reports" });
    }
  });

  app.post("/api/email-reports/send", async (req, res) => {
    try {
      const { recipientEmail } = req.body;
      
      if (!recipientEmail) {
        return res.status(400).json({ message: "Recipient email is required" });
      }
      
      const brands = await storage.getBrands();
      const metrics = await storage.getMarketMetrics();
      const reportContent = await generateInvestmentReport(brands, metrics);
      
      const success = await sendMarketReport(recipientEmail, reportContent, metrics);
      
      if (success) {
        await storage.createEmailReport({
          recipientEmail,
          subject: `SunglassMarket Weekly Analysis - ${new Date().toLocaleDateString()}`,
          content: reportContent,
          status: "sent"
        });
        
        res.json({ message: "Report sent successfully" });
      } else {
        res.status(500).json({ message: "Failed to send email report" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to send report: " + (error as Error).message });
    }
  });

  // Database sync route
  app.post("/api/sync", async (req, res) => {
    try {
      const brands = await storage.getBrands();
      const insights = await storage.getAiInsights();
      
      await storage.updateMarketMetrics({
        totalBrands: brands.length,
        marketSize: "18200000000",
        opportunities: 23,
        insights: insights.length
      });
      
      res.json({ message: "Database sync completed", brandsCount: brands.length });
    } catch (error) {
      res.status(500).json({ message: "Sync failed: " + (error as Error).message });
    }
  });

  // Seed database route
  app.post("/api/seed", async (req, res) => {
    try {
      const result = await seedDatabase();
      if (result.success) {
        res.json({ message: "Database seeded successfully", count: result.count });
      } else {
        res.status(500).json({ message: "Seed failed: " + result.error });
      }
    } catch (error) {
      res.status(500).json({ message: "Seed failed: " + (error as Error).message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
