import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  pulseEffect?: boolean;
  glowEffect?: boolean;
  glowColor?: string;
  children: React.ReactNode;
}

export default function PremiumButton({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  pulseEffect = false,
  glowEffect = false,
  glowColor = "rgba(0, 113, 227, 0.5)",
  className,
  children,
  ...props
}: PremiumButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Variant styles
  const variantStyles = {
    primary: "bg-[#0071e3] text-white hover:bg-[#0077ed] hover:-translate-y-1 active:translate-y-0 transform transition-all duration-200",
    secondary: "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed] hover:-translate-y-1 active:translate-y-0 transform transition-all duration-200",
    outline: "bg-transparent border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:-translate-y-1 active:translate-y-0 transform transition-all duration-200",
    ghost: "bg-transparent text-[#0071e3] hover:bg-[#f5f5f7] hover:-translate-y-1 active:translate-y-0 transform transition-all duration-200",
    link: "bg-transparent text-[#0071e3] hover:underline p-0 transition-all duration-200",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-full",
    md: "px-5 py-2.5 text-sm rounded-full",
    lg: "px-8 py-3.5 text-base rounded-full",
  };

  // Pulse animation
  const pulseClass = pulseEffect ? "animate-pulse-subtle" : "";

  // Glow effect
  const glowClass = glowEffect && (isHovered || isPressed) 
    ? `shadow-[0_0_15px_rgba(0,113,227,0.5)]` 
    : '';

  // Base classes
  const baseClasses = cn(
    "relative font-medium flex items-center justify-center",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    variant !== "link" ? "shadow-sm" : "",
    loading ? "cursor-not-allowed opacity-80" : "cursor-pointer",
    pulseClass,
    glowClass,
    className
  );

  return (
    <button
      className={baseClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      disabled={loading}
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

      {/* Ripple effect on primary buttons */}
      {(variant === "primary" || variant === "secondary") && isPressed && (
        <span className={`absolute inset-0 rounded-full ${
          variant === "primary" ? "bg-white" : "bg-[#0071e3]"
        } opacity-20 transition-all duration-500 scale-100`} />
      )}
    </button>
  );
}