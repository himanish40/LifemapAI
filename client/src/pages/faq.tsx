import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";

// FAQ data structure
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // All FAQ Categories
  const categories = [
    { id: "all", name: "All Questions" },
    { id: "general", name: "General" },
    { id: "account", name: "Account & Billing" },
    { id: "timeline", name: "Life Timeline" },
    { id: "career", name: "Career Roadmap" },
    { id: "technical", name: "Technical Support" },
  ];
  
  // FAQ List
  const faqs: FAQ[] = [
    {
      id: "faq-1",
      question: "What is LifeMapAI?",
      answer: "LifeMapAI is an AI-powered life planning platform that helps you visualize your future and create actionable plans to achieve your goals. Our two main features are the Life Timeline, which predicts where you might be in 5, 10, and 20 years based on your current habits and goals, and the Career Roadmap, which creates a personalized path to your dream job.",
      category: "general",
    },
    {
      id: "faq-2",
      question: "How accurate are the predictions?",
      answer: "Our predictions are based on data analysis, behavioral science research, and career progression patterns. They provide realistic projections based on the information you provide, but the future ultimately depends on your actions and external factors. We focus on providing actionable guidance rather than guaranteed predictions.",
      category: "general",
    },
    {
      id: "faq-3",
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Sign Up' button in the top right corner of the page. Fill out the registration form with your name, email address, and password. Once you've completed the registration, you'll receive a confirmation email to verify your account.",
      category: "account",
    },
    {
      id: "faq-4",
      question: "What are the subscription options?",
      answer: "We offer three subscription tiers: Explorer (free), Navigator ($9.99/month), and Voyager ($29.99/month). Each tier offers different features and benefits. You can view the detailed comparison on our Pricing page.",
      category: "account",
    },
    {
      id: "faq-5",
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel your subscription at any time. Simply go to your Account Settings, select 'Subscription', and click 'Cancel Subscription'. Your access will continue until the end of your current billing period. There are no cancellation fees.",
      category: "account",
    },
    {
      id: "faq-6",
      question: "How do I generate a Life Timeline?",
      answer: "To generate a Life Timeline, go to the Timeline tab on the homepage or dashboard. Fill out the questionnaire about your current age, habits, goals, and life circumstances. Our AI will analyze this information and generate a personalized timeline showing where you might be in 5, 10, and 20 years, along with specific insights about your career, finances, and health.",
      category: "timeline",
    },
    {
      id: "faq-7",
      question: "Can I update my Life Timeline?",
      answer: "Yes! As your circumstances, habits, or goals change, you can update your information and regenerate your timeline. This allows you to see how changes in your present might affect your future trajectory. Premium users can save multiple versions of their timelines to compare different scenarios.",
      category: "timeline",
    },
    {
      id: "faq-8",
      question: "How do I create a Career Roadmap?",
      answer: "To create a Career Roadmap, go to the Career tab on the homepage or dashboard. Enter your current role, experience level, skills, and target dream job. Our AI will analyze this information to generate a step-by-step roadmap showing the roles, skills, and timeframes needed to reach your goal position.",
      category: "career",
    },
    {
      id: "faq-9",
      question: "Can I change my target career?",
      answer: "Absolutely! You can create multiple career roadmaps with different target positions to explore various career paths. Premium users can save and compare different roadmaps side by side.",
      category: "career",
    },
    {
      id: "faq-10",
      question: "Is my data secure?",
      answer: "Yes, we take data security very seriously. All user data is encrypted both in transit and at rest. We use industry-standard security practices to protect your information. You can review our Privacy Policy for more details about how we handle your data.",
      category: "technical",
    },
    {
      id: "faq-11",
      question: "Which browsers are supported?",
      answer: "LifeMapAI works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.",
      category: "technical",
    },
    {
      id: "faq-12",
      question: "How can I get help if I have a problem?",
      answer: "If you encounter any issues, you can contact our support team through the Contact page, email us at support@lifemapai.com, or check our Help Center for troubleshooting guides. Premium subscribers receive priority support.",
      category: "technical",
    },
  ];
  
  // Filter FAQs based on search term and active category
  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                How Can We <span className="text-gradient">Help?</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Find answers to the most common questions about LifeMapAI
              </p>
              
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search for questions or keywords..."
                    className="pl-10 pr-4 py-3 w-full rounded-md border-gray-300 shadow-minimal"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <i className="fas fa-search"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Category Tabs */}
              <div className="flex overflow-x-auto mb-8 pb-2 scrollbar-hide">
                <div className="inline-flex space-x-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                        activeCategory === category.id
                          ? "bg-gray-800 text-white shadow-minimal"
                          : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-minimal"
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* FAQ Accordion */}
              <div className="bg-white rounded-md shadow-minimal border-minimal p-6 md:p-8">
                {filteredFAQs.length > 0 ? (
                  <Accordion type="single" collapsible className="space-y-2">
                    {filteredFAQs.map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-minimal"
                      >
                        <AccordionTrigger className="px-6 py-4 text-left font-medium text-gray-800 hover:bg-gray-50">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 py-4 text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-12">
                    <div className="mb-4 text-gray-400">
                      <i className="fas fa-search text-5xl"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">No results found</h3>
                    <p className="text-gray-600 mb-6">
                      We couldn't find any FAQs matching your search criteria.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setActiveCategory("all");
                      }}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Still Need Help Section */}
              <div className="mt-12 bg-gray-800 rounded-md shadow-minimal p-8 text-white">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
                    <p className="text-gray-300">
                      Our support team is here to help you with any questions or issues.
                    </p>
                  </div>
                  <Link href="/contact">
                    <Button className="bg-white text-gray-800 hover:bg-gray-100 shadow-minimal hover:shadow-minimal-hover whitespace-nowrap">
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quick Links Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Quick Links</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-md shadow-minimal border-minimal p-6 text-center hover:shadow-minimal-hover transition-shadow">
                  <div className="bg-gray-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-minimal">
                    <i className="fas fa-book text-gray-700 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">User Guides</h3>
                  <p className="text-gray-600 mb-4">
                    Step-by-step guides to help you make the most of LifeMapAI's features.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => alert('User guides coming soon!')}
                  >
                    View Guides
                  </Button>
                </div>
                
                <div className="bg-white rounded-md shadow-minimal border-minimal p-6 text-center hover:shadow-minimal-hover transition-shadow">
                  <div className="bg-gray-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-minimal">
                    <i className="fas fa-video text-gray-700 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Video Tutorials</h3>
                  <p className="text-gray-600 mb-4">
                    Watch our video tutorials to learn how to use LifeMapAI effectively.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => alert('Video tutorials coming soon!')}
                  >
                    Watch Videos
                  </Button>
                </div>
                
                <div className="bg-white rounded-md shadow-minimal border-minimal p-6 text-center hover:shadow-minimal-hover transition-shadow">
                  <div className="bg-gray-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-minimal">
                    <i className="fas fa-users text-gray-700 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Community</h3>
                  <p className="text-gray-600 mb-4">
                    Join our community forum to connect with other users and share experiences.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => alert('Community forum coming soon!')}
                  >
                    Join Community
                  </Button>
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