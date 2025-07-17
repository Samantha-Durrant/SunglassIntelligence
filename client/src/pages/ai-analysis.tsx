import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Bot, Lightbulb, TrendingUp, AlertTriangle, Sparkles, Brain } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AiAnalysis() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: insights, isLoading } = useQuery({
    queryKey: ["/api/insights"],
  });

  const generateInsightsMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/insights/generate"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/insights"] });
      toast({
        title: "AI Analysis Complete",
        description: "New market insights have been generated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: "Failed to generate AI insights. Please check your OpenAI API configuration.",
        variant: "destructive",
      });
    },
  });

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return { icon: Lightbulb, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" };
      case "trend":
        return { icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" };
      case "risk":
        return { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" };
      default:
        return { icon: Lightbulb, color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200" };
    }
  };

  const groupedInsights = insights?.reduce((acc: any, insight: any) => {
    if (!acc[insight.type]) {
      acc[insight.type] = [];
    }
    acc[insight.type].push(insight);
    return acc;
  }, {}) || {};

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="AI Market Analysis"
          subtitle="AI-powered insights and market intelligence"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Analysis Controls */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bot className="w-8 h-8 text-purple-600 mr-3" />
                    <div>
                      <CardTitle>AI Analysis Engine</CardTitle>
                      <p className="text-sm text-slate-600 mt-1">
                        Generate comprehensive market insights using OpenAI analysis
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => generateInsightsMutation.mutate()}
                    disabled={generateInsightsMutation.isPending}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {generateInsightsMutation.isPending ? "Analyzing..." : "Generate New Analysis"}
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Insights Dashboard */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : insights && insights.length > 0 ? (
            <div className="space-y-8">
              {/* Investment Opportunities */}
              {groupedInsights.opportunity && (
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                    <Lightbulb className="w-5 h-5 text-emerald-600 mr-2" />
                    Investment Opportunities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {groupedInsights.opportunity.map((insight: any) => {
                      const { icon: Icon, color, bg, border } = getInsightIcon(insight.type);
                      return (
                        <Card key={insight.id} className={`${border}`}>
                          <CardHeader>
                            <div className="flex items-center">
                              <Icon className={`w-5 h-5 ${color} mr-2`} />
                              <CardTitle className="text-lg">{insight.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-slate-700">{insight.content}</p>
                            {insight.confidence && (
                              <div className="mt-4 flex items-center">
                                <span className="text-sm text-slate-600 mr-2">Confidence:</span>
                                <div className="flex-1 bg-slate-200 rounded-full h-2">
                                  <div 
                                    className="bg-emerald-500 h-2 rounded-full" 
                                    style={{ width: `${parseFloat(insight.confidence) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-slate-600 ml-2">
                                  {Math.round(parseFloat(insight.confidence) * 100)}%
                                </span>
                              </div>
                            )}
                            <div className="mt-4 text-xs text-slate-500">
                              Generated: {new Date(insight.createdAt).toLocaleDateString()}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Market Trends */}
              {groupedInsights.trend && (
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                    Market Trends
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {groupedInsights.trend.map((insight: any) => {
                      const { icon: Icon, color, bg, border } = getInsightIcon(insight.type);
                      return (
                        <Card key={insight.id} className={`${border}`}>
                          <CardHeader>
                            <div className="flex items-center">
                              <Icon className={`w-5 h-5 ${color} mr-2`} />
                              <CardTitle className="text-lg">{insight.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-slate-700">{insight.content}</p>
                            {insight.confidence && (
                              <div className="mt-4 flex items-center">
                                <span className="text-sm text-slate-600 mr-2">Confidence:</span>
                                <div className="flex-1 bg-slate-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full" 
                                    style={{ width: `${parseFloat(insight.confidence) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-slate-600 ml-2">
                                  {Math.round(parseFloat(insight.confidence) * 100)}%
                                </span>
                              </div>
                            )}
                            <div className="mt-4 text-xs text-slate-500">
                              Generated: {new Date(insight.createdAt).toLocaleDateString()}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Risk Alerts */}
              {groupedInsights.risk && (
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
                    Risk Alerts
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {groupedInsights.risk.map((insight: any) => {
                      const { icon: Icon, color, bg, border } = getInsightIcon(insight.type);
                      return (
                        <Card key={insight.id} className={`${border}`}>
                          <CardHeader>
                            <div className="flex items-center">
                              <Icon className={`w-5 h-5 ${color} mr-2`} />
                              <CardTitle className="text-lg">{insight.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-slate-700">{insight.content}</p>
                            {insight.confidence && (
                              <div className="mt-4 flex items-center">
                                <span className="text-sm text-slate-600 mr-2">Confidence:</span>
                                <div className="flex-1 bg-slate-200 rounded-full h-2">
                                  <div 
                                    className="bg-amber-500 h-2 rounded-full" 
                                    style={{ width: `${parseFloat(insight.confidence) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-slate-600 ml-2">
                                  {Math.round(parseFloat(insight.confidence) * 100)}%
                                </span>
                              </div>
                            )}
                            <div className="mt-4 text-xs text-slate-500">
                              Generated: {new Date(insight.createdAt).toLocaleDateString()}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16">
              <Brain className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No AI insights yet</h3>
              <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                Generate your first AI analysis to get market insights, investment opportunities, and risk assessments.
              </p>
              <Button
                onClick={() => generateInsightsMutation.mutate()}
                disabled={generateInsightsMutation.isPending}
                className="mt-6 bg-purple-600 hover:bg-purple-700"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate AI Analysis
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
