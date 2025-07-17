import { useState } from "react";
import { Search, FolderSync, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  title: string;
  subtitle: string;
  onSearch?: (query: string) => void;
}

export default function Header({ title, subtitle, onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const syncMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/sync"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/metrics"] });
      queryClient.invalidateQueries({ queryKey: ["/api/brands"] });
      toast({
        title: "FolderSync Complete",
        description: "Database has been synchronized successfully.",
      });
    },
    onError: () => {
      toast({
        title: "FolderSync Failed",
        description: "Failed to synchronize database. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your report is being generated and will download shortly.",
    });
    // TODO: Implement actual export functionality
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-600 mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Search */}
          {onSearch && (
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10"
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            </form>
          )}
          
          {/* FolderSync Status */}
          <div className="flex items-center text-sm text-emerald-600">
            <FolderSync 
              className={`mr-2 w-4 h-4 ${syncMutation.isPending ? 'animate-spin' : ''}`} 
            />
            Last sync: 2 hours ago
          </div>
          
          {/* FolderSync Button */}
          <Button
            onClick={() => syncMutation.mutate()}
            disabled={syncMutation.isPending}
            variant="outline"
            size="sm"
          >
            <FolderSync className="w-4 h-4 mr-2" />
            {syncMutation.isPending ? "Syncing..." : "FolderSync Now"}
          </Button>
          
          {/* Export Button */}
          <Button onClick={handleExport} className="bg-brand-500 hover:bg-brand-600">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>
    </header>
  );
}
