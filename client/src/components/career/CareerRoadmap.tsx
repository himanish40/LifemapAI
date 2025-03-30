import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  BookmarkPlus,
  ArrowUpRight,
  Bell,
  Award,
  CheckCircle2
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingAnimation from '../ui/loading-animation';
import { BackgroundGradient } from '../effects/BackgroundGradient';
import ParticleBackground from '../effects/ParticleBackground';
import AIRecommendation from "../ui/ai-recommendation";
import PremiumButton from "../ui/premium-button-fixed";

interface CareerRoadmapProps {
  careerId: number | null;
}

export default function CareerRoadmap({ careerId }: CareerRoadmapProps) {
  const { toast } = useToast();
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'roadmap' | 'recommendations'>('roadmap');
  const [isSaving, setIsSaving] = useState(false);
  
  const { data: career, isLoading, error } = useQuery({
    queryKey: ["/api/career", careerId],
    queryFn: async () => {
      if (!careerId) return null;
      const response = await fetch(`/api/career/${careerId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch career roadmap");
      }
      return response.json();
    },
    enabled: !!careerId,
  });

  // Animate progress when career data is loaded
  useEffect(() => {
    if (career && career.roadmap) {
      const timer = setTimeout(() => {
        setProgress(100);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [career]);

  // Auto-expand the first stage
  useEffect(() => {
    if (career && career.roadmap) {
      try {
        // Try to find the current stage first
        const roadmapData = JSON.parse(career.roadmap);
        const currentIndex = roadmapData.stages.findIndex(s => s.isCurrent);
        setExpandedStage(currentIndex >= 0 ? currentIndex : 0);
      } catch (e) {
        console.error("Error parsing roadmap data:", e);
        setExpandedStage(0);
      }
    }
  }, [career]);

  const handleSaveRoadmap = async () => {
    if (!career) return;
    
    setIsSaving(true);
    try {
      // In a real app, we would update the title or implement an actual save
      // For now, we'll just show a success toast
      setTimeout(() => {
        toast({
          title: "Roadmap saved",
          description: "Your career roadmap has been saved successfully.",
        });
        setIsSaving(false);
      }, 1000);
    } catch (error) {
      console.error("Error saving roadmap:", error);
      toast({
        title: "Failed to save roadmap",
        description: "Please try again later.",
        variant: "destructive",
      });
      setIsSaving(false);
    }
  };

  if (!careerId) {
    return (
      <Card className="bg-white rounded-xl shadow-sm border-none">
        <CardContent className="p-0 overflow-hidden">
          <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-md"
            >
              <BackgroundGradient
                containerClassName="p-[1px] rounded-2xl mb-6 mx-auto"
                className="rounded-2xl p-8"
                animate={true}
                speed="slow"
                interactive={true}
                gradientColor1="rgba(79, 70, 229, 0.8)"
                gradientColor2="rgba(99, 102, 241, 0.7)"
                gradientColor3="rgba(129, 140, 248, 0.6)"
              >
                <div className="text-2xl font-semibold mb-3 text-white">Create Your Career Roadmap</div>
                <p className="text-white text-opacity-90 mb-4">
                  Fill out the form to generate an AI-powered career roadmap with specific steps to achieve your dream job.
                </p>
                <motion.div 
                  className="flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="inline-flex items-center p-1.5 bg-white bg-opacity-30 rounded-full text-xs text-white shadow-sm backdrop-blur-sm">
                    <Award className="h-3.5 w-3.5 text-white mr-1" />
                    Powered by Gemini 1.5 Pro
                  </div>
                </motion.div>
              </BackgroundGradient>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="bg-white rounded-xl shadow-sm border-none">
        <CardContent className="p-6">
          <div className="min-h-[500px] flex flex-col items-center justify-center">
            <LoadingAnimation 
              size="large" 
              type="dots" 
              text="Generating your career roadmap..."
            />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-6 text-[#86868b] max-w-md text-center"
            >
              Our AI is analyzing industry trends and skill requirements to craft your personalized career path...
            </motion.p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !career || !career.roadmap) {
    return (
      <Card className="bg-white rounded-xl shadow-sm border-none">
        <CardContent className="p-6">
          <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="text-xl font-semibold mb-2 text-red-500">Something went wrong</div>
              <p className="text-[#86868b] mb-6 max-w-md">
                We couldn't generate your career roadmap. Please try again or contact support if the issue persists.
              </p>
              <PremiumButton variant="primary">
                Try again
              </PremiumButton>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    );
  }

  let roadmapData;
  try {
    roadmapData = JSON.parse(career.roadmap);
  } catch (e) {
    console.error("Error parsing roadmap data:", e);
    return (
      <Card className="bg-white rounded-xl shadow-sm border-none">
        <CardContent className="p-6">
          <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8">
            <div className="text-xl font-semibold mb-2 text-red-500">Invalid roadmap data</div>
            <p className="text-[#86868b] mb-6 max-w-md">
              The career roadmap data is invalid. Please try generating it again.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const roadmap = roadmapData;

  // Find current stage
  const currentStageIndex = roadmap.stages.findIndex((stage) => stage.isCurrent);
  
  // Calculate progress percentage
  const progressPercentage = 
    currentStageIndex >= 0 
      ? ((currentStageIndex + 1) / roadmap.stages.length) * 100
      : 0;

  return (
    <Card className="bg-white rounded-xl shadow-sm border-none overflow-hidden">
      <CardContent className="p-0">
        {/* Header with tabs */}
        <div className="sticky top-0 bg-white z-10 pt-5 pb-4 px-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-[#1d1d1f]">{roadmap.targetPosition}</h2>
              <div className="text-sm text-[#86868b]">{roadmap.timeframe}</div>
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.button
                className="p-2 rounded-full hover:bg-[#f5f5f7] text-[#86868b]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSaveRoadmap}
                disabled={isSaving}
              >
                <BookmarkPlus className="h-5 w-5" />
              </motion.button>
              
              <motion.button 
                className="p-2 rounded-full hover:bg-[#f5f5f7] text-[#86868b]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="h-5 w-5" />
              </motion.button>
              
              <motion.button 
                className="p-2 rounded-full hover:bg-[#f5f5f7] text-[#86868b]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
          
          <div className="flex bg-[#f5f5f7] p-1 rounded-full">
            <motion.button 
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                activeTab === 'roadmap' ? 
                'bg-white text-[#1d1d1f] shadow-sm' : 
                'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
              onClick={() => setActiveTab('roadmap')}
              whileHover={activeTab !== 'roadmap' ? { scale: 1.03 } : {}}
              whileTap={activeTab !== 'roadmap' ? { scale: 0.97 } : {}}
            >
              Roadmap
            </motion.button>
            <motion.button 
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                activeTab === 'recommendations' ? 
                'bg-white text-[#1d1d1f] shadow-sm' : 
                'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
              onClick={() => setActiveTab('recommendations')}
              whileHover={activeTab !== 'recommendations' ? { scale: 1.03 } : {}}
              whileTap={activeTab !== 'recommendations' ? { scale: 0.97 } : {}}
            >
              Recommendations
            </motion.button>
          </div>
        </div>

        <div className="px-6 pb-6">
          <AnimatePresence mode="wait">
            {activeTab === 'roadmap' ? (
              <motion.div
                key="roadmap"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* AI Recommendation */}
                <AIRecommendation
                  title="Career Path Optimization"
                  description="Based on current industry trends, focusing on cloud certifications alongside your planned skills could accelerate your progress by up to 30%."
                  type="suggestion"
                  actionText="View Premium Insights"
                  className="mb-6"
                  isDismissible={true}
                />
              
                {/* Career Stage Timeline */}
                <div className="relative mb-10">
                  {/* Timeline progress line */}
                  <div className="absolute left-0 w-1 bg-[#e8e8ed] h-full ml-[19px] md:ml-[21px] z-0">
                    <motion.div 
                      className="absolute top-0 left-0 w-full bg-indigo-500"
                      style={{ 
                        height: `${progress * (progressPercentage / 100)}%`,
                        transition: 'height 1.5s cubic-bezier(0.22, 1, 0.36, 1)'
                      }}
                    />
                  </div>

                  <div className="space-y-6">
                    {roadmap.stages.map((stage, index) => {
                      const isExpanded = expandedStage === index;
                      const nodeColor = stage.isTarget 
                        ? "bg-indigo-600" 
                        : stage.isCurrent 
                        ? "bg-indigo-500" 
                        : index < currentStageIndex
                        ? "bg-indigo-400"
                        : "bg-white border border-indigo-200";
                      
                      const nodeTextColor = index >= currentStageIndex && !stage.isTarget && !stage.isCurrent 
                        ? "text-indigo-500" 
                        : "text-white";
                      
                      return (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 0.1 * index,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          className="relative"
                        >
                          <div className="flex items-start">
                            <div className="relative z-20">
                              <motion.div 
                                className={`h-10 w-10 rounded-full flex items-center justify-center shadow-md z-10 relative ${nodeColor} ${nodeTextColor}`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                animate={stage.isCurrent ? {
                                  scale: [1, 1.05, 1],
                                  transition: {
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                  }
                                } : {}}
                              >
                                {index + 1}
                                
                                {/* Pulse animation for current stage */}
                                {stage.isCurrent && (
                                  <motion.div
                                    className="absolute inset-0 rounded-full bg-indigo-500"
                                    animate={{ 
                                      boxShadow: [
                                        "0 0 0 0 rgba(99, 102, 241, 0.7)",
                                        "0 0 0 10px rgba(99, 102, 241, 0)"
                                      ]
                                    }}
                                    transition={{
                                      duration: 1.5,
                                      repeat: Infinity,
                                      repeatType: "loop"
                                    }}
                                  />
                                )}
                              </motion.div>
                            </div>

                            <div className="ml-4 md:ml-6 flex-grow">
                              <motion.div
                                className={`rounded-xl overflow-hidden transition-all`}
                                initial={false}
                                animate={{ 
                                  y: isExpanded ? 0 : 0,
                                  boxShadow: isExpanded ? "0 8px 30px rgba(0, 0, 0, 0.08)" : "0 1px 3px rgba(0, 0, 0, 0.05)"
                                }}
                                onClick={() => setExpandedStage(expandedStage === index ? null : index)}
                              >
                                <div className={`p-5 ${isExpanded ? "bg-[#f0f0f2]" : "bg-[#f5f5f7]"}`}>
                                  <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                      <h3 className="font-semibold text-lg text-[#1d1d1f]">{stage.title}</h3>
                                      {stage.isCurrent && (
                                        <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">
                                          Current
                                        </span>
                                      )}
                                      {stage.isTarget && (
                                        <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">
                                          Target
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center">
                                      <span className="text-[#86868b] text-sm mr-2">
                                        {stage.timeframe}
                                      </span>
                                      <motion.div
                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-[#86868b]"
                                      >
                                        <ChevronDown className="h-5 w-5" />
                                      </motion.div>
                                    </div>
                                  </div>
                                  
                                  <motion.div
                                    className="text-[#1d1d1f] leading-relaxed"
                                    animate={{ height: isExpanded ? "auto" : "2.5rem", overflow: "hidden" }}
                                  >
                                    <p>{stage.description}</p>
                                  </motion.div>
                                </div>

                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="bg-white p-5 border-t border-[#e8e8ed]"
                                    >
                                      <h4 className="font-medium text-sm text-[#86868b] uppercase mb-3">
                                        Key Skills
                                      </h4>
                                      <div className="flex flex-wrap gap-2">
                                        {stage.skills.map((skill, skillIndex) => (
                                          <motion.span
                                            key={skillIndex}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ 
                                              duration: 0.3, 
                                              delay: 0.05 * skillIndex 
                                            }}
                                            className="px-3 py-1 bg-[#f5f5f7] rounded-full text-xs text-[#1d1d1f] font-medium"
                                            whileHover={{ 
                                              scale: 1.05, 
                                              backgroundColor: "#e8e8ed" 
                                            }}
                                          >
                                            {skill}
                                          </motion.span>
                                        ))}
                                      </div>
                                      
                                      {stage.isTarget && (
                                        <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ delay: 0.3 }}
                                          className="mt-4 pt-4 border-t border-[#e8e8ed]"
                                        >
                                          <PremiumButton
                                            variant="primary"
                                            size="sm"
                                            icon={<ArrowUpRight className="h-4 w-4" />}
                                            iconPosition="right"
                                          >
                                            View Similar Job Listings
                                          </PremiumButton>
                                        </motion.div>
                                      )}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="recommendations"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-6"
              >
                {/* Education Recommendations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-xl overflow-hidden relative"
                >
                  <div className="p-5 bg-blue-50 border border-blue-100">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-blue-500 bg-opacity-10 rounded-full mr-4">
                        <GraduationCap className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-lg text-blue-900">Education</h3>
                    </div>
                    
                    <ul className="space-y-3 relative z-10">
                      {roadmap.recommendations.education.map((item, index) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start bg-white p-3 rounded-lg shadow-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                          whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
                        >
                          <span className="text-blue-500 flex-shrink-0 mr-3">•</span>
                          <span className="text-[#1d1d1f]">{item.text}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    {/* Decorative background pattern */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </div>
                </motion.div>

                {/* Experience Recommendations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-xl overflow-hidden relative"
                >
                  <div className="p-5 bg-emerald-50 border border-emerald-100">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-emerald-500 bg-opacity-10 rounded-full mr-4">
                        <Briefcase className="h-5 w-5 text-emerald-600" />
                      </div>
                      <h3 className="font-semibold text-lg text-emerald-900">Experience</h3>
                    </div>
                    
                    <ul className="space-y-3 relative z-10">
                      {roadmap.recommendations.experience.map((item, index) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start bg-white p-3 rounded-lg shadow-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                          whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
                        >
                          <span className="text-emerald-500 flex-shrink-0 mr-3">•</span>
                          <span className="text-[#1d1d1f]">{item.text}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    {/* Decorative background pattern */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full filter blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2"></div>
                    </div>
                  </div>
                </motion.div>

                {/* Networking Recommendations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="rounded-xl overflow-hidden relative"
                >
                  <div className="p-5 bg-amber-50 border border-amber-100">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-amber-500 bg-opacity-10 rounded-full mr-4">
                        <Users className="h-5 w-5 text-amber-600" />
                      </div>
                      <h3 className="font-semibold text-lg text-amber-900">Networking</h3>
                    </div>
                    
                    <ul className="space-y-3 relative z-10">
                      {roadmap.recommendations.network.map((item, index) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start bg-white p-3 rounded-lg shadow-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                          whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
                        >
                          <span className="text-amber-500 flex-shrink-0 mr-3">•</span>
                          <span className="text-[#1d1d1f]">{item.text}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    {/* Decorative background pattern */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full filter blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Premium CTA */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-4"
                >
                  <BackgroundGradient
                    containerClassName="rounded-xl overflow-hidden"
                    className="p-6"
                    gradientColor1="rgba(79, 70, 229, 0.9)"
                    gradientColor2="rgba(99, 102, 241, 0.8)"
                    gradientColor3="rgba(129, 140, 248, 0.7)"
                    animate={true}
                    speed="slow"
                  >
                    <h3 className="text-white font-semibold text-lg mb-2">Career Growth Accelerator</h3>
                    <p className="text-white text-opacity-90 mb-4">
                      Get personalized monthly updates on industry trends, job opportunities, and skill recommendations tailored to your career path.
                    </p>
                    <PremiumButton
                      variant="secondary"
                      size="md"
                      icon={<ArrowUpRight className="h-4 w-4" />}
                      iconPosition="right"
                      glowEffect={true}
                    >
                      Get Premium Career Insights
                    </PremiumButton>
                  </BackgroundGradient>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
