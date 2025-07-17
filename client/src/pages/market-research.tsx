import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Search, TrendingUp, BarChart3, PieChart, Globe, Users } from "lucide-react";

export default function MarketResearch() {
  const { data: brands, isLoading: brandsLoading } = useQuery({
    queryKey: ["/api/brands"],
  });

  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ["/api/metrics"],
  });

  // Calculate market insights from brand data
  const marketInsights = brands ? {
    totalBrands: brands.length,
    categories: brands.reduce((acc: any, brand: any) => {
      acc[brand.category] = (acc[brand.category] || 0) + 1;
      return acc;
    }, {}),
    avgGrowthRate: brands.reduce((sum: number, brand: any) => 
      sum + parseFloat(brand.growthRate || "0"), 0) / brands.length,
    topPerformers: brands
      .sort((a: any, b: any) => parseFloat(b.growthRate || "0") - parseFloat(a.growthRate || "0"))
      .slice(0, 5),
    marketLeaders: brands
      .sort((a: any, b: any) => parseFloat(b.marketShare || "0") - parseFloat(a.marketShare || "0"))
      .slice(0, 5),
  } : null;

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Market Research"
          subtitle="Comprehensive market analysis and trends"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Market Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Market Size</p>
                    <p className="text-2xl font-bold text-slate-900">
                      ${metrics ? (parseInt(metrics.marketSize) / 1000000000).toFixed(1) : "18.2"}B
                    </p>
                    <p className="text-sm text-emerald-600">+8.3% YoY</p>
                  </div>
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active Brands</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {marketInsights?.totalBrands || metrics?.totalBrands || 0}
                    </p>
                    <p className="text-sm text-blue-600">Tracked</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <BarChart3 className="text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Avg Growth Rate</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {marketInsights ? `${marketInsights.avgGrowthRate.toFixed(1)}%` : "12.5%"}
                    </p>
                    <p className="text-sm text-purple-600">Industry Average</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <PieChart className="text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Global Reach</p>
                    <p className="text-2xl font-bold text-slate-900">120+</p>
                    <p className="text-sm text-orange-600">Countries</p>
                  </div>
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                    <Globe className="text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Market Analysis Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-blue-600" />
                  Category Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                {marketInsights ? (
                  <div className="space-y-4">
                    {Object.entries(marketInsights.categories).map(([category, count]: [string, any]) => {
                      const percentage = (count / marketInsights.totalBrands) * 100;
                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize font-medium">{category}</span>
                            <span className="text-slate-600">{count} brands ({percentage.toFixed(1)}%)</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Search className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Loading category data...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Growth Leaders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
                  Growth Leaders
                </CardTitle>
              </CardHeader>
              <CardContent>
                {marketInsights?.topPerformers ? (
                  <div className="space-y-4">
                    {marketInsights.topPerformers.map((brand: any, index: number) => (
                      <div key={brand.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mr-3 ${
                            index === 0 ? 'bg-yellow-500' : 
                            index === 1 ? 'bg-gray-400' : 
                            index === 2 ? 'bg-orange-500' : 'bg-slate-400'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{brand.name}</p>
                            <p className="text-xs text-slate-500">{brand.category}</p>
                          </div>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                          +{parseFloat(brand.growthRate || "0").toFixed(1)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Loading growth data...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Market Leaders */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                Market Leaders by Share
              </CardTitle>
            </CardHeader>
            <CardContent>
              {marketInsights?.marketLeaders ? (
                <div className="space-y-4">
                  {marketInsights.marketLeaders.map((brand: any) => {
                    const marketShare = parseFloat(brand.marketShare || "0");
                    return (
                      <div key={brand.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <h4 className="font-medium text-slate-900">{brand.name}</h4>
                            <Badge variant="outline" className="ml-2">
                              {brand.category}
                            </Badge>
                          </div>
                          <span className="text-sm text-slate-600">{marketShare.toFixed(1)}%</span>
                        </div>
                        <Progress value={marketShare} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Loading market share data...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Research Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Search className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Deep Dive Analysis</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Perform detailed analysis on specific market segments or brands.
                </p>
                <Button className="w-full">Start Analysis</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="mx-auto h-12 w-12 text-emerald-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Trend Forecasting</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Predict future market trends using AI-powered analysis.
                </p>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Generate Forecast
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Custom Reports</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Create custom research reports for specific investment criteria.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Create Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
