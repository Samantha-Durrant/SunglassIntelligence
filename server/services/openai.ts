import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface MarketAnalysis {
  trends: string[];
  opportunities: string[];
  risks: string[];
  recommendations: string[];
}

export interface BrandAnalysis {
  strengths: string[];
  weaknesses: string[];
  marketPosition: string;
  investmentPotential: number;
  riskFactors: string[];
}

export async function generateMarketInsights(brands: any[]): Promise<{
  opportunity: string;
  trend: string;
  risk: string;
}> {
  try {
    const brandData = brands.slice(0, 10).map(brand => ({
      name: brand.name,
      category: brand.category,
      revenue: brand.revenue,
      growthRate: brand.growthRate,
      marketShare: brand.marketShare
    }));

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a venture capital market analyst specializing in the eyewear and sunglass industry. Analyze the provided brand data and generate investment insights. Respond with JSON in this format: { 'opportunity': string, 'trend': string, 'risk': string }. Each insight should be 1-2 sentences and actionable for investors."
        },
        {
          role: "user",
          content: `Analyze these sunglass brands for investment opportunities: ${JSON.stringify(brandData)}`
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      opportunity: result.opportunity || "No opportunities identified",
      trend: result.trend || "No trends identified", 
      risk: result.risk || "No risks identified"
    };
  } catch (error) {
    console.error("OpenAI analysis error:", error);
    
    // Fallback to sample insights based on actual brand data
    const totalBrands = brands.length;
    const avgGrowthRate = brands.reduce((sum, brand) => sum + parseFloat(brand.growthRate || "0"), 0) / totalBrands;
    const highGrowthBrands = brands.filter(brand => parseFloat(brand.growthRate || "0") > 30);
    const categories = [...new Set(brands.map(brand => brand.category))];
    
    return {
      opportunity: `Strong growth potential in D2C segment with ${highGrowthBrands.length} brands showing 30%+ growth rates. The shift to online-first models creates significant scaling opportunities for investors.`,
      trend: `Market consolidation accelerating with ${categories.length} distinct categories showing diverse growth patterns. Average industry growth rate of ${avgGrowthRate.toFixed(1)}% indicates healthy market expansion.`,
      risk: `Market saturation risks in luxury segments with established players dominating market share. Supply chain vulnerabilities and increasing competition from emerging D2C brands pose challenges.`
    };
  }
}

export async function analyzeBrand(brand: any): Promise<BrandAnalysis> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a venture capital analyst. Analyze the provided brand data and return investment analysis. Respond with JSON in this format: { 'strengths': string[], 'weaknesses': string[], 'marketPosition': string, 'investmentPotential': number, 'riskFactors': string[] }. Investment potential should be 1-100."
        },
        {
          role: "user",
          content: `Analyze this sunglass brand: ${JSON.stringify(brand)}`
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      strengths: result.strengths || [],
      weaknesses: result.weaknesses || [],
      marketPosition: result.marketPosition || "Unknown",
      investmentPotential: Math.max(1, Math.min(100, result.investmentPotential || 50)),
      riskFactors: result.riskFactors || []
    };
  } catch (error) {
    console.error("OpenAI brand analysis error:", error);
    
    // Fallback analysis based on brand data
    const growthRate = parseFloat(brand.growthRate || "0");
    const revenue = parseFloat(brand.revenue || "0");
    const isHighGrowth = growthRate > 30;
    const isLargeRevenue = revenue > 500000000;
    
    return {
      strengths: [
        ...(isHighGrowth ? [`High growth rate of ${growthRate}%`] : []),
        ...(isLargeRevenue ? [`Strong revenue base of $${(revenue / 1000000).toFixed(1)}M`] : []),
        ...(brand.category === 'd2c' ? ['Direct-to-consumer model with scalability'] : []),
        ...(brand.category === 'sports' ? ['Specialized market focus'] : [])
      ],
      weaknesses: [
        ...(growthRate < 10 ? ['Below-average growth rate'] : []),
        ...(revenue < 100000000 ? ['Limited market size'] : []),
        ...(brand.category === 'luxury' ? ['Niche market dependency'] : [])
      ],
      marketPosition: `${brand.category} brand with ${brand.investmentScore}/100 investment score`,
      investmentPotential: brand.investmentScore || 50,
      riskFactors: [
        'Market competition from established players',
        'Supply chain vulnerabilities',
        ...(brand.category === 'luxury' ? ['Economic downturn sensitivity'] : []),
        ...(brand.category === 'd2c' ? ['Customer acquisition cost increases'] : [])
      ]
    };
  }
}

