import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TabNavigation from "@/components/layout/TabNavigation";
import TimelineForm from "@/components/timeline/TimelineForm";
import TimelineVisualization from "@/components/timeline/TimelineVisualization";
import CareerForm from "@/components/career/CareerForm";
import CareerRoadmap from "@/components/career/CareerRoadmap";
import SavedMaps from "@/components/saved/SavedMaps";
import OnboardingManager from "@/components/onboarding/OnboardingManager";
import { createStaggeredAnimation } from "@/lib/animation";

// Import images
import heroPattern from "../assets/hero-pattern.svg";

type Tab = "timeline" | "career" | "saved";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("timeline");
  const [currentTimelineId, setCurrentTimelineId] = useState<number | null>(null);
  const [currentCareerId, setCurrentCareerId] = useState<number | null>(null);
  
  // Set up animations when component mounts
  useEffect(() => {
    // Create staggered animations for the grid items
    createStaggeredAnimation('.grid-cols-3', '.flex.flex-col', 100, 100);
    
    // Add animation classes to key elements
    const animateElements = () => {
      // Hero headline
      const headline = document.querySelector('.text-4xl');
      if (headline) headline.classList.add('animate-fade-in', 'animate', 'delay-100');
      
      // Content blocks
      const formBlocks = document.querySelectorAll('.bg-white.rounded-md');
      formBlocks.forEach((block, index) => {
        block.classList.add('animate-on-scroll', `delay-${(index + 1) * 100}`);
      });
    };
    
    // Run with slight delay to ensure DOM is ready
    setTimeout(animateElements, 100);
  }, []);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  const handleTimelineCreated = (timelineId: number) => {
    setCurrentTimelineId(timelineId);
  };

  const handleCareerCreated = (careerId: number) => {
    setCurrentCareerId(careerId);
  };

  const handleTimelineSelected = (timelineId: number) => {
    setCurrentTimelineId(timelineId);
    setActiveTab("timeline");
  };

  const handleCareerSelected = (careerId: number) => {
    setCurrentCareerId(careerId);
    setActiveTab("career");
  };

  // Check if the user is new (no saved timelines or careers)
  const [isNewUser, setIsNewUser] = useState(true);
  
  useEffect(() => {
    // Load saved items to check if user is new
    // If there are saved items, user is not new
    const checkIfNewUser = async () => {
      try {
        const timelineResponse = await fetch('/api/timelines');
        const careerResponse = await fetch('/api/careers');
        
        if (timelineResponse.ok && careerResponse.ok) {
          const timelines = await timelineResponse.json();
          const careers = await careerResponse.json();
          
          setIsNewUser(timelines.length === 0 && careers.length === 0);
        }
      } catch (error) {
        console.error("Error checking if user is new:", error);
      }
    };
    
    checkIfNewUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#fbfbfd]">
      <Header />
      
      {/* Onboarding Tour Guide */}
      <OnboardingManager isNewUser={isNewUser} />
      
      {/* Hero Section - Apple Style */}
      <section className="relative border-b border-[#d2d2d7] overflow-hidden">
        <div className="absolute inset-0 z-0 parallax-bg" data-parallax-speed="0.2">
          <div className="w-full h-full bg-[#f5f5f7]"></div>
        </div>
        <div className="relative z-10 bg-[#fbfbfd]">
          <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="flex flex-col items-center text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="parallax-slow max-w-3xl tour-welcome"
              >
                <h1 className="text-apple-display mb-6 text-[#1d1d1f]">
                  Design Your Future with <span className="text-gradient">AI</span>
                </h1>
                <p className="text-apple-subheadline text-[#86868b] mb-6 max-w-xl mx-auto">
                  Predict your life trajectory and visualize your path to dream careers with our advanced AI-powered planning tools.
                </p>
                <div className="mx-auto mb-8 text-[#86868b] text-sm">
                  Developed by <span className="text-gradient font-medium">M. Himanish Reddy</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button 
                    className="apple-button tour-create"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(0, 113, 227, 0.4)",
                        "0 0 0 10px rgba(0, 113, 227, 0)",
                        "0 0 0 0 rgba(0, 113, 227, 0)"
                      ]
                    }}
                    transition={{
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }
                    }}
                    onClick={() => {
                      handleTabChange("timeline");
                      // Scroll to the tab content section
                      const mainContent = document.querySelector('.tab-contents');
                      if (mainContent) {
                        mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    Create Timeline
                  </motion.button>
                  <motion.button 
                    className="py-3 px-6 text-[#0071e3] font-medium rounded-full border border-transparent"
                    whileHover={{ 
                      scale: 1.05, 
                      borderColor: "rgba(0, 113, 227, 0.3)" 
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleTabChange("career");
                      // Scroll to the tab content section
                      const mainContent = document.querySelector('.tab-contents');
                      if (mainContent) {
                        mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    Find Career Path
                  </motion.button>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="mx-auto max-w-3xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative parallax-medium">
                <div className="apple-card-premium">
                  <div className="grid grid-cols-3 gap-6">
                    <motion.div 
                      className="flex flex-col items-center p-4 rounded-xl bg-[#f5f5f7]"
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 4,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#f0f0f2"
                      }}
                    >
                      <span className="text-gradient font-bold text-2xl mb-1">5</span>
                      <span className="text-[#86868b] text-sm">Years</span>
                    </motion.div>
                    <motion.div 
                      className="flex flex-col items-center p-4 rounded-xl bg-[#f5f5f7]"
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 4.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: 0.5
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#f0f0f2"
                      }}
                    >
                      <span className="text-gradient font-bold text-2xl mb-1">10</span>
                      <span className="text-[#86868b] text-sm">Years</span>
                    </motion.div>
                    <motion.div 
                      className="flex flex-col items-center p-4 rounded-xl bg-[#f5f5f7]"
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: 1
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#f0f0f2"
                      }}
                    >
                      <span className="text-gradient font-bold text-2xl mb-1">20</span>
                      <span className="text-[#86868b] text-sm">Years</span>
                    </motion.div>
                  </div>
                  <div className="mt-6 bg-[#f5f5f7] rounded-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div className="font-medium text-[#1d1d1f]">Life Trajectory</div>
                      <div className="text-xs text-[#86868b] px-3 py-1 bg-white rounded-full">AI Prediction</div>
                    </div>
                    <div className="h-32 flex items-center justify-center">
                      <div className="w-full h-1 bg-[#d2d2d7] relative">
                        {/* Animated progress bar */}
                        <motion.div 
                          className="absolute h-1 bg-[#0071e3]"
                          initial={{ width: 0 }}
                          animate={{ width: "66%" }}
                          transition={{ 
                            duration: 1.5, 
                            ease: "easeOut",
                            delay: 0.3
                          }}
                        />
                        
                        {/* Timeline points with staggered animations */}
                        <motion.div 
                          className="absolute -top-2 left-0 w-5 h-5 rounded-full bg-white border border-[#d2d2d7]"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                        />
                        
                        <motion.div 
                          className="absolute -top-2 left-1/3 w-5 h-5 rounded-full bg-white border border-[#d2d2d7]"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.2 }}
                        />
                        
                        <motion.div 
                          className="absolute -top-2 left-2/3 w-5 h-5 rounded-full bg-[#0071e3]"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.6 }}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <motion.div
                            className="absolute inset-0 rounded-full bg-[#0071e3]"
                            animate={{ 
                              boxShadow: [
                                "0 0 0 0px rgba(0, 113, 227, 0.3)",
                                "0 0 0 10px rgba(0, 113, 227, 0)"
                              ]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "loop"
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <main className="flex-grow container mx-auto px-4 py-20">
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        
        <motion.div 
          className="tab-contents mt-8"
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {activeTab === "timeline" && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2">
                <div className="apple-card tour-form">
                  <TimelineForm onTimelineCreated={handleTimelineCreated} />
                </div>
              </div>
              <div className="lg:col-span-3">
                <div className="apple-card h-full tour-result">
                  <TimelineVisualization timelineId={currentTimelineId} />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "career" && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2">
                <div className="apple-card">
                  <CareerForm onCareerCreated={handleCareerCreated} />
                </div>
              </div>
              <div className="lg:col-span-3">
                <div className="apple-card h-full">
                  <CareerRoadmap careerId={currentCareerId} />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "saved" && (
            <div className="apple-card">
              <SavedMaps 
                onTimelineSelected={handleTimelineSelected}
                onCareerSelected={handleCareerSelected}
              />
            </div>
          )}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
