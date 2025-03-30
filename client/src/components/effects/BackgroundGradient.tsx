import { motion } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";

interface BackgroundGradientProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
  speed?: "slow" | "medium" | "fast";
  interactive?: boolean;
  gradientColor1?: string;
  gradientColor2?: string;
  gradientColor3?: string;
  gradientColor4?: string;
  borderRadius?: number;
}

export const BackgroundGradient = ({
  children,
  className = "",
  containerClassName = "",
  animate = true,
  speed = "medium",
  interactive = true,
  gradientColor1 = "rgba(0, 113, 227, 0.8)",
  gradientColor2 = "rgba(0, 157, 255, 0.7)",
  gradientColor3 = "rgba(128, 208, 255, 0.6)",
  gradientColor4 = "rgba(240, 249, 255, 0.5)",
  borderRadius = 16,
}: BackgroundGradientProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setSize({ width, height });
      setPosition({ x: width / 2, y: height / 2 });
      setTimeout(() => {
        setOpacity(1);
      }, 300);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    
    const { left, top } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setPosition({ x, y });
  };

  // Animation speeds
  const animationSpeed = {
    slow: 12,
    medium: 8,
    fast: 4,
  };

  return (
    <div
      className={`relative ${containerClassName}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{ borderRadius: borderRadius }}
    >
      {/* Gradient background */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${gradientColor4}, ${gradientColor3}, ${gradientColor2}, ${gradientColor1})`,
          borderRadius: borderRadius,
          transition: interactive ? "background 0.3s ease" : "opacity 0.5s ease",
        }}
        initial={{ opacity: 0 }}
        animate={
          animate
            ? {
                background: [
                  `radial-gradient(circle at 25% 25%, ${gradientColor4}, ${gradientColor3}, ${gradientColor2}, ${gradientColor1})`,
                  `radial-gradient(circle at 75% 75%, ${gradientColor4}, ${gradientColor3}, ${gradientColor2}, ${gradientColor1})`,
                  `radial-gradient(circle at 75% 25%, ${gradientColor4}, ${gradientColor3}, ${gradientColor2}, ${gradientColor1})`,
                  `radial-gradient(circle at 25% 75%, ${gradientColor4}, ${gradientColor3}, ${gradientColor2}, ${gradientColor1})`,
                  `radial-gradient(circle at 25% 25%, ${gradientColor4}, ${gradientColor3}, ${gradientColor2}, ${gradientColor1})`,
                ],
              }
            : {}
        }
        transition={
          animate
            ? {
                background: {
                  duration: animationSpeed[speed],
                  repeat: Infinity,
                  ease: "linear",
                },
              }
            : {}
        }
      />

      {/* Glimmer effect on hover */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          borderRadius: borderRadius,
          opacity: 0,
          backgroundSize: "200% 200%",
          backgroundImage: `linear-gradient(135deg, ${gradientColor1}00 0%, ${gradientColor2}44 50%, ${gradientColor1}00 100%)`,
        }}
        animate={{
          opacity: [0, 0.2, 0],
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Children */}
      <div className={`relative z-20 ${className}`}>{children}</div>
    </div>
  );
};