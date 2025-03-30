import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Pricing() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Simple, Transparent <span className="text-gradient">Pricing</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Choose the plan that's right for your journey
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Free Plan */}
                <div className="bg-white rounded-md shadow-minimal border-minimal p-8 hover:shadow-minimal-hover transition-shadow duration-300">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Explorer</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-800">Free</span>
                    </div>
                    <p className="text-gray-600 mb-6">Perfect for trying out our platform</p>
                    <Link href="/">
                      <Button variant="outline" className="w-full border-gray-200 hover:bg-gray-100 hover:text-gray-900">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      <span className="text-gray-600">1 Timeline Generation</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      <span className="text-gray-600">1 Career Roadmap</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      <span className="text-gray-600">Basic Insights</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <i className="fas fa-times mr-3"></i>
                      <span>Save Results</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <i className="fas fa-times mr-3"></i>
                      <span>Advanced Analysis</span>
                    </div>
                  </div>
                </div>
                
                {/* Premium Plan */}
                <div className="bg-white rounded-md shadow-minimal border-minimal p-8 transform hover:shadow-minimal-hover transition-shadow duration-300 relative">
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-gray-800 text-white text-sm py-1 px-4 rounded-full font-medium">Most Popular</span>
                  </div>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Navigator</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-800">$9.99</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    <p className="text-gray-600 mb-6">Perfect for active planners</p>
                    <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white shadow-minimal hover:shadow-minimal-hover" onClick={() => alert('Premium subscription coming soon!')}>
                      Choose Plan
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      <span className="text-gray-600">Unlimited Timelines</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      <span className="text-gray-600">Unlimited Career Roadmaps</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      <span className="text-gray-600">Save & Access All Results</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      <span className="text-gray-600">Priority Generation</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <i className="fas fa-times mr-3"></i>
                      <span>Custom Branding</span>
                    </div>
                  </div>
                </div>
                
                {/* Enterprise Plan */}
                <div className="bg-white rounded-md shadow-minimal border-minimal p-8 hover:shadow-minimal-hover transition-shadow duration-300">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Voyager</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-800">$29.99</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    <p className="text-gray-600 mb-6">For coaches & professionals</p>
                    <Button variant="outline" className="w-full border-gray-200 hover:bg-gray-100 hover:text-gray-900" onClick={() => alert('Enterprise subscription coming soon!')}>
                      Contact Us
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      <span className="text-gray-600">Everything in Navigator</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      <span className="text-gray-600">Advanced Analytics</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      <span className="text-gray-600">Custom Branding</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      <span className="text-gray-600">Client Management</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-3"></i>
                      <span className="text-gray-600">Priority Support</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* FAQ Section */}
              <div className="mt-16">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Frequently Asked Questions</h2>
                
                <div className="bg-white rounded-md shadow-minimal border-minimal p-8 space-y-6">
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 mb-2">Can I switch plans?</h3>
                    <p className="text-gray-600">
                      Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 mb-2">Is there a free trial for paid plans?</h3>
                    <p className="text-gray-600">
                      We offer a 7-day free trial for our Navigator plan. No credit card required to start.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 mb-2">How accurate are the predictions?</h3>
                    <p className="text-gray-600">
                      Our AI provides insights based on patterns and research, but future outcomes depend on many factors including your consistency and external circumstances. We provide actionable guidance rather than guaranteed predictions.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 mb-2">Can I cancel anytime?</h3>
                    <p className="text-gray-600">
                      Absolutely. There are no long-term contracts or cancellation fees. You can cancel your subscription at any time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}