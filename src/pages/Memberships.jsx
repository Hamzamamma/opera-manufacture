import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiUsers, FiTrendingUp, FiHeart, FiVideo, FiMessageSquare, FiBarChart2 } from 'react-icons/fi';

const Memberships = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="section-container">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              NEW FEATURE
            </div>
            <h1 className="heading-xl mb-6">Level up your memberships</h1>
            <p className="text-body text-xl mb-8">
              Grow your brand, earn recurring revenue, and reward loyal supporters with exclusive content and perks
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/start" className="btn-primary text-lg px-8 py-4">
                Get started
              </Link>
              <Link to="/compare/patreon" className="btn-outline text-lg px-8 py-4">
                Compare to Patreon
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Take Full Brand Control */}
            <div>
              <div className="w-14 h-14 bg-brand-green/10 rounded-full flex items-center justify-center mb-6">
                <FiHeart className="w-7 h-7 text-brand-green" />
              </div>
              <h3 className="heading-sm mb-4">Take full brand control</h3>
              <p className="text-body mb-4">
                Build a white-label membership experience that's completely on-brand with our no-code site builder. Your logo, your colors, and your content is always front and center.
              </p>
              <p className="text-body">
                Give fans the freedom to choose how they want to support you by creating multiple membership tiers, each with different perks.
              </p>
            </div>

            {/* Own Your Audience */}
            <div>
              <div className="w-14 h-14 bg-brand-green/10 rounded-full flex items-center justify-center mb-6">
                <FiUsers className="w-7 h-7 text-brand-green" />
              </div>
              <h3 className="heading-sm mb-4">Own your audience</h3>
              <p className="text-body mb-4">
                They're your fans. It's your data. Your community comes first. Get detailed analytics on your members to measure performance, monitor retention, and grow your community online.
              </p>
              <p className="text-body">
                Export member data anytime—your audience belongs to you, not us.
              </p>
            </div>

            {/* Content Hosting Made Easy */}
            <div>
              <div className="w-14 h-14 bg-brand-green/10 rounded-full flex items-center justify-center mb-6">
                <FiVideo className="w-7 h-7 text-brand-green" />
              </div>
              <h3 className="heading-sm mb-4">Content hosting made easy</h3>
              <p className="text-body mb-4">
                Upload and host premium multimedia content for your members directly on your site. Support for a wide range of video-on-demand (up to 1080p+) and audio files.
              </p>
              <p className="text-body">
                Organize content into categories, tags, and series Netflix-style for easy discovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Everything you need to succeed</h2>
            <p className="text-body max-w-2xl mx-auto">
              Powerful tools to engage your members and grow your recurring revenue
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card p-6">
              <FiVideo className="w-10 h-10 text-brand-green mb-4" />
              <h3 className="font-bold text-lg mb-2">Video & Audio Hosting</h3>
              <p className="text-gray-600">
                Host exclusive videos and podcasts with support for 1080p+ streaming
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card p-6">
              <FiMessageSquare className="w-10 h-10 text-brand-green mb-4" />
              <h3 className="font-bold text-lg mb-2">Direct Messages</h3>
              <p className="text-gray-600">
                Send messages to all members, specific tiers, or even ex-members with push notifications
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card p-6">
              <FiUsers className="w-10 h-10 text-brand-green mb-4" />
              <h3 className="font-bold text-lg mb-2">Member-Only Content</h3>
              <p className="text-gray-600">
                Offer exclusive posts, polls, and comments to create an engaged community
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card p-6">
              <FiBarChart2 className="w-10 h-10 text-brand-green mb-4" />
              <h3 className="font-bold text-lg mb-2">Detailed Analytics</h3>
              <p className="text-gray-600">
                Track member growth, retention rates, and content performance
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card p-6">
              <FiTrendingUp className="w-10 h-10 text-brand-green mb-4" />
              <h3 className="font-bold text-lg mb-2">Multiple Tiers</h3>
              <p className="text-gray-600">
                Create unlimited membership tiers with custom pricing and perks
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card p-6">
              <FiCheck className="w-10 h-10 text-brand-green mb-4" />
              <h3 className="font-bold text-lg mb-2">Easy Management</h3>
              <p className="text-gray-600">
                Manage members, content, and payouts from one simple dashboard
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">How memberships work</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="text-brand-green font-bold text-sm mb-2">STEP 1</div>
                <h3 className="heading-sm mb-4">Create membership tiers</h3>
                <p className="text-body">
                  Set up multiple tiers with different price points and exclusive perks. Each tier can offer unique benefits like early access, behind-the-scenes content, or special discounts.
                </p>
              </div>
              <div className="flex-1 bg-gray-100 rounded-2xl p-8 flex items-center justify-center h-64">
                <p className="text-gray-400">Membership Tiers UI</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="flex-1">
                <div className="text-brand-green font-bold text-sm mb-2">STEP 2</div>
                <h3 className="heading-sm mb-4">Upload exclusive content</h3>
                <p className="text-body">
                  Share videos, audio, posts, and polls exclusively for your members. Organize content into series and categories for easy browsing.
                </p>
              </div>
              <div className="flex-1 bg-gray-100 rounded-2xl p-8 flex items-center justify-center h-64">
                <p className="text-gray-400">Content Upload UI</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="text-brand-green font-bold text-sm mb-2">STEP 3</div>
                <h3 className="heading-sm mb-4">Grow and engage</h3>
                <p className="text-body">
                  Use direct messages, polls, and member-only posts to engage your community. Track growth with detailed analytics and optimize your membership strategy.
                </p>
              </div>
              <div className="flex-1 bg-gray-100 rounded-2xl p-8 flex items-center justify-center h-64">
                <p className="text-gray-400">Analytics Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Why choose Fourthwall over Patreon?</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-bold">Feature</th>
                    <th className="text-center p-4 font-bold">Fourthwall</th>
                    <th className="text-center p-4 font-bold">Patreon</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="p-4">Full brand control</td>
                    <td className="text-center p-4"><FiCheck className="w-6 h-6 text-brand-green mx-auto" /></td>
                    <td className="text-center p-4"><span className="text-gray-300">—</span></td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="p-4">Own your audience data</td>
                    <td className="text-center p-4"><FiCheck className="w-6 h-6 text-brand-green mx-auto" /></td>
                    <td className="text-center p-4"><span className="text-gray-300">—</span></td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="p-4">Custom domain</td>
                    <td className="text-center p-4"><FiCheck className="w-6 h-6 text-brand-green mx-auto" /></td>
                    <td className="text-center p-4"><span className="text-gray-300">—</span></td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="p-4">Integrated shop + memberships</td>
                    <td className="text-center p-4"><FiCheck className="w-6 h-6 text-brand-green mx-auto" /></td>
                    <td className="text-center p-4"><span className="text-gray-300">—</span></td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="p-4">No monthly platform fee</td>
                    <td className="text-center p-4"><FiCheck className="w-6 h-6 text-brand-green mx-auto" /></td>
                    <td className="text-center p-4"><span className="text-gray-300">—</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">What creators are saying</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="card p-8">
              <p className="text-gray-700 italic mb-6">
                "Fourthwall has expanded the features... now we have a simple, easy-to-use site that allows us to connect directly with members."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <div className="font-bold">I Could Murder A Podcast</div>
                  <div className="text-sm text-gray-500">Podcast</div>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <p className="text-gray-700 italic mb-6">
                "Not only was I selling more, but fans were much happier. I can't wait to launch my memberships on Fourthwall."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <div className="font-bold">Philip DeFranco</div>
                  <div className="text-sm text-gray-500">YouTuber</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-green text-white">
        <div className="section-container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to launch your memberships?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start building recurring revenue and a stronger community today
          </p>
          <Link to="/start" className="inline-flex items-center bg-white text-brand-green px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            Get started - it's free →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Memberships;
