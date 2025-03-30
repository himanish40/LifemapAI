import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimelinePoint {
  year: number;
  title: string;
  description: string;
  isActive: boolean;
}

export default function HeroTimeline() {
  const [points, setPoints] = useState<TimelinePoint[]>([
    { 
      year: 2024, 
      title: "Present", 
      description: "Your current life stage, with all its goals and aspirations.", 
      isActive: true 
    },
    { 
      year: 2029, 
      title: "5 Years Later", 
      description: "A glimpse at your potential future based on your current trajectory.", 
      isActive: false 
    },
    { 
      year: 2034, 
      title: "10 Years Later", 
      description: "A mid-term projection of your career and personal milestones.", 
      isActive: false 
    },
    { 
      year: 2044, 
      title: "20 Years Later", 
      description: "A long-term vision of your life achievements and legacy.", 
      isActive: false 
    }
  ]);

  const [activePointIndex, setActivePointIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Automatically cycle through points
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActivePointIndex((prev) => (prev + 1) % points.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, points.length]);

  // Update active point when activePointIndex changes
  useEffect(() => {
    setPoints(prevPoints => 
      prevPoints.map((point, idx) => ({
        ...point,
        isActive: idx === activePointIndex
      }))
    );
  }, [activePointIndex]);

  const handlePointClick = (index: number) => {
    setIsAutoPlaying(false);
    setActivePointIndex(index);
    
    // Resume auto-playing after 10 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  // Calculate progress percentage
  const progressPercentage = (activePointIndex / (points.length - 1)) * 100;

  return (
    <div className="mt-6 bg-[#f5f5f7] rounded-xl p-6 relative overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <div className="font-medium text-[#1d1d1f]">Life Trajectory</div>
        <div className="text-xs text-[#86868b] px-3 py-1 bg-white rounded-full flex items-center">
          <span className="w-2 h-2 bg-[#0071e3] rounded-full mr-2 animate-pulse"></span>
          AI Prediction
        </div>
      </div>
      
      {/* Timeline visualization */}
      <div className="h-16 flex items-center justify-center relative mb-10">
        <div className="w-full h-1 bg-[#d2d2d7] relative">
          {/* Animated progress bar */}
          <motion.div 
            className="absolute h-1 bg-[#0071e3]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
            }}
          />
          
          {/* Timeline points */}
          {points.map((point, index) => {
            const position = index / (points.length - 1) * 100;
            return (
              <motion.div 
                key={index}
                className={`absolute -top-3 cursor-pointer z-10`}
                style={{ left: `${position}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.2 + index * 0.2 
                }}
                onClick={() => handlePointClick(index)}
              >
                <motion.div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    point.isActive ? 'bg-[#0071e3] text-white' : 'bg-white border border-[#d2d2d7] text-[#86868b]'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={point.isActive ? { 
                    scale: [1, 1.1, 1],
                    transition: { 
                      duration: 1,
                      repeat: Infinity
                    }
                  } : {}}
                >
                  {index + 1}
                  
                  {/* Pulse effect for active point */}
                  {point.isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#0071e3]"
                      animate={{ 
                        boxShadow: [
                          "0 0 0 0px rgba(0, 113, 227, 0.4)",
                          "0 0 0 10px rgba(0, 113, 227, 0)"
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
                
                {/* Year label */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-[#86868b] whitespace-nowrap">
                  {point.year}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Active point description */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activePointIndex}
          className="bg-white rounded-xl p-4 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="font-medium text-[#1d1d1f] mb-2">
            {points[activePointIndex].title}
          </h3>
          <p className="text-sm text-[#86868b]">
            {points[activePointIndex].description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Subtle pattern overlay for visual interest */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, #0071e3 1px, transparent 1px),
            radial-gradient(circle at 75px 75px, #0071e3 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px"
        }}
      />
    </div>
  );
}