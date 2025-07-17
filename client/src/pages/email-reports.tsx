import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, Clock, CheckCircle, XCircle, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EmailReports() {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [isCustomReportOpen, setIsCustomReportOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: emailReports, isLoading } = useQuery({
    queryKey: ["/api/email-reports"],
  });

  const sendReportMutation = useMutation({
    mutationFn: (email: string) => 
      apiRequest("POST", "/api/email-reports/send", { recipientEmail: email }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/email-reports"] });
      setRecipientEmail("");
      toast({
        title: "Report Sent",
        description: "Market analysis report has been sent successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Send Failed",
        description: "Failed to send email report. Please check your SendGrid configuration.",
        variant: "destructive",
      });
    },
  });

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail) {
      toast({
        title: "Email Required",
        description: "Please enter a recipient email address.",
        variant: "destructive",
      });
      return;
    }
    sendReportMutation.mutate(recipientEmail);
  };

  const handleCustomReport = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("customEmail") as string;
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter a recipient email address.",
        variant: "destructive",
      });
      return;
    }
    
    sendReportMutation.mutate(email);
    setIsCustomReportOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Sent
        </Badge>;
      case "failed":
        return <Badge variant="destructive">
          <XCircle className="w-3 h-3 mr-1" />
          Failed
        </Badge>;
      case "pending":
        return <Badge variant="secondary">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Email Reports"
          subtitle="Automated market analysis reports via SendGrid"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Quick Send Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Send Report Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="w-5 h-5 mr-2 text-blue-600" />
                  Send Market Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendReport} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Recipient Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="investor@example.com"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Report Includes:</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Market overview and key metrics</li>
                      <li>• Top performing brands analysis</li>
                      <li>• AI-generated investment insights</li>
                      <li>• Growth opportunities and risks</li>
                      <li>• Category distribution trends</li>
                    </ul>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={sendReportMutation.isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {sendReportMutation.isPending ? "Sending..." : "Send Weekly Report"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Report Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-purple-600" />
                  Report Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-slate-900">Weekly Market Summary</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Comprehensive weekly analysis with key metrics and insights
                    </p>
                    <Button size="sm" className="mt-3" variant="outline">
                      Preview Template
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-slate-900">Investment Opportunities</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Focus on high-potential brands and investment opportunities
                    </p>
                    <Button size="sm" className="mt-3" variant="outline">
                      Preview Template
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-slate-900">Risk Assessment</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Market risks and potential challenges for investors
                    </p>
                    <Button size="sm" className="mt-3" variant="outline">
                      Preview Template
                    </Button>
                  </div>

                  <Button 
                    onClick={() => setIsCustomReportOpen(true)}
                    className="w-full mt-4"
                    variant="outline"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Custom Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Custom Report Form */}
          {isCustomReportOpen && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Create Custom Report</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCustomReport} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customEmail">Recipient Email</Label>
                      <Input id="customEmail" name="customEmail" type="email" required />
                    </div>
                    <div>
                      <Label htmlFor="reportType">Report Type</Label>
                      <Select name="reportType" defaultValue="custom">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="custom">Custom Analysis</SelectItem>
                          <SelectItem value="weekly">Weekly Summary</SelectItem>
                          <SelectItem value="investment">Investment Focus</SelectItem>
                          <SelectItem value="risk">Risk Assessment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject Line</Label>
                    <Input 
                      id="subject" 
                      name="subject" 
                      defaultValue="Custom Market Analysis Report"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea 
                      id="notes" 
                      name="notes" 
                      placeholder="Any specific focus areas or requirements..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsCustomReportOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={sendReportMutation.isPending}>
                      {sendReportMutation.isPending ? "Sending..." : "Send Custom Report"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Email History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-slate-600" />
                Email History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="h-4 bg-slate-200 rounded w-48 mb-2"></div>
                        <div className="h-3 bg-slate-200 rounded w-32"></div>
                      </div>
                      <div className="h-6 bg-slate-200 rounded w-16"></div>
                    </div>
                  ))}
                </div>
              ) : emailReports && emailReports.length > 0 ? (
                <div className="space-y-4">
                  {emailReports.map((report: any) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                      <div>
                        <h4 className="font-medium text-slate-900">{report.subject}</h4>
                        <p className="text-sm text-slate-600">
                          To: {report.recipientEmail} • 
                          Sent: {new Date(report.sentAt).toLocaleDateString()} at{" "}
                          {new Date(report.sentAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(report.status)}
                        <Button size="sm" variant="ghost">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Mail className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No email reports sent</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Send your first market analysis report to get started.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
