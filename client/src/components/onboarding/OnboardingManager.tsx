import { useState, useEffect } from 'react';
import TourGuide, { TourStep } from './TourGuide';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface OnboardingManagerProps {
  isNewUser?: boolean;
}

export default function OnboardingManager({ isNewUser = true }: OnboardingManagerProps) {
  const [showTour, setShowTour] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [tourCompleted, setTourCompleted] = useLocalStorage('tourCompleted', false);
  
  useEffect(() => {
    // Only show tour prompt for new users who haven't completed it
    if (isNewUser && !tourCompleted) {
      // Small delay to let the UI render completely
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isNewUser, tourCompleted]);
  
  const tourSteps: TourStep[] = [
    {
      target: '.tour-welcome',
      title: 'Welcome to Your AI Life Planner!',
      content: 'This powerful tool uses AI to help you visualize your future and plan your career path. Let me show you around!',
      position: 'bottom',
      spotlight: true,
    },
    {
      target: '.tour-timeline',
      title: 'Life Timeline',
      content: 'This tab lets you create personalized timeline predictions for your future based on your current situation and goals.',
      position: 'bottom',
      spotlight: true,
    },
    {
      target: '.tour-career',
      title: 'Career Roadmap',
      content: 'Want to know how to achieve your dream job? This tab creates step-by-step roadmaps to guide your career journey.',
      position: 'bottom',
      spotlight: true,
    },
    {
      target: '.tour-saved',
      title: 'Saved Predictions',
      content: 'You can access all your previously generated timelines and career roadmaps here anytime.',
      position: 'bottom',
      spotlight: true,
    },
    {
      target: '.tour-create',
      title: 'Let\'s Create!',
      content: 'Click this button to start generating your first AI prediction! Or you can follow along with the rest of the tour.',
      position: 'bottom',
      spotlight: true,
    },
    {
      target: '.tour-form',
      title: 'Tell Us About Yourself',
      content: 'Fill in details about your current situation and future goals. The more information you provide, the more accurate our AI predictions will be.',
      position: 'right',
      spotlight: true,
    },
    {
      target: '.tour-result',
      title: 'Your AI Prediction',
      content: 'After submitting the form, your personalized timeline or career roadmap will appear here. You can save these for future reference.',
      position: 'left',
      spotlight: true,
    }
  ];
  
  const handleTourComplete = () => {
    setShowTour(false);
    setTourCompleted(true);
  };
  
  const handleTourSkip = () => {
    setShowTour(false);
    setTourCompleted(true);
  };
  
  const character = {
    name: "Nova",
    avatar: "🤖",
    color: "#0071e3",
    personalityTraits: ["helpful", "enthusiastic", "knowledgeable"]
  };
  
  return (
    <>
      {/* Tour Guide */}
      {showTour && (
        <TourGuide 
          steps={tourSteps} 
          onComplete={handleTourComplete}
          onSkip={handleTourSkip}
          autoStart={true}
          character={character}
        />
      )}

      {/* Tour Prompt */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 p-4 bg-white rounded-xl shadow-lg z-50 max-w-sm"
            style={{ boxShadow: '0 5px 25px rgba(0,0,0,0.15)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl">{character.avatar}</div>
              <div>
                <h4 className="font-medium text-[#1d1d1f]">Hi, I'm {character.name}!</h4>
                <p className="text-sm text-[#86868b]">Your AI guide</p>
              </div>
              <button 
                onClick={() => {
                  setShowPrompt(false);
                  setTourCompleted(true);
                }}
                className="ml-auto p-1.5 rounded-full hover:bg-[#f5f5f7] transition-colors"
              >
                <X size={16} className="text-[#86868b]" />
              </button>
            </div>
            
            <p className="text-sm text-[#1d1d1f] mb-4">
              Would you like me to show you around and help you discover all the features?
            </p>
            
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setShowPrompt(false);
                  setTourCompleted(true);
                }}
              >
                Maybe Later
              </Button>
              
              <Button 
                size="sm"
                onClick={() => {
                  setShowPrompt(false);
                  setShowTour(true);
                }}
                className="bg-[#0071e3] hover:bg-[#0077ed]"
              >
                Take Tour
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}