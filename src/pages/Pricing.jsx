import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';

const Pricing = () => {
  const freeFeatures = [
    'Design and sell high-quality products',
    'Fully customizable shop, no coding required',
    'We handle customer support for you',
    'Offer monthly memberships',
    'Promo codes, discounts, and giveaways',
    'Sell your products on YouTube, Instagram, TikTok with our apps',
    'Analytics and reports',
  ];

  const proFeatures = [
    '$10 of sample credit per month, $120 per year',
    'Priority 24/7 customer support',
    'Free custom domain',
    'No fees on digital products',
    'Unlimited team members',
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="heading-xl mb-6">Simple, transparent pricing</h1>
            <p className="text-body text-xl">
              Free forever, upgrade anytime to go Pro
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="card p-8 border-2 border-gray-200">
              <h2 className="text-3xl font-bold mb-2">Free</h2>
              <div className="mb-6">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 mb-6">No cost, just creativity</p>

              <Link to="/start" className="btn-secondary w-full text-center block mb-8">
                Start now
              </Link>

              <div className="space-y-4">
                <h3 className="font-bold text-sm uppercase text-gray-500 mb-4">Features you'll love</h3>
                {freeFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <FiCheck className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Plan */}
            <div className="card p-8 border-2 border-brand-green relative">
              <div className="absolute top-0 right-0 bg-brand-green text-white text-xs font-bold px-4 py-1 rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>

              <h2 className="text-3xl font-bold mb-2">Pro</h2>
              <div className="mb-6">
                <span className="text-5xl font-bold">$19</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 mb-2">or $15/month billed annually</p>
              <p className="text-sm text-brand-green mb-6">Save $48 per year</p>

              <Link to="/start" className="btn-primary w-full text-center block mb-8">
                Start now
              </Link>

              <div className="space-y-4">
                <h3 className="font-bold text-sm uppercase text-gray-500 mb-4">Everything in Free, plus:</h3>
                {proFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <FiCheck className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Details */}
      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-center mb-12">How does pricing work?</h2>

            <div className="space-y-8">
              <div className="card p-6">
                <h3 className="font-bold text-lg mb-2">Physical Products</h3>
                <p className="text-gray-600">
                  0% commission on products from our catalog. You keep 100% of your profit margins. We only take the base cost of the product.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-lg mb-2">Digital Products & Memberships</h3>
                <p className="text-gray-600">
                  5% commission on digital products and membership subscriptions (Free plan). Pro users pay no fees on digital products.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-lg mb-2">Payment Processing</h3>
                <p className="text-gray-600">
                  Fourthwall is the Merchant of Record and handles all payment processing. We support credit cards, PayPal, Apple Pay, Google Pay, Amazon Pay, and other local payment methods.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-lg mb-2">No Hidden Fees</h3>
                <p className="text-gray-600">
                  No monthly fees, no upfront costs, no contracts. Just transparent pricing that scales with your success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-center mb-12">Pricing FAQ</h2>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-lg mb-2">Can I switch between Free and Pro?</h3>
                <p className="text-gray-600">
                  Yes! You can upgrade to Pro at any time, and downgrade back to Free if needed. Your data and shop remain intact.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-lg mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, Apple Pay, Google Pay, Amazon Pay, and various local payment methods depending on your location.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-lg mb-2">Do I need a credit card to sign up?</h3>
                <p className="text-gray-600">
                  No! The Free plan requires no credit card. You only need payment information if you upgrade to Pro or want to receive payouts.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-lg mb-2">Are there any transaction fees?</h3>
                <p className="text-gray-600">
                  We charge 0% on physical products and 5% on digital/memberships (Free plan). Standard payment processing fees apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-brand-green text-white">
        <div className="section-container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 200,000+ creators building their brands with Fourthwall
          </p>
          <Link to="/start" className="inline-flex items-center bg-white text-brand-green px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            Start now - it's free →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
