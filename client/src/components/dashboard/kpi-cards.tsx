import { Card, CardContent } from "@/components/ui/card";
import { Glasses, DollarSign, Target, Brain } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface KPICardsProps {
  metrics?: {
    totalBrands: number;
    marketSize: string;
    opportunities: number;
    insights: number;
  };
  isLoading?: boolean;
}

export default function KPICards({ metrics, isLoading }: KPICardsProps) {
  const cards = [
    {
      title: "Total Brands Analyzed",
      value: metrics?.totalBrands || 0,
      change: "+12.5%",
      changeLabel: "vs last month",
      icon: Glasses,
      iconBg: "bg-brand-50",
      iconColor: "text-brand-500",
    },
    {
      title: "Market Size",
      value: `$${(parseInt(metrics?.marketSize || "0") / 1000000000).toFixed(1)}B`,
      change: "+8.3%",
      changeLabel: "YoY growth",
      icon: DollarSign,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
    {
      title: "Investment Opportunities",
      value: metrics?.opportunities || 0,
      change: "High potential",
      changeLabel: "",
      icon: Target,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
    },
    {
      title: "AI Insights Generated",
      value: metrics?.insights || 0,
      change: "This week",
      changeLabel: "",
      icon: Brain,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-12 w-12 rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{card.title}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{card.value}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-emerald-600 text-sm font-medium">{card.change}</span>
                    {card.changeLabel && (
                      <span className="text-slate-500 text-sm ml-1">{card.changeLabel}</span>
                    )}
                  </div>
                </div>
                <div className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`${card.iconColor} text-xl`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
