import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FiCheck, FiShoppingBag, FiHome, FiUsers, FiTrendingUp, FiGlobe, FiZap, FiHeart } from 'react-icons/fi';
import { Button, Heading, Link } from '../components';
import { useLanguage } from '../contexts/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="section-container">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-6xl font-medium mb-6 animate-fade-in">
              {t('home.heroTitle')}
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              {t('home.heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
              <RouterLink to="/start">
                <Button variant="primary" className="text-lg">
                  {t('common.startNow')}
                </Button>
              </RouterLink>
              <RouterLink to="/examples">
                <Button variant="secondary" className="text-lg">
                  {t('common.viewExamples')}
                </Button>
              </RouterLink>
            </div>
            <p className="text-sm text-gray-500">
              {t('common.noFeesRequired')}
            </p>

            {/* Creator Logos Carousel */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
              {['MKBHD', 'Harry Mack', 'Phil DeFranco', 'NY Mag', 'SanDisk', 'Vox'].map((creator) => (
                <div key={creator} className="text-center">
                  <div className="text-gray-400 font-bold text-lg">{creator}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Products Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-medium mb-4">
              {t('home.qualityTitle')}
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {t('home.qualitySubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Create Products */}
            <div className="card p-8">
              <div className="w-14 h-14 bg-brand-green/10 rounded-full flex items-center justify-center mb-6">
                <FiShoppingBag className="w-7 h-7 text-brand-green" />
              </div>
              <h3 className="heading-sm mb-4">{t('home.createProductsTitle')}</h3>
              <p className="text-body mb-6">
                {t('home.createProductsDesc')}
              </p>
              <Link variant="simple-green" href="/products">
                {t('home.createProductsLink')}
              </Link>
            </div>

            {/* Launch Shop */}
            <div className="card p-8">
              <div className="w-14 h-14 bg-brand-green/10 rounded-full flex items-center justify-center mb-6">
                <FiHome className="w-7 h-7 text-brand-green" />
              </div>
              <h3 className="heading-sm mb-4">{t('home.launchShopTitle')}</h3>
              <p className="text-body mb-6">
                {t('home.launchShopDesc')}
              </p>
              <Link variant="simple-green" href="/websites">
                {t('home.launchShopLink')}
              </Link>
            </div>

            {/* We Handle Support */}
            <div className="card p-8">
              <div className="w-14 h-14 bg-brand-green/10 rounded-full flex items-center justify-center mb-6">
                <FiUsers className="w-7 h-7 text-brand-green" />
              </div>
              <h3 className="heading-sm mb-4">{t('home.supportTitle')}</h3>
              <p className="text-body mb-6">
                {t('home.supportDesc')}
              </p>
              <Link variant="simple-green" href="/start">
                {t('home.supportLink')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold text-brand-green mb-2">15+</div>
              <div className="text-gray-600">{t('home.productionPartners')}</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-brand-green mb-2">$4.80</div>
              <div className="text-gray-600">{t('home.averageShipping')}</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-brand-green mb-2">4 {t('home.days')}</div>
              <div className="text-gray-600">{t('home.averageDelivery')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Easy Management Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-medium mb-4">
              We make <span className="highlight-black">e-commerce</span> easy, <span className="highlight-green">no experience</span> necessary
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Manage your entire business from one intuitive dashboard
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                    <FiCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Easy management tools</h3>
                    <p className="text-gray-600">
                      Track orders, manage products, and monitor sales in real-time with our intuitive, clear dashboard
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                    <FiGlobe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Global manufacturing, local delivery</h3>
                    <p className="text-gray-600">
                      Our worldwide production network ensures orders ship from locations closest to your customers
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                    <FiZap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Design the perfect product</h3>
                    <p className="text-gray-600">
                      Our advanced product designer, professional artist support, and ultra-realistic renders make creating easy
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                    <FiTrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Sell and engage across every platform</h3>
                    <p className="text-gray-600">
                      Native integrations with YouTube, Instagram, TikTok, Twitch, and Spotify help you sell where your fans are
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center h-96">
              <p className="text-gray-400 text-center">Dashboard Preview Image</p>
            </div>
          </div>
        </div>
      </section>

      {/* Full Customization Section */}
      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Fully-customizable shops, 100% owned by you</h2>
            <p className="text-body max-w-2xl mx-auto">
              Customize design, layout, and domain to create a brand as unique as you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <p className="text-gray-400">Theme {i}</p>
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-700">Example Shop {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Memberships Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="bg-gradient-to-r from-brand-green/10 to-green-50 rounded-3xl p-12">
            <div className="max-w-3xl">
              <div className="inline-block bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                NEW FEATURE
              </div>
              <h2 className="heading-lg mb-4">Offer monthly memberships</h2>
              <p className="text-body mb-6">
                With integrated memberships, you can offer exclusive content, perks, and community access—growing recurring revenue and rewarding your loyal supporters
              </p>
              <div className="flex gap-4">
                <RouterLink to="/memberships">
                  <Button variant="primary">
                    Learn more
                  </Button>
                </RouterLink>
                <RouterLink to="/compare/patreon">
                  <Button variant="secondary">
                    Compare to Patreon
                  </Button>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Loved by creators worldwide</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="card p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <div className="font-bold">Marques Brownlee</div>
                  <div className="text-sm text-gray-500">MKBHD</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Working with Fourthwall has been fantastic. They handle logistics, production, and especially customer service, letting you focus on what matters."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="card p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <div className="font-bold">Philip DeFranco</div>
                  <div className="text-sm text-gray-500">YouTuber</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Fourthwall surprised me: not only was I selling more, but fans were much happier. Superior quality products on a better-looking site, and so much easier to manage."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="card p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <div className="font-bold">Harry Mack</div>
                  <div className="text-sm text-gray-500">Musician</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "I was blown away by my fans' reaction to my new site and shop... game changing. The additional revenue has allowed me to expand my team and create better content."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-center mb-12">Frequently asked questions</h2>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-lg mb-2">How much does it cost to use Fourthwall?</h3>
                <p className="text-gray-600">
                  There's no monthly fee, no upfront costs, and no contract. Fourthwall only takes fixed commissions on certain types of sales (5% on digital and memberships, zero on physical products from our catalog).
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-lg mb-2">Does Fourthwall ship worldwide?</h3>
                <p className="text-gray-600">
                  Yes! We have production partners in the US, UK, EU, Canada, Australia, and Japan, ensuring global shipping capabilities.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-lg mb-2">Can I connect a custom domain?</h3>
                <p className="text-gray-600">
                  Absolutely! Custom domains are supported, and Pro users receive a free domain.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-lg mb-2">What integrations does Fourthwall have?</h3>
                <p className="text-gray-600">
                  We offer free integrations with YouTube Merch Shelf, TikTok Shop, Instagram/Facebook Shopping, Twitch alerts, StreamElements, Streamlabs, Zapier, Klaviyo, Mailchimp, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-lime-300">
        <div className="section-container text-center">
          <h2 className="text-5xl md:text-6xl font-medium mb-8 text-black">
            {t('home.finalCtaTitle')}
          </h2>
          <RouterLink to="/start">
            <Button variant="primary" className="text-lg">
              {t('common.getStarted')}
            </Button>
          </RouterLink>
        </div>
      </section>
    </div>
  );
};

export default Home;
