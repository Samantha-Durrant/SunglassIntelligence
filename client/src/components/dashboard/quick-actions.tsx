import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Database, Bot, NotebookPen, FolderSync, Brain } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function QuickActions() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const sendReportMutation = useMutation({
    mutationFn: (recipientEmail: string) => 
      apiRequest("POST", "/api/email-reports/send", { recipientEmail }),
    onSuccess: () => {
      toast({
        title: "Report Sent",
        description: "Weekly market report has been sent successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Send Failed",
        description: "Failed to send email report. Please try again.",
        variant: "destructive",
      });
    },
  });

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

  const analysisMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/insights/generate"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/insights"] });
      toast({
        title: "Analysis Complete",
        description: "AI market analysis has been completed.",
      });
    },
    onError: () => {
      toast({
        title: "Analysis Failed",
        description: "Failed to run AI analysis. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSendReport = () => {
    // For demo purposes, using a default email
    const email = "investor@example.com";
    sendReportMutation.mutate(email);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Email Report Generator */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Mail className="text-blue-600" />
            </div>
            <CardTitle className="text-lg font-semibold text-slate-900">
              Email Reports
            </CardTitle>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Generate and send automated market analysis reports to stakeholders.
          </p>
          <Button 
            onClick={handleSendReport}
            disabled={sendReportMutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <NotebookPen className="mr-2 w-4 h-4" />
            {sendReportMutation.isPending ? "Sending..." : "Send Weekly Report"}
          </Button>
        </CardContent>
      </Card>

      {/* Data FolderSync Status */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
              <Database className="text-emerald-600" />
            </div>
            <CardTitle className="text-lg font-semibold text-slate-900">
              Database FolderSync
            </CardTitle>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Last updated 2 hours ago. Keep your brand data synchronized.
          </p>
          <Button 
            onClick={() => syncMutation.mutate()}
            disabled={syncMutation.isPending}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            <FolderSync className={`mr-2 w-4 h-4 ${syncMutation.isPending ? 'animate-spin' : ''}`} />
            {syncMutation.isPending ? "Syncing..." : "FolderSync Now"}
          </Button>
        </CardContent>
      </Card>

      {/* AI Analysis Queue */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <Bot className="text-purple-600" />
            </div>
            <CardTitle className="text-lg font-semibold text-slate-900">
              AI Analysis
            </CardTitle>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Run comprehensive market analysis using OpenAI integration.
          </p>
          <Button 
            onClick={() => analysisMutation.mutate()}
            disabled={analysisMutation.isPending}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <Brain className="mr-2 w-4 h-4" />
            {analysisMutation.isPending ? "Analyzing..." : "Run Analysis"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
