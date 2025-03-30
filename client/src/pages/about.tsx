import { Link } from "wouter";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createStaggeredAnimation } from "@/lib/animation";

// Import images
import heroPattern from "../assets/hero-pattern.svg";
import aboutImage from "../assets/about-image.svg";

export default function About() {
  // Set up animations when component mounts
  useEffect(() => {
    // Create staggered animations for mission items
    createStaggeredAnimation('.mission-container', '.flex.items-start', 0, 200);
    
    // Add animation classes to key elements
    const animateElements = () => {
      // Hero elements
      const headline = document.querySelector('.text-4xl.md\\:text-5xl');
      if (headline) headline.classList.add('animate-fade-in', 'animate', 'delay-100');
      
      const heroParagraph = document.querySelector('.text-lg.text-gray-600');
      if (heroParagraph) heroParagraph.classList.add('animate-fade-in', 'animate', 'delay-200');
      
      const heroImage = document.querySelector('.max-w-full.h-64');
      if (heroImage) heroImage.classList.add('animate-scale-up', 'animate', 'delay-300');
      
      // Story section
      const storyTitle = document.querySelectorAll('.text-3xl.font-bold');
      storyTitle.forEach((el, i) => el.classList.add('animate-on-scroll', 'animate-once', `delay-${(i + 1) * 100}`));
      
      // Content blocks
      const contentBlocks = document.querySelectorAll('.bg-white.rounded-md');
      contentBlocks.forEach((block, i) => {
        block.classList.add('animate-on-scroll', 'animate-once', `delay-${(i + 1) * 100}`);
      });
      
      // CTA button
      const ctaButton = document.querySelector('.text-center .bg-gray-800');
      if (ctaButton) ctaButton.classList.add('animate-pulse-glow');
    };
    
    // Run with slight delay to ensure DOM is ready
    setTimeout(animateElements, 100);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative border-b border-gray-200 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src={heroPattern} alt="Background Pattern" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 bg-white/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-16 md:py-20">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                  About <span className="text-gradient">LifeMapAI</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  We're on a mission to help people visualize their future and create actionable plans to achieve their dreams.
                </p>
                <img src={aboutImage} alt="About LifeMapAI" className="max-w-full h-64 mx-auto" />
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Story</h2>
              
              <div className="bg-white rounded-md shadow-minimal border-minimal p-8 mb-10">
                <p className="text-gray-600 mb-4 animate-on-scroll animate-once delay-100">
                  LifeMapAI was founded in 2023 by M. Himanish Reddy, who recognized a common challenge many people face: the difficulty of visualizing where their current choices and habits might lead them in the future.
                </p>
                <p className="text-gray-600 mb-4 animate-on-scroll animate-once delay-200">
                  Having worked with career development and personal growth for over 5 years, Himanish noticed that most people struggle not with setting goals, but with mapping out realistic paths to achieve them. Many were either overestimating what they could accomplish in a year or underestimating what they could achieve in a decade.
                </p>
                <p className="text-gray-600 mb-0 animate-on-scroll animate-once delay-300">
                  This insight led to the development of LifeMapAI, which combines advanced artificial intelligence with psychological research on habit formation, career progression, and lifestyle outcomes to create remarkably accurate future predictions and actionable roadmaps.
                </p>
              </div>
              
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Mission</h2>
              
              <div className="mission-container bg-white rounded-md shadow-minimal border-minimal p-8 mb-10">
                <div className="flex items-start mb-6 animate-slide-right">
                  <div className="bg-gray-100 p-3 rounded-md mr-4 shadow-minimal">
                    <i className="fas fa-lightbulb text-gray-700 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-xl mb-2">Illuminate Possibilities</h3>
                    <p className="text-gray-600">
                      We believe in showing people the potential outcomes of their current paths, while also revealing alternative futures they might not have considered.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start mb-6 animate-slide-right">
                  <div className="bg-gray-100 p-3 rounded-md mr-4 shadow-minimal">
                    <i className="fas fa-map-marked-alt text-gray-700 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-xl mb-2">Create Clear Pathways</h3>
                    <p className="text-gray-600">
                      Our goal is to transform vague aspirations into concrete, step-by-step plans that anyone can follow to reach their desired destination.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start animate-slide-right">
                  <div className="bg-gray-100 p-3 rounded-md mr-4 shadow-minimal">
                    <i className="fas fa-users text-gray-700 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-xl mb-2">Empower Everyone</h3>
                    <p className="text-gray-600">
                      We're committed to making advanced AI tools accessible to all, helping individuals from all backgrounds design their ideal futures.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center animate-on-scroll animate-once">
                <Link href="/">
                  <Button className="bg-gray-800 hover:bg-gray-700 text-white shadow-minimal hover:shadow-minimal-hover">
                    Try LifeMapAI Today
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}