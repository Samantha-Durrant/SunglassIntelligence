import { brands, marketMetrics, aiInsights, emailReports, type Brand, type InsertBrand, type MarketMetrics, type InsertMarketMetrics, type AiInsight, type InsertAiInsight, type EmailReport, type InsertEmailReport } from "@shared/schema";

export interface IStorage {
  // Brand operations
  getBrands(): Promise<Brand[]>;
  getBrand(id: number): Promise<Brand | undefined>;
  createBrand(brand: InsertBrand): Promise<Brand>;
  updateBrand(id: number, brand: Partial<InsertBrand>): Promise<Brand | undefined>;
  deleteBrand(id: number): Promise<boolean>;
  searchBrands(query: string): Promise<Brand[]>;

  // Market metrics operations
  getMarketMetrics(): Promise<MarketMetrics | undefined>;
  updateMarketMetrics(metrics: InsertMarketMetrics): Promise<MarketMetrics>;

  // AI insights operations
  getAiInsights(): Promise<AiInsight[]>;
  createAiInsight(insight: InsertAiInsight): Promise<AiInsight>;
  getAiInsightsByType(type: string): Promise<AiInsight[]>;

  // Email reports operations
  getEmailReports(): Promise<EmailReport[]>;
  createEmailReport(report: InsertEmailReport): Promise<EmailReport>;
}

export class MemStorage implements IStorage {
  private brands: Map<number, Brand>;
  private marketMetrics: MarketMetrics | undefined;
  private aiInsights: Map<number, AiInsight>;
  private emailReports: Map<number, EmailReport>;
  private currentBrandId: number;
  private currentInsightId: number;
  private currentReportId: number;

  constructor() {
    this.brands = new Map();
    this.aiInsights = new Map();
    this.emailReports = new Map();
    this.currentBrandId = 1;
    this.currentInsightId = 1;
    this.currentReportId = 1;
    
    // Initialize with default market metrics
    this.marketMetrics = {
      id: 1,
      totalBrands: 0,
      marketSize: "18200000000",
      opportunities: 23,
      insights: 0,
      lastSync: new Date(),
    };
  }

  async getBrands(): Promise<Brand[]> {
    return Array.from(this.brands.values());
  }

  async getBrand(id: number): Promise<Brand | undefined> {
    return this.brands.get(id);
  }

  async createBrand(insertBrand: InsertBrand): Promise<Brand> {
    const id = this.currentBrandId++;
    const brand: Brand = {
      ...insertBrand,
      id,
      lastUpdated: new Date(),
    };
    this.brands.set(id, brand);
    
    // Update total brands count
    if (this.marketMetrics) {
      this.marketMetrics.totalBrands = this.brands.size;
    }
    
    return brand;
  }

  async updateBrand(id: number, updateData: Partial<InsertBrand>): Promise<Brand | undefined> {
    const brand = this.brands.get(id);
    if (!brand) return undefined;
    
    const updatedBrand: Brand = {
      ...brand,
      ...updateData,
      lastUpdated: new Date(),
    };
    this.brands.set(id, updatedBrand);
    return updatedBrand;
  }

  async deleteBrand(id: number): Promise<boolean> {
    const deleted = this.brands.delete(id);
    if (deleted && this.marketMetrics) {
      this.marketMetrics.totalBrands = this.brands.size;
    }
    return deleted;
  }

  async searchBrands(query: string): Promise<Brand[]> {
    const brands = Array.from(this.brands.values());
    return brands.filter(brand => 
      brand.name.toLowerCase().includes(query.toLowerCase()) ||
      brand.category.toLowerCase().includes(query.toLowerCase())
    );
  }

  async getMarketMetrics(): Promise<MarketMetrics | undefined> {
    return this.marketMetrics;
  }

  async updateMarketMetrics(metrics: InsertMarketMetrics): Promise<MarketMetrics> {
    this.marketMetrics = {
      id: 1,
      ...metrics,
      lastSync: new Date(),
    };
    return this.marketMetrics;
  }

  async getAiInsights(): Promise<AiInsight[]> {
    return Array.from(this.aiInsights.values());
  }

  async createAiInsight(insertInsight: InsertAiInsight): Promise<AiInsight> {
    const id = this.currentInsightId++;
    const insight: AiInsight = {
      ...insertInsight,
      id,
      createdAt: new Date(),
    };
    this.aiInsights.set(id, insight);
    
    // Update insights count
    if (this.marketMetrics) {
      this.marketMetrics.insights = this.aiInsights.size;
    }
    
    return insight;
  }

  async getAiInsightsByType(type: string): Promise<AiInsight[]> {
    const insights = Array.from(this.aiInsights.values());
    return insights.filter(insight => insight.type === type);
  }

  async getEmailReports(): Promise<EmailReport[]> {
    return Array.from(this.emailReports.values());
  }

  async createEmailReport(insertReport: InsertEmailReport): Promise<EmailReport> {
    const id = this.currentReportId++;
    const report: EmailReport = {
      ...insertReport,
      id,
      sentAt: new Date(),
    };
    this.emailReports.set(id, report);
    return report;
  }
}

export const storage = new MemStorage();
