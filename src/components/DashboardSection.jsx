import React from 'react';

const DashboardSection = () => {
  return (
    <div className="bg-gray-900 rounded-2xl p-8 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-4xl font-bold text-white mb-4">
          Easy management tools
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-xl">
          Track your orders, manage products, and monitor sales in real time with a
          smart, intuitive dashboard that keeps everything clear, whether you're on
          desktop or mobile.
        </p>

        {/* Dashboard mockup */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="text-white font-semibold">Fw</div>
              <div className="text-white">Grimes Lipstick</div>
              <span className="bg-green-500 text-xs px-2 py-1 rounded">Live</span>
            </div>
            <div className="flex items-center space-x-4">
              <input
                className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
                placeholder="Search products, orders, options, etc."
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-white text-3xl font-bold mb-2">$8960.50</div>
              <div className="text-gray-400 text-sm">Revenue (USD)</div>
              {/* Mini chart */}
              <div className="mt-4 h-20 relative">
                <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                  <path
                    d="M 0 60 Q 50 40, 100 45 T 200 30"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  <path
                    d="M 0 60 Q 50 40, 100 45 T 200 30 L 200 80 L 0 80 Z"
                    fill="url(#gradient)"
                    opacity="0.2"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div>
              <div className="text-white text-3xl font-bold mb-2">1268</div>
              <div className="text-gray-400 text-sm">Orders</div>
              {/* Mini chart */}
              <div className="mt-4 h-20 relative">
                <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                  <path
                    d="M 0 50 Q 50 30, 100 40 T 200 25"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                  />
                  <path
                    d="M 0 50 Q 50 30, 100 40 T 200 25 L 200 80 L 0 80 Z"
                    fill="url(#gradient2)"
                    opacity="0.2"
                  />
                  <defs>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="space-y-3 mb-6">
            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3 flex items-center">
              <span className="text-yellow-500 mr-3">⚠</span>
              <span className="text-white text-sm">You have 18 orders left to send</span>
            </div>
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-3 flex items-center">
              <span className="text-green-500 mr-3">✓</span>
              <span className="text-white text-sm">Offer free shipping on orders over $75</span>
            </div>
          </div>

          {/* Orders list */}
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                <div>
                  <div className="text-white text-sm font-medium">Marcos Assis</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="bg-gray-600 text-white text-xs px-3 py-1 rounded-full">Order placed</span>
                <span className="text-white text-sm">$24.50</span>
              </div>
            </div>
            <div className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                <div>
                  <div className="text-white text-sm font-medium">Adrian Samson</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">In production</span>
                <span className="text-white text-sm">$104.12</span>
              </div>
            </div>
            <div className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                <div>
                  <div className="text-white text-sm font-medium">Phillip Vaccaro</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="bg-yellow-600 text-white text-xs px-3 py-1 rounded-full">Cancelled</span>
                <span className="text-white text-sm">$15.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile mockup overlay */}
        <div className="absolute right-8 top-40 w-72 bg-gray-800 rounded-3xl p-4 border-4 border-gray-900 shadow-2xl hidden lg:block">
          <div className="bg-white rounded-2xl overflow-hidden">
            {/* Mobile header */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-b">
              <div className="text-sm font-semibold">9:41</div>
              <div className="flex space-x-1">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            {/* Mobile content */}
            <div className="p-4">
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-1">Today 7 days 30 days 90 days</div>
                <div className="text-2xl font-bold mb-1">$8960.50</div>
                <div className="text-sm text-gray-500">Revenue (USD)</div>
              </div>

              {/* Mini charts */}
              <div className="h-32 mb-4">
                <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                  <path
                    d="M 0 80 Q 75 50, 150 60 T 300 40"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  <path
                    d="M 0 60 Q 75 35, 150 45 T 300 30"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <div className="flex space-x-2 mb-4">
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Thank your supporters</span>
                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">Offer first sale</span>
              </div>

              {/* Order items */}
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded"></div>
                    <div>
                      <div className="text-sm font-medium">Marcos Assis</div>
                      <div className="text-xs text-gray-500">Order placed</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">$24.50</div>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded"></div>
                    <div>
                      <div className="text-sm font-medium">Adrian Samson</div>
                      <div className="text-xs text-gray-500">In production</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">$104.12</div>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded"></div>
                    <div>
                      <div className="text-sm font-medium">Rocco Vaccaro</div>
                      <div className="text-xs text-gray-500">In production</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">$606.91</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
