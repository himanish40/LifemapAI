import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingAnimationProps {
  size?: 'small' | 'medium' | 'large';
  type?: 'spinner' | 'dots' | 'pulse';
  text?: string;
  className?: string;
  color?: string;
}

export default function LoadingAnimation({
  size = 'medium',
  type = 'spinner',
  text,
  className,
  color = '#0071e3'
}: LoadingAnimationProps) {
  const containerClasses = cn(
    'flex flex-col items-center justify-center',
    className
  );

  // Size mappings
  const sizeMap = {
    small: {
      dots: 4,
      spacing: 3,
      dotSize: 6,
      spinnerSize: 16
    },
    medium: {
      dots: 4,
      spacing: 4,
      dotSize: 8,
      spinnerSize: 24
    },
    large: {
      dots: 5,
      spacing: 5,
      dotSize: 10,
      spinnerSize: 32
    }
  };

  const settings = sizeMap[size];

  // Spinner Animation
  if (type === 'spinner') {
    return (
      <div className={containerClasses}>
        <motion.div
          className="relative"
          style={{
            width: settings.spinnerSize,
            height: settings.spinnerSize
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${color}`,
              borderTopColor: 'transparent',
              width: '100%',
              height: '100%'
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-[#1d1d1f] font-medium text-center"
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  // Dots Animation
  if (type === 'dots') {
    return (
      <div className={containerClasses}>
        <div className="flex items-center justify-center space-x-2">
          {Array(settings.dots)
            .fill(null)
            .map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                style={{
                  backgroundColor: color,
                  width: settings.dotSize,
                  height: settings.dotSize
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
        </div>
        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-[#1d1d1f] font-medium text-center"
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  // Pulse Animation
  if (type === 'pulse') {
    return (
      <div className={containerClasses}>
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundColor: color,
            width: settings.spinnerSize * 1.2,
            height: settings.spinnerSize * 1.2,
            borderRadius: '50%'
          }}
        />
        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-[#1d1d1f] font-medium text-center"
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  return null;
}