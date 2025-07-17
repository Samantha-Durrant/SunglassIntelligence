import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import KPICards from "@/components/dashboard/kpi-cards";
import MarketChart from "@/components/dashboard/market-chart";
import AiInsights from "@/components/dashboard/ai-insights";
import BrandTable from "@/components/dashboard/brand-table";
import QuickActions from "@/components/dashboard/quick-actions";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ["/api/metrics"],
  });

  const handleSearch = (query: string) => {
    // TODO: Implement global search functionality
    console.log("Searching for:", query);
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Market Dashboard"
          subtitle="Comprehensive analysis of 200+ sunglass brands"
          onSearch={handleSearch}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* KPI Cards */}
          <div className="mb-8">
            <KPICards metrics={metrics} isLoading={metricsLoading} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <MarketChart />
            <AiInsights />
          </div>

          {/* Brand Performance Table */}
          <div className="mb-8">
            <BrandTable />
          </div>

          {/* Quick Actions Section */}
          <QuickActions />
        </main>
      </div>
    </div>
  );
}
