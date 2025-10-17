import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { Logo } from './index';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [perfectForOpen, setPerfectForOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 w-full z-50">
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo variant="default" className="scale-75" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Features Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setFeaturesOpen(true)}
              onMouseLeave={() => setFeaturesOpen(false)}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-brand-green transition-colors">
                <span className="font-medium">Features</span>
                <FiChevronDown className="w-4 h-4" />
              </button>

              {featuresOpen && (
                <div className="absolute left-0 top-full mt-2 w-[600px] bg-white rounded-xl shadow-xl border border-gray-100 p-6 animate-fade-in">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Build Your Brand Column */}
                    <div>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                        Build Your Brand
                      </h3>
                      <ul className="space-y-2">
                        <li>
                          <Link to="/shops" className="block p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="font-semibold text-gray-900">Shops</span>
                            <p className="text-sm text-gray-500">Sell custom products</p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/websites" className="block p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="font-semibold text-gray-900">Homepages</span>
                            <p className="text-sm text-gray-500">Build your branded website</p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/memberships" className="block p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="font-semibold text-gray-900">Memberships</span>
                            <p className="text-sm text-gray-500">Offer monthly subscriptions</p>
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Features Column */}
                    <div>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                        Features
                      </h3>
                      <ul className="space-y-2">
                        <li>
                          <Link to="/products" className="block p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="font-medium text-gray-900 text-sm">Make quality merchandise</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/custom-products" className="block p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="font-medium text-gray-900 text-sm">Source custom products</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/sell-your-own" className="block p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="font-medium text-gray-900 text-sm">Sell your own products</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/digital-products" className="block p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="font-medium text-gray-900 text-sm">Sell digital products</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Perfect For Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setPerfectForOpen(true)}
              onMouseLeave={() => setPerfectForOpen(false)}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-brand-green transition-colors">
                <span className="font-medium">Perfect for</span>
                <FiChevronDown className="w-4 h-4" />
              </button>

              {perfectForOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-4 animate-fade-in">
                  <ul className="space-y-1">
                    <li>
                      <Link to="/youtubers" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        YouTubers
                      </Link>
                    </li>
                    <li>
                      <Link to="/streamers" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        Twitch streamers
                      </Link>
                    </li>
                    <li>
                      <Link to="/tiktokers" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        TikTokers
                      </Link>
                    </li>
                    <li>
                      <Link to="/musicians" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        Musicians
                      </Link>
                    </li>
                    <li>
                      <Link to="/podcasters" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        Podcasters
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Pricing Link */}
            <Link to="/pricing" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
              Pricing
            </Link>

            {/* Product Catalog Link */}
            <Link to="/products" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
              Product catalog
            </Link>

            {/* Learn Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setLearnOpen(true)}
              onMouseLeave={() => setLearnOpen(false)}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-brand-green transition-colors">
                <span className="font-medium">Learn</span>
                <FiChevronDown className="w-4 h-4" />
              </button>

              {learnOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-4 animate-fade-in">
                  <ul className="space-y-1">
                    <li>
                      <Link to="/examples" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        Get inspired
                      </Link>
                    </li>
                    <li>
                      <Link to="/designers" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        Designers
                      </Link>
                    </li>
                    <li>
                      <Link to="/help" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        Help Center
                      </Link>
                    </li>
                    <li>
                      <Link to="/community" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        Community
                      </Link>
                    </li>
                    <li>
                      <Link to="/blog" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        Blog
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
              Log in
            </Link>
            <Link to="/start" className="btn-primary">
              Start now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 animate-slide-up">
          <div className="section-container py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
                Home
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
                Product catalog
              </Link>
              <Link to="/pricing" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
                Pricing
              </Link>
              <Link to="/memberships" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
                Memberships
              </Link>
              <hr className="border-gray-200" />
              <Link to="/login" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
                Log in
              </Link>
              <Link to="/start" className="btn-primary text-center">
                Start now
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
