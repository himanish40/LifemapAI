/**
 * Adds subtle parallax effects to elements as the user moves their mouse
 * This creates a subtle 3D depth effect on the page
 */

export function initParallaxEffects(): void {
  // Don't run on mobile devices
  if (window.innerWidth < 768) return;
  
  document.addEventListener('DOMContentLoaded', setupParallax);
  
  // Run immediately if the page is already loaded
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setupParallax();
  }
}

function setupParallax(): void {
  const slowElements = document.querySelectorAll('.parallax-slow');
  const mediumElements = document.querySelectorAll('.parallax-medium');
  const fastElements = document.querySelectorAll('.parallax-fast');
  
  if (slowElements.length === 0 && mediumElements.length === 0 && fastElements.length === 0) return;
  
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Calculate mouse position relative to center of screen
    const moveX = (clientX - centerX) / centerX;
    const moveY = (clientY - centerY) / centerY;
    
    // Apply transforms with different intensities
    slowElements.forEach(element => {
      const factor = 5; // pixels of movement
      (element as HTMLElement).style.transform = 
        `translate(${moveX * factor}px, ${moveY * factor}px)`;
    });
    
    mediumElements.forEach(element => {
      const factor = 10; // pixels of movement
      (element as HTMLElement).style.transform = 
        `translate(${moveX * factor}px, ${moveY * factor}px)`;
    });
    
    fastElements.forEach(element => {
      const factor = 15; // pixels of movement
      (element as HTMLElement).style.transform = 
        `translate(${moveX * factor}px, ${moveY * factor}px)`;
    });
  });
}

/**
 * Applies parallax scrolling effects to elements as the user scrolls
 * This creates a sense of depth with elements moving at different speeds
 */
export function initScrollParallax(): void {
  // Don't run on mobile devices
  if (window.innerWidth < 768) return;
  
  document.addEventListener('DOMContentLoaded', setupScrollParallax);
  
  // Run immediately if the page is already loaded
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setupScrollParallax();
  }
}

function setupScrollParallax(): void {
  const parallaxBgs = document.querySelectorAll('.parallax-bg');
  
  if (parallaxBgs.length === 0) return;
  
  // Set initial positions
  updateParallaxPositions();
  
  // Update on scroll
  window.addEventListener('scroll', updateParallaxPositions);
  
  function updateParallaxPositions() {
    const scrollY = window.scrollY;
    
    parallaxBgs.forEach((element) => {
      const speed = element.getAttribute('data-parallax-speed') || '0.3';
      const yPos = -(scrollY * parseFloat(speed));
      (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
    });
  }
}