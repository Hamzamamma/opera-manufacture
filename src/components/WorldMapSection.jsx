import React from 'react';

const WorldMapSection = () => {
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
          Global manufacturing, local delivery
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-xl">
          Our worldwide manufacturing network ensures your products are made and
          shipped from locations near your customers, significantly reducing delivery
          times and costs.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div>
            <div className="text-white text-4xl font-bold mb-2">17</div>
            <div className="text-gray-400">manufacturers</div>
          </div>
          <div>
            <div className="text-white text-4xl font-bold mb-2">$4.80</div>
            <div className="text-gray-400">avg. ship cost</div>
          </div>
          <div>
            <div className="text-white text-4xl font-bold mb-2">4 days</div>
            <div className="text-gray-400">avg. ship time</div>
          </div>
        </div>

        {/* World Map */}
        <div className="relative h-96">
          {/* Hexagonal pattern map background */}
          <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet">
            {/* Create hexagonal dot pattern for continents */}
            <defs>
              <pattern id="hexPattern" x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="8.66" r="1.5" fill="#374151" opacity="0.6"/>
              </pattern>

              {/* Gradient for glow effect */}
              <radialGradient id="glowGradient">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/>
              </radialGradient>
            </defs>

            {/* Continents approximation using hexagonal patterns */}
            {/* North America */}
            <ellipse cx="250" cy="180" rx="120" ry="100" fill="url(#hexPattern)"/>

            {/* South America */}
            <ellipse cx="320" cy="380" rx="70" ry="110" fill="url(#hexPattern)"/>

            {/* Europe */}
            <ellipse cx="550" cy="160" rx="80" ry="60" fill="url(#hexPattern)"/>

            {/* Africa */}
            <ellipse cx="570" cy="320" rx="90" ry="110" fill="url(#hexPattern)"/>

            {/* Asia */}
            <ellipse cx="800" cy="200" rx="180" ry="120" fill="url(#hexPattern)"/>

            {/* Australia */}
            <ellipse cx="920" cy="420" rx="70" ry="50" fill="url(#hexPattern)"/>

            {/* Location markers with connections */}
            {/* United States */}
            <g>
              <circle cx="250" cy="200" r="30" fill="url(#glowGradient)"/>
              <circle cx="250" cy="200" r="8" fill="#f59e0b"/>
              <text x="250" y="245" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="600">
                United States
              </text>
            </g>

            {/* Mexico */}
            <g>
              <circle cx="230" cy="280" r="25" fill="url(#glowGradient)"/>
              <circle cx="230" cy="280" r="8" fill="#f59e0b"/>
              <text x="230" y="315" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="600">
                Mexico
              </text>
            </g>

            {/* Europe */}
            <g>
              <circle cx="550" cy="160" r="30" fill="url(#glowGradient)"/>
              <circle cx="550" cy="160" r="8" fill="#f59e0b"/>
              <text x="550" y="205" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="600">
                Europe
              </text>
            </g>

            {/* China */}
            <g>
              <circle cx="850" cy="220" r="25" fill="url(#glowGradient)"/>
              <circle cx="850" cy="220" r="8" fill="#f59e0b"/>
              <text x="850" y="265" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="600">
                China
              </text>
            </g>

            {/* Japan */}
            <g>
              <circle cx="950" cy="190" r="25" fill="url(#glowGradient)"/>
              <circle cx="950" cy="190" r="8" fill="#f59e0b"/>
              <text x="950" y="235" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="600">
                Japan
              </text>
            </g>

            {/* Australia */}
            <g>
              <circle cx="920" cy="420" r="30" fill="url(#glowGradient)"/>
              <circle cx="920" cy="420" r="8" fill="#f59e0b"/>
              <text x="920" y="465" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="600">
                Australia
              </text>
            </g>

            {/* Connection lines between locations */}
            <line x1="250" y1="200" x2="230" y2="280" stroke="#f59e0b" strokeWidth="1" opacity="0.3" strokeDasharray="5,5"/>
            <line x1="250" y1="200" x2="550" y2="160" stroke="#f59e0b" strokeWidth="1" opacity="0.3" strokeDasharray="5,5"/>
            <line x1="550" y1="160" x2="850" y2="220" stroke="#f59e0b" strokeWidth="1" opacity="0.3" strokeDasharray="5,5"/>
            <line x1="850" y1="220" x2="950" y2="190" stroke="#f59e0b" strokeWidth="1" opacity="0.3" strokeDasharray="5,5"/>
            <line x1="850" y1="220" x2="920" y2="420" stroke="#f59e0b" strokeWidth="1" opacity="0.3" strokeDasharray="5,5"/>

            {/* Animated pulse rings */}
            <circle cx="250" cy="200" r="15" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.5">
              <animate attributeName="r" from="8" to="40" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="550" cy="160" r="15" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.5">
              <animate attributeName="r" from="8" to="40" dur="2s" begin="0.4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" from="0.5" to="0" dur="2s" begin="0.4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="850" cy="220" r="15" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.5">
              <animate attributeName="r" from="8" to="40" dur="2s" begin="0.8s" repeatCount="indefinite"/>
              <animate attributeName="opacity" from="0.5" to="0" dur="2s" begin="0.8s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WorldMapSection;
