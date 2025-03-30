import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Character that guides the user through the tour
export type GuideCharacterType = {
  name: string;
  avatar: string;
  color: string;
  personalityTraits: string[];
};

// Tour step configuration
export type TourStep = {
  target: string; // CSS selector for the target element
  title: string;
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  spotlight?: boolean;
};

interface TourGuideProps {
  steps: TourStep[];
  onComplete: () => void;
  onSkip?: () => void;
  autoStart?: boolean;
  character?: GuideCharacterType;
}

const defaultCharacter: GuideCharacterType = {
  name: "Guide",
  avatar: "👩‍🏫",
  color: "#0071e3",
  personalityTraits: ["friendly", "helpful", "informative"]
};

export default function TourGuide({
  steps,
  onComplete,
  onSkip = onComplete,
  autoStart = false,
  character = defaultCharacter
}: TourGuideProps) {
  const [active, setActive] = useState(autoStart);
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  // Calculate position of tooltip based on target element and specified position
  const calculatePosition = (el: Element, position: string = 'bottom') => {
    if (!el) return { top: 0, left: 0 };
    
    const rect = el.getBoundingClientRect();
    setTargetRect(rect);
    const tooltipHeight = tooltipRef.current?.offsetHeight || 150;
    const tooltipWidth = tooltipRef.current?.offsetWidth || 320;
    
    // Calculate safe position that keeps tooltip in viewport
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    
    let top = 0;
    let left = 0;
    
    switch (position) {
      case 'top':
        top = rect.top + scrollY - tooltipHeight - 10;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case 'right':
        top = rect.top + scrollY + rect.height / 2 - tooltipHeight / 2;
        left = rect.right + 10;
        break;
      case 'bottom':
        top = rect.bottom + scrollY + 10;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case 'left':
        top = rect.top + scrollY + rect.height / 2 - tooltipHeight / 2;
        left = rect.left - tooltipWidth - 10;
        break;
    }
    
    // Keep tooltip within viewport bounds
    left = Math.max(10, Math.min(windowWidth - tooltipWidth - 10, left));
    top = Math.max(scrollY + 10, Math.min(scrollY + windowHeight - tooltipHeight - 10, top));
    
    return { top, left };
  };
  
  // Update position when step changes or window resizes
  useEffect(() => {
    if (!active || steps.length === 0) return;
    
    const step = steps[currentStep];
    const el = document.querySelector(step.target);
    
    if (el) {
      const position = calculatePosition(el, step.position);
      setTooltipPosition(position);
      
      // Scroll element into view if needed
      const rect = el.getBoundingClientRect();
      const isInViewport = 
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth;
        
      if (!isInViewport) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    
    const handleResize = () => {
      if (el) {
        const position = calculatePosition(el, step.position);
        setTooltipPosition(position);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [active, currentStep, steps]);
  
  // Handle next/previous step navigation
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setActive(false);
      onComplete();
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleSkip = () => {
    setActive(false);
    onSkip();
  };
  
  // Don't render anything if tour is not active
  if (!active) return null;
  
  // Current step
  const step = steps[currentStep];
  
  return (
    <>
      {/* Overlay/mask with spotlight effect */}
      {step.spotlight && targetRect && (
        <div className="fixed inset-0 z-50 bg-black/60 pointer-events-none">
          {/* Spotlight cutout */}
          <div 
            className="absolute rounded-xl"
            style={{
              top: targetRect.top + window.scrollY,
              left: targetRect.left,
              width: targetRect.width,
              height: targetRect.height,
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75)',
              transition: 'all 0.3s ease'
            }}
          />
        </div>
      )}
      
      {/* Tour guide tooltip */}
      <AnimatePresence>
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed z-[9999] w-80 rounded-xl bg-white shadow-2xl overflow-hidden"
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
          }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between p-4"
            style={{ backgroundColor: character.color, color: 'white' }}
          >
            <div className="flex items-center gap-2">
              <div className="text-2xl">{character.avatar}</div>
              <h3 className="font-medium">{character.name}</h3>
            </div>
            <button 
              onClick={handleSkip}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-4">
            <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
            <p className="text-gray-600 mb-4">{step.content}</p>
            
            {/* Navigation buttons */}
            <div className="flex justify-between">
              <div>
                {currentStep > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={prevStep}
                    className="flex items-center gap-1"
                  >
                    <ChevronLeft size={16} />
                    Back
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-xs text-gray-400">
                  {currentStep + 1} of {steps.length}
                </div>
                <Button 
                  size="sm"
                  onClick={nextStep}
                  className={cn(
                    "flex items-center gap-1",
                    { "bg-green-600 hover:bg-green-700": currentStep === steps.length - 1 }
                  )}
                >
                  {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                  {currentStep < steps.length - 1 && <ChevronRight size={16} />}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Connector triangle */}
          {targetRect && (
            <div 
              className="absolute w-4 h-4 bg-white transform rotate-45"
              style={{
                // Position depends on which side of the tooltip the target is on
                ...(step.position === 'top' && { bottom: '-8px', left: '50%', marginLeft: '-8px' }),
                ...(step.position === 'right' && { left: '-8px', top: '50%', marginTop: '-8px' }),
                ...(step.position === 'bottom' && { top: '-8px', left: '50%', marginLeft: '-8px' }),
                ...(step.position === 'left' && { right: '-8px', top: '50%', marginTop: '-8px' }),
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}