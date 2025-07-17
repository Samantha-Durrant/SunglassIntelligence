import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/dashboard";
import Brands from "@/pages/brands";
import AiAnalysis from "@/pages/ai-analysis";
import MarketResearch from "@/pages/market-research";
import EmailReports from "@/pages/email-reports";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/brands" component={Brands} />
      <Route path="/ai-analysis" component={AiAnalysis} />
      <Route path="/market-research" component={MarketResearch} />
      <Route path="/email-reports" component={EmailReports} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
