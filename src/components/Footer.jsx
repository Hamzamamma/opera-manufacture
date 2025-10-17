import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaTwitch, FaDiscord, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="section-container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Fourthwall Column */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Fourthwall</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shops" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Shops
                </Link>
              </li>
              <li>
                <Link to="/websites" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Homepages
                </Link>
              </li>
              <li>
                <Link to="/memberships" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Memberships
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Product catalog
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/youtubers" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  For YouTubers
                </Link>
              </li>
              <li>
                <Link to="/streamers" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  For Twitch creators
                </Link>
              </li>
              <li>
                <Link to="/tiktokers" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  For TikTokers
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn Column */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Learn</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/examples" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Examples
                </Link>
              </li>
              <li>
                <Link to="/designers" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Designers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Discord community
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  APIs & docs
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/glossary" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Glossary
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Contact us
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Fourthwall shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Compare To Column */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Compare to</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/compare/shopify" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Shopify
                </Link>
              </li>
              <li>
                <Link to="/compare/spring" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Spring
                </Link>
              </li>
              <li>
                <Link to="/compare/redbubble" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Redbubble
                </Link>
              </li>
              <li>
                <Link to="/compare/spreadshop" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Spreadshop
                </Link>
              </li>
              <li>
                <Link to="/compare/streamlabs" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Streamlabs
                </Link>
              </li>
              <li>
                <Link to="/compare/patreon" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Patreon
                </Link>
              </li>
              <li>
                <Link to="/compare/all" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Compare all
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials Column */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Socials</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-brand-green transition-colors text-sm"
                >
                  <FaInstagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-brand-green transition-colors text-sm"
                >
                  <FaTwitter className="w-5 h-5" />
                  <span>X (Twitter)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://twitch.tv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-brand-green transition-colors text-sm"
                >
                  <FaTwitch className="w-5 h-5" />
                  <span>Twitch</span>
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-brand-green transition-colors text-sm"
                >
                  <FaDiscord className="w-5 h-5" />
                  <span>Discord</span>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-brand-green transition-colors text-sm"
                >
                  <FaYoutube className="w-5 h-5" />
                  <span>YouTube</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Fourthwall. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/terms" className="text-sm text-gray-500 hover:text-brand-green transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-brand-green transition-colors">
                Privacy Policy
              </Link>
              <Link to="/acceptable-use" className="text-sm text-gray-500 hover:text-brand-green transition-colors">
                Acceptable Use Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
