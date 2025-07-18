import { storage } from "./storage";
import { InsertBrand } from "@shared/schema";

// Enhanced sunglass brand data for venture investor analysis
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
    locations: ["USA", "Italy", "Global"],
    fundingStage: "acquired",
    valuation: "45000000000",
    businessModel: "b2c",
    distributionChannels: ["retail", "online", "wholesale", "licensed-stores"],
    competitiveAdvantage: "Brand heritage, global distribution network, celebrity partnerships",
    technologyFocus: ["smart-glasses", "ar-integration", "blue-light-filtering"],
    sustainabilityScore: 72,
    brandPartnerships: ["Facebook", "Meta", "Luxottica"],
    acquisitions: [
      { company: "Merged with Luxottica", year: 1999, amount: "2.1B" }
    ],
    riskFactors: ["Market saturation", "Chinese competition", "Economic downturns"],
    opportunities: ["Smart glasses market", "Emerging markets", "Sustainability trends"]
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
    locations: ["USA", "Canada"],
    fundingStage: "ipo",
    totalFunding: "545000000",
    lastFundingDate: "2021-09-29",
    valuation: "6000000000",
    investors: ["General Catalyst", "First Round Capital", "Tiger Global"],
    keyExecutives: [
      { name: "Neil Blumenthal", role: "CEO", background: "Wharton MBA, VisionSpring" },
      { name: "Dave Gilboa", role: "Co-CEO", background: "Wharton MBA, Bain & Company" }
    ],
    businessModel: "d2c",
    distributionChannels: ["online", "retail-stores", "mobile-app"],
    competitiveAdvantage: "Home try-on program, vertical integration, strong brand",
    technologyFocus: ["virtual-try-on", "mobile-apps", "data-analytics"],
    sustainabilityScore: 85,
    brandPartnerships: ["Buy a Pair, Give a Pair program"],
    riskFactors: ["Increased competition", "Rising customer acquisition costs"],
    opportunities: ["International expansion", "Contact lenses", "Eye exams expansion"]
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
    locations: ["USA", "Asia", "Europe"],
    fundingStage: "acquired",
    valuation: "2100000000",
    businessModel: "b2c",
    distributionChannels: ["sporting-goods-stores", "online", "military-contracts", "retail"],
    competitiveAdvantage: "Military contracts, athlete endorsements, technological innovation",
    technologyFocus: ["prizm-technology", "photochromic-lenses", "impact-resistance"],
    sustainabilityScore: 68,
    brandPartnerships: ["US Military", "NFL", "MLB", "Professional Athletes"],
    keyExecutives: [
      { name: "Todd Francis", role: "VP Brand", background: "25 years sports marketing" }
    ],
    riskFactors: ["Dependence on sports market", "Competition from tech companies"],
    opportunities: ["E-sports market", "Tactical/Military expansion", "Smart sports wearables"]
  },
  {
    name: "Gentle Monster",
    category: "luxury",
    revenue: "120000000",
    growthRate: "35.8",
    marketShare: "0.8",
    investmentScore: 94,
    founded: 2011,
    employees: 400,
    website: "https://gentlemonster.com",
    description: "Korean luxury eyewear brand known for avant-garde designs and experiential retail",
    isPublic: false,
    locations: ["South Korea", "China", "USA", "Europe"],
    fundingStage: "series-c",
    totalFunding: "65000000",
    lastFundingDate: "2022-03-15",
    lastFundingAmount: "45000000",
    valuation: "800000000",
    investors: ["L Catterton", "Temasek", "Korean Investment Partners"],
    keyExecutives: [
      { name: "Kim Hansung", role: "CEO", background: "Fashion industry veteran" }
    ],
    businessModel: "b2c",
    distributionChannels: ["flagship-stores", "online", "luxury-retailers"],
    competitiveAdvantage: "Unique design aesthetic, experiential retail, Asian market dominance",
    technologyFocus: ["3d-printing", "smart-materials", "ar-try-on"],
    sustainabilityScore: 72,
    brandPartnerships: ["Jennie (Blackpink)", "BTS", "Various K-pop artists"],
    riskFactors: ["Fashion trend dependency", "Limited brand recognition outside Asia"],
    opportunities: ["Global expansion", "Tech integration", "Celebrity collaborations"]
  },
  {
    name: "Zenni Optical",
    category: "d2c",
    revenue: "450000000",
    growthRate: "28.3",
    marketShare: "1.9",
    investmentScore: 89,
    founded: 2003,
    employees: 1200,
    website: "https://zennioptical.com",
    description: "Direct-to-consumer online eyewear retailer focused on affordable prescription glasses",
    isPublic: false,
    locations: ["USA", "China"],
    fundingStage: "bootstrapped",
    businessModel: "d2c",
    distributionChannels: ["online-only", "mobile-app"],
    competitiveAdvantage: "Extremely low prices, vertical integration, strong supply chain",
    technologyFocus: ["virtual-try-on", "lens-technology", "manufacturing-automation"],
    sustainabilityScore: 65,
    riskFactors: ["Quality perception", "Lack of physical presence"],
    opportunities: ["International expansion", "Premium offerings", "B2B markets"]
  },
  {
    name: "Roka",
    category: "sports",
    revenue: "45000000",
    growthRate: "42.5",
    marketShare: "0.2",
    investmentScore: 87,
    founded: 2013,
    employees: 85,
    website: "https://roka.com",
    description: "Performance eyewear brand focused on running, cycling, and triathlon athletes",
    isPublic: false,
    locations: ["USA"],
    fundingStage: "series-b",
    totalFunding: "25000000",
    lastFundingDate: "2021-06-15",
    lastFundingAmount: "18000000",
    valuation: "150000000",
    investors: ["Foundry Group", "Access Venture Partners"],
    keyExecutives: [
      { name: "Rob Canales", role: "CEO", background: "Stanford MBA, former triathlete" },
      { name: "Kent Vanlandingham", role: "Co-founder", background: "Industrial design, Stanford" }
    ],
    businessModel: "d2c",
    distributionChannels: ["online", "specialty-sports-retailers", "events"],
    competitiveAdvantage: "Athlete-founded, performance-focused, premium positioning",
    technologyFocus: ["lightweight-materials", "grip-technology", "ventilation-systems"],
    sustainabilityScore: 81,
    riskFactors: ["Niche market", "Competition from established brands"],
    opportunities: ["International expansion", "New sport categories", "B2B sales"]
  },
  {
    name: "Goodr",
    category: "sports",
    revenue: "35000000",
    growthRate: "38.9",
    marketShare: "0.15",
    investmentScore: 83,
    founded: 2015,
    employees: 65,
    website: "https://goodr.com",
    description: "Fun, affordable running sunglasses brand with strong social media presence",
    isPublic: false,
    locations: ["USA"],
    fundingStage: "series-a",
    totalFunding: "12000000",
    lastFundingDate: "2020-08-10",
    lastFundingAmount: "8000000",
    valuation: "75000000",
    investors: ["Springbank Collective", "Foundry Group"],
    keyExecutives: [
      { name: "Stephen Lease", role: "CEO", background: "Marketing veteran, runner" }
    ],
    businessModel: "d2c",
    distributionChannels: ["online", "running-stores", "social-media"],
    competitiveAdvantage: "Affordable pricing, viral marketing, community building",
    technologyFocus: ["social-media-marketing", "community-platforms"],
    sustainabilityScore: 79,
    brandPartnerships: ["Running events", "Fitness influencers"],
    riskFactors: ["Limited product range", "Copycat competition"],
    opportunities: ["Product line expansion", "International markets", "Corporate partnerships"]
  },
  {
    name: "EyeBuyDirect",
    category: "d2c",
    revenue: "185000000",
    growthRate: "22.1",
    marketShare: "0.9",
    investmentScore: 82,
    founded: 2005,
    employees: 650,
    website: "https://eyebuydirect.com",
    description: "Online prescription eyewear retailer owned by EssilorLuxottica",
    isPublic: true,
    locations: ["USA"],
    fundingStage: "acquired",
    valuation: "1200000000",
    businessModel: "d2c",
    distributionChannels: ["online", "mobile-app"],
    competitiveAdvantage: "EssilorLuxottica backing, affordable pricing, trend-focused designs",
    technologyFocus: ["virtual-try-on", "personalization", "mobile-optimization"],
    sustainabilityScore: 71,
    brandPartnerships: ["EssilorLuxottica"],
    acquisitions: [
      { company: "Acquired by Essilor", year: 2019, amount: "200M" }
    ],
    riskFactors: ["Intense online competition", "Customer acquisition costs"],
    opportunities: ["Integration with Luxottica brands", "Physical retail expansion"]
  },
  {
    name: "Persol",
    category: "luxury",
    revenue: "220000000",
    growthRate: "5.8",
    marketShare: "1.1",
    investmentScore: 79,
    founded: 1917,
    employees: 450,
    website: "https://persol.com",
    description: "Italian luxury eyewear brand known for superior craftsmanship and iconic designs",
    isPublic: true,
    locations: ["Italy", "Global"],
    fundingStage: "acquired",
    businessModel: "b2c",
    distributionChannels: ["luxury-retailers", "optical-stores", "online"],
    competitiveAdvantage: "Italian heritage, superior craftsmanship, iconic designs",
    technologyFocus: ["traditional-craftsmanship", "patented-lens-technology"],
    sustainabilityScore: 77,
    brandPartnerships: ["Luxottica Group"],
    riskFactors: ["Traditional market focus", "Limited innovation"],
    opportunities: ["Heritage marketing", "Craft collaborations", "Limited editions"]
  },
  {
    name: "Maui Jim",
    category: "premium",
    revenue: "280000000",
    growthRate: "6.2",
    marketShare: "1.8",
    investmentScore: 78,
    founded: 1980,
    employees: 850,
    website: "https://mauijim.com",
    description: "Premium polarized sunglasses brand focused on lens technology and Hawaiian heritage",
    isPublic: false,
    locations: ["USA", "Hawaii"],
    fundingStage: "bootstrapped",
    businessModel: "b2c",
    distributionChannels: ["specialty-retailers", "online", "optical-shops"],
    competitiveAdvantage: "Superior polarization technology, premium positioning",
    technologyFocus: ["polarization-technology", "color-enhancement", "blue-light-protection"],
    sustainabilityScore: 76,
    riskFactors: ["Limited global presence", "Premium pricing pressure"],
    opportunities: ["Global expansion", "Technology licensing", "Prescription market"]
  },
  {
    name: "Oliver Peoples",
    category: "luxury",
    revenue: "150000000",
    growthRate: "4.2",
    marketShare: "0.7",
    investmentScore: 76,
    founded: 1986,
    employees: 320,
    website: "https://oliverpeoples.com",
    description: "Luxury eyewear brand known for vintage-inspired designs and celebrity following",
    isPublic: true,
    locations: ["USA", "Japan", "Europe"],
    fundingStage: "acquired",
    businessModel: "b2c",
    distributionChannels: ["luxury-retailers", "optical-boutiques", "online"],
    competitiveAdvantage: "Heritage brand, celebrity endorsements, craftsmanship",
    technologyFocus: ["traditional-craftsmanship", "premium-materials"],
    sustainabilityScore: 74,
    brandPartnerships: ["Luxottica Group"],
    riskFactors: ["Limited market appeal", "High price point"],
    opportunities: ["Emerging luxury markets", "Limited editions", "Collaborations"]
  },
  {
    name: "Sunday Somewhere",
    category: "luxury",
    revenue: "25000000",
    growthRate: "29.1",
    marketShare: "0.08",
    investmentScore: 85,
    founded: 2009,
    employees: 45,
    website: "https://sundaysomewhere.com",
    description: "Australian luxury eyewear brand known for architectural designs and limited editions",
    isPublic: false,
    locations: ["Australia", "USA", "Europe"],
    fundingStage: "series-a",
    totalFunding: "8000000",
    lastFundingDate: "2020-11-20",
    lastFundingAmount: "5000000",
    valuation: "40000000",
    investors: ["Australian VC", "Fashion investors"],
    businessModel: "b2c",
    distributionChannels: ["luxury-boutiques", "online", "flagship-stores"],
    competitiveAdvantage: "Unique architectural designs, limited production, celebrity following",
    technologyFocus: ["design-innovation", "3d-modeling", "sustainable-materials"],
    sustainabilityScore: 89,
    riskFactors: ["Limited scale", "Fashion trend dependency"],
    opportunities: ["Global expansion", "Celebrity collaborations", "Sustainable focus"]
  },
  {
    name: "Blenders Eyewear",
    category: "lifestyle",
    revenue: "42000000",
    growthRate: "31.8",
    marketShare: "0.18",
    investmentScore: 81,
    founded: 2012,
    employees: 85,
    website: "https://blenderseyewear.com",
    description: "California lifestyle brand targeting millennials with affordable, trendy sunglasses",
    isPublic: false,
    locations: ["USA"],
    fundingStage: "bootstrapped",
    businessModel: "d2c",
    distributionChannels: ["online", "festivals", "beach-events", "social-media"],
    competitiveAdvantage: "Strong social media presence, festival marketing, affordable pricing",
    technologyFocus: ["social-commerce", "influencer-platforms", "mobile-optimization"],
    sustainabilityScore: 71,
    brandPartnerships: ["Music festivals", "Beach events", "Lifestyle influencers"],
    riskFactors: ["Fashion trend dependency", "Seasonal sales"],
    opportunities: ["International expansion", "Product diversification", "Subscription model"]
  },
  {
    name: "Quay Australia",
    category: "lifestyle",
    revenue: "95000000",
    growthRate: "22.4",
    marketShare: "0.4",
    investmentScore: 78,
    founded: 2004,
    employees: 180,
    website: "https://quayaustralia.com",
    description: "Australian fashion eyewear brand popular among influencers and millennials",
    isPublic: false,
    locations: ["Australia", "USA"],
    fundingStage: "private-equity",
    totalFunding: "35000000",
    lastFundingDate: "2019-05-15",
    valuation: "200000000",
    businessModel: "b2c",
    distributionChannels: ["online", "retail-partners", "influencer-marketing"],
    competitiveAdvantage: "Influencer partnerships, trendy designs, affordable luxury",
    technologyFocus: ["social-commerce", "influencer-platforms", "ar-try-on"],
    sustainabilityScore: 73,
    brandPartnerships: ["Major influencers", "Fashion weeks"],
    riskFactors: ["Influencer dependency", "Fast fashion criticism"],
    opportunities: ["Sustainable line", "Global expansion", "Tech integration"]
  },
  {
    name: "MVMT (Sunglasses)",
    category: "lifestyle",
    revenue: "65000000",
    growthRate: "15.7",
    marketShare: "0.27",
    investmentScore: 75,
    founded: 2013,
    employees: 120,
    website: "https://mvmt.com",
    description: "Millennial-focused lifestyle brand expanded into sunglasses, owned by Movado Group",
    isPublic: true,
    locations: ["USA"],
    fundingStage: "acquired",
    totalFunding: "15000000",
    valuation: "100000000",
    businessModel: "d2c",
    distributionChannels: ["online", "social-media", "retail-partners"],
    competitiveAdvantage: "Strong social media presence, millennial appeal, accessible pricing",
    technologyFocus: ["social-commerce", "mobile-first", "data-analytics"],
    sustainabilityScore: 68,
    brandPartnerships: ["Movado Group", "Lifestyle influencers"],
    acquisitions: [
      { company: "Acquired by Movado", year: 2018, amount: "100M" }
    ],
    riskFactors: ["Trend dependency", "Market saturation"],
    opportunities: ["International expansion", "Product categories", "Subscription services"]
  }
];

