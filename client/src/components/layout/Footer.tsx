import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] text-[#86868b] border-t border-[#d2d2d7] mt-auto">
      {/* Newsletter Section */}
      <div className="border-b border-[#d2d2d7]">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-apple-headline mb-3 text-[#1d1d1f]">
                Stay informed with our <span className="text-gradient">newsletter</span>
              </h3>
              <p className="text-[#86868b] text-apple-subheadline max-w-2xl mx-auto">
                Get the latest updates, tips and insights on personal development and career growth.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white border-[#d2d2d7] text-[#1d1d1f] placeholder:text-[#86868b] focus:border-[#0071e3] focus-visible:ring-[#0071e3]/30 h-12 text-base rounded-full px-4"
                id="newsletter-email"
              />
              <button 
                className="apple-button h-12 px-6"
                onClick={() => {
                  const emailInput = document.getElementById('newsletter-email') as HTMLInputElement;
                  if (emailInput && emailInput.value) {
                    alert('Thank you for subscribing! You\'ll receive updates soon.');
                    emailInput.value = '';
                  } else {
                    alert('Please enter your email address to subscribe.');
                  }
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo & About */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 flex items-center justify-center mr-3">
                <i className="fas fa-route text-[#0071e3] text-lg"></i>
              </div>
              <h2 className="text-xl font-semibold text-[#1d1d1f]">
                LifeMap<span className="text-gradient">AI</span>
              </h2>
            </div>
            <p className="text-[#86868b] mb-6 text-sm leading-relaxed">
              We use advanced AI to analyze your current traits, habits, and goals to predict your future outcomes and provide personalized roadmaps to your dream career.
            </p>
            <div className="flex space-x-4">
              <a onClick={(e) => { e.preventDefault(); window.alert('Twitter integration coming soon!'); }} 
                 className="w-9 h-9 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-white">
                <i className="fab fa-twitter text-[#0071e3]"></i>
              </a>
              <a onClick={(e) => { e.preventDefault(); window.alert('LinkedIn integration coming soon!'); }} 
                 className="w-9 h-9 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-white">
                <i className="fab fa-linkedin-in text-[#0071e3]"></i>
              </a>
              <a onClick={(e) => { e.preventDefault(); window.alert('Instagram integration coming soon!'); }} 
                 className="w-9 h-9 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-white">
                <i className="fab fa-instagram text-[#0071e3]"></i>
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-[#1d1d1f] text-lg font-semibold mb-6">Features</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/features/life-timeline" className="text-[#86868b] hover:text-[#0071e3] transition-colors flex items-center">
                  Life Timeline
                </Link>
              </li>
              <li>
                <Link href="/features/career-roadmap" className="text-[#86868b] hover:text-[#0071e3] transition-colors flex items-center">
                  Career Roadmap
                </Link>
              </li>
              <li>
                <Link href="/features/habit-analyzer" className="text-[#86868b] hover:text-[#0071e3] transition-colors flex items-center">
                  Habit Analyzer
                </Link>
              </li>
              <li>
                <Link href="/features/skill-planner" className="text-[#86868b] hover:text-[#0071e3] transition-colors flex items-center">
                  Skill Planner
                </Link>
              </li>
              <li>
                <Link href="/features/goal-setting" className="text-[#86868b] hover:text-[#0071e3] transition-colors flex items-center">
                  Goal Setting
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Company */}
          <div>
            <h3 className="text-[#1d1d1f] text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/about" className="text-[#86868b] hover:text-[#0071e3] transition-colors flex items-center">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-[#86868b] hover:text-[#0071e3] transition-colors flex items-center">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-[#86868b] hover:text-[#0071e3] transition-colors flex items-center">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-[#86868b] hover:text-[#0071e3] transition-colors flex items-center">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#86868b] hover:text-[#0071e3] transition-colors flex items-center">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Support */}
          <div>
            <h3 className="text-[#1d1d1f] text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/help" className="text-[#86868b] hover:text-[#0071e3] transition-colors flex items-center">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[#86868b] hover:text-[#0071e3] transition-colors flex items-center">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#86868b] hover:text-[#0071e3] transition-colors flex items-center">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-[#86868b] hover:text-[#0071e3] transition-colors flex items-center">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[#86868b] hover:text-[#0071e3] transition-colors flex items-center">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-[#d2d2d7]">
        <div className="container mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row gap-2 items-center mb-4 md:mb-0">
              <p className="text-[#86868b] text-sm">
                &copy; {new Date().getFullYear()} LifeMapAI. All rights reserved.
              </p>
              <span className="hidden md:block text-[#d2d2d7]">•</span>
              <p className="text-[#86868b] text-sm">
                Created by <span className="text-gradient font-medium">M. Himanish Reddy</span>
              </p>
            </div>
            <div className="flex space-x-8">
              <Link href="/sitemap" className="text-[#86868b] hover:text-[#0071e3] transition-colors text-xs">
                Sitemap
              </Link>
              <Link href="/accessibility" className="text-[#86868b] hover:text-[#0071e3] transition-colors text-xs">
                Accessibility
              </Link>
              <Link href="/legal" className="text-[#86868b] hover:text-[#0071e3] transition-colors text-xs">
                Legal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
