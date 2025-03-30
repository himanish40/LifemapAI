import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InfoIcon } from "lucide-react";

interface FeatureTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  width?: string;
}

export default function FeatureTooltip({ 
  content, 
  children, 
  side = "top",
  width = "200px" 
}: FeatureTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate position based on side
  const getPosition = () => {
    switch (side) {
      case "top":
        return { bottom: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)" };
      case "bottom":
        return { top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)" };
      case "left":
        return { right: "calc(100% + 10px)", top: "50%", transform: "translateY(-50%)" };
      case "right":
        return { left: "calc(100% + 10px)", top: "50%", transform: "translateY(-50%)" };
      default:
        return { bottom: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)" };
    }
  };

  // Get animation variants based on side
  const getVariants = () => {
    const baseVariants = {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 }
    };

    switch (side) {
      case "top":
        return {
          ...baseVariants,
          initial: { ...baseVariants.initial, y: 10 },
          animate: { ...baseVariants.animate, y: 0 },
          exit: { ...baseVariants.exit, y: 10 }
        };
      case "bottom":
        return {
          ...baseVariants,
          initial: { ...baseVariants.initial, y: -10 },
          animate: { ...baseVariants.animate, y: 0 },
          exit: { ...baseVariants.exit, y: -10 }
        };
      case "left":
        return {
          ...baseVariants,
          initial: { ...baseVariants.initial, x: 10 },
          animate: { ...baseVariants.animate, x: 0 },
          exit: { ...baseVariants.exit, x: 10 }
        };
      case "right":
        return {
          ...baseVariants,
          initial: { ...baseVariants.initial, x: -10 },
          animate: { ...baseVariants.animate, x: 0 },
          exit: { ...baseVariants.exit, x: -10 }
        };
      default:
        return baseVariants;
    }
  };

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center gap-1">
        {children}
        <InfoIcon className="h-4 w-4 text-[#86868b] hover:text-[#0071e3] transition-colors" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute z-50 bg-white p-3 rounded-lg text-sm text-[#1d1d1f]"
            style={{ 
              ...getPosition(),
              width,
              boxShadow: "0 5px 20px rgba(0, 0, 0, 0.15)",
              backdropFilter: "blur(8px)",
              background: "rgba(255, 255, 255, 0.95)",
            }}
            variants={getVariants()}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ 
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {content}
            <div 
              className="absolute w-2 h-2 bg-white transform rotate-45"
              style={{
                ...(side === "top" ? { bottom: "-4px", left: "50%", marginLeft: "-4px" } :
                  side === "bottom" ? { top: "-4px", left: "50%", marginLeft: "-4px" } :
                  side === "left" ? { right: "-4px", top: "50%", marginTop: "-4px" } :
                  { left: "-4px", top: "50%", marginTop: "-4px" })
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}