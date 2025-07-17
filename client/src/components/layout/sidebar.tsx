import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  ChartLine, 
  Database, 
  Bot, 
  Search, 
  Mail, 
  Settings, 
  Glasses,
  User
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: ChartLine },
  { name: "Brand Database", href: "/brands", icon: Database },
  { name: "AI Analysis", href: "/ai-analysis", icon: Bot },
  { name: "Market Research", href: "/market-research", icon: Search },
  { name: "Email Reports", href: "/email-reports", icon: Mail },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 bg-white shadow-lg border-r border-slate-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
            <Glasses className="text-white text-lg" />
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-bold text-slate-900">SunglassMarket</h1>
            <p className="text-xs text-slate-500">Analytics Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <a
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      isActive
                        ? "text-white bg-brand-500"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    )}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
            <User className="text-slate-600 text-sm" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-slate-900">John Investor</p>
            <p className="text-xs text-slate-500">Venture Capital</p>
          </div>
        </div>
      </div>
    </div>
  );
}
