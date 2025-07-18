import { pgTable, text, serial, integer, boolean, decimal, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  revenue: decimal("revenue", { precision: 12, scale: 2 }),
  growthRate: decimal("growth_rate", { precision: 5, scale: 2 }),
  marketShare: decimal("market_share", { precision: 5, scale: 2 }),
  investmentScore: integer("investment_score"),
  locations: jsonb("locations").$type<string[]>(),
  founded: integer("founded"),
  employees: integer("employees"),
  website: text("website"),
  description: text("description"),
  isPublic: boolean("is_public").default(false),
  
  // Enhanced investor-focused fields
  fundingStage: text("funding_stage"), // 'seed', 'series-a', 'series-b', 'ipo', 'acquired', 'bootstrapped'
  totalFunding: decimal("total_funding", { precision: 12, scale: 2 }),
  lastFundingDate: text("last_funding_date"),
  lastFundingAmount: decimal("last_funding_amount", { precision: 12, scale: 2 }),
  valuation: decimal("valuation", { precision: 15, scale: 2 }),
  investors: jsonb("investors").$type<string[]>(),
  keyExecutives: jsonb("key_executives").$type<{ name: string; role: string; background: string }[]>(),
  businessModel: text("business_model"), // 'b2c', 'b2b', 'marketplace', 'subscription', 'licensing'
  distributionChannels: jsonb("distribution_channels").$type<string[]>(),
  competitiveAdvantage: text("competitive_advantage"),
  technologyFocus: jsonb("technology_focus").$type<string[]>(),
  sustainabilityScore: integer("sustainability_score"), // 1-100
  brandPartnerships: jsonb("brand_partnerships").$type<string[]>(),
  acquisitions: jsonb("acquisitions").$type<{ company: string; year: number; amount?: string }[]>(),
  riskFactors: jsonb("risk_factors").$type<string[]>(),
  opportunities: jsonb("opportunities").$type<string[]>(),
  
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const marketMetrics = pgTable("market_metrics", {
  id: serial("id").primaryKey(),
  totalBrands: integer("total_brands").notNull(),
  marketSize: decimal("market_size", { precision: 15, scale: 2 }).notNull(),
  opportunities: integer("opportunities").notNull(),
  insights: integer("insights").notNull(),
  lastSync: timestamp("last_sync").defaultNow(),
});

export const aiInsights = pgTable("ai_insights", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'opportunity', 'trend', 'risk'
  title: text("title").notNull(),
  content: text("content").notNull(),
  confidence: decimal("confidence", { precision: 3, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const emailReports = pgTable("email_reports", {
  id: serial("id").primaryKey(),
  recipientEmail: text("recipient_email").notNull(),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  sentAt: timestamp("sent_at").defaultNow(),
  status: text("status").notNull().default("sent"), // 'sent', 'failed'
});

export const insertBrandSchema = createInsertSchema(brands).omit({
  id: true,
  lastUpdated: true,
});

export const insertMarketMetricsSchema = createInsertSchema(marketMetrics).omit({
  id: true,
  lastSync: true,
});

export const insertAiInsightSchema = createInsertSchema(aiInsights).omit({
  id: true,
  createdAt: true,
});

export const insertEmailReportSchema = createInsertSchema(emailReports).omit({
  id: true,
  sentAt: true,
});

export type Brand = typeof brands.$inferSelect;
export type InsertBrand = z.infer<typeof insertBrandSchema>;
export type MarketMetrics = typeof marketMetrics.$inferSelect;
export type InsertMarketMetrics = z.infer<typeof insertMarketMetricsSchema>;
export type AiInsight = typeof aiInsights.$inferSelect;
export type InsertAiInsight = z.infer<typeof insertAiInsightSchema>;
export type EmailReport = typeof emailReports.$inferSelect;
export type InsertEmailReport = z.infer<typeof insertEmailReportSchema>;
