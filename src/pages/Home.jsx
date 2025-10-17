import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiShoppingBag, FiHome, FiUsers, FiTrendingUp, FiGlobe, FiZap, FiHeart } from 'react-icons/fi';

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="section-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-xl mb-6 animate-fade-in">
              Products and shops your community will love
            </h1>
            <p className="text-body text-xl mb-8">
              Join 200,000+ creators building high-quality products and stunning shops with Fourthwall
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
              <Link to="/start" className="btn-primary text-lg px-8 py-4">
                Start now
              </Link>
              <Link to="/examples" className="btn-outline text-lg px-8 py-4">
                View examples
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              No monthly fees. No credit card required.
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
            <h2 className="heading-lg mb-4">Quality products without the headache</h2>
            <p className="text-body max-w-2xl mx-auto">
              We make it easy to create and sell premium merchandise that your fans will love
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Create Products */}
            <div className="card p-8">
              <div className="w-14 h-14 bg-brand-green/10 rounded-full flex items-center justify-center mb-6">
                <FiShoppingBag className="w-7 h-7 text-brand-green" />
              </div>
              <h3 className="heading-sm mb-4">Create beautiful products</h3>
              <p className="text-body mb-6">
                We partner with top suppliers for hundreds of products—from apparel to plushies to hot sauce—with no minimums
              </p>
              <Link to="/products" className="link">
                Create your first product →
              </Link>
            </div>

            {/* Launch Shop */}
            <div className="card p-8">
              <div className="w-14 h-14 bg-brand-green/10 rounded-full flex items-center justify-center mb-6">
                <FiHome className="w-7 h-7 text-brand-green" />
              </div>
              <h3 className="heading-sm mb-4">Launch your own shop</h3>
              <p className="text-body mb-6">
                Build a shop that reflects your brand with our no-code builder. Fans can buy or redeem products easily
              </p>
              <Link to="/websites" className="link">
                Create your own shop →
              </Link>
            </div>

            {/* We Handle Support */}
            <div className="card p-8">
              <div className="w-14 h-14 bg-brand-green/10 rounded-full flex items-center justify-center mb-6">
                <FiUsers className="w-7 h-7 text-brand-green" />
              </div>
              <h3 className="heading-sm mb-4">We handle shipping & support</h3>
              <p className="text-body mb-6">
                From production and shipping to customer support, we're your partner every step of the way
              </p>
              <Link to="/start" className="link">
                Start now →
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
              <div className="text-gray-600">Production partners worldwide</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-brand-green mb-2">$4.80</div>
              <div className="text-gray-600">Average shipping cost</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-brand-green mb-2">4 days</div>
              <div className="text-gray-600">Average delivery time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Easy Management Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">We make e-commerce easy, no experience necessary</h2>
            <p className="text-body max-w-2xl mx-auto">
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
                <Link to="/memberships" className="btn-primary">
                  Learn more
                </Link>
                <Link to="/compare/patreon" className="btn-outline">
                  Compare to Patreon
                </Link>
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
      <section className="section-padding bg-brand-green text-white">
        <div className="section-container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Build your brand, audience, and income
          </h2>
          <Link to="/start" className="inline-flex items-center bg-white text-brand-green px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            Get started →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
