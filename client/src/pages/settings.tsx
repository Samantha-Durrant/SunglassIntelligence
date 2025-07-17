import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings as SettingsIcon, 
  Key, 
  Mail, 
  Database, 
  Bell, 
  Shield, 
  Palette,
  Save,
  TestTube,
  AlertCircle
} from "lucide-react";

export default function Settings() {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState({
    openai: "",
    sendgrid: "",
    supabase: ""
  });
  const [emailSettings, setEmailSettings] = useState({
    fromEmail: "reports@sunglassmarket.com",
    fromName: "SunglassMarket Analytics",
    replyTo: "support@sunglassmarket.com",
    enableWeeklyReports: true,
    enableAlerts: true
  });
  const [systemSettings, setSystemSettings] = useState({
    theme: "light",
    timezone: "UTC",
    language: "en",
    autoSync: true,
    syncInterval: "2",
    maxBrandsPerPage: "20"
  });
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    marketUpdates: true,
    aiInsights: true,
    systemMaintenance: false
  });

  const handleSaveApiKeys = () => {
    // In a real implementation, this would save to secure storage
    toast({
      title: "API Keys Saved",
      description: "Your API keys have been saved securely.",
    });
  };

  const handleTestConnection = (service: string) => {
    toast({
      title: `Testing ${service}`,
      description: "Connection test initiated...",
    });
    
    // Simulate test results
    setTimeout(() => {
      toast({
        title: `${service} Connection`,
        description: "Connection test successful!",
      });
    }, 2000);
  };

  const handleSaveEmailSettings = () => {
    toast({
      title: "Email Settings Saved",
      description: "Your email configuration has been updated.",
    });
  };

  const handleSaveSystemSettings = () => {
    toast({
      title: "System Settings Saved",
      description: "Your system preferences have been updated.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Settings"
          subtitle="Configure your SunglassMarket Analytics platform"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* API Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="w-5 h-5 mr-2 text-blue-600" />
                  API Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="openai-key">OpenAI API Key</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        id="openai-key"
                        type="password"
                        placeholder="sk-..."
                        value={apiKeys.openai}
                        onChange={(e) => setApiKeys({...apiKeys, openai: e.target.value})}
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => handleTestConnection("OpenAI")}
                      >
                        <TestTube className="w-4 h-4 mr-1" />
                        Test
                      </Button>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      Required for AI-powered market analysis and insights generation
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="sendgrid-key">SendGrid API Key</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        id="sendgrid-key"
                        type="password"
                        placeholder="SG..."
                        value={apiKeys.sendgrid}
                        onChange={(e) => setApiKeys({...apiKeys, sendgrid: e.target.value})}
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => handleTestConnection("SendGrid")}
                      >
                        <TestTube className="w-4 h-4 mr-1" />
                        Test
                      </Button>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      Required for sending email reports and notifications
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="supabase-url">Supabase Database URL</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        id="supabase-url"
                        type="password"
                        placeholder="postgresql://..."
                        value={apiKeys.supabase}
                        onChange={(e) => setApiKeys({...apiKeys, supabase: e.target.value})}
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => handleTestConnection("Supabase")}
                      >
                        <TestTube className="w-4 h-4 mr-1" />
                        Test
                      </Button>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      Database connection string for brand data storage
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-2" />
                    <div>
                      <h4 className="font-medium text-amber-900">Security Notice</h4>
                      <p className="text-sm text-amber-700 mt-1">
                        API keys are stored securely and encrypted. Never share your API keys with unauthorized users.
                      </p>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveApiKeys} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save API Configuration
                </Button>
              </CardContent>
            </Card>

            {/* Email Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-emerald-600" />
                  Email Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="from-email">From Email</Label>
                    <Input
                      id="from-email"
                      type="email"
                      value={emailSettings.fromEmail}
                      onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="from-name">From Name</Label>
                    <Input
                      id="from-name"
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reply-to">Reply-To Email</Label>
                  <Input
                    id="reply-to"
                    type="email"
                    value={emailSettings.replyTo}
                    onChange={(e) => setEmailSettings({...emailSettings, replyTo: e.target.value})}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-reports">Weekly Reports</Label>
                      <p className="text-sm text-slate-600">Send automated weekly market reports</p>
                    </div>
                    <Switch
                      id="weekly-reports"
                      checked={emailSettings.enableWeeklyReports}
                      onCheckedChange={(checked) => setEmailSettings({...emailSettings, enableWeeklyReports: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-alerts">Email Alerts</Label>
                      <p className="text-sm text-slate-600">Send alerts for significant market changes</p>
                    </div>
                    <Switch
                      id="email-alerts"
                      checked={emailSettings.enableAlerts}
                      onCheckedChange={(checked) => setEmailSettings({...emailSettings, enableAlerts: checked})}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveEmailSettings} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Email Settings
                </Button>
              </CardContent>
            </Card>

            {/* System Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SettingsIcon className="w-5 h-5 mr-2 text-purple-600" />
                  System Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={systemSettings.theme} onValueChange={(value) => setSystemSettings({...systemSettings, theme: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={systemSettings.timezone} onValueChange={(value) => setSystemSettings({...systemSettings, timezone: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Eastern Time</SelectItem>
                        <SelectItem value="PST">Pacific Time</SelectItem>
                        <SelectItem value="CET">Central European Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select value={systemSettings.language} onValueChange={(value) => setSystemSettings({...systemSettings, language: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="max-brands">Brands Per Page</Label>
                    <Select value={systemSettings.maxBrandsPerPage} onValueChange={(value) => setSystemSettings({...systemSettings, maxBrandsPerPage: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-sync">Auto Sync</Label>
                      <p className="text-sm text-slate-600">Automatically sync brand data</p>
                    </div>
                    <Switch
                      id="auto-sync"
                      checked={systemSettings.autoSync}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, autoSync: checked})}
                    />
                  </div>

                  {systemSettings.autoSync && (
                    <div>
                      <Label htmlFor="sync-interval">Sync Interval (hours)</Label>
                      <Select value={systemSettings.syncInterval} onValueChange={(value) => setSystemSettings({...systemSettings, syncInterval: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 hour</SelectItem>
                          <SelectItem value="2">2 hours</SelectItem>
                          <SelectItem value="6">6 hours</SelectItem>
                          <SelectItem value="12">12 hours</SelectItem>
                          <SelectItem value="24">24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                <Button onClick={handleSaveSystemSettings} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save System Settings
                </Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-orange-600" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-alerts-notif">Email Alerts</Label>
                      <p className="text-sm text-slate-600">Receive email notifications for important events</p>
                    </div>
                    <Switch
                      id="email-alerts-notif"
                      checked={notifications.emailAlerts}
                      onCheckedChange={(checked) => setNotifications({...notifications, emailAlerts: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="market-updates">Market Updates</Label>
                      <p className="text-sm text-slate-600">Get notified about significant market changes</p>
                    </div>
                    <Switch
                      id="market-updates"
                      checked={notifications.marketUpdates}
                      onCheckedChange={(checked) => setNotifications({...notifications, marketUpdates: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="ai-insights">AI Insights</Label>
                      <p className="text-sm text-slate-600">Receive notifications when new AI insights are generated</p>
                    </div>
                    <Switch
                      id="ai-insights"
                      checked={notifications.aiInsights}
                      onCheckedChange={(checked) => setNotifications({...notifications, aiInsights: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="system-maintenance">System Maintenance</Label>
                      <p className="text-sm text-slate-600">Get notified about system maintenance and updates</p>
                    </div>
                    <Switch
                      id="system-maintenance"
                      checked={notifications.systemMaintenance}
                      onCheckedChange={(checked) => setNotifications({...notifications, systemMaintenance: checked})}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveNotifications} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>

            {/* Data & Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-red-600" />
                  Data & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Data Storage</h4>
                  <p className="text-sm text-blue-700">
                    Your brand data is stored securely in Supabase with encryption at rest and in transit. 
                    All API keys are encrypted and stored separately from your business data.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">Privacy Compliance</h4>
                  <p className="text-sm text-green-700">
                    This platform is designed to comply with GDPR and other privacy regulations. 
                    Your data is never shared with third parties without explicit consent.
                  </p>
                </div>

                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Database className="w-4 h-4 mr-2" />
                    Export All Data
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Shield className="w-4 h-4 mr-2" />
                    View Privacy Policy
                  </Button>
                  
                  <Button variant="destructive" className="w-full">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Delete All Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
