import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

interface ParticleBackgroundProps {
  count?: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  className?: string;
}

export default function ParticleBackground({
  count = 50,
  color = "#0071e3",
  minSize = 2,
  maxSize = 6,
  speed = 0.5,
  className = ""
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const isInitialized = useRef<boolean>(false);

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    particles.current = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * (maxSize - minSize) + minSize;
      particles.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: Math.random() * 0.6 + 0.1,
        color
      });
    }
  };

  // Animation frame
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Update and draw particles
    particles.current.forEach(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce off walls
      if (particle.x < 0 || particle.x > width) {
        particle.speedX *= -1;
      }
      
      if (particle.y < 0 || particle.y > height) {
        particle.speedY *= -1;
      }
      
      // Draw particle
      ctx.beginPath();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle resize
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    initParticles(canvas.width, canvas.height);
  };

  // Setup and cleanup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    if (!isInitialized.current) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      initParticles(canvas.width, canvas.height);
      animate();
      
      window.addEventListener('resize', handleResize);
      isInitialized.current = true;
    }
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute top-0 left-0"
      />
    </motion.div>
  );
}