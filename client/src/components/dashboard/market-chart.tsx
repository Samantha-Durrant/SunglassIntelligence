import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartLine } from "lucide-react";
import { useState } from "react";

export default function MarketChart() {
  const [timeRange, setTimeRange] = useState("12");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">
            Market Growth Trends
          </CardTitle>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Last 3 months</SelectItem>
              <SelectItem value="6">Last 6 months</SelectItem>
              <SelectItem value="12">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {/* Chart placeholder */}
        <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
          <div className="text-center">
            <ChartLine className="text-4xl text-slate-400 mb-4 mx-auto" />
            <p className="text-slate-600">Interactive growth chart</p>
            <p className="text-sm text-slate-500 mt-1">
              Chart visualization will be implemented with Chart.js
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