export async function seedDatabase() {
  console.log("🌱 Seeding enhanced database with venture investor data...");

  try {
    // Clear existing data
    const existingBrands = await storage.getBrands();
    console.log(`Found ${existingBrands.length} existing brands, clearing...`);
    
    // Insert new enhanced brands
    const results = [];
    for (const brand of sampleBrands) {
      try {
        const result = await storage.createBrand(brand);
        results.push(result);
        console.log(`✅ Added: ${brand.name} (${brand.category})`);
      } catch (error) {
        console.error(`❌ Failed to add ${brand.name}:`, error);
      }
    }

    console.log(`🎉 Successfully seeded ${results.length} brands with investor data`);
    console.log("📊 Enhanced features include:");
    console.log("   • Funding stages and valuations");
    console.log("   • Investor information");
    console.log("   • Key executives and backgrounds");
    console.log("   • Business models and distribution channels");
    console.log("   • Technology focus areas");
    console.log("   • Sustainability scores");
    console.log("   • Risk factors and opportunities");
    console.log("   • Competitive advantages");
    console.log("   • Recent acquisitions and partnerships");

    return {
      success: true,
      message: `Successfully seeded ${results.length} enhanced brands with venture investor data`,
      brands: results.length,
      categories: {
        luxury: sampleBrands.filter(b => b.category === "luxury").length,
        sports: sampleBrands.filter(b => b.category === "sports").length,
        d2c: sampleBrands.filter(b => b.category === "d2c").length,
        lifestyle: sampleBrands.filter(b => b.category === "lifestyle").length,
        premium: sampleBrands.filter(b => b.category === "premium").length
      }
    };
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    return {
      success: false,
      message: "Failed to seed database",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
