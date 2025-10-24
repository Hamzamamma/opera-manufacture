import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiMenu, FiX, FiGlobe } from 'react-icons/fi';
import { Logo } from './index';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const { t, language, changeLanguage, isRTL } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [perfectForOpen, setPerfectForOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

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
                <span className="font-medium">{t('header.features')}</span>
                <FiChevronDown className="w-4 h-4" />
              </button>

              {featuresOpen && (
                <div className="absolute left-0 top-full mt-2 w-[600px] bg-white rounded-xl shadow-xl border border-gray-100 p-6 animate-fade-in">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Build Your Brand Column */}
                    <div>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                        {t('header.buildYourBrand')}
                      </h3>
                      <ul className="space-y-2">
                        <li>
                          <Link to="/shops" className="block p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="font-semibold text-gray-900">{t('header.shops')}</span>
                            <p className="text-sm text-gray-500">{t('header.shopsDesc')}</p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/websites" className="block p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="font-semibold text-gray-900">{t('header.homepages')}</span>
                            <p className="text-sm text-gray-500">{t('header.homepagesDesc')}</p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/memberships" className="block p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="font-semibold text-gray-900">{t('header.memberships')}</span>
                            <p className="text-sm text-gray-500">{t('header.membershipsDesc')}</p>
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Features Column */}
                    <div>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                        {t('header.features')}
                      </h3>
                      <ul className="space-y-2">
                        <li>
                          <Link to="/products" className="block p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="font-medium text-gray-900 text-sm">{t('header.makeQualityMerchandise')}</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/custom-products" className="block p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="font-medium text-gray-900 text-sm">{t('header.sourceCustomProducts')}</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/sell-your-own" className="block p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="font-medium text-gray-900 text-sm">{t('header.sellYourOwn')}</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/digital-products" className="block p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <span className="font-medium text-gray-900 text-sm">{t('header.sellDigital')}</span>
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
                <span className="font-medium">{t('header.perfectFor')}</span>
                <FiChevronDown className="w-4 h-4" />
              </button>

              {perfectForOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-4 animate-fade-in">
                  <ul className="space-y-1">
                    <li>
                      <Link to="/youtubers" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        {t('header.youtubers')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/streamers" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        {t('header.streamers')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/tiktokers" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        {t('header.tiktokers')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/musicians" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        {t('header.musicians')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/podcasters" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        {t('header.podcasters')}
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Pricing Link */}
            <Link to="/pricing" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
              {t('header.pricing')}
            </Link>

            {/* Product Catalog Link */}
            <Link to="/products" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
              {t('header.productCatalog')}
            </Link>

            {/* Learn Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setLearnOpen(true)}
              onMouseLeave={() => setLearnOpen(false)}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-brand-green transition-colors">
                <span className="font-medium">{t('header.learn')}</span>
                <FiChevronDown className="w-4 h-4" />
              </button>

              {learnOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-4 animate-fade-in">
                  <ul className="space-y-1">
                    <li>
                      <Link to="/examples" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        {t('header.getInspired')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/designers" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        {t('header.designers')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/help" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        {t('header.helpCenter')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/community" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        {t('header.community')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/blog" className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                        {t('header.blog')}
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <div
              className="relative"
              onMouseEnter={() => setLanguageMenuOpen(true)}
              onMouseLeave={() => setLanguageMenuOpen(false)}
            >
              <button className="flex items-center space-x-2 text-gray-700 hover:text-brand-green transition-colors">
                <FiGlobe className="w-5 h-5" />
                <span className="font-medium uppercase">{language}</span>
              </button>

              {languageMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 p-2 animate-fade-in">
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      language === 'en'
                        ? 'bg-brand-green text-brand-black font-bold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage('ar')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      language === 'ar'
                        ? 'bg-brand-green text-brand-black font-bold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    العربية
                  </button>
                </div>
              )}
            </div>

            <Link to="/login" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
              {t('header.login')}
            </Link>
            <Link to="/start" className="btn-primary">
              {t('header.startNow')}
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
              {/* Language Switcher Mobile */}
              <div className="flex items-center justify-center space-x-2 py-2">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    language === 'en'
                      ? 'bg-brand-green text-brand-black font-bold'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage('ar')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    language === 'ar'
                      ? 'bg-brand-green text-brand-black font-bold'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  العربية
                </button>
              </div>
              <hr className="border-gray-200" />
              <Link to="/" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
                {t('common.home')}
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
                {t('header.productCatalog')}
              </Link>
              <Link to="/pricing" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
                {t('header.pricing')}
              </Link>
              <Link to="/memberships" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
                {t('header.memberships')}
              </Link>
              <hr className="border-gray-200" />
              <Link to="/login" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
                {t('header.login')}
              </Link>
              <Link to="/start" className="btn-primary text-center">
                {t('header.startNow')}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
