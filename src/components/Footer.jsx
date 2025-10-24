import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaTwitch, FaDiscord, FaYoutube } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="section-container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Fourthwall Column */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">{t('footer.fourthwall')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shops" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.shops')}
                </Link>
              </li>
              <li>
                <Link to="/websites" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.homepages')}
                </Link>
              </li>
              <li>
                <Link to="/memberships" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.memberships')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.productCatalog')}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.pricing')}
                </Link>
              </li>
              <li>
                <Link to="/youtubers" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.forYoutubers')}
                </Link>
              </li>
              <li>
                <Link to="/streamers" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.forTwitchCreators')}
                </Link>
              </li>
              <li>
                <Link to="/tiktokers" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.forTiktokers')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn Column */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">{t('footer.learn')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/examples" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.examples')}
                </Link>
              </li>
              <li>
                <Link to="/designers" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.designers')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.blog')}
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.helpCenter')}
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.discordCommunity')}
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.apisDocs')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link to="/glossary" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.glossary')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.careers')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.contactUs')}
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.fourthwallShop')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Compare To Column */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">{t('footer.compareTo')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/compare/shopify" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.shopify')}
                </Link>
              </li>
              <li>
                <Link to="/compare/spring" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.spring')}
                </Link>
              </li>
              <li>
                <Link to="/compare/redbubble" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.redbubble')}
                </Link>
              </li>
              <li>
                <Link to="/compare/spreadshop" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.spreadshop')}
                </Link>
              </li>
              <li>
                <Link to="/compare/streamlabs" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.streamlabs')}
                </Link>
              </li>
              <li>
                <Link to="/compare/patreon" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.patreon')}
                </Link>
              </li>
              <li>
                <Link to="/compare/all" className="text-gray-600 hover:text-brand-green transition-colors text-sm">
                  {t('footer.compareAll')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials Column */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">{t('footer.socials')}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-brand-green transition-colors text-sm"
                >
                  <FaInstagram className="w-5 h-5" />
                  <span>{t('footer.instagram')}</span>
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
                  <span>{t('footer.twitter')}</span>
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
                  <span>{t('footer.twitch')}</span>
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
                  <span>{t('footer.discord')}</span>
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
                  <span>{t('footer.youtube')}</span>
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
              © {new Date().getFullYear()} {t('footer.copyright')}
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/terms" className="text-sm text-gray-500 hover:text-brand-green transition-colors">
                {t('footer.termsOfService')}
              </Link>
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-brand-green transition-colors">
                {t('footer.privacyPolicy')}
              </Link>
              <Link to="/acceptable-use" className="text-sm text-gray-500 hover:text-brand-green transition-colors">
                {t('footer.acceptableUsePolicy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
