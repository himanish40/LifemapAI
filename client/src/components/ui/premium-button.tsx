import React, { useState, forwardRef } from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonBaseProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 
  keyof MotionProps | 'onDrag' | 'onDragStart' | 'onDragEnd'>;

interface PremiumButtonProps extends ButtonBaseProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  pulseEffect?: boolean;
  hoverScale?: number;
  glowEffect?: boolean;
  glowColor?: string;
  children: React.ReactNode;
}

// Create a motion button component that properly handles types
const MotionButton = motion.button;

const PremiumButton = forwardRef<HTMLButtonElement, PremiumButtonProps>(({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  pulseEffect = false,
  hoverScale = 1.05,
  glowEffect = false,
  glowColor = "rgba(0, 113, 227, 0.5)",
  className,
  children,
  ...props
}, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Variant styles
  const variantStyles = {
    primary: "bg-[#0071e3] text-white hover:bg-[#0077ed]",
    secondary: "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]",
    outline: "bg-transparent border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7]",
    ghost: "bg-transparent text-[#0071e3] hover:bg-[#f5f5f7]",
    link: "bg-transparent text-[#0071e3] hover:underline p-0",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-full",
    md: "px-5 py-2.5 text-sm rounded-full",
    lg: "px-8 py-3.5 text-base rounded-full",
  };

  // Base classes
  const baseClasses = cn(
    "relative font-medium transition-all flex items-center justify-center",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    variant !== "link" ? "shadow-sm" : "",
    loading ? "cursor-not-allowed opacity-80" : "cursor-pointer",
    className
  );

  // Animation controls
  const animationControls = pulseEffect && !loading ? {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  } : {};

  return (
    <MotionButton
      ref={ref}
      className={baseClasses}
      whileHover={{ 
        scale: !loading ? hoverScale : 1,
        y: !loading ? -2 : 0
      }}
      whileTap={{ 
        scale: !loading ? 0.95 : 1,
        y: !loading ? 0 : 0
      }}
      {...animationControls}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsPressed(true)}
      onTap={() => setIsPressed(false)}
      onTapCancel={() => setIsPressed(false)}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {/* Icon (left) */}
      {icon && iconPosition === "left" && !loading && (
        <span className="mr-2 flex items-center">{icon}</span>
      )}

      {/* Content */}
      <span>{children}</span>

      {/* Icon (right) */}
      {icon && iconPosition === "right" && !loading && (
        <span className="ml-2 flex items-center">{icon}</span>
      )}

      {/* Glow effect */}
      {glowEffect && variant === "primary" && (
        <motion.div
          className="absolute inset-0 rounded-full -z-10"
          animate={isHovered || isPressed ? { 
            boxShadow: `0 0 20px 2px ${glowColor}`
          } : { 
            boxShadow: `0 0 0px 0px ${glowColor}`
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Ripple effect on primary buttons */}
      {(variant === "primary" || variant === "secondary") && isPressed && (
        <motion.div
          initial={{ opacity: 0.5, scale: 0.5 }}
          animate={{ opacity: 0, scale: 1.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 rounded-full ${
            variant === "primary" ? "bg-white" : "bg-[#0071e3]"
          } opacity-20`}
        />
      )}
    </MotionButton>
  );
});

PremiumButton.displayName = "PremiumButton";

export default PremiumButton;