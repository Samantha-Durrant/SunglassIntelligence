import { MemStorage } from './server/storage.js';
import { seedDatabase } from './server/seed-data.ts';

const storage = new MemStorage();

// Sample sunglass brand data for investor analysis
const sampleBrands = [
  {
    name: "Ray-Ban",
    category: "luxury",
    revenue: "3200000000",
    growthRate: "8.5",
    marketShare: "15.2",
    investmentScore: 85,
    founded: 1937,
    employees: 8500,
    website: "https://ray-ban.com",
    description: "Iconic eyewear brand known for Aviator and Wayfarer styles, owned by EssilorLuxottica",
    isPublic: true,
    locations: ["USA", "Italy", "Global"]
  },
  {
    name: "Oakley",
    category: "sports",
    revenue: "2800000000",
    growthRate: "12.3",
    marketShare: "12.8",
    investmentScore: 88,
    founded: 1975,
    employees: 6200,
    website: "https://oakley.com",
    description: "Performance sports sunglasses with cutting-edge technology and military contracts",
    isPublic: true,
    locations: ["USA", "Asia", "Europe"]
  },
  {
    name: "Warby Parker",
    category: "d2c",
    revenue: "540000000",
    growthRate: "24.7",
    marketShare: "2.1",
    investmentScore: 92,
    founded: 2010,
    employees: 3500,
    website: "https://warbyparker.com",
    description: "D2C eyewear disruptor with strong online presence and growing retail footprint",
    isPublic: true,
    locations: ["USA", "Canada"]
  },
  {
    name: "Maui Jim",
    category: "premium",
    revenue: "350000000",
    growthRate: "15.8",
    marketShare: "3.2",
    investmentScore: 78,
    founded: 1980,
    employees: 1200,
    website: "https://mauijim.com",
    description: "Premium polarized sunglasses brand with strong presence in outdoor and marine markets",
    isPublic: false,
    locations: ["USA", "Hawaii", "International"]
  },
  {
    name: "Persol",
    category: "luxury",
    revenue: "180000000",
    growthRate: "6.2",
    marketShare: "1.8",
    investmentScore: 72,
    founded: 1917,
    employees: 450,
    website: "https://persol.com",
    description: "Italian luxury eyewear with handcrafted frames and celebrity endorsements",
    isPublic: true,
    locations: ["Italy", "Europe", "USA"]
  },
  {
    name: "Costa Del Mar",
    category: "sports",
    revenue: "220000000",
    growthRate: "18.5",
    marketShare: "2.8",
    investmentScore: 81,
    founded: 1983,
    employees: 800,
    website: "https://costadelmar.com",
    description: "Fishing and marine sports sunglasses with polarized lens technology",
    isPublic: false,
    locations: ["USA", "Coastal Markets"]
  },
  {
    name: "Gentle Monster",
    category: "luxury",
    revenue: "320000000",
    growthRate: "45.2",
    marketShare: "1.5",
    investmentScore: 94,
    founded: 2011,
    employees: 1800,
    website: "https://gentlemonster.com",
    description: "Korean luxury eyewear brand with avant-garde designs and strong Asian market presence",
    isPublic: false,
    locations: ["South Korea", "Asia", "USA", "Europe"]
  },
  {
    name: "Luxottica Store Brands",
    category: "mass-market",
    revenue: "4200000000",
    growthRate: "4.8",
    marketShare: "18.7",
    investmentScore: 76,
    founded: 1961,
    employees: 82000,
    website: "https://luxottica.com",
    description: "Largest eyewear conglomerate with multiple brand portfolio and retail presence",
    isPublic: true,
    locations: ["Italy", "Global"]
  }
];

console.log("Seeding database with sample brand data...");

// Seed brands
for (const brand of sampleBrands) {
  await storage.createBrand(brand);
}

console.log(`Successfully seeded ${sampleBrands.length} brands`);