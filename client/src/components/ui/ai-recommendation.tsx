import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronRight, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BackgroundGradient } from '../effects/BackgroundGradient';

interface AIRecommendationProps {
  title: string;
  description: string;
  type?: 'insight' | 'suggestion' | 'warning';
  actionText?: string;
  onAction?: () => void;
  className?: string;
  isDismissible?: boolean;
}

export default function AIRecommendation({
  title,
  description,
  type = 'insight',
  actionText,
  onAction,
  className,
  isDismissible = false
}: AIRecommendationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  if (!isVisible) return null;

  // Type-specific styling
  const typeStyles = {
    insight: {
      icon: <Lightbulb className="h-5 w-5" />,
      colors: {
        text: 'text-white',
        background: 'from-blue-600 to-blue-400',
        iconBackground: 'bg-blue-500 bg-opacity-30',
        button: 'bg-white text-blue-600 hover:bg-opacity-90'
      }
    },
    suggestion: {
      icon: <Sparkles className="h-5 w-5" />,
      colors: {
        text: 'text-white',
        background: 'from-[#0071e3] to-[#4499ff]',
        iconBackground: 'bg-white bg-opacity-20',
        button: 'bg-white text-[#0071e3] hover:bg-opacity-90'
      }
    },
    warning: {
      icon: <Lightbulb className="h-5 w-5" />,
      colors: {
        text: 'text-white',
        background: 'from-amber-500 to-amber-400',
        iconBackground: 'bg-amber-500 bg-opacity-30',
        button: 'bg-white text-amber-600 hover:bg-opacity-90'
      }
    }
  };

  const selectedStyle = typeStyles[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={cn("rounded-xl overflow-hidden", className)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <BackgroundGradient
            containerClassName="rounded-xl"
            className="p-5 sm:p-6"
            gradientColor1={type === 'insight' ? 'rgba(59, 130, 246, 0.9)' : 
                            type === 'suggestion' ? 'rgba(0, 113, 227, 0.9)' : 
                            'rgba(245, 158, 11, 0.9)'}
            gradientColor2={type === 'insight' ? 'rgba(96, 165, 250, 0.8)' : 
                            type === 'suggestion' ? 'rgba(68, 153, 255, 0.8)' : 
                            'rgba(251, 191, 36, 0.8)'}
            gradientColor3="transparent"
            animate={true}
            speed="slow"
            interactive={false}
          >
            <div className="flex items-start">
              <div className={cn("p-2 rounded-full mr-4 flex-shrink-0", selectedStyle.colors.iconBackground)}>
                {selectedStyle.icon}
              </div>

              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className={cn("font-semibold text-lg mb-1", selectedStyle.colors.text)}>
                    {title}
                  </h3>
                  
                  {isDismissible && (
                    <button 
                      onClick={() => setIsVisible(false)}
                      className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  )}
                </div>

                <p className={cn("opacity-90 mb-4 leading-relaxed", selectedStyle.colors.text)}>
                  {description}
                </p>

                {actionText && onAction && (
                  <motion.button
                    className={cn("px-4 py-2 rounded-full text-sm font-medium flex items-center", selectedStyle.colors.button)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onAction}
                  >
                    {actionText}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </motion.button>
                )}
              </div>
            </div>
          </BackgroundGradient>
        </motion.div>
      )}
    </AnimatePresence>
  );
}