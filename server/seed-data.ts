import { storage } from "./storage";
import { InsertBrand } from "@shared/schema";

// Sample sunglass brand data for investor analysis
const sampleBrands: InsertBrand[] = [
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
  },
  {
    name: "Roka",
    category: "sports",
    revenue: "45000000",
    growthRate: "67.3",
    marketShare: "0.3",
    investmentScore: 89,
    founded: 2013,
    employees: 150,
    website: "https://roka.com",
    description: "High-performance sports eyewear for cycling, running, and triathlon athletes",
    isPublic: false,
    locations: ["USA"]
  },
  {
    name: "Goodr",
    category: "d2c",
    revenue: "25000000",
    growthRate: "89.4",
    marketShare: "0.2",
    investmentScore: 85,
    founded: 2015,
    employees: 75,
    website: "https://goodr.com",
    description: "Affordable, fun running sunglasses with viral marketing and strong social media presence",
    isPublic: false,
    locations: ["USA"]
  },
  {
    name: "Safilo Group",
    category: "premium",
    revenue: "980000000",
    growthRate: "3.2",
    marketShare: "5.8",
    investmentScore: 68,
    founded: 1934,
    employees: 8900,
    website: "https://safilo.com",
    description: "Italian eyewear manufacturer with licensed brands and global distribution",
    isPublic: true,
    locations: ["Italy", "Global"]
  },
  {
    name: "Bolle",
    category: "sports",
    revenue: "65000000",
    growthRate: "8.9",
    marketShare: "0.7",
    investmentScore: 71,
    founded: 1888,
    employees: 280,
    website: "https://bolle.com",
    description: "French sports eyewear brand specializing in skiing and cycling protection",
    isPublic: false,
    locations: ["France", "Europe", "USA"]
  },
  {
    name: "Zenni Optical",
    category: "d2c",
    revenue: "380000000",
    growthRate: "28.7",
    marketShare: "1.9",
    investmentScore: 86,
    founded: 2003,
    employees: 2200,
    website: "https://zenni.com",
    description: "Online-first affordable eyewear with customization options and virtual try-on",
    isPublic: false,
    locations: ["USA", "Online Global"]
  },
  {
    name: "Randolph Engineering",
    category: "premium",
    revenue: "18000000",
    growthRate: "12.1",
    marketShare: "0.15",
    investmentScore: 73,
    founded: 1973,
    employees: 95,
    website: "https://randolphusa.com",
    description: "American-made military and aviation sunglasses with government contracts",
    isPublic: false,
    locations: ["USA"]
  },
  {
    name: "Spy Optic",
    category: "sports",
    revenue: "42000000",
    growthRate: "5.4",
    marketShare: "0.4",
    investmentScore: 65,
    founded: 1994,
    employees: 120,
    website: "https://spyoptic.com",
    description: "Action sports eyewear with focus on snow sports and youth market",
    isPublic: false,
    locations: ["USA"]
  },
  {
    name: "Coco and Breezy",
    category: "luxury",
    revenue: "8000000",
    growthRate: "34.5",
    marketShare: "0.05",
    investmentScore: 79,
    founded: 2009,
    employees: 25,
    website: "https://cocoandbreezy.com",
    description: "Celebrity-endorsed luxury eyewear with unique designs and limited editions",
    isPublic: false,
    locations: ["USA"]
  },
  {
    name: "Shwood",
    category: "sustainable",
    revenue: "12000000",
    growthRate: "22.8",
    marketShare: "0.08",
    investmentScore: 77,
    founded: 2009,
    employees: 55,
    website: "https://shwoodshop.com",
    description: "Sustainable wooden sunglasses with eco-friendly materials and artisan craftsmanship",
    isPublic: false,
    locations: ["USA", "Portland"]
  },
  {
    name: "Blenders Eyewear",
    category: "d2c",
    revenue: "35000000",
    growthRate: "76.2",
    marketShare: "0.25",
    investmentScore: 88,
    founded: 2012,
    employees: 85,
    website: "https://blenderseyewear.com",
    description: "Lifestyle sunglasses brand with strong social media presence and festival marketing",
    isPublic: false,
    locations: ["USA", "California"]
  },
  {
    name: "Native Eyewear",
    category: "sports",
    revenue: "28000000",
    growthRate: "9.7",
    marketShare: "0.22",
    investmentScore: 69,
    founded: 2001,
    employees: 65,
    website: "https://nativeyewear.com",
    description: "Outdoor sports eyewear with focus on fishing, skiing, and mountain activities",
    isPublic: false,
    locations: ["USA"]
  },
  {
    name: "Wiley X",
    category: "sports",
    revenue: "85000000",
    growthRate: "14.3",
    marketShare: "0.6",
    investmentScore: 75,
    founded: 1987,
    employees: 320,
    website: "https://wileyx.com",
    description: "Protective eyewear for military, law enforcement, and extreme sports",
    isPublic: false,
    locations: ["USA", "International"]
  }
];

export async function seedDatabase() {
  console.log("Seeding database with sample brand data...");
  
  try {
    // Add all sample brands
    for (const brand of sampleBrands) {
      await storage.createBrand(brand);
    }
    
    // Update market metrics
    await storage.updateMarketMetrics({
      totalBrands: sampleBrands.length,
      marketSize: "18200000000", // $18.2B market
      opportunities: 23,
      insights: 0
    });
    
    console.log(`Successfully seeded ${sampleBrands.length} brands`);
    return { success: true, count: sampleBrands.length };
  } catch (error) {
    console.error("Error seeding database:", error);
    return { success: false, error: error.message };
  }
}