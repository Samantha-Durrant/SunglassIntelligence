import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus, Glasses, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Brands() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: brands, isLoading } = useQuery({
    queryKey: ["/api/brands", searchQuery],
    queryFn: () => {
      const url = searchQuery ? `/api/brands?search=${encodeURIComponent(searchQuery)}` : "/api/brands";
      return fetch(url, { credentials: "include" }).then(res => res.json());
    },
  });

  const addBrandMutation = useMutation({
    mutationFn: (brandData: any) => apiRequest("POST", "/api/brands", brandData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/brands"] });
      queryClient.invalidateQueries({ queryKey: ["/api/metrics"] });
      setIsAddDialogOpen(false);
      toast({
        title: "Brand Added",
        description: "New brand has been added successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add brand. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const brandData = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      revenue: formData.get("revenue") as string,
      growthRate: formData.get("growthRate") as string,
      marketShare: formData.get("marketShare") as string,
      investmentScore: parseInt(formData.get("investmentScore") as string),
      founded: parseInt(formData.get("founded") as string),
      employees: parseInt(formData.get("employees") as string),
      website: formData.get("website") as string,
      description: formData.get("description") as string,
      isPublic: formData.get("isPublic") === "true",
      locations: (formData.get("locations") as string).split(",").map(l => l.trim()),
    };

    addBrandMutation.mutate(brandData);
  };

  const formatRevenue = (revenue: string) => {
    const num = parseFloat(revenue || "0");
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(1)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(0)}M`;
    }
    return `$${num.toFixed(0)}`;
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Brand Database"
          subtitle="Manage and analyze sunglass brand data"
          onSearch={handleSearch}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Add Brand Button */}
          <div className="mb-6">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-brand-500 hover:bg-brand-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Brand
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Brand</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddBrand} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Brand Name</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select name="category" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="luxury">Luxury</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="sports">Sports Performance</SelectItem>
                          <SelectItem value="d2c">D2C Premium</SelectItem>
                          <SelectItem value="mass-market">Mass Market</SelectItem>
                          <SelectItem value="sustainable">Sustainable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="revenue">Revenue ($)</Label>
                      <Input id="revenue" name="revenue" type="number" />
                    </div>
                    <div>
                      <Label htmlFor="growthRate">Growth Rate (%)</Label>
                      <Input id="growthRate" name="growthRate" type="number" step="0.1" />
                    </div>
                    <div>
                      <Label htmlFor="marketShare">Market Share (%)</Label>
                      <Input id="marketShare" name="marketShare" type="number" step="0.1" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="investmentScore">Investment Score (1-100)</Label>
                      <Input id="investmentScore" name="investmentScore" type="number" min="1" max="100" />
                    </div>
                    <div>
                      <Label htmlFor="founded">Founded Year</Label>
                      <Input id="founded" name="founded" type="number" />
                    </div>
                    <div>
                      <Label htmlFor="employees">Employees</Label>
                      <Input id="employees" name="employees" type="number" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" name="website" type="url" />
                  </div>
                  
                  <div>
                    <Label htmlFor="locations">Locations (comma-separated)</Label>
                    <Input id="locations" name="locations" placeholder="USA, Europe, Asia" />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" rows={3} />
                  </div>
                  
                  <div>
                    <Label htmlFor="isPublic">Company Type</Label>
                    <Select name="isPublic">
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Public</SelectItem>
                        <SelectItem value="false">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={addBrandMutation.isPending}>
                      {addBrandMutation.isPending ? "Adding..." : "Add Brand"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Loading skeleton
              [...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-slate-200 rounded-lg mr-3"></div>
                      <div>
                        <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                        <div className="h-3 bg-slate-200 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-200 rounded"></div>
                      <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : brands && brands.length > 0 ? (
              brands.map((brand: any) => (
                <Card key={brand.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-slate-200 rounded-lg mr-3 flex items-center justify-center">
                          <Glasses className="text-slate-600 w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{brand.name}</CardTitle>
                          <Badge variant="secondary" className="mt-1">
                            {brand.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Revenue:</span>
                        <span className="font-medium">{formatRevenue(brand.revenue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Growth Rate:</span>
                        <span className="font-medium text-emerald-600">
                          +{parseFloat(brand.growthRate || "0").toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Market Share:</span>
                        <span className="font-medium">
                          {parseFloat(brand.marketShare || "0").toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Investment Score:</span>
                        <span className="font-medium">{brand.investmentScore}/100</span>
                      </div>
                      {brand.founded && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Founded:</span>
                          <span className="font-medium">{brand.founded}</span>
                        </div>
                      )}
                    </div>
                    
                    {brand.description && (
                      <p className="text-sm text-slate-600 mt-4 line-clamp-2">
                        {brand.description}
                      </p>
                    )}
                    
                    <Button className="w-full mt-4" variant="outline">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Glasses className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No brands found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery ? "Try adjusting your search criteria." : "Get started by adding a new brand."}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
