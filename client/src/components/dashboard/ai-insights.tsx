import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Lightbulb, TrendingUp, AlertTriangle, Sparkles } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function AiInsights() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: insights, isLoading } = useQuery({
    queryKey: ["/api/insights"],
  });

  const generateInsightsMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/insights/generate"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/insights"] });
      queryClient.invalidateQueries({ queryKey: ["/api/metrics"] });
      toast({
        title: "AI Insights Generated",
        description: "New market insights have been generated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: "Failed to generate AI insights. Please try again.",
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
            <Bot className="text-purple-600" />
          </div>
          <CardTitle className="text-lg font-semibold text-slate-900">
            AI Market Insights
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex items-start">
                    <Skeleton className="w-5 h-5 rounded mr-3 mt-1" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : insights && insights.length > 0 ? (
            insights.slice(-3).map((insight: any) => {
              const { icon: Icon, color, bg, border } = getInsightIcon(insight.type);
              return (
                <div key={insight.id} className={`${bg} border ${border} rounded-lg p-4`}>
                  <div className="flex items-start">
                    <Icon className={`${color} mt-1 mr-3 w-5 h-5`} />
                    <div>
                      <h4 className={`font-medium ${color.replace('600', '900')}`}>
                        {insight.title}
                      </h4>
                      <p className={`text-sm ${color.replace('600', '700')} mt-1`}>
                        {insight.content}
                      </p>
                      {insight.confidence && (
                        <div className="mt-2">
                          <span className={`text-xs ${color.replace('600', '600')} font-medium`}>
                            Confidence: {Math.round(parseFloat(insight.confidence) * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <Bot className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No insights yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Generate AI insights to get market analysis.
              </p>
            </div>
          )}
        </div>
        
        <Button 
          onClick={() => generateInsightsMutation.mutate()}
          disabled={generateInsightsMutation.isPending}
          className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
        >
          <Sparkles className="mr-2 w-4 h-4" />
          {generateInsightsMutation.isPending ? "Generating..." : "Generate New Insights"}
        </Button>
      </CardContent>
    </Card>
  );
}