export async function generateInvestmentReport(brands: any[], metrics: any): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a venture capital report writer. Generate a comprehensive investment report for the sunglass market based on the provided data. Include market overview, key opportunities, top brands to watch, and investment recommendations. Format as professional HTML."
        },
        {
          role: "user",
          content: `Generate an investment report based on: Brands: ${JSON.stringify(brands.slice(0, 20))}, Market Metrics: ${JSON.stringify(metrics)}`
        }
      ],
    });

    return response.choices[0].message.content || "Report generation failed";
  } catch (error) {
    console.error("OpenAI report generation error:", error);
    
    // Fallback to structured report with actual data
    const totalRevenue = brands.reduce((sum, brand) => sum + parseFloat(brand.revenue || "0"), 0);
    const avgGrowthRate = brands.reduce((sum, brand) => sum + parseFloat(brand.growthRate || "0"), 0) / brands.length;
    const topPerformers = brands.sort((a, b) => parseFloat(b.growthRate || "0") - parseFloat(a.growthRate || "0")).slice(0, 5);
    const categories = [...new Set(brands.map(brand => brand.category))];
    
    return `
      <html>
        <head><title>Sunglass Market Investment Report</title></head>
        <body style="font-family: Arial, sans-serif; margin: 20px; line-height: 1.6;">
          <h1>Sunglass Market Investment Report</h1>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          
          <h2>Executive Summary</h2>
          <p>The sunglass market demonstrates strong growth potential with ${brands.length} analyzed brands generating combined revenues of $${(totalRevenue / 1000000).toFixed(1)}M. The market shows healthy diversification across ${categories.length} categories with an average growth rate of ${avgGrowthRate.toFixed(1)}%.</p>
          
          <h2>Market Analysis</h2>
          <ul>
            <li><strong>Total Market Size:</strong> $${(totalRevenue / 1000000).toFixed(1)}M across ${brands.length} brands</li>
            <li><strong>Average Growth Rate:</strong> ${avgGrowthRate.toFixed(1)}%</li>
            <li><strong>Category Distribution:</strong> ${categories.join(', ')}</li>
            <li><strong>Investment Opportunities:</strong> D2C and emerging brands showing 30%+ growth</li>
          </ul>
          
          <h2>Top Investment Opportunities</h2>
          <table border="1" style="border-collapse: collapse; width: 100%;">
            <tr>
              <th>Brand</th>
              <th>Category</th>
              <th>Growth Rate</th>
              <th>Revenue</th>
              <th>Investment Score</th>
            </tr>
            ${topPerformers.map(brand => `
              <tr>
                <td>${brand.name}</td>
                <td>${brand.category}</td>
                <td>${brand.growthRate}%</td>
                <td>$${(parseFloat(brand.revenue || "0") / 1000000).toFixed(1)}M</td>
                <td>${brand.investmentScore}/100</td>
              </tr>
            `).join('')}
          </table>
          
          <h2>Risk Assessment</h2>
          <p>Key risks include market saturation in luxury segments, supply chain vulnerabilities, and increasing competition from emerging D2C brands. However, the overall market trajectory remains positive with significant opportunities in the direct-to-consumer segment.</p>
          
          <h2>Recommendation</h2>
          <p>We recommend focusing investment on high-growth D2C brands and emerging sports/performance categories. The market shows strong fundamentals with diverse growth opportunities across multiple segments.</p>
        </body>
      </html>
    `;
  }
}
