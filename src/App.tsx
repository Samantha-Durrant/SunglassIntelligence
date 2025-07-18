import { useState, useEffect } from 'react';

interface Brand {
  id: number;
  name: string;
  category: string;
  founded: number;
  revenue: number;
  growthRate: number;
  marketShare: number;
  investmentScore: number;
  headquarters: string;
  description: string;
}

interface Metrics {
  totalBrands: number;
  totalRevenue: number;
  avgGrowthRate: number;
  totalMarketShare: number;
}

function App() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [brandsResponse, metricsResponse] = await Promise.all([
        fetch('/api/brands'),
        fetch('/api/metrics')
      ]);
      
      const brandsData = await brandsResponse.json();
      const metricsData = await metricsResponse.json();
      
      setBrands(brandsData);
      setMetrics(metricsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const seedData = async () => {
    try {
      const response = await fetch('/api/seed', { method: 'POST' });
      const result = await response.json();
      alert(result.message);
      loadData();
    } catch (error) {
      console.error('Error seeding data:', error);
      alert('Error seeding data');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading SunglassIntelligence...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">🕶️ SunglassIntelligence</h1>
              <span className="ml-3 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">React</span>
            </div>
            <nav className="flex space-x-8">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`${activeTab === 'dashboard' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setActiveTab('brands')}
                className={`${activeTab === 'brands' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Brands
              </button>
              <button 
                onClick={() => setActiveTab('analytics')}
                className={`${activeTab === 'analytics' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Analytics
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Market Overview</h2>
              
              {/* KPI Cards */}
              {metrics && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">B</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Total Brands</p>
                        <p className="text-2xl font-bold text-gray-900">{metrics.totalBrands}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">$</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">${(metrics.totalRevenue / 1000000).toFixed(1)}M</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">↗</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Avg Growth Rate</p>
                        <p className="text-2xl font-bold text-gray-900">{metrics.avgGrowthRate}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">%</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Market Share</p>
                        <p className="text-2xl font-bold text-gray-900">{metrics.totalMarketShare}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Top Brands Table */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Top Brands</h3>
                  <button 
                    onClick={seedData}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                  >
                    Seed Data
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {brands.slice(0, 5).map(brand => (
                        <tr key={brand.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{brand.name}</div>
                            <div className="text-sm text-gray-500">{brand.headquarters}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">{brand.category}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${(brand.revenue / 1000000).toFixed(0)}M
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className={brand.growthRate > 10 ? 'text-green-600' : 'text-gray-600'}>{brand.growthRate}%</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                              <span className="font-medium">{brand.investmentScore}</span>
                              <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{width: `${brand.investmentScore}%`}}></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Brands Tab */}
          {activeTab === 'brands' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Sunglass Brands</h2>
                <button 
                  onClick={seedData}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Seed Sample Data
                </button>
              </div>
              
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">All Brands ({brands.length})</h3>
                </div>
                <div className="overflow-x-auto max-h-96">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Founded</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {brands.map(brand => (
                        <tr key={brand.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{brand.name}</div>
                            <div className="text-sm text-gray-500">{brand.headquarters}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">{brand.category}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{brand.founded}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${(brand.revenue / 1000000).toFixed(0)}M
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className={brand.growthRate > 10 ? 'text-green-600' : 'text-gray-600'}>{brand.growthRate}%</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                              <span className="font-medium">{brand.investmentScore}</span>
                              <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{width: `${brand.investmentScore}%`}}></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Market Analytics</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Category Distribution</h3>
                  <div className="space-y-3">
                    {['Luxury', 'Sports', 'D2C'].map(category => {
                      const count = brands.filter(b => b.category === category).length;
                      const percentage = brands.length > 0 ? ((count / brands.length) * 100).toFixed(1) : '0';
                      return (
                        <div key={category} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{category}</span>
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-2">{count} brands</span>
                            <span className="text-xs text-gray-500">({percentage}%)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">High Growth Brands</h3>
                  <div className="space-y-2">
                    {brands
                      .filter(b => b.growthRate > 15)
                      .sort((a, b) => b.growthRate - a.growthRate)
                      .slice(0, 5)
                      .map(brand => (
                        <div key={brand.id} className="flex justify-between">
                          <span className="text-sm text-gray-600">{brand.name}</span>
                          <span className="text-sm font-medium text-green-600">{brand.growthRate}%</span>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Investment Leaders</h3>
                  <div className="space-y-2">
                    {brands
                      .sort((a, b) => b.investmentScore - a.investmentScore)
                      .slice(0, 5)
                      .map(brand => (
                        <div key={brand.id} className="flex justify-between">
                          <span className="text-sm text-gray-600">{brand.name}</span>
                          <span className="text-sm font-medium text-blue-600">{brand.investmentScore}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Market Summary */}
              <div className="mt-8 bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Market Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{brands.length}</div>
                    <div className="text-sm text-gray-600">Total Brands</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {brands.length > 0 ? brands.filter(b => b.growthRate > 10).length : 0}
                    </div>
                    <div className="text-sm text-gray-600">Fast Growing</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {brands.length > 0 ? brands.filter(b => b.investmentScore > 80).length : 0}
                    </div>
                    <div className="text-sm text-gray-600">High Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {metrics ? `$${(metrics.totalRevenue / 1000000000).toFixed(1)}B` : '$0B'}
                    </div>
                    <div className="text-sm text-gray-600">Market Size</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
