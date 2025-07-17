import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Glasses } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface Brand {
  id: number;
  name: string;
  category: string;
  revenue: string;
  growthRate: string;
  marketShare: string;
  investmentScore: number;
}

export default function BrandTable() {
  const [searchFilter, setSearchFilter] = useState("");
  const [sortBy, setSortBy] = useState("revenue");

  const { data: brands, isLoading } = useQuery({
    queryKey: ["/api/brands"],
  });

  const filteredBrands = brands?.filter((brand: Brand) =>
    brand.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    brand.category.toLowerCase().includes(searchFilter.toLowerCase())
  ) || [];

  const sortedBrands = [...filteredBrands].sort((a, b) => {
    switch (sortBy) {
      case "revenue":
        return parseFloat(b.revenue || "0") - parseFloat(a.revenue || "0");
      case "growth":
        return parseFloat(b.growthRate || "0") - parseFloat(a.growthRate || "0");
      case "marketShare":
        return parseFloat(b.marketShare || "0") - parseFloat(a.marketShare || "0");
      default:
        return 0;
    }
  });

  const formatRevenue = (revenue: string) => {
    const num = parseFloat(revenue || "0");
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(1)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(0)}M`;
    }
    return `$${num.toFixed(0)}`;
  };

  const formatGrowthRate = (rate: string) => {
    const num = parseFloat(rate || "0");
    return `+${num.toFixed(1)}%`;
  };

  const formatMarketShare = (share: string) => {
    const num = parseFloat(share || "0");
    return `${num.toFixed(1)}%`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Brands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">
            Top Performing Brands
          </CardTitle>
          <div className="flex items-center space-x-3">
            <Input
              type="text"
              placeholder="Filter brands..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-48"
            />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Sort by Revenue</SelectItem>
                <SelectItem value="growth">Sort by Growth</SelectItem>
                <SelectItem value="marketShare">Sort by Market Share</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {sortedBrands.length === 0 ? (
          <div className="text-center py-8">
            <Glasses className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No brands found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchFilter ? "Try adjusting your search criteria." : "Add some brands to get started."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Brand</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Revenue Est.</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Growth Rate</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Market Share</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Investment Score</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedBrands.slice(0, 10).map((brand: Brand) => (
                  <tr key={brand.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-slate-200 rounded-lg mr-3 flex items-center justify-center">
                          <Glasses className="text-slate-600 w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{brand.name}</p>
                          <p className="text-sm text-slate-500">{brand.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-900 font-medium">
                      {formatRevenue(brand.revenue)}
                    </td>
                    <td className="py-4 px-4">
                      <Badge 
                        variant="secondary" 
                        className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                      >
                        {formatGrowthRate(brand.growthRate)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-slate-900">
                      {formatMarketShare(brand.marketShare)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Progress 
                          value={brand.investmentScore || 0} 
                          className="w-16 mr-2" 
                        />
                        <span className="text-sm text-slate-600">
                          {brand.investmentScore || 0}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-brand-600 hover:text-brand-700"
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {sortedBrands.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-slate-600">
              Showing {Math.min(10, sortedBrands.length)} of {sortedBrands.length} brands
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button size="sm" className="bg-brand-500 hover:bg-brand-600">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
