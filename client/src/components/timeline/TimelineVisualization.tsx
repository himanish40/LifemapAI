import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRightIcon, 
  CheckCircle2, 
  Activity, 
  TrendingUp, 
  HeartPulse, 
  Share2, 
  BookmarkIcon,
  BookmarkPlusIcon,
  Download,
  Mail,
  Link
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BackgroundGradient } from '../effects/BackgroundGradient';
import LoadingAnimation from '../ui/loading-animation';
import ParticleBackground from '../effects/ParticleBackground';
import PremiumButton from '../ui/premium-button-fixed';

interface TimelinePoint {
  label: string;
  year: string;
  age: string;
  description: string;
  isActive: boolean;
  color: string;
}

interface TimelineVisualizationProps {
  timelineId: number | null;
}

export default function TimelineVisualization({ timelineId }: TimelineVisualizationProps) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'timeline' | 'insights'>('timeline');
  const [highlightedPoint, setHighlightedPoint] = useState<string | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [timelinePoints, setTimelinePoints] = useState<TimelinePoint[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Animated progress value for the timeline line
  const [progressValue, setProgressValue] = useState(0);

  const { data: timeline, isLoading, error } = useQuery({
    queryKey: ["/api/timeline", timelineId],
    queryFn: async () => {
      if (!timelineId) return null;
      const response = await fetch(`/api/timeline/${timelineId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch timeline");
      }
      return response.json();
    },
    enabled: !!timelineId,
  });

  // Process timeline data and create points array
  useEffect(() => {
    if (!timeline || !timeline.prediction) return;
    
    const prediction = timeline.prediction;
    
    setTimelinePoints([
      {
        label: "Now",
        year: "Present",
        age: prediction.present.age,
        description: prediction.present.description,
        isActive: true,
        color: "#0071e3"
      },
      {
        label: "+5",
        year: "5 Years",
        age: prediction.fiveYears.age,
        description: prediction.fiveYears.description,
        isActive: false,
        color: "#4299e1"
      },
      {
        label: "+10",
        year: "10 Years",
        age: prediction.tenYears.age,
        description: prediction.tenYears.description,
        isActive: false,
        color: "#7eb7f6"
      },
      {
        label: "+20",
        year: "20 Years",
        age: prediction.twentyYears.age,
        description: prediction.twentyYears.description,
        isActive: false,
        color: "#bfdcff"
      }
    ]);
    
    // Animate the timeline points sequentially
    const animatePoints = async () => {
      for (let i = 0; i < 4; i++) {
        setHighlightedPoint(i.toString());
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      setHighlightedPoint(null);
    };
    
    animatePoints();
    
    // Animate the progress line
    setTimeout(() => {
      setProgressValue(100);
    }, 500);
  }, [timeline]);

  // Handle timeline point click
  const handlePointClick = (index: number) => {
    setTimelinePoints(prev => 
      prev.map((point, i) => ({
        ...point,
        isActive: i === index
      }))
    );
  };

  const handleSaveTimeline = async () => {
    if (!timeline) return;
    
    setIsSaving(true);
    try {
      // In a real app, we would update the title or implement an actual save
      // For now, we'll just show a success toast
      setTimeout(() => {
        toast({
          title: "Timeline saved",
          description: "Your timeline has been saved successfully.",
        });
        setIsSaving(false);
      }, 1000);
    } catch (error) {
      console.error("Error saving timeline:", error);
      toast({
        title: "Failed to save timeline",
        description: "Please try again later.",
        variant: "destructive",
      });
      setIsSaving(false);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? "Timeline removed from your saved items" : "Timeline saved to your bookmarks",
    });
  };

  const renderEmptyState = () => (
    <div className="h-full min-h-[400px] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md text-center"
      >
        <BackgroundGradient
          containerClassName="p-[1px] rounded-2xl mb-6 mx-auto"
          className="rounded-2xl p-8"
          animate={true}
          speed="slow"
          interactive={true}
        >
          <div className="text-2xl font-semibold mb-3 text-gradient">Create Your Life Timeline</div>
          <p className="text-[#86868b] mb-4">
            Fill out the form to generate a personalized AI prediction of your life's trajectory over the next 5, 10, and 20 years.
          </p>
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="inline-flex items-center p-1.5 bg-white bg-opacity-50 rounded-full text-xs text-[#1d1d1f] shadow-sm backdrop-blur-sm">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#0071e3] mr-1" />
              Powered by Gemini 1.5 Pro
            </div>
          </motion.div>
        </BackgroundGradient>
      </motion.div>
    </div>
  );

  if (!timelineId) {
    return (
      <Card className="bg-white rounded-xl shadow-sm border-none">
        <CardContent className="p-0 overflow-hidden">
          {renderEmptyState()}
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="bg-white rounded-xl shadow-sm border-none">
        <CardContent className="p-6">
          <div className="min-h-[400px] flex flex-col items-center justify-center">
            <LoadingAnimation 
              size="large" 
              type="dots" 
              text="Generating your life timeline..."
            />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-6 text-[#86868b] max-w-md text-center"
            >
              Our AI is carefully analyzing your inputs and crafting a personalized timeline of your future. This will only take a moment...
            </motion.p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !timeline || !timeline.prediction) {
    return (
      <Card className="bg-white rounded-xl shadow-sm border-none">
        <CardContent className="p-6">
          <div className="min-h-[300px] flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="text-xl font-semibold mb-2 text-red-500">Something went wrong</div>
              <p className="text-[#86868b] mb-6 max-w-md">
                We couldn't generate your timeline. Please try again or contact support if the issue persists.
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

  const prediction = timeline.prediction;

  const renderTimelineContent = () => (
    <div className="relative" ref={timelineRef}>
      {/* Decorative elements */}
      <ParticleBackground 
        count={20} 
        color="#0071e3" 
        minSize={1} 
        maxSize={3} 
        speed={0.2}
        className="opacity-20"
      />
      
      {/* Timeline Line */}
      <div className="absolute left-0 w-1 bg-[#e8e8ed] h-full ml-[19px] md:ml-[21px] z-0">
        <motion.div 
          className="absolute top-0 left-0 w-full bg-[#0071e3]"
          style={{ 
            height: `${progressValue}%`,
            transition: 'height 1.5s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        />
      </div>

      {/* Timeline Nodes */}
      <div className="space-y-10 relative z-10">
        {timelinePoints.map((point, index) => {
          const isHighlighted = highlightedPoint === index.toString();
          
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.2 + index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="flex"
            >
              <div className="relative z-20">
                <motion.div 
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-md z-10 relative`}
                  style={{ backgroundColor: point.color }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePointClick(index)}
                  animate={point.isActive || isHighlighted ? { 
                    scale: [1, 1.05, 1],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  } : {}}
                >
                  {point.label}
                  
                  {/* Pulse animation for active point */}
                  {(point.isActive || isHighlighted) && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: point.color }}
                      animate={{ 
                        boxShadow: [
                          `0 0 0 0 ${point.color}80`,
                          `0 0 0 8px ${point.color}00`
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
              
              <motion.div 
                className={`ml-4 md:ml-6 bg-[#f5f5f7] p-5 rounded-xl flex-grow relative overflow-hidden`}
                whileHover={{ 
                  y: -3, 
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                  backgroundColor: "#f0f0f2"
                }}
                animate={point.isActive || isHighlighted ? {
                  y: -3,
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                  backgroundColor: "#f0f0f2"
                } : {}}
              >
                <h3 className="font-semibold text-lg text-[#1d1d1f]">
                  {point.year} <span className="text-[#86868b] font-normal">(Age {point.age})</span>
                </h3>
                <p className="text-[#1d1d1f] mt-2 leading-relaxed">{point.description}</p>
                
                {/* Decorative corner */}
                <div 
                  className="absolute bottom-0 right-0 w-16 h-16 opacity-5"
                  style={{
                    backgroundImage: `radial-gradient(circle at bottom right, ${point.color}, transparent 70%)`,
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderInsightsContent = () => {
    const insightSections = [
      {
        title: "Career Trajectory",
        content: prediction.insights.career,
        icon: <TrendingUp className="h-5 w-5 text-[#0071e3]" />,
        color: "#eef2ff",
        borderColor: "#e0e7ff"
      },
      {
        title: "Financial Outlook",
        content: prediction.insights.financial,
        icon: <Activity className="h-5 w-5 text-[#0071e3]" />,
        color: "#ecfdf5",
        borderColor: "#d1fae5"
      },
      {
        title: "Health & Wellbeing",
        content: prediction.insights.health,
        icon: <HeartPulse className="h-5 w-5 text-[#0071e3]" />,
        color: "#fffbeb",
        borderColor: "#fef3c7"
      }
    ];

    return (
      <div className="space-y-6">
        {insightSections.map((section, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.1 * index,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="p-5 rounded-xl overflow-hidden"
            style={{ 
              backgroundColor: section.color,
              borderWidth: 1,
              borderColor: section.borderColor
            }}
            whileHover={{ 
              y: -3, 
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div className="flex items-center mb-3">
              <div className="mr-3 p-2 bg-white rounded-full">
                {section.icon}
              </div>
              <h3 className="font-semibold text-[#1d1d1f]">{section.title}</h3>
            </div>
            <p className="text-[#1d1d1f] leading-relaxed">{section.content}</p>
          </motion.div>
        ))}
        
        {/* Premium CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <BackgroundGradient
            containerClassName="rounded-xl overflow-hidden"
            className="p-6"
            gradientColor1="rgba(0, 113, 227, 0.7)"
            gradientColor2="rgba(0, 157, 255, 0.6)"
            gradientColor3="rgba(128, 208, 255, 0.5)"
            animate={true}
            speed="slow"
          >
            <h3 className="text-white font-semibold text-lg mb-2">Unlock Advanced Insights</h3>
            <p className="text-white text-opacity-90 mb-4">
              Get deeper analysis, custom recommendations, and monthly updates to your life prediction.
            </p>
            <PremiumButton
              variant="secondary"
              size="md"
              icon={<ChevronRightIcon className="h-4 w-4" />}
              iconPosition="right"
              glowEffect={true}
            >
              Try Premium Features
            </PremiumButton>
          </BackgroundGradient>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white rounded-xl shadow-sm border-none shadow-xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#1d1d1f]">Your Life Timeline</h2>
            <div className="flex items-center space-x-2">
              {/* Bookmark button */}
              <motion.button
                className="p-2 rounded-full hover:bg-[#f5f5f7] text-[#86868b]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookmark}
              >
                {isBookmarked ? 
                  <BookmarkIcon className="h-5 w-5 text-[#0071e3]" /> : 
                  <BookmarkPlusIcon className="h-5 w-5" />
                }
              </motion.button>
              
              {/* Share button with dropdown */}
              <div className="relative">
                <motion.button 
                  className="p-2 rounded-full hover:bg-[#f5f5f7] text-[#86868b]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowShareOptions(!showShareOptions)}
                >
                  <Share2 className="h-5 w-5" />
                </motion.button>
                
                <AnimatePresence>
                  {showShareOptions && (
                    <motion.div 
                      className="absolute right-0 top-full mt-2 p-2 bg-white rounded-xl shadow-lg z-20 w-48"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-2 hover:bg-[#f5f5f7] rounded-lg cursor-pointer text-sm flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Export as PDF
                      </div>
                      <div className="p-2 hover:bg-[#f5f5f7] rounded-lg cursor-pointer text-sm flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Share via Email
                      </div>
                      <div className="p-2 hover:bg-[#f5f5f7] rounded-lg cursor-pointer text-sm flex items-center">
                        <Link className="h-4 w-4 mr-2" />
                        Copy Link
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Button
                variant="ghost"
                className="text-[#0071e3] hover:text-[#0077ed] font-medium text-sm hidden md:flex items-center"
                onClick={handleSaveTimeline}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Timeline"}
              </Button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex bg-[#f5f5f7] p-1 rounded-full mb-6">
            <motion.button 
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                activeTab === 'timeline' ? 
                'bg-white text-[#1d1d1f] shadow-sm' : 
                'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
              onClick={() => setActiveTab('timeline')}
              whileHover={activeTab !== 'timeline' ? { scale: 1.03 } : {}}
              whileTap={activeTab !== 'timeline' ? { scale: 0.97 } : {}}
            >
              Timeline
            </motion.button>
            <motion.button 
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                activeTab === 'insights' ? 
                'bg-white text-[#1d1d1f] shadow-sm' : 
                'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
              onClick={() => setActiveTab('insights')}
              whileHover={activeTab !== 'insights' ? { scale: 1.03 } : {}}
              whileTap={activeTab !== 'insights' ? { scale: 0.97 } : {}}
            >
              Insights
            </motion.button>
          </div>

          {/* Content based on active tab */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'timeline' ? renderTimelineContent() : renderInsightsContent()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
